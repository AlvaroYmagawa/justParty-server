# Users
Aqui temos os serviços relacionados a usuários.

## CREATE
Serviço para criação de usuários padrão/ promoter.

### Url
POST - http://localhost:3333/users

### Corpo da requisição(Entradas).
* JSON
```bash
{
  name - string obrigatória.
  email - string obrigatória e unicá
  password - string obrigatória, mímino de 6 caracteres.
  confirmPassword - string obrigatória, mímino de 6 caracteres, deve ser identico ao "password".
  promoter - boolean obrigatório.
  contact - string não obrigatória.
  adress - string não obrigatória.
}
```

### Validações 
Email validation: Não deve ser possivél cadastrar usuários com um mesmo e-mail.

### Saídas
Retorna todos os atributos do usurio criado.
```bash
{
  id: 
  name: 
  email: 
  password:
  promoter:
  updatedA": 
  createdA": 
  password_hash: 
  adress: 
  contact: 
  avatar_id: 
}
```

### UPDATE
Serviço para atualizar informações de usuários padrão/ promoter. 
* Serviço disponível apenas para usurios autenticados.

### Url
PUT - http://localhost:3333/users

### Corpo da requisição(Entradas).
* JSON
* Bearer Token deve ser informado.
```bash
{	
  name - string não obrigatória.
  email - string não obrigatória.
  oldPassword - string não obrigatória.
  password - string obrigatória caso oldPassword exista, mímino de 6 caracteres.
  confirmPassword - string obrigatória, mímino de 6 caracteres, deve ser identico ao "password".
  contact - string não obrigatória.
  adress - string não obrigatória.
}
```

### Validações 
Token provided - Usuário deve estar logado para requisitar esse serviço.

### Saídas
Retorna o id, nome e o email do usurio que recebeu a alteração.
```bash
{
  id:
  name: 
  email: 
}
```


	
