function eval() {
    // Do not use eval!!!
    return;
}

const isNumber = (letter) => isFinite(letter) && letter !== ' '

//RPN === Reverse Polish notation
function convertToRPN(infixStr) {
    const OPERATORS_PRIORITY = {
        "+": 1,
        "-": 1,
        "*": 2,
        "/": 2
    };
    let stack = [];
    let output = "";

    for (let i = 0; i < infixStr.length; ++i) {
        if (isNumber(infixStr[i])) {
            while (isNumber(infixStr[i])) {
                output += infixStr[i];
                ++i;
            }
            output += ' ';

            --i;
        }
        else if (infixStr[i] === '(') {
            stack.push(infixStr[i]);
        }
        else if (infixStr[i] === ')') {
            if (stack.indexOf('(') === -1)
                throw new SyntaxError(
                    "ExpressionError: Brackets must be paired");

            while (stack[stack.length - 1] !== '(') {
                output += stack.pop();
            }

            stack.pop();
        }
        else if ('+-*/'.indexOf(infixStr[i]) !== -1) {
            while (OPERATORS_PRIORITY[infixStr[i]] <= OPERATORS_PRIORITY[stack[stack.length - 1]]) {
                output += stack.pop();
            }

            stack.push(infixStr[i]);
        }
    }

    while (stack.length > 0) {
        if (stack[stack.length - 1] === '(')
            throw new Error(
                "ExpressionError: Brackets must be paired");
        output += stack.pop();
    }

    return output;
}

function expressionCalculator(expr) {
    let strRPN = convertToRPN(expr);
    let stack = [];

    for (let i = 0; i < strRPN.length; ++i) {
        if (isNumber(strRPN[i])) {
            let num = '';

            while (isNumber(strRPN[i])) {
                num += strRPN[i];
                ++i;
            }

            --i;
            stack.push(Number(num));
        }
        else if (strRPN[i] === ' ') { }
        else {
            let second = stack.pop();
            let first = stack.pop();

            switch (strRPN[i]) {
                case '+':
                    stack.push(first + second);
                    break;
                case '-':
                    stack.push(first - second);
                    break;
                case '*':
                    stack.push(first * second);
                    break;
                case '/':
                    if (second === 0)
                        throw new Error(
                            "TypeError: Division by zero.");
                    stack.push(first / second);
                    break;
                default:
                    break;
            }
        }
    }

    return stack.pop();
}

module.exports = {
    expressionCalculator
}
