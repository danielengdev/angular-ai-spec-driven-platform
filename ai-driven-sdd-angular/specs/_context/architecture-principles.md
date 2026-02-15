# Arquitetura da Plataforma

## 1. Filosofia de Design

Esta plataforma separa claramente:

- Camada Declarativa (Specifications)
- Camada de Transformação (Engine de Geração)
- Camada Imperativa (Código Angular)
- Camada de Governança (Pipeline CI/CD)

A specification é tratada como artefato compilável.

---

## 2. Camadas Arquiteturais

### 2.1 Camada de Domínio

Localizada em `/specs`.

Contém definições estruturadas de features seguindo um formato previsível (DSL simplificada).

É a fonte única da verdade.

---

### 2.2 Camada de Plataforma

Localizada em `/platform`.

Responsabilidades:

- Validar specification
- Interpretar regras
- Gerar artefatos Angular
- Produzir relatório de impacto

Módulos principais:

- spec-validator.ts
- generator.ts
- impact-reporter.ts

---

### 2.3 Camada de Tooling (MCP)

Localizada em `/mcp`.

Função:

- Expor acesso controlado ao sistema de arquivos
- Orquestrar leitura de specification
- Orquestrar escrita de artefatos

Permite integração estruturada com modelos de IA.

---

### 2.4 Camada de Aplicação

Localizada em `/src`.

Contém a aplicação Angular gerada ou parcialmente regenerada.

Alterações manuais devem ser minimizadas para preservar determinismo.

---

### 2.5 Camada de Governança

Pipeline CI localizado em `.github/workflows`.

Responsável por:

- Detectar alteração em specification
- Executar geração automática
- Rodar lint e testes
- Commit automático ou criação de PR

---

## 3. Modelo de Regeneração

Mudança na specification dispara:

1. Validação estrutural
2. Geração de artefatos
3. Análise de impacto
4. Quality gate

Fluxo equivalente a compilação:

Fonte → Transformação → Artefato → Validação

---

## 4. Princípios de Engenharia

- Declarativo como origem
- Geração determinística
- Regeneração controlada
- Transparência de impacto
- Governança automatizada