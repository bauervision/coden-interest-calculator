# Coden Project Context

## Project

A local-first compound-interest calculator used as the first benchmark project
for the Coden AI coding assistant.

## Stack

- Vite
- React
- TypeScript
- Plain CSS
- Vitest
- npm

## Working Rules

- Use npm, never pnpm.
- Keep financial calculations outside React components.
- Do not add a state library unless application complexity clearly requires one.
- Preserve responsive behavior and accessible labels.
- Add or update unit tests whenever calculation behavior changes.
- Run `npm test`, `npm run lint`, and `npm run build` after code changes.
- Avoid large rewrites when a focused change will work.
- Do not create backup files unless requested.

## Calculation Assumptions

- The annual rate is treated as a nominal annual rate.
- The selected compounding frequency is converted to an equivalent monthly rate.
- Recurring contributions occur at the end of each contribution period.
- Results exclude taxes, inflation, fees, and legal account contribution limits.

## Current Milestone

Version 0.1 includes:

- Starting balance
- Monthly or annual recurring contributions
- Annual return
- Investment duration
- Monthly, quarterly, or annual compounding
- Live summary
- SVG growth chart
- Yearly breakdown
- Unit-tested calculation logic

## Potential Coden Benchmark Tasks

1. Add inflation-adjusted values without changing nominal results.
2. Add a savings-account comparison mode.
3. Add CSV export for the yearly breakdown.
4. Add contribution-limit warnings.
5. Find and fix an intentionally introduced off-by-one calculation bug.
