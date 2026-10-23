<p align="center">
  <img src="assets/banner.png" alt="Ryan for Georgia" width="100%">
</p>

# Ryan for Georgia

**Campaign website for Marcus Ryan, Democrat for Georgia State House, District 176.**

[![License: All Rights Reserved](https://img.shields.io/badge/license-all%20rights%20reserved-lightgrey)](#license)
![Vite](https://img.shields.io/badge/Vite-646CFF&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6&logo=typescript&logoColor=white)

Vite/React site with about, issues, events, volunteer, and donate sections. Footer states © 2026 RyanForGeorgia.com. Stock AI Studio README was replaced.


## How it works

```mermaid
flowchart LR
  V[Visitor] --> C[Campaign site]
  C --> A[Meet Marcus / priorities]
  C --> E[Events · volunteer · donate]
```

Vite/React campaign site for Marcus Ryan (GA House District 176). Georgia-themed navy / red / gold styling.

## Features

- Campaign sections: Meet Marcus, priorities, events, volunteer, donate CTA
- Georgia-themed styling (navy / red / gold)
- Optional Gemini service module

## Tech stack

- Vite + React + TypeScript
- Tailwind CSS
- Optional @google/genai

## How to run

```bash
npm install
npm run dev
```

Optional: set `GEMINI_API_KEY` in `.env.local` (see `.env.example`).

## Environment variables

Names only. Never commit values.

- `GEMINI_API_KEY`
- `APP_URL`

## Status

Public. Campaign site scaffold for District 176 (2026).

## License

All rights reserved. Site copy references Paid for by Marcus Ryan for Georgia.
