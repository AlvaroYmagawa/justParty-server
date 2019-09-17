# Sessions 
Aqui temos os serviços relacionados a sessão do usuário.


## CREATE
Serviço de login do usuário, com a geração do token para autenticação.

### Url
POST - http://localhost:3333/sessions

### Corpo da requisição(Entradas).
* JSON
```bash
{
  email: string *obrigatória, tipo email.
  password: string *obrigatória.
}
```

### Validações 
User Exists Validation: Ocorre um erro caso não encontre o usuário informado.
Password validation: Ocorre erro caso a senha informada não corresponda com a senha do usuário.


### Saídas
Retorna o id, nome, email e o token gerado para o usuário logado.
* O token de autenticação tem duração de 1 semana.
```bash
{
  id: 
  name: 
  email:
  token: 
}
```




	
