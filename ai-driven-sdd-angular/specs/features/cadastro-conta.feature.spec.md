# Feature: Cadastro de Conta

## Inputs

- fullName: string
- email: string
- password: string
- confirmPassword: string
- acceptTerms: boolean

---

## Regras de Validação

- fullName:
  - obrigatório
  - mínimo 3 caracteres

- email:
  - obrigatório
  - formato válido

- password:
  - obrigatório
  - mínimo 8 caracteres
  - deve conter número
  - deve conter caractere especial

- confirmPassword:
  - deve ser igual a password

- acceptTerms:
  - deve ser verdadeiro

---

## Regras de Negócio

- Sistema deve impedir cadastro com email duplicado
- Senha deve ter indicador de força
- Botão de envio deve ficar desabilitado se formulário inválido

---

## Contrato de API

POST /users

Request:
{
  fullName,
  email,
  password
}

Response:
{
  id,
  createdAt
}

---

## Comportamento de UI

- Exibir mensagens de erro abaixo dos campos
- Exibir indicador visual de força da senha
- Desabilitar botão se formulário inválido
- Exibir mensagem de erro em caso de email duplicado