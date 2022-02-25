function strip(number) {
    number = parseFloat(result).toPrecision(12);
    return(Number(number));
}

function add(a,b) {
    result = a+b;
    return(strip(result));
}

function subtract(a,b) {
    result = a-b
    return(strip(result));
}

function multiply(a,b) {
    result = a*b;
    return(strip(result));
}

function divide(a,b) {
    result = a/b;
    return(strip(result));
}

function operate(operator,a,b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '*':
            return(multiply(a,b))
            break;
        case '+':
            return(add(a,b))
            break;
        case '-':
            return(subtract(a,b))
            break;
        case '/':
            return(divide(a,b))
            break;
        default:
            break;
    }
}



function updateDisplay(obj) {
    if (obj.hasOwnProperty('op') && obj.hasOwnProperty('b')) {
        display.textContent = obj['a'].toString()+obj['op'].toString()+obj['b'].toString();
    } 
    
    else if (obj.hasOwnProperty('op')) {
        display.textContent = obj['a'].toString()+obj['op'].toString();
    }

    else if (obj.hasOwnProperty('a')) {
        display.textContent = obj['a'].toString();
        
    }
    
    else {
        display.textContent = '';

    }
}

//We use this to either create or add to a number as we type it.
function createOrAppend(obj, key, value) {
    obj.hasOwnProperty(key) ? obj[key] += value : obj[key] = value;
}

function pressNumber(e) {
    thisNumber = e['target']['textContent'].toString(); 
// check for state: are we displaying a result (as marked by '' being the operator)?
// if so, reset the calculator to a blank state and type the number
    if (calcArgs['op'] === '') {
        delete calcArgs['op'];
        delete calcArgs['a'];
        calcArgs['a'] = thisNumber;
    }
// Or, are we typing in a second argument (as marked by the operator being
// a non-empty string)? if so, create or append the number being pushed
// to the second argument 
    else if (calcArgs.hasOwnProperty('op') && calcArgs['op'] !== '' ) {
         createOrAppend(calcArgs,'b',thisNumber);
    }
// if the operator doesn't exist, it means we are typing in the first number.
    else {
        createOrAppend(calcArgs,'a',thisNumber);
    }
    updateDisplay(calcArgs);
}

function pressOperator(e) {
    thisOp = e['target']['textContent']; 
// check if a second argument is set (implying we have formed a valid expression)
// if that's the case: calculate the result, make it the start of a new calculation
// and add the operator we just pressed. 
    if (calcArgs.hasOwnProperty('b')) {
        result = operate(calcArgs['op'],calcArgs['a'],calcArgs['b']);
        calcArgs['a'] = result;
        calcArgs['op'] = thisOp;
        delete calcArgs['b'];
        updateDisplay(calcArgs);
    } 
//check if at least we have a first argument. if we do, we can append the operator to it.
    else if (calcArgs.hasOwnProperty('a')) {
        calcArgs['op'] =  thisOp;
        updateDisplay(calcArgs);
    }
// if not even the first argument is set, the screen is empty, so we do nothing

    
}

function pressEqual(e) {

    if (calcArgs.hasOwnProperty('op') && calcArgs.hasOwnProperty('b')) {
    result = operate(calcArgs['op'],calcArgs['a'],calcArgs['b']);
    calcArgs['a'] = result;
    calcArgs['op'] = '';
    delete calcArgs['b'];
    updateDisplay({a:result});
    }

    else {
        console.log('doing nothing');
    }
}

function pressClear(e) {
    delete calcArgs['op'];
    delete calcArgs['b'];
    delete calcArgs['a'];
    updateDisplay(calcArgs);
}

function logKey(e) {
    console.log(e);
}


const calcArgs = {};
const display = document.querySelector('.display');

const numberButtons = Array.from(document.querySelectorAll('.number'));
numberButtons.forEach(button => button.addEventListener('click', pressNumber));
const operatorButtons = Array.from(document.querySelectorAll('.operator'));
operatorButtons.forEach(button => button.addEventListener('click', pressOperator));
const equalsButton = document.querySelector('#equal');
equalsButton.addEventListener('click', pressEqual);
const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', pressClear);
document.addEventListener('keydown',logKey);