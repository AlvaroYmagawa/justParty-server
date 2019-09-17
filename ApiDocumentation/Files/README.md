# Files
Aqui temos os serviços relacionados a arquivos.


## CREATE
Serviço de upload de arquivos (png, jpg, jpeg), e a criação de um caminho único para o mesmo.
* Serviço disponível apenas para usuários autenticados.

### Url
POST - http://localhost:3333/files

### Corpo da requisição(Entradas).
* Multpart
* Bearer Token deve ser informado.
```bash
 file: "arquivo.(png, jpg, jpeg) *obrigatório"
```

### Saídas
```bash
{
  "url": "http://localhost:3333/files/24325400fe1b7c6176f7e5699138d0d4.jpg",
  "id": 4,
  "name": "profile03.jpg",
  "path": "24325400fe1b7c6176f7e5699138d0d4.jpg",
  "updatedAt": "2019-09-16T17:16:54.798Z",
  "createdAt": "2019-09-16T17:16:54.798Z"
}
```




	
