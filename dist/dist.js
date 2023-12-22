var Const = (function () {
    function Const() {
    }
    Const.HUD_NORMAL = 1;
    Const.HUD_UPGRADING = 2;
    Const.HUD_UPGRADING_MAX = 3;
    Const.GREEN_TOWER = 1;
    Const.RED_TOWER = 2;
    Const.YELLOW_TOWER = 3;
    Const.GREEN_COLOR = [75, 185, 35];
    Const.RED_COLOR = [185, 35, 35];
    Const.YELLOW_COLOR = [202, 191, 24];
    Const.COST_UPGRADE_GREEN_TOWER = [50, 75, 125, 300, 1000, 2000];
    Const.COST_UPGRADE_RED_TOWER = [100, 150, 250, 500, 1300, 3000];
    Const.COST_UPGRADE_YELLOW_TOWER = [700, 2500, 7500, 22000, 67000, 200000];
    Const.LEFT_DIRECTION = 1;
    Const.RIGHT_DIRECTION = 2;
    Const.UP_DIRECTION = 3;
    Const.DOWN_DIRECTION = 4;
    Const.TILE_SIZE = 50;
    Const.UPGRADE_MAX_LEVEL = 5;
    Const.TOTAL_TOWER_UPGRADES = 5;
    Const.TOTAL_ENEMIES = 5;
    Const.CANVAS_WIDTH = 800;
    Const.CANVAS_HEIGHT = 580;
    Const.HUD_HEIGHT = 84;
    Const.KEY_1 = 49;
    Const.KEY_2 = 50;
    Const.KEY_3 = 51;
    Const.CREATE_ENEMY_MAX_TIME = 100;
    Const.TOWER_OFFSET = 5;
    Const.GREEN_TOWER_INFLUENCE_AREA = 150;
    Const.RED_TOWER_INFLUENCE_AREA = 240;
    Const.YELLOW_TOWER_INFLUENCE_AREA = 290;
    Const.ALPHA_INFLUENCE_AREA_FILL = 50;
    Const.ALPHA_INFLUENCE_AREA_STROKE = 120;
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
    Debug.showMouseCoordinates = function (px, py) {
        fill(255);
        stroke(0);
        strokeWeight(4);
        text("".concat(px, " - ").concat(py), 260, 18);
    };
    return Debug;
}());
var Distance = (function () {
    function Distance() {
    }
    Distance.twoPoints = function (ax, ay, bx, by) {
        return Math.sqrt((ax - bx) * (ax - bx) + (ay - by) * (ay - by));
    };
    return Distance;
}());
var EndTile = (function () {
    function EndTile(img, x, y) {
        this.img = img;
        this.x = x;
        this.y = y;
    }
    EndTile.prototype.draw = function () {
        image(this.img, this.x, this.y);
    };
    EndTile.prototype.getX = function () {
        return this.x;
    };
    EndTile.prototype.getY = function () {
        return this.y;
    };
    return EndTile;
}());
var Enemy = (function () {
    function Enemy(images, orders, startTile, endTile, Const, Random, HealthBar) {
        this.VELOCITY = 1;
        this.CHANGE_EYES_MAX_TIME = 50;
        this.EXTEND_CLOSED_EYES_MAX_TIME = 20;
        this.MIN_TIME_TO_CLOSE = 50;
        this.MAX_TIME_TO_CLOSE = 200;
        this.EYES_LEFT = 1;
        this.EYES_RIGHT = 2;
        this.EYES_CENTER = 0;
        this.EYES_CLOSED = 3;
        this.STATUS_ALIVE = 0;
        this.STATUS_DEAD = 1;
        this.images = images;
        this.orders = orders;
        this.startTile = startTile;
        this.endTile = endTile;
        this.Const = Const;
        this.Random = Random;
        this.HealthBar = HealthBar;
        this.imgIndex = this.EYES_CENTER;
        this.imgIndexBeforeEyesClosed = this.EYES_CENTER;
        this.eyesSequence = [
            this.EYES_LEFT,
            this.EYES_CENTER,
            this.EYES_RIGHT,
            this.EYES_CENTER,
        ];
        this.healthBar = new this.HealthBar(200, 200);
        this.status = this.STATUS_ALIVE;
        this.damage = 0;
        this.x = 0;
        this.y = 0;
        this.currentDirection = this.startTile.getStartDirection();
        this.moveCount = 0;
        this.indexOrder = 0;
        this.setInitialPosition();
        this.insidePath = false;
        this.endReached = false;
        this.changeEyesTime = 0;
        this.indexEyesSecuence = 0;
        this.closeEyesTime = 0;
        this.extendClosedEyesTime = 0;
        this.randomCloseEyes = 0;
    }
    Enemy.prototype.addDamage = function (shotDamage) {
        if (!this.healthBar.isFullOfDamage()) {
            this.damage += shotDamage;
            this.healthBar.setDamage(this.damage);
        }
        else {
            this.status = this.STATUS_DEAD;
        }
    };
    Enemy.prototype.isDead = function () {
        return this.status == this.STATUS_DEAD;
    };
    Enemy.prototype.isAlive = function () {
        return this.status == this.STATUS_ALIVE;
    };
    Enemy.prototype.reinitEnemy = function () {
        this.currentDirection = this.startTile.getStartDirection();
        this.moveCount = 0;
        this.indexOrder = 0;
        this.setInitialPosition();
        this.insidePath = false;
        this.endReached = false;
        this.changeEyesTime = 0;
        this.indexEyesSecuence = 0;
        this.closeEyesTime = 0;
        this.extendClosedEyesTime = 0;
        this._setRandomTimeMaxForClosingEyes();
    };
    Enemy.prototype.isEndReached = function () {
        return this.x === this.endTile.getX() && this.y === this.endTile.getY();
    };
    Enemy.prototype.setInitialPosition = function () {
        switch (this.currentDirection) {
            case this.Const.LEFT_DIRECTION:
                this.x = this.startTile.getX() + this.Const.TILE_SIZE;
                this.y = this.startTile.getY();
                break;
            case this.Const.RIGHT_DIRECTION:
                this.x = this.startTile.getX() - this.Const.TILE_SIZE;
                this.y = this.startTile.getY();
                break;
            case this.Const.UP_DIRECTION:
                this.x = this.startTile.getX();
                this.y = this.startTile.getY() + this.Const.TILE_SIZE;
                break;
            case this.Const.DOWN_DIRECTION:
                this.x = this.startTile.getX();
                this.y = this.startTile.getY() - this.Const.TILE_SIZE;
                break;
        }
    };
    Enemy.prototype.update = function () {
        switch (this.currentDirection) {
            case this.Const.LEFT_DIRECTION:
                this.x = this.x - this.VELOCITY;
                break;
            case this.Const.RIGHT_DIRECTION:
                this.x = this.x + this.VELOCITY;
                break;
            case this.Const.UP_DIRECTION:
                this.y = this.y - this.VELOCITY;
                break;
            case this.Const.DOWN_DIRECTION:
                this.y = this.y + this.VELOCITY;
                break;
        }
        this.moveCount = this.moveCount + this.VELOCITY;
        if (this.moveCount === this.Const.TILE_SIZE && this.endReached) {
            this.reinitEnemy();
        }
        if (this.moveCount === this.Const.TILE_SIZE) {
            this.moveCount = 0;
            if (this.isEndReached()) {
                this.endReached = true;
            }
            if (!this.endReached) {
                if (this.insidePath) {
                    this.indexOrder++;
                    this.currentDirection = this.orders[this.indexOrder];
                }
                else {
                    this.insidePath = true;
                }
            }
        }
    };
    Enemy.prototype._hasOpenEyes = function () {
        return this.imgIndex != this.EYES_CLOSED;
    };
    Enemy.prototype._moveEyesInSequence = function () {
        this.changeEyesTime++;
        if (this.changeEyesTime > this.CHANGE_EYES_MAX_TIME) {
            this.changeEyesTime = 0;
            this.indexEyesSecuence++;
            if (this.indexEyesSecuence == this.eyesSequence.length) {
                this.indexEyesSecuence = 0;
            }
            this.imgIndex = this.eyesSequence[this.indexEyesSecuence];
        }
    };
    Enemy.prototype._setRandomTimeMaxForClosingEyes = function () {
        this.randomCloseEyes = this.Random.integerBetween(this.MIN_TIME_TO_CLOSE, this.MAX_TIME_TO_CLOSE);
    };
    Enemy.prototype._changeEyes = function () {
        if (this._hasOpenEyes()) {
            this.closeEyesTime++;
            if (this.closeEyesTime > this.randomCloseEyes) {
                this.closeEyesTime = 0;
                this._setRandomTimeMaxForClosingEyes();
                this.imgIndexBeforeEyesClosed = this.imgIndex;
                this.imgIndex = this.EYES_CLOSED;
            }
            this._moveEyesInSequence();
        }
        else {
            this.extendClosedEyesTime++;
            if (this.extendClosedEyesTime > this.EXTEND_CLOSED_EYES_MAX_TIME) {
                this.extendClosedEyesTime = 0;
                this.imgIndex = this.imgIndexBeforeEyesClosed;
            }
        }
    };
    Enemy.prototype.getX = function () {
        return this.x;
    };
    Enemy.prototype.getY = function () {
        return this.y;
    };
    Enemy.prototype.draw = function () {
        this._changeEyes();
        image(this.images[this.imgIndex], this.x, this.y);
        this.healthBar.setPosition(this.x, this.y - 20);
        this.healthBar.draw();
    };
    return Enemy;
}());
var GreenTower = (function () {
    function GreenTower(images, x, y, Const, Distance) {
        this.UPGRADE_INFLUENCE_AREA = [150, 180, 220, 300, 400, 550];
        this.images = images;
        this.x = x;
        this.y = y;
        this.Const = Const;
        this.Distance = Distance;
        this.upgradeLevel = 0;
        this.enemyTarget = null;
        this.distanceToEnemyTarget = 0;
    }
    GreenTower.prototype.upgrade = function () {
        this.upgradeLevel++;
    };
    GreenTower.prototype.getX = function () {
        return this.x;
    };
    GreenTower.prototype.getY = function () {
        return this.y;
    };
    GreenTower.prototype.getUpgradeLevel = function () {
        return this.upgradeLevel;
    };
    GreenTower.prototype._drawShotToEnemy = function () {
        strokeWeight(3);
        stroke(this.Const.RED_COLOR);
        line(-1, -18, 7 - this.distanceToEnemyTarget / 7, -this.distanceToEnemyTarget);
    };
    GreenTower.prototype.draw = function () {
        if (this.enemyTarget) {
            var r_dx = this.enemyTarget.getX() - this.x;
            var r_dy = this.enemyTarget.getY() - this.y;
            var angle = Math.atan2(r_dy, r_dx) + 1.55;
            var cos_a = cos(angle);
            var sin_a = sin(angle);
            imageMode(CENTER);
            applyMatrix(cos_a, sin_a, -sin_a, cos_a, this.x + 30, this.y + 30);
            this._drawShotToEnemy();
            this.enemyTarget.addDamage(1);
            image(this.images[this.upgradeLevel], 0, 0);
            resetMatrix();
            imageMode(CORNER);
        }
        else {
            image(this.images[this.upgradeLevel], this.x, this.y);
        }
    };
    GreenTower.prototype.getInfluenceArea = function () {
        return this.UPGRADE_INFLUENCE_AREA[this.upgradeLevel];
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
    GreenTower.prototype.getType = function () {
        return this.Const.GREEN_TOWER;
    };
    GreenTower.prototype.getColor = function () {
        return this.Const.GREEN_COLOR;
    };
    GreenTower.prototype._isDistanceIntoInfluenceArea = function (distance) {
        return distance <= this.UPGRADE_INFLUENCE_AREA[this.upgradeLevel] / 1.65;
    };
    GreenTower.prototype.selectTarget = function (enemies) {
        var _this = this;
        var minDistance = 99999;
        var enemyTarget = null;
        enemies.forEach(function (enemy) {
            var distance = _this.Distance.twoPoints(_this.x, _this.y, enemy.getX(), enemy.getY());
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
var HealthBar = (function () {
    function HealthBar(x, y) {
        this.MAX_DAMAGE = 26;
        this.x = x;
        this.y = y;
        this.damage = 0;
        this.fullOfDamage = false;
    }
    HealthBar.prototype.setPosition = function (x, y) {
        this.x = x;
        this.y = y;
    };
    HealthBar.prototype.setDamage = function (damage) {
        this.damage = damage;
    };
    HealthBar.prototype.isFullOfDamage = function () {
        return this.damage >= this.MAX_DAMAGE;
    };
    HealthBar.prototype._drawBackgroundBar = function () {
        strokeWeight(1);
        fill('green');
        rect(this.x + 10, this.y + 20, 27, 7);
    };
    HealthBar.prototype._drawDamageBar = function () {
        strokeWeight(0);
        fill('red');
        rect(this.x + 11, this.y + 21, this.damage, 5);
    };
    HealthBar.prototype.draw = function () {
        this._drawBackgroundBar();
        if (this.damage > 0) {
            this._drawDamageBar();
        }
    };
    return HealthBar;
}());
var Hud = (function () {
    function Hud(hudImages, money, Const) {
        this.hudImages = hudImages;
        this.money = money;
        this.Const = Const;
        this.hudNormal = this.hudImages[0];
        this.hudUpgrading = this.hudImages[1];
        this.hudUpgradingMax = this.hudImages[2];
        this.hudType = this.Const.HUD_NORMAL;
        this.selectedItem = this.Const.GREEN_TOWER;
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
    Hud.prototype.selectTower = function (towerType) {
        this.selectedItem = towerType;
    };
    Hud.prototype.getSelectedTower = function () {
        return this.selectedItem;
    };
    Hud.prototype.setType = function (hudType) {
        this.hudType = hudType;
    };
    Hud.prototype.draw = function () {
        switch (this.hudType) {
            case this.Const.HUD_NORMAL:
                image(this.hudNormal, 0, 0);
                this._drawSelectedItem();
                this._drawLevelTitle();
                break;
            case this.Const.HUD_UPGRADING:
                image(this.hudUpgrading, 0, 0);
                break;
            case this.Const.HUD_UPGRADING_MAX:
                image(this.hudUpgradingMax, 0, 0);
                break;
        }
        this._drawMoney();
    };
    Hud.prototype.setMoney = function (money) {
        this.money = money;
    };
    Hud.prototype._drawMoney = function () {
        fill(255);
        stroke(0);
        strokeWeight(4);
        text(this.money, 445, 48);
    };
    Hud.prototype._drawLevelTitle = function () {
        fill(255);
        stroke(0);
        strokeWeight(4);
        text('Serpent by Ocliboy', 130, 18);
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
                square(139, 36, 37);
                break;
            case this.Const.YELLOW_TOWER:
                square(224, 36, 37);
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
    InfluenceArea.prototype._setInfluenceAreaColor = function (towerType) {
        switch (towerType) {
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
    InfluenceArea.prototype.drawHudTowerInfluenceArea = function (hudTowerSelected, x, y) {
        strokeWeight(2);
        this._setInfluenceAreaColor(hudTowerSelected);
        this._drawCircle(x, y, this._getInfluenceAreaFor(hudTowerSelected));
    };
    InfluenceArea.prototype.drawTowerInfluenceArea = function (tower) {
        strokeWeight(2);
        var x = tower.getX();
        var y = tower.getY();
        if (tower.getType() === this.Const.GREEN_TOWER ||
            tower.getType() === this.Const.RED_TOWER) {
            x += this.Const.TOWER_OFFSET;
            y += this.Const.TOWER_OFFSET;
        }
        this._setInfluenceAreaColor(tower.getType());
        this._drawCircle(x, y, tower.getInfluenceArea());
    };
    InfluenceArea.prototype._drawCircle = function (x, y, diameter) {
        circle(x + this.Const.TILE_SIZE / 2, y + this.Const.TILE_SIZE / 2, diameter);
    };
    return InfluenceArea;
}());
var OrangeTile = (function () {
    function OrangeTile(img, x, y, Const, UpgradeDisplay, towerGenerator) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.Const = Const;
        this.UpgradeDisplay = UpgradeDisplay;
        this.towerGenerator = towerGenerator;
        this.tower = null;
        this.upgradeDisplay = null;
    }
    OrangeTile.prototype.sellTower = function () {
        var profit = 0;
        if (this.tower) {
            profit = this.tower.getCost();
            this.tower = null;
        }
        return profit;
    };
    OrangeTile.prototype._showUpgradeDisplay = function (towerType) {
        if (this.upgradeDisplay === null) {
            this.upgradeDisplay = new this.UpgradeDisplay(this.x, this.y, this.tower.getColor());
        }
    };
    OrangeTile.prototype.buyTower = function (towerType) {
        var cost = 0;
        if (this.tower === null) {
            this.tower = this.towerGenerator.newTower(towerType, this.x, this.y);
            cost = this.tower.getCost();
        }
        else {
            var currentUpgradeLevel = this.tower.getUpgradeLevel();
            if (currentUpgradeLevel < this.Const.UPGRADE_MAX_LEVEL) {
                this._showUpgradeDisplay(towerType);
                cost = this.tower.getCostWhenUpgradeLevelIs(currentUpgradeLevel + 1);
            }
        }
        return cost;
    };
    OrangeTile.prototype.updateUpgradeDisplay = function () {
        if (this.upgradeDisplay) {
            if (this.upgradeDisplay.isFinished()) {
                this.upgradeDisplay = null;
                this._upgradeTower();
            }
        }
    };
    OrangeTile.prototype._upgradeTower = function () {
        if (this.tower) {
            this.tower.upgrade();
        }
    };
    OrangeTile.prototype.drawTile = function () {
        image(this.img, this.x, this.y);
    };
    OrangeTile.prototype.drawUpgradeDisplay = function () {
        if (this.upgradeDisplay) {
            this.upgradeDisplay.draw();
        }
    };
    OrangeTile.prototype.drawTower = function () {
        if (this.tower && this.upgradeDisplay === null) {
            this.tower.draw();
        }
    };
    OrangeTile.prototype.getX = function () {
        return this.x;
    };
    OrangeTile.prototype.getY = function () {
        return this.y;
    };
    OrangeTile.prototype.selectTarget = function (enemies) {
        if (this.tower) {
            this.tower.selectTarget(enemies);
        }
    };
    OrangeTile.prototype.isInside = function (mouse_x, mouse_y) {
        var insideX = false;
        var insideY = false;
        if (this.x < mouse_x && this.x + this.Const.TILE_SIZE > mouse_x) {
            insideX = true;
        }
        if (this.y < mouse_y && this.y + this.Const.TILE_SIZE > mouse_y) {
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
var Path = (function () {
    function Path(startTile, endTile, pathTiles, Const) {
        this.MAX_SEARCHES = 5000;
        this.startTile = startTile;
        this.endTile = endTile;
        this.pathTiles = pathTiles;
        this.Const = Const;
    }
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
        var endPx = this.endTile.getX();
        var endPy = this.endTile.getY();
        if (searchPx === endPx && searchPy === endPy) {
            return true;
        }
        return false;
    };
    Path.prototype.makeOrders = function () {
        var orders = [];
        var currentTile = this.startTile;
        var currentDirection = this.startTile.getStartDirection();
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
var Random = (function () {
    function Random() {
    }
    Random.integerBetween = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    return Random;
}());
var RedTower = (function () {
    function RedTower(images, x, y, Const) {
        this.UPGRADE_INFLUENCE_AREA = [150, 180, 220, 300, 400, 550];
        this.images = images;
        this.x = x;
        this.y = y;
        this.Const = Const;
        this.upgradeLevel = 0;
    }
    RedTower.prototype.upgrade = function () {
        this.upgradeLevel++;
    };
    RedTower.prototype.getX = function () {
        return this.x;
    };
    RedTower.prototype.getY = function () {
        return this.y;
    };
    RedTower.prototype.getUpgradeLevel = function () {
        return this.upgradeLevel;
    };
    RedTower.prototype.draw = function () {
        image(this.images[this.upgradeLevel], this.x, this.y);
    };
    RedTower.prototype.getInfluenceArea = function () {
        return this.UPGRADE_INFLUENCE_AREA[this.upgradeLevel];
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
var StartTile = (function () {
    function StartTile(img, x, y, startDirection) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.startDirection = startDirection;
    }
    StartTile.prototype.draw = function () {
        image(this.img, this.x, this.y);
    };
    StartTile.prototype.getX = function () {
        return this.x;
    };
    StartTile.prototype.getY = function () {
        return this.y;
    };
    StartTile.prototype.getStartDirection = function () {
        return this.startDirection;
    };
    return StartTile;
}());
var TileGenerator = (function () {
    function TileGenerator(levelMap, mapImages, Const, OrangeTile, PathTile, StartTile, EndTile, UpgradeDisplay, towerGenerator) {
        this.FLOOR_SIZE = 50;
        this.MARGIN_TOP = 30;
        this.levelMap = levelMap;
        this.mapImages = mapImages;
        this.Const = Const;
        this.OrangeTile = OrangeTile;
        this.PathTile = PathTile;
        this.StartTile = StartTile;
        this.EndTile = EndTile;
        this.UpgradeDisplay = UpgradeDisplay;
        this.towerGenerator = towerGenerator;
        if (this.levelMap === '') {
            throw new Error('Level map string cannot be empty');
        }
        var levelMapParts = this.levelMap.split('@');
        this.levelMapData = levelMapParts[1];
        this._setStartImage(mapImages);
        this._setEndImage(mapImages);
        this.levelMap = levelMapParts[0];
        this.orangeImage = mapImages[0];
        this.blackImage = mapImages[1];
        this.startDirection = Const.LEFT_DIRECTION;
    }
    TileGenerator.prototype._setStartImage = function (mapImages) {
        var levelMapDataParts = this.levelMapData.split(',');
        var startOrientation = levelMapDataParts[0];
        switch (startOrientation) {
            case '1':
                this.startImage = mapImages[6];
                this.startDirection = this.Const.DOWN_DIRECTION;
                break;
            case '2':
                this.startImage = mapImages[7];
                this.startDirection = this.Const.RIGHT_DIRECTION;
                break;
            case '3':
                this.startImage = mapImages[8];
                this.startDirection = this.Const.LEFT_DIRECTION;
                break;
            case '4':
                this.startImage = mapImages[9];
                this.startDirection = this.Const.UP_DIRECTION;
                break;
        }
    };
    TileGenerator.prototype._setEndImage = function (mapImages) {
        var levelMapDataParts = this.levelMapData.split(',');
        var endOrientation = levelMapDataParts[1];
        switch (endOrientation) {
            case '1':
                this.endImage = mapImages[2];
                break;
            case '2':
                this.endImage = mapImages[3];
                break;
            case '3':
                this.endImage = mapImages[4];
                break;
            case '4':
                this.endImage = mapImages[5];
                break;
        }
    };
    TileGenerator.prototype._extractTiles = function (symbol) {
        var _this = this;
        var resultTiles = [];
        var mapArray = this.levelMap.split(',');
        var rowCount = 0;
        mapArray.forEach(function (row) {
            var trimmedRow = row.trim();
            rowCount++;
            for (var column = 0; column < trimmedRow.length; column++) {
                var character = trimmedRow[column];
                var posX = _this.FLOOR_SIZE * column;
                var posY = _this.FLOOR_SIZE * rowCount + _this.MARGIN_TOP;
                if (character === symbol) {
                    switch (symbol) {
                        case '0':
                            resultTiles.push(new _this.OrangeTile(_this.orangeImage, posX, posY, _this.Const, _this.UpgradeDisplay, _this.towerGenerator));
                            break;
                        case '1':
                            resultTiles.push(new _this.PathTile(posX, posY));
                            break;
                        case 'x':
                            resultTiles.push(new _this.StartTile(_this.startImage, posX, posY, _this.startDirection));
                            break;
                        case 'y':
                            resultTiles.push(new _this.EndTile(_this.endImage, posX, posY));
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
        var levelMapDataParts = this.levelMapData.split(',');
        var initialMoney = levelMapDataParts[4];
        return Number(initialMoney);
    };
    return TileGenerator;
}());
var TowerGenerator = (function () {
    function TowerGenerator(greenTowerImages, redTowerImages, yellowTowerImages, Const, GreenTower, RedTower, YellowTower, Distance) {
        this.greenTowerImages = greenTowerImages;
        this.redTowerImages = redTowerImages;
        this.yellowTowerImages = yellowTowerImages;
        this.Const = Const;
        this.GreenTower = GreenTower;
        this.RedTower = RedTower;
        this.YellowTower = YellowTower;
        this.Distance = Distance;
    }
    TowerGenerator.prototype.newTower = function (towerType, x, y) {
        var tower = null;
        switch (towerType) {
            case this.Const.GREEN_TOWER:
                tower = new this.GreenTower(this.greenTowerImages, x - this.Const.TOWER_OFFSET, y - this.Const.TOWER_OFFSET, this.Const, this.Distance);
                break;
            case this.Const.RED_TOWER:
                tower = new this.RedTower(this.redTowerImages, x - this.Const.TOWER_OFFSET, y - this.Const.TOWER_OFFSET, this.Const, this.Distance);
                break;
            case this.Const.YELLOW_TOWER:
                tower = new this.YellowTower(this.yellowTowerImages, x, y, this.Const, this.Distance);
                break;
            default:
                break;
        }
        return tower;
    };
    return TowerGenerator;
}());
var UpgradeDisplay = (function () {
    function UpgradeDisplay(x, y, color) {
        this.SIZE_UPGRADE_TILE = 48;
        this.TIME_UPGRADE_0_MAX = 2;
        this.MAX_CAPACITY = 23;
        this.x = x;
        this.y = y;
        this.color = color;
        this.timeUpgrade = 0;
        this.capacity = 0;
        this.finished = false;
    }
    UpgradeDisplay.prototype._update = function () {
        if (this.capacity < this.MAX_CAPACITY) {
            this.timeUpgrade++;
            if (this.timeUpgrade > this.TIME_UPGRADE_0_MAX) {
                this.timeUpgrade = 0;
                this.capacity++;
            }
        }
        else {
            this.finished = true;
        }
    };
    UpgradeDisplay.prototype.isFinished = function () {
        return this.finished;
    };
    UpgradeDisplay.prototype._drawBackgroundTile = function () {
        noStroke();
        fill(this.color);
        rect(this.x, this.y, this.SIZE_UPGRADE_TILE);
    };
    UpgradeDisplay.prototype._drawBackgroundBar = function () {
        fill('white');
        rect(this.x + 10, this.y + 20, 27, 10);
    };
    UpgradeDisplay.prototype._drawBar = function () {
        fill(this.color);
        rect(this.x + 12, this.y + 22, this.capacity, 6);
    };
    UpgradeDisplay.prototype.draw = function () {
        this._update();
        this._drawBackgroundTile();
        this._drawBackgroundBar();
        this._drawBar();
    };
    return UpgradeDisplay;
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
    Wallet.prototype.haveMoneyToBuy = function (towerType, upgradeLevel) {
        var canBuy = false;
        switch (towerType) {
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
    function YellowTower(images, x, y, Const) {
        this.UPGRADE_INFLUENCE_AREA = [150, 180, 220, 300, 400, 550];
        this.images = images;
        this.x = x;
        this.y = y;
        this.Const = Const;
        this.upgradeLevel = 0;
    }
    YellowTower.prototype.upgrade = function () {
        this.upgradeLevel++;
    };
    YellowTower.prototype.getX = function () {
        return this.x;
    };
    YellowTower.prototype.getY = function () {
        return this.y;
    };
    YellowTower.prototype.getUpgradeLevel = function () {
        return this.upgradeLevel;
    };
    YellowTower.prototype.draw = function () {
        image(this.images[this.upgradeLevel], this.x, this.y);
    };
    YellowTower.prototype.getInfluenceArea = function () {
        return this.UPGRADE_INFLUENCE_AREA[this.upgradeLevel];
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
var backgroundImage;
var enemiesImages;
var towerGenerator;
var influenceArea;
function preload() {
    greenTowerImages = [];
    redTowerImages = [];
    yellowTowerImages = [];
    enemiesImages = [];
    CustomRange.make(0, Const.TOTAL_TOWER_UPGRADES).forEach(function (v) {
        greenTowerImages.push(loadImage('img/towers/green_tower_upgrade_' + v + '.png'));
        redTowerImages.push(loadImage('img/towers/red_tower_upgrade_' + v + '.png'));
        yellowTowerImages.push(loadImage('img/towers/yellow_tower_upgrade_' + v + '.png'));
    });
    CustomRange.make(1, Const.TOTAL_ENEMIES).forEach(function (v) {
        enemiesImages.push(loadImage('img/enemies/' + v + '_center.png'));
        enemiesImages.push(loadImage('img/enemies/' + v + '_left.png'));
        enemiesImages.push(loadImage('img/enemies/' + v + '_right.png'));
        enemiesImages.push(loadImage('img/enemies/' + v + '_closed.png'));
    });
    tileImages = [
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
    hudImages = [
        loadImage('img/hud/normal.png'),
        loadImage('img/hud/upgrading.png'),
        loadImage('img/hud/upgrading_max.png'),
    ];
    backgroundImage = loadImage('img/backgrounds/ground.jpg');
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
    var levelMap = "111111111111111x,\n                    1000000000000000,\n                    1011111111111111,\n                    1010000000000001,\n                    1010000111111101,\n                    1011111100000101,\n                    1000000000000101,\n                    1111111111111101,\n                    0000000000000001,\n                    y111111111111111@3,2,-50,450,150";
    createEnemyTime = 0;
    towerGenerator = new TowerGenerator(greenTowerImages, redTowerImages, yellowTowerImages, Const, GreenTower, RedTower, YellowTower, Distance);
    var tileGenerator = new TileGenerator(levelMap, tileImages, Const, OrangeTile, PathTile, StartTile, EndTile, UpgradeDisplay, towerGenerator);
    orangeTiles = tileGenerator.orangeTiles();
    startTile = tileGenerator.startTile();
    endTile = tileGenerator.endTile();
    var pathTiles = tileGenerator.pathTiles();
    var path = new Path(startTile, endTile, pathTiles, Const);
    orders = path.makeOrders();
    wallet = new Wallet(tileGenerator.getInitialMoney(), Const);
    hud = new Hud(hudImages, wallet.getMoney(), Const);
    wave = 1;
    waveEnemies = 0;
    enemies = [];
    influenceArea = new InfluenceArea(Const);
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
function canBuyNewTower(tower) {
    var canBuy = false;
    var zeroUpgradeLevel = 0;
    if (wallet.haveMoneyToBuy(hud.getSelectedTower(), zeroUpgradeLevel)) {
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
        result = canBuyNewTower(tower);
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
}
function handleSellTower() {
    var profit = mouseOrangeTileOver.sellTower();
    wallet.increase(profit);
    hud.setMoney(wallet.getMoney());
}
function handleBuyTower() {
    if (canBuyTower(mouseOrangeTileOver.getTower())) {
        var cost = mouseOrangeTileOver.buyTower(hud.getSelectedTower());
        wallet.decrease(cost);
        hud.setMoney(wallet.getMoney());
    }
}
function mouseClicked() {
    if (hud.isInsideButtonsBar(mouseX, mouseY)) {
        handleHudButtons();
        return;
    }
    if (mouseOrangeTileOver !== null) {
        if (mouseButton === RIGHT && mouseOrangeTileOver.hasTower()) {
            handleSellTower();
        }
        if (mouseButton === LEFT) {
            handleBuyTower();
        }
    }
}
function createNewEnemy(waveEnemy) {
    enemies.push(new Enemy(enemiesImages.slice.apply(enemiesImages, ImageUtils.getRangeImagesOfEnemy(waveEnemy)), orders, startTile, endTile, Const, Random, HealthBar));
}
function updateEnemies() {
    if (waveEnemies < Const.TOTAL_ENEMIES) {
        createEnemyTime++;
        if (createEnemyTime === Const.CREATE_ENEMY_MAX_TIME) {
            createEnemyTime = 0;
            createNewEnemy(waveEnemies);
            waveEnemies++;
        }
    }
    enemies = enemies.filter(function (enemy) { return enemy.isAlive(); });
    enemies.forEach(function (enemy) {
        enemy.update();
    });
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
function draw() {
    updateEnemies();
    updateMouseOrangeTileOver();
    background('skyblue');
    rectMode(CORNER);
    image(backgroundImage, 0, Const.HUD_HEIGHT);
    enemies.forEach(function (enemy) {
        enemy.draw();
    });
    startTile.draw();
    endTile.draw();
    orangeTiles.forEach(function (orangeTile) {
        orangeTile.selectTarget(enemies);
        orangeTile.updateUpgradeDisplay();
        orangeTile.drawTile();
        orangeTile.drawUpgradeDisplay();
    });
    orangeTiles.forEach(function (orangeTile) {
        orangeTile.drawTower();
    });
    hud.draw();
    if (mouseOrangeTileOver !== null) {
        if (mouseOrangeTileOver.hasTower()) {
            influenceArea.drawTowerInfluenceArea(mouseOrangeTileOver.getTower());
            hud.selectTowerHudType(mouseOrangeTileOver.getTower());
        }
        else {
            influenceArea.drawHudTowerInfluenceArea(hud.getSelectedTower(), mouseOrangeTileOver.getX(), mouseOrangeTileOver.getY());
            hud.setType(Const.HUD_NORMAL);
        }
    }
    else {
        hud.setType(Const.HUD_NORMAL);
    }
    Debug.showMouseCoordinates(mouseX, mouseY);
}
//# sourceMappingURL=dist.js.map