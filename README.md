# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

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
