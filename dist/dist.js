class Const {
}
Const.TILE_SIZE = 50;
Const.UPGRADE_MAX_LEVEL = 5;
Const.CANVAS_WIDTH = 800;
Const.CANVAS_HEIGHT = 580;
Const.KEY_1 = 49;
Const.KEY_2 = 50;
Const.KEY_3 = 51;
Const.TOWER_OFFSET = 5;
Const.EXPLOSION_OFFSET = 25;
Const.GAME_STATUS_PLAYING = 0;
Const.GAME_STATUS_GAME_OVER = 1;
Const.WAVE_PROGRESS_DELAY = 35;
Const.BOSS_PROGRESS_DELAY = Const.WAVE_PROGRESS_DELAY * 6;
Const.MONEY_MULTIPLICATOR = 10;
Const.DELAY_UPGRADE_MULTIPLIER = 5;
Const.MAGIC_STATUS_ALIVE = 0;
Const.MAGIC_STATUS_DEAD = 1;
class ConstColor {
}
ConstColor.GRAY = [50, 50, 50];
ConstColor.GREEN = [75, 185, 35];
ConstColor.YELLOW = [202, 191, 24];
ConstColor.RED = [185, 35, 35];
class ConstDirection {
}
ConstDirection.LEFT = 1;
ConstDirection.RIGHT = 2;
ConstDirection.UP = 3;
ConstDirection.DOWN = 4;
class ConstTest {
}
ConstTest.ID_LEVEL_VALID_FOR_UNIT_TESTING = 1;
ConstTest.ID_LEVEL_INVALID_FOR_UNIT_TESTING = 6666;
ConstTest.ID_LEVEL_INVALID_WITHOUT_ROWSMAP_FOR_UNIT_TESTING = 6667;
class Debug {
    static showMouseCoordinates(position) {
        const mousePosX = Math.round(position.x);
        const mousePosY = Math.round(position.y);
        TextProperties.setForHudData();
        text(`x:${mousePosX}, y:${mousePosY}`, 260, 18);
    }
}
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _EndTile_img, _EndTile_position;
class EndTile {
    constructor(img, position) {
        _EndTile_img.set(this, void 0);
        _EndTile_position.set(this, void 0);
        __classPrivateFieldSet(this, _EndTile_img, img, "f");
        __classPrivateFieldSet(this, _EndTile_position, Object.assign({}, position), "f");
    }
    draw() {
        image(__classPrivateFieldGet(this, _EndTile_img, "f"), __classPrivateFieldGet(this, _EndTile_position, "f").x, __classPrivateFieldGet(this, _EndTile_position, "f").y);
    }
    get position() {
        return __classPrivateFieldGet(this, _EndTile_position, "f");
    }
}
_EndTile_img = new WeakMap(), _EndTile_position = new WeakMap();
var _Enemy_instances, _a, _Enemy_images, _Enemy_startPosition, _Enemy_orders, _Enemy_endurance, _Enemy_isBoss, _Enemy_RandomClass, _Enemy_ProgressBarClass, _Enemy_id, _Enemy_imgIndex, _Enemy_imgIndexBeforeEyesClosed, _Enemy_eyesSequence, _Enemy_healthBar, _Enemy_status, _Enemy_damage, _Enemy_position, _Enemy_currentDirection, _Enemy_moveCount, _Enemy_indexOrder, _Enemy_changeEyesTime, _Enemy_indexEyesSecuence, _Enemy_closeEyesTime, _Enemy_extendClosedEyesTime, _Enemy_randomCloseEyes, _Enemy_winned, _Enemy_freezed, _Enemy_freezedTime, _Enemy_reinitEnemy, _Enemy_hasOpenEyes, _Enemy_moveEyesInSequence, _Enemy_setRandomTimeMaxForClosingEyes, _Enemy_changeEyes;
class Enemy {
    constructor(images, startPosition, orders, endurance, isBoss, RandomClass, ProgressBarClass) {
        _Enemy_instances.add(this);
        _Enemy_images.set(this, void 0);
        _Enemy_startPosition.set(this, void 0);
        _Enemy_orders.set(this, void 0);
        _Enemy_endurance.set(this, void 0);
        _Enemy_isBoss.set(this, void 0);
        _Enemy_RandomClass.set(this, void 0);
        _Enemy_ProgressBarClass.set(this, void 0);
        _Enemy_id.set(this, void 0);
        _Enemy_imgIndex.set(this, void 0);
        _Enemy_imgIndexBeforeEyesClosed.set(this, void 0);
        _Enemy_eyesSequence.set(this, void 0);
        _Enemy_healthBar.set(this, void 0);
        _Enemy_status.set(this, void 0);
        _Enemy_damage.set(this, 0);
        _Enemy_position.set(this, void 0);
        _Enemy_currentDirection.set(this, void 0);
        _Enemy_moveCount.set(this, 0);
        _Enemy_indexOrder.set(this, 0);
        _Enemy_changeEyesTime.set(this, 0);
        _Enemy_indexEyesSecuence.set(this, 0);
        _Enemy_closeEyesTime.set(this, 0);
        _Enemy_extendClosedEyesTime.set(this, 0);
        _Enemy_randomCloseEyes.set(this, 0);
        _Enemy_winned.set(this, false);
        _Enemy_freezed.set(this, false);
        _Enemy_freezedTime.set(this, 0);
        __classPrivateFieldSet(this, _Enemy_images, images, "f");
        __classPrivateFieldSet(this, _Enemy_startPosition, Object.assign({}, startPosition), "f");
        __classPrivateFieldSet(this, _Enemy_orders, orders, "f");
        __classPrivateFieldSet(this, _Enemy_endurance, endurance, "f");
        __classPrivateFieldSet(this, _Enemy_isBoss, isBoss, "f");
        __classPrivateFieldSet(this, _Enemy_RandomClass, RandomClass, "f");
        __classPrivateFieldSet(this, _Enemy_ProgressBarClass, ProgressBarClass, "f");
        _a.numberOfEnemies++;
        __classPrivateFieldSet(this, _Enemy_id, _a.numberOfEnemies, "f");
        __classPrivateFieldSet(this, _Enemy_eyesSequence, [
            _a.EYES_LEFT,
            _a.EYES_CENTER,
            _a.EYES_RIGHT,
            _a.EYES_CENTER,
        ], "f");
        __classPrivateFieldSet(this, _Enemy_healthBar, new (__classPrivateFieldGet(this, _Enemy_ProgressBarClass, "f"))({ x: 200, y: 200 }, ProgressBar.WIDTH, ProgressBar.HEIGHT), "f");
        __classPrivateFieldSet(this, _Enemy_position, Object.assign({}, __classPrivateFieldGet(this, _Enemy_startPosition, "f")), "f");
        __classPrivateFieldSet(this, _Enemy_currentDirection, __classPrivateFieldGet(this, _Enemy_orders, "f")[__classPrivateFieldGet(this, _Enemy_indexOrder, "f")], "f");
        __classPrivateFieldSet(this, _Enemy_imgIndex, _a.EYES_CENTER, "f");
        __classPrivateFieldSet(this, _Enemy_imgIndexBeforeEyesClosed, _a.EYES_CENTER, "f");
        __classPrivateFieldSet(this, _Enemy_status, _a.STATUS_ALIVE, "f");
    }
    get endurance() {
        return __classPrivateFieldGet(this, _Enemy_endurance, "f");
    }
    get id() {
        return __classPrivateFieldGet(this, _Enemy_id, "f");
    }
    get position() {
        return __classPrivateFieldGet(this, _Enemy_position, "f");
    }
    get dead() {
        return __classPrivateFieldGet(this, _Enemy_status, "f") == _a.STATUS_DEAD;
    }
    get alive() {
        return __classPrivateFieldGet(this, _Enemy_status, "f") == _a.STATUS_ALIVE;
    }
    get winner() {
        return __classPrivateFieldGet(this, _Enemy_winned, "f");
    }
    get orderPosition() {
        return __classPrivateFieldGet(this, _Enemy_indexOrder, "f");
    }
    addDamage(shotDamage) {
        __classPrivateFieldSet(this, _Enemy_damage, __classPrivateFieldGet(this, _Enemy_damage, "f") + shotDamage / __classPrivateFieldGet(this, _Enemy_endurance, "f"), "f");
        __classPrivateFieldGet(this, _Enemy_healthBar, "f").setProgress(__classPrivateFieldGet(this, _Enemy_damage, "f"));
        if (__classPrivateFieldGet(this, _Enemy_healthBar, "f").isFullOfProgress()) {
            __classPrivateFieldSet(this, _Enemy_status, _a.STATUS_DEAD, "f");
        }
    }
    freeze() {
        __classPrivateFieldSet(this, _Enemy_freezed, true, "f");
    }
    resetWinner() {
        __classPrivateFieldSet(this, _Enemy_winned, false, "f");
    }
    update() {
        var _b, _c;
        if (__classPrivateFieldGet(this, _Enemy_freezed, "f")) {
            if (__classPrivateFieldGet(this, _Enemy_freezedTime, "f") < MagicIceball.FREEZE_ENEMY_MAX_TIME) {
                __classPrivateFieldSet(this, _Enemy_freezedTime, (_b = __classPrivateFieldGet(this, _Enemy_freezedTime, "f"), _b++, _b), "f");
            }
            else {
                __classPrivateFieldSet(this, _Enemy_freezed, false, "f");
                __classPrivateFieldSet(this, _Enemy_freezedTime, 0, "f");
            }
            return;
        }
        const velocity = __classPrivateFieldGet(this, _Enemy_isBoss, "f") ? _a.BOSS_VELOCITY : _a.VELOCITY;
        switch (__classPrivateFieldGet(this, _Enemy_currentDirection, "f")) {
            case ConstDirection.LEFT:
                __classPrivateFieldGet(this, _Enemy_position, "f").x = __classPrivateFieldGet(this, _Enemy_position, "f").x - velocity;
                break;
            case ConstDirection.RIGHT:
                __classPrivateFieldGet(this, _Enemy_position, "f").x = __classPrivateFieldGet(this, _Enemy_position, "f").x + velocity;
                break;
            case ConstDirection.UP:
                __classPrivateFieldGet(this, _Enemy_position, "f").y = __classPrivateFieldGet(this, _Enemy_position, "f").y - velocity;
                break;
            case ConstDirection.DOWN:
                __classPrivateFieldGet(this, _Enemy_position, "f").y = __classPrivateFieldGet(this, _Enemy_position, "f").y + velocity;
                break;
        }
        __classPrivateFieldSet(this, _Enemy_moveCount, __classPrivateFieldGet(this, _Enemy_moveCount, "f") + velocity, "f");
        if (__classPrivateFieldGet(this, _Enemy_moveCount, "f") === Const.TILE_SIZE) {
            __classPrivateFieldSet(this, _Enemy_moveCount, 0, "f");
            __classPrivateFieldSet(this, _Enemy_indexOrder, (_c = __classPrivateFieldGet(this, _Enemy_indexOrder, "f"), _c++, _c), "f");
            if (__classPrivateFieldGet(this, _Enemy_indexOrder, "f") == __classPrivateFieldGet(this, _Enemy_orders, "f").length) {
                __classPrivateFieldGet(this, _Enemy_instances, "m", _Enemy_reinitEnemy).call(this);
            }
            else {
                __classPrivateFieldSet(this, _Enemy_currentDirection, __classPrivateFieldGet(this, _Enemy_orders, "f")[__classPrivateFieldGet(this, _Enemy_indexOrder, "f")], "f");
            }
        }
    }
    draw() {
        __classPrivateFieldGet(this, _Enemy_instances, "m", _Enemy_changeEyes).call(this);
        image(__classPrivateFieldGet(this, _Enemy_images, "f")[__classPrivateFieldGet(this, _Enemy_imgIndex, "f")], __classPrivateFieldGet(this, _Enemy_position, "f").x, __classPrivateFieldGet(this, _Enemy_position, "f").y);
        __classPrivateFieldGet(this, _Enemy_healthBar, "f").setPosition({
            x: __classPrivateFieldGet(this, _Enemy_position, "f").x,
            y: __classPrivateFieldGet(this, _Enemy_position, "f").y - 20,
        });
        __classPrivateFieldGet(this, _Enemy_healthBar, "f").draw();
    }
}
_a = Enemy, _Enemy_images = new WeakMap(), _Enemy_startPosition = new WeakMap(), _Enemy_orders = new WeakMap(), _Enemy_endurance = new WeakMap(), _Enemy_isBoss = new WeakMap(), _Enemy_RandomClass = new WeakMap(), _Enemy_ProgressBarClass = new WeakMap(), _Enemy_id = new WeakMap(), _Enemy_imgIndex = new WeakMap(), _Enemy_imgIndexBeforeEyesClosed = new WeakMap(), _Enemy_eyesSequence = new WeakMap(), _Enemy_healthBar = new WeakMap(), _Enemy_status = new WeakMap(), _Enemy_damage = new WeakMap(), _Enemy_position = new WeakMap(), _Enemy_currentDirection = new WeakMap(), _Enemy_moveCount = new WeakMap(), _Enemy_indexOrder = new WeakMap(), _Enemy_changeEyesTime = new WeakMap(), _Enemy_indexEyesSecuence = new WeakMap(), _Enemy_closeEyesTime = new WeakMap(), _Enemy_extendClosedEyesTime = new WeakMap(), _Enemy_randomCloseEyes = new WeakMap(), _Enemy_winned = new WeakMap(), _Enemy_freezed = new WeakMap(), _Enemy_freezedTime = new WeakMap(), _Enemy_instances = new WeakSet(), _Enemy_reinitEnemy = function _Enemy_reinitEnemy() {
    __classPrivateFieldSet(this, _Enemy_winned, true, "f");
    __classPrivateFieldSet(this, _Enemy_moveCount, 0, "f");
    __classPrivateFieldSet(this, _Enemy_indexOrder, 0, "f");
    __classPrivateFieldSet(this, _Enemy_changeEyesTime, 0, "f");
    __classPrivateFieldSet(this, _Enemy_indexEyesSecuence, 0, "f");
    __classPrivateFieldSet(this, _Enemy_closeEyesTime, 0, "f");
    __classPrivateFieldSet(this, _Enemy_extendClosedEyesTime, 0, "f");
    __classPrivateFieldSet(this, _Enemy_currentDirection, __classPrivateFieldGet(this, _Enemy_orders, "f")[__classPrivateFieldGet(this, _Enemy_indexOrder, "f")], "f");
    __classPrivateFieldSet(this, _Enemy_position, Object.assign({}, __classPrivateFieldGet(this, _Enemy_startPosition, "f")), "f");
    __classPrivateFieldGet(this, _Enemy_instances, "m", _Enemy_setRandomTimeMaxForClosingEyes).call(this);
}, _Enemy_hasOpenEyes = function _Enemy_hasOpenEyes() {
    return __classPrivateFieldGet(this, _Enemy_imgIndex, "f") != _a.EYES_CLOSED;
}, _Enemy_moveEyesInSequence = function _Enemy_moveEyesInSequence() {
    var _b, _c;
    __classPrivateFieldSet(this, _Enemy_changeEyesTime, (_b = __classPrivateFieldGet(this, _Enemy_changeEyesTime, "f"), _b++, _b), "f");
    if (__classPrivateFieldGet(this, _Enemy_changeEyesTime, "f") > _a.CHANGE_EYES_MAX_TIME) {
        __classPrivateFieldSet(this, _Enemy_changeEyesTime, 0, "f");
        __classPrivateFieldSet(this, _Enemy_indexEyesSecuence, (_c = __classPrivateFieldGet(this, _Enemy_indexEyesSecuence, "f"), _c++, _c), "f");
        if (__classPrivateFieldGet(this, _Enemy_indexEyesSecuence, "f") == __classPrivateFieldGet(this, _Enemy_eyesSequence, "f").length) {
            __classPrivateFieldSet(this, _Enemy_indexEyesSecuence, 0, "f");
        }
        __classPrivateFieldSet(this, _Enemy_imgIndex, __classPrivateFieldGet(this, _Enemy_eyesSequence, "f")[__classPrivateFieldGet(this, _Enemy_indexEyesSecuence, "f")], "f");
    }
}, _Enemy_setRandomTimeMaxForClosingEyes = function _Enemy_setRandomTimeMaxForClosingEyes() {
    __classPrivateFieldSet(this, _Enemy_randomCloseEyes, __classPrivateFieldGet(this, _Enemy_RandomClass, "f").integerBetween(_a.MIN_TIME_TO_CLOSE, _a.MAX_TIME_TO_CLOSE), "f");
}, _Enemy_changeEyes = function _Enemy_changeEyes() {
    var _b, _c;
    if (__classPrivateFieldGet(this, _Enemy_instances, "m", _Enemy_hasOpenEyes).call(this)) {
        __classPrivateFieldSet(this, _Enemy_closeEyesTime, (_b = __classPrivateFieldGet(this, _Enemy_closeEyesTime, "f"), _b++, _b), "f");
        if (__classPrivateFieldGet(this, _Enemy_closeEyesTime, "f") > __classPrivateFieldGet(this, _Enemy_randomCloseEyes, "f")) {
            __classPrivateFieldSet(this, _Enemy_closeEyesTime, 0, "f");
            __classPrivateFieldGet(this, _Enemy_instances, "m", _Enemy_setRandomTimeMaxForClosingEyes).call(this);
            __classPrivateFieldSet(this, _Enemy_imgIndexBeforeEyesClosed, __classPrivateFieldGet(this, _Enemy_imgIndex, "f"), "f");
            __classPrivateFieldSet(this, _Enemy_imgIndex, _a.EYES_CLOSED, "f");
        }
        __classPrivateFieldGet(this, _Enemy_instances, "m", _Enemy_moveEyesInSequence).call(this);
    }
    else {
        __classPrivateFieldSet(this, _Enemy_extendClosedEyesTime, (_c = __classPrivateFieldGet(this, _Enemy_extendClosedEyesTime, "f"), _c++, _c), "f");
        if (__classPrivateFieldGet(this, _Enemy_extendClosedEyesTime, "f") > _a.EXTEND_CLOSED_EYES_MAX_TIME) {
            __classPrivateFieldSet(this, _Enemy_extendClosedEyesTime, 0, "f");
            __classPrivateFieldSet(this, _Enemy_imgIndex, __classPrivateFieldGet(this, _Enemy_imgIndexBeforeEyesClosed, "f"), "f");
        }
    }
};
Enemy.VELOCITY = 1;
Enemy.BOSS_VELOCITY = 0.5;
Enemy.CHANGE_EYES_MAX_TIME = 50;
Enemy.EXTEND_CLOSED_EYES_MAX_TIME = 20;
Enemy.MIN_TIME_TO_CLOSE = 50;
Enemy.MAX_TIME_TO_CLOSE = 200;
Enemy.EYES_CENTER = 0;
Enemy.EYES_LEFT = 1;
Enemy.EYES_RIGHT = 2;
Enemy.EYES_CLOSED = 3;
Enemy.STATUS_ALIVE = 0;
Enemy.STATUS_DEAD = 1;
Enemy.TOTAL_ENEMIES = 5;
Enemy.CREATION_MAX_TIME = 200;
Enemy.numberOfEnemies = 0;
var _Explosion_emisionTime, _Explosion_finished;
class Explosion {
    constructor(x, y) {
        _Explosion_emisionTime.set(this, 0);
        _Explosion_finished.set(this, false);
        this.x = x;
        this.y = y;
    }
    isActive() {
        return !__classPrivateFieldGet(this, _Explosion_finished, "f");
    }
    update() {
        var _a;
        if (__classPrivateFieldGet(this, _Explosion_emisionTime, "f") < Explosion.MAX_EMIT_TIME) {
            __classPrivateFieldSet(this, _Explosion_emisionTime, (_a = __classPrivateFieldGet(this, _Explosion_emisionTime, "f"), _a++, _a), "f");
            this.particleSystem.addParticle();
        }
        this.particleSystem.run();
    }
}
_Explosion_emisionTime = new WeakMap(), _Explosion_finished = new WeakMap();
Explosion.MAX_EMIT_TIME = 5;
class ExplosionEnemy extends Explosion {
    constructor(x, y, ParticleSystemClass) {
        super(x, y);
        this.particleSystem = new ParticleSystemClass(createVector(this.x + Const.EXPLOSION_OFFSET, this.y + Const.EXPLOSION_OFFSET), ExplosionEnemy.SIZE, ExplosionEnemy.COLOR);
    }
}
ExplosionEnemy.SIZE = 12;
ExplosionEnemy.COLOR = [255, 165, 0];
class ExplosionMagicFireball extends Explosion {
    constructor(x, y, ParticleSystemClass) {
        super(x, y);
        this.particleSystem = new ParticleSystemClass(createVector(this.x + Const.EXPLOSION_OFFSET, this.y + Const.EXPLOSION_OFFSET), ExplosionMagicFireball.SIZE, ExplosionMagicFireball.COLOR);
    }
}
ExplosionMagicFireball.SIZE = 6;
ExplosionMagicFireball.COLOR = [202, 191, 24];
class ExplosionMagicIceball extends Explosion {
    constructor(x, y, ParticleSystemClass) {
        super(x, y);
        this.particleSystem = new ParticleSystemClass(createVector(this.x + Const.EXPLOSION_OFFSET, this.y + Const.EXPLOSION_OFFSET), ExplosionMagicIceball.SIZE, ExplosionMagicIceball.COLOR);
    }
}
ExplosionMagicIceball.SIZE = 6;
ExplosionMagicIceball.COLOR = [0, 65, 255];
var _Hud_hudImages, _Hud_hudIconImages, _Hud_wallet, _Hud_lives, _Hud_score, _Hud_TextPropertiesClass, _Hud_waveProgressBar, _Hud_bossProgressBar, _Hud_wave, _Hud_hudType, _Hud_selectedItem, _Hud_upgradeCost, _Hud_sellProfit, _Hud_canBuyTowerGreen, _Hud_canBuyTowerRed, _Hud_canBuyTowerYellow, _Hud_magicfireballs, _Hud_magiciceballs, _Hud_magicUFOs, _Hud_canUpgrade;
class Hud {
    constructor(hudImages, hudIconImages, wallet, lives, score, TextPropertiesClass, waveProgressBar, bossProgressBar, wave) {
        _Hud_hudImages.set(this, void 0);
        _Hud_hudIconImages.set(this, void 0);
        _Hud_wallet.set(this, void 0);
        _Hud_lives.set(this, void 0);
        _Hud_score.set(this, void 0);
        _Hud_TextPropertiesClass.set(this, void 0);
        _Hud_waveProgressBar.set(this, void 0);
        _Hud_bossProgressBar.set(this, void 0);
        _Hud_wave.set(this, void 0);
        _Hud_hudType.set(this, void 0);
        _Hud_selectedItem.set(this, void 0);
        _Hud_upgradeCost.set(this, null);
        _Hud_sellProfit.set(this, null);
        _Hud_canBuyTowerGreen.set(this, false);
        _Hud_canBuyTowerRed.set(this, false);
        _Hud_canBuyTowerYellow.set(this, false);
        _Hud_magicfireballs.set(this, void 0);
        _Hud_magiciceballs.set(this, void 0);
        _Hud_magicUFOs.set(this, void 0);
        _Hud_canUpgrade.set(this, void 0);
        __classPrivateFieldSet(this, _Hud_hudImages, hudImages, "f");
        __classPrivateFieldSet(this, _Hud_hudIconImages, hudIconImages, "f");
        __classPrivateFieldSet(this, _Hud_wallet, wallet, "f");
        __classPrivateFieldSet(this, _Hud_lives, lives, "f");
        __classPrivateFieldSet(this, _Hud_score, score, "f");
        __classPrivateFieldSet(this, _Hud_TextPropertiesClass, TextPropertiesClass, "f");
        __classPrivateFieldSet(this, _Hud_waveProgressBar, waveProgressBar, "f");
        __classPrivateFieldSet(this, _Hud_bossProgressBar, bossProgressBar, "f");
        __classPrivateFieldSet(this, _Hud_wave, wave, "f");
        __classPrivateFieldSet(this, _Hud_waveProgressBar, new ProgressBar({ x: 335, y: -19 }, 150, 16), "f");
        __classPrivateFieldSet(this, _Hud_bossProgressBar, new ProgressBar({ x: 335, y: -2 }, 150, 10), "f");
        __classPrivateFieldSet(this, _Hud_hudType, Hud.NORMAL, "f");
        __classPrivateFieldSet(this, _Hud_selectedItem, TowerGreen.ID, "f");
        __classPrivateFieldSet(this, _Hud_magicfireballs, MagicFireball.FIREBALLS, "f");
        __classPrivateFieldSet(this, _Hud_magiciceballs, MagicIceball.ICEBALLS, "f");
        __classPrivateFieldSet(this, _Hud_magicUFOs, MagicUFO.UFOS, "f");
    }
    isInsideButtonsBar(px, py) {
        if (px > 0 && px < 800 && py > 28 && py < 78) {
            return true;
        }
        return false;
    }
    isInsideTowerGreenButton(px, py) {
        if (px > 0 && px < 98 && py > 28 && py < 78) {
            return true;
        }
        return false;
    }
    isInsideTowerRedButton(px, py) {
        if (px > 98 && px < 180 && py > 28 && py < 78) {
            return true;
        }
        return false;
    }
    isInsideTowerYellowButton(px, py) {
        if (px > 180 && px < 263 && py > 28 && py < 78) {
            return true;
        }
        return false;
    }
    isInsideMagicFireball(px, py) {
        if (px > 616 && px < 692 && py > 28 && py < 78) {
            return true;
        }
        return false;
    }
    isInsideMagicIceball(px, py) {
        if (px > 692 && px < 795 && py > 28 && py < 78) {
            return true;
        }
        return false;
    }
    isInsideMagicUFO(px, py) {
        if (px > 498 && px < 616 && py > 28 && py < 78) {
            return true;
        }
        return false;
    }
    setMagicFireballs(magicfireballs) {
        __classPrivateFieldSet(this, _Hud_magicfireballs, magicfireballs, "f");
    }
    setMagicIceballs(magiciceballs) {
        __classPrivateFieldSet(this, _Hud_magiciceballs, magiciceballs, "f");
    }
    setMagicUFOs(magicUFOs) {
        __classPrivateFieldSet(this, _Hud_magicUFOs, magicUFOs, "f");
    }
    setWaveProgressBar(waveProgressBar) {
        __classPrivateFieldSet(this, _Hud_waveProgressBar, waveProgressBar, "f");
    }
    setBossProgressBar(bossProgressBar) {
        __classPrivateFieldSet(this, _Hud_bossProgressBar, bossProgressBar, "f");
    }
    selectTower(towerId) {
        __classPrivateFieldSet(this, _Hud_selectedItem, towerId, "f");
    }
    getSelectedTower() {
        return __classPrivateFieldGet(this, _Hud_selectedItem, "f");
    }
    setType(hudType) {
        __classPrivateFieldSet(this, _Hud_hudType, hudType, "f");
    }
    setCanBuy(canBuyTowerGreen, canBuyTowerRed, canBuyTowerYellow) {
        __classPrivateFieldSet(this, _Hud_canBuyTowerGreen, canBuyTowerGreen, "f");
        __classPrivateFieldSet(this, _Hud_canBuyTowerRed, canBuyTowerRed, "f");
        __classPrivateFieldSet(this, _Hud_canBuyTowerYellow, canBuyTowerYellow, "f");
    }
    draw() {
        switch (__classPrivateFieldGet(this, _Hud_hudType, "f")) {
            case Hud.NORMAL:
                image(__classPrivateFieldGet(this, _Hud_hudImages, "f")[Hud.NORMAL], 0, 0);
                this._drawTowerIcons();
                this._drawSelectedItem();
                break;
            case Hud.UPGRADING:
                image(__classPrivateFieldGet(this, _Hud_hudImages, "f")[Hud.UPGRADING], 0, 0);
                break;
            case Hud.UPGRADING_MAX:
                image(__classPrivateFieldGet(this, _Hud_hudImages, "f")[Hud.UPGRADING_MAX], 0, 0);
                break;
        }
        __classPrivateFieldGet(this, _Hud_waveProgressBar, "f").draw();
        __classPrivateFieldGet(this, _Hud_bossProgressBar, "f").draw();
        __classPrivateFieldGet(this, _Hud_TextPropertiesClass, "f").setForHudData();
        this._drawMoney();
        this._drawLives();
        this._drawScore();
        this._drawLevelTitle();
        this._drawWave();
        this._drawUpgradeCost();
        this._drawSellProfit();
        this._drawMagicUFO();
        this._drawMagicFireball();
        this._drawMagicIceball();
        if (__classPrivateFieldGet(this, _Hud_hudType, "f") === Hud.NORMAL) {
            this._drawNewTowerPrices();
        }
    }
    setWave(wave) {
        __classPrivateFieldSet(this, _Hud_wave, wave, "f");
    }
    setLives(lives) {
        __classPrivateFieldSet(this, _Hud_lives, lives, "f");
    }
    _drawTowerIcons() {
        let greenIconImgPos = Hud.ICON_GREEN_TOWER_OFF;
        let redIconImgPos = Hud.ICON_RED_TOWER_OFF;
        let yellowIconImgPos = Hud.ICON_YELLOW_TOWER_OFF;
        if (__classPrivateFieldGet(this, _Hud_canBuyTowerGreen, "f")) {
            greenIconImgPos = Hud.ICON_GREEN_TOWER_ON;
        }
        if (__classPrivateFieldGet(this, _Hud_canBuyTowerRed, "f")) {
            redIconImgPos = Hud.ICON_RED_TOWER_ON;
        }
        if (__classPrivateFieldGet(this, _Hud_canBuyTowerYellow, "f")) {
            yellowIconImgPos = Hud.ICON_YELLOW_TOWER_ON;
        }
        image(__classPrivateFieldGet(this, _Hud_hudIconImages, "f")[greenIconImgPos], 60, 38);
        image(__classPrivateFieldGet(this, _Hud_hudIconImages, "f")[redIconImgPos], 142, 38);
        image(__classPrivateFieldGet(this, _Hud_hudIconImages, "f")[yellowIconImgPos], 226, 38);
    }
    _drawMoney() {
        text(__classPrivateFieldGet(this, _Hud_wallet, "f").money, 445, 48);
    }
    _drawUpgradeCost() {
        if (__classPrivateFieldGet(this, _Hud_upgradeCost, "f") !== null) {
            if (!__classPrivateFieldGet(this, _Hud_canUpgrade, "f")) {
                fill('gray');
            }
            text(__classPrivateFieldGet(this, _Hud_upgradeCost, "f"), 33, 72);
            fill('white');
        }
    }
    _drawMagicUFO() {
        text(__classPrivateFieldGet(this, _Hud_magicUFOs, "f"), 592, 74);
    }
    _drawMagicFireball() {
        text(__classPrivateFieldGet(this, _Hud_magicfireballs, "f"), 680, 74);
    }
    _drawMagicIceball() {
        text(__classPrivateFieldGet(this, _Hud_magiciceballs, "f"), 769, 74);
    }
    _drawSellProfit() {
        if (__classPrivateFieldGet(this, _Hud_sellProfit, "f") !== null) {
            text(__classPrivateFieldGet(this, _Hud_sellProfit, "f"), 182, 72);
        }
    }
    _drawLives() {
        text(__classPrivateFieldGet(this, _Hud_lives, "f"), 390, 48);
    }
    _drawScore() {
        text(__classPrivateFieldGet(this, _Hud_score, "f").getPrintScore(), 404, 73);
    }
    _drawLevelTitle() {
        text('Serpent by Ocliboy', 130, 18);
    }
    _drawWave() {
        text(`wave ${__classPrivateFieldGet(this, _Hud_wave, "f")}`, 403, 13);
    }
    _drawTowerGreenPrice() {
        if (!__classPrivateFieldGet(this, _Hud_canBuyTowerGreen, "f")) {
            fill('gray');
        }
        text(TowerGreen.COST_UPGRADE[0], 40, 72);
        fill('white');
    }
    _drawTowerRedPrice() {
        if (!__classPrivateFieldGet(this, _Hud_canBuyTowerRed, "f")) {
            fill('gray');
        }
        text(TowerRed.COST_UPGRADE[0], 118, 72);
        fill('white');
    }
    _drawTowerYellowPrice() {
        if (!__classPrivateFieldGet(this, _Hud_canBuyTowerYellow, "f")) {
            fill('gray');
        }
        text(TowerYellow.COST_UPGRADE[0], 202, 72);
        fill('white');
    }
    _drawNewTowerPrices() {
        this._drawTowerGreenPrice();
        this._drawTowerRedPrice();
        this._drawTowerYellowPrice();
    }
    _drawSelectedItem() {
        strokeWeight(3);
        stroke(255, 204, 0);
        noFill();
        switch (__classPrivateFieldGet(this, _Hud_selectedItem, "f")) {
            case TowerGreen.ID:
                square(57, 36, 37);
                break;
            case TowerRed.ID:
                square(140, 36, 37);
                break;
            case TowerYellow.ID:
                square(225, 36, 37);
                break;
        }
    }
    selectTowerHudType(tower) {
        if (tower.upgradeLevel < Const.UPGRADE_MAX_LEVEL) {
            this.setType(Hud.UPGRADING);
        }
        else {
            this.setType(Hud.UPGRADING_MAX);
        }
    }
    viewUpgradeCost(tower, canUpgrade) {
        __classPrivateFieldSet(this, _Hud_upgradeCost, null, "f");
        if (__classPrivateFieldGet(this, _Hud_hudType, "f") === Hud.UPGRADING) {
            __classPrivateFieldSet(this, _Hud_upgradeCost, tower.nextLevelUpgradeCost, "f");
        }
        __classPrivateFieldSet(this, _Hud_canUpgrade, canUpgrade, "f");
    }
    viewSellProfit(tower) {
        __classPrivateFieldSet(this, _Hud_sellProfit, null, "f");
        if (__classPrivateFieldGet(this, _Hud_hudType, "f") === Hud.UPGRADING) {
            __classPrivateFieldSet(this, _Hud_sellProfit, tower.sellProfit, "f");
        }
    }
    hideUpgradeCost() {
        __classPrivateFieldSet(this, _Hud_upgradeCost, null, "f");
    }
    hideSellProfit() {
        __classPrivateFieldSet(this, _Hud_sellProfit, null, "f");
    }
}
_Hud_hudImages = new WeakMap(), _Hud_hudIconImages = new WeakMap(), _Hud_wallet = new WeakMap(), _Hud_lives = new WeakMap(), _Hud_score = new WeakMap(), _Hud_TextPropertiesClass = new WeakMap(), _Hud_waveProgressBar = new WeakMap(), _Hud_bossProgressBar = new WeakMap(), _Hud_wave = new WeakMap(), _Hud_hudType = new WeakMap(), _Hud_selectedItem = new WeakMap(), _Hud_upgradeCost = new WeakMap(), _Hud_sellProfit = new WeakMap(), _Hud_canBuyTowerGreen = new WeakMap(), _Hud_canBuyTowerRed = new WeakMap(), _Hud_canBuyTowerYellow = new WeakMap(), _Hud_magicfireballs = new WeakMap(), _Hud_magiciceballs = new WeakMap(), _Hud_magicUFOs = new WeakMap(), _Hud_canUpgrade = new WeakMap();
Hud.NORMAL = 0;
Hud.UPGRADING = 1;
Hud.UPGRADING_MAX = 2;
Hud.HEIGHT = 84;
Hud.ICON_GREEN_TOWER_ON = 0;
Hud.ICON_GREEN_TOWER_OFF = 1;
Hud.ICON_RED_TOWER_ON = 2;
Hud.ICON_RED_TOWER_OFF = 3;
Hud.ICON_YELLOW_TOWER_ON = 4;
Hud.ICON_YELLOW_TOWER_OFF = 5;
class InfluenceArea {
    constructor() { }
    _setGrayInfluenceAreaColor() {
        stroke(...ConstColor.GRAY, InfluenceArea.ALPHA_STROKE);
        fill(...ConstColor.GRAY, InfluenceArea.ALPHA_FILL);
    }
    _setInfluenceAreaColor(towerId) {
        switch (towerId) {
            case TowerGreen.ID:
                stroke(...ConstColor.GREEN, InfluenceArea.ALPHA_STROKE);
                fill(...ConstColor.GREEN, InfluenceArea.ALPHA_FILL);
                break;
            case TowerRed.ID:
                stroke(...ConstColor.RED, InfluenceArea.ALPHA_STROKE);
                fill(...ConstColor.RED, InfluenceArea.ALPHA_FILL);
                break;
            case TowerYellow.ID:
                stroke(...ConstColor.YELLOW, InfluenceArea.ALPHA_STROKE);
                fill(...ConstColor.YELLOW, InfluenceArea.ALPHA_FILL);
                break;
        }
    }
    _getInfluenceAreaFor(towerSelected) {
        let influenceArea = TowerGreen.INFLUENCE_AREA;
        switch (towerSelected) {
            case TowerGreen.ID:
                influenceArea = TowerGreen.INFLUENCE_AREA;
                break;
            case TowerRed.ID:
                influenceArea = TowerRed.INFLUENCE_AREA;
                break;
            case TowerYellow.ID:
                influenceArea = TowerYellow.INFLUENCE_AREA;
                break;
        }
        return influenceArea;
    }
    drawHudTowerInfluenceArea(hudTowerSelected, position, canBuy) {
        strokeWeight(2);
        if (canBuy) {
            this._setInfluenceAreaColor(hudTowerSelected);
        }
        else {
            this._setGrayInfluenceAreaColor();
        }
        this._drawCircle(position.x, position.y, this._getInfluenceAreaFor(hudTowerSelected));
    }
    drawTowerInfluenceArea(tower, canUpgrade) {
        strokeWeight(2);
        const towerPosition = tower.position;
        let x = towerPosition.x;
        let y = towerPosition.y;
        if (tower.type === TowerGreen.ID || tower.type === TowerRed.ID) {
            x += Const.TOWER_OFFSET;
            y += Const.TOWER_OFFSET;
        }
        if (canUpgrade) {
            this._setInfluenceAreaColor(tower.type);
        }
        else {
            this._setGrayInfluenceAreaColor();
        }
        this._drawCircle(x, y, tower.influenceArea);
    }
    _drawCircle(x, y, diameter) {
        circle(x + Const.TILE_SIZE / 2, y + Const.TILE_SIZE / 2, diameter);
    }
}
InfluenceArea.ALPHA_FILL = 50;
InfluenceArea.ALPHA_STROKE = 120;
class LevelsData {
}
LevelsData.data = [
    {
        id: 1,
        title: 'serpent',
        comments: 'first level and also used in unit testing',
        rowsMap: [
            '111111111111111x',
            '1000000000000000',
            '1011111111111111',
            '1010000000000001',
            '1010000111111101',
            '1011111100000101',
            '1000000000000101',
            '1111111111111101',
            '0000000000000001',
            'y111111111111111',
        ],
        money: 150,
        startDirection: ConstDirection.LEFT,
        endDirection: ConstDirection.LEFT,
    },
    {
        id: 6666,
        title: 'no valid map 1',
        comments: 'invalid map with unreachable exit (look at the last row, there is a "0" blocking the exit), for unit testing purposes',
        rowsMap: [
            '111111111111111x',
            '1000000000000000',
            '1011111111111111',
            '1010000000000001',
            '1010000111111101',
            '1011111100000101',
            '1000000000000101',
            '1111111111111101',
            '0000000000000001',
            'y011111111111111',
        ],
        money: 150,
        startDirection: ConstDirection.LEFT,
        endDirection: ConstDirection.LEFT,
    },
    {
        id: 6667,
        title: 'no valid map 2',
        comments: 'empty rowsMap, for unit testing purposes',
        rowsMap: [],
        money: 150,
        startDirection: ConstDirection.LEFT,
        endDirection: ConstDirection.LEFT,
    },
];
var _LevelsDataProvider_levels;
class LevelsDataProvider {
    constructor(levels) {
        _LevelsDataProvider_levels.set(this, void 0);
        __classPrivateFieldSet(this, _LevelsDataProvider_levels, levels, "f");
    }
    getLevel(id) {
        return __classPrivateFieldGet(this, _LevelsDataProvider_levels, "f").find((level) => level.id == id);
    }
}
_LevelsDataProvider_levels = new WeakMap();
var _Magic_orders, _Magic_currentDirection, _Magic_moveCount, _Magic_indexOrder, _Magic_touchedEnemiesIds, _Magic_status;
class Magic {
    constructor(startX, startY, orders) {
        _Magic_orders.set(this, void 0);
        _Magic_currentDirection.set(this, void 0);
        _Magic_moveCount.set(this, 0);
        _Magic_indexOrder.set(this, 0);
        _Magic_touchedEnemiesIds.set(this, void 0);
        _Magic_status.set(this, void 0);
        this.startX = startX;
        this.startY = startY;
        __classPrivateFieldSet(this, _Magic_orders, orders, "f");
        this.x = this.startX;
        this.y = this.startY;
        __classPrivateFieldSet(this, _Magic_currentDirection, __classPrivateFieldGet(this, _Magic_orders, "f")[__classPrivateFieldGet(this, _Magic_indexOrder, "f")], "f");
        __classPrivateFieldSet(this, _Magic_touchedEnemiesIds, [], "f");
        __classPrivateFieldSet(this, _Magic_status, Const.MAGIC_STATUS_ALIVE, "f");
    }
    update() {
        var _a;
        switch (__classPrivateFieldGet(this, _Magic_currentDirection, "f")) {
            case ConstDirection.LEFT:
                this.x = this.x - Magic.SPEED;
                break;
            case ConstDirection.RIGHT:
                this.x = this.x + Magic.SPEED;
                break;
            case ConstDirection.UP:
                this.y = this.y - Magic.SPEED;
                break;
            case ConstDirection.DOWN:
                this.y = this.y + Magic.SPEED;
                break;
        }
        __classPrivateFieldSet(this, _Magic_moveCount, __classPrivateFieldGet(this, _Magic_moveCount, "f") + Magic.SPEED, "f");
        if (__classPrivateFieldGet(this, _Magic_moveCount, "f") === Const.TILE_SIZE) {
            __classPrivateFieldSet(this, _Magic_moveCount, 0, "f");
            __classPrivateFieldSet(this, _Magic_indexOrder, (_a = __classPrivateFieldGet(this, _Magic_indexOrder, "f"), _a++, _a), "f");
            if (__classPrivateFieldGet(this, _Magic_indexOrder, "f") == __classPrivateFieldGet(this, _Magic_orders, "f").length) {
                __classPrivateFieldSet(this, _Magic_status, Const.MAGIC_STATUS_DEAD, "f");
            }
            else {
                __classPrivateFieldSet(this, _Magic_currentDirection, __classPrivateFieldGet(this, _Magic_orders, "f")[__classPrivateFieldGet(this, _Magic_indexOrder, "f")], "f");
            }
        }
    }
    checkCollision(enemy) {
        if (enemy.dead || enemy.winner) {
            return false;
        }
        const found = __classPrivateFieldGet(this, _Magic_touchedEnemiesIds, "f").find((id) => id === enemy.id);
        if (found !== undefined) {
            return false;
        }
        const fireballPos = __classPrivateFieldGet(this, _Magic_indexOrder, "f");
        const enemyPos = enemy.orderPosition;
        const distanceBetween = Math.abs(fireballPos - enemyPos);
        if (fireballPos >= enemyPos && distanceBetween < 1) {
            return true;
        }
        return false;
    }
    setToIgnoreList(enemy) {
        __classPrivateFieldGet(this, _Magic_touchedEnemiesIds, "f").push(enemy.id);
    }
    isAlive() {
        return __classPrivateFieldGet(this, _Magic_status, "f") == Const.MAGIC_STATUS_ALIVE;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
}
_Magic_orders = new WeakMap(), _Magic_currentDirection = new WeakMap(), _Magic_moveCount = new WeakMap(), _Magic_indexOrder = new WeakMap(), _Magic_touchedEnemiesIds = new WeakMap(), _Magic_status = new WeakMap();
Magic.SPEED = 10;
var _MagicFireball_img;
class MagicFireball extends Magic {
    constructor(img, startX, startY, orders) {
        super(startX, startY, orders);
        _MagicFireball_img.set(this, void 0);
        __classPrivateFieldSet(this, _MagicFireball_img, img, "f");
    }
    addDamage(enemy) {
        enemy.addDamage(MagicFireball.DAMAGE);
    }
    draw() {
        image(__classPrivateFieldGet(this, _MagicFireball_img, "f"), this.x, this.y);
    }
}
_MagicFireball_img = new WeakMap();
MagicFireball.FIREBALLS = 3;
MagicFireball.DAMAGE = 500;
var _MagicIceball_img;
class MagicIceball extends Magic {
    constructor(img, startX, startY, orders) {
        super(startX, startY, orders);
        _MagicIceball_img.set(this, void 0);
        __classPrivateFieldSet(this, _MagicIceball_img, img, "f");
    }
    freeze(enemy) {
        enemy.freeze();
    }
    draw() {
        image(__classPrivateFieldGet(this, _MagicIceball_img, "f"), this.x, this.y);
    }
}
_MagicIceball_img = new WeakMap();
MagicIceball.ICEBALLS = 3;
MagicIceball.FREEZE_ENEMY_MAX_TIME = 500;
var _MagicUFO_img;
class MagicUFO extends Magic {
    constructor(img, startX, startY, orders) {
        super(startX, startY, orders);
        _MagicUFO_img.set(this, void 0);
        __classPrivateFieldSet(this, _MagicUFO_img, img, "f");
    }
    draw() {
        image(__classPrivateFieldGet(this, _MagicUFO_img, "f"), this.x, this.y);
    }
}
_MagicUFO_img = new WeakMap();
MagicUFO.UFOS = 3;
class MathUtils {
    static distance(posA, posB) {
        return Math.sqrt((posA.x - posB.x) * (posA.x - posB.x) +
            (posA.y - posB.y) * (posA.y - posB.y));
    }
    static range(start, stop) {
        return new Array(stop - start + 1).fill(0).map((v, i) => start + i);
    }
    static getTwoNumbersFourTimes(number) {
        return [number * 4, (number + 1) * 4];
    }
}
var _OrangeTile_img, _OrangeTile_position, _OrangeTile_towerGenerator, _OrangeTile_tower;
class OrangeTile {
    constructor(img, position, towerGenerator) {
        _OrangeTile_img.set(this, void 0);
        _OrangeTile_position.set(this, void 0);
        _OrangeTile_towerGenerator.set(this, void 0);
        _OrangeTile_tower.set(this, null);
        __classPrivateFieldSet(this, _OrangeTile_img, img, "f");
        __classPrivateFieldSet(this, _OrangeTile_position, Object.assign({}, position), "f");
        __classPrivateFieldSet(this, _OrangeTile_towerGenerator, towerGenerator, "f");
    }
    sellTower() {
        let profit = 0;
        if (__classPrivateFieldGet(this, _OrangeTile_tower, "f")) {
            profit = __classPrivateFieldGet(this, _OrangeTile_tower, "f").sellProfit;
            __classPrivateFieldSet(this, _OrangeTile_tower, null, "f");
        }
        return profit;
    }
    buyTower(towerId) {
        if (__classPrivateFieldGet(this, _OrangeTile_tower, "f") === null) {
            __classPrivateFieldSet(this, _OrangeTile_tower, __classPrivateFieldGet(this, _OrangeTile_towerGenerator, "f").newTower(towerId, __classPrivateFieldGet(this, _OrangeTile_position, "f")), "f");
        }
        else {
            __classPrivateFieldGet(this, _OrangeTile_tower, "f").upgrade();
        }
        return __classPrivateFieldGet(this, _OrangeTile_tower, "f").cost;
    }
    _upgradeTower() {
        if (__classPrivateFieldGet(this, _OrangeTile_tower, "f")) {
            __classPrivateFieldGet(this, _OrangeTile_tower, "f").upgrade();
        }
    }
    drawTile() {
        image(__classPrivateFieldGet(this, _OrangeTile_img, "f"), __classPrivateFieldGet(this, _OrangeTile_position, "f").x, __classPrivateFieldGet(this, _OrangeTile_position, "f").y);
    }
    drawTower() {
        if (__classPrivateFieldGet(this, _OrangeTile_tower, "f")) {
            __classPrivateFieldGet(this, _OrangeTile_tower, "f").draw();
        }
    }
    getPosition() {
        return __classPrivateFieldGet(this, _OrangeTile_position, "f");
    }
    selectTarget(enemies) {
        if (__classPrivateFieldGet(this, _OrangeTile_tower, "f")) {
            __classPrivateFieldGet(this, _OrangeTile_tower, "f").selectTarget(enemies);
        }
    }
    isInside(mouse_x, mouse_y) {
        let insideX = false;
        let insideY = false;
        if (__classPrivateFieldGet(this, _OrangeTile_position, "f").x < mouse_x &&
            __classPrivateFieldGet(this, _OrangeTile_position, "f").x + Const.TILE_SIZE > mouse_x) {
            insideX = true;
        }
        if (__classPrivateFieldGet(this, _OrangeTile_position, "f").y < mouse_y &&
            __classPrivateFieldGet(this, _OrangeTile_position, "f").y + Const.TILE_SIZE > mouse_y) {
            insideY = true;
        }
        if (insideX && insideY) {
            return true;
        }
        return false;
    }
    hasTower() {
        return __classPrivateFieldGet(this, _OrangeTile_tower, "f") !== null;
    }
    getTower() {
        if (this.hasTower()) {
            return __classPrivateFieldGet(this, _OrangeTile_tower, "f");
        }
        return null;
    }
}
_OrangeTile_img = new WeakMap(), _OrangeTile_position = new WeakMap(), _OrangeTile_towerGenerator = new WeakMap(), _OrangeTile_tower = new WeakMap();
var _Particle_position, _Particle_size, _Particle_color, _Particle_velocity, _Particle_lifespan;
class Particle {
    constructor(position, size, color) {
        _Particle_position.set(this, void 0);
        _Particle_size.set(this, void 0);
        _Particle_color.set(this, void 0);
        _Particle_velocity.set(this, void 0);
        _Particle_lifespan.set(this, 255);
        __classPrivateFieldSet(this, _Particle_position, position.copy(), "f");
        __classPrivateFieldSet(this, _Particle_size, size, "f");
        __classPrivateFieldSet(this, _Particle_color, color, "f");
        __classPrivateFieldSet(this, _Particle_velocity, createVector(random(-3, 3), random(-3, 0)), "f");
    }
    run() {
        this.update();
        this.display();
    }
    update() {
        __classPrivateFieldGet(this, _Particle_position, "f").add(__classPrivateFieldGet(this, _Particle_velocity, "f"));
        __classPrivateFieldSet(this, _Particle_lifespan, __classPrivateFieldGet(this, _Particle_lifespan, "f") - 2, "f");
    }
    display() {
        stroke(...__classPrivateFieldGet(this, _Particle_color, "f"), __classPrivateFieldGet(this, _Particle_lifespan, "f"));
        strokeWeight(2);
        fill(127, __classPrivateFieldGet(this, _Particle_lifespan, "f"));
        ellipse(__classPrivateFieldGet(this, _Particle_position, "f").x, __classPrivateFieldGet(this, _Particle_position, "f").y, __classPrivateFieldGet(this, _Particle_size, "f"), __classPrivateFieldGet(this, _Particle_size, "f"));
    }
    isDead() {
        return __classPrivateFieldGet(this, _Particle_lifespan, "f") < 0;
    }
}
_Particle_position = new WeakMap(), _Particle_size = new WeakMap(), _Particle_color = new WeakMap(), _Particle_velocity = new WeakMap(), _Particle_lifespan = new WeakMap();
var _ParticleSystem_origin, _ParticleSystem_particlesSize, _ParticleSystem_particlesColor, _ParticleSystem_particles;
class ParticleSystem {
    constructor(origin, particlesSize, particlesColor) {
        _ParticleSystem_origin.set(this, void 0);
        _ParticleSystem_particlesSize.set(this, void 0);
        _ParticleSystem_particlesColor.set(this, void 0);
        _ParticleSystem_particles.set(this, []);
        __classPrivateFieldSet(this, _ParticleSystem_origin, origin.copy(), "f");
        __classPrivateFieldSet(this, _ParticleSystem_particlesSize, particlesSize, "f");
        __classPrivateFieldSet(this, _ParticleSystem_particlesColor, particlesColor, "f");
    }
    addParticle() {
        __classPrivateFieldGet(this, _ParticleSystem_particles, "f").push(new Particle(__classPrivateFieldGet(this, _ParticleSystem_origin, "f"), __classPrivateFieldGet(this, _ParticleSystem_particlesSize, "f"), __classPrivateFieldGet(this, _ParticleSystem_particlesColor, "f")));
    }
    run() {
        for (let i = __classPrivateFieldGet(this, _ParticleSystem_particles, "f").length - 1; i >= 0; i--) {
            let p = __classPrivateFieldGet(this, _ParticleSystem_particles, "f")[i];
            p.run();
            if (p.isDead()) {
                __classPrivateFieldGet(this, _ParticleSystem_particles, "f").splice(i, 1);
            }
        }
    }
}
_ParticleSystem_origin = new WeakMap(), _ParticleSystem_particlesSize = new WeakMap(), _ParticleSystem_particlesColor = new WeakMap(), _ParticleSystem_particles = new WeakMap();
var _Path_startTile, _Path_endTile, _Path_pathTiles;
class Path {
    constructor(startTile, endTile, pathTiles) {
        _Path_startTile.set(this, void 0);
        _Path_endTile.set(this, void 0);
        _Path_pathTiles.set(this, void 0);
        __classPrivateFieldSet(this, _Path_startTile, startTile, "f");
        __classPrivateFieldSet(this, _Path_endTile, endTile, "f");
        __classPrivateFieldSet(this, _Path_pathTiles, pathTiles, "f");
    }
    getEnemiesInitialPosition() {
        let finalX = 0;
        let finalY = 0;
        if (__classPrivateFieldGet(this, _Path_startTile, "f").getStartDirection() === ConstDirection.LEFT) {
            const finalPosition = __classPrivateFieldGet(this, _Path_startTile, "f").getPosition();
            finalX = finalPosition.x + Const.TILE_SIZE;
            finalY = finalPosition.y;
        }
        return { x: finalX, y: finalY };
    }
    getTileInPosition(tx, ty) {
        const pathTile = __classPrivateFieldGet(this, _Path_pathTiles, "f").find((pathTile) => tx === pathTile.getX() && ty === pathTile.getY());
        return pathTile ? pathTile : null;
    }
    _searchLeftTile(currentTile) {
        const searchPx = currentTile.getX() - Const.TILE_SIZE;
        const searchPy = currentTile.getY();
        return this.getTileInPosition(searchPx, searchPy);
    }
    _searchDownTile(currentTile) {
        const searchPx = currentTile.getX();
        const searchPy = currentTile.getY() + Const.TILE_SIZE;
        return this.getTileInPosition(searchPx, searchPy);
    }
    _searchRightTile(currentTile) {
        const searchPx = currentTile.getX() + Const.TILE_SIZE;
        const searchPy = currentTile.getY();
        return this.getTileInPosition(searchPx, searchPy);
    }
    _searchUpTile(currentTile) {
        const searchPx = currentTile.getX();
        const searchPy = currentTile.getY() - Const.TILE_SIZE;
        return this.getTileInPosition(searchPx, searchPy);
    }
    _isLeftEndTile(currentTile) {
        const searchPx = currentTile.getX() - Const.TILE_SIZE;
        const searchPy = currentTile.getY();
        const endPosition = __classPrivateFieldGet(this, _Path_endTile, "f").position;
        const endPx = endPosition.x;
        const endPy = endPosition.y;
        if (searchPx === endPx && searchPy === endPy) {
            return true;
        }
        return false;
    }
    makeOrders() {
        const orders = [];
        const startTilePosition = __classPrivateFieldGet(this, _Path_startTile, "f").getPosition();
        let currentTile = new PathTile(startTilePosition.x, startTilePosition.y);
        let currentDirection = __classPrivateFieldGet(this, _Path_startTile, "f").getStartDirection();
        orders.push(currentDirection);
        let endReached = false;
        let searchCount = 0;
        while (searchCount < Path.MAX_SEARCHES && !endReached) {
            searchCount++;
            if (currentDirection === ConstDirection.LEFT) {
                const isLeftEndTile = this._isLeftEndTile(currentTile);
                if (isLeftEndTile) {
                    endReached = true;
                    orders.push(ConstDirection.LEFT);
                }
                else {
                    const searchTile = this._searchLeftTile(currentTile);
                    if (searchTile) {
                        orders.push(ConstDirection.LEFT);
                        currentTile = searchTile;
                    }
                    else {
                        const searchNextTile = this._searchDownTile(currentTile);
                        if (searchNextTile) {
                            currentDirection = ConstDirection.DOWN;
                        }
                        else {
                            currentDirection = ConstDirection.UP;
                        }
                    }
                }
            }
            if (currentDirection === ConstDirection.DOWN) {
                const searchTile = this._searchDownTile(currentTile);
                if (searchTile) {
                    orders.push(ConstDirection.DOWN);
                    currentTile = searchTile;
                }
                else {
                    const searchNextTile = this._searchRightTile(currentTile);
                    if (searchNextTile) {
                        currentDirection = ConstDirection.RIGHT;
                    }
                    else {
                        currentDirection = ConstDirection.LEFT;
                    }
                }
            }
            if (currentDirection === ConstDirection.RIGHT) {
                const searchTile = this._searchRightTile(currentTile);
                if (searchTile) {
                    orders.push(ConstDirection.RIGHT);
                    currentTile = searchTile;
                }
                else {
                    const searchNextTile = this._searchUpTile(currentTile);
                    if (searchNextTile) {
                        currentDirection = ConstDirection.UP;
                    }
                    else {
                        currentDirection = ConstDirection.DOWN;
                    }
                }
            }
            if (currentDirection === ConstDirection.UP) {
                const searchTile = this._searchUpTile(currentTile);
                if (searchTile) {
                    orders.push(ConstDirection.UP);
                    currentTile = searchTile;
                }
                else {
                    const searchNextTile = this._searchLeftTile(currentTile);
                    if (searchNextTile) {
                        currentDirection = ConstDirection.LEFT;
                    }
                    else {
                        currentDirection = ConstDirection.RIGHT;
                    }
                }
            }
        }
        if (endReached) {
            orders.push(currentDirection);
        }
        if (searchCount === Path.MAX_SEARCHES) {
            return [];
        }
        return orders;
    }
}
_Path_startTile = new WeakMap(), _Path_endTile = new WeakMap(), _Path_pathTiles = new WeakMap();
Path.MAX_SEARCHES = 5000;
var _PathTile_x, _PathTile_y;
class PathTile {
    constructor(x, y) {
        _PathTile_x.set(this, void 0);
        _PathTile_y.set(this, void 0);
        __classPrivateFieldSet(this, _PathTile_x, x, "f");
        __classPrivateFieldSet(this, _PathTile_y, y, "f");
    }
    getX() {
        return __classPrivateFieldGet(this, _PathTile_x, "f");
    }
    getY() {
        return __classPrivateFieldGet(this, _PathTile_y, "f");
    }
}
_PathTile_x = new WeakMap(), _PathTile_y = new WeakMap();
var _ProgressBar_position, _ProgressBar_width, _ProgressBar_height, _ProgressBar_progress, _ProgressBar_maxProgress;
class ProgressBar {
    constructor(position, width, height) {
        _ProgressBar_position.set(this, void 0);
        _ProgressBar_width.set(this, void 0);
        _ProgressBar_height.set(this, void 0);
        _ProgressBar_progress.set(this, 0);
        _ProgressBar_maxProgress.set(this, void 0);
        __classPrivateFieldSet(this, _ProgressBar_position, Object.assign({}, position), "f");
        __classPrivateFieldSet(this, _ProgressBar_width, width, "f");
        __classPrivateFieldSet(this, _ProgressBar_height, height, "f");
        __classPrivateFieldSet(this, _ProgressBar_maxProgress, __classPrivateFieldGet(this, _ProgressBar_width, "f") - 1, "f");
    }
    setPosition(position) {
        __classPrivateFieldSet(this, _ProgressBar_position, Object.assign({}, position), "f");
    }
    setProgress(progress) {
        __classPrivateFieldSet(this, _ProgressBar_progress, progress, "f");
    }
    getProgress() {
        return __classPrivateFieldGet(this, _ProgressBar_progress, "f");
    }
    increaseProgress() {
        var _a;
        __classPrivateFieldSet(this, _ProgressBar_progress, (_a = __classPrivateFieldGet(this, _ProgressBar_progress, "f"), _a++, _a), "f");
    }
    isFullOfProgress() {
        return __classPrivateFieldGet(this, _ProgressBar_progress, "f") >= 100;
    }
    _drawBackgroundBar() {
        strokeWeight(1);
        stroke('black');
        fill('green');
        rect(__classPrivateFieldGet(this, _ProgressBar_position, "f").x + 10, __classPrivateFieldGet(this, _ProgressBar_position, "f").y + 20, __classPrivateFieldGet(this, _ProgressBar_width, "f"), __classPrivateFieldGet(this, _ProgressBar_height, "f"));
    }
    _drawProgressBar() {
        strokeWeight(0);
        fill('red');
        const progressLevel = (__classPrivateFieldGet(this, _ProgressBar_progress, "f") * __classPrivateFieldGet(this, _ProgressBar_maxProgress, "f")) / 100;
        rect(__classPrivateFieldGet(this, _ProgressBar_position, "f").x + 11, __classPrivateFieldGet(this, _ProgressBar_position, "f").y + 21, progressLevel, __classPrivateFieldGet(this, _ProgressBar_height, "f") - 2);
    }
    draw() {
        this._drawBackgroundBar();
        if (__classPrivateFieldGet(this, _ProgressBar_progress, "f") > 0) {
            this._drawProgressBar();
        }
    }
}
_ProgressBar_position = new WeakMap(), _ProgressBar_width = new WeakMap(), _ProgressBar_height = new WeakMap(), _ProgressBar_progress = new WeakMap(), _ProgressBar_maxProgress = new WeakMap();
ProgressBar.WIDTH = 27;
ProgressBar.HEIGHT = 7;
class Random {
    static integerBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
class Resources {
    static enemies() {
        const enemiesImages = [];
        const countEnemiesAndBoss = Enemy.TOTAL_ENEMIES + 1;
        MathUtils.range(1, countEnemiesAndBoss).forEach((v) => {
            enemiesImages.push(loadImage('img/enemies/' + v + '_center.png'));
            enemiesImages.push(loadImage('img/enemies/' + v + '_left.png'));
            enemiesImages.push(loadImage('img/enemies/' + v + '_right.png'));
            enemiesImages.push(loadImage('img/enemies/' + v + '_closed.png'));
        });
        return enemiesImages;
    }
    static greenTower() {
        const greenTowerImages = [];
        MathUtils.range(0, Const.UPGRADE_MAX_LEVEL).forEach((v) => {
            greenTowerImages.push(loadImage('img/towers/green_tower_upgrade_' + v + '.png'));
        });
        return greenTowerImages;
    }
    static redTower() {
        const redTowerImages = [];
        MathUtils.range(0, Const.UPGRADE_MAX_LEVEL).forEach((v) => {
            redTowerImages.push(loadImage('img/towers/red_tower_upgrade_' + v + '.png'));
        });
        return redTowerImages;
    }
    static yellowTower() {
        const yellowTowerImages = [];
        MathUtils.range(0, Const.UPGRADE_MAX_LEVEL).forEach((v) => {
            yellowTowerImages.push(loadImage('img/towers/yellow_tower_upgrade_' + v + '.png'));
        });
        return yellowTowerImages;
    }
    static tileImages() {
        return [
            loadImage('img/tiles/orange.png'),
            loadImage('img/tiles/black.png'),
            loadImage('img/tiles/end_down.png'),
            loadImage('img/tiles/end_right.png'),
            loadImage('img/tiles/end_left.png'),
            loadImage('img/tiles/end_up.png'),
            loadImage('img/tiles/start_down.png'),
            loadImage('img/tiles/start_right.png'),
            loadImage('img/tiles/start_left.png'),
            loadImage('img/tiles/start_up.png'),
            loadImage('img/tiles/crystal.png'),
        ];
    }
    static hudImages() {
        return [
            loadImage('img/hud/normal.png'),
            loadImage('img/hud/upgrading.png'),
            loadImage('img/hud/upgrading_max.png'),
        ];
    }
    static hudIconImages() {
        return [
            loadImage('img/hud/icon_green_tower_on.png'),
            loadImage('img/hud/icon_green_tower_off.png'),
            loadImage('img/hud/icon_red_tower_on.png'),
            loadImage('img/hud/icon_red_tower_off.png'),
            loadImage('img/hud/icon_yellow_tower_on.png'),
            loadImage('img/hud/icon_yellow_tower_off.png'),
        ];
    }
    static backgroundImage() {
        return loadImage('img/backgrounds/ground.jpg');
    }
    static magicFireball() {
        return loadImage('img/magics/fireball.png');
    }
    static magicIceball() {
        return loadImage('img/magics/iceball.png');
    }
    static magicUFO() {
        return loadImage('img/magics/ufo.png');
    }
}
class Score {
    constructor() {
        this.score = 0;
    }
    increase(score) {
        this.score = score;
    }
    getPrintScore() {
        return String(this.score).padStart(10, '0');
    }
}
var _StartTile_img, _StartTile_position, _StartTile_startDirection;
class StartTile {
    constructor(img, position, startDirection) {
        _StartTile_img.set(this, void 0);
        _StartTile_position.set(this, void 0);
        _StartTile_startDirection.set(this, void 0);
        __classPrivateFieldSet(this, _StartTile_img, img, "f");
        __classPrivateFieldSet(this, _StartTile_position, Object.assign({}, position), "f");
        __classPrivateFieldSet(this, _StartTile_startDirection, startDirection, "f");
    }
    draw() {
        image(__classPrivateFieldGet(this, _StartTile_img, "f"), __classPrivateFieldGet(this, _StartTile_position, "f").x, __classPrivateFieldGet(this, _StartTile_position, "f").y);
    }
    getPosition() {
        return __classPrivateFieldGet(this, _StartTile_position, "f");
    }
    getStartDirection() {
        return __classPrivateFieldGet(this, _StartTile_startDirection, "f");
    }
}
_StartTile_img = new WeakMap(), _StartTile_position = new WeakMap(), _StartTile_startDirection = new WeakMap();
class TextProperties {
    static setForBigCenteredTitle() {
        fill('white');
        stroke('black');
        strokeWeight(2);
        textSize(30);
        textAlign(CENTER);
    }
    static setForHudData() {
        textSize(12);
        fill('white');
        stroke('black');
        strokeWeight(2);
        textAlign(LEFT);
    }
}
var _TileGenerator_levelMap, _TileGenerator_mapImages, _TileGenerator_OrangeTileClass, _TileGenerator_PathTileClass, _TileGenerator_StartTileClass, _TileGenerator_EndTileClass, _TileGenerator_towerGenerator, _TileGenerator_orangeImage, _TileGenerator_blackImage, _TileGenerator_startImage, _TileGenerator_endImage, _TileGenerator_startDirection;
class TileGenerator {
    constructor(levelMap, mapImages, OrangeTileClass, PathTileClass, StartTileClass, EndTileClass, towerGenerator) {
        _TileGenerator_levelMap.set(this, void 0);
        _TileGenerator_mapImages.set(this, void 0);
        _TileGenerator_OrangeTileClass.set(this, void 0);
        _TileGenerator_PathTileClass.set(this, void 0);
        _TileGenerator_StartTileClass.set(this, void 0);
        _TileGenerator_EndTileClass.set(this, void 0);
        _TileGenerator_towerGenerator.set(this, void 0);
        _TileGenerator_orangeImage.set(this, void 0);
        _TileGenerator_blackImage.set(this, void 0);
        _TileGenerator_startImage.set(this, void 0);
        _TileGenerator_endImage.set(this, void 0);
        _TileGenerator_startDirection.set(this, void 0);
        __classPrivateFieldSet(this, _TileGenerator_levelMap, levelMap, "f");
        __classPrivateFieldSet(this, _TileGenerator_mapImages, mapImages, "f");
        __classPrivateFieldSet(this, _TileGenerator_OrangeTileClass, OrangeTileClass, "f");
        __classPrivateFieldSet(this, _TileGenerator_PathTileClass, PathTileClass, "f");
        __classPrivateFieldSet(this, _TileGenerator_StartTileClass, StartTileClass, "f");
        __classPrivateFieldSet(this, _TileGenerator_EndTileClass, EndTileClass, "f");
        __classPrivateFieldSet(this, _TileGenerator_towerGenerator, towerGenerator, "f");
        if (__classPrivateFieldGet(this, _TileGenerator_levelMap, "f").rowsMap.length === 0) {
            throw new Error('No rows map found');
        }
        this._setStartImage(mapImages);
        this._setEndImage(mapImages);
        __classPrivateFieldSet(this, _TileGenerator_orangeImage, mapImages[0], "f");
        __classPrivateFieldSet(this, _TileGenerator_blackImage, mapImages[1], "f");
        __classPrivateFieldSet(this, _TileGenerator_startDirection, __classPrivateFieldGet(this, _TileGenerator_levelMap, "f").startDirection, "f");
    }
    _setStartImage(mapImages) {
        switch (__classPrivateFieldGet(this, _TileGenerator_levelMap, "f").startDirection) {
            case ConstDirection.DOWN:
                __classPrivateFieldSet(this, _TileGenerator_startImage, mapImages[6], "f");
                __classPrivateFieldSet(this, _TileGenerator_startDirection, ConstDirection.DOWN, "f");
                break;
            case ConstDirection.RIGHT:
                __classPrivateFieldSet(this, _TileGenerator_startImage, mapImages[7], "f");
                __classPrivateFieldSet(this, _TileGenerator_startDirection, ConstDirection.RIGHT, "f");
                break;
            case ConstDirection.LEFT:
                __classPrivateFieldSet(this, _TileGenerator_startImage, mapImages[8], "f");
                __classPrivateFieldSet(this, _TileGenerator_startDirection, ConstDirection.LEFT, "f");
                break;
            case ConstDirection.UP:
                __classPrivateFieldSet(this, _TileGenerator_startImage, mapImages[9], "f");
                __classPrivateFieldSet(this, _TileGenerator_startDirection, ConstDirection.UP, "f");
                break;
        }
    }
    _setEndImage(mapImages) {
        switch (__classPrivateFieldGet(this, _TileGenerator_levelMap, "f").endDirection) {
            case ConstDirection.DOWN:
                __classPrivateFieldSet(this, _TileGenerator_endImage, mapImages[2], "f");
                break;
            case ConstDirection.RIGHT:
                __classPrivateFieldSet(this, _TileGenerator_endImage, mapImages[4], "f");
                break;
            case ConstDirection.LEFT:
                __classPrivateFieldSet(this, _TileGenerator_endImage, mapImages[3], "f");
                break;
            case ConstDirection.UP:
                __classPrivateFieldSet(this, _TileGenerator_endImage, mapImages[5], "f");
                break;
        }
    }
    _extractTiles(symbol) {
        const resultTiles = [];
        let rowCount = 0;
        __classPrivateFieldGet(this, _TileGenerator_levelMap, "f").rowsMap.forEach((row) => {
            const trimmedRow = row.trim();
            rowCount++;
            for (let column = 0; column < trimmedRow.length; column++) {
                const character = trimmedRow[column];
                const posX = TileGenerator.FLOOR_SIZE * column;
                const posY = TileGenerator.FLOOR_SIZE * rowCount + TileGenerator.MARGIN_TOP;
                if (character === symbol) {
                    switch (symbol) {
                        case '0':
                            resultTiles.push(new (__classPrivateFieldGet(this, _TileGenerator_OrangeTileClass, "f"))(__classPrivateFieldGet(this, _TileGenerator_orangeImage, "f"), { x: posX, y: posY }, __classPrivateFieldGet(this, _TileGenerator_towerGenerator, "f")));
                            break;
                        case '1':
                            resultTiles.push(new (__classPrivateFieldGet(this, _TileGenerator_PathTileClass, "f"))(posX, posY));
                            break;
                        case 'x':
                            resultTiles.push(new (__classPrivateFieldGet(this, _TileGenerator_StartTileClass, "f"))(__classPrivateFieldGet(this, _TileGenerator_startImage, "f"), { x: posX, y: posY }, __classPrivateFieldGet(this, _TileGenerator_startDirection, "f")));
                            break;
                        case 'y':
                            resultTiles.push(new (__classPrivateFieldGet(this, _TileGenerator_EndTileClass, "f"))(__classPrivateFieldGet(this, _TileGenerator_endImage, "f"), { x: posX, y: posY }));
                            break;
                    }
                }
            }
        });
        return resultTiles;
    }
    orangeTiles() {
        return this._extractTiles('0');
    }
    pathTiles() {
        return this._extractTiles('1');
    }
    startTile() {
        return this._extractTiles('x')[0];
    }
    endTile() {
        return this._extractTiles('y')[0];
    }
    getInitialMoney() {
        return Number(__classPrivateFieldGet(this, _TileGenerator_levelMap, "f").money);
    }
}
_TileGenerator_levelMap = new WeakMap(), _TileGenerator_mapImages = new WeakMap(), _TileGenerator_OrangeTileClass = new WeakMap(), _TileGenerator_PathTileClass = new WeakMap(), _TileGenerator_StartTileClass = new WeakMap(), _TileGenerator_EndTileClass = new WeakMap(), _TileGenerator_towerGenerator = new WeakMap(), _TileGenerator_orangeImage = new WeakMap(), _TileGenerator_blackImage = new WeakMap(), _TileGenerator_startImage = new WeakMap(), _TileGenerator_endImage = new WeakMap(), _TileGenerator_startDirection = new WeakMap();
TileGenerator.FLOOR_SIZE = 50;
TileGenerator.MARGIN_TOP = 30;
var _Tower_position, _Tower_upgrading, _Tower_upgradeLevel;
class Tower {
    constructor(position) {
        _Tower_position.set(this, void 0);
        _Tower_upgrading.set(this, false);
        _Tower_upgradeLevel.set(this, 0);
        __classPrivateFieldSet(this, _Tower_position, Object.assign({}, position), "f");
        __classPrivateFieldSet(this, _Tower_upgrading, false, "f");
        __classPrivateFieldSet(this, _Tower_upgradeLevel, 0, "f");
    }
    get notUpgrading() {
        return !__classPrivateFieldGet(this, _Tower_upgrading, "f");
    }
    get position() {
        return __classPrivateFieldGet(this, _Tower_position, "f");
    }
    get upgradeLevel() {
        return __classPrivateFieldGet(this, _Tower_upgradeLevel, "f");
    }
    get maxUpgraded() {
        return __classPrivateFieldGet(this, _Tower_upgradeLevel, "f") === Const.UPGRADE_MAX_LEVEL - 1;
    }
    getCostWhenUpgradeLevelIs(selectedUpgradeLevel) {
        return null;
    }
    get cost() {
        return this.getCostWhenUpgradeLevelIs(this.upgradeLevel);
    }
    get nextLevelUpgradeCost() {
        if (this.maxUpgraded) {
            return this.getCostWhenUpgradeLevelIs(Const.UPGRADE_MAX_LEVEL - 1);
        }
        else {
            return this.getCostWhenUpgradeLevelIs(this.upgradeLevel + 1);
        }
    }
}
_Tower_position = new WeakMap(), _Tower_upgrading = new WeakMap(), _Tower_upgradeLevel = new WeakMap();
var _TowerGenerator_greenTowerImages, _TowerGenerator_redTowerImages, _TowerGenerator_yellowTowerImages, _TowerGenerator_TowerGreenClass, _TowerGenerator_TowerRedClass, _TowerGenerator_TowerYellowClass, _TowerGenerator_MathUtilsClass, _TowerGenerator_ProgressBarClass;
class TowerGenerator {
    constructor(greenTowerImages, redTowerImages, yellowTowerImages, TowerGreenClass, TowerRedClass, TowerYellowClass, MathUtilsClass, ProgressBarClass) {
        _TowerGenerator_greenTowerImages.set(this, void 0);
        _TowerGenerator_redTowerImages.set(this, void 0);
        _TowerGenerator_yellowTowerImages.set(this, void 0);
        _TowerGenerator_TowerGreenClass.set(this, void 0);
        _TowerGenerator_TowerRedClass.set(this, void 0);
        _TowerGenerator_TowerYellowClass.set(this, void 0);
        _TowerGenerator_MathUtilsClass.set(this, void 0);
        _TowerGenerator_ProgressBarClass.set(this, void 0);
        __classPrivateFieldSet(this, _TowerGenerator_greenTowerImages, greenTowerImages, "f");
        __classPrivateFieldSet(this, _TowerGenerator_redTowerImages, redTowerImages, "f");
        __classPrivateFieldSet(this, _TowerGenerator_yellowTowerImages, yellowTowerImages, "f");
        __classPrivateFieldSet(this, _TowerGenerator_TowerGreenClass, TowerGreenClass, "f");
        __classPrivateFieldSet(this, _TowerGenerator_TowerRedClass, TowerRedClass, "f");
        __classPrivateFieldSet(this, _TowerGenerator_TowerYellowClass, TowerYellowClass, "f");
        __classPrivateFieldSet(this, _TowerGenerator_MathUtilsClass, MathUtilsClass, "f");
        __classPrivateFieldSet(this, _TowerGenerator_ProgressBarClass, ProgressBarClass, "f");
    }
    newTower(towerId, position) {
        let tower = null;
        switch (towerId) {
            case TowerGreen.ID:
                tower = new (__classPrivateFieldGet(this, _TowerGenerator_TowerGreenClass, "f"))(__classPrivateFieldGet(this, _TowerGenerator_greenTowerImages, "f"), {
                    x: position.x - Const.TOWER_OFFSET,
                    y: position.y - Const.TOWER_OFFSET,
                }, __classPrivateFieldGet(this, _TowerGenerator_MathUtilsClass, "f"), __classPrivateFieldGet(this, _TowerGenerator_ProgressBarClass, "f"));
                break;
            case TowerRed.ID:
                tower = new (__classPrivateFieldGet(this, _TowerGenerator_TowerRedClass, "f"))(__classPrivateFieldGet(this, _TowerGenerator_redTowerImages, "f"), {
                    x: position.x - Const.TOWER_OFFSET,
                    y: position.y - Const.TOWER_OFFSET,
                }, __classPrivateFieldGet(this, _TowerGenerator_MathUtilsClass, "f"), __classPrivateFieldGet(this, _TowerGenerator_ProgressBarClass, "f"));
                break;
            case TowerYellow.ID:
                tower = new (__classPrivateFieldGet(this, _TowerGenerator_TowerYellowClass, "f"))(__classPrivateFieldGet(this, _TowerGenerator_yellowTowerImages, "f"), { x: position.x, y: position.y }, __classPrivateFieldGet(this, _TowerGenerator_MathUtilsClass, "f"), __classPrivateFieldGet(this, _TowerGenerator_ProgressBarClass, "f"));
                break;
            default:
                break;
        }
        return tower;
    }
}
_TowerGenerator_greenTowerImages = new WeakMap(), _TowerGenerator_redTowerImages = new WeakMap(), _TowerGenerator_yellowTowerImages = new WeakMap(), _TowerGenerator_TowerGreenClass = new WeakMap(), _TowerGenerator_TowerRedClass = new WeakMap(), _TowerGenerator_TowerYellowClass = new WeakMap(), _TowerGenerator_MathUtilsClass = new WeakMap(), _TowerGenerator_ProgressBarClass = new WeakMap();
var _TowerGreen_instances, _TowerGreen_images, _TowerGreen_position, _TowerGreen_MathUtilsClass, _TowerGreen_ProgressBarClass, _TowerGreen_upgradeLevel, _TowerGreen_upgrading, _TowerGreen_enemyTarget, _TowerGreen_distanceToEnemyTarget, _TowerGreen_progressBar, _TowerGreen_upgradeProgress, _TowerGreen_delayUpgradeProgress, _TowerGreen_drawShotToEnemy, _TowerGreen_drawUpgradeBackground;
class TowerGreen extends Tower {
    constructor(images, position, MathUtilsClass, ProgressBarClass) {
        super(position);
        _TowerGreen_instances.add(this);
        _TowerGreen_images.set(this, void 0);
        _TowerGreen_position.set(this, void 0);
        _TowerGreen_MathUtilsClass.set(this, void 0);
        _TowerGreen_ProgressBarClass.set(this, void 0);
        _TowerGreen_upgradeLevel.set(this, 0);
        _TowerGreen_upgrading.set(this, false);
        _TowerGreen_enemyTarget.set(this, null);
        _TowerGreen_distanceToEnemyTarget.set(this, 0);
        _TowerGreen_progressBar.set(this, void 0);
        _TowerGreen_upgradeProgress.set(this, 0);
        _TowerGreen_delayUpgradeProgress.set(this, void 0);
        __classPrivateFieldSet(this, _TowerGreen_images, images, "f");
        __classPrivateFieldSet(this, _TowerGreen_position, Object.assign({}, position), "f");
        __classPrivateFieldSet(this, _TowerGreen_MathUtilsClass, MathUtilsClass, "f");
        __classPrivateFieldSet(this, _TowerGreen_ProgressBarClass, ProgressBarClass, "f");
        __classPrivateFieldSet(this, _TowerGreen_progressBar, new (__classPrivateFieldGet(this, _TowerGreen_ProgressBarClass, "f"))({
            x: __classPrivateFieldGet(this, _TowerGreen_position, "f").x + Const.TOWER_OFFSET,
            y: __classPrivateFieldGet(this, _TowerGreen_position, "f").y + Const.TOWER_OFFSET,
        }, ProgressBar.WIDTH, ProgressBar.HEIGHT), "f");
    }
    upgrade() {
        var _a;
        if (!__classPrivateFieldGet(this, _TowerGreen_upgrading, "f")) {
            __classPrivateFieldSet(this, _TowerGreen_upgrading, true, "f");
            __classPrivateFieldSet(this, _TowerGreen_upgradeLevel, (_a = __classPrivateFieldGet(this, _TowerGreen_upgradeLevel, "f"), _a++, _a), "f");
            __classPrivateFieldSet(this, _TowerGreen_delayUpgradeProgress, Const.DELAY_UPGRADE_MULTIPLIER * __classPrivateFieldGet(this, _TowerGreen_upgradeLevel, "f"), "f");
        }
    }
    draw() {
        var _a, _b;
        if (__classPrivateFieldGet(this, _TowerGreen_upgrading, "f")) {
            __classPrivateFieldGet(this, _TowerGreen_instances, "m", _TowerGreen_drawUpgradeBackground).call(this);
            if (!__classPrivateFieldGet(this, _TowerGreen_progressBar, "f").isFullOfProgress()) {
                if (__classPrivateFieldGet(this, _TowerGreen_delayUpgradeProgress, "f") == 0) {
                    __classPrivateFieldSet(this, _TowerGreen_upgradeProgress, (_a = __classPrivateFieldGet(this, _TowerGreen_upgradeProgress, "f"), _a++, _a), "f");
                    __classPrivateFieldGet(this, _TowerGreen_progressBar, "f").setProgress(__classPrivateFieldGet(this, _TowerGreen_upgradeProgress, "f"));
                    __classPrivateFieldSet(this, _TowerGreen_delayUpgradeProgress, Const.DELAY_UPGRADE_MULTIPLIER * __classPrivateFieldGet(this, _TowerGreen_upgradeLevel, "f"), "f");
                }
                else {
                    __classPrivateFieldSet(this, _TowerGreen_delayUpgradeProgress, (_b = __classPrivateFieldGet(this, _TowerGreen_delayUpgradeProgress, "f"), _b--, _b), "f");
                }
                __classPrivateFieldGet(this, _TowerGreen_progressBar, "f").draw();
            }
            else {
                __classPrivateFieldSet(this, _TowerGreen_upgrading, false, "f");
                __classPrivateFieldSet(this, _TowerGreen_upgradeProgress, 0, "f");
                __classPrivateFieldGet(this, _TowerGreen_progressBar, "f").setProgress(0);
            }
        }
        else {
            if (__classPrivateFieldGet(this, _TowerGreen_enemyTarget, "f")) {
                let r_dx = __classPrivateFieldGet(this, _TowerGreen_enemyTarget, "f").position.x - __classPrivateFieldGet(this, _TowerGreen_position, "f").x;
                let r_dy = __classPrivateFieldGet(this, _TowerGreen_enemyTarget, "f").position.y - __classPrivateFieldGet(this, _TowerGreen_position, "f").y;
                let angle = Math.atan2(r_dy, r_dx) + 1.55;
                let cos_a = cos(angle);
                let sin_a = sin(angle);
                imageMode(CENTER);
                applyMatrix(cos_a, sin_a, -sin_a, cos_a, __classPrivateFieldGet(this, _TowerGreen_position, "f").x + 30, __classPrivateFieldGet(this, _TowerGreen_position, "f").y + 30);
                __classPrivateFieldGet(this, _TowerGreen_instances, "m", _TowerGreen_drawShotToEnemy).call(this);
                __classPrivateFieldGet(this, _TowerGreen_enemyTarget, "f").addDamage(TowerGreen.DAMAGE_UPGRADE[__classPrivateFieldGet(this, _TowerGreen_upgradeLevel, "f")]);
                image(__classPrivateFieldGet(this, _TowerGreen_images, "f")[__classPrivateFieldGet(this, _TowerGreen_upgradeLevel, "f")], 0, 0);
                resetMatrix();
                imageMode(CORNER);
            }
            else {
                image(__classPrivateFieldGet(this, _TowerGreen_images, "f")[__classPrivateFieldGet(this, _TowerGreen_upgradeLevel, "f")], __classPrivateFieldGet(this, _TowerGreen_position, "f").x, __classPrivateFieldGet(this, _TowerGreen_position, "f").y);
            }
        }
    }
    get influenceArea() {
        return TowerGreen.UPGRADE_INFLUENCE_AREA[__classPrivateFieldGet(this, _TowerGreen_upgradeLevel, "f")];
    }
    getCostWhenUpgradeLevelIs(selectedUpgradeLevel) {
        if (selectedUpgradeLevel > Const.UPGRADE_MAX_LEVEL) {
            return TowerGreen.COST_UPGRADE[Const.UPGRADE_MAX_LEVEL];
        }
        return TowerGreen.COST_UPGRADE[selectedUpgradeLevel];
    }
    get sellProfit() {
        return TowerGreen.PROFIT_SELL_UPGRADE[this.upgradeLevel];
    }
    get type() {
        return TowerGreen.ID;
    }
    _isDistanceIntoInfluenceArea(distance) {
        return (distance <= TowerGreen.UPGRADE_INFLUENCE_AREA[__classPrivateFieldGet(this, _TowerGreen_upgradeLevel, "f")] / 1.65);
    }
    selectTarget(enemies) {
        let minDistance = 99999;
        let enemyTarget = null;
        enemies.forEach((enemy) => {
            const distance = __classPrivateFieldGet(this, _TowerGreen_MathUtilsClass, "f").distance({ x: __classPrivateFieldGet(this, _TowerGreen_position, "f").x, y: __classPrivateFieldGet(this, _TowerGreen_position, "f").y }, {
                x: enemy.position.x,
                y: enemy.position.y,
            });
            if (distance < minDistance) {
                minDistance = distance;
                enemyTarget = enemy;
            }
        });
        if (this._isDistanceIntoInfluenceArea(minDistance)) {
            __classPrivateFieldSet(this, _TowerGreen_enemyTarget, enemyTarget, "f");
            __classPrivateFieldSet(this, _TowerGreen_distanceToEnemyTarget, minDistance, "f");
        }
        else {
            __classPrivateFieldSet(this, _TowerGreen_enemyTarget, null, "f");
            __classPrivateFieldSet(this, _TowerGreen_distanceToEnemyTarget, 0, "f");
        }
    }
}
_TowerGreen_images = new WeakMap(), _TowerGreen_position = new WeakMap(), _TowerGreen_MathUtilsClass = new WeakMap(), _TowerGreen_ProgressBarClass = new WeakMap(), _TowerGreen_upgradeLevel = new WeakMap(), _TowerGreen_upgrading = new WeakMap(), _TowerGreen_enemyTarget = new WeakMap(), _TowerGreen_distanceToEnemyTarget = new WeakMap(), _TowerGreen_progressBar = new WeakMap(), _TowerGreen_upgradeProgress = new WeakMap(), _TowerGreen_delayUpgradeProgress = new WeakMap(), _TowerGreen_instances = new WeakSet(), _TowerGreen_drawShotToEnemy = function _TowerGreen_drawShotToEnemy() {
    strokeWeight(3);
    stroke(ConstColor.RED);
    line(-1, -18, 7 - __classPrivateFieldGet(this, _TowerGreen_distanceToEnemyTarget, "f") / 7, -__classPrivateFieldGet(this, _TowerGreen_distanceToEnemyTarget, "f"));
}, _TowerGreen_drawUpgradeBackground = function _TowerGreen_drawUpgradeBackground() {
    strokeWeight(1);
    stroke('black');
    fill(ConstColor.GREEN);
    rect(__classPrivateFieldGet(this, _TowerGreen_position, "f").x + 4, __classPrivateFieldGet(this, _TowerGreen_position, "f").y + 4, Const.TILE_SIZE, Const.TILE_SIZE);
};
TowerGreen.ID = 1;
TowerGreen.PROFIT_SELL_UPGRADE = [30, 35, 65, 220, 900, 1880];
TowerGreen.DAMAGE_UPGRADE = [1, 2, 4, 6, 12, 24];
TowerGreen.COST_UPGRADE = [50, 75, 125, 300, 1000, 2000];
TowerGreen.UPGRADE_INFLUENCE_AREA = [150, 180, 220, 300, 400, 550];
TowerGreen.INFLUENCE_AREA = 150;
var _TowerRed_images, _TowerRed_position, _TowerRed_MathUtilsClass, _TowerRed_ProgressBarClass, _TowerRed_upgradeLevel, _TowerRed_upgrading, _TowerRed_progressBar, _TowerRed_upgradeProgress;
class TowerRed extends Tower {
    constructor(images, position, MathUtilsClass, ProgressBarClass) {
        super(position);
        _TowerRed_images.set(this, void 0);
        _TowerRed_position.set(this, void 0);
        _TowerRed_MathUtilsClass.set(this, void 0);
        _TowerRed_ProgressBarClass.set(this, void 0);
        _TowerRed_upgradeLevel.set(this, 0);
        _TowerRed_upgrading.set(this, false);
        _TowerRed_progressBar.set(this, void 0);
        _TowerRed_upgradeProgress.set(this, 0);
        __classPrivateFieldSet(this, _TowerRed_images, images, "f");
        __classPrivateFieldSet(this, _TowerRed_position, Object.assign({}, position), "f");
        __classPrivateFieldSet(this, _TowerRed_MathUtilsClass, MathUtilsClass, "f");
        __classPrivateFieldSet(this, _TowerRed_ProgressBarClass, ProgressBarClass, "f");
        __classPrivateFieldSet(this, _TowerRed_progressBar, new (__classPrivateFieldGet(this, _TowerRed_ProgressBarClass, "f"))(__classPrivateFieldGet(this, _TowerRed_position, "f"), ProgressBar.WIDTH, ProgressBar.HEIGHT), "f");
    }
    upgrade() {
        var _a;
        if (!__classPrivateFieldGet(this, _TowerRed_upgrading, "f")) {
            __classPrivateFieldSet(this, _TowerRed_upgrading, true, "f");
            __classPrivateFieldSet(this, _TowerRed_upgradeLevel, (_a = __classPrivateFieldGet(this, _TowerRed_upgradeLevel, "f"), _a++, _a), "f");
        }
    }
    _drawUpgradeBackground() {
        strokeWeight(1);
        stroke('black');
        fill(ConstColor.RED);
        rect(__classPrivateFieldGet(this, _TowerRed_position, "f").x + 4, __classPrivateFieldGet(this, _TowerRed_position, "f").y + 4, Const.TILE_SIZE, Const.TILE_SIZE);
    }
    draw() {
        var _a;
        if (__classPrivateFieldGet(this, _TowerRed_upgrading, "f")) {
            this._drawUpgradeBackground();
            if (!__classPrivateFieldGet(this, _TowerRed_progressBar, "f").isFullOfProgress()) {
                __classPrivateFieldSet(this, _TowerRed_upgradeProgress, (_a = __classPrivateFieldGet(this, _TowerRed_upgradeProgress, "f"), _a++, _a), "f");
                __classPrivateFieldGet(this, _TowerRed_progressBar, "f").setProgress(__classPrivateFieldGet(this, _TowerRed_upgradeProgress, "f"));
                __classPrivateFieldGet(this, _TowerRed_progressBar, "f").draw();
            }
            else {
                __classPrivateFieldSet(this, _TowerRed_upgrading, false, "f");
                __classPrivateFieldSet(this, _TowerRed_upgradeProgress, 0, "f");
                __classPrivateFieldGet(this, _TowerRed_progressBar, "f").setProgress(0);
            }
        }
        else {
            image(__classPrivateFieldGet(this, _TowerRed_images, "f")[__classPrivateFieldGet(this, _TowerRed_upgradeLevel, "f")], __classPrivateFieldGet(this, _TowerRed_position, "f").x, __classPrivateFieldGet(this, _TowerRed_position, "f").y);
        }
    }
    get influenceArea() {
        return TowerRed.UPGRADE_INFLUENCE_AREA[__classPrivateFieldGet(this, _TowerRed_upgradeLevel, "f")];
    }
    getCostWhenUpgradeLevelIs(selectedUpgradeLevel) {
        if (selectedUpgradeLevel > Const.UPGRADE_MAX_LEVEL) {
            return TowerRed.COST_UPGRADE[Const.UPGRADE_MAX_LEVEL];
        }
        return TowerRed.COST_UPGRADE[selectedUpgradeLevel];
    }
    get sellProfit() {
        return TowerRed.PROFIT_SELL_UPGRADE[this.upgradeLevel];
    }
    get type() {
        return TowerRed.ID;
    }
    selectTarget(enemies) {
    }
}
_TowerRed_images = new WeakMap(), _TowerRed_position = new WeakMap(), _TowerRed_MathUtilsClass = new WeakMap(), _TowerRed_ProgressBarClass = new WeakMap(), _TowerRed_upgradeLevel = new WeakMap(), _TowerRed_upgrading = new WeakMap(), _TowerRed_progressBar = new WeakMap(), _TowerRed_upgradeProgress = new WeakMap();
TowerRed.ID = 2;
TowerRed.PROFIT_SELL_UPGRADE = [80, 110, 190, 420, 1200, 2880];
TowerRed.COST_UPGRADE = [100, 150, 250, 500, 1300, 3000];
TowerRed.UPGRADE_INFLUENCE_AREA = [150, 180, 220, 300, 400, 550];
TowerRed.INFLUENCE_AREA = 240;
var _TowerYellow_images, _TowerYellow_position, _TowerYellow_MathUtilsClass, _TowerYellow_ProgressBarClass, _TowerYellow_upgradeLevel, _TowerYellow_upgrading, _TowerYellow_progressBar, _TowerYellow_upgradeProgress;
class TowerYellow extends Tower {
    constructor(images, position, MathUtilsClass, ProgressBarClass) {
        super(position);
        _TowerYellow_images.set(this, void 0);
        _TowerYellow_position.set(this, void 0);
        _TowerYellow_MathUtilsClass.set(this, void 0);
        _TowerYellow_ProgressBarClass.set(this, void 0);
        _TowerYellow_upgradeLevel.set(this, 0);
        _TowerYellow_upgrading.set(this, false);
        _TowerYellow_progressBar.set(this, void 0);
        _TowerYellow_upgradeProgress.set(this, 0);
        __classPrivateFieldSet(this, _TowerYellow_images, images, "f");
        __classPrivateFieldSet(this, _TowerYellow_position, Object.assign({}, position), "f");
        __classPrivateFieldSet(this, _TowerYellow_MathUtilsClass, MathUtilsClass, "f");
        __classPrivateFieldSet(this, _TowerYellow_ProgressBarClass, ProgressBarClass, "f");
        __classPrivateFieldSet(this, _TowerYellow_progressBar, new (__classPrivateFieldGet(this, _TowerYellow_ProgressBarClass, "f"))(__classPrivateFieldGet(this, _TowerYellow_position, "f"), 27, 7), "f");
    }
    upgrade() {
        var _a;
        if (!__classPrivateFieldGet(this, _TowerYellow_upgrading, "f")) {
            __classPrivateFieldSet(this, _TowerYellow_upgrading, true, "f");
            __classPrivateFieldSet(this, _TowerYellow_upgradeLevel, (_a = __classPrivateFieldGet(this, _TowerYellow_upgradeLevel, "f"), _a++, _a), "f");
        }
    }
    _drawUpgradeBackground() {
        strokeWeight(1);
        stroke('black');
        fill(ConstColor.YELLOW);
        rect(__classPrivateFieldGet(this, _TowerYellow_position, "f").x, __classPrivateFieldGet(this, _TowerYellow_position, "f").y, Const.TILE_SIZE, Const.TILE_SIZE);
    }
    draw() {
        var _a;
        if (__classPrivateFieldGet(this, _TowerYellow_upgrading, "f")) {
            this._drawUpgradeBackground();
            if (!__classPrivateFieldGet(this, _TowerYellow_progressBar, "f").isFullOfProgress()) {
                __classPrivateFieldSet(this, _TowerYellow_upgradeProgress, (_a = __classPrivateFieldGet(this, _TowerYellow_upgradeProgress, "f"), _a++, _a), "f");
                __classPrivateFieldGet(this, _TowerYellow_progressBar, "f").setProgress(__classPrivateFieldGet(this, _TowerYellow_upgradeProgress, "f"));
                __classPrivateFieldGet(this, _TowerYellow_progressBar, "f").draw();
            }
            else {
                __classPrivateFieldSet(this, _TowerYellow_upgrading, false, "f");
                __classPrivateFieldSet(this, _TowerYellow_upgradeProgress, 0, "f");
                __classPrivateFieldGet(this, _TowerYellow_progressBar, "f").setProgress(0);
            }
        }
        else {
            image(__classPrivateFieldGet(this, _TowerYellow_images, "f")[__classPrivateFieldGet(this, _TowerYellow_upgradeLevel, "f")], __classPrivateFieldGet(this, _TowerYellow_position, "f").x, __classPrivateFieldGet(this, _TowerYellow_position, "f").y);
        }
    }
    get influenceArea() {
        return TowerYellow.UPGRADE_INFLUENCE_AREA[__classPrivateFieldGet(this, _TowerYellow_upgradeLevel, "f")];
    }
    getCostWhenUpgradeLevelIs(selectedUpgradeLevel) {
        if (selectedUpgradeLevel > Const.UPGRADE_MAX_LEVEL) {
            return TowerYellow.COST_UPGRADE[Const.UPGRADE_MAX_LEVEL];
        }
        return TowerYellow.COST_UPGRADE[selectedUpgradeLevel];
    }
    get sellProfit() {
        return TowerYellow.PROFIT_SELL_UPGRADE[this.upgradeLevel];
    }
    get type() {
        return TowerYellow.ID;
    }
    selectTarget(enemies) {
    }
}
_TowerYellow_images = new WeakMap(), _TowerYellow_position = new WeakMap(), _TowerYellow_MathUtilsClass = new WeakMap(), _TowerYellow_ProgressBarClass = new WeakMap(), _TowerYellow_upgradeLevel = new WeakMap(), _TowerYellow_upgrading = new WeakMap(), _TowerYellow_progressBar = new WeakMap(), _TowerYellow_upgradeProgress = new WeakMap();
TowerYellow.ID = 3;
TowerYellow.PROFIT_SELL_UPGRADE = [680, 2460, 7440, 21920, 66900, 199880];
TowerYellow.COST_UPGRADE = [700, 2500, 7500, 22000, 67000, 200000];
TowerYellow.UPGRADE_INFLUENCE_AREA = [150, 180, 220, 300, 400, 550];
TowerYellow.INFLUENCE_AREA = 290;
var _Wallet_money;
class Wallet {
    constructor(money) {
        _Wallet_money.set(this, void 0);
        __classPrivateFieldSet(this, _Wallet_money, money, "f");
    }
    get money() {
        return __classPrivateFieldGet(this, _Wallet_money, "f");
    }
    increase(quantity) {
        __classPrivateFieldSet(this, _Wallet_money, __classPrivateFieldGet(this, _Wallet_money, "f") + quantity, "f");
    }
    decrease(quantity) {
        __classPrivateFieldSet(this, _Wallet_money, __classPrivateFieldGet(this, _Wallet_money, "f") - quantity, "f");
    }
    haveMoneyToBuy(towerId, upgradeLevel) {
        let canBuy = false;
        switch (towerId) {
            case TowerGreen.ID:
                canBuy = TowerGreen.COST_UPGRADE[upgradeLevel] <= __classPrivateFieldGet(this, _Wallet_money, "f");
                break;
            case TowerRed.ID:
                canBuy = TowerRed.COST_UPGRADE[upgradeLevel] <= __classPrivateFieldGet(this, _Wallet_money, "f");
                break;
            case TowerYellow.ID:
                canBuy = TowerYellow.COST_UPGRADE[upgradeLevel] <= __classPrivateFieldGet(this, _Wallet_money, "f");
                break;
            default:
                break;
        }
        return canBuy;
    }
}
_Wallet_money = new WeakMap();
let orders;
let createEnemyTime;
let enemies;
let hud;
let wallet;
let score;
let orangeTiles;
let mouseOrangeTileOver;
let wave;
let waveEnemies;
let tileImages;
let greenTowerImages;
let redTowerImages;
let yellowTowerImages;
let startTile;
let endTile;
let hudImages;
let hudIconImages;
let backgroundImage;
let enemiesImages;
let towerGenerator;
let influenceArea;
let explosionsEnemy;
let explosionsMagicFireball;
let explosionsMagicIceball;
let lives;
let gameStatus;
let waveProgressBar;
let waveProgressDelay;
let bossProgressBar;
let bossProgressDelay;
let initialEnemiesPosition;
let allowCreateEnemies;
let levelDataProvider;
let magicFireballImage;
let magicFireballs;
let magicFireballsCount;
let magicIceballImage;
let magicIceballs;
let magicIceballsCount;
let magicUFOImage;
let magicUFOs;
let magicUFOsCount;
function preload() {
    greenTowerImages = Resources.greenTower();
    redTowerImages = Resources.redTower();
    yellowTowerImages = Resources.yellowTower();
    enemiesImages = Resources.enemies();
    tileImages = Resources.tileImages();
    hudImages = Resources.hudImages();
    hudIconImages = Resources.hudIconImages();
    backgroundImage = Resources.backgroundImage();
    magicFireballImage = Resources.magicFireball();
    magicIceballImage = Resources.magicIceball();
    magicUFOImage = Resources.magicUFO();
}
function disableContextualMenu() {
    for (let element of document.getElementsByClassName('p5Canvas')) {
        element.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            mouseClicked();
        });
    }
}
function setup() {
    disableContextualMenu();
    createCanvas(Const.CANVAS_WIDTH, Const.CANVAS_HEIGHT);
    levelDataProvider = new LevelsDataProvider(LevelsData.data);
    const levelMap = levelDataProvider.getLevel(1);
    createEnemyTime = 0;
    towerGenerator = new TowerGenerator(greenTowerImages, redTowerImages, yellowTowerImages, TowerGreen, TowerRed, TowerYellow, MathUtils, ProgressBar);
    const tileGenerator = new TileGenerator(levelMap, tileImages, OrangeTile, PathTile, StartTile, EndTile, towerGenerator);
    orangeTiles = tileGenerator.orangeTiles();
    startTile = tileGenerator.startTile();
    endTile = tileGenerator.endTile();
    const pathTiles = tileGenerator.pathTiles();
    const path = new Path(startTile, endTile, pathTiles);
    orders = path.makeOrders();
    initialEnemiesPosition = path.getEnemiesInitialPosition();
    wallet = new Wallet(tileGenerator.getInitialMoney());
    score = new Score();
    lives = 7;
    wave = 1;
    allowCreateEnemies = true;
    waveEnemies = 0;
    enemies = [];
    waveProgressBar = new ProgressBar({ x: 335, y: -19 }, 150, 16);
    bossProgressBar = new ProgressBar({ x: 335, y: -2 }, 150, 10);
    hud = new Hud(hudImages, hudIconImages, wallet, lives, score, TextProperties, waveProgressBar, bossProgressBar, wave);
    waveProgressDelay = Const.WAVE_PROGRESS_DELAY;
    bossProgressDelay = Const.BOSS_PROGRESS_DELAY;
    explosionsEnemy = [];
    explosionsMagicFireball = [];
    explosionsMagicIceball = [];
    magicFireballs = [];
    magicFireballsCount = MagicFireball.FIREBALLS;
    magicIceballs = [];
    magicIceballsCount = MagicIceball.ICEBALLS;
    magicUFOs = [];
    magicUFOsCount = MagicUFO.UFOS;
    influenceArea = new InfluenceArea();
    gameStatus = Const.GAME_STATUS_PLAYING;
}
function keyPressed() {
    switch (keyCode) {
        case Const.KEY_1:
            hud.selectTower(TowerGreen.ID);
            break;
        case Const.KEY_2:
            hud.selectTower(TowerRed.ID);
            break;
        case Const.KEY_3:
            hud.selectTower(TowerYellow.ID);
            break;
    }
}
function canUpgradeTower(tower) {
    let canUpgrade = false;
    if (tower.upgradeLevel < Const.UPGRADE_MAX_LEVEL) {
        if (wallet.haveMoneyToBuy(tower.type, tower.upgradeLevel + 1)) {
            canUpgrade = true;
        }
    }
    return canUpgrade;
}
function canBuyNewTower(hudSelectedTower) {
    let canBuy = false;
    const zeroUpgradeLevel = 0;
    if (wallet.haveMoneyToBuy(hudSelectedTower, zeroUpgradeLevel)) {
        canBuy = true;
    }
    return canBuy;
}
function canBuyTower(tower) {
    let result = false;
    if (tower) {
        result = canUpgradeTower(tower);
    }
    else {
        result = canBuyNewTower(hud.getSelectedTower());
    }
    return result;
}
function handleHudButtons() {
    if (hud.isInsideTowerGreenButton(mouseX, mouseY)) {
        hud.selectTower(TowerGreen.ID);
    }
    if (hud.isInsideTowerRedButton(mouseX, mouseY)) {
        hud.selectTower(TowerRed.ID);
    }
    if (hud.isInsideTowerYellowButton(mouseX, mouseY)) {
        hud.selectTower(TowerYellow.ID);
    }
    if (hud.isInsideMagicFireball(mouseX, mouseY)) {
        createNewMagicFireball();
    }
    if (hud.isInsideMagicIceball(mouseX, mouseY)) {
        createNewMagicIceball();
    }
    if (hud.isInsideMagicUFO(mouseX, mouseY)) {
        createNewMagicUFO();
    }
}
function handleSellTower() {
    const profit = mouseOrangeTileOver.sellTower();
    wallet.increase(profit);
}
function handleBuyTower() {
    if (canBuyTower(mouseOrangeTileOver.getTower())) {
        const cost = mouseOrangeTileOver.buyTower(hud.getSelectedTower());
        wallet.decrease(cost);
    }
}
function mouseClicked() {
    if (hud.isInsideButtonsBar(mouseX, mouseY)) {
        handleHudButtons();
        return;
    }
    if (mouseOrangeTileOver !== null) {
        if (mouseButton === RIGHT && mouseOrangeTileOver.hasTower()) {
            if (mouseOrangeTileOver.getTower().notUpgrading) {
                handleSellTower();
            }
        }
        if (mouseButton === LEFT) {
            handleBuyTower();
        }
    }
}
function createNewEnemy(waveEnemy, wave) {
    const endurance = wave * 3 + waveEnemy * 2;
    const isBoss = false;
    enemies.push(new Enemy(enemiesImages.slice(...MathUtils.getTwoNumbersFourTimes(waveEnemy)), initialEnemiesPosition, orders, endurance, isBoss, Random, ProgressBar));
}
function createNewMagicFireball() {
    if (magicFireballsCount > 0) {
        magicFireballs.push(new MagicFireball(magicFireballImage, initialEnemiesPosition.x, initialEnemiesPosition.y, orders));
        magicFireballsCount--;
        hud.setMagicFireballs(magicFireballsCount);
    }
}
function createNewMagicIceball() {
    if (magicIceballsCount > 0) {
        magicIceballs.push(new MagicIceball(magicIceballImage, initialEnemiesPosition.x, initialEnemiesPosition.y, orders));
        magicIceballsCount--;
        hud.setMagicIceballs(magicIceballsCount);
    }
}
function createNewMagicUFO() {
    if (magicUFOsCount > 0) {
        magicUFOs.push(new MagicUFO(magicUFOImage, initialEnemiesPosition.x, initialEnemiesPosition.y, orders));
        magicUFOsCount--;
        hud.setMagicUFOs(magicUFOsCount);
    }
}
function createNewBoss(wave) {
    const endurance = wave * 25;
    const indexBossInEnemiesImages = 5;
    const isBoss = true;
    enemies.push(new Enemy(enemiesImages.slice(...MathUtils.getTwoNumbersFourTimes(indexBossInEnemiesImages)), initialEnemiesPosition, orders, endurance, isBoss, Random, ProgressBar));
}
function handleExplosionEnemys() {
    const deadEnemies = enemies.filter((enemy) => enemy.dead);
    deadEnemies.forEach((enemy) => {
        explosionsEnemy.push(new ExplosionEnemy(enemy.position.x, enemy.position.y, ParticleSystem));
        const $increasedMoney = enemy.endurance * Const.MONEY_MULTIPLICATOR;
        wallet.increase($increasedMoney);
        score.increase($increasedMoney * 2);
    });
}
function handleNewEnemyCreation() {
    if (allowCreateEnemies) {
        if (waveEnemies < Enemy.TOTAL_ENEMIES) {
            createEnemyTime++;
            if (createEnemyTime === Enemy.CREATION_MAX_TIME) {
                createEnemyTime = 0;
                createNewEnemy(waveEnemies, wave);
                waveEnemies++;
            }
        }
        else {
            allowCreateEnemies = false;
            waveEnemies = 0;
        }
    }
}
function removeDeadEnemies() {
    enemies = enemies.filter((enemy) => enemy.alive);
}
function handleWinnerEnemies() {
    const winnerEnemies = enemies.filter((enemy) => enemy.winner);
    winnerEnemies.forEach((enemy) => {
        lives--;
        if (lives <= 0) {
            gameStatus = Const.GAME_STATUS_GAME_OVER;
        }
        hud.setLives(lives);
        enemy.resetWinner();
    });
}
function updateEnemies() {
    handleNewEnemyCreation();
    handleExplosionEnemys();
    removeDeadEnemies();
    enemies.forEach((enemy) => {
        enemy.update();
    });
    handleWinnerEnemies();
}
function updateMouseOrangeTileOver() {
    mouseOrangeTileOver = getMouseOrangeTileOver();
}
function getMouseOrangeTileOver() {
    const result = orangeTiles.find((orangeTile) => orangeTile.isInside(mouseX, mouseY));
    return result ? result : null;
}
function updateWaveProgressBar() {
    if (waveProgressDelay > 0) {
        waveProgressDelay--;
    }
    else {
        waveProgressDelay = Const.WAVE_PROGRESS_DELAY;
        waveProgressBar.increaseProgress();
        if (waveProgressBar.isFullOfProgress()) {
            waveProgressBar.setProgress(0);
            wave++;
            hud.setWave(wave);
            allowCreateEnemies = true;
        }
        hud.setWaveProgressBar(waveProgressBar);
    }
}
function updateBossProgressBar() {
    if (bossProgressDelay > 0) {
        bossProgressDelay--;
    }
    else {
        bossProgressDelay = Const.BOSS_PROGRESS_DELAY;
        bossProgressBar.increaseProgress();
        if (bossProgressBar.isFullOfProgress()) {
            bossProgressBar.setProgress(0);
            createNewBoss(wave);
        }
        hud.setBossProgressBar(bossProgressBar);
    }
}
function updateMagicFireballs() {
    magicFireballs.forEach((magicFireball) => {
        magicFireball.update();
        checkMagicFireballCollides(magicFireball, enemies);
    });
    removeDeadFireballs();
}
function checkMagicFireballCollides(magicFireball, enemies) {
    enemies.forEach((enemy) => {
        if (magicFireball.checkCollision(enemy)) {
            handleMagicFireballCollision(magicFireball, enemy);
        }
    });
}
function handleMagicFireballCollision(magicFireball, enemy) {
    magicFireball.addDamage(enemy);
    magicFireball.setToIgnoreList(enemy);
    newMagicFireballExplosion(enemy.position.x, enemy.position.y);
}
function newMagicFireballExplosion(posX, posY) {
    explosionsMagicFireball.push(new ExplosionMagicFireball(posX, posY, ParticleSystem));
}
function removeDeadFireballs() {
    magicFireballs = magicFireballs.filter((fireball) => fireball.isAlive());
}
function drawMagicFireballs() {
    magicFireballs.forEach((fireball) => {
        fireball.draw();
    });
}
function updateMagicIceballs() {
    magicIceballs.forEach((iceball) => {
        iceball.update();
        checkMagicIceballCollides(iceball, enemies);
    });
    removeDeadIceballs();
}
function checkMagicIceballCollides(magicIceball, enemies) {
    enemies.forEach((enemy) => {
        if (magicIceball.checkCollision(enemy)) {
            handleMagicIceballCollision(magicIceball, enemy);
        }
    });
}
function handleMagicIceballCollision(magicIceball, enemy) {
    magicIceball.freeze(enemy);
    magicIceball.setToIgnoreList(enemy);
    newMagicIceballExplosion(enemy.position.x, enemy.position.y);
}
function newMagicIceballExplosion(posX, posY) {
    explosionsMagicIceball.push(new ExplosionMagicIceball(posX, posY, ParticleSystem));
}
function removeDeadIceballs() {
    magicIceballs = magicIceballs.filter((iceball) => iceball.isAlive());
}
function drawMagicIceballs() {
    magicIceballs.forEach((iceball) => {
        iceball.draw();
    });
}
function updateMagicUFOs() {
    magicUFOs.forEach((ufo) => {
        ufo.update();
    });
}
function drawMagicUFOs() {
    magicUFOs.forEach((ufo) => {
        ufo.draw();
    });
}
function removeDeadExplosions() {
    explosionsEnemy = explosionsEnemy.filter((e) => e.isActive());
    explosionsMagicFireball = explosionsMagicFireball.filter((e) => e.isActive());
    explosionsMagicIceball = explosionsMagicIceball.filter((e) => e.isActive());
}
function updateExplosions() {
    explosionsEnemy.forEach((e) => {
        e.update();
    });
    explosionsMagicFireball.forEach((e) => {
        e.update();
    });
    explosionsMagicIceball.forEach((e) => {
        e.update();
    });
}
function draw() {
    if (gameStatus === Const.GAME_STATUS_PLAYING) {
        updateEnemies();
        updateMouseOrangeTileOver();
        updateWaveProgressBar();
        updateBossProgressBar();
        updateMagicFireballs();
        updateMagicIceballs();
        updateMagicUFOs();
    }
    background('skyblue');
    rectMode(CORNER);
    image(backgroundImage, 0, Hud.HEIGHT);
    startTile.draw();
    endTile.draw();
    orangeTiles.forEach((orangeTile) => {
        orangeTile.selectTarget(enemies);
        orangeTile.drawTile();
    });
    orangeTiles.forEach((orangeTile) => {
        orangeTile.drawTower();
    });
    hud.draw();
    const canBuySelectedTower = canBuyNewTower(hud.getSelectedTower());
    const canBuyTowerGreen = canBuyNewTower(TowerGreen.ID);
    const canBuyTowerRed = canBuyNewTower(TowerRed.ID);
    const canBuyTowerYellow = canBuyNewTower(TowerYellow.ID);
    if (mouseOrangeTileOver !== null) {
        if (mouseOrangeTileOver.hasTower()) {
            const tileTower = mouseOrangeTileOver.getTower();
            hud.selectTowerHudType(tileTower);
            if (!tileTower.maxUpgraded) {
                const canUpgrade = wallet.haveMoneyToBuy(tileTower.type, tileTower.upgradeLevel + 1);
                hud.viewUpgradeCost(tileTower, canUpgrade);
                influenceArea.drawTowerInfluenceArea(tileTower, canUpgrade);
            }
            hud.viewSellProfit(tileTower);
        }
        else {
            influenceArea.drawHudTowerInfluenceArea(hud.getSelectedTower(), mouseOrangeTileOver.getPosition(), canBuySelectedTower);
            hud.setType(Hud.NORMAL);
            hud.setCanBuy(canBuyTowerGreen, canBuyTowerRed, canBuyTowerYellow);
            hud.hideUpgradeCost();
            hud.hideSellProfit();
        }
    }
    else {
        hud.setType(Hud.NORMAL);
        hud.setCanBuy(canBuyTowerGreen, canBuyTowerRed, canBuyTowerYellow);
        hud.hideUpgradeCost();
        hud.hideSellProfit();
    }
    enemies.forEach((enemy) => {
        enemy.draw();
    });
    drawMagicFireballs();
    drawMagicIceballs();
    drawMagicUFOs();
    removeDeadExplosions();
    updateExplosions();
    if (gameStatus === Const.GAME_STATUS_GAME_OVER) {
        TextProperties.setForBigCenteredTitle();
        text('Game over', width / 2, height / 2);
    }
    Debug.showMouseCoordinates({ x: mouseX, y: mouseY });
}
//# sourceMappingURL=dist.js.map