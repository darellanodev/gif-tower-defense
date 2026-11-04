# ROADMAP — porting the legacy Gif Tower Defense to TypeScript + p5.js

Legacy game: 2012, processing.js, files `juego_survival_min.pde` and `juego_editor2_min.pde` (minified; the survival one is also obfuscated).
This document is the plan to bring its features into this codebase. `AGENTS.md` links here.

---

## 1. How we iterate

- **One feature (or one coherent slice) per iteration.** Each iteration ships `gif-tower-defense-vN.zip` and sets `"version": "N.0.0"` in `package.json`.
- **Definition of done:** `pnpm run test` and `pnpm run build` pass; new behaviour has tests (TDD encouraged); `AGENTS.md` updated if architecture, commands or conventions change; this file updated (tick the iteration, adjust the plan).
- The zip never includes `node_modules/` or `dist/`.
- The order below is a proposal. Reorder freely, but respect the `Depends on` lines.

Status legend: `[x]` done · `[ ]` pending.

- [x] **v2** — This roadmap.

---

## 2. Gap analysis (legacy vs. current)

| Legacy feature | Current status | Planned |
| --- | --- | --- |
| 3 towers (laser / missile / life), 6 upgrade levels, sell on right click | Ported (green / red / yellow) | — |
| 3 magics (UFO, fireball, iceball) with limited uses | Ported (buttons with item counters) | — |
| Waves, bosses, lives, money, score, pause | Ported | — |
| Survival menu with paginated mini-maps | Ported | — |
| Game over screen + retry | **Missing** (state exists, nothing is drawn: frozen frame) | v3 |
| Reset of per-level state (lives, wallet, wave, statics) | **Missing** (singletons survive `loadLevel`) | v3 |
| Exit to menu from a running level | **Missing** | v3 |
| Speed toggle (key `S`) | Missing | v4 |
| Ice path tile `s` | Missing | v5 |
| Crystal tile `c` | Missing (assets `img/tiles/crystal.png` already present) | v6 |
| Jumper tiles `5` `6` `7` | Missing (assets `jumper1-3.png` already present) | v7 |
| Teleport tiles `p` `q` | Missing (assets needed) | v8 |
| ~1560 old levels | Blocked by the four tiles above | v5–v9 |
| **Level editor** | Missing (button exists, disabled) | v10–v13 |
| Sound effects | Missing | v14 |
| Heatmap (key `H`) | Missing | v15 |
| Click enemy to force target, hotkeys `7` `8` `9` | Missing | v16 |
| Per-level lives / magics / award money | Missing | v17 |
| Persistence, "Today's" mode, news, last played | Hard-coded / disabled | v18 |
| Soul particles, loading screen | Missing (cosmetic) | v19 |

---

## 3. What the legacy level data says (drives the order)

`src/levels/levelsData/oldLevels.txt` holds **1562 not-yet-imported levels**. Every one of them uses at least one tile the new game cannot render yet (the 325 levels made only of `0 1 2 x y` are already in `AllLevels.ts`).

| Tile | Levels using it | Cumulative levels playable after implementing (in roadmap order) |
| --- | --- | --- |
| Ice `s` | 584 (37 %) | 221 |
| Crystal `c` | 1190 (76 %) | 591 |
| Jumpers `5 6 7` | 799 (51 %) | 941 |
| Teleports `p q` | 621 (40 %) | 1562 |

So: ice is the cheapest warm-up, crystals the biggest single unlock, and teleports are needed to reach 100 %.

---

## 4. Iterations

### Phase 1 — Close the game loop

#### [ ] v3 — Level lifecycle: game over, retry, exit to menu (M)
- **Why first:** today `STATE_PLAY_SURVIVAL_GAME_OVER` is set but `index.ts` has no case for it, so the screen freezes. Also `Game.loadLevel` calls `Wallet.getInstance(...)`, which returns the existing wallet and ignores the new level's money, and `Player` (lives, wave, score) and several statics (`Enemy.allowCreateEnemies/waveEnemies/createEnemyTime`, `Missile`, `Explosion*`, `FlyIndicator`, `Path.orders`) are never reset. Retry and "back to menu" are impossible until this is fixed.
- **Legacy:** `final_triste.png` banner (500×154 at 150,144); the retry button appears after a 5 s countdown (`reintentartimer`); 7 initial lives.
- **Tasks:** a single `resetLevelState()` (or `clearInstance()` for each singleton); draw game over overlay; buttons *Retry* (same level) and *Menu*; exit-to-menu button/key (`Esc`) during play; pause overlay text (`(PAUSE)` / `PRESS 'P' TO RESUME`).
- **Done when:** playing level A, losing, retrying and then playing level B all start with fresh money/lives/wave/score; tests cover the reset.
- **Assets needed:** `final_triste.png`, `boton_reintentar.png` (or draw with p5).

#### [ ] v4 — Game speed toggle (S)
- **Legacy:** key `S` and HUD button (`speed.png`) switched 30 fps ↔ 300 fps skipping draws.
- **Proposal:** run N `update()` ticks per `draw()` (N from a constant list, e.g. 1 → 2 → 4) instead of changing `frameRate`; replaces the manual tuning noted in `constants/enemy.ts`.
- **Done when:** `S` and a HUD button cycle speeds; wave timers, enemy creation, upgrades and magics stay consistent at every speed (tests on tick counts).

### Phase 2 — Special tiles (unlock the legacy levels)

Each iteration in this phase follows the same recipe: new symbol in `constants/tile.ts` and `Config.availableTiles` → tile class + creator → `Path`/`PathMovement` support → converter (`OldLevelConverter`) accepts it → import the newly unlocked levels in a batch → tests with a fixture level → editor tool is added later in v12.

> **Step 0 for v5 (decision, see §6.1):** the legacy game spawned enemies at `y` and they ended at `x`; the current game spawns at `x` and the converter flips the direction codes but keeps the symbols. Jumpers, teleports and ice are directional/order-dependent, so decide this before importing anything and add a test that the converted path order matches the legacy one.

#### [ ] v5 — Ice path `s` (S) — unlocks 221 levels
- **Legacy:** tile painted as a translucent teal square (`rgba(0,158,158,120)`, no sprite). Enemy speed 2.5 → 5 on ice (boss 1 → 2). Magics keep a fixed speed.
- **Tasks:** `TileIce`; speed multiplier ×2 while the enemy is on an ice tile (new base speeds are `NORMAL: 1`, `BOSS: 0.5`; speeds must stay multiples of the tile size, see comment in `constants/enemy.ts`).
- **Depends on:** v3 (clean level reload to test several levels), decision 6.1.

#### [ ] v6 — Crystals `c` (M) — +370 levels (591 total)
- **Legacy:** a crystal is a static target with 500 HP placed on a tile. Only **laser (green) towers** target it; the missile-tower targeting loop excludes crystals. Destroying it pays `floor(500/5) − 25 = 75` money (and the same score), plays a break sound + crystal particles, and the tile becomes `0` (buildable). Until then it is neither path nor buildable. Enemies stepping on a blocked tile are flagged as `errorbloqueado`.
- **Tasks:** introduce a common *target* abstraction (enemy | crystal) for `TowerGreen`; `TileCrystal` → `Crystal` entity with health bar; replace tile with orange on death; particles.
- **Assets:** `img/tiles/crystal.png` (present), `particlecrystal.png` (optional).

#### [ ] v7 — Jumpers `5` `6` `7` (M) — +350 levels (941 total)
- **Legacy:** stepping on `5/6/7` makes the enemy jump straight over **2/3/4 tiles** at speed 5 (magic projectiles 25). While jumping it is skipped by **laser** towers (the legacy missile-tower code has no such check) and is drawn above towers (`redibujado`). Sound id 5.
- **Tasks:** extend `Path.makeOrders` to emit jump segments; `PathMovement` handles airborne state; laser targeting skips jumping enemies; draw order.
- **Assets:** `img/tiles/jumper1-3.png` (present).

#### [ ] v8 — Teleports `p` / `q` (M) — +621 levels (1562 total)
- **Legacy:** exactly **one pair** (editor removes duplicates). Enemy reaching `p` shrinks for ~100 ticks (scale → 1), reappears on `q` keeping its direction and regrows for ~50 ticks. Magic projectiles do not hit an enemy while it teleports; the legacy tower code has no teleport check.
- **Tasks:** `TileTeleportIn/Out`; path orders jump from `p` to `q`; shrink/grow animation.
- **Assets needed:** `teleportin.png`, `teleportout.png` (`teleport.png` optional).

#### [ ] v9 — Bulk level import and scalable level menu (M)
- **Why:** `AllLevels.ts` would grow from ~325 to ~1900 levels (~27 k lines) and the survival menu pages at 10 mini-maps per page (~190 pages).
- **Tasks:** run the converter for all unlocked levels (skip those with unsupported symbols, de-duplicate identical maps — 1555 unique of 1562); move level data to JSON loaded lazily (keep a small fixture set in tests); paginator jump (first/last/“go to page”), optional search by title/author; keep `sortlevels` working.

### Phase 3 — Level editor

Legacy editor (`juego_editor2_min.pde`): 16×10 grid, two tool panels (toggle with `M`), paint with click **and drag**, play-test with `T` (starts with 300 money, 7 lives, restores the map when you return), clear map with `C`, publish with `E`. Tools and keys are listed in Appendix A.

#### [ ] v10 — Editor shell and basic painting (L)
- New state `STATE_EDITOR`; enable the existing *Editor* button in `MenuMain`; grid + hover preview; tools: erase/ground `0`, path `1`, stone `2`; start/goal placement on the **border only** (corner cells toggle between the two possible directions); only one start and one end (placing a new one clears the old); tooltip text per tool (legacy strings in Appendix A); `Menu` button.
- **Depends on:** v3 (state reset / menu navigation).

#### [ ] v11 — Validation and test play (M)
- Validate with `Path.makeOrders` (start and end present, connected path); show the reason when invalid. `T` toggles *edit ↔ play-test* with legacy defaults (money 300, lives 7); leaving the test restores the edited map exactly.

#### [ ] v12 — Special-tile tools (S/M)
- Second panel: ice `s`, crystal `c`, jumper (click cycles `5→6→7`), teleport in/out (one pair). Added tool-by-tool as v5–v8 land if the editor already exists.
- **Depends on:** v5–v8, v10.

#### [ ] v13 — Save, export, import, "My levels" (M)
- Persist to `localStorage`; export/import as text (legacy string `rows,…@dirStart,dirEnd,ex,ey,money`) and as `MapDataType` JSON; file download/upload; list user levels in the main menu (replaces the hard-coded `lastEditorLevelsIds = [8]`).
- **Decision:** local-only vs. any sharing backend (see §6.3).

### Phase 4 — Parity and polish

#### [ ] v14 — Sound effects (M)
- Legacy ids: `0` enemy dies · `1` game over · `2` magic launched · `5` jump · `6` build tower · `7` upgrade · `8` sell · `9` life tower grants a life · `10` lose a life · `11` new wave · `12` crystal destroyed · `13` enemy spawns. Global on/off (`sonidofx`).
- p5.sound or plain `HTMLAudioElement`; mute toggle persisted. **Assets needed.**

#### [ ] v15 — Heatmap (S/M)
- Survival-only. Counters per cell (16×10) incremented where an enemy dies or a magic hits; normalised to 0–10 buckets with a colour ramp; key `H` pauses and shows it, `H`/`P` resumes (`(HEATMAP)` label).

#### [ ] v16 — Controls parity (S)
- Click an enemy to force-target it (towers prefer it; `targetenemigo.png` marker; click again to release). Hotkeys `7`/`8`/`9` for the magics (legacy: UFO, magic 2, magic 3 — most likely fireball and iceball, verify against sprites).

#### [ ] v17 — Per-level parameters + balance pass (M)
- Extend `MapDataType` with optional `lives`, `magics { fireball, iceball, ufo }`, `awardMoney` (legacy loaded them per level; minimum starting money 150; award added on top). Compare balance (Appendix B) and decide what to restore.

#### [ ] v18 — Persistence and main-menu features (M)
- Remember last played levels (replace hard-coded `[1, 14, 13]`), best score per level, highest unlocked; enable the *Today's* button (e.g. level of the day by date); news list from data.

#### [ ] v19 — Cosmetics (S)
- Soul particles (`alma_capturada` rises when an enemy dies, `alma_libre` when it reaches the goal), loading screen with progress bar, final "happy" banner if a win condition is ever defined.

### Housekeeping (can piggy-back on any iteration)
- `Config.gameMode` is committed as `MODE.TESTING` (debug labels + testing money). Drive it from `import.meta.env.DEV` so production builds use `NORMAL`.
- `README.md` still says Jest and Parcel; the project uses Vitest and Vite. `package.json` has an empty `description`.
- `src/index.ts` has an "ugly hack" removing `defaultCanvas1` and a `contextmenu` workaround; worth revisiting once game states are refactored.

---

## 5. Backlog / ideas (not scheduled)
Mobile/touch controls (right-click sell has no touch equivalent) · tower targeting priorities · difficulty presets · achievements · level rating/tags · replay.

---

## 6. Decisions needed

1. **Travel direction of converted levels.** Legacy: enemies spawn at `y`, goal is `x`. Current: enemies spawn at `x`, and `OldLevelConverter` swaps `1↔2` and `3↔4` but keeps the symbols, so converted levels appear to run reversed. Fine for symmetric maps, wrong for jumpers/teleports. Options: swap `x`/`y` in the converter, or keep the maps and reverse the tile semantics. *(Please confirm what you intended.)*
2. **Balance.** Costs and sell values match the legacy game; damage, range and rewards do not (Appendix B). Keep the new values or restore the old ones?
3. **Backend.** The legacy game loaded levels, scores and "award money" from a PHP server. Static-only with `localStorage` (proposed) or a service later?
4. **Assets.** Missing sprites/sounds must come from your old project (Appendix C). Until then I can draw placeholders with p5 primitives, as the legacy ice tile did.
5. **Editor look.** Recreate the legacy two-panel bar (`panel_editorv2_p1/p2`) or build a new one with the current HUD button style?

---

## Appendix A — Legacy reference

**Board:** 800 × (500 + 84) px, 16 × 10 tiles of 50 px, panel height 84, 30 fps. Max 200 enemies, 200 towers.

**Tile codes:** `0` ground (buildable) · `1` path · `2` stone (not buildable) · `s` ice path · `c` crystal · `5/6/7` jumper (2/3/4 tiles) · `p` teleport in · `q` teleport out · `x` goal (`meta`) · `y` enemy gateway (`salida`).
**Direction codes:** `1` left · `2` right · `3` up · `4` down (same numbers as `constants/direction.ts`).
**Old level string:** `row0,row1,…,row9@dirX,dirY,spawnX,spawnY,money`.

**Editor tools** (panel 1 / panel 2) and keys:

| Key | Tool | Legacy tooltip |
| --- | --- | --- |
| `0` | Erase → `0` | Ground: on the ground the player can place towers. |
| `1` | Path `1` | Path: along the path the enemies reach the goal. |
| `9` | Stone `2` | Stone: on the stone the player can not place towers. |
| `5` | Gateway `y` | Gateway: place the enemy's gateway on the edges. |
| `6` | Goal `x` | Goal: place the enemy's goal on the edges. |
| `2` | Ice `s` | Ice Path: the ice path increases the speed of the enemies. |
| `3` | Crystal `c` | Crystals: the laser towers can destroy them and win money. |
| `4` | Jumper `5/6/7` | Jumpers: make the enemies jump. Click again to change the jump distance. |
| `7` | Teleport in `p` | Teleport in: enemies go to teleport out. |
| `8` | Teleport out `q` | Teleport out: enemies go out from teleport in. |
| `M` | Switch panel | |
| `T` | Test play ↔ edit | `PRESS T KEY TO EDIT MODE` |
| `C` | Clear map | |
| `E` | Publish / export | |

(Key ↔ tool pairs come from the legacy `keyPressed`; keys `0 1 9 5 6 2` act on panel 1 and `3 4 7 8` on panel 2. Clicking the panel buttons maps to the same tools.)

**Waves:** groups of 5 enemies, one every 100 ticks; 700 ticks pause between groups; wave counter +1 per group; a boss every 6th wave; 6 enemy sprites cycling.
**Hotkeys in play:** `1 2 3` select tower · `7 8 9` magics · `P` pause · `S` speed · `T` back to editor (editor build) · `H` heatmap (survival build).

## Appendix B — Balance: legacy vs. current

| | Legacy | Current |
| --- | --- | --- |
| Costs (laser/missile/life) | 50-75-125-300-1000-2000 / 100-150-250-500-1300-3000 / 700-2500-7500-22000-67000-200000 | same |
| Sell value | `cost − 20 × level` | same (`PROFIT_SELL`) |
| Laser damage | 0.9-1.9-3.8-7-15-35 | 1-2-4-6-12-24 |
| Missile damage | 100-200-360-720-1750-3500 | 100-140-190-250-320-450 |
| Range laser / missile / life | 100→175 / 150→275 / 100 | 150→550 (all three) |
| Life tower | +1…+6 lives per full charge | check `TowerYellow` |
| Upgrade time | 100 × level (laser), 150 × level (others) ticks | check `Tower` |
| Enemy kill reward | `floor(hp0 / (4 × wave)) + 15` money, score ×8 | `maxHealth × MONEY_FACTOR`, score ×2 |
| Crystal reward | `floor(hp0 / 5) − 25` money and score | n/a |

## Appendix C — Assets to recover from the old project

Already in `img/`: `ground.jpg`, `tiles/crystal.png`, `tiles/jumper1-3.png`, towers, enemies, magics, HUD and menu buttons.

Missing: `teleport.png`, `teleportin.png`, `teleportout.png`, `final_triste.png`, `final_feliz.png`, `boton_reintentar.png`, `boton_continuar.png`, `alma_libre.png`, `alma_capturada.png`, `heart.png`, `speed.png`, `targetenemigo.png`, `particlecrystal.png`, `particlemagic2.png`, `particlemagic3.png`, `panel_editorv2_p1.png`, `panel_editorv2_p2_v2.png`, and the sound files (ids 0–13).
