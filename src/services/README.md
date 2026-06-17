# Camada de Serviços — ELLP

Esta pasta concentra todas as chamadas ao backend. Os componentes nunca chamam
`fetch` diretamente — sempre usam um service daqui.

## Variáveis de ambiente

| Variável | Default | Descrição |
|---|---|---|
| `VITE_USE_MOCK` | `true` | Se `false`, desliga o mock e usa o backend real. |
| `VITE_API_BASE_URL` | `""` | Base URL da API (ex.: `https://api.ellp.utfpr.edu.br`). |

## Endpoints esperados (para o módulo de Tutores)

### Auth
- `POST /auth/login` → `{ email, senha }` → `{ token, user }`
- `POST /auth/register` → `{ ...TutorInput, senha }` → `Tutor` (status `pendente`)
- `GET /auth/me` (Bearer) → `AuthUser`

### Tutores
- `GET /tutores` → `Tutor[]`
- `POST /tutores` → `Tutor`
- `GET /tutores/:id` → `Tutor`
- `PUT /tutores/:id` → `Tutor`
- `PATCH /tutores/:id/status` → `{ status }` → `Tutor`
- `DELETE /tutores/:id` → 204
- `GET /tutores/:id/oficinas` → `Oficina[]`

### Oficinas (módulo do Danilo)
- `GET /oficinas` → `Oficina[]`

Os tipos canônicos estão em `src/types/tutor.ts` e `src/types/oficina.ts`.

## Login mock (para demo)

- Admin: `admin@ellp.utfpr.edu.br` / `admin123`
- Tutor: `tutor@ellp.utfpr.edu.br` / `tutor123`
