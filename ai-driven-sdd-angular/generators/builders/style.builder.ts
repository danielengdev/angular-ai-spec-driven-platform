import { FeatureSpec } from '../parser';

export function buildStyle(spec: FeatureSpec): string {
    return `
:host {
  display: block;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

h2 {
  color: #333;
  margin-bottom: 24px;
  text-transform: capitalize;
}

form {
  display: flex;
  flex-direction: column;
  gap: 16px;

  .field {
    display: flex;
    flex-direction: column;
    gap: 8px;

    label {
      font-weight: 600;
      font-size: 14px;
      color: #555;
    }

    input {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 16px;

      &:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
      }

      &.ng-invalid.ng-touched {
        border-color: #dc3545;
      }
    }

    input[type="checkbox"] {
      width: fit-content;
      cursor: pointer;
    }
  }

  button {
    margin-top: 10px;
    padding: 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover:not(:disabled) {
      background-color: #0056b3;
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
}
`;
}