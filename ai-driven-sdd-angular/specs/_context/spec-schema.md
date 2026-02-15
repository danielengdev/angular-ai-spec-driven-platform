# Feature: <nome-da-feature>

## Metadata
version: 1.0.0
owner: <time-ou-area>
domain: <dominio>

---

## Inputs
- campo: tipo
- campo: tipo

Tipos permitidos:
- string
- number
- boolean
- date

---

## Validation Rules
- campo:
  - regra
  - regra

Regras permitidas:
- required
- minLength:<n>
- maxLength:<n>
- mustBeTrue
- mustMatch:<campo>

---

## API Contract
METHOD /endpoint

Request:
{
  campos
}

Response:
{
  campos
}