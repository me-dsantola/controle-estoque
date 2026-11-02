# Controle de Estoque Simplificado

**Aluno(a):** Davi Santiago Moreira
**Turma / Data:** ADS
**Link do Sistema Publicado:** [LINK DA VERCEL AQUI]

## 1. Apresentação e Objetivo
Sistema web desenvolvido como atividade prática para gerir um pequeno controlo de stock. Permite registar produtos, listar as quantidades, verificar alertas de stock baixo (menos de 5 unidades) e excluir itens. O projeto foi desenvolvido com o auxílio do Google Gemini como ferramenta de IA.

## 2. Tecnologias Utilizadas
* **Front-end:** Next.js, React e Tailwind CSS.
* **Back-end/Base de Dados:** Supabase (PostgreSQL) com Server Actions.
* **Testes:** Vitest.

## 3. Como Executar Localmente
1. Clone o repositório.
2. Instale as dependências com `npm install` (ou `npm install --legacy-peer-deps`).
3. Renomeie o ficheiro `.env.example` para `.env.local` e insira as suas chaves do Supabase.
4. Execute o servidor com `npm run dev` e aceda a `http://localhost:3000`.

## 4. Auditoria e Prompts (Resultados)
* **Prompt 4 (Auditoria Completa):** Realizada leitura do código inicial. Foi gerado o ficheiro `AUDITORIA.md` com os principais riscos identificados (RLS desligado e regras apenas no cliente).
* **Prompt 1 (Segurança):** Ativámos o RLS no Supabase para proteção da base de dados e movemos as regras de validação para o servidor usando Next.js Server Actions e a chave `service_role`.
* **Prompt 3 (Testes de Integração):** Foram elaborados testes focados no cadastro de produtos e validação de regras de negócio, utilizando o Vitest e *mocks* para simular o comportamento da base de dados.
* **Prompt 2 (Refatoração):** Separou-se a lógica de acesso aos dados (UI vs. Serviços), criando um ficheiro `services.ts` dedicado à comunicação com o Supabase.

## 5. Testes Realizados
Foram criados testes automatizados com o Vitest para os seguintes fluxos críticos:
* Cadastro com dados válidos (Caminho feliz).
* Bloqueio de cadastro com valores negativos (Preço/Quantidade).
* Bloqueio de cadastro com campos vazios.
* Exclusão de produto.
Para executar os testes, utilize o comando: `npx vitest run`.