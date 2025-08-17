# CRAIViz CLI

Modular, audit-logged onboarding system with emotional UX and avatar personalization.

## Usage

Run commands via:

```bash
./scripts/crai init
./scripts/crai inject onboardController.js
./scripts/crai ux onboardController.js
./scripts/crai log
```

## New Routes

| `/avatar-state/:id` | GET | Returns emotional state transitions for avatar |

## New Scripts

- `preview.sh` — Upload asset, list files, fetch avatar
- `diagnostics.sh` — Check and install missing modules

## Persona & Analytics Routes

| `/persona/:email`           | GET    | Fetch persona profile              |
| `/persona/:email/mood`      | POST   | Update mood + log history          |
| `/analytics/log`            | POST   | Log onboarding or UX event         |
| `/analytics/events`         | GET    | Fetch all logged events            |
