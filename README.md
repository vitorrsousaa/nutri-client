# goDiet - Client

<h2 id="started">📌 About</h2>

Simple description of what your project do or how to use it.

<h2 id="started">🚀 Getting started</h2>

Here you describe how to run your project locally

<h3>Prerequisites</h3>

Here you list all prerequisites necessary for running your project. For example:

- [NodeJS](https://github.com/)
- [Git 2](https://github.com)

<h3>Cloning</h3>

How to clone your project

```bash
git clone your-project-url-in-github
```

<h3>Starting</h3>

How to start your project

```bash
cd project-name
npm some-command-to-run
```

<h2 id="routes">📍 Application Routes</h2>

Here you can list the main routes of your API, and what are their expected request bodies.
​
| route               | description
|----------------------|-----------------------------------------------------
| <kbd>/authenticate</kbd>     | page that list all user info
| <kbd>/login</kbd>     | page to login
| <kbd>/dashboard</kbd>     | page that contains all user shopping and spences info


### Conventional commits

`feat` – a new feature is introduced with the changes
`fix` – a bug fix has occurred
`chore` – changes that do not relate to a fix or feature and don't modify src or test files (for example updating dependencies)
`refactor` – refactored code that neither fixes a bug nor adds a feature
`docs` – updates to documentation such as a the README or other markdown files
`style` – changes that do not affect the meaning of the code, likely related to code formatting such as white-space, missing semi-colons, and so on.
`test` – including new or correcting previous tests
`perf` – performance improvements
`ci` – continuous integration related
`build` – changes that affect the build system or external dependencies
`revert` – reverts a previous commit

## Git Flow

1. **Main:** A branch "main" é a principal ramificação do código-fonte que reflete o software em produção.

2. **Develop:** A branch "develop" é usada como uma ramificação de integração. Ela reflete o estado do código-fonte que esta sendo desenvolvido para a próxima versão do software.

3. **Feature:** As branchs "feature" são criadas a partir da branch "develop" e são usadas para desenvolver novas funcionalidades ou recursos.

4. **Fix:** As branchs "fix" são criadas a partir da branch develop para realizar a correção de algum bug que não necessita de correção imediata.

5. **Hotfix:** Se um bug crítico é descoberto em produção e requer uma correção imediata, uma branch "hotfix" é criada a partir da branch "main"

RESPOSTA 1
Aqui estão as etapas de como isso pode ser configurado no GitHub e algumas sugestões para workflows em relação às branchs develop e main::

Configuração no GitHub:

Proteção de Branchs:

No repositório do GitHub, vá para a aba "Settings".
Em "Branches", escolha "Branch protection rules".
Configure uma regra de proteção para a branch main. Isso pode incluir requisitos como revisões de código e testes de CI bem-sucedidos antes de permitir a mesclagem. Certifique-se de que as revisões de código sejam feitas por pessoas diferentes da que fez o pull request.
Da mesma forma, configure uma regra de proteção para a branch develop com requisitos semelhantes.
Definir Branch Padrão:

Vá para "Settings" > "Branches".
Defina a branch develop como a branch padrão (default branch). Isso fará com que os pull requests sejam criados por padrão em relação à branch develop, e não à main.
Workflows no GitHub:

Aqui estão algumas sugestões para workflows em relação às branchs develop e `main:

Alterações na Branch Develop:

Criação de Pull Request (PR): Quando um desenvolvedor deseja contribuir com uma nova funcionalidade ou correção de bug, ele cria um novo branch de feature a partir da develop. Após a conclusão, um pull request é criado para mesclar a branch de feature de volta na develop. Isso aciona revisões de código e testes automatizados.

Testes de Integração Contínua: Configurar um pipeline de CI/CD que seja executado sempre que um pull request for aberto para a develop. Isso pode incluir testes de unidade, testes de integração, e análises de código.

Revisão de Código: Certificar-se de que todas as alterações na develop passem por revisões de código. A revisão deve garantir que o código é de alta qualidade e segue as melhores práticas.

Implantação em Ambiente de Staging: Pode ser útil implantar as alterações da develop em um ambiente de teste (staging) para testes mais amplos antes da versão final.

Alterações na Branch Main (para Release):

Criação de Pull Request (PR): Quando uma versão estável está pronta para implantação, um pull request é criado para mesclar a develop na main.

Testes de Integração e Qualidade: Certificar-se de que todas as alterações na main passem por testes de integração mais rigorosos e verificações de qualidade. Esses testes podem incluir testes de regressão em ambientes de produção.

Geração de Versão: Após a mesclagem na main, é uma prática comum gerar uma tag de versão correspondente para rastrear as versões do software.

Implantação em Produção: Implantar a versão estável em ambiente de produção.

Lembre-se de que os fluxos de trabalho podem variar com base nas necessidades do projeto e na equipe. Certifique-se de personalizar essas sugestões de acordo com os requisitos específicos da sua aplicação.

### Olhar padrões de código

https://github.com/gabrielcaamargo/autorent/tree/develop
