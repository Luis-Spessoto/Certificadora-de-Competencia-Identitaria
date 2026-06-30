# Certificadora de Competência Identitária - ELLP [Gestão de Oficinas]

Este repositório unifica o front-end e o back-end da plataforma de gestão de oficinas do projeto de extensão ELLP (Ensino Lúdico de Programação) da UTFPR-CP.

# <h1 align="center"> Certificadora de Competencia Identitária - ELLP [Gestão de Oficinas] </h1>

<div align="center">
 <figure>
  <img src="readME_image/prototipoFigma.png" alt="Protótipo Figma">
  <figcaption>Protótipo do website feito com o Figma</figcaption>
 </figure>
</div>

<br>

# Integrantes do grupo: <br>

<markdown-accessiblity-table data-catalyst=""><table tabindex="0">
<thead>
  <tr>
    <th align="center"><a href="https://github.com/Luis-Spessoto"><img src="https://avatars.githubusercontent.com/u/77413441?s=400&u=144e3f496c44706fe9f3d5b9be8c631a8044af71&v=4" alt="foto-Luis"width="110"><br><sub>Luís Felipe Spessoto</sub></a></th>
    <th align="center"><a href="https://github.com/BrunoBiazon"><img src="https://avatars.githubusercontent.com/u/184716758?v=4" alt="foto-Bruno" width="110"><br><sub>Bruno Circhia Biazon</sub></a></th>
    <th align="center"><a href="https://github.com/JoaoVFB"><img src="https://avatars.githubusercontent.com/u/187559847?v=4" alt="foto João"width="110"><br><sub>João Vitor Furquim</sub></a></th>
   <th align="center"><a href="https://github.com/DaniloFrazon"><img src="https://avatars.githubusercontent.com/u/187816067?v=4" alt="foto Danilo"width="110"><br><sub>Danilo Augusto</sub></a></th>
   <th align="center"><a href="https://github.com/Pedro-Meloo"><img src="https://avatars.githubusercontent.com/u/187815459?v=4" alt="foto Pedro"width="110"><br><sub>Pedro Henrique</sub></a></th>
  </tr>
</thead>
</table></markdown-accessiblity-table>


# Descrição do projeto

O sistema para gestão de oficinas do ELLP é uma plataforma Fullstack desenvolvida para centralizar e automatizar a gestão das oficinas do projeto de extensão ELLP (Ensino Lúdico de Programação) da UTFPR-CP.

A aplicação substitui controles manuais, possibilitando o gerenciamento organizado de tutores, professores, alunos, turmas e oficinas.

O sistema permite que os responsáveis pelo projeto realizem o acompanhamento das atividades, organização das turmas e controle das informações relacionadas às oficinas.


# Tecnologias utilizadas

* Front-end: React com typescript
* Backend: Node.js com express, utilizando MongoDB como Banco de Dados.


# Divisão do grupo para o desenvolvimento

# Tecnologias utilizadas

## Front-end
- TypeScript
- React
- HTML5
- CSS3

## Back-end
- Node.js
- Express

## Banco de Dados
- MongoDB

## Ferramentas utilizadas
- Visual Studio Code
- GitHub
- Figma


# Divisão Laboral

- Luís: Responsável pela Prototipagem, UI/UX e Scrum Master
- João: Responsável pelo Módulo de Professores e Tutores
- Danilo: Responsável pelo Módulo de Temas e Curadoria de Oficinas
- Pedro: Responsável pelo Módulo de Alunos e Enturmação
- Bruno: Responsável pelo Banco de Dados e Integração


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
* `/frontend`: Interface web construída com React, TypeScript
* `/backend`: API RESTful desenvolvida com Node.js, Express, Mongoose e MongoDB.

# Como Executar o Projeto

Certifique-se de ter o Node.js instalado na sua máquina e o MongoDB rodando localmente (ou uma URI de banco configurada no arquivo `.env` do backend).

Instale as dependências executando `npm install` dentro das respectivas pastas.

A partir do diretório raiz do projeto, utilize os seguintes comandos para iniciar os servidores:

### 1. Iniciar o Servidor Back-end:
```bash
npm run dev:backend
```

### 2. Iniciar o Servidor Front-end:
```bash
npm run dev:frontend
```

*(Lembre-se de rodar estes comandos em terminais separados para manter ambos em execução ao mesmo tempo).*

# Documentação da API (Swagger)

A API possui documentação interativa com o Swagger. Para acessá-la:
1. Inicie o back-end (`npm run dev:backend`).
2. Acesse a URL: `http://localhost:3000/api-docs` no seu navegador.
