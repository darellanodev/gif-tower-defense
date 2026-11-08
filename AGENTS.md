# AGENTS.md — Gif Tower Defense (p5.js)

## Project Overview

Tower defense game built with **TypeScript + p5.js**.

- **Stack**: TypeScript (strict), p5.js (rendering), Vite (build), Vitest (tests), pnpm (packages)
- **Game**: Place towers on orange tiles to defend against enemy waves. 3 tower types + 3 magic spells. Many levels.
- **Architecture**: Singleton controllers, state machine, systems pattern (EnemySystem, TowerSystem, MagicSystem, HudSystem)

---

## Commands

| Command                       | Description                   |
| ----------------------------- | ----------------------------- |
| `pnpm run dev`                | Start dev server (Vite HMR)   |
| `pnpm run build`              | Type-check + production build |
| `pnpm run test`               | Run all tests once            |
| `pnpm run test:watch`         | Run tests in watch mode       |
| `pnpm run test:coverage`      | Run tests with V8 coverage    |
| `pnpm run sortlevels`         | Sort AllLevels.ts by ID       |
| `pnpm run oldlevelsconverter` | Convert old level format      |

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

- Fixed update-then-draw: `game.updateFrame()` → `game.draw()`. `updateFrame()` runs `game.update()` as many times as the game speed says (`GameSpeed`, key `S`: ×1, ×2, ×4, see `constants/gameSpeed.ts`), stopping if the game is no longer playing.
- **Anything that depends on time must live in `update()`, never in `draw()`**, otherwise it will not follow the game speed (and would keep running while paused). Explosions, fly indicators and enemy eye animations are the only cosmetic exceptions.
- Dead instances must not be updated again before being removed (see `Missile.updateInstances`), because several updates can run before the next `draw()`.
- State machine dispatches per state: MENU_MAIN, MENU_SURVIVAL, PLAY_SURVIVAL, PAUSE, GAME_OVER

### Systems (orchestrated by Game)

- `EnemySystem` — spawn, path movement, dying/winning
- `TowerSystem` — targeting (enemies and crystals), tower updates, drawing
- `CrystalSystem` — rewards and replaces the destroyed crystals with buildable tiles
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

Symbols: `x`=start, `y`=end, `0`=buildable (orange), `1`=path, `2`=blocked (black), `s`=ice path (walkable, enemies move at ×2 speed leaving it), `c`=crystal (fixed target of the green towers: 500 health, 75 money and score when destroyed; the tile becomes orange afterwards)

`x` is where the enemies enter and `y` where they leave. The legacy game was the other way round (it spawned enemies at `y`), so `OldLevelConverter` swaps both symbols and uses the legacy directions as they are: `startDirection` is the direction in which the enemies enter the map through `x`, `endDirection` the one in which they leave through `y`.

Enemies follow the legacy turning rule (`src/levels/path/PathDirection.ts`): straight while possible, otherwise the first walkable neighbour in the order left, right, up, down without going back; in a dead end they turn back.

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
- Imperative present tense for commit messages, following Conventional Commits.
- TDD encouraged: write failing test → implement → refactor
- Use `tsx` for running TS scripts directly (utility scripts)
- Comments are sparse; prefer self-documenting code
- File structure mirrors domain: `src/enemies/`, `src/towers/`, `src/magics/`, etc.

## Roadmap and Iteration Workflow

The plan to port the legacy game (processing.js, 2012) lives in [`ROADMAP.md`](./ROADMAP.md). Read it before starting a feature: it has the legacy reference values, the iteration order and open decisions.

- One feature per iteration. Each iteration is delivered as `gif-tower-defense-v0.N.0.zip` and `package.json` `version` is `0.N.0` (minor +1 per iteration; `1.0.0` = parity with the legacy game). Current version: see `package.json`.
- Before delivering: `pnpm run test` and `pnpm run build` must pass. Do not include `node_modules/` or `dist/` in the zip.
- Update `ROADMAP.md` (tick the iteration, adjust the plan) and this file when the architecture changes.
- Source files use CRLF line endings (`.ts`, `package.json`, `README.md`); `AGENTS.md` and `ROADMAP.md` use LF. Keep each file's existing style.

### Known gaps (details and plan in ROADMAP.md)

- `STATE_PLAY_SURVIVAL_GAME_OVER` is set but never drawn (`src/index.ts` has no case for it).
- `Wallet`, `Player` and several static counters are not reset by `Game.loadLevel`.
- Supported tile symbols are `0 1 2 x y s c` (`Config.availableTiles`); the remaining legacy levels need `5 6 7 p q`.
- 32 imported levels never reach the end tile, exactly as in the legacy game (no route, or intentional loops). They are listed in `test/levels/AllLevelsPaths.test.ts`; do not import a new level that does not reach the end unless it is a known case.
- `Config.gameMode` is committed as `MODE.TESTING`.
- No sound, no editor (the *Editor* and *Today's* menu buttons are disabled).

## Maintenance

Whenever making changes to the project, review this file and update it to stay coherent with the current state of the codebase.
