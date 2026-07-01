# AS65A - Certificadora De Competência Identitária - N15

Destinado ao desenvolvimento do sistema para ELLP, um projeto de extensão da UTFPR para atender a comunidade.

Este repositório contém o backend desenvolvido em **Node.js**, **Express** e **MongoDB** (Mongoose).

## Arquitetura do Projeto

O projeto foi estruturado seguindo o padrão MVC (Model-View-Controller) para melhor organização e escalabilidade:

- `src/config/`: Configurações de conexões externas (Banco de Dados).
- `src/models/`: Definições dos schemas das entidades Mongoose e seus relacionamentos.
- `src/controllers/`: Lógica de negócio das rotas da API.
- `src/routes/`: Definição das rotas Express e redirecionamento aos controllers.
- `src/middlewares/`: Middlewares globais (como tratamento de erros centralizado).
- `src/utils/`: Utilitários gerais (como wrapper assíncrono para rotas).

## Como Executar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Crie e configure o arquivo `.env` na raiz do projeto (exemplo):
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/oficinas-gestao
   JWT_SECRET=secreto
   ```

3. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

## Documentação das Rotas da API

Uma documentação interativa e detalhada está disponível localmente através da rota:
* **`http://localhost:3000/docs`**

### Resumo dos Endpoints

#### 1. Alunos (`/api/alunos`)
* `GET /` - Retorna a lista de todos os alunos.
* `GET /:id` - Retorna os dados de um aluno específico.
* `POST /` - Cadastra um novo aluno.
  * *Campos*: `nome` (String), `escola` (String), `idade` (Number).
* `PUT /:id` - Atualiza dados de um aluno.
* `DELETE /:id` - Remove um aluno.

#### 2. Professores (`/api/professores`)
* `GET /` - Lista todos os professores orientadores.
* `GET /:id` - Retorna dados de um professor específico.
* `POST /` - Cadastra um novo professor.
  * *Campos*: `nome` (String), `email` (String, único), `senha` (String).
* `PUT /:id` - Atualiza dados de um professor.
* `DELETE /:id` - Remove um professor.

#### 3. Tutores (`/api/tutores`)
* `GET /` - Lista todos os tutores monitores.
* `GET /:id` - Retorna dados de um tutor específico.
* `POST /` - Cadastra um novo tutor.
  * *Campos*: `nome` (String), `email` (String, único), `curso` (String), `periodo` (String), `senha` (String), `role` (String), `status` (String).
* `PUT /:id` - Atualiza dados de um tutor.
* `DELETE /:id` - Remove um tutor.

#### 4. Temas das Oficinas (`/api/temas`)
* `GET /` - Lista todas as propostas de temas.
* `GET /:id` - Retorna dados de um tema específico.
* `POST /` - Cadastra um novo tema.
  * *Campos*: `titulo` (String), `descricao` (String), `aprovado` (Boolean, opcional).
* `PUT /:id` - Atualiza ou aprova um tema.
* `DELETE /:id` - Exclui um tema.

#### 5. Oficinas Agendadas (`/api/oficinas`)
* `GET /` - Lista todas as oficinas (popula os dados inteiros de Tema, Tutor e Professor).
* `GET /:id` - Detalha uma oficina agendada pelo ID.
* `POST /` - Agenda uma oficina.
  * *Campos*: `nome` (String), `temaId` (ObjectId), `tutorId` (ObjectId), `professorId` (ObjectId), `data` (String), `horario` (String), `local` (String).
* `PUT /:id` - Atualiza dados de agendamento de uma oficina.
* `DELETE /:id` - Exclui uma oficina.

#### 6. Turmas (`/api/turmas`)
* `GET /` - Retorna todas as turmas (com populações de Oficina e Alunos).
* `GET /:id` - Retorna detalhes de uma turma.
* `POST /` - Cria uma turma para uma oficina.
  * *Campos*: `nome` (String), `oficinaId` (ObjectId), `alunos` (Array de ObjectIds).
* `PUT /:id` - Atualiza dados da turma ou alunos matriculados.
* `DELETE /:id` - Exclui uma turma.

#### 7. Autenticação (`/api/auth`)
* `POST /register` - Cadastra um novo tutor monitor.
  * *Campos*: `nome` (String), `email` (String), `curso` (String), `senha` (String).
* `POST /login` - Autentica um usuário e retorna o token JWT.
  * *Campos*: `email` (String), `senha` (String).
* `GET /me` - Retorna os dados do usuário autenticado (requer cabeçalho `Authorization: Bearer <token>`).

)** e **Responsabilidade (Separação de Conceitos)**:
* Se usássemos apenas a rota de cadastro administrativo para criar usuários, os tutores não conseguiriam se auto-cadastrar na plataforma.
* Se usássemos apenas a rota de auto-cadastro pública, a coordenação perderia a capacidade de gerenciar, listar, alterar dados ou inativar contas da equipe de forma centralizada.
