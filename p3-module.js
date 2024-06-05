

module.exports = {
    coinCount: coinCount
};


function validDenomination(coin) {
    const validCoinValues = [1, 5, 10, 25, 50 , 100]
    const isValid = validCoinValues.indexOf(coin) !== -1
    return isValid
}
//console.log(validDenomination(10))

function valueFromCoinObject(obj) {
    const {denom = 0, count = 0 } = obj
    return validDenomination(denom) ? denom * count : 0
}

function valueFromArray(arr) {
    return arr.reduce((total, current) => 
    {
        if (Array.isArray(current)) {
            return valueFromArray(current)
        }
        else {
            return total + valueFromCoinObject(current)
        }
    }, 0);
}

 function coinCount(...coinage) {
    return valueFromArray(coinage)
}

console.log("{}", coinCount({denom: 5, count: 3}));
console.log("{}s", coinCount({denom: 5, count: 3},{denom: 10, count: 2}));
const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
console.log("...[{}]", coinCount(...coins));
console.log("[{}]", coinCount(coins));  // Extra credit