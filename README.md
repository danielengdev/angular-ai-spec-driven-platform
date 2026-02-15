# Plataforma de Engenharia Orientada a Specification com IA (Angular Demo)

## Visão Geral

Este projeto demonstra uma abordagem orientada a plataforma para desenvolvimento com IA utilizando:

- Specification Driven Design (SDD)
- Angular (Camada de Aplicação)
- MCP (Model Context Protocol) como interface de tooling
- Pipeline CI/CD automatizado
- Relatório de impacto de regeneração

O objetivo é simular como mudanças na specification podem regenerar automaticamente o código da aplicação de forma controlada e governada.

---

## O Problema

No desenvolvimento tradicional:

- Requisitos são declarativos
- Código é imperativo
- Com o tempo, eles divergem

Essa divergência gera:

- Débito técnico
- Risco regulatório
- Inconsistência entre regra e implementação
- Alto custo de manutenção

---

## A Proposta

Tratar a specification como **fonte única da verdade**.

Em vez de atualizar código manualmente:

Specification → Gerador → Código → Pipeline → Pull Request

A IA atua como um **compilador de specification**, não como um assistente de chat.

---

## Visão Arquitetural

/specs (Camada Declarativa)
↓
Engine de Geração (Camada de Transformação)
↓
Aplicação Angular (Camada Imperativa)
↓
Pipeline CI (Camada de Governança)

---

## Cenário de Demonstração

### Versão 1
Cadastro básico:
- Nome completo
- Email
- Senha

Pipeline gera a feature Angular automaticamente.

### Versão 2 (Simulação de mudança regulatória)

Specification atualizada para incluir:
- Confirmar senha
- Checkbox de aceite de termos
- Regra de senha forte

Pipeline executa:

- Atualização do Model
- Atualização do FormGroup
- Atualização do Template
- Geração de relatório de impacto

Exemplo de saída:

Relatório de Impacto:
Model: 100% regenerado
Component: 68% atualizado
Template: 54% atualizado
Service: inalterado

---

## Por que isso importa?

Este projeto demonstra:

- IA como engine de transformação
- Specification como mecanismo de governança
- Regeneração automatizada
- Engenharia de produtividade
- Evolução controlada de código

---

## O que este projeto NÃO é

Não é um exemplo de “usar IA para gerar código uma vez”.

É um protótipo de plataforma com regeneração determinística baseada em specification versionada.

---

## Evoluções Futuras

- Diff baseado em AST
- Validação formal de schema da specification
- Múltiplos domínios
- Policy as Code para specification

---

## Autor

Demonstração de Engenharia de Plataforma com IA aplicada ao ciclo de desenvolvimento.