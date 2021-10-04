/**
 * Created by bauer on 30.08.14.
 * @constructor
 */
function SquareGame(h, e, f) {
    //h=config, e=updateFunction, f=solvedFunction
    var a = this;
    this.minOperations = this.maxOperations = 2;
    this.updateFunction = e;
    this.lastTriesStr = this.lastTimeStr = "";
    try {
        if (this.configurationData = jQuery.parseJSON(h), 0 !== this.configurationData.storyModeLevel5x5 % 1) {
            throw "Unreadable";
        }
    } catch (k) {
        this.configurationData = jQuery.parseJSON("{}"), this.configurationData.storyModeLevel5x5 = 5, this.configurationData.primeArray = [2, 3, 5, 7];
    }
    this.primeGenerator = new PrimeGenerator(this.configurationData.primeArray);
    this.maxPrime = this.configurationData.storyModeLevel5x5;
    this.squareBoard = new SquareBoard(this.primeGenerator, this.maxPrime, "+", 2);

    this.squareBoard.setUpdateListener(function(c) {
        1 == c && a.triesLeft--;
        0 == c && (a.timeLeft += 5);

        var b = a.timeLeft, d = Math.floor(b / 60), b = b - 60 * d, b = (10 > d ? "0" + d : d) + ":" + (10 > b ? "0" + b : b);

        0 >= a.triesLeft && (a.triesLeft = 0);
        d = a.triesLeft;
        a.lastTimeStr = b;
        a.lastTriesStr = d;
        var g = !1;
        1 == c && (g = !0);
        e(b, d, g);
        0 >= a.triesLeft || 0 >= a.timeLeft ? (a.redrawBoard(), f(!1)) : 0 == a.getSquareBoard().getGoal().getGoalValue() && (a.configurationData.storyModeLevel5x5 += 1, a.configurationData.primeArray = a.primeGenerator.getPrimeNumberList(), a.isPaused = !0, f(!0));
    });
    this.triesLeft = 3;
    this.timeLeft = 90;
    this.isPaused = !0;

    setInterval(function() {
        if (1 != a.isPaused) {
            a.timeLeft--;
            0 >= a.timeLeft && (a.timeLeft = 0);
            var c = a.timeLeft, b = Math.floor(c / 60), c = c - 60 * b, c = (10 > b ? "0" + b : b) + ":" + (10 > c ? "0" + c : c), b = a.triesLeft;
            a.lastTimeStr = c;
            a.lastTriesStr = b;
            e(c, b);
            if (0 >= a.triesLeft || 0 >= a.timeLeft) {
                a.redrawBoard(), f(!1);
            }
        }
    }, 990);
}

SquareGame.prototype.resetConfiguration = function() {
    this.maxPrime = 5;
    this.configurationData.storyModeLevel5x5 = 5;
};

SquareGame.prototype.getLevelData = function() {
    return JSON.stringify(this.configurationData);
};

SquareGame.prototype.redrawBoard = function() {
    this.timeLeft = 90;
    this.triesLeft = 3;
    this.squareBoard.reset(this.configurationData.storyModeLevel5x5);
    this.isPaused = !0;
};

SquareGame.prototype.getCurrentLevel = function() {
    return this.primeGenerator.getNthPrime(this.configurationData.storyModeLevel5x5);
};

SquareGame.prototype.startGame = function() {
    this.isPaused = !1;
};

SquareGame.prototype.isRunning = function() {
    return !this.isPaused;
};

SquareGame.prototype.pauseGame = function() {
    this.isPaused = !0;
};

SquareGame.prototype.getTriesLeft = function() {
    return this.lastTriesStr;
};

SquareGame.prototype.getTimeLeft = function() {
    return this.lastTimeStr;
};

SquareGame.prototype.getNumbersLeft = function() {
    return this.squareBoard.getNumbersLeft();
};

SquareGame.prototype.getMaxOperations = function() {
    return this.maxOperations;
};

SquareGame.prototype.getMinOperations = function() {
    return this.minOperations;
};

SquareGame.prototype.getMaxPrime = function() {
    return this.maxPrime;
};

SquareGame.prototype.getPrimeGenerator = function() {
    return this.primeGenerator;
};

SquareGame.prototype.getSquareBoard = function() {
    return this.squareBoard;
};