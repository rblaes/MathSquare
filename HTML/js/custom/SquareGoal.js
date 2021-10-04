/**
 * Created by bauer on 30.08.14.
 * @constructor
 */
function SquareGoal(a, c, b, d) {
    this.opMax = d;
    this.goalListener = c;
    this.operator = b;
    this.goalValue = 0;
    this.newGoal(a);
}

//a=boardNumbers
SquareGoal.prototype.newGoal = function(a) {
    this.goalValue = 0;
    for (var c = [], b = 0;24 > b;b++) {
        a["cell" + b].isNumberAvailable() && c.push(a["cell" + b]);
    }
    for (var b = c.length, d;0 !== b;) {
        d = Math.floor(Math.random() * b), b -= 1, a = c[b], c[b] = c[d], c[d] = a;
    }
    a = 2;
    a > c.length && (a = c.length);
    for (b = 0;0 < a;) {
        this.goalValue += c[b].getNumberValue(), a--, b++;
    }
};

//a=boardNumbers
SquareGoal.prototype.checkGoal = function(a) {
    for (var c = 0, b = [], d = 0;24 > d;d++) {
        1 == a["cell" + d].isNumberAvailable()
        && 1 == a["cell" + d].isNumberSelected()
        && (c += a["cell" + d].getNumberValue(), b.push(a["cell" + d]));
    }
    if (c == this.goalValue) {
        for (a = 0;a < b.length;a++) {
            b[a].deactivate_noEvent();
        }
        return 0;
    }
    if (c > this.goalValue) {
        for (a = 0;a < b.length;a++) {
            b[a].deselect_noEvent();
        }
        return 1;
    }
    return-1;
};

SquareGoal.prototype.getGoalValue = function() {
    return this.goalValue;
};