<h1 align="center">Certificadora de Competência Identitária - ELLP [Gestão de Oficinas]</h1>

<p align="center">
Repositório que unifica o front-end e o back-end da plataforma de gestão de oficinas do projeto de extensão ELLP (Ensino Lúdico de Programação) da UTFPR-CP.
</p>

<div align="center">
  <figure>
    <img src="readME_image/prototipoFigma.png" alt="Protótipo Figma">
    <figcaption>Protótipo do website feito com o Figma</figcaption>
  </figure>
</div>

<br>

# Integrantes do grupo

<markdown-accessiblity-table data-catalyst="">
<table tabindex="0">
  <thead>
    <tr>
      <th align="center"><a href="https://github.com/Luis-Spessoto"><img src="https://avatars.githubusercontent.com/u/77413441?s=400&u=144e3f496c44706fe9f3d5b9be8c631a8044af71&v=4" alt="foto-Luis" width="110"><br><sub>Luís Felipe Spessoto</sub></a></th>
      <th align="center"><a href="https://github.com/BrunoBiazon"><img src="https://avatars.githubusercontent.com/u/184716758?v=4" alt="foto-Bruno" width="110"><br><sub>Bruno Circhia Biazon</sub></a></th>
      <th align="center"><a href="https://github.com/JoaoVFB"><img src="https://avatars.githubusercontent.com/u/187559847?v=4" alt="foto João" width="110"><br><sub>João Vitor Furquim</sub></a></th>
      <th align="center"><a href="https://github.com/DaniloFrazon"><img src="https://avatars.githubusercontent.com/u/187816067?v=4" alt="foto Danilo" width="110"><br><sub>Danilo Augusto</sub></a></th>
      <th align="center"><a href="https://github.com/Pedro-Meloo"><img src="https://avatars.githubusercontent.com/u/187815459?v=4" alt="foto Pedro" width="110"><br><sub>Pedro Henrique</sub></a></th>
    </tr>
  </thead>
</table>
</markdown-accessiblity-table>

# Descrição do projeto

O sistema para gestão de oficinas do ELLP é uma plataforma Fullstack desenvolvida para centralizar e automatizar a gestão das oficinas do projeto de extensão ELLP (Ensino Lúdico de Programação) da UTFPR-CP. A aplicação substitui controles manuais, possibilitando o gerenciamento organizado de tutores, professores, alunos, turmas e oficinas. O sistema permite que os responsáveis pelo projeto realizem o acompanhamento das atividades, organização das turmas e controle das informações relacionadas às oficinas.

# Tecnologias utilizadas

## Front-end
- TypeScript
- React
- HTML5
- CSS3

## Back-end
- Node.js
- Express
- MongoDB (Mongoose)

## Ferramentas utilizadas
- Visual Studio Code
- GitHub
- Figma

# Divisão Laboral

- **Luís**: Responsável pela Prototipagem, UI/UX e Scrum Master
- **João**: Responsável pelo Módulo de Professores e Tutores
- **Danilo**: Responsável pelo Módulo de Temas e Curadoria de Oficinas
- **Pedro**: Responsável pelo Módulo de Alunos e Enturmação
- **Bruno**: Responsável pelo Banco de Dados e Integração

# Funcionalidades Desenvolvidas

## Gestão de Usuários
- Cadastro e gerenciamento de usuários do sistema
- Controle de acesso conforme perfil

## Gestão de Professores e Tutores
- Cadastro de professores
- Cadastro de tutores
- Visualização e gerenciamento das informações

## Gestão de Alunos
- Cadastro de alunos
- Organização de alunos em turmas
- Controle de participantes das oficinas

## Gestão de Oficinas
- Cadastro de oficinas
- Organização dos temas trabalhados
- Curadoria das atividades disponíveis

## Gestão de Turmas
- Criação e gerenciamento de turmas
- Associação de alunos e tutores

__________________________________________

# Estrutura do Repositório

O projeto é dividido em dois diretórios principais:

- `/frontend`: Interface web construída com React e TypeScript.
- `/backend`: API RESTful desenvolvida com Node.js, Express, Mongoose e MongoDB, estruturada seguindo o padrão **MVC (Model-View-Controller)**:
  - `src/config/`: Configurações de conexões externas (Banco de Dados).
  - `src/models/`: Definições dos schemas das entidades Mongoose e seus relacionamentos.
  - `src/controllers/`: Lógica de negócio das rotas da API.
  - `src/routes/`: Definição das rotas Express e redirecionamento aos controllers.
  - `src/middlewares/`: Middlewares globais (como tratamento de erros centralizado).
  - `src/utils/`: Utilitários gerais (como wrapper assíncrono para rotas).

# Como Executar o Projeto

Certifique-se de ter o Node.js instalado na sua máquina e o MongoDB rodando localmente (ou uma URI de banco configurada no arquivo `.env` do backend).

### 1. Instale as dependências

Execute `npm install` dentro das respectivas pastas (`/frontend` e `/backend`).

### 2. Configure o arquivo `.env`

Crie um arquivo `.env` na raiz do backend com o seguinte exemplo:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/oficinas-gestao
JWT_SECRET=secreto
```

### 3. Inicie os servidores

A partir do diretório raiz do projeto, utilize os seguintes comandos em terminais separados:

```bash
npm run dev:backend
```

```bash
npm run dev:frontend
```

*(Lembre-se de rodar estes comandos em terminais separados para manter ambos em execução ao mesmo tempo).*

# Documentação da API

A API possui documentação interativa, disponível localmente em dois formatos:

- **Swagger**: inicie o back-end (`npm run dev:backend`) e acesse `http://localhost:3000/api-docs`.
- **Rota de documentação detalhada**: `http://localhost:3000/docs`.

## Resumo dos Endpoints

### 1. Alunos (`/api/alunos`)
- `GET /` - Retorna a lista de todos os alunos.
- `GET /:id` - Retorna os dados de um aluno específico.
- `POST /` - Cadastra um novo aluno. *Campos*: `nome` (String), `escola` (String), `idade` (Number).
- `PUT /:id` - Atualiza dados de um aluno.
- `DELETE /:id` - Remove um aluno.

### 2. Professores (`/api/professores`)
- `GET /` - Lista todos os professores orientadores.
- `GET /:id` - Retorna dados de um professor específico.
- `POST /` - Cadastra um novo professor. *Campos*: `nome` (String), `email` (String, único), `senha` (String).
- `PUT /:id` - Atualiza dados de um professor.
- `DELETE /:id` - Remove um professor.

### 3. Tutores (`/api/tutores`)
- `GET /` - Lista todos os tutores monitores.
- `GET /:id` - Retorna dados de um tutor específico.
- `POST /` - Cadastra um novo tutor. *Campos*: `nome` (String), `email` (String, único), `curso` (String), `periodo` (String), `senha` (String), `role` (String), `status` (String).
- `PUT /:id` - Atualiza dados de um tutor.
- `DELETE /:id` - Remove um tutor.

### 4. Temas das Oficinas (`/api/temas`)
- `GET /` - Lista todas as propostas de temas.
- `GET /:id` - Retorna dados de um tema específico.
- `POST /` - Cadastra um novo tema. *Campos*: `titulo` (String), `descricao` (String), `aprovado` (Boolean, opcional).
- `PUT /:id` - Atualiza ou aprova um tema.
- `DELETE /:id` - Exclui um tema.

### 5. Oficinas Agendadas (`/api/oficinas`)
- `GET /` - Lista todas as oficinas (popula os dados de Tema, Tutor e Professor).
- `GET /:id` - Detalha uma oficina agendada pelo ID.
- `POST /` - Agenda uma oficina. *Campos*: `nome` (String), `temaId` (ObjectId), `tutorId` (ObjectId), `professorId` (ObjectId), `data` (String), `horario` (String), `local` (String).
- `PUT /:id` - Atualiza dados de agendamento de uma oficina.
- `DELETE /:id` - Exclui uma oficina.

### 6. Turmas (`/api/turmas`)
- `GET /` - Retorna todas as turmas (com populações de Oficina e Alunos).
- `GET /:id` - Retorna detalhes de uma turma.
- `POST /` - Cria uma turma para uma oficina. *Campos*: `nome` (String), `oficinaId` (ObjectId), `alunos` (Array de ObjectIds).
- `PUT /:id` - Atualiza dados da turma ou alunos matriculados.
- `DELETE /:id` - Exclui uma turma.

### 7. Autenticação (`/api/auth`)
- `POST /register` - Cadastra um novo tutor monitor. *Campos*: `nome` (String), `email` (String), `curso` (String), `senha` (String).
- `POST /login` - Autentica um usuário e retorna o token JWT. *Campos*: `email` (String), `senha` (String).
- `GET /me` - Retorna os dados do usuário autenticado (requer cabeçalho `Authorization: Bearer <token>`).

## Diferença entre Rotas Administrativas (CRUD) e Autenticação (Auth)

O sistema separa as rotas em dois escopos principais para garantir segurança e organização do projeto:

### 1. Rotas Administrativas/CRUD (`/api/professores` e `/api/tutores`)
- **Objetivo**: Gerenciamento de cadastros por parte dos **Administradores (Coordenadores)**.
- **Uso**: Permite que a coordenação liste todos os cadastros, atualize dados de terceiros ou remova tutores/professores desligados do projeto.
- **Segurança**: São rotas privadas e controladas que exigem permissões de administrador. Um usuário comum (como um tutor) não deve ter acesso a listar ou alterar dados de outros profissionais.

### 2. Rotas de Autenticação/Auth (`/api/auth/*`)
- **Objetivo**: Ações individuais e públicas (auto-cadastro e login).
- **Uso**:
  - `/api/auth/register`: rota pública que permite que um novo monitor se auto-cadastre no sistema (iniciando com status pendente até que a coordenação o aprove através da rota administrativa).
  - `/api/auth/login`: autentica credenciais fornecidas e emite o token de acesso (JWT) para as sessões de Tutores, Coordenadores e Professores.
  - `/api/auth/me`: permite que o usuário conectado recupere seus próprios dados de sessão de forma segura.

### Por que ter ambas?

Essa separação é fundamental por motivos de **Segurança (Controle de Acessos)** e **Responsabilidade (Separação de Conceitos)**:

- Se usássemos apenas a rota de cadastro administrativo para criar usuários, os tutores não conseguiriam se auto-cadastrar na plataforma.
- Se usássemos apenas a rota de auto-cadastro pública, a coordenação perderia a capacidade de gerenciar, listar, alterar dados ou inativar contas da equipe de forma centralizada.
