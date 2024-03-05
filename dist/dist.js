var Const = (function () {
    function Const() {
    }
    Const.HUD_NORMAL = 0;
    Const.HUD_UPGRADING = 1;
    Const.HUD_UPGRADING_MAX = 2;
    Const.HUD_ICON_GREEN_TOWER_ON = 0;
    Const.HUD_ICON_GREEN_TOWER_OFF = 1;
    Const.HUD_ICON_RED_TOWER_ON = 2;
    Const.HUD_ICON_RED_TOWER_OFF = 3;
    Const.HUD_ICON_YELLOW_TOWER_ON = 4;
    Const.HUD_ICON_YELLOW_TOWER_OFF = 5;
    Const.GREEN_TOWER = 1;
    Const.RED_TOWER = 2;
    Const.YELLOW_TOWER = 3;
    Const.GREEN_COLOR = [75, 185, 35];
    Const.RED_COLOR = [185, 35, 35];
    Const.YELLOW_COLOR = [202, 191, 24];
    Const.GRAY_COLOR = [50, 50, 50];
    Const.DAMAGE_UPGRADE_GREEN_TOWER = [1, 2, 4, 6, 12, 24];
    Const.PROFIT_SELL_UPGRADE_GREEN_TOWER = [30, 35, 65, 220, 900, 1880];
    Const.PROFIT_SELL_UPGRADE_RED_TOWER = [80, 110, 190, 420, 1200, 2880];
    Const.PROFIT_SELL_UPGRADE_YELLOW_TOWER = [
        680, 2460, 7440, 21920, 66900, 199880,
    ];
    Const.COST_UPGRADE_GREEN_TOWER = [50, 75, 125, 300, 1000, 2000];
    Const.COST_UPGRADE_RED_TOWER = [100, 150, 250, 500, 1300, 3000];
    Const.COST_UPGRADE_YELLOW_TOWER = [700, 2500, 7500, 22000, 67000, 200000];
    Const.GREEN_TOWER_UPGRADE_INFLUENCE_AREA = [150, 180, 220, 300, 400, 550];
    Const.RED_TOWER_UPGRADE_INFLUENCE_AREA = [150, 180, 220, 300, 400, 550];
    Const.YELLOW_TOWER_UPGRADE_INFLUENCE_AREA = [150, 180, 220, 300, 400, 550];
    Const.LEFT_DIRECTION = 1;
    Const.RIGHT_DIRECTION = 2;
    Const.UP_DIRECTION = 3;
    Const.DOWN_DIRECTION = 4;
    Const.TILE_SIZE = 50;
    Const.UPGRADE_MAX_LEVEL = 5;
    Const.TOTAL_ENEMIES = 5;
    Const.CANVAS_WIDTH = 800;
    Const.CANVAS_HEIGHT = 580;
    Const.HUD_HEIGHT = 84;
    Const.KEY_1 = 49;
    Const.KEY_2 = 50;
    Const.KEY_3 = 51;
    Const.CREATE_ENEMY_MAX_TIME = 200;
    Const.TOWER_OFFSET = 5;
    Const.GREEN_TOWER_INFLUENCE_AREA = 150;
    Const.RED_TOWER_INFLUENCE_AREA = 240;
    Const.YELLOW_TOWER_INFLUENCE_AREA = 290;
    Const.ALPHA_INFLUENCE_AREA_FILL = 50;
    Const.ALPHA_INFLUENCE_AREA_STROKE = 120;
    Const.ENEMY_VELOCITY = 1;
    Const.BOSS_VELOCITY = 0.5;
    Const.ENEMY_CHANGE_EYES_MAX_TIME = 50;
    Const.ENEMY_EXTEND_CLOSED_EYES_MAX_TIME = 20;
    Const.ENEMY_MIN_TIME_TO_CLOSE = 50;
    Const.ENEMY_MAX_TIME_TO_CLOSE = 200;
    Const.ENEMY_EYES_CENTER = 0;
    Const.ENEMY_EYES_LEFT = 1;
    Const.ENEMY_EYES_RIGHT = 2;
    Const.ENEMY_EYES_CLOSED = 3;
    Const.ENEMY_STATUS_ALIVE = 0;
    Const.ENEMY_STATUS_DEAD = 1;
    Const.PROGRESSBAR_WIDTH = 27;
    Const.PROGRESSBAR_HEIGHT = 7;
    Const.ENEMY_EXPLOSION_MAX_EMIT_TIME = 5;
    Const.EXPLOSION_OFFSET = 25;
    Const.GAME_STATUS_PLAYING = 0;
    Const.GAME_STATUS_GAME_OVER = 1;
    Const.WAVE_PROGRESS_DELAY = 35;
    Const.BOSS_PROGRESS_DELAY = Const.WAVE_PROGRESS_DELAY * 6;
    Const.MONEY_MULTIPLICATOR = 10;
    Const.ID_LEVEL_VALID_FOR_UNIT_TESTING = 1;
    Const.ID_LEVEL_INVALID_FOR_UNIT_TESTING = 6666;
    Const.ID_LEVEL_INVALID_WITHOUT_ROWSMAP_FOR_UNIT_TESTING = 6667;
    Const.DELAY_UPGRADE_MULTIPLIER = 5;
    Const.MAGIC_FIREBALL_SPEED = 10;
    Const.MAGIC_FIREBALLS = 3;
    Const.MAGIC_FIREBALL_DAMAGE = 500;
    Const.MAGIC_ICEBALL_SPEED = 10;
    Const.MAGIC_ICEBALLS = 3;
    Const.MAGIC_ICEBALL_FREEZE_ENEMY_MAX_TIME = 500;
    Const.MAGIC_UFO_SPEED = 10;
    Const.MAGIC_UFOS = 3;
    Const.MAGIC_STATUS_ALIVE = 0;
    Const.MAGIC_STATUS_DEAD = 1;
    Const.PARTICLE_EXPLOSION_ENEMY_SIZE = 12;
    Const.PARTICLE_EXPLOSION_FIREBALL_SIZE = 6;
    Const.PARTICLE_EXPLOSION_ICEBALL_SIZE = 6;
    Const.PARTICLE_EXPLOSION_ENEMY_COLOR = [255, 165, 0];
    Const.PARTICLE_EXPLOSION_MAGIC_FIREBALL_COLOR = [202, 191, 24];
    Const.PARTICLE_EXPLOSION_MAGIC_ICEBALL_COLOR = [0, 65, 255];
    return Const;
}());
var CustomRange = (function () {
    function CustomRange() {
    }
    CustomRange.make = function (start, stop) {
        return new Array(stop - start + 1).fill(0).map(function (v, i) { return start + i; });
    };
    return CustomRange;
}());
var Debug = (function () {
    function Debug() {
    }
    Debug.showMouseCoordinates = function (position) {
        TextProperties.setForHudData();
        text("".concat(position.x, " - ").concat(position.y), 260, 18);
    };
    return Debug;
}());
var Distance = (function () {
    function Distance() {
    }
    Distance.twoPoints = function (posA, posB) {
        return Math.sqrt((posA.x - posB.x) * (posA.x - posB.x) +
            (posA.y - posB.y) * (posA.y - posB.y));
    };
    return Distance;
}());
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var EndTile = (function () {
    function EndTile(img, position) {
        this.img = img;
        this.position = __assign({}, position);
    }
    EndTile.prototype.draw = function () {
        image(this.img, this.position.x, this.position.y);
    };
    EndTile.prototype.getPosition = function () {
        return this.position;
    };
    return EndTile;
}());
var Enemy = (function () {
    function Enemy(id, images, startPosition, orders, endurance, isBoss, Const, RandomClass, ProgressBarClass) {
        this.id = id;
        this.images = images;
        this.startPosition = __assign({}, startPosition);
        this.orders = orders;
        this.endurance = endurance;
        this.isBoss = isBoss;
        this.Const = Const;
        this.RandomClass = RandomClass;
        this.ProgressBarClass = ProgressBarClass;
        this.imgIndex = this.Const.ENEMY_EYES_CENTER;
        this.imgIndexBeforeEyesClosed = this.Const.ENEMY_EYES_CENTER;
        this.eyesSequence = [
            this.Const.ENEMY_EYES_LEFT,
            this.Const.ENEMY_EYES_CENTER,
            this.Const.ENEMY_EYES_RIGHT,
            this.Const.ENEMY_EYES_CENTER,
        ];
        this.healthBar = new this.ProgressBarClass({ x: 200, y: 200 }, this.Const.PROGRESSBAR_WIDTH, this.Const.PROGRESSBAR_HEIGHT);
        this.status = this.Const.ENEMY_STATUS_ALIVE;
        this.damage = 0;
        this.position = __assign({}, this.startPosition);
        this.moveCount = 0;
        this.indexOrder = 0;
        this.currentDirection = this.orders[this.indexOrder];
        this.changeEyesTime = 0;
        this.indexEyesSecuence = 0;
        this.closeEyesTime = 0;
        this.extendClosedEyesTime = 0;
        this.randomCloseEyes = 0;
        this.winned = false;
        this.freezed = false;
        this.freezedTime = 0;
    }
    Enemy.prototype.getEndurance = function () {
        return this.endurance;
    };
    Enemy.prototype.addDamage = function (shotDamage) {
        this.damage += shotDamage / this.endurance;
        this.healthBar.setProgress(this.damage);
        if (this.healthBar.isFullOfProgress()) {
            this.status = this.Const.ENEMY_STATUS_DEAD;
        }
    };
    Enemy.prototype.freeze = function () {
        this.freezed = true;
    };
    Enemy.prototype.isDead = function () {
        return this.status == this.Const.ENEMY_STATUS_DEAD;
    };
    Enemy.prototype.isAlive = function () {
        return this.status == this.Const.ENEMY_STATUS_ALIVE;
    };
    Enemy.prototype.isWinner = function () {
        return this.winned;
    };
    Enemy.prototype.resetWinner = function () {
        this.winned = false;
    };
    Enemy.prototype.reinitEnemy = function () {
        this.winned = true;
        this.moveCount = 0;
        this.indexOrder = 0;
        this.changeEyesTime = 0;
        this.indexEyesSecuence = 0;
        this.closeEyesTime = 0;
        this.extendClosedEyesTime = 0;
        this.currentDirection = this.orders[this.indexOrder];
        this.position = __assign({}, this.startPosition);
        this._setRandomTimeMaxForClosingEyes();
    };
    Enemy.prototype.getOrderPosition = function () {
        return this.indexOrder;
    };
    Enemy.prototype.update = function () {
        if (this.freezed) {
            if (this.freezedTime < this.Const.MAGIC_ICEBALL_FREEZE_ENEMY_MAX_TIME) {
                this.freezedTime++;
            }
            else {
                this.freezed = false;
                this.freezedTime = 0;
            }
            return;
        }
        var velocity = this.isBoss
            ? this.Const.BOSS_VELOCITY
            : this.Const.ENEMY_VELOCITY;
        switch (this.currentDirection) {
            case this.Const.LEFT_DIRECTION:
                this.position.x = this.position.x - velocity;
                break;
            case this.Const.RIGHT_DIRECTION:
                this.position.x = this.position.x + velocity;
                break;
            case this.Const.UP_DIRECTION:
                this.position.y = this.position.y - velocity;
                break;
            case this.Const.DOWN_DIRECTION:
                this.position.y = this.position.y + velocity;
                break;
        }
        this.moveCount = this.moveCount + velocity;
        if (this.moveCount === this.Const.TILE_SIZE) {
            this.moveCount = 0;
            this.indexOrder++;
            if (this.indexOrder == this.orders.length) {
                this.reinitEnemy();
            }
            else {
                this.currentDirection = this.orders[this.indexOrder];
            }
        }
    };
    Enemy.prototype._hasOpenEyes = function () {
        return this.imgIndex != this.Const.ENEMY_EYES_CLOSED;
    };
    Enemy.prototype._moveEyesInSequence = function () {
        this.changeEyesTime++;
        if (this.changeEyesTime > this.Const.ENEMY_CHANGE_EYES_MAX_TIME) {
            this.changeEyesTime = 0;
            this.indexEyesSecuence++;
            if (this.indexEyesSecuence == this.eyesSequence.length) {
                this.indexEyesSecuence = 0;
            }
            this.imgIndex = this.eyesSequence[this.indexEyesSecuence];
        }
    };
    Enemy.prototype._setRandomTimeMaxForClosingEyes = function () {
        this.randomCloseEyes = this.RandomClass.integerBetween(this.Const.ENEMY_MIN_TIME_TO_CLOSE, this.Const.ENEMY_MAX_TIME_TO_CLOSE);
    };
    Enemy.prototype._changeEyes = function () {
        if (this._hasOpenEyes()) {
            this.closeEyesTime++;
            if (this.closeEyesTime > this.randomCloseEyes) {
                this.closeEyesTime = 0;
                this._setRandomTimeMaxForClosingEyes();
                this.imgIndexBeforeEyesClosed = this.imgIndex;
                this.imgIndex = this.Const.ENEMY_EYES_CLOSED;
            }
            this._moveEyesInSequence();
        }
        else {
            this.extendClosedEyesTime++;
            if (this.extendClosedEyesTime > this.Const.ENEMY_EXTEND_CLOSED_EYES_MAX_TIME) {
                this.extendClosedEyesTime = 0;
                this.imgIndex = this.imgIndexBeforeEyesClosed;
            }
        }
    };
    Enemy.prototype.getPosition = function () {
        return this.position;
    };
    Enemy.prototype.draw = function () {
        this._changeEyes();
        image(this.images[this.imgIndex], this.position.x, this.position.y);
        this.healthBar.setPosition({ x: this.position.x, y: this.position.y - 20 });
        this.healthBar.draw();
    };
    return Enemy;
}());
var EnemyExplosion = (function () {
    function EnemyExplosion(x, y, Const, ParticleSystemClass) {
        this.x = x;
        this.y = y;
        this.Const = Const;
        this.particleSystem = new ParticleSystemClass(createVector(this.x + this.Const.EXPLOSION_OFFSET, this.y + this.Const.EXPLOSION_OFFSET), this.Const.PARTICLE_EXPLOSION_ENEMY_SIZE, this.Const.PARTICLE_EXPLOSION_ENEMY_COLOR);
        this.emisionTime = 0;
        this.finished = false;
    }
    EnemyExplosion.prototype.isActive = function () {
        return !this.finished;
    };
    EnemyExplosion.prototype.update = function () {
        if (this.emisionTime < this.Const.ENEMY_EXPLOSION_MAX_EMIT_TIME) {
            this.emisionTime++;
            this.particleSystem.addParticle();
        }
        this.particleSystem.run();
    };
    return EnemyExplosion;
}());
var GreenTower = (function () {
    function GreenTower(images, position, Const, DistanceClass, ProgressBarClass) {
        this.images = images;
        this.position = __assign({}, position);
        this.Const = Const;
        this.DistanceClass = DistanceClass;
        this.ProgressBarClass = ProgressBarClass;
        this.upgradeLevel = 0;
        this.enemyTarget = null;
        this.distanceToEnemyTarget = 0;
        this.upgrading = false;
        this.progressBar = new this.ProgressBarClass({
            x: this.position.x + this.Const.TOWER_OFFSET,
            y: this.position.y + this.Const.TOWER_OFFSET,
        }, this.Const.PROGRESSBAR_WIDTH, this.Const.PROGRESSBAR_HEIGHT);
        this.upgradeProgress = 0;
    }
    GreenTower.prototype.upgrade = function () {
        if (!this.upgrading) {
            this.upgrading = true;
            this.upgradeLevel++;
            this.delayUpgradeProgress =
                this.Const.DELAY_UPGRADE_MULTIPLIER * this.upgradeLevel;
        }
    };
    GreenTower.prototype.isNotUpgrading = function () {
        return !this.upgrading;
    };
    GreenTower.prototype.getPosition = function () {
        return this.position;
    };
    GreenTower.prototype.getUpgradeLevel = function () {
        return this.upgradeLevel;
    };
    GreenTower.prototype.isMaxUpgraded = function () {
        return this.upgradeLevel === this.Const.UPGRADE_MAX_LEVEL - 1;
    };
    GreenTower.prototype._drawShotToEnemy = function () {
        strokeWeight(3);
        stroke(this.Const.RED_COLOR);
        line(-1, -18, 7 - this.distanceToEnemyTarget / 7, -this.distanceToEnemyTarget);
    };
    GreenTower.prototype._drawUpgradeBackground = function () {
        strokeWeight(1);
        stroke('black');
        fill(this.Const.GREEN_COLOR);
        rect(this.position.x + 4, this.position.y + 4, this.Const.TILE_SIZE, this.Const.TILE_SIZE);
    };
    GreenTower.prototype.draw = function () {
        if (this.upgrading) {
            this._drawUpgradeBackground();
            if (!this.progressBar.isFullOfProgress()) {
                if (this.delayUpgradeProgress == 0) {
                    this.upgradeProgress++;
                    this.progressBar.setProgress(this.upgradeProgress);
                    this.delayUpgradeProgress =
                        this.Const.DELAY_UPGRADE_MULTIPLIER * this.upgradeLevel;
                }
                else {
                    this.delayUpgradeProgress--;
                }
                this.progressBar.draw();
            }
            else {
                this.upgrading = false;
                this.upgradeProgress = 0;
                this.progressBar.setProgress(0);
            }
        }
        else {
            if (this.enemyTarget) {
                var r_dx = this.enemyTarget.getPosition().x - this.position.x;
                var r_dy = this.enemyTarget.getPosition().y - this.position.y;
                var angle = Math.atan2(r_dy, r_dx) + 1.55;
                var cos_a = cos(angle);
                var sin_a = sin(angle);
                imageMode(CENTER);
                applyMatrix(cos_a, sin_a, -sin_a, cos_a, this.position.x + 30, this.position.y + 30);
                this._drawShotToEnemy();
                this.enemyTarget.addDamage(this.Const.DAMAGE_UPGRADE_GREEN_TOWER[this.upgradeLevel]);
                image(this.images[this.upgradeLevel], 0, 0);
                resetMatrix();
                imageMode(CORNER);
            }
            else {
                image(this.images[this.upgradeLevel], this.position.x, this.position.y);
            }
        }
    };
    GreenTower.prototype.getInfluenceArea = function () {
        return this.Const.GREEN_TOWER_UPGRADE_INFLUENCE_AREA[this.upgradeLevel];
    };
    GreenTower.prototype.getCostWhenUpgradeLevelIs = function (selectedUpgradeLevel) {
        if (selectedUpgradeLevel > this.Const.UPGRADE_MAX_LEVEL) {
            return this.Const.COST_UPGRADE_GREEN_TOWER[this.Const.UPGRADE_MAX_LEVEL];
        }
        return this.Const.COST_UPGRADE_GREEN_TOWER[selectedUpgradeLevel];
    };
    GreenTower.prototype.getCost = function () {
        return this.getCostWhenUpgradeLevelIs(this.getUpgradeLevel());
    };
    GreenTower.prototype.getNextLevelUpgradeCost = function () {
        if (this.isMaxUpgraded()) {
            return this.getCostWhenUpgradeLevelIs(this.Const.UPGRADE_MAX_LEVEL - 1);
        }
        else {
            return this.getCostWhenUpgradeLevelIs(this.getUpgradeLevel() + 1);
        }
    };
    GreenTower.prototype.getSellProfit = function () {
        return this.Const.PROFIT_SELL_UPGRADE_GREEN_TOWER[this.getUpgradeLevel()];
    };
    GreenTower.prototype.getType = function () {
        return this.Const.GREEN_TOWER;
    };
    GreenTower.prototype.getColor = function () {
        return this.Const.GREEN_COLOR;
    };
    GreenTower.prototype._isDistanceIntoInfluenceArea = function (distance) {
        return (distance <=
            this.Const.GREEN_TOWER_UPGRADE_INFLUENCE_AREA[this.upgradeLevel] / 1.65);
    };
    GreenTower.prototype.selectTarget = function (enemies) {
        var _this = this;
        var minDistance = 99999;
        var enemyTarget = null;
        enemies.forEach(function (enemy) {
            var distance = _this.DistanceClass.twoPoints({ x: _this.position.x, y: _this.position.y }, {
                x: enemy.getPosition().x,
                y: enemy.getPosition().y,
            });
            if (distance < minDistance) {
                minDistance = distance;
                enemyTarget = enemy;
            }
        });
        if (this._isDistanceIntoInfluenceArea(minDistance)) {
            this.enemyTarget = enemyTarget;
            this.distanceToEnemyTarget = minDistance;
        }
        else {
            this.enemyTarget = null;
            this.distanceToEnemyTarget = 0;
        }
    };
    return GreenTower;
}());
var Hud = (function () {
    function Hud(hudImages, hudIconImages, wallet, Const, lives, score, TextPropertiesClass, waveProgressBar, bossProgressBar, wave) {
        this.hudImages = hudImages;
        this.hudIconImages = hudIconImages;
        this.wallet = wallet;
        this.Const = Const;
        this.lives = lives;
        this.score = score;
        this.TextPropertiesClass = TextPropertiesClass;
        this.waveProgressBar = waveProgressBar;
        this.bossProgressBar = bossProgressBar;
        this.wave = wave;
        this.waveProgressBar = new ProgressBar(335, -19, 150, 16);
        this.bossProgressBar = new ProgressBar(335, -2, 150, 10);
        this.hudType = this.Const.HUD_NORMAL;
        this.selectedItem = this.Const.GREEN_TOWER;
        this.upgradeCost = null;
        this.sellProfit = null;
        this.canBuyGreenTower = false;
        this.canBuyRedTower = false;
        this.canBuyYellowTower = false;
        this.magicfireballs = this.Const.MAGIC_FIREBALLS;
        this.magiciceballs = this.Const.MAGIC_ICEBALLS;
        this.magicUFOs = this.Const.MAGIC_UFOS;
    }
    Hud.prototype.isInsideButtonsBar = function (px, py) {
        if (px > 0 && px < 800 && py > 28 && py < 78) {
            return true;
        }
        return false;
    };
    Hud.prototype.isInsideGreenTowerButton = function (px, py) {
        if (px > 0 && px < 98 && py > 28 && py < 78) {
            return true;
        }
        return false;
    };
    Hud.prototype.isInsideRedTowerButton = function (px, py) {
        if (px > 98 && px < 180 && py > 28 && py < 78) {
            return true;
        }
        return false;
    };
    Hud.prototype.isInsideYellowTowerButton = function (px, py) {
        if (px > 180 && px < 263 && py > 28 && py < 78) {
            return true;
        }
        return false;
    };
    Hud.prototype.isInsideMagicFireball = function (px, py) {
        if (px > 616 && px < 692 && py > 28 && py < 78) {
            return true;
        }
        return false;
    };
    Hud.prototype.isInsideMagicIceball = function (px, py) {
        if (px > 692 && px < 795 && py > 28 && py < 78) {
            return true;
        }
        return false;
    };
    Hud.prototype.isInsideMagicUFO = function (px, py) {
        if (px > 498 && px < 616 && py > 28 && py < 78) {
            return true;
        }
        return false;
    };
    Hud.prototype.setMagicFireballs = function (magicfireballs) {
        this.magicfireballs = magicfireballs;
    };
    Hud.prototype.setMagicIceballs = function (magiciceballs) {
        this.magiciceballs = magiciceballs;
    };
    Hud.prototype.setMagicUFOs = function (magicUFOs) {
        this.magicUFOs = magicUFOs;
    };
    Hud.prototype.setWaveProgressBar = function (waveProgressBar) {
        this.waveProgressBar = waveProgressBar;
    };
    Hud.prototype.setBossProgressBar = function (bossProgressBar) {
        this.bossProgressBar = bossProgressBar;
    };
    Hud.prototype.selectTower = function (towerId) {
        this.selectedItem = towerId;
    };
    Hud.prototype.getSelectedTower = function () {
        return this.selectedItem;
    };
    Hud.prototype.setType = function (hudType) {
        this.hudType = hudType;
    };
    Hud.prototype.setCanBuy = function (canBuyGreenTower, canBuyRedTower, canBuyYellowTower) {
        this.canBuyGreenTower = canBuyGreenTower;
        this.canBuyRedTower = canBuyRedTower;
        this.canBuyYellowTower = canBuyYellowTower;
    };
    Hud.prototype.draw = function () {
        switch (this.hudType) {
            case this.Const.HUD_NORMAL:
                image(this.hudImages[this.Const.HUD_NORMAL], 0, 0);
                this._drawTowerIcons();
                this._drawSelectedItem();
                break;
            case this.Const.HUD_UPGRADING:
                image(this.hudImages[this.Const.HUD_UPGRADING], 0, 0);
                break;
            case this.Const.HUD_UPGRADING_MAX:
                image(this.hudImages[this.Const.HUD_UPGRADING_MAX], 0, 0);
                break;
        }
        this.waveProgressBar.draw();
        this.bossProgressBar.draw();
        this.TextPropertiesClass.setForHudData();
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
        if (this.hudType === this.Const.HUD_NORMAL) {
            this._drawNewTowerPrices();
        }
    };
    Hud.prototype.setWave = function (wave) {
        this.wave = wave;
    };
    Hud.prototype.setLives = function (lives) {
        this.lives = lives;
    };
    Hud.prototype._drawTowerIcons = function () {
        var greenIconImgPos = this.Const.HUD_ICON_GREEN_TOWER_OFF;
        var redIconImgPos = this.Const.HUD_ICON_RED_TOWER_OFF;
        var yellowIconImgPos = this.Const.HUD_ICON_YELLOW_TOWER_OFF;
        if (this.canBuyGreenTower) {
            greenIconImgPos = this.Const.HUD_ICON_GREEN_TOWER_ON;
        }
        if (this.canBuyRedTower) {
            redIconImgPos = this.Const.HUD_ICON_RED_TOWER_ON;
        }
        if (this.canBuyYellowTower) {
            yellowIconImgPos = this.Const.HUD_ICON_YELLOW_TOWER_ON;
        }
        image(this.hudIconImages[greenIconImgPos], 60, 38);
        image(this.hudIconImages[redIconImgPos], 142, 38);
        image(this.hudIconImages[yellowIconImgPos], 226, 38);
    };
    Hud.prototype._drawMoney = function () {
        text(this.wallet.getMoney(), 445, 48);
    };
    Hud.prototype._drawUpgradeCost = function () {
        if (this.upgradeCost !== null) {
            if (!this.canUpgrade) {
                fill('gray');
            }
            text(this.upgradeCost, 33, 72);
            fill('white');
        }
    };
    Hud.prototype._drawMagicUFO = function () {
        text(this.magicUFOs, 592, 74);
    };
    Hud.prototype._drawMagicFireball = function () {
        text(this.magicfireballs, 680, 74);
    };
    Hud.prototype._drawMagicIceball = function () {
        text(this.magiciceballs, 769, 74);
    };
    Hud.prototype._drawSellProfit = function () {
        if (this.sellProfit !== null) {
            text(this.sellProfit, 182, 72);
        }
    };
    Hud.prototype._drawLives = function () {
        text(this.lives, 390, 48);
    };
    Hud.prototype._drawScore = function () {
        text(this.score.getPrintScore(), 404, 73);
    };
    Hud.prototype._drawLevelTitle = function () {
        text('Serpent by Ocliboy', 130, 18);
    };
    Hud.prototype._drawWave = function () {
        text("wave ".concat(this.wave), 403, 13);
    };
    Hud.prototype._drawGreenTowerPrice = function () {
        if (!this.canBuyGreenTower) {
            fill('gray');
        }
        text(this.Const.COST_UPGRADE_GREEN_TOWER[0], 40, 72);
        fill('white');
    };
    Hud.prototype._drawRedTowerPrice = function () {
        if (!this.canBuyRedTower) {
            fill('gray');
        }
        text(this.Const.COST_UPGRADE_RED_TOWER[0], 118, 72);
        fill('white');
    };
    Hud.prototype._drawYellowTowerPrice = function () {
        if (!this.canBuyYellowTower) {
            fill('gray');
        }
        text(this.Const.COST_UPGRADE_YELLOW_TOWER[0], 202, 72);
        fill('white');
    };
    Hud.prototype._drawNewTowerPrices = function () {
        this._drawGreenTowerPrice();
        this._drawRedTowerPrice();
        this._drawYellowTowerPrice();
    };
    Hud.prototype._drawSelectedItem = function () {
        strokeWeight(3);
        stroke(255, 204, 0);
        noFill();
        switch (this.selectedItem) {
            case this.Const.GREEN_TOWER:
                square(57, 36, 37);
                break;
            case this.Const.RED_TOWER:
                square(140, 36, 37);
                break;
            case this.Const.YELLOW_TOWER:
                square(225, 36, 37);
                break;
        }
    };
    Hud.prototype.selectTowerHudType = function (tower) {
        if (tower.getUpgradeLevel() < this.Const.UPGRADE_MAX_LEVEL) {
            this.setType(this.Const.HUD_UPGRADING);
        }
        else {
            this.setType(this.Const.HUD_UPGRADING_MAX);
        }
    };
    Hud.prototype.viewUpgradeCost = function (tower, canUpgrade) {
        this.upgradeCost = null;
        if (this.hudType === this.Const.HUD_UPGRADING) {
            this.upgradeCost = tower.getNextLevelUpgradeCost();
        }
        this.canUpgrade = canUpgrade;
    };
    Hud.prototype.viewSellProfit = function (tower) {
        this.sellProfit = null;
        if (this.hudType === this.Const.HUD_UPGRADING) {
            this.sellProfit = tower.getSellProfit();
        }
    };
    Hud.prototype.hideUpgradeCost = function () {
        this.upgradeCost = null;
    };
    Hud.prototype.hideSellProfit = function () {
        this.sellProfit = null;
    };
    return Hud;
}());
var ImageUtils = (function () {
    function ImageUtils() {
    }
    ImageUtils.getRangeImagesOfEnemy = function (number) {
        return [number * 4, (number + 1) * 4];
    };
    return ImageUtils;
}());
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var InfluenceArea = (function () {
    function InfluenceArea(Const) {
        this.Const = Const;
    }
    InfluenceArea.prototype._setGrayInfluenceAreaColor = function () {
        stroke.apply(void 0, __spreadArray(__spreadArray([], this.Const.GRAY_COLOR, false), [this.Const.ALPHA_INFLUENCE_AREA_STROKE], false));
        fill.apply(void 0, __spreadArray(__spreadArray([], this.Const.GRAY_COLOR, false), [this.Const.ALPHA_INFLUENCE_AREA_FILL], false));
    };
    InfluenceArea.prototype._setInfluenceAreaColor = function (towerId) {
        switch (towerId) {
            case this.Const.GREEN_TOWER:
                stroke.apply(void 0, __spreadArray(__spreadArray([], this.Const.GREEN_COLOR, false), [this.Const.ALPHA_INFLUENCE_AREA_STROKE], false));
                fill.apply(void 0, __spreadArray(__spreadArray([], this.Const.GREEN_COLOR, false), [this.Const.ALPHA_INFLUENCE_AREA_FILL], false));
                break;
            case this.Const.RED_TOWER:
                stroke.apply(void 0, __spreadArray(__spreadArray([], this.Const.RED_COLOR, false), [this.Const.ALPHA_INFLUENCE_AREA_STROKE], false));
                fill.apply(void 0, __spreadArray(__spreadArray([], this.Const.RED_COLOR, false), [this.Const.ALPHA_INFLUENCE_AREA_FILL], false));
                break;
            case this.Const.YELLOW_TOWER:
                stroke.apply(void 0, __spreadArray(__spreadArray([], this.Const.YELLOW_COLOR, false), [this.Const.ALPHA_INFLUENCE_AREA_STROKE], false));
                fill.apply(void 0, __spreadArray(__spreadArray([], this.Const.YELLOW_COLOR, false), [this.Const.ALPHA_INFLUENCE_AREA_FILL], false));
                break;
        }
    };
    InfluenceArea.prototype._getInfluenceAreaFor = function (towerSelected) {
        var influenceArea = this.Const.GREEN_TOWER_INFLUENCE_AREA;
        switch (towerSelected) {
            case this.Const.GREEN_TOWER:
                influenceArea = this.Const.GREEN_TOWER_INFLUENCE_AREA;
                break;
            case this.Const.RED_TOWER:
                influenceArea = this.Const.RED_TOWER_INFLUENCE_AREA;
                break;
            case this.Const.YELLOW_TOWER:
                influenceArea = this.Const.YELLOW_TOWER_INFLUENCE_AREA;
                break;
        }
        return influenceArea;
    };
    InfluenceArea.prototype.drawHudTowerInfluenceArea = function (hudTowerSelected, position, canBuy) {
        strokeWeight(2);
        if (canBuy) {
            this._setInfluenceAreaColor(hudTowerSelected);
        }
        else {
            this._setGrayInfluenceAreaColor();
        }
        this._drawCircle(position.x, position.y, this._getInfluenceAreaFor(hudTowerSelected));
    };
    InfluenceArea.prototype.drawTowerInfluenceArea = function (tower, canUpgrade) {
        strokeWeight(2);
        var towerPosition = tower.getPosition();
        var x = towerPosition.x;
        var y = towerPosition.y;
        if (tower.getType() === this.Const.GREEN_TOWER ||
            tower.getType() === this.Const.RED_TOWER) {
            x += this.Const.TOWER_OFFSET;
            y += this.Const.TOWER_OFFSET;
        }
        if (canUpgrade) {
            this._setInfluenceAreaColor(tower.getType());
        }
        else {
            this._setGrayInfluenceAreaColor();
        }
        this._drawCircle(x, y, tower.getInfluenceArea());
    };
    InfluenceArea.prototype._drawCircle = function (x, y, diameter) {
        circle(x + this.Const.TILE_SIZE / 2, y + this.Const.TILE_SIZE / 2, diameter);
    };
    return InfluenceArea;
}());
var LevelsData = (function () {
    function LevelsData() {
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
            startDirection: Const.LEFT_DIRECTION,
            endDirection: Const.LEFT_DIRECTION,
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
            startDirection: Const.LEFT_DIRECTION,
            endDirection: Const.LEFT_DIRECTION,
        },
        {
            id: 6667,
            title: 'no valid map 2',
            comments: 'empty rowsMap, for unit testing purposes',
            rowsMap: [],
            money: 150,
            startDirection: Const.LEFT_DIRECTION,
            endDirection: Const.LEFT_DIRECTION,
        },
    ];
    return LevelsData;
}());
var LevelsDataProvider = (function () {
    function LevelsDataProvider(levels) {
        this.levels = levels;
    }
    LevelsDataProvider.prototype.getLevel = function (id) {
        return this.levels.find(function (level) { return level.id == id; });
    };
    return LevelsDataProvider;
}());
var MagicFireball = (function () {
    function MagicFireball(img, startX, startY, orders, Const) {
        this.img = img;
        this.startX = startX;
        this.startY = startY;
        this.orders = orders;
        this.Const = Const;
        this.x = this.startX;
        this.y = this.startY;
        this.moveCount = 0;
        this.indexOrder = 0;
        this.currentDirection = this.orders[this.indexOrder];
        this.touchedEnemiesIds = [];
        this.status = this.Const.MAGIC_STATUS_ALIVE;
    }
    MagicFireball.prototype.update = function () {
        switch (this.currentDirection) {
            case this.Const.LEFT_DIRECTION:
                this.x = this.x - this.Const.MAGIC_FIREBALL_SPEED;
                break;
            case this.Const.RIGHT_DIRECTION:
                this.x = this.x + this.Const.MAGIC_FIREBALL_SPEED;
                break;
            case this.Const.UP_DIRECTION:
                this.y = this.y - this.Const.MAGIC_FIREBALL_SPEED;
                break;
            case this.Const.DOWN_DIRECTION:
                this.y = this.y + this.Const.MAGIC_FIREBALL_SPEED;
                break;
        }
        this.moveCount = this.moveCount + this.Const.MAGIC_FIREBALL_SPEED;
        if (this.moveCount === this.Const.TILE_SIZE) {
            this.moveCount = 0;
            this.indexOrder++;
            if (this.indexOrder == this.orders.length) {
                this.status = this.Const.MAGIC_STATUS_DEAD;
            }
            else {
                this.currentDirection = this.orders[this.indexOrder];
            }
        }
    };
    MagicFireball.prototype.checkCollision = function (enemy) {
        if (enemy.isDead() || enemy.isWinner()) {
            return false;
        }
        var found = this.touchedEnemiesIds.find(function (id) { return id === enemy.id; });
        if (found !== undefined) {
            return false;
        }
        var fireballPos = this.indexOrder;
        var enemyPos = enemy.getOrderPosition();
        var distanceBetween = Math.abs(fireballPos - enemyPos);
        if (fireballPos >= enemyPos && distanceBetween < 1) {
            return true;
        }
        return false;
    };
    MagicFireball.prototype.setToIgnoreList = function (enemy) {
        this.touchedEnemiesIds.push(enemy.id);
    };
    MagicFireball.prototype.addDamage = function (enemy) {
        enemy.addDamage(this.Const.MAGIC_FIREBALL_DAMAGE);
    };
    MagicFireball.prototype.isAlive = function () {
        return this.status == this.Const.MAGIC_STATUS_ALIVE;
    };
    MagicFireball.prototype.getX = function () {
        return this.x;
    };
    MagicFireball.prototype.getY = function () {
        return this.y;
    };
    MagicFireball.prototype.draw = function () {
        image(this.img, this.x, this.y);
    };
    return MagicFireball;
}());
var MagicFireballExplosion = (function () {
    function MagicFireballExplosion(x, y, Const, ParticleSystemClass) {
        this.x = x;
        this.y = y;
        this.Const = Const;
        this.particleSystem = new ParticleSystemClass(createVector(this.x + this.Const.EXPLOSION_OFFSET, this.y + this.Const.EXPLOSION_OFFSET), this.Const.PARTICLE_EXPLOSION_FIREBALL_SIZE, this.Const.PARTICLE_EXPLOSION_MAGIC_FIREBALL_COLOR);
        this.emisionTime = 0;
        this.finished = false;
    }
    MagicFireballExplosion.prototype.isActive = function () {
        return !this.finished;
    };
    MagicFireballExplosion.prototype.update = function () {
        if (this.emisionTime < this.Const.ENEMY_EXPLOSION_MAX_EMIT_TIME) {
            this.emisionTime++;
            this.particleSystem.addParticle();
        }
        this.particleSystem.run();
    };
    return MagicFireballExplosion;
}());
var MagicIceball = (function () {
    function MagicIceball(img, startX, startY, orders, Const) {
        this.img = img;
        this.startX = startX;
        this.startY = startY;
        this.orders = orders;
        this.Const = Const;
        this.x = this.startX;
        this.y = this.startY;
        this.moveCount = 0;
        this.indexOrder = 0;
        this.currentDirection = this.orders[this.indexOrder];
        this.touchedEnemiesIds = [];
        this.status = this.Const.MAGIC_STATUS_ALIVE;
    }
    MagicIceball.prototype.update = function () {
        switch (this.currentDirection) {
            case this.Const.LEFT_DIRECTION:
                this.x = this.x - this.Const.MAGIC_FIREBALL_SPEED;
                break;
            case this.Const.RIGHT_DIRECTION:
                this.x = this.x + this.Const.MAGIC_FIREBALL_SPEED;
                break;
            case this.Const.UP_DIRECTION:
                this.y = this.y - this.Const.MAGIC_FIREBALL_SPEED;
                break;
            case this.Const.DOWN_DIRECTION:
                this.y = this.y + this.Const.MAGIC_FIREBALL_SPEED;
                break;
        }
        this.moveCount = this.moveCount + this.Const.MAGIC_FIREBALL_SPEED;
        if (this.moveCount === this.Const.TILE_SIZE) {
            this.moveCount = 0;
            this.indexOrder++;
            if (this.indexOrder == this.orders.length) {
            }
            else {
                this.currentDirection = this.orders[this.indexOrder];
            }
        }
    };
    MagicIceball.prototype.freeze = function (enemy) {
        enemy.freeze();
    };
    MagicIceball.prototype.checkCollision = function (enemy) {
        if (enemy.isDead() || enemy.isWinner()) {
            return false;
        }
        var found = this.touchedEnemiesIds.find(function (id) { return id === enemy.id; });
        if (found !== undefined) {
            return false;
        }
        var fireballPos = this.indexOrder;
        var enemyPos = enemy.getOrderPosition();
        var distanceBetween = Math.abs(fireballPos - enemyPos);
        if (fireballPos >= enemyPos && distanceBetween < 1) {
            return true;
        }
        return false;
    };
    MagicIceball.prototype.setToIgnoreList = function (enemy) {
        this.touchedEnemiesIds.push(enemy.id);
    };
    MagicIceball.prototype.isAlive = function () {
        return this.status == this.Const.MAGIC_STATUS_ALIVE;
    };
    MagicIceball.prototype.getX = function () {
        return this.x;
    };
    MagicIceball.prototype.getY = function () {
        return this.y;
    };
    MagicIceball.prototype.draw = function () {
        image(this.img, this.x, this.y);
    };
    return MagicIceball;
}());
var MagicIceballExplosion = (function () {
    function MagicIceballExplosion(x, y, Const, ParticleSystemClass) {
        this.x = x;
        this.y = y;
        this.Const = Const;
        this.particleSystem = new ParticleSystemClass(createVector(this.x + this.Const.EXPLOSION_OFFSET, this.y + this.Const.EXPLOSION_OFFSET), this.Const.PARTICLE_EXPLOSION_ICEBALL_SIZE, this.Const.PARTICLE_EXPLOSION_MAGIC_ICEBALL_COLOR);
        this.emisionTime = 0;
        this.finished = false;
    }
    MagicIceballExplosion.prototype.isActive = function () {
        return !this.finished;
    };
    MagicIceballExplosion.prototype.update = function () {
        if (this.emisionTime < this.Const.ENEMY_EXPLOSION_MAX_EMIT_TIME) {
            this.emisionTime++;
            this.particleSystem.addParticle();
        }
        this.particleSystem.run();
    };
    return MagicIceballExplosion;
}());
var MagicUFO = (function () {
    function MagicUFO(img, startX, startY, orders, Const) {
        this.img = img;
        this.startX = startX;
        this.startY = startY;
        this.orders = orders;
        this.Const = Const;
        this.x = this.startX;
        this.y = this.startY;
        this.moveCount = 0;
        this.indexOrder = 0;
        this.currentDirection = this.orders[this.indexOrder];
    }
    MagicUFO.prototype.update = function () {
        switch (this.currentDirection) {
            case this.Const.LEFT_DIRECTION:
                this.x = this.x - this.Const.MAGIC_FIREBALL_SPEED;
                break;
            case this.Const.RIGHT_DIRECTION:
                this.x = this.x + this.Const.MAGIC_FIREBALL_SPEED;
                break;
            case this.Const.UP_DIRECTION:
                this.y = this.y - this.Const.MAGIC_FIREBALL_SPEED;
                break;
            case this.Const.DOWN_DIRECTION:
                this.y = this.y + this.Const.MAGIC_FIREBALL_SPEED;
                break;
        }
        this.moveCount = this.moveCount + this.Const.MAGIC_FIREBALL_SPEED;
        if (this.moveCount === this.Const.TILE_SIZE) {
            this.moveCount = 0;
            this.indexOrder++;
            if (this.indexOrder == this.orders.length) {
            }
            else {
                this.currentDirection = this.orders[this.indexOrder];
            }
        }
    };
    MagicUFO.prototype.getX = function () {
        return this.x;
    };
    MagicUFO.prototype.getY = function () {
        return this.y;
    };
    MagicUFO.prototype.draw = function () {
        image(this.img, this.x, this.y);
    };
    return MagicUFO;
}());
var OrangeTile = (function () {
    function OrangeTile(img, position, Const, towerGenerator) {
        this.img = img;
        this.position = __assign({}, position);
        this.Const = Const;
        this.towerGenerator = towerGenerator;
        this.tower = null;
    }
    OrangeTile.prototype.sellTower = function () {
        var profit = 0;
        if (this.tower) {
            profit = this.tower.getSellProfit();
            this.tower = null;
        }
        return profit;
    };
    OrangeTile.prototype.buyTower = function (towerId) {
        if (this.tower === null) {
            this.tower = this.towerGenerator.newTower(towerId, this.position);
        }
        else {
            this.tower.upgrade();
        }
        return this.tower.getCost();
    };
    OrangeTile.prototype._upgradeTower = function () {
        if (this.tower) {
            this.tower.upgrade();
        }
    };
    OrangeTile.prototype.drawTile = function () {
        image(this.img, this.position.x, this.position.y);
    };
    OrangeTile.prototype.drawTower = function () {
        if (this.tower) {
            this.tower.draw();
        }
    };
    OrangeTile.prototype.getPosition = function () {
        return this.position;
    };
    OrangeTile.prototype.selectTarget = function (enemies) {
        if (this.tower) {
            this.tower.selectTarget(enemies);
        }
    };
    OrangeTile.prototype.isInside = function (mouse_x, mouse_y) {
        var insideX = false;
        var insideY = false;
        if (this.position.x < mouse_x &&
            this.position.x + this.Const.TILE_SIZE > mouse_x) {
            insideX = true;
        }
        if (this.position.y < mouse_y &&
            this.position.y + this.Const.TILE_SIZE > mouse_y) {
            insideY = true;
        }
        if (insideX && insideY) {
            return true;
        }
        return false;
    };
    OrangeTile.prototype.hasTower = function () {
        return this.tower !== null;
    };
    OrangeTile.prototype.getTower = function () {
        if (this.hasTower()) {
            return this.tower;
        }
        return null;
    };
    return OrangeTile;
}());
var Particle = (function () {
    function Particle(position, size, color) {
        this.position = position.copy();
        this.size = size;
        this.velocity = createVector(random(-3, 3), random(-3, 0));
        this.lifespan = 255;
        this.color = color;
    }
    Particle.prototype.run = function () {
        this.update();
        this.display();
    };
    Particle.prototype.update = function () {
        this.position.add(this.velocity);
        this.lifespan -= 2;
    };
    Particle.prototype.display = function () {
        stroke.apply(void 0, __spreadArray(__spreadArray([], this.color, false), [this.lifespan], false));
        strokeWeight(2);
        fill(127, this.lifespan);
        ellipse(this.position.x, this.position.y, this.size, this.size);
    };
    Particle.prototype.isDead = function () {
        return this.lifespan < 0;
    };
    return Particle;
}());
var ParticleSystem = (function () {
    function ParticleSystem(position, particlesSize, particlesColor) {
        this.origin = position.copy();
        this.particles = [];
        this.particlesSize = particlesSize;
        this.particlesColor = particlesColor;
    }
    ParticleSystem.prototype.addParticle = function () {
        this.particles.push(new Particle(this.origin, this.particlesSize, this.particlesColor));
    };
    ParticleSystem.prototype.run = function () {
        for (var i = this.particles.length - 1; i >= 0; i--) {
            var p = this.particles[i];
            p.run();
            if (p.isDead()) {
                this.particles.splice(i, 1);
            }
        }
    };
    return ParticleSystem;
}());
var Path = (function () {
    function Path(startTile, endTile, pathTiles, Const) {
        this.MAX_SEARCHES = 5000;
        this.startTile = startTile;
        this.endTile = endTile;
        this.pathTiles = pathTiles;
        this.Const = Const;
    }
    Path.prototype.getEnemiesInitialPosition = function () {
        var finalX = 0;
        var finalY = 0;
        if (this.startTile.getStartDirection() === this.Const.LEFT_DIRECTION) {
            var finalPosition = this.startTile.getPosition();
            finalX = finalPosition.x + this.Const.TILE_SIZE;
            finalY = finalPosition.y;
        }
        return { x: finalX, y: finalY };
    };
    Path.prototype.getTileInPosition = function (tx, ty) {
        var pathTile = this.pathTiles.find(function (pathTile) { return tx === pathTile.getX() && ty === pathTile.getY(); });
        return pathTile ? pathTile : null;
    };
    Path.prototype._searchLeftTile = function (currentTile) {
        var searchPx = currentTile.getX() - this.Const.TILE_SIZE;
        var searchPy = currentTile.getY();
        return this.getTileInPosition(searchPx, searchPy);
    };
    Path.prototype._searchDownTile = function (currentTile) {
        var searchPx = currentTile.getX();
        var searchPy = currentTile.getY() + this.Const.TILE_SIZE;
        return this.getTileInPosition(searchPx, searchPy);
    };
    Path.prototype._searchRightTile = function (currentTile) {
        var searchPx = currentTile.getX() + this.Const.TILE_SIZE;
        var searchPy = currentTile.getY();
        return this.getTileInPosition(searchPx, searchPy);
    };
    Path.prototype._searchUpTile = function (currentTile) {
        var searchPx = currentTile.getX();
        var searchPy = currentTile.getY() - this.Const.TILE_SIZE;
        return this.getTileInPosition(searchPx, searchPy);
    };
    Path.prototype._isLeftEndTile = function (currentTile) {
        var searchPx = currentTile.getX() - this.Const.TILE_SIZE;
        var searchPy = currentTile.getY();
        var endPosition = this.endTile.getPosition();
        var endPx = endPosition.x;
        var endPy = endPosition.y;
        if (searchPx === endPx && searchPy === endPy) {
            return true;
        }
        return false;
    };
    Path.prototype.makeOrders = function () {
        var orders = [];
        var startTilePosition = this.startTile.getPosition();
        var currentTile = new PathTile(startTilePosition.x, startTilePosition.y);
        var currentDirection = this.startTile.getStartDirection();
        orders.push(currentDirection);
        var endReached = false;
        var searchCount = 0;
        while (searchCount < this.MAX_SEARCHES && !endReached) {
            searchCount++;
            if (currentDirection === this.Const.LEFT_DIRECTION) {
                var isLeftEndTile = this._isLeftEndTile(currentTile);
                if (isLeftEndTile) {
                    endReached = true;
                    orders.push(this.Const.LEFT_DIRECTION);
                }
                else {
                    var searchTile = this._searchLeftTile(currentTile);
                    if (searchTile) {
                        orders.push(this.Const.LEFT_DIRECTION);
                        currentTile = searchTile;
                    }
                    else {
                        var searchNextTile = this._searchDownTile(currentTile);
                        if (searchNextTile) {
                            currentDirection = this.Const.DOWN_DIRECTION;
                        }
                        else {
                            currentDirection = this.Const.UP_DIRECTION;
                        }
                    }
                }
            }
            if (currentDirection === this.Const.DOWN_DIRECTION) {
                var searchTile = this._searchDownTile(currentTile);
                if (searchTile) {
                    orders.push(this.Const.DOWN_DIRECTION);
                    currentTile = searchTile;
                }
                else {
                    var searchNextTile = this._searchRightTile(currentTile);
                    if (searchNextTile) {
                        currentDirection = this.Const.RIGHT_DIRECTION;
                    }
                    else {
                        currentDirection = this.Const.LEFT_DIRECTION;
                    }
                }
            }
            if (currentDirection === this.Const.RIGHT_DIRECTION) {
                var searchTile = this._searchRightTile(currentTile);
                if (searchTile) {
                    orders.push(this.Const.RIGHT_DIRECTION);
                    currentTile = searchTile;
                }
                else {
                    var searchNextTile = this._searchUpTile(currentTile);
                    if (searchNextTile) {
                        currentDirection = this.Const.UP_DIRECTION;
                    }
                    else {
                        currentDirection = this.Const.DOWN_DIRECTION;
                    }
                }
            }
            if (currentDirection === this.Const.UP_DIRECTION) {
                var searchTile = this._searchUpTile(currentTile);
                if (searchTile) {
                    orders.push(this.Const.UP_DIRECTION);
                    currentTile = searchTile;
                }
                else {
                    var searchNextTile = this._searchLeftTile(currentTile);
                    if (searchNextTile) {
                        currentDirection = this.Const.LEFT_DIRECTION;
                    }
                    else {
                        currentDirection = this.Const.RIGHT_DIRECTION;
                    }
                }
            }
        }
        if (endReached) {
            orders.push(currentDirection);
        }
        if (searchCount === this.MAX_SEARCHES) {
            return [];
        }
        return orders;
    };
    return Path;
}());
var PathTile = (function () {
    function PathTile(x, y) {
        this.x = x;
        this.y = y;
    }
    PathTile.prototype.getX = function () {
        return this.x;
    };
    PathTile.prototype.getY = function () {
        return this.y;
    };
    return PathTile;
}());
var ProgressBar = (function () {
    function ProgressBar(position, width, height) {
        this.position = __assign({}, position);
        this.width = width;
        this.height = height;
        this.progress = 0;
        this.maxProgress = this.width - 1;
    }
    ProgressBar.prototype.setPosition = function (position) {
        this.position = __assign({}, position);
    };
    ProgressBar.prototype.setProgress = function (progress) {
        this.progress = progress;
    };
    ProgressBar.prototype.getProgress = function () {
        return this.progress;
    };
    ProgressBar.prototype.increaseProgress = function () {
        this.progress++;
    };
    ProgressBar.prototype.isFullOfProgress = function () {
        return this.progress >= 100;
    };
    ProgressBar.prototype._drawBackgroundBar = function () {
        strokeWeight(1);
        stroke('black');
        fill('green');
        rect(this.position.x + 10, this.position.y + 20, this.width, this.height);
    };
    ProgressBar.prototype._drawProgressBar = function () {
        strokeWeight(0);
        fill('red');
        var progressLevel = (this.progress * this.maxProgress) / 100;
        rect(this.position.x + 11, this.position.y + 21, progressLevel, this.height - 2);
    };
    ProgressBar.prototype.draw = function () {
        this._drawBackgroundBar();
        if (this.progress > 0) {
            this._drawProgressBar();
        }
    };
    return ProgressBar;
}());
var Random = (function () {
    function Random() {
    }
    Random.integerBetween = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    return Random;
}());
var RedTower = (function () {
    function RedTower(images, position, Const, DistanceClass, ProgressBarClass) {
        this.images = images;
        this.position = __assign({}, position);
        this.Const = Const;
        this.DistanceClass = DistanceClass;
        this.ProgressBarClass = ProgressBarClass;
        this.upgradeLevel = 0;
        this.upgrading = false;
        this.progressBar = new this.ProgressBarClass(this.position, this.Const.PROGRESSBAR_WIDTH, this.Const.PROGRESSBAR_HEIGHT);
        this.upgradeProgress = 0;
    }
    RedTower.prototype.upgrade = function () {
        if (!this.upgrading) {
            this.upgrading = true;
            this.upgradeLevel++;
        }
    };
    RedTower.prototype.isNotUpgrading = function () {
        return !this.upgrading;
    };
    RedTower.prototype.getPosition = function () {
        return this.position;
    };
    RedTower.prototype.getUpgradeLevel = function () {
        return this.upgradeLevel;
    };
    RedTower.prototype.isMaxUpgraded = function () {
        return this.upgradeLevel === this.Const.UPGRADE_MAX_LEVEL - 1;
    };
    RedTower.prototype._drawUpgradeBackground = function () {
        strokeWeight(1);
        stroke('black');
        fill(this.Const.RED_COLOR);
        rect(this.position.x + 4, this.position.y + 4, this.Const.TILE_SIZE, this.Const.TILE_SIZE);
    };
    RedTower.prototype.draw = function () {
        if (this.upgrading) {
            this._drawUpgradeBackground();
            if (!this.progressBar.isFullOfProgress()) {
                this.upgradeProgress++;
                this.progressBar.setProgress(this.upgradeProgress);
                this.progressBar.draw();
            }
            else {
                this.upgrading = false;
                this.upgradeProgress = 0;
                this.progressBar.setProgress(0);
            }
        }
        else {
            image(this.images[this.upgradeLevel], this.position.x, this.position.y);
        }
    };
    RedTower.prototype.getInfluenceArea = function () {
        return this.Const.RED_TOWER_UPGRADE_INFLUENCE_AREA[this.upgradeLevel];
    };
    RedTower.prototype.getCostWhenUpgradeLevelIs = function (selectedUpgradeLevel) {
        if (selectedUpgradeLevel > this.Const.UPGRADE_MAX_LEVEL) {
            return this.Const.COST_UPGRADE_RED_TOWER[this.Const.UPGRADE_MAX_LEVEL];
        }
        return this.Const.COST_UPGRADE_RED_TOWER[selectedUpgradeLevel];
    };
    RedTower.prototype.getCost = function () {
        return this.getCostWhenUpgradeLevelIs(this.getUpgradeLevel());
    };
    RedTower.prototype.getNextLevelUpgradeCost = function () {
        if (this.isMaxUpgraded()) {
            return this.getCostWhenUpgradeLevelIs(this.Const.UPGRADE_MAX_LEVEL - 1);
        }
        else {
            return this.getCostWhenUpgradeLevelIs(this.getUpgradeLevel() + 1);
        }
    };
    RedTower.prototype.getSellProfit = function () {
        return this.Const.PROFIT_SELL_UPGRADE_RED_TOWER[this.getUpgradeLevel()];
    };
    RedTower.prototype.getType = function () {
        return this.Const.RED_TOWER;
    };
    RedTower.prototype.getColor = function () {
        return this.Const.RED_COLOR;
    };
    RedTower.prototype.selectTarget = function (enemies) {
    };
    return RedTower;
}());
var Resources = (function () {
    function Resources() {
    }
    Resources.enemies = function () {
        var enemiesImages = [];
        var countEnemiesAndBoss = Const.TOTAL_ENEMIES + 1;
        CustomRange.make(1, countEnemiesAndBoss).forEach(function (v) {
            enemiesImages.push(loadImage('img/enemies/' + v + '_center.png'));
            enemiesImages.push(loadImage('img/enemies/' + v + '_left.png'));
            enemiesImages.push(loadImage('img/enemies/' + v + '_right.png'));
            enemiesImages.push(loadImage('img/enemies/' + v + '_closed.png'));
        });
        return enemiesImages;
    };
    Resources.greenTower = function () {
        var greenTowerImages = [];
        CustomRange.make(0, Const.UPGRADE_MAX_LEVEL).forEach(function (v) {
            greenTowerImages.push(loadImage('img/towers/green_tower_upgrade_' + v + '.png'));
        });
        return greenTowerImages;
    };
    Resources.redTower = function () {
        var redTowerImages = [];
        CustomRange.make(0, Const.UPGRADE_MAX_LEVEL).forEach(function (v) {
            redTowerImages.push(loadImage('img/towers/red_tower_upgrade_' + v + '.png'));
        });
        return redTowerImages;
    };
    Resources.yellowTower = function () {
        var yellowTowerImages = [];
        CustomRange.make(0, Const.UPGRADE_MAX_LEVEL).forEach(function (v) {
            yellowTowerImages.push(loadImage('img/towers/yellow_tower_upgrade_' + v + '.png'));
        });
        return yellowTowerImages;
    };
    Resources.tileImages = function () {
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
    };
    Resources.hudImages = function () {
        return [
            loadImage('img/hud/normal.png'),
            loadImage('img/hud/upgrading.png'),
            loadImage('img/hud/upgrading_max.png'),
        ];
    };
    Resources.hudIconImages = function () {
        return [
            loadImage('img/hud/icon_green_tower_on.png'),
            loadImage('img/hud/icon_green_tower_off.png'),
            loadImage('img/hud/icon_red_tower_on.png'),
            loadImage('img/hud/icon_red_tower_off.png'),
            loadImage('img/hud/icon_yellow_tower_on.png'),
            loadImage('img/hud/icon_yellow_tower_off.png'),
        ];
    };
    Resources.backgroundImage = function () {
        return loadImage('img/backgrounds/ground.jpg');
    };
    Resources.magicFireball = function () {
        return loadImage('img/magics/fireball.png');
    };
    Resources.magicIceball = function () {
        return loadImage('img/magics/iceball.png');
    };
    Resources.magicUFO = function () {
        return loadImage('img/magics/ufo.png');
    };
    return Resources;
}());
var Score = (function () {
    function Score() {
        this.score = 0;
    }
    Score.prototype.increase = function (score) {
        this.score = score;
    };
    Score.prototype.getPrintScore = function () {
        return String(this.score).padStart(10, '0');
    };
    return Score;
}());
var StartTile = (function () {
    function StartTile(img, position, startDirection) {
        this.img = img;
        this.position = __assign({}, position);
        this.startDirection = startDirection;
    }
    StartTile.prototype.draw = function () {
        image(this.img, this.position.x, this.position.y);
    };
    StartTile.prototype.getPosition = function () {
        return this.position;
    };
    StartTile.prototype.getStartDirection = function () {
        return this.startDirection;
    };
    return StartTile;
}());
var TextProperties = (function () {
    function TextProperties() {
    }
    TextProperties.setForBigCenteredTitle = function () {
        fill('white');
        stroke('black');
        strokeWeight(2);
        textSize(30);
        textAlign(CENTER);
    };
    TextProperties.setForHudData = function () {
        textSize(12);
        fill('white');
        stroke('black');
        strokeWeight(2);
        textAlign(LEFT);
    };
    return TextProperties;
}());
var TileGenerator = (function () {
    function TileGenerator(levelMap, mapImages, Const, OrangeTileClass, PathTileClass, StartTileClass, EndTileClass, towerGenerator) {
        this.FLOOR_SIZE = 50;
        this.MARGIN_TOP = 30;
        this.levelMap = levelMap;
        this.mapImages = mapImages;
        this.Const = Const;
        this.OrangeTileClass = OrangeTileClass;
        this.PathTileClass = PathTileClass;
        this.StartTileClass = StartTileClass;
        this.EndTileClass = EndTileClass;
        this.towerGenerator = towerGenerator;
        if (this.levelMap.rowsMap.length === 0) {
            throw new Error('No rows map found');
        }
        this._setStartImage(mapImages);
        this._setEndImage(mapImages);
        this.orangeImage = mapImages[0];
        this.blackImage = mapImages[1];
        this.startDirection = this.levelMap.startDirection;
    }
    TileGenerator.prototype._setStartImage = function (mapImages) {
        switch (this.levelMap.startDirection) {
            case this.Const.DOWN_DIRECTION:
                this.startImage = mapImages[6];
                this.startDirection = this.Const.DOWN_DIRECTION;
                break;
            case this.Const.RIGHT_DIRECTION:
                this.startImage = mapImages[7];
                this.startDirection = this.Const.RIGHT_DIRECTION;
                break;
            case this.Const.LEFT_DIRECTION:
                this.startImage = mapImages[8];
                this.startDirection = this.Const.LEFT_DIRECTION;
                break;
            case this.Const.UP_DIRECTION:
                this.startImage = mapImages[9];
                this.startDirection = this.Const.UP_DIRECTION;
                break;
        }
    };
    TileGenerator.prototype._setEndImage = function (mapImages) {
        switch (this.levelMap.endDirection) {
            case this.Const.DOWN_DIRECTION:
                this.endImage = mapImages[2];
                break;
            case this.Const.RIGHT_DIRECTION:
                this.endImage = mapImages[4];
                break;
            case this.Const.LEFT_DIRECTION:
                this.endImage = mapImages[3];
                break;
            case this.Const.UP_DIRECTION:
                this.endImage = mapImages[5];
                break;
        }
    };
    TileGenerator.prototype._extractTiles = function (symbol) {
        var _this = this;
        var resultTiles = [];
        var rowCount = 0;
        this.levelMap.rowsMap.forEach(function (row) {
            var trimmedRow = row.trim();
            rowCount++;
            for (var column = 0; column < trimmedRow.length; column++) {
                var character = trimmedRow[column];
                var posX = _this.FLOOR_SIZE * column;
                var posY = _this.FLOOR_SIZE * rowCount + _this.MARGIN_TOP;
                if (character === symbol) {
                    switch (symbol) {
                        case '0':
                            resultTiles.push(new _this.OrangeTileClass(_this.orangeImage, { x: posX, y: posY }, _this.Const, _this.towerGenerator));
                            break;
                        case '1':
                            resultTiles.push(new _this.PathTileClass(posX, posY));
                            break;
                        case 'x':
                            resultTiles.push(new _this.StartTileClass(_this.startImage, { x: posX, y: posY }, _this.startDirection));
                            break;
                        case 'y':
                            resultTiles.push(new _this.EndTileClass(_this.endImage, { x: posX, y: posY }));
                            break;
                    }
                }
            }
        });
        return resultTiles;
    };
    TileGenerator.prototype.orangeTiles = function () {
        return this._extractTiles('0');
    };
    TileGenerator.prototype.pathTiles = function () {
        return this._extractTiles('1');
    };
    TileGenerator.prototype.startTile = function () {
        return this._extractTiles('x')[0];
    };
    TileGenerator.prototype.endTile = function () {
        return this._extractTiles('y')[0];
    };
    TileGenerator.prototype.getInitialMoney = function () {
        return Number(this.levelMap.money);
    };
    return TileGenerator;
}());
var TowerGenerator = (function () {
    function TowerGenerator(greenTowerImages, redTowerImages, yellowTowerImages, Const, GreenTowerClass, RedTowerClass, YellowTowerClass, DistanceClass, ProgressBarClass) {
        this.greenTowerImages = greenTowerImages;
        this.redTowerImages = redTowerImages;
        this.yellowTowerImages = yellowTowerImages;
        this.Const = Const;
        this.GreenTowerClass = GreenTowerClass;
        this.RedTowerClass = RedTowerClass;
        this.YellowTowerClass = YellowTowerClass;
        this.DistanceClass = DistanceClass;
        this.ProgressBarClass = ProgressBarClass;
    }
    TowerGenerator.prototype.newTower = function (towerId, position) {
        var tower = null;
        switch (towerId) {
            case this.Const.GREEN_TOWER:
                tower = new this.GreenTowerClass(this.greenTowerImages, {
                    x: position.x - this.Const.TOWER_OFFSET,
                    y: position.y - this.Const.TOWER_OFFSET,
                }, this.Const, this.DistanceClass, this.ProgressBarClass);
                break;
            case this.Const.RED_TOWER:
                tower = new this.RedTowerClass(this.redTowerImages, {
                    x: position.x - this.Const.TOWER_OFFSET,
                    y: position.y - this.Const.TOWER_OFFSET,
                }, this.Const, this.DistanceClass, this.ProgressBarClass);
                break;
            case this.Const.YELLOW_TOWER:
                tower = new this.YellowTowerClass(this.yellowTowerImages, { x: position.x, y: position.y }, this.Const, this.DistanceClass, this.ProgressBarClass);
                break;
            default:
                break;
        }
        return tower;
    };
    return TowerGenerator;
}());
var Wallet = (function () {
    function Wallet(money, Const) {
        this.money = money;
        this.Const = Const;
    }
    Wallet.prototype.getMoney = function () {
        return this.money;
    };
    Wallet.prototype.increase = function (quantity) {
        this.money += quantity;
    };
    Wallet.prototype.decrease = function (quantity) {
        this.money -= quantity;
    };
    Wallet.prototype.haveMoneyToBuy = function (towerId, upgradeLevel) {
        var canBuy = false;
        switch (towerId) {
            case this.Const.GREEN_TOWER:
                canBuy = this.Const.COST_UPGRADE_GREEN_TOWER[upgradeLevel] <= this.money;
                break;
            case this.Const.RED_TOWER:
                canBuy = this.Const.COST_UPGRADE_RED_TOWER[upgradeLevel] <= this.money;
                break;
            case this.Const.YELLOW_TOWER:
                canBuy =
                    this.Const.COST_UPGRADE_YELLOW_TOWER[upgradeLevel] <= this.money;
                break;
            default:
                break;
        }
        return canBuy;
    };
    return Wallet;
}());
var YellowTower = (function () {
    function YellowTower(images, position, Const, DistanceClass, ProgressBarClass) {
        this.images = images;
        this.position = __assign({}, position);
        this.Const = Const;
        this.DistanceClass = DistanceClass;
        this.ProgressBarClass = ProgressBarClass;
        this.upgradeLevel = 0;
        this.upgrading = false;
        this.progressBar = new this.ProgressBarClass(this.position, 27, 7);
        this.upgradeProgress = 0;
    }
    YellowTower.prototype.upgrade = function () {
        if (!this.upgrading) {
            this.upgrading = true;
            this.upgradeLevel++;
        }
    };
    YellowTower.prototype.isNotUpgrading = function () {
        return !this.upgrading;
    };
    YellowTower.prototype.getPosition = function () {
        return this.position;
    };
    YellowTower.prototype.getUpgradeLevel = function () {
        return this.upgradeLevel;
    };
    YellowTower.prototype.isMaxUpgraded = function () {
        return this.upgradeLevel === this.Const.UPGRADE_MAX_LEVEL - 1;
    };
    YellowTower.prototype._drawUpgradeBackground = function () {
        strokeWeight(1);
        stroke('black');
        fill(this.Const.YELLOW_COLOR);
        rect(this.position.x, this.position.y, this.Const.TILE_SIZE, this.Const.TILE_SIZE);
    };
    YellowTower.prototype.draw = function () {
        if (this.upgrading) {
            this._drawUpgradeBackground();
            if (!this.progressBar.isFullOfProgress()) {
                this.upgradeProgress++;
                this.progressBar.setProgress(this.upgradeProgress);
                this.progressBar.draw();
            }
            else {
                this.upgrading = false;
                this.upgradeProgress = 0;
                this.progressBar.setProgress(0);
            }
        }
        else {
            image(this.images[this.upgradeLevel], this.position.x, this.position.y);
        }
    };
    YellowTower.prototype.getInfluenceArea = function () {
        return this.Const.YELLOW_TOWER_UPGRADE_INFLUENCE_AREA[this.upgradeLevel];
    };
    YellowTower.prototype.getCostWhenUpgradeLevelIs = function (selectedUpgradeLevel) {
        if (selectedUpgradeLevel > this.Const.UPGRADE_MAX_LEVEL) {
            return this.Const.COST_UPGRADE_YELLOW_TOWER[this.Const.UPGRADE_MAX_LEVEL];
        }
        return this.Const.COST_UPGRADE_YELLOW_TOWER[selectedUpgradeLevel];
    };
    YellowTower.prototype.getCost = function () {
        return this.getCostWhenUpgradeLevelIs(this.getUpgradeLevel());
    };
    YellowTower.prototype.getNextLevelUpgradeCost = function () {
        if (this.isMaxUpgraded()) {
            return this.getCostWhenUpgradeLevelIs(this.Const.UPGRADE_MAX_LEVEL - 1);
        }
        else {
            return this.getCostWhenUpgradeLevelIs(this.getUpgradeLevel() + 1);
        }
    };
    YellowTower.prototype.getSellProfit = function () {
        return this.Const.PROFIT_SELL_UPGRADE_YELLOW_TOWER[this.getUpgradeLevel()];
    };
    YellowTower.prototype.getType = function () {
        return this.Const.YELLOW_TOWER;
    };
    YellowTower.prototype.getColor = function () {
        return this.Const.YELLOW_COLOR;
    };
    YellowTower.prototype.selectTarget = function (enemies) {
    };
    return YellowTower;
}());
var orders;
var createEnemyTime;
var enemies;
var hud;
var wallet;
var score;
var orangeTiles;
var mouseOrangeTileOver;
var wave;
var waveEnemies;
var tileImages;
var greenTowerImages;
var redTowerImages;
var yellowTowerImages;
var startTile;
var endTile;
var hudImages;
var hudIconImages;
var backgroundImage;
var enemiesImages;
var towerGenerator;
var influenceArea;
var enemyExplosions;
var magicFireballExplosions;
var magicIceballExplosions;
var lives;
var gameStatus;
var waveProgressBar;
var waveProgressDelay;
var bossProgressBar;
var bossProgressDelay;
var initialEnemiesPosition;
var allowCreateEnemies;
var levelDataProvider;
var magicFireballImage;
var magicFireballs;
var magicFireballsCount;
var magicIceballImage;
var magicIceballs;
var magicIceballsCount;
var magicUFOImage;
var magicUFOs;
var magicUFOsCount;
var currentEnemyId;
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
    for (var _i = 0, _a = document.getElementsByClassName('p5Canvas'); _i < _a.length; _i++) {
        var element = _a[_i];
        element.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            mouseClicked();
        });
    }
}
function setup() {
    disableContextualMenu();
    createCanvas(Const.CANVAS_WIDTH, Const.CANVAS_HEIGHT);
    levelDataProvider = new LevelsDataProvider(LevelsData.data);
    var levelMap = levelDataProvider.getLevel(1);
    createEnemyTime = 0;
    towerGenerator = new TowerGenerator(greenTowerImages, redTowerImages, yellowTowerImages, Const, GreenTower, RedTower, YellowTower, Distance, ProgressBar);
    var tileGenerator = new TileGenerator(levelMap, tileImages, Const, OrangeTile, PathTile, StartTile, EndTile, towerGenerator);
    orangeTiles = tileGenerator.orangeTiles();
    startTile = tileGenerator.startTile();
    endTile = tileGenerator.endTile();
    var pathTiles = tileGenerator.pathTiles();
    var path = new Path(startTile, endTile, pathTiles, Const);
    orders = path.makeOrders();
    initialEnemiesPosition = path.getEnemiesInitialPosition();
    wallet = new Wallet(tileGenerator.getInitialMoney(), Const);
    score = new Score();
    lives = 7;
    wave = 1;
    allowCreateEnemies = true;
    waveEnemies = 0;
    enemies = [];
    currentEnemyId = 1;
    waveProgressBar = new ProgressBar({ x: 335, y: -19 }, 150, 16);
    bossProgressBar = new ProgressBar({ x: 335, y: -2 }, 150, 10);
    hud = new Hud(hudImages, hudIconImages, wallet, Const, lives, score, TextProperties, waveProgressBar, bossProgressBar, wave);
    waveProgressDelay = Const.WAVE_PROGRESS_DELAY;
    bossProgressDelay = Const.BOSS_PROGRESS_DELAY;
    enemyExplosions = [];
    magicFireballExplosions = [];
    magicIceballExplosions = [];
    magicFireballs = [];
    magicFireballsCount = Const.MAGIC_FIREBALLS;
    magicIceballs = [];
    magicIceballsCount = Const.MAGIC_ICEBALLS;
    magicUFOs = [];
    magicUFOsCount = Const.MAGIC_UFOS;
    influenceArea = new InfluenceArea(Const);
    gameStatus = Const.GAME_STATUS_PLAYING;
}
function keyPressed() {
    switch (keyCode) {
        case Const.KEY_1:
            hud.selectTower(Const.GREEN_TOWER);
            break;
        case Const.KEY_2:
            hud.selectTower(Const.RED_TOWER);
            break;
        case Const.KEY_3:
            hud.selectTower(Const.YELLOW_TOWER);
            break;
    }
}
function canUpgradeTower(tower) {
    var canUpgrade = false;
    if (tower.getUpgradeLevel() < Const.UPGRADE_MAX_LEVEL) {
        if (wallet.haveMoneyToBuy(tower.getType(), tower.getUpgradeLevel() + 1)) {
            canUpgrade = true;
        }
    }
    return canUpgrade;
}
function canBuyNewTower(hudSelectedTower) {
    var canBuy = false;
    var zeroUpgradeLevel = 0;
    if (wallet.haveMoneyToBuy(hudSelectedTower, zeroUpgradeLevel)) {
        canBuy = true;
    }
    return canBuy;
}
function canBuyTower(tower) {
    var result = false;
    if (tower) {
        result = canUpgradeTower(tower);
    }
    else {
        result = canBuyNewTower(hud.getSelectedTower());
    }
    return result;
}
function handleHudButtons() {
    if (hud.isInsideGreenTowerButton(mouseX, mouseY)) {
        hud.selectTower(Const.GREEN_TOWER);
    }
    if (hud.isInsideRedTowerButton(mouseX, mouseY)) {
        hud.selectTower(Const.RED_TOWER);
    }
    if (hud.isInsideYellowTowerButton(mouseX, mouseY)) {
        hud.selectTower(Const.YELLOW_TOWER);
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
    var profit = mouseOrangeTileOver.sellTower();
    wallet.increase(profit);
}
function handleBuyTower() {
    if (canBuyTower(mouseOrangeTileOver.getTower())) {
        var cost = mouseOrangeTileOver.buyTower(hud.getSelectedTower());
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
            if (mouseOrangeTileOver.getTower().isNotUpgrading()) {
                handleSellTower();
            }
        }
        if (mouseButton === LEFT) {
            handleBuyTower();
        }
    }
}
function createNewEnemy(waveEnemy, wave) {
    var endurance = wave * 3 + waveEnemy * 2;
    var isBoss = false;
    enemies.push(new Enemy(currentEnemyId, enemiesImages.slice.apply(enemiesImages, ImageUtils.getRangeImagesOfEnemy(waveEnemy)), initialEnemiesPosition, orders, endurance, isBoss, Const, Random, ProgressBar));
    currentEnemyId++;
}
function createNewMagicFireball() {
    if (magicFireballsCount > 0) {
        magicFireballs.push(new MagicFireball(magicFireballImage, initialEnemiesPosition.x, initialEnemiesPosition.y, orders, Const));
        magicFireballsCount--;
        hud.setMagicFireballs(magicFireballsCount);
    }
}
function createNewMagicIceball() {
    if (magicIceballsCount > 0) {
        magicIceballs.push(new MagicIceball(magicIceballImage, initialEnemiesPosition.x, initialEnemiesPosition.y, orders, Const));
        magicIceballsCount--;
        hud.setMagicIceballs(magicIceballsCount);
    }
}
function createNewMagicUFO() {
    if (magicUFOsCount > 0) {
        magicUFOs.push(new MagicUFO(magicUFOImage, initialEnemiesPosition.x, initialEnemiesPosition.y, orders, Const));
        magicUFOsCount--;
        hud.setMagicUFOs(magicUFOsCount);
    }
}
function createNewBoss(wave) {
    var endurance = wave * 25;
    var indexBossInEnemiesImages = 5;
    var isBoss = true;
    enemies.push(new Enemy(currentEnemyId, enemiesImages.slice.apply(enemiesImages, ImageUtils.getRangeImagesOfEnemy(indexBossInEnemiesImages)), initialEnemiesPosition, orders, endurance, isBoss, Const, Random, ProgressBar));
}
function handleEnemyExplosions() {
    var deadEnemies = enemies.filter(function (enemy) { return enemy.isDead(); });
    deadEnemies.forEach(function (enemy) {
        enemyExplosions.push(new EnemyExplosion(enemy.getPosition().x, enemy.getPosition().y, Const, ParticleSystem));
        var $increasedMoney = enemy.getEndurance() * Const.MONEY_MULTIPLICATOR;
        wallet.increase($increasedMoney);
        score.increase($increasedMoney * 2);
    });
}
function handleNewEnemyCreation() {
    if (allowCreateEnemies) {
        if (waveEnemies < Const.TOTAL_ENEMIES) {
            createEnemyTime++;
            if (createEnemyTime === Const.CREATE_ENEMY_MAX_TIME) {
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
    enemies = enemies.filter(function (enemy) { return enemy.isAlive(); });
}
function handleWinnerEnemies() {
    var winnerEnemies = enemies.filter(function (enemy) { return enemy.isWinner(); });
    winnerEnemies.forEach(function (enemy) {
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
    handleEnemyExplosions();
    removeDeadEnemies();
    enemies.forEach(function (enemy) {
        enemy.update();
    });
    handleWinnerEnemies();
}
function updateMouseOrangeTileOver() {
    mouseOrangeTileOver = getMouseOrangeTileOver();
}
function getMouseOrangeTileOver() {
    var result = orangeTiles.find(function (orangeTile) {
        return orangeTile.isInside(mouseX, mouseY);
    });
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
    magicFireballs.forEach(function (magicFireball) {
        magicFireball.update();
        checkMagicFireballCollides(magicFireball, enemies);
    });
    removeDeadFireballs();
}
function checkMagicFireballCollides(magicFireball, enemies) {
    enemies.forEach(function (enemy) {
        if (magicFireball.checkCollision(enemy)) {
            handleMagicFireballCollision(magicFireball, enemy);
        }
    });
}
function handleMagicFireballCollision(magicFireball, enemy) {
    magicFireball.addDamage(enemy);
    magicFireball.setToIgnoreList(enemy);
    newMagicFireballExplosion(enemy.getPosition().x, enemy.getPosition().y);
}
function newMagicFireballExplosion(posX, posY) {
    magicFireballExplosions.push(new MagicFireballExplosion(posX, posY, Const, ParticleSystem));
}
function removeDeadFireballs() {
    magicFireballs = magicFireballs.filter(function (fireball) { return fireball.isAlive(); });
}
function drawMagicFireballs() {
    magicFireballs.forEach(function (fireball) {
        fireball.draw();
    });
}
function updateMagicIceballs() {
    magicIceballs.forEach(function (iceball) {
        iceball.update();
        checkMagicIceballCollides(iceball, enemies);
    });
    removeDeadIceballs();
}
function checkMagicIceballCollides(magicIceball, enemies) {
    enemies.forEach(function (enemy) {
        if (magicIceball.checkCollision(enemy)) {
            handleMagicIceballCollision(magicIceball, enemy);
        }
    });
}
function handleMagicIceballCollision(magicIceball, enemy) {
    magicIceball.freeze(enemy);
    magicIceball.setToIgnoreList(enemy);
    newMagicIceballExplosion(enemy.getPosition().x, enemy.getPosition().y);
}
function newMagicIceballExplosion(posX, posY) {
    magicIceballExplosions.push(new MagicIceballExplosion(posX, posY, Const, ParticleSystem));
}
function removeDeadIceballs() {
    magicIceballs = magicIceballs.filter(function (iceball) { return iceball.isAlive(); });
}
function drawMagicIceballs() {
    magicIceballs.forEach(function (iceball) {
        iceball.draw();
    });
}
function updateMagicUFOs() {
    magicUFOs.forEach(function (ufo) {
        ufo.update();
    });
}
function drawMagicUFOs() {
    magicUFOs.forEach(function (ufo) {
        ufo.draw();
    });
}
function removeDeadExplosions() {
    enemyExplosions = enemyExplosions.filter(function (enemyExplosion) {
        return enemyExplosion.isActive();
    });
    magicFireballExplosions = magicFireballExplosions.filter(function (magicFireballExplosion) { return magicFireballExplosion.isActive(); });
    magicIceballExplosions = magicIceballExplosions.filter(function (magicIceballExplosion) { return magicIceballExplosion.isActive(); });
}
function updateExplosions() {
    enemyExplosions.forEach(function (enemyExplosion) {
        enemyExplosion.update();
    });
    magicFireballExplosions.forEach(function (magicFireballExplosion) {
        magicFireballExplosion.update();
    });
    magicIceballExplosions.forEach(function (magicIceballExplosion) {
        magicIceballExplosion.update();
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
    image(backgroundImage, 0, Const.HUD_HEIGHT);
    startTile.draw();
    endTile.draw();
    orangeTiles.forEach(function (orangeTile) {
        orangeTile.selectTarget(enemies);
        orangeTile.drawTile();
    });
    orangeTiles.forEach(function (orangeTile) {
        orangeTile.drawTower();
    });
    hud.draw();
    var canBuySelectedTower = canBuyNewTower(hud.getSelectedTower());
    var canBuyGreenTower = canBuyNewTower(Const.GREEN_TOWER);
    var canBuyRedTower = canBuyNewTower(Const.RED_TOWER);
    var canBuyYellowTower = canBuyNewTower(Const.YELLOW_TOWER);
    if (mouseOrangeTileOver !== null) {
        if (mouseOrangeTileOver.hasTower()) {
            var tileTower = mouseOrangeTileOver.getTower();
            hud.selectTowerHudType(tileTower);
            if (!tileTower.isMaxUpgraded()) {
                var canUpgrade = wallet.haveMoneyToBuy(tileTower.getType(), tileTower.getUpgradeLevel() + 1);
                hud.viewUpgradeCost(tileTower, canUpgrade);
                influenceArea.drawTowerInfluenceArea(tileTower, canUpgrade);
            }
            hud.viewSellProfit(tileTower);
        }
        else {
            influenceArea.drawHudTowerInfluenceArea(hud.getSelectedTower(), mouseOrangeTileOver.getPosition(), canBuySelectedTower);
            hud.setType(Const.HUD_NORMAL);
            hud.setCanBuy(canBuyGreenTower, canBuyRedTower, canBuyYellowTower);
            hud.hideUpgradeCost();
            hud.hideSellProfit();
        }
    }
    else {
        hud.setType(Const.HUD_NORMAL);
        hud.setCanBuy(canBuyGreenTower, canBuyRedTower, canBuyYellowTower);
        hud.hideUpgradeCost();
        hud.hideSellProfit();
    }
    enemies.forEach(function (enemy) {
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