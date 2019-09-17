# Events
Aqui temos os serviços relacionados aos eventos.


## CREATE
Serviço de criação de um evento.
* Serviço disponível apenas para usuários Promoters autenticados.

### Url
POST - http://localhost:3333/events

### Corpo da requisição(Entradas).
* JSON
* Bearer Token deve ser informado.
```bash
{
  name: String *obrigatória,
  description: String *obrigatória,
  localization: String *obrigatória,
  date: Date *obrigatória  exemplo:("2019-10-22T18:00:00-03:00"),
  sales_date: Date *obrigatória
}
```

### Validações
Is a promoter validation: Verifica se o usuário logado é um promoter.
Past date validation: Verifica se a data do evento não é uma data no passado.
Past sales_date validation: Verifica se a data do evento não é anterior a data de vendas.




### Saídas
```bash
{
  "past": false, // Atributo VIRTUAL para verificar se o evento tem uma data passada.
  "cancelable": true, // Atributo VIRTUAL para verificar se o evento pode ser cancelado.
  "id": 5,
  "name": "Moralizador",
  "description": "Role pique sofa fora da sala",
  "localization": "Vira copos",
  "date": "2019-10-22T21:00:00.000Z",
  "sales_date": "2019-09-02T21:00:00.000Z",
  "promoter_id": 4,
  "updatedAt": "2019-09-17T15:49:37.323Z",
  "createdAt": "2019-09-17T15:49:37.323Z",
  "banner_id": null,
  "canceled_at": null
}
```


## READ
Serviço de listagem de eventos não cancelados.
* Serviço disponível apenas para usuários autenticados.


### Url
GET - http://localhost:3333/events

### Corpo da requisição(Entradas).
* Bearer Token deve ser informado.


### Saídas
Retorna um array com todos os eventos não cancelados.
```bash
[
  {
    "past": true,
    "cancelable": false,
    "id": 1,
    "name": "Rolezao na Pilar",
    "description": "Role pique sofa fora da sala",
    "localization": "rua alagoas, 630",
    "date": "2019-06-02T21:00:00.000Z",
    "sales_date": "2019-09-17T21:00:00.000Z",
    "canceled_at": null,
    "promoter": {
      "id": 4,
      "name": "Kenzo",
      "File": {
        "url": "http://localhost:3333/files/641f4222180e89233047a24dc086fca0.jpg",
        "id": 1,
        "path": "641f4222180e89233047a24dc086fca0.jpg"
      }
    },
    "banner": {
      "url": "http://localhost:3333/files/641f4222180e89233047a24dc086fca0.jpg",
      "id": 1,
      "path": "641f4222180e89233047a24dc086fca0.jpg"
    }
  },
]
```


## UPDATE
Serviço para atualizar informações sobre o evento.
* Serviço disponível apenas para usuários Promoters autenticados.

### Url
PUT - http://localhost:3333/events/:eventId
* Necessário informar o id do evento a ser alterado como um parâmetro para a requisição.

### Corpo da requisição(Entradas).
* JSON
* Bearer Token deve ser informado.
```bash
{
  name: String não obrigatória.
  localization: String não obrigatória.
  description: String não obrigatória.
  banner_id: Inteiro não obrigatório.
  date: Date não obrigatória.
  sales_date: Date não obrigatória.
} 
```

### Validações
Is your event validation: Verifica se o evento que o promoter quer alterar é de sua propriedade.
Event Exists validation: Verifica se o id do evento existe.

### Saídas
```bash
{
  "name": "Rolezao na Pilar",
  "localization": "rua alagoas, 630",
  "description": "Role pique sofa fora da sala",
  "date": "2019-10-02T21:00:00.000Z",
  "sales_date": "2019-09-17T21:00:00.000Z"
  "banner_id": 1
}
```


## DELETE
Serviço para cancelamento de um evento.
* Serviço disponível apenas para usuários Promoters autenticados.

### Url
DELETE - http://localhost:3333/events/:eventId
* Necessário informar o id do evento a ser alterado como um parâmetro para a requisição.

### Corpo da requisição(Entradas).
* JSON
* Bearer Token deve ser informado.

### Validações
Is your event validation: Verifica se o evento que o promoter quer cancelar é de sua propriedade.
Event Exists validation: Verifica se o id do evento existe.

### Saídas
```bash
{
  "id": 1,
  "name": "RolenaPilaar",
  "description": "Role pique sofa fora da sala",
  "localization": "rua alagoas, 630",
  "date": "2019-10-02T21:00:00.000Z",
  "sales_date": "2019-09-17T21:00:00.000Z",
  "canceled_at": "2019-09-16T19:55:23.401Z",
  "createdAt": "2019-09-16T19:34:58.995Z",
  "updatedAt": "2019-09-16T19:55:23.402Z",
  "banner_id": null,
  "promoter_id": 4,
  "User": {
    "name": "Kenzo",
    "email": "alvaroymagawa@gmail.com"
  }
}
```









	
