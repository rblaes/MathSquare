/**
 * Created by bauer on 30.08.14.
 * @constructor
 */
function PrimeGenerator(a) {
    this.primeNumberList = a;
}

//a=possiblePrime
PrimeGenerator.prototype.isPrime = function(a) {
    if (0 == a % 2) {
        return!1;
    }
    for (var b = 0;b < this.primeNumberList.length;b++) {
        if (0 == a % this.primeNumberList[b]) {
            return!1;
        }
    }
    return!0;
};

PrimeGenerator.prototype.getPrimeNumberList = function() {
    return this.primeNumberList;
};

PrimeGenerator.prototype.generateNextPrime = function() {
    for (var a = this.primeNumberList[this.primeNumberList.length - 1] + 1;!this.isPrime(a);) {
        a++;
    }
    this.primeNumberList.push(a);
};

//a=nthPrimeLow
//b=nthPrimeHigh
PrimeGenerator.prototype.getRandomPrime = function(a, b) {
    for (;this.primeNumberList.length < b - 1;) {
        this.generateNextPrime();
    }
    return vlu = this.primeNumberList[a + Math.floor(Math.random() * (b - a - 1))];
};

//a=nthPrime
PrimeGenerator.prototype.getNthPrime = function(a) {
    for (;this.primeNumberList.length < a;) {
        this.generateNextPrime();
    }
    return this.primeNumberList[a - 1];
};