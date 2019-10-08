function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    let exprM = expr.replace(/\s+/g,'');
    let exprArr = [];
    for (let i = 0; i < exprM.length; i++) { //create expression array
        if (exprM[i] == '(' || exprM[i] == ')' || exprM[i] == '*' || exprM[i] == '/' ||
            exprM[i] == '+' || exprM[i] == '-') {
            if (i != 0) {
                exprArr.push(exprM.substring(0, i));
            }
            exprArr.push(exprM[i]);
            exprM = exprM.substring(i + 1);
            i = -1;
        }
    }
    if (exprM.length > 0) {
        exprArr.push(exprM);
    }

    let checkerClose = 0;
    let checkerOpen = 0;
    for (let i = 0; i < exprArr.length; i++) {
        if (exprArr[i] == ')') {
            checkerClose++;
        }
        if (exprArr[i] == '(') {
            checkerOpen++;
        }
    }
    if (checkerOpen != checkerClose) {
        throw new Error("ExpressionError: Brackets must be paired");
    }

    for (let i = 0; i < exprArr.length + 1; i++) {
        let exprNew = [];
        if(exprArr.indexOf(')') > 0) {
            exprNew = exprArr.filter((e, elem) => { //find priority part
                if (elem > exprArr.lastIndexOf('(', exprArr.indexOf(')')) && elem < exprArr.indexOf(')'))
                    return e;
            }); 
            exprArr.splice(exprArr.lastIndexOf('(', exprArr.indexOf(')')), exprArr.indexOf(')') - exprArr.lastIndexOf('(', exprArr.indexOf(')')) + 1, 'R');
            while (exprNew.length > 1) {
                while(exprNew.indexOf('/') > 0) {
                    if (Number(exprNew[exprNew.indexOf('/') + 1]) == 0) {
                        throw new Error("TypeError: Division by zero.");
                    }
                    exprNew.splice(exprNew.indexOf('/') - 1, 3, (Number(exprNew[exprNew.indexOf('/') - 1]) / Number(exprNew[exprNew.indexOf('/') + 1])));
                }
                while(exprNew.indexOf('*') > 0) {
                    exprNew.splice(exprNew.indexOf('*') - 1, 3, (Number(exprNew[exprNew.indexOf('*') - 1]) * Number(exprNew[exprNew.indexOf('*') + 1])));
                }
                while(exprNew.indexOf('-') > 0) {
                    exprNew.splice(exprNew.indexOf('-') - 1, 3, (Number(exprNew[exprNew.indexOf('-') - 1]) - Number(exprNew[exprNew.indexOf('-') + 1])));
                }
                while(exprNew.indexOf('+') > 0) {
                    exprNew.splice(exprNew.indexOf('+') - 1, 3, (Number(exprNew[exprNew.indexOf('+') - 1]) + Number(exprNew[exprNew.indexOf('+') + 1])));
                }
            }
            exprArr.splice(exprArr.indexOf('R'), 1, exprNew[0].toString());
            i = -1;
            continue;
        }
        else { // if has no brackets
            while (exprArr.length > 1) {
                while(exprArr.indexOf('/') > 0) {
                    if (Number(exprArr[exprArr.indexOf('/') + 1]) == 0) {
                        throw new Error("TypeError: Division by zero.");
                    }
                    exprArr.splice(exprArr.indexOf('/') - 1, 3, (Number(exprArr[exprArr.indexOf('/') - 1]) / Number(exprArr[exprArr.indexOf('/') + 1])));
                }
                while(exprArr.indexOf('*') > 0) {
                    exprArr.splice(exprArr.indexOf('*') - 1, 3, (Number(exprArr[exprArr.indexOf('*') - 1]) * Number(exprArr[exprArr.indexOf('*') + 1])));
                }
                while(exprArr.indexOf('-') > 0) {
                    exprArr.splice(exprArr.indexOf('-') - 1, 3, (Number(exprArr[exprArr.indexOf('-') - 1]) - Number(exprArr[exprArr.indexOf('-') + 1])));
                }
                while(exprArr.indexOf('+') > 0) {
                    exprArr.splice(exprArr.indexOf('+') - 1, 3, (Number(exprArr[exprArr.indexOf('+') - 1]) + Number(exprArr[exprArr.indexOf('+') + 1])));
                }
            }
        }
    }
    return Number(exprArr[0]);
}

module.exports = {
    expressionCalculator
}