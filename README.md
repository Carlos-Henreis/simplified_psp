# Simplified PSP

Para executar instale o
[Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/) e
[Docker Compose](https://docs.docker.com/compose/install)

----------------------------------------------------

Clone o repositório, abra o terminal na raiz do projeto e execute:

```
$ make setup
```

----------------------------------------------------

Após isso execute:

```
$ make up
```

Quando o servidor estiver rodando abra uma nova aba no terminal e execute:

```
$ make migrate
$ make seed
```

Ao fim da execução é possível consumir os serviços a partir de: http://0.0.0.0:3333"

# Especificações e estratégias de desenvolvimento

* O serviço foi implementado usando o [adonisjs framework](https://adonisjs.com/)
* A api foi implementada usando o padrão restful
* Foi criado um serviço de autenticação, onde no login, um token JWT é criado e retornado para o cliente. Esse token deve ser enviado para as APIs através do header Authorization de cada requisição HTTP com a flag Bearer.

# Serviços REST previstos

## Usuário e autenticação

1. **Criar usuário**
    Serviço necessário para crição de um novo usuário (cliente)
    * Rota `/users`
    * Método: post
    * Parametros: 
        * username
        * email
        * password 

2. **Autenticação**
    Prove uma sessão autenticada para o usuário
    * Rota `/sessions`
    * Método: post
    * Parametros: 
        * email
        * password

## Transações, recebíveis e saldo

Todos as requisições para os métodos enumerados abaixo devem ser feitas, adicionando no HEADER a composição `'Authorization' : 'Bearer ' + token` (sendo este o token gerado conforme descrição anterior)

1. **Criar uma transação**
    Permite a criação de uma nova trasação
    * Rota `/transactions`
    * Método: post
    * Parametros: 
        * value
        * description
        * payment_method
        * card_number
        * card_holder
        * card_expiration_date
        * cvv
2. **Listar todas as transações**
    Lista todas as transações de um cliente espesifíco
    * Rota `/transactions`
    * Método: get

3. **Consultar uma transação**
    Consulta uma transação do cliente espesifíco, a partir de seu id
    * Rota `/transactions/id`
    * Método: get

4. **Consultar saldo**
    Consulta o saldo de um cliente
    * Rota `/transactions/id`
    * Método: get

# Testes

Para facilitar segue a collection do postman com todos os serviços propostos: [Link](https://www.getpostman.com/collections/1d88214128d9238edc92)
Além disso o banco foi populado com dois usuários e algumas transações.

Credenciais usuário 1:
* email: `teste1@teste.com`
* password: `mudar12345`

Credenciais usuário 2:
* email: `teste2@teste.com`
* password: `qwe123`

# Melhorias futuras

Segue algumas sugestões que melhorias para o projeto
* Criar testes automatizados
* Acrescentar validadores nos campos (principalmente cartão de crédito)

# Experiências

* Tive a oportunidade de implementar uma API com adonisJS.
* Aperfeiçoar-me mais um pouquinho com Docker/Docker Compose
* Trabalhar com o Factory/Faker no nodeJS (pena que não deu para eu fazer os testes funcionais)
