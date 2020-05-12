import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'https://hydrofood-prod.cfapps.io/oauth/token';
  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
    ) {
      this.carregarToken();
     }

  login(usuario: string, senha: string): Promise<void> {

    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWxnYWZvb2Qtd2ViOndlYjEyMw==')
    .append('Content-Type', 'application/x-www-form-urlencoded');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post<any>(this.oauthTokenUrl, body, { headers, withCredentials: true })
    .toPromise()
    .then(response => {
      this.armazenarToken(response.access_token);
    })
    .catch( response => {
      const responseError = response.error;
      if (response.status === 400) {
        if (responseError.error === 'invalid_grant') {
          return Promise.reject('Usuário ou senha inválida!');
        }
      }
      if (response.status === 401) {
          return Promise.reject('Usuário não autorizado!');
      }
      return Promise.reject(response);
    });

  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    console.log(token);
    localStorage.setItem('token', token);
    console.log('armazenou token');
  }

  private carregarToken() {
    const token = localStorage.getItem('token');
    console.log('carregou token');
    if (token) {
      this.armazenarToken(token);
    }
  }

// TODO buscar refresh token
  obterNovoAccessToken(): Promise<void> {
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWxnYWZvb2Qtd2ViOndlYjEyMw==')
    .append('Content-Type', 'application/x-www-form-urlencoded');

//    const body = 'grant_type=refresh_token';
    const body = `grant_type=refresh_token&refresh_token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvX2lkIjoxLCJ1c2VyX25hbWUiOiJqb2FvLmdlckBhbGdhZm9vZC5jb20uYnIiLCJzY29wZSI6WyJSRUFEIiwiV1JJVEUiXSwiYXRpIjoiMzc4YzZiMWEtYmMwNC00YTVmLTg5Y2EtMjQ0NGQ3M2JiMTg2IiwiZXhwIjoxNTkyNTkxOTYyLCJhdXRob3JpdGllcyI6WyJHRVJBUl9SRUxBVE9SSU9TIiwiRURJVEFSX0NPWklOSEFTIiwiQ09OU1VMVEFSX1VTVUFSSU9TX0dSVVBPU19QRVJNSVNTT0VTIiwiRURJVEFSX0NJREFERVMiLCJFRElUQVJfRk9STUFTX1BBR0FNRU5UTyIsIkVESVRBUl9SRVNUQVVSQU5URVMiLCJHRVJFTkNJQVJfUEVESURPUyIsIkVESVRBUl9VU1VBUklPU19HUlVQT1NfUEVSTUlTU09FUyIsIkNPTlNVTFRBUl9QRURJRE9TIiwiRURJVEFSX0VTVEFET1MiXSwianRpIjoiOTBjMTMxMTQtM2I5ZS00MjMzLTgxZGItYzQzYzhhOGU5OTJiIiwibm9tZV9jb21wbGV0byI6Ikpvw6NvIGRhIFNpbHZhIiwiY2xpZW50X2lkIjoiYWxnYWZvb2Qtd2ViIn0.IGBih_2gIqeiT4wJnDtC-WGDdjCJxIMo7cTNJ7uH2mxSA5VAgIR-zN2nnBaveHltBNFQSlzzPnf4F2_JG_fxCu4UP1btlyHBDzwo_bG-lcWyXXV3dAbs6htIMvRwRgJW9PACqfuWruEZeRotJjlPdPC1k3zgwJ4nlOVdnPKFSVoZZiaGUjIZqM-kMljBXxpTFyncBx9iaqywqSSp4PF9O6G450ZZHu3Z-lXHrpmG3iV5xlu8ykosDti-YUst-wU003hHQePtUqSELI6zoXMzQLgRVKVcrsOk3iY8bW2RvBPyZTiYVOul7mHTXr2a8N5BI59Wv8bwF2bo0TPY7X_j_g`;
    return this.http.post<any>(this.oauthTokenUrl, body,
        { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken(response.access_token);
        console.log('Access Token criado!');

      }).catch(response => {
          console.error('Erro ao renovar token!', response);
          return Promise.resolve(null);
      });
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(roles) {
    for (const role of roles){
      if (this.temPermissao(role)) {
        return true;
      }
    }
    return false;
  }

}
