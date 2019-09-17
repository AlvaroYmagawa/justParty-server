# Users
Aqui temos todos os serviços relacionados ao usuário (CRUD).

## CREATE
Serviço para criação de usuários padrão/ promoter.

### Url
POST http://localhost:3333/users

### Corpo da requisição (Entradas).
* Corpo da requisição JSON
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





### PUT
Serviço para atualização de informações de usuários padrão/ promoter.

#### Requisição.
* Corpo da requisição JSON
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

* Bear Token deve ser informado.

#### Validações 
Token provided - Usuário deve estar logado para requisitar esse serviço.


	
