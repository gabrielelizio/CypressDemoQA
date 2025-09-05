# 🚀 DemoQA Automation Challenge

Este projeto implementa uma solução completa de automação de testes para o site DemoQA, utilizando **Cypress** com **JavaScript**, **Cucumber (BDD)** e **Page Actions Pattern**.

## 📋 Visão Geral

O projeto cobre:
- ✅ **Testes de API** - Fluxo completo de criação de usuário e gerenciamento de livros
- ✅ **5 Cenários de Frontend** específicos conforme desafio
- ✅ **BDD com Cucumber** para legibilidade dos testes
- ✅ **Page Object Pattern + Page Actions** para manutenibilidade
- ✅ **Relatórios HTML** detalhados
- ✅ **Cypress 15** com configuração moderna

## 🛠️ Tecnologias Utilizadas

- **Cypress 15.x** - Framework de testes E2E
- **@badeball/cypress-cucumber-preprocessor** - Integração Cucumber
- **@bahmutov/cypress-esbuild-preprocessor** - Processador ESBuild
- **multiple-cucumber-html-reporter** - Relatórios HTML
- **cypress-file-upload** - Upload de arquivos
- **ESBuild** - Bundler moderno

## 🚀 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Git

## ⚙️ Instalação

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd CypressDemoQA
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Instale o Cypress (se necessário):**
   ```bash
   npm run cypress:install
   ```

## 🏗️ Estrutura do Projeto

```
CypressDemoQA/
├── cypress/
│   ├── fixtures/           # Dados de teste
│   │   ├── test-data.json
│   │   └── test-file.txt
│   └── support/
│       ├── step_definitions/  # Step definitions BDD
│       │   ├── api.steps.js
│       │   └── practice-form.steps.js
│       ├── pages/            # Page Objects
│       │   └── practice-form.page.js
│       ├── actions/          # Page Actions
│       │   └── practice-form.actions.js
│       ├── commands.js       # Comandos customizados
│       └── e2e.js           # Configurações E2E
├── features/
│   ├── api/                 # Features de API
│   │   └── full-flow.feature
│   └── ui/                  # Features de UI
│       ├── practice-form.feature
│       ├── browser-windows.feature
│       ├── web-tables.feature
│       ├── progress-bar.feature
│       └── sortable.feature
├── cypress.config.js        # Configuração do Cypress
├── generate-report.js       # Script de relatórios
└── package.json
```

## 🏃‍♂️ Executando os Testes

### Todos os Testes
```bash
npm run test:all
```

### Testes por Categoria
```bash
# Apenas testes de API
npm run test:api

# Apenas testes de UI
npm run test:ui
```

### Testes Específicos
```bash
# Practice Form
npm run test:practice-form

# Browser Windows
npm run test:browser-windows

# Web Tables
npm run test:web-tables

# Progress Bar
npm run test:progress-bar

# Sortable
npm run test:sortable
```

### Interface Gráfica
```bash
npm run cypress:open
```

## 🧪 Cenários de Teste Implementados

### 📡 API Tests
- ✅ Criação de usuário
- ✅ Geração de token de acesso
- ✅ Verificação de autorização
- ✅ Listagem de livros disponíveis
- ✅ Adição de livros à coleção
- ✅ Consulta de detalhes do usuário

### 🖥️ UI Tests
1. **Practice Form** - Preenchimento e submissão de formulário com dados aleatórios
2. **Browser Windows** - Manipulação de novas janelas do navegador
3. **Web Tables** - Operações CRUD em tabelas web
4. **Progress Bar** - Controle e validação de barra de progresso
5. **Sortable** - Reordenação de elementos por drag and drop

## 📊 Relatórios

Após a execução dos testes, gere o relatório HTML:

```bash
npm run report
```

Os relatórios serão gerados em `cypress/reports/html/`

## 🔧 Comandos Customizados

O projeto inclui comandos customizados para melhor usabilidade:

- `cy.forceClick()` - Click forçado em elementos
- `cy.waitForElement()` - Aguardar elemento estar visível
- `cy.setTestData()` / `cy.getTestData()` - Gerenciar dados de teste
- `cy.loginAPI()` - Autenticação via API com cy.session()
- `cy.navigateWithRetry()` - Navegação com retry automático

## 🏷️ Tags Disponíveis

Execute testes por tags específicas:

```bash
# Por tipo
npx cypress run --env TAGS=@api
npx cypress run --env TAGS=@ui

# Por funcionalidade
npx cypress run --env TAGS=@practice-form
npx cypress run --env TAGS=@browser-windows
npx cypress run --env TAGS=@web-tables
npx cypress run --env TAGS=@progress-bar
npx cypress run --env TAGS=@sortable

# Cenários bonus
npx cypress run --env TAGS=@bonus
```

## 🚀 Funcionalidades Modernas (Cypress 15)

- ✅ **cy.session()** para gerenciamento de autenticação
- ✅ **ESBuild** para performance aprimorada
- ✅ **setupNodeEvents** moderna
- ✅ **Component Testing** ready
- ✅ **TypeScript Support** aprimorado

## 🤝 Padrões Implementados

### Page Object Pattern
```javascript
class PracticeFormPage {
  elements = {
    firstName: () => cy.get('#firstName'),
    lastName: () => cy.get('#lastName'),
    // ...
  }
}
```

### Page Actions Pattern
```javascript
class PracticeFormActions {
  fillFormWithRandomData() {
    // Implementation
  }
}
```

### BDD with Cucumber
```gherkin
Feature: Practice Form Submission
  Scenario: Submit practice form with random data
    Given I access the demoqa website
    When I navigate to "Forms" -> "Practice Form"
    # ...
```

## 🐛 Troubleshooting

### Problemas Comuns

1. **Cypress não instala**: Verifique conexão de rede e proxy
2. **Testes falhando**: Verifique se o site DemoQA está acessível
3. **Elementos não encontrados**: Aguarde carregamento da página

### Logs e Debug

Use os comandos de log para debug:
```javascript
cy.log('Debug message');
```

## 🎯 Melhores Práticas Implementadas

- ✅ **Separation of Concerns** - Pages, Actions e Steps separados
- ✅ **DRY Principle** - Reutilização de código
- ✅ **Explicit Waits** - Aguardar elementos adequadamente
- ✅ **Error Handling** - Tratamento de erros robusto
- ✅ **Data-Driven Testing** - Dados dinâmicos para testes
- ✅ **Readable Tests** - BDD para legibilidade

## 📈 Métricas de Qualidade

- ✅ **100% BDD Coverage** - Todos os cenários em Gherkin
- ✅ **Page Object Pattern** - Estrutura organizada
- ✅ **Cross-browser Ready** - Configurado para múltiplos browsers
- ✅ **CI/CD Ready** - Scripts npm configurados
- ✅ **Reporting** - Relatórios HTML detalhados

## 🔄 CI/CD Integration

O projeto está pronto para integração com pipelines CI/CD:

```yaml
# GitHub Actions example
- name: Run Cypress Tests
  run: |
    npm ci
    npm run test:all
    npm run report
```

## 📝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.

## 🎯 Conclusão

Este projeto demonstra uma implementação completa e moderna de automação de testes, seguindo as melhores práticas da indústria e utilizando as tecnologias mais atuais do ecossistema Cypress.

---

**Desenvolvido com ❤️ para o desafio QA Automation DemoQA**
