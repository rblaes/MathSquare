/**
 * Created by bauer on 30.08.14.
 * @constructor
 */
function SquareNumber(item_position, numberValue, item_color, boardCallback) {
    this.item_position = item_position;
    this.value = numberValue;
    this.available = true;
    this.selected = false;
    this.item_color = item_color;
    this.boardCallback = boardCallback;
}

SquareNumber.prototype.deselect_noEvent = function() {
    this.selected = false;
};

SquareNumber.prototype.deactivate_noEvent = function() {
    this.available = false;
};

SquareNumber.prototype.getItemColor = function() {
      return this.item_color;

};

SquareNumber.prototype.getNumberValue = function() {
    return this.value;
};

SquareNumber.prototype.isNumberSelected = function() {
    return this.selected;
};

SquareNumber.prototype.isNumberAvailable = function() {
    return this.available;
};
SquareNumber.prototype.deactivateNumber = function() {
    this.available = false;
    this.boardCallback(this);

};

SquareNumber.prototype.selectNumber = function() {
    if (this.available == true) {
        this.selected = true;
        this.boardCallback(this);
    }
};

SquareNumber.prototype.deselectNumber = function() {
    if (this.available == true) {
        this.selected = false;
        this.boardCallback(this);
    }
};

SquareNumber.prototype.getItemId = function() {
    return "cell"+this.item_position;
};

