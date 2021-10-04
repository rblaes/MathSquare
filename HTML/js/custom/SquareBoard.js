/**
 * Created by bauer on 30.08.14.
 * @constructor
 */
function SquareBoard(primeGenerator, nthPrime, operator, maxOp) {
    this.boardColors = [  "#FFFF00", "#1CE6FF", "#FF34FF", "#FF4A46", "#008941", "#006FA6", "#A30059",
        "#FFDBE5", "#7A4900",  "#63FFAC", "#B79762", "#004D43", "#8FB0FF", "#997D87",
        "#809693", "#FEFFE6", "#1B4400", "#4FC601", "#3B5DFF", "#4A3B53", "#FF2F80",
        "#BA0900", "#6B7900", "#00C2A0", "#FFAA92", "#FF90C9", "#B903AA", "#D16100",
        "#DDEFFF",  "#7B4F4B", "#A1C299", "#0AA6D8",  "#00846F",
        "#FFB500", "#C2FFED", "#A079BF", "#CC0744", "#C0B9B2", "#C2FF99",
        "#00489C", "#6F0062", "#0CBD66", "#EEC3FF", "#456D75", "#B77B68", "#7A87A1", "#788D66",
        "#885578", "#FAD09F", "#FF8A9A", "#D157A0", "#BEC459", "#456648", "#0086ED", "#886F4C",

        "#B4A8BD", "#00A6AA",  "#A3C8C9", "#FF913F", "#938A81",
        "#00FECF", "#B05B6F", "#8CD0FF", "#3B9700", "#04F757", "#C8A1A1", "#1E6E00",
        "#7900D7", "#A77500", "#6367A9", "#A05837", "#D790FF", "#9B9700",
        "#549E79", "#FFF69F", "#72418F", "#BC23FF", "#99ADC0",  "#922329",
        "#5B4534", "#FDE8DC", "#404E55", "#0089A3", "#CB7E98", "#A4E804", "#324E72", "#6A3A4C",
        "#83AB58", "#D1F7CE", "#004B28", "#C8D0F6", "#A3A489", "#806C66",
        "#BF5650",  "#66796D", "#DA007C", "#FF1A59", "#8ADBB4", "#5B4E51",
        "#C895C5",  "#FF6832", "#66E1D3", "#CFCDAC", "#D0AC94", "#7ED379"];

    var self = this;

    this.primeGenerator =  primeGenerator;
    if (nthPrime == undefined || nthPrime == "NaN") {
        this.nthPrime = 5;
    } else {
        this.nthPrime = nthPrime;
    }
    this.operator = operator;
    this.maxOp = maxOp;




    this.numberUpdateListener = function(squareNumberItem) {
        var checkResult = self.squareGoal.checkGoal(self.squareNumbers);
        if (checkResult == 0) {
            self.squareGoal.newGoal(self.squareNumbers);
        }
        self.updateFunction(checkResult);

    };
    this.reset(this.nthPrime);


}

SquareBoard.prototype.reset = function(nthnumber) {
    this.nthPrime = nthnumber;
    this.squareNumbers = {};
    this.squareGoal = {};
    var colormap = {};
    var numbermap = {};
    var maxSet = false;

    lowestPrime = 0;
    if (this.nthPrime > 100) {
        lowestPrime = Math.floor(this.nthPrime * .25);
    }

    difficutlnumbers = 5;


    for (var i=0; i<24; i++) {
        var itemNumber = 0;
        if (maxSet == false && Math.random() <.3) {
            itemNumber = this.primeGenerator.getNthPrime(this.nthPrime);
            maxSet = true;
        } else if (this.nthPrime > 10 && difficutlnumbers > 0 && Math.random()<.3) {
            itemNumber = this.primeGenerator.getRandomPrime(Math.floor(this.nthPrime *.75),this.nthPrime);
            difficutlnumbers--;

        } else {
            itemNumber = this.primeGenerator.getRandomPrime(lowestPrime,this.nthPrime);

        }

        //check number?
        if (numbermap[itemNumber] != undefined) {

            this.squareNumbers["cell"+i] =new SquareNumber(i,itemNumber,numbermap[itemNumber],this.numberUpdateListener);

        } else {
            //getColor
            var color = this.boardColors[Math.floor(Math.random()*this.boardColors.length)];

            while(colormap[color] != undefined) {
                color = this.boardColors[Math.floor(Math.random()*this.boardColors.length)];


            }
            colormap[color] = itemNumber;
            numbermap[itemNumber] = color;
            this.squareNumbers["cell"+i] =new SquareNumber(i,itemNumber,numbermap[itemNumber],this.numberUpdateListener);


        }


    }
    this.squareGoal = new SquareGoal(this.squareNumbers, this.operator,this.maxOp);


};
SquareBoard.prototype.setUpdateListener = function(_updateFunction) {
    this.updateFunction = _updateFunction;

};

SquareBoard.prototype.getNumbersLeft = function() {
  var counting = 0;
    for (var i=0; i<24; i++) {
        if (this.squareNumbers["cell"+i].isNumberAvailable() == true)
            counting++;
    }
    return counting;

};

SquareBoard.prototype.getGoal = function() {
    return this.squareGoal;
};

SquareBoard.prototype.getSquareNumbers = function() {
    return this.squareNumbers;
};


