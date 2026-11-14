# ROADMAP — porting the legacy Gif Tower Defense to TypeScript + p5.js

Legacy game: 2012, processing.js, files `juego_survival_min.pde` and `juego_editor2_min.pde` (minified; the survival one is also obfuscated).
This document is the plan to bring its features into this codebase. `AGENTS.md` links here.

---

## 1. How we iterate

- **One feature (or one coherent slice) per iteration.** Each iteration ships `gif-tower-defense-v0.N.0.zip` and sets `"version": "0.N.0"` in `package.json` (minor version +1 per iteration; `1.0.0` will be the parity with the legacy game, editor included). The `v2` zip delivered earlier (`2.0.0`) predates this scheme. **Only shipped iterations carry a version number**: the order of the pending items is flexible, so they are just named.
- **Definition of done:** `pnpm run test` and `pnpm run build` pass; new behaviour has tests (TDD encouraged); `AGENTS.md` updated if architecture, commands or conventions change; this file updated (tick the iteration, adjust the plan).
- The zip never includes `node_modules/` or `dist/`.
- The order below is a proposal. Reorder freely, but respect the `Depends on` lines.

Status legend: `[x]` done · `[ ]` pending.

- [x] **v2** — This roadmap (shipped as `2.0.0`).
- [x] **0.3.0** — Ice path tile `s` (+ 8 imported levels, path speed factors, level import safety net).
- [x] **0.4.0** — Game speed toggle (key `S`: ×1 → ×2 → ×4).
- [x] **0.5.0** — Path rule parity with the legacy game + original travel direction (levels migrated, converter updated, levels 46 and 47 imported).
- [x] **0.6.0** — Crystals `c` (+ tower damage and missile recharge moved from `draw()` to `update()`, 10 crystal levels imported).
- [x] **0.7.0** — Jumpers `5` `6` `7` (+ `Path.createMovement`, 10 jumper levels imported).
- [x] **0.8.0** — Teleports `p` `q` (+ converter map validation, 10 teleport levels imported). All the tile types of the legacy game are supported now.

---

## 2. Gap analysis (legacy vs. current)

| Legacy feature | Current status | Planned |
| --- | --- | --- |
| 3 towers (laser / missile / life), 6 upgrade levels, sell on right click | Ported (green / red / yellow) | — |
| 3 magics (UFO, fireball, iceball) with limited uses | Ported (buttons with item counters) | — |
| Waves, bosses, lives, money, score, pause | Ported | — |
| Survival menu with paginated mini-maps | Ported | — |
| Path turning rule and travel direction (enemies start at the legacy `y`) | **Done** (0.5.0) | — |
| Game over screen + retry | **Missing** (the `Game over` text exists in `HudScreenIndicators`, but `index.ts` never draws in that state: frozen frame) | Level lifecycle |
| Reset of per-level state (lives, wallet, wave, statics) | **Missing** (singletons survive `loadLevel`) | Level lifecycle |
| Exit to menu from a running level | **Missing** | Level lifecycle |
| Speed toggle (key `S`) | **Done** (0.4.0; keyboard only, HUD button needs `speed.png`) | HUD button |
| Ice path tile `s` | **Done** (0.3.0) | — |
| Crystal tile `c` | **Done** (0.6.0; no particles or sound yet) | — |
| Jumper tiles `5` `6` `7` | **Done** (0.7.0; no jump sound) | — |
| Teleport tiles `p` `q` | **Done** (0.8.0; drawn with circles: `teleportin.png`/`teleportout.png` are still missing) | Teleport sprites |
| ~1500 old levels | **No longer blocked by tiles** (1495 convertible, 1240 reach the end); only 40 imported so far | Bulk import |
| **Level editor** | Missing (button exists, disabled) | Editor (4 steps) |
| Sound effects | Missing | Sound effects |
| Heatmap (key `H`) | Missing | Heatmap |
| Click enemy to force target, hotkeys `7` `8` `9` | Missing | Controls parity |
| Per-level lives / magics / award money | Missing | Per-level parameters |
| Persistence, "Today's" mode, news, last played | Hard-coded / disabled | Persistence |
| Soul particles, loading screen | Missing (cosmetic) | Cosmetics |

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

Numbers above were computed before 0.3.0. Imported so far: 10 ice levels (28 and 40–48) and 10 crystal levels (478, 491, 630, 647, 651, 741, 761, 762, 831, 904) and 10 jumper levels (382, 394, 400, 408, 419, 421, 423, 424, 426, 435). In a full dry run 921 old levels were convertible and 295 of the 350 with jumpers reach the end tile with the current engine. and 10 teleport levels (466, 467, 468, 469, 471, 545, 603, 608, 704, 717). In a dry run with 0.8.0 the converter accepted 1495 of the 1532 pending levels (the other 37 have an invalid map), 1240 of them reach the end tile, and 406 of the 602 with teleports use the teleport on their route.

---

## 4. Iterations

### Phase 1 — Close the game loop

#### [x] 0.5.0 — Path rule parity and original travel direction
- **Problem (found in 0.3.0):** 82 of the 325 levels imported at that time never reached the end tile. The cause was twofold: the converted maps were walked in the **opposite direction** to the legacy game (it spawned enemies at `y` and the goal was `x`), and `Path` used different turning rules than the legacy `compruebadireccion`.
- **Legacy rule (same in the editor and in the survival build):** keep going while the tile ahead is walkable; otherwise turn to the first walkable neighbour in the order **left, right, up, down**, never going back; in a **dead end** there is no direction: the enemy stops for a moment and, having no direction, can then go back. The start and end tiles are walkable.
- **Done:**
  - `PathDirection.getNextDirection(current, walkableNeighbours)`: pure function with the rule (`null` = dead end).
  - `Path.makeOrders` rewritten on top of it (same public API; start tile is now walkable; the two extra orders after reaching the end are kept).
  - **Travel direction:** the enemies start in the map symbol `x` and finish in `y`, as before, but the 333 levels that `AllLevels.ts` had were migrated: `x`↔`y` swapped in every map and `startDirection`/`endDirection` recomputed, so the route is the legacy one (`y` → `x`). `OldLevelConverter` now produces this format directly (symbols swapped, directions not flipped). Converter output on the original data and the migrated `AllLevels.ts` were cross-checked: 312 levels, 0 differences.
  - Levels 46 and 47 imported.
- **Result:** 303 of 335 levels reach the end tile (before: 251 of 333). The TypeScript engine and an independent Python port of the legacy rule agree on all 333 levels checked. The 32 levels that do not reach the end behave the same in the legacy game: 12 have no walkable route (e.g. 76 *ziggi*) and 20 loop, many on purpose (*noend*, *endless*, *funloop*, *Can't lose*). They are listed in the ratchet in `test/levels/AllLevelsPaths.test.ts`.
- **Tests (no mocks):** `PathDirection` (22, the rule as a table), `PathLegacyRules` (junction priority, dead-end turn back, loops, walkable start tile, on small hand-made maps), `AllLevelsPaths`, and `AllLevelsStartEnd` (the start tile is on an edge and enemies enter the map, the end tile is on an edge and they leave it; 7 early hand-made levels are excluded: 7, 18, 20, 21, 23, 24, 25). Mutating the priority order, the walkable start tile or the dead-end turn makes dozens of tests fail.
- **Known differences with the legacy game (left out on purpose):**
  - In a dead end the legacy enemy waits one tile worth of time before turning back; here it turns back at once.
  - On the 32 unreachable levels the legacy enemies circulated forever; here they follow `PATH_MAX_SEARCHES` (1000) orders and then count as having reached the goal.

#### [ ] Level lifecycle: game over, retry, exit to menu (M)
- **Why first:** today `STATE_PLAY_SURVIVAL_GAME_OVER` is set but `index.ts` has no case for it, so the screen freezes. Also `Game.loadLevel` calls `Wallet.getInstance(...)`, which returns the existing wallet and ignores the new level's money, and `Player` (lives, wave, score) and several statics (`Enemy.allowCreateEnemies/waveEnemies/createEnemyTime`, `Missile`, `Explosion*`, `FlyIndicator`, `Path.orders`) are never reset. Retry and "back to menu" are impossible until this is fixed.
- **Legacy:** `final_triste.png` banner (500×154 at 150,144); the retry button appears after a 5 s countdown (`reintentartimer`); 7 initial lives.
- **Tasks:** a single `resetLevelState()` (or `clearInstance()` for each singleton); draw game over overlay; buttons *Retry* (same level) and *Menu*; exit-to-menu button/key (`Esc`) during play; pause overlay text (`(PAUSE)` / `PRESS 'P' TO RESUME`).
- **Done when:** playing level A, losing, retrying and then playing level B all start with fresh money/lives/wave/score; tests cover the reset.
- **Assets needed:** `final_triste.png`, `boton_reintentar.png` (or draw with p5).

#### [x] 0.4.0 — Game speed toggle (S)
- **Legacy:** key `S` and HUD button (`speed.png`) switched 30 fps ↔ 300 fps skipping draws.
- **Done:** `GameSpeed` (pure class: speeds list `GAME_SPEEDS = [1, 2, 4]`, `next()`, `reset()`, `runUpdates()`); `Game.updateFrame()` runs N `update()` per `draw()` and stops as soon as the game is not playing; key `S` in `Controls`; label `speed x2 (S)` under the pause button (`GAME_SPEED_INDICATOR_POSITION`, placed blind: adjust if it overlaps the HUD art); the speed is reset to ×1 when a level loads.
- **Fixes needed to make speed safe:** tower logic (`updateTower`) lived in `TowerSystem.draw()` and now runs in `TowerSystem.update()` (side effect: towers no longer keep upgrading/shooting while paused); `Missile.updateInstances` skips dead missiles (before, a missile that had already hit could hit again if two updates ran before it was removed: triple damage in the regression test).
- **Left out:** HUD button (needs `speed.png`), a ×10 speed like the legacy one (add it to `GAME_SPEEDS`). Explosions, fly indicators and enemy eye animations are cosmetic and keep their normal pace.
- **Gap found and fixed in 0.6.0:** the damage of the green tower (`addDamage` in `draw()`) and the missile recharge of the red tower (also in `draw()`) were still tied to the frames drawn, so at ×2/×4 the towers did not speed up with the rest of the game. Both now run in `update()`.
- **Rule for future code:** anything that depends on time must live in `update()`, never in `draw()`, or it will not follow the game speed.

### Phase 2 — Special tiles (unlock the legacy levels)

Each iteration in this phase follows the same recipe: new symbol in `constants/tile.ts` and `Config.availableTiles` → tile class + creator → `Path`/`PathMovement` support → converter (`OldLevelConverter`) accepts it → import the newly unlocked levels in a batch → tests with a fixture level → editor tool is added later in the editor's special-tile tools step.

> Directional tiles (jumpers, teleports) now rely on the legacy travel direction fixed in 0.5.0: enemies walk like in the legacy game.

#### [x] 0.3.0 — Ice path `s` (S) — unlocks 221 levels (10 imported so far)
- **Legacy:** tile painted as a translucent teal square (`rgba(0,158,158,120)`, no sprite). Enemy speed ×2 on ice (boss too). Magics keep a fixed speed.
- **Done:** `TileIce` (extends `TilePath`, so it is walkable and drawn by `TilesManager`), created by `TilePathCreator` for symbol `s`; `Path` records one speed factor per order (the factor of the tile being left) in `Path.speedFactors`; `PathMovement` takes optional `speedFactors` and exposes `currentSpeed`; `EnemySystem` passes `Path.speedFactors` (magics do not, so they ignore ice); `s` added to `Config.availableTiles`; `ENEMY_ICE_SPEED_FACTOR = 2`.
- **Tests (no mocks):** `PathMovementSpeedFactors`, `PathSpeedFactors`, `TileIce`, `OldLevelConverterIce`, and `AllLevelsPaths` (unique ids, sorted, reachable end with a known-issues ratchet).
- **Imported levels:** 28 and 40–48. The remaining ice-only levels can be imported with the existing converter with the existing converter.

#### [x] 0.6.0 — Crystals `c` — +359 reachable levels convertible (10 imported)
- **Legacy:** a crystal is a fixed target with 500 HP on a tile. Only **laser (green) towers** shoot it, and only when there is **no enemy** in range (enemies have priority); missile towers ignore it. While it exists the tile is neither path nor buildable. Destroying it pays `floor(500/5) − 25 = 75` money and the same score, and the tile becomes `0` (buildable).
- **Done:**
  - `TileCrystal` (position, health bar shown when damaged, `addDamage`, `isDead`, `reward`/`score`) and `TileCrystalCreator` for symbol `c` (image index 10 of `Resources.tileImages`); `TilesManager` keeps the crystals and draws them (also in the mini-maps).
  - `TowerGreen.selectTarget(enemies, crystals)`: enemy first, nearest crystal otherwise (`crystalTarget`); the other towers ignore the crystals. `TowerSystem` passes `TilesManager.getAllCrystals`.
  - `CrystalSystem.update()` (called by `Game.update`): pays the reward, removes the crystal and creates an orange tile in its place (`TileOrangeCreator.createAt`).
  - `c` added to `Config.availableTiles`. Crystals block the path automatically (they are not path tiles).
  - **Time in `update()`:** `TowerGreen.update` applies the damage and `TowerRed.update` creates the missiles (before they were in `draw()`).
- **Health units:** `CRYSTAL.MAX_HEALTH = 500` is in damage units (a level-1 green tower needs 500 updates). Enemy health works differently (`progress += damage / maxHealth`, from 0 to 100), see the balance item.
- **Tests (no mocks):** `TileCrystal`, `TileCrystalCreator` (+ crystals and the path), `CrystalSystem`, `TowerGreenCrystals`, `TowerRedUpdate`, and `TowerSystemCrystals` (a whole flow with real objects: green tower → crystal destroyed → reward → buildable tile). Mutating the enemy priority, the upgrading check, the reward, the orange tile or the `TowerSystem` wiring makes tests fail.
- **Imported levels:** 478, 491, 630, 647, 651, 741, 761, 762, 831, 904 (the converter only takes "the first N", so these were selected from a full dry run among the ones that reach the end).
- **Left out:** particles and sound when it breaks (assets `particlecrystal.png`, sound id 12), a fly indicator with the reward, forcing a target (see Controls parity).

#### [x] 0.7.0 — Jumpers `5` `6` `7` — +350 levels convertible (10 imported)
- **Legacy:** when an enemy arrives at the centre of a jumper it jumps **straight, in the direction it arrived**, over 2 (`5`), 3 (`6`) or 4 (`7`) tiles, at speed 5 (twice a normal enemy, also for bosses). It lands exactly that many tiles away and there the turning rule applies again; if the landing tile is not walkable it stays blocked. While it is in the air the **laser towers can not shoot it** (the missile code has no such check) and it is drawn bigger: +6, +25 and +65 px at the top of the jump for 2, 3 and 4 tiles. Images: `5` → `jumper1.png`, `6` → `jumper2.png`, `7` → `jumper3.png`.
- **Done:**
  - `TileJumper` (extends `TilePath`, so it is walkable) and `TileJumperCreator`; `TilesManager.addJumperTile`; the three images were added to `Resources.tileImages` (indexes 11–13); mini-maps draw them too. `5 6 7` added to `Config.availableTiles`.
  - `Path.makeOrders`: when the enemy arrives at a jumper it adds one order per tile of the jump, in the arrival direction, marked as *in the air* (`Path.jumps`: `{ step, length }` per order, `null` when walking), and continues from the landing tile. If the landing tile is not walkable (or is outside the map) no jump is made and the end is not reached.
  - `PathMovement` takes the jumps: `isJumping`, `jumpDistance`, `jumpProgress` (0–1) and a fixed `ENEMY_JUMP_SPEED = 2` while jumping (the legacy 5, in this game's units).
  - `Enemy.isJumping` / `jumpGrowth` (`getJumpGrowth`, a parabola with the legacy peaks), used when drawing. Enemies were already drawn above the towers, so no change of draw order was needed.
  - `TowerGreen.selectTarget` ignores the enemies in the air; `TowerRed` still shoots them.
  - `Path.createMovement(position, speed)` builds the movement of an enemy from the level data (`Path.orders`, `speedFactors`, `jumps`); `EnemySystem` uses it. Before, that wiring (also the ice one) was not covered by any test.
- **Tests (no mocks):** `PathMovementJump`, `PathJumpers` (distances, what is jumped over, landing, chained jumpers, a jump followed by a turn), `PathCreateMovement`, `TileJumperCreator`, `JumpGrowth`, `EnemyJump`, `TowerGreenJumping`; plus `AllLevelsPaths`/`AllLevelsStartEnd` for the new levels. Mutating the jump marks, the jump speed, the laser filter, the distances and the `createMovement` wiring makes tests fail.
- **Imported levels:** 382, 394, 400, 408, 419, 421, 423, 424, 426, 435.
- **Left out:** the jump sound (id 5), and the legacy behaviour of bouncing back when a jump reaches the edge of the map (here it just invalidates the path). Magic projectiles follow the same orders but keep their own speed and are not affected by jumps.

#### [x] 0.8.0 — Teleports `p` / `q` — the last tile of the legacy game
- **Legacy:** exactly **one pair** per level. An enemy that arrives at the centre of `p` stops, shrinks (100 ticks at 30 fps), appears at `q` keeping its direction and grows again (50 ticks), then the turning rule is applied from `q`. Magic projectiles do not hit an enemy while it teleports; the tower code has no such check. `q` is a normal path tile for everybody else.
- **Done:**
  - `TileTeleportIn` / `TileTeleportOut` (both extend `TilePath`, so they are walkable), `TileTeleportCreator`, `TilesManager` lists, mini-maps. They are **drawn with circles** (purple in, orange out, `teleportDrawing.ts`) because the sprites are missing. `p` `q` added to `Config.availableTiles`.
  - `Path.makeOrders`: when the enemy arrives at `p` and there is a `q`, the next order carries a teleport (`Path.teleports`: `{ to }` or `null` per order) and the path continues from `q` in the same direction. A `p` without `q` (or the other way round) is a normal path tile.
  - `PathMovement`: teleport state machine (`isTeleporting`, `teleportPhase`, `teleportScale`). Durations are the legacy ones doubled for 60 fps: **200 ticks out + 100 ticks in** (`ENEMY_TELEPORT.DURATION`); `getTeleportScale` is a pure function with the legacy shape (shrinks during the first 45 % of the first phase, grows during the first 92 % of the second one).
  - `Enemy` draws smaller around its centre while teleporting; `MagicCollisionChecker` ignores the enemies that are teleporting.
  - **Magics:** they follow the same orders, so they must also follow the teleports or they would walk the orders after `q` from `p`. `Path.createMagicMovement` moves them to `q` **at once** (no waiting): magic collisions are computed by order index, so waiting would desynchronise them. The ice and jumps are still ignored for magics.
  - **Converter:** `OldLevelConverter.hasValidMap()` rejects maps without exactly one `x` and one `y`, without 10 rows of 16 symbols, or with unpaired/duplicated teleports; `shouldSkipLevel` uses it.
- **Tests (no mocks):** `TeleportScale`, `PathMovementTeleport`, `PathTeleports` (route over blocked tiles, direction after the teleport, unpaired tiles, `createMovement`/`createMagicMovement` wiring), `TileTeleportCreator`, `EnemyTeleport` (including the magic collision rule), converter `hasValidMap`. Seven mutations (no teleport recorded, path not continuing from `q`, position not moved, no waiting, magics hitting teleporting enemies, magics waiting, no growing) make tests fail.
- **Imported levels:** 466, 467, 468, 469, 471, 545, 603, 608, 704, 717.
- **Left out:** the sprites (`teleportin.png`, `teleportout.png`; when they exist `TileTeleportIn/Out.drawTile` can draw them like `TileJumper`), a sound, and the legacy case of two pairs (the editor never allowed it; the converter rejects it).

#### [ ] Bulk level import and scalable level menu (M)
- **Why:** `AllLevels.ts` would grow from ~325 to ~1900 levels (~27 k lines) and the survival menu pages at 15 mini-maps per page (`LevelsDataProvider`, ~127 pages).
- **Tasks:** run the converter for all unlocked levels (the converter now rejects invalid maps; de-duplicate identical maps; only 1240 of the 1495 convertible levels reach the end tile, import only those and keep unreachable ones for the known-cases list only if they are intentional); move level data to JSON loaded lazily (keep a small fixture set in tests); paginator jump (first/last/“go to page”), optional search by title/author; keep `sortlevels` working.

### Phase 3 — Level editor

Legacy editor (`juego_editor2_min.pde`): 16×10 grid, two tool panels (toggle with `M`), paint with click **and drag**, play-test with `T` (starts with 300 money, 7 lives, restores the map when you return), clear map with `C`, publish with `E`. Tools and keys are listed in Appendix A.

#### [ ] Editor shell and basic painting (L)
- New state `STATE_EDITOR`; enable the existing *Editor* button in `MenuMain`; grid + hover preview; tools: erase/ground `0`, path `1`, stone `2`; start/goal placement on the **border only** (corner cells toggle between the two possible directions); only one start and one end (placing a new one clears the old); tooltip text per tool (legacy strings in Appendix A); `Menu` button.
- **Depends on:** Level lifecycle (state reset / menu navigation).

#### [ ] Validation and test play (M)
- Validate with `Path.makeOrders` (start and end present, connected path); show the reason when invalid. `T` toggles *edit ↔ play-test* with legacy defaults (money 300, lives 7); leaving the test restores the edited map exactly.

#### [ ] Special-tile tools (S/M)
- Second panel: ice `s`, crystal `c`, jumper (click cycles `5→6→7`), teleport in/out (one pair). Added tool-by-tool as each tile lands if the editor already exists.
- **Depends on:** the tile iterations and the editor shell.

#### [ ] Save, export, import, "My levels" (M)
- Persist to `localStorage`; export/import as text (legacy string `rows,…@dirStart,dirEnd,ex,ey,money`) and as `MapDataType` JSON; file download/upload; list user levels in the main menu (replaces the hard-coded `lastEditorLevelsIds = [8]`).
- **Decision:** local-only vs. any sharing backend (see §6.3).

### Phase 4 — Parity and polish

#### [ ] Sound effects (M)
- Legacy ids: `0` enemy dies · `1` game over · `2` magic launched · `5` jump · `6` build tower · `7` upgrade · `8` sell · `9` life tower grants a life · `10` lose a life · `11` new wave · `12` crystal destroyed · `13` enemy spawns. Global on/off (`sonidofx`).
- p5.sound or plain `HTMLAudioElement`; mute toggle persisted. **Assets needed.**

#### [ ] Heatmap (S/M)
- Survival-only. Counters per cell (16×10) incremented where an enemy dies or a magic hits; normalised to 0–10 buckets with a colour ramp; key `H` pauses and shows it, `H`/`P` resumes (`(HEATMAP)` label).

#### [ ] Controls parity (S)
- Click an enemy to force-target it (towers prefer it; `targetenemigo.png` marker; click again to release). Hotkeys `7`/`8`/`9` for the magics (legacy: UFO, magic 2, magic 3 — most likely fireball and iceball, verify against sprites).

#### [ ] Per-level parameters + balance pass (M)
- Extend `MapDataType` with optional `lives`, `magics { fireball, iceball, ufo }`, `awardMoney` (legacy loaded them per level; minimum starting money 150; award added on top). Compare balance (Appendix B) and decide what to restore.

#### [ ] Persistence and main-menu features (M)
- Remember last played levels (replace hard-coded `[1, 14, 13]`), best score per level, highest unlocked; enable the *Today's* button (e.g. level of the day by date); news list from data.

#### [ ] Cosmetics (S)
- Soul particles (`alma_capturada` rises when an enemy dies, `alma_libre` when it reaches the goal), loading screen with progress bar, final "happy" banner if a win condition is ever defined.

### Housekeeping (can piggy-back on any iteration)
- `oldLevelsConverter.ts` only processes "the first N" convertible levels. Selecting levels (by reachability, by tile) needs a dry run on copies of the data files, as done in 0.6.0–0.8.0; a `--only ids` option or a reachability check in the converter would make it simpler.
- `Config.gameMode` is committed as `MODE.TESTING` (debug labels + testing money). Drive it from `import.meta.env.DEV` so production builds use `NORMAL`.
- `README.md` still says Jest and Parcel; the project uses Vitest and Vite. `package.json` has an empty `description`.
- `sortlevels` (`src/sortLevels.ts`) writes `startDirection`/`endDirection` as numbers instead of `DIRECTION.X` and reformats the whole file, so its output cannot replace `AllLevels.ts` without a huge diff. In 0.3.0 the new levels were inserted in id order by hand. Make it emit `DIRECTION.X` and the same formatting.
- `src/index.ts` has an "ugly hack" removing `defaultCanvas1` and a `contextmenu` workaround; worth revisiting once game states are refactored.

---

## 5. Backlog / ideas (not scheduled)
Mobile/touch controls (right-click sell has no touch equivalent) · tower targeting priorities · difficulty presets · achievements · level rating/tags · replay.

---

## 6. Decisions needed

1. ~~Travel direction of converted levels~~ — **resolved in 0.5.0**: enemies walk from the legacy `y` to the legacy `x`.
2. **Balance.** Costs and sell values match the legacy game; damage, range and rewards do not (Appendix B). Keep the new values or restore the old ones?
3. **Backend.** The legacy game loaded levels, scores and "award money" from a PHP server. Static-only with `localStorage` (proposed) or a service later?
4. **Assets.** Missing sprites/sounds must come from your old project (Appendix C). Until then I can draw placeholders with p5 primitives, as the legacy ice tile did.
5. **Editor look.** Recreate the legacy two-panel bar (`panel_editorv2_p1/p2`) or build a new one with the current HUD button style?

6. ~~Route at branches~~ — **resolved in 0.5.0**: the legacy turning rule is reproduced exactly.

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

Missing: `teleportin.png`, `teleportout.png` (the teleports are drawn with circles meanwhile), `final_triste.png`, `final_feliz.png`, `boton_reintentar.png`, `boton_continuar.png`, `alma_libre.png`, `alma_capturada.png`, `heart.png`, `speed.png`, `targetenemigo.png`, `particlecrystal.png`, `particlemagic2.png`, `particlemagic3.png`, `panel_editorv2_p1.png`, `panel_editorv2_p2_v2.png`, and the sound files (ids 0–13).
