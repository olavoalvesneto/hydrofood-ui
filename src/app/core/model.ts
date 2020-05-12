export class Cozinha {
  id: number;
  nome: string;
}

export class Produto {
  id: number;
  foto: string;
  nome: string;
  descricao: string;
  preco: number;
  ativo: true;
}

export class Restaurante {
  id: number;

  nome: string;
  taxaFrete: number;
  dataAtualizacao: Date;
  dataCadastro: Date;
  cidade = new Cidade();
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  ativo = false;
  aberto = false;
}

export class Cidade {
  id: number;
  nome: string;
  estado = new Estado();
}

export class Estado {
  id: number;
  nome: string;
}

