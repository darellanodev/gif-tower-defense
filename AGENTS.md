# AGENTS.md — Gif Tower Defense (p5.js)

## Project Overview

Tower defense game built with **TypeScript + p5.js**. Rewrite of an original 2012 Processing.js version.

- **Stack**: TypeScript (strict), p5.js (rendering), Vite (build), Vitest (tests), pnpm (packages)
- **Game**: Place towers on orange tiles to defend against enemy waves. 3 tower types + 3 magic spells. ~80 levels.
- **Architecture**: Singleton controllers, state machine, systems pattern (EnemySystem, TowerSystem, MagicSystem, HudSystem)

---

## Commands

| Command | Description |
|---------|-------------|
| `pnpm run dev` | Start dev server (Vite HMR) |
| `pnpm run build` | Type-check + production build |
| `pnpm run test` | Run all tests once |
| `pnpm run test:watch` | Run tests in watch mode |
| `pnpm run test:coverage` | Run tests with V8 coverage |
| `pnpm run sortlevels` | Sort AllLevels.ts by ID |
| `pnpm run oldlevelsconverter` | Convert old level format |

---

## Code Style

- **No semicolons**, single quotes, trailing commas everywhere (Prettier: `.prettierrc.json`)
- **Classes**: PascalCase. Methods/properties: camelCase. Constants: UPPER_SNAKE
- **Private fields**: Use ECMAScript `#field` syntax (not TS `private` keyword)
- **Types**: Interfaces for data shapes, `as const` for constant objects, type unions for enums (`TowerType`, `MagicsType`)
- **Imports**: ES modules `import { X } from './path'`. No default exports (except p5)
- **No parameter properties** — explicit `this.field = field` in constructors

### Singleton Pattern

```typescript
export class Foo {
  static #instance: Foo | null = null

  constructor() {
    if (Foo.#instance !== null) {
      throw new Error('Foo is a singleton, use getInstance()')
    }
    Foo.#instance = this
  }

  static getInstance() {
    if (Foo.#instance === null) {
      Foo.#instance = new Foo()
    }
    return Foo.#instance
  }

  static clearInstance() {
    Foo.#instance = null
  }
}
```

### Constants Pattern

```typescript
export const FOO = {
  BAR: 42,
  BAZ: 'hello',
} as const
```

---

## Architecture

### Game Loop (src/index.ts)
- Fixed update-then-draw: `game.update()` → `game.draw()`
- State machine dispatches per state: MENU_MAIN, MENU_SURVIVAL, PLAY_SURVIVAL, PAUSE, GAME_OVER

### Systems (orchestrated by Game)
- `EnemySystem` — spawn, path movement, dying/winning
- `TowerSystem` — targeting, drawing
- `MagicSystem` — spell updates
- `HudSystem` — all UI (panel, buttons, indicators, progress bars)
- `TileSystem` — create tiles from level map data

### Factory Pattern
Creators follow: `TowerGreenCreator`, `MagicFireballCreator`, `TileOrangeCreator`, `EnemyCreator`, etc. Each has `create()` and/or static methods.

### Level Data Format (10×16 grid)
```typescript
{
  id: number
  title: string
  author: string
  comments: string
  rowsMap: string[]         // 16 strings of 16 chars each
  money: number
  startDirection: string
  endDirection: string
}
```
Symbols: `x`=start, `y`=end, `0`=buildable (orange), `1`=path, `2`=blocked (black)

---

## Testing (Vitest)

- **Globals enabled**: `test`, `describe`, `expect` are global (no import needed)
- **Singletons**: Call `clearInstance()` before each test that uses a singleton
- **Helpers**: Located in `test/helpers/` — factory functions for enemies, towers, tiles, etc.
- **Flags**: `test/flags.ts` — `disableExplosion`, `disableImageLoading`, `instant_upgrading`
- **Test data**: `LevelsDataTesting.ts` for level map fixtures
- **Mock images**: Arrays of `null` (no real p5 canvas needed)

---

## Conventions

- Write everything in English
- Imperative present tense for commit messages
- TDD encouraged: write failing test → implement → refactor
- Use `tsx` for running TS scripts directly (utility scripts)
- Comments are sparse; prefer self-documenting code
- File structure mirrors domain: `src/enemies/`, `src/towers/`, `src/magics/`, etc.
- Keep AGENTS.md in sync: after adding dependencies, changing patterns, or introducing new conventions, update this file to reflect the current state
