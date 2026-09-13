# Relatório do Projeto: API de Produtos

**Estrutura do Projeto**

```text
.
├── README.md             - Documentação do projeto e relatório com as respostas da atividade.
└── api-produtos/         - Pasta principal contendo os arquivos da aplicação Node.js.
    ├── Dockerfile        - Contém as instruções para construir a imagem Docker da API.
    ├── package.json      - Define os metadados do projeto, scripts e as dependências (como o Express).
    ├── package-lock.json - Trava as versões exatas das dependências para garantir builds consistentes.
    ├── server.js         - O código-fonte principal onde o servidor e as rotas da API estão definidos.
    └── artifacts/        - Pasta destinada a armazenar as evidências dos testes, capturas de tela e Postman collections.

```

### Nomes dos integrantes e investigação inicial

* **Integrantes:** Breno de Souza Guedes, Mauro Gutemberg Magalhães Barros, Ray Arthur Silva Campos Dias 
* **Investigação:** A análise inicial focava em compreender a estrutura da API Node.js fornecida e isolar a aplicação em um ambiente Docker. O foco da investigação técnica foi compreender o motivo de falhas de roteamento ao adicionar um novo endpoint (`/produtos/destaque`) como requerido na atividade, e como rodar os serviços em portas diferentes sem alterar o código base da aplicação.

### Comandos usados e URLs testadas

**Comandos Docker executados:**

```bash
# Build da imagem 1.0
docker build -t api-produtos:1.0 .

# Listar imagens
docker image ls

# Criação e execução do container 
docker run -d --name container-produtos -p 4000:4000 api-produtos:1.0

# Listagem dos containers
docker ps 
docker ps -a

# Build da imagem 2.0
docker build -t api-produtos:2.0 .

# Criação e execução do container v2 na porta 8080
docker run -d --name container-produtos-v2 -p 8080:4000 api-produtos:2.0

# Manipulação dos containers
docker start container_name/id
docker stop container_name/id

# Visualização dos logs
docker logs container_name/id

```

**URLs testadas:**

* `http://localhost:4000/`

* `http://localhost:4000/produtos`

* `http://localhost:4000/produtos/1`

* `http://localhost:8080/produtos`

* `http://localhost:8080/produtos/destaque`

* `http://localhost:8080/produtos/1`


### Diferença entre imagem e container

Uma **imagem** é um modelo estático de software que inclui tudo o que é necessário para executar um aplicativo (código, runtime, bibliotecas e variáveis de ambiente). Um **container** é a instância viva e em execução dessa imagem. Como o dilema Classe/Objeto.

### Motivo do novo build após alterar o código

Quando o endpoint `/produtos/destaque` foi criado no arquivo `server.js`, as mudanças ocorreram apenas no sistema local. A imagem original `1.0` já havia sido gerada com a versão antiga do arquivo. Foi necessário executar um novo comando de build para criar a imagem `2.0`, que empacotou o código atualizado para ser executado no novo container.

### Explicação do mapeamento de portas

O mapeamento é feito pela flag `-p` ao executar um container, utilizando o formato `porta_host:porta_container`. No comando `docker run -d --name container-produtos-v2 -p 8080:4000 api-produtos:2.0`, o Docker redireciona todas as requests recebidas na porta 8080 da máquina física para a porta 4000 dentro do container isolado, logo a aplicação continua rodando na 4000, mas fica acessível externamente pela 8080.

### Dificuldade encontrada e como foi investigada

A principal dificuldade envolveu a implementação da nova rota de destaques. Ao inserir o bloco de código abaixo da rota de dinâmica de ID, a requisição interceptava a palavra "destaque" e a tratava como uma variável de ID dinâmico, quebrando a consulta. A investigação sobre o funcionamento do *Express.js* revelou que o roteamento é avaliado sequencialmente (de cima para baixo). A correção foi realizada colocando a rota estática `/produtos/destaque` fisicamente acima da rota dinâmica `/produtos/:id` no arquivo.
