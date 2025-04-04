const getOperation = (operator) => {
    switch(operator) {
        case "+":
            return sum;
        case "-":
            return sub;
    }
}

const sum = (a, b) => {
    return a + b;
}

const sub = (a, b) => {
    return a - b;
}

const executeExpression = (string) => {
    let result = /([0-9]+)([+-])([0-9]+)/.match(string);
    return getOperation(result[1])(result[0],result[2]);
}