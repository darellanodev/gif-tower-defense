# Graph Report - gif-tower-defense  (2026-10-09)

## Corpus Check
- 347 files · ~123,359 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 2, .css 2, .blend 1)

## Summary
- 1446 nodes · 4097 edges · 85 communities (47 shown, 38 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 166 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Global Types & Constants
- Explosions & Effects
- Enemy Eye Animation
- HUD Tower Buttons
- Tile Creation & MiniMap
- Fly Indicators & Debug
- Tower & Progress Bar
- Build Tooling & Dependencies
- Old Level Converter
- Level Path Data & Testing
- Asset Resource Loading
- Button Rendering
- Architecture Documentation
- Magic UFO Ability
- MiniMap Buttons & Canvas
- Enemy Creation & Tests
- Game Initialization
- Path & Tile Geometry
- Enemy Entity
- Magic Button Handlers
- Black & Start Tile Creators
- Menu Button Creators
- Path Order Searching
- Page Buttons & Paginator
- Enemy Path Movement
- End & Path Tile Creators
- Enemy System
- Missile Projectiles
- MiniMap Creation & Levels
- HUD Magic Buttons
- Survival Menu
- Tile System Core
- Level Sorting Utilities
- Fireball Creator & Images
- Red & Yellow Tower Sprites
- Game State Manager
- Red Tower
- HUD Tower Button Sprites
- Fireball Magic
- Iceball Magic
- Enemy Constants & Systems
- TypeScript Config
- Progress Bar Timer
- Instance Managers
- Menu Design Sources
- HUD & Enemy Design Sources
- Magic Button Sprites
- Button Test Config
- Tower Design Sources
- Enemy 5-6 Sprites
- Collision Geometry
- Magic Collision Checker
- App Icons
- Green Tower Upgrade Sprites
- Enemy 1 Sprites
- HUD Status Indicators
- Magic Projectile Sprites
- Enemy 2 Sprites
- Enemy 3 Sprites
- Enemy 4 Sprites
- Pause Button Sprites
- Prettier Config
- GitHub README Assets
- Tile Variants
- Jumper Tile Animation
- OpenCode Config
- Disabled Button
- Progress Bar Instantiation
- Run Script
- Build Run Script
- Old Levels Converter Script
- Sort Levels Script
- Test Run Script
- Coverage Test Script
- Tests Script
- Enemy 5 Center Sprite
- End Path Tile (Down)
- End Path Tile (Left)
- End Path Tile (Right)
- End Path Tile (Up)
- Start Path Tile (Down)
- Start Path Tile (Left)
- Start Path Tile (Right)
- Start Path Tile (Up)

## God Nodes (most connected - your core abstractions)
1. `Position` - 163 edges
2. `Enemy` - 81 edges
3. `Button` - 73 edges
4. `Game` - 52 edges
5. `TileOrange` - 52 edges
6. `TilesManager` - 49 edges
7. `Player` - 46 edges
8. `PathMovement` - 43 edges
9. `MagicInstancesManager` - 42 edges
10. `vitest` - 41 edges

## Surprising Connections (you probably didn't know these)
- `App Icon (icon.svg)` --semantically_similar_to--> `Android Chrome Icon 512x512`  [INFERRED] [semantically similar]
  _designs/icon/icon.svg → android-chrome-512x512.png
- `App Icon (icon.svg)` --semantically_similar_to--> `Apple Touch Icon`  [INFERRED] [semantically similar]
  _designs/icon/icon.svg → apple-touch-icon.png
- `createBossEnemy()` --calls--> `EnemyAnimator`  [EXTRACTED]
  test/helpers/enemyCreator.ts → src/enemies/EnemyEyesAnimator.ts
- `createNormalEnemy()` --calls--> `EnemyAnimator`  [EXTRACTED]
  test/helpers/enemyCreator.ts → src/enemies/EnemyEyesAnimator.ts
- `createMagicButton()` --calls--> `Button`  [EXTRACTED]
  test/helpers/magicButtons.ts → src/hud/buttons/Button.ts

## Import Cycles
- 3-file cycle: `src/magics/MagicInstancesManager.ts -> src/types/magicsType.ts -> src/magics/MagicUFO.ts -> src/magics/MagicInstancesManager.ts`
- 3-file cycle: `src/levels/tiles/TileOrange.ts -> src/towers/creators/TowerGreenCreator.ts -> src/towers/TowerGreen.ts -> src/levels/tiles/TileOrange.ts`
- 3-file cycle: `src/levels/tiles/TileOrange.ts -> src/towers/creators/TowerRedCreator.ts -> src/towers/TowerRed.ts -> src/levels/tiles/TileOrange.ts`
- 3-file cycle: `src/levels/tiles/TileOrange.ts -> src/towers/creators/TowerYellowCreator.ts -> src/towers/TowerYellow.ts -> src/levels/tiles/TileOrange.ts`
- 3-file cycle: `src/levels/tiles/TileOrange.ts -> src/types/towerType.ts -> src/towers/TowerGreen.ts -> src/levels/tiles/TileOrange.ts`
- 3-file cycle: `src/levels/tiles/TileOrange.ts -> src/types/towerType.ts -> src/towers/TowerRed.ts -> src/levels/tiles/TileOrange.ts`
- 3-file cycle: `src/levels/tiles/TileOrange.ts -> src/types/towerType.ts -> src/towers/TowerYellow.ts -> src/levels/tiles/TileOrange.ts`
- 3-file cycle: `src/towers/Tower.ts -> src/types/towerType.ts -> src/towers/TowerRed.ts -> src/towers/Tower.ts`
- 3-file cycle: `src/towers/Tower.ts -> src/types/towerType.ts -> src/towers/TowerGreen.ts -> src/towers/Tower.ts`
- 3-file cycle: `src/towers/Tower.ts -> src/types/towerType.ts -> src/towers/TowerYellow.ts -> src/towers/Tower.ts`
- 4-file cycle: `src/levels/tiles/TileOrange.ts -> src/towers/creators/TowerGreenCreator.ts -> src/towers/TowerGreen.ts -> src/towers/Tower.ts -> src/levels/tiles/TileOrange.ts`
- 4-file cycle: `src/levels/tiles/TileOrange.ts -> src/towers/creators/TowerRedCreator.ts -> src/towers/TowerRed.ts -> src/towers/Tower.ts -> src/levels/tiles/TileOrange.ts`
- 4-file cycle: `src/levels/tiles/TileOrange.ts -> src/towers/creators/TowerYellowCreator.ts -> src/towers/TowerYellow.ts -> src/towers/Tower.ts -> src/levels/tiles/TileOrange.ts`
- 4-file cycle: `src/levels/tiles/TileOrange.ts -> src/types/towerType.ts -> src/towers/TowerGreen.ts -> src/towers/Tower.ts -> src/levels/tiles/TileOrange.ts`
- 4-file cycle: `src/levels/tiles/TileOrange.ts -> src/types/towerType.ts -> src/towers/TowerRed.ts -> src/towers/Tower.ts -> src/levels/tiles/TileOrange.ts`
- 4-file cycle: `src/levels/tiles/TileOrange.ts -> src/types/towerType.ts -> src/towers/TowerYellow.ts -> src/towers/Tower.ts -> src/levels/tiles/TileOrange.ts`
- 4-file cycle: `src/particles/Particle.ts -> src/towers/TowerYellow.ts -> src/particles/explosions/ExplosionEnemy.ts -> src/particles/ParticleSystem.ts -> src/particles/Particle.ts`
- 5-file cycle: `src/particles/Particle.ts -> src/towers/TowerYellow.ts -> src/particles/explosions/ExplosionEnemy.ts -> src/particles/explosions/Explosion.ts -> src/particles/ParticleSystem.ts -> src/particles/Particle.ts`
- 5-file cycle: `src/particles/Particle.ts -> src/types/towerType.ts -> src/towers/TowerYellow.ts -> src/particles/explosions/ExplosionEnemy.ts -> src/particles/ParticleSystem.ts -> src/particles/Particle.ts`

## Hyperedges (group relationships)
- **Game Systems Architecture** — agents_game, agents_enemysystem, agents_towersystem, agents_magicsystem, agents_hudsystem, agents_tilesystem, agents_systems_pattern [EXTRACTED 1.00]
- **TypeScript / p5.js Tech Stack** — readme_gif_tower_defense_game, readme_typescript, readme_p5_js, readme_vite, readme_vitest, readme_pnpm [EXTRACTED 1.00]
- **Old Level Conversion Pipeline** — readme_oldlevelsconverter, agents_level_data_format, src_levels_levelsdata_oldlevels_data, src_levels_levelsdata_oldlevelsprocessed_data [INFERRED 0.85]
- **Inkscape Sprite-Sheet Export Template** — _designs_enemies_enemies, _designs_enemies_bosses, _designs_enemies_enemies_tmp_export, sprite_sheet_export_workflow [INFERRED 0.85]
- **Menu Button Sprite Family** — _designs_menu_buttons, _designs_menu_button_minimap, _designs_menu_button_page [INFERRED 0.80]
- **Site and App Icon Set** — favicon_16x16, favicon_32x32, android_chrome_192x192, android_chrome_512x512, apple_touch_icon, _designs_icon_icon [INFERRED 0.85]
- **Towers Sprite Sheet (green/red/yellow tower types)** — _designs_towers_towers, _designs_towers_towers_green_tower, _designs_towers_towers_red_tower, _designs_towers_towers_yellow_tower [EXTRACTED 1.00]
- **Crystal & Jumper Tower Design Set** — _designs_tiles_crystal_and_jumper, _designs_tiles_crystal_and_jumper_crystal_tower, _designs_tiles_crystal_and_jumper_jumper_tower, _designs_tiles_crystal_and_jumper_particle_crystal [EXTRACTED 1.00]
- **Enemy Directional Sprite System (5 enemy types)** — img_enemies_1_center, img_enemies_1_closed, img_enemies_1_left, img_enemies_1_right, img_enemies_2_center, img_enemies_2_closed, img_enemies_2_left, img_enemies_2_right, img_enemies_3_center, img_enemies_3_closed, img_enemies_3_left, img_enemies_3_right, img_enemies_4_center, img_enemies_4_closed, img_enemies_4_left, img_enemies_4_right, img_enemies_5_center [INFERRED 0.85]
- **Enemy directional/state sprite frames** — img_enemies_5_closed, img_enemies_5_left, img_enemies_5_right, img_enemies_6_center, img_enemies_6_closed, img_enemies_6_left, img_enemies_6_right [INFERRED 0.75]
- **Magic spell HUD button state variants (off/on/hover)** — img_hud_btn_magic_fireball_off, img_hud_btn_magic_fireball_on, img_hud_btn_magic_fireball_on_hover, img_hud_btn_magic_iceball_off, img_hud_btn_magic_iceball_on, img_hud_btn_magic_iceball_on_hover, img_hud_btn_magic_ufo_off, img_hud_btn_magic_ufo_on, img_hud_btn_magic_ufo_on_hover [INFERRED 0.85]
- **Pause button state variants (on/checked, normal/hover)** — img_hud_btn_pause_on, img_hud_btn_pause_on_hover, img_hud_btn_pause_checked, img_hud_btn_pause_checked_hover [INFERRED 0.85]
- **HUD Tower Selection Button Sprite Set** — img_hud_btn_tower_green_off, img_hud_btn_tower_green_off_hover, img_hud_btn_tower_green_on, img_hud_btn_tower_green_on_hover, img_hud_btn_tower_red_off, img_hud_btn_tower_red_off_hover, img_hud_btn_tower_red_on, img_hud_btn_tower_red_on_hover, img_hud_btn_tower_yellow_off, img_hud_btn_tower_yellow_off_hover, img_hud_btn_tower_yellow_on, img_hud_btn_tower_yellow_on_hover [INFERRED 0.85]
- **HUD Status Indicator Sprite Set** — img_hud_core, img_hud_normal, img_hud_upgrading, img_hud_upgrading_max [INFERRED 0.75]
- **Magic Projectile Sprite Set** — img_magics_fireball, img_magics_iceball, img_magics_ufo, img_magics_ufo_ray [INFERRED 0.85]
- **Green Tower Upgrade Tier Progression** — img_towers_green_tower_upgrade_0, img_towers_green_tower_upgrade_1, img_towers_green_tower_upgrade_2, img_towers_green_tower_upgrade_3, img_towers_green_tower_upgrade_4, img_towers_green_tower_upgrade_5 [INFERRED 0.85]
- **Path Start and End Directional Sprites** — img_tiles_start_down, img_tiles_start_left, img_tiles_start_right, img_tiles_start_up, img_tiles_end_down, img_tiles_end_left, img_tiles_end_right, img_tiles_end_up [INFERRED 0.85]
- **Jumper Tile Animation Frame Set** — img_tiles_jumper1, img_tiles_jumper2, img_tiles_jumper3 [INFERRED 0.85]
- **Red Tower Upgrade Sprite Sequence (Levels 0-5)** — img_towers_red_tower_upgrade_0, img_towers_red_tower_upgrade_1, img_towers_red_tower_upgrade_2 [INFERRED 0.75]
- **Yellow Tower Upgrade Sprite Sequence (Levels 0-5)** — img_towers_yellow_tower_upgrade_0, img_towers_yellow_tower_upgrade_1, img_towers_yellow_tower_upgrade_2 [INFERRED 0.75]

## Communities (85 total, 38 thin omitted)

### Community 0 - "Global Types & Constants"
Cohesion: 0.05
Nodes (47): p5, COLOR, INFLUENCE_AREA_ALPHA, KEY_1, KEY_2, KEY_3, KEY_P, MAGIC_FIREBALL_DAMAGE (+39 more)

### Community 1 - "Explosions & Effects"
Cohesion: 0.06
Nodes (11): EXPLOSION_COLOR, EXPLOSION_MAX_EMIT_TIME, EXPLOSION_OFFSET, EXPLOSION_SIZE, Explosion, ExplosionEnemy, ExplosionMagicFireball, ExplosionMagicIceball (+3 more)

### Community 2 - "Enemy Eye Animation"
Cohesion: 0.06
Nodes (13): ENEMY_EYES_CHANGE_MAX_TIME, ENEMY_EYES_EXTEND_CLOSED_TIME, ENEMY_EYES_IMAGE, ENEMY_EYES_TIME_TO_CLOSE, EnemyAnimator, MenuMain, NewsData, NewsDataProvider (+5 more)

### Community 3 - "HUD Tower Buttons"
Cohesion: 0.06
Nodes (4): HudButtonsTowers, HudSystem, Controls, InfluenceArea

### Community 4 - "Tile Creation & MiniMap"
Cohesion: 0.08
Nodes (13): TileOrangeCreator, MiniMap, Player, TowerGreenCreator, TowerRedCreator, TowerYellowCreator, images, getTileOrangeCreator() (+5 more)

### Community 5 - "Fly Indicators & Debug"
Cohesion: 0.08
Nodes (10): FLY_INDICATOR_ICON_POSITION_OFFSET, FLY_INDICATOR_MAX_TIME_ALIVE, FLY_INDICATOR_MOVE_INCREMENT, Debug, FlyIndicator, HudPlayerIndicators, HudScreenIndicators, TextProperties (+2 more)

### Community 6 - "Tower & Progress Bar"
Cohesion: 0.06
Nodes (4): ProgressBar, Tower, TowerGreen, Distance

### Community 7 - "Build Tooling & Dependencies"
Cohesion: 0.04
Nodes (43): description, devDependencies, eslint, eslint-config-prettier, p5, prettier, tsx, @types/jest (+35 more)

### Community 8 - "Old Level Converter"
Cohesion: 0.08
Nodes (6): Config, convertOldFormatLevels(), OldLevelConverter, OldLevelConverterFiles, allLevels, oldLevelConverter

### Community 9 - "Level Path Data & Testing"
Cohesion: 0.14
Nodes (21): DIRECTION, TESTING_LEVEL, LevelsDataTesting, isIncluded(), getLevelMap(), getNoExistingLevelMap(), getNoValidLevelMapUnreachableEndTile(), getNoValidLevelMapWithoutRows() (+13 more)

### Community 11 - "Button Rendering"
Cohesion: 0.10
Nodes (8): Button, ButtonGreenTowerCreator, ButtonMagicFireballCreator, ButtonMagicIceballCreator, ButtonMagicUFOCreator, ButtonPauseCreator, ButtonRedTowerCreator, ButtonYellowTowerCreator

### Community 12 - "Architecture Documentation"
Cohesion: 0.09
Nodes (26): EnemySystem, Game, Gif Tower Defense (AGENTS.md overview), HudSystem, Level Data Format (10x16 grid), MagicsType, MagicSystem, Testing with Vitest (+18 more)

### Community 14 - "MiniMap Buttons & Canvas"
Cohesion: 0.12
Nodes (12): BUTTON_MINIMAP_OFFSET, BUTTON_MINIMAP_SURVIVAL_MENU_STEP, BUTTON_MINIMAPS_DISPLAYED_IN_ROW, MINIMAP_SCALE, MINIMAP_TEXT, CANVAS_SIZE, PANEL_HEIGHT, ButtonMiniMap (+4 more)

### Community 15 - "Enemy Creation & Tests"
Cohesion: 0.20
Nodes (11): vitest, EnemyCreator, EnemyInstancesManager, createBossEnemy(), createNormalEnemy(), updateEnemyInstancesTimes(), testTinyOrders, getEnemyTargetIdForUFO() (+3 more)

### Community 17 - "Path & Tile Geometry"
Cohesion: 0.17
Nodes (9): PATH_MAX_SEARCHES, TILE_CREATION_MARGIN_TOP, TILE_SIZE, PathStartEnemiesPosition, TileEnd, TilePath, TileStart, NotWalkableTile (+1 more)

### Community 19 - "Magic Button Handlers"
Cohesion: 0.15
Nodes (5): MagicIceballCreator, MagicUFOCreator, MagicInstancesManager, Position, createMagicIceball()

### Community 20 - "Black & Start Tile Creators"
Cohesion: 0.11
Nodes (4): TileBlackCreator, TileStartCreator, TileBlack, TilesManager

### Community 21 - "Menu Button Creators"
Cohesion: 0.27
Nodes (3): MAX_LEVELS_DISPLAYED, Images, Size

### Community 25 - "End & Path Tile Creators"
Cohesion: 0.15
Nodes (3): TileEndCreator, TilePathCreator, TileSystem

### Community 29 - "HUD Magic Buttons"
Cohesion: 0.22
Nodes (6): HudButtonsMagics, instantiateHudButtonsMagics(), clickMagicUFO(), createHudButtonsMagics(), createMagicButton(), initializeAllMagicButtons()

### Community 31 - "Tile System Core"
Cohesion: 0.39
Nodes (3): TILE_SYMBOL, TileCreator, TestFlags

### Community 32 - "Level Sorting Utilities"
Cohesion: 0.29
Nodes (7): AllLevels, LevelsDataSortingTesting, getFooterCode(), getHeaderCode(), sortLevels(), MapDataType, SorterLevels

### Community 33 - "Fireball Creator & Images"
Cohesion: 0.17
Nodes (10): MagicFireballCreator, greenTowerButtonImages, img, magicFireballButtonImages, magicIceballButtonImages, magicUFOButtonImages, redTowerButtonImages, yellowTowerButtonImages (+2 more)

### Community 34 - "Red & Yellow Tower Sprites"
Cohesion: 0.16
Nodes (15): Red Tower (Tower Defense Unit), Tower Defense Sprite Asset, Yellow Tower (Tower Defense Unit), Red Tower Upgrade Level 0 Sprite, Red Tower Upgrade Level 1 Sprite, Red Tower Upgrade Level 2 Sprite, Red Tower Upgrade Level 3 Sprite, Red Tower Upgrade Level 4 Sprite (+7 more)

### Community 37 - "HUD Tower Button Sprites"
Cohesion: 0.27
Nodes (13): Green Tower Button (Off / Idle State), Green Tower Button (Off State, Hover), HUD Tower Selection Buttons, Green Tower Button (On / Selected State), Green Tower Button (On State, Hover), Red Tower Button (Off / Idle State), Red Tower Button (Off State, Hover), Red Tower Button (On / Selected State) (+5 more)

### Community 40 - "Enemy Constants & Systems"
Cohesion: 0.23
Nodes (9): ENEMY_BOSS_INDEX_IMAGE, ENEMY_CREATION_MAX_TIME, ENEMY_HEALTH_BAR, ENEMY_SHRINK_AMOUNT_FACTOR, ENEMY_SIZE, ENEMY_STATUS, ENEMY_VELOCITY, TOTAL_ENEMIES (+1 more)

### Community 41 - "TypeScript Config"
Cohesion: 0.17
Nodes (11): compilerOptions, esModuleInterop, forceConsistentCasingInFileNames, lib, module, moduleResolution, outDir, skipLibCheck (+3 more)

### Community 42 - "Progress Bar Timer"
Cohesion: 0.29
Nodes (7): PROGRESS_BAR_TIMER_BOSS_DELAY, PROGRESS_BAR_TIMER_BOSS_POSITION, PROGRESS_BAR_TIMER_BOSS_SIZE, PROGRESS_BAR_TIMER_WAVE_DELAY, PROGRESS_BAR_TIMER_WAVE_POSITION, PROGRESS_BAR_TIMER_WAVE_SIZE, ProgressBarTimer

### Community 44 - "Menu Design Sources"
Cohesion: 0.22
Nodes (10): GitHub README Banner (banner.svg), GitHub README Screenshots (screenshots.svg), GIF Logo (logo.svg), Minimap Toggle Button (button_minimap.svg), Page Button (button_page.svg), Menu Button Sprites (buttons.svg), Main Menu Screen (menu.svg), Survival Menu Screen (menu_survival.svg) (+2 more)

### Community 45 - "HUD & Enemy Design Sources"
Cohesion: 0.31
Nodes (8): Boss Enemy Sprite Sheet (bosses.svg), Enemy Sprite Sheet (enemies.svg), Enemy Sprite Sheet Temp Export (enemies_tmp_export.svg), HUD Core Panel (core.svg), HUD Button Sprites (hud.svg), Magic & UFO Sprites (magics.svg), HUD Button Visual State Set, Enemy Color Coding

### Community 46 - "Magic Button Sprites"
Cohesion: 0.25
Nodes (9): Fireball Magic Button (off/disabled), Fireball Magic Button (on/selected), Fireball Magic Button (on/selected, hover), Iceball Magic Button (off/disabled), Iceball Magic Button (on/selected), Iceball Magic Button (on/selected, hover), UFO Magic Button (off/disabled), UFO Magic Button (on/selected) (+1 more)

### Community 47 - "Button Test Config"
Cohesion: 0.22
Nodes (8): BUTTON_INDEX_IMAGE, button, buttonFourImages, buttonPosition, buttonSixImages, buttonSize, fourImages, sixImages

### Community 48 - "Tower Design Sources"
Cohesion: 0.25
Nodes (8): Crystal & Jumper Tower Design Source (Inkscape SVG), Crystal Tower Sprite, Jumper Tower Sprite, Crystal Particle Effect Sprite, Towers Sprite Sheet Design Source (Inkscape SVG), Green Tower Sprite (tower1) with Upgrade Tiers, Red Tower Sprite (tower2) with Upgrade Tiers, Yellow Tower Sprite (tower3, heart-shaped) with Upgrade Tiers

### Community 49 - "Enemy 5-6 Sprites"
Cohesion: 0.38
Nodes (7): Enemy 5 Sprite (closed/front), Enemy 5 Sprite (facing left), Enemy 5 Sprite (facing right), Enemy 6 Sprite (center), Enemy 6 Sprite (closed/front), Enemy 6 Sprite (facing left), Enemy 6 Sprite (facing right)

### Community 52 - "App Icons"
Cohesion: 0.40
Nodes (6): App Icon (icon.svg), Android Chrome Icon 192x192, Android Chrome Icon 512x512, Apple Touch Icon, Favicon 16x16, Favicon 32x32

### Community 53 - "Green Tower Upgrade Sprites"
Cohesion: 0.33
Nodes (6): Green Tower Upgrade Level 0, Green Tower Upgrade Level 1, Green Tower Upgrade Level 2, Green Tower Upgrade Level 3, Green Tower Upgrade Level 4, Green Tower Upgrade Level 5

### Community 54 - "Enemy 1 Sprites"
Cohesion: 0.40
Nodes (5): Ground Background Texture, Enemy 1 Center-Facing Sprite, Enemy 1 Closed Sprite, Enemy 1 Left-Facing Sprite, Enemy 1 Right-Facing Sprite

### Community 55 - "HUD Status Indicators"
Cohesion: 0.60
Nodes (5): Core HUD Icon, HUD Status Indicators, Normal HUD Indicator, Upgrading HUD Indicator, Upgrading Max HUD Indicator

### Community 56 - "Magic Projectile Sprites"
Cohesion: 0.60
Nodes (5): Fireball Magic Sprite, Magic Projectile Sprites, Iceball Magic Sprite, UFO Magic Sprite, UFO Ray Effect Sprite

### Community 57 - "Enemy 2 Sprites"
Cohesion: 0.50
Nodes (4): Enemy 2 Center-Facing Sprite, Enemy 2 Closed Sprite, Enemy 2 Left-Facing Sprite, Enemy 2 Right-Facing Sprite

### Community 58 - "Enemy 3 Sprites"
Cohesion: 0.50
Nodes (4): Enemy 3 Center-Facing Sprite, Enemy 3 Closed Sprite, Enemy 3 Left-Facing Sprite, Enemy 3 Right-Facing Sprite

### Community 59 - "Enemy 4 Sprites"
Cohesion: 0.50
Nodes (4): Enemy 4 Center-Facing Sprite, Enemy 4 Closed Sprite, Enemy 4 Left-Facing Sprite, Enemy 4 Right-Facing Sprite

### Community 60 - "Pause Button Sprites"
Cohesion: 0.50
Nodes (4): Pause Button (checked/pressed), Pause Button (checked/pressed, hover), Pause Button (on/normal), Pause Button (on/normal, hover)

### Community 61 - "Prettier Config"
Cohesion: 0.50
Nodes (3): semi, singleQuote, trailingComma

### Community 62 - "GitHub README Assets"
Cohesion: 0.67
Nodes (3): GitHub README Asset, GitHub README Banner Image, GitHub README Screenshots Image

### Community 63 - "Tile Variants"
Cohesion: 1.00
Nodes (3): Black Tile (Blocked), Crystal Tile, Orange Tile (Buildable)

### Community 64 - "Jumper Tile Animation"
Cohesion: 0.67
Nodes (3): Jumper Tile Frame 1, Jumper Tile Frame 2, Jumper Tile Frame 3

## Knowledge Gaps
- **149 isolated node(s):** `$schema`, `plugin`, `semi`, `trailingComma`, `singleQuote` (+144 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 336 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **38 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Position` connect `Magic Button Handlers` to `Global Types & Constants`, `Explosions & Effects`, `HUD Tower Buttons`, `Tile Creation & MiniMap`, `Fly Indicators & Debug`, `Tower & Progress Bar`, `Level Path Data & Testing`, `Button Rendering`, `Magic UFO Ability`, `MiniMap Buttons & Canvas`, `Enemy Creation & Tests`, `Path & Tile Geometry`, `Menu Button Creators`, `Path Order Searching`, `Page Buttons & Paginator`, `Enemy Path Movement`, `Enemy System`, `Missile Projectiles`, `MiniMap Creation & Levels`, `HUD Magic Buttons`, `Tile System Core`, `Fireball Creator & Images`, `Red Tower`, `Fireball Magic`, `Iceball Magic`, `Enemy Constants & Systems`, `Progress Bar Timer`, `Instance Managers`, `Button Test Config`, `Collision Geometry`, `Disabled Button`, `Progress Bar Instantiation`?**
  _High betweenness centrality (0.135) - this node is a cross-community bridge._
- **What connects `$schema`, `plugin`, `semi` to the rest of the system?**
  _149 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Global Types & Constants` be split into smaller, more focused modules?**
  _Cohesion score 0.05121257282211082 - nodes in this community are weakly interconnected._
- **Why does `Enemy` connect `Enemy Entity` to `Global Types & Constants`, `Enemy Eye Animation`, `Red Tower`, `Tower & Progress Bar`, `Fireball Magic`, `Enemy Constants & Systems`, `Iceball Magic`, `Magic UFO Ability`, `MiniMap Buttons & Canvas`, `Enemy Creation & Tests`, `Magic Collision Checker`, `Enemy Path Movement`, `Missile Projectiles`, `Tile System Core`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **Should `Explosions & Effects` be split into smaller, more focused modules?**
  _Cohesion score 0.05541346973572037 - nodes in this community are weakly interconnected._
- **Why does `Button` connect `Button Rendering` to `Global Types & Constants`, `Disabled Button`, `Game State Manager`, `HUD Tower Buttons`, `Enemy Eye Animation`, `Progress Bar Timer`, `MiniMap Buttons & Canvas`, `Button Test Config`, `Game Initialization`, `Collision Geometry`, `Magic Button Handlers`, `Menu Button Creators`, `Page Buttons & Paginator`, `HUD Magic Buttons`, `Survival Menu`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Should `Enemy Eye Animation` be split into smaller, more focused modules?**
  _Cohesion score 0.060496067755595885 - nodes in this community are weakly interconnected._