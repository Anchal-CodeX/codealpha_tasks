
const lower = document.querySelector('.lower');
const show = document.querySelector('.show');
const buttons = Array.from(document.querySelectorAll('button'));

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) return 'Error';
    return a / b;
}


// Recursive calculation
function calculate(expression) {

    expression = expression.replace(/\s/g, '');

    // First multiplication and division
    let match = expression.match(/(-?\d+(?:\.\d*)?|\.\d+)([*/])(-?\d+(?:\.\d*)?|\.\d+)/);

    if (match) {
        let a = Number(match[1]);
        let b = Number(match[3]);

        let result = match[2] === '*'
            ? multiply(a, b)
            : divide(a, b);

        if (result === 'Error') return result;

        expression = expression.replace(match[0], result);

        return calculate(expression);
    }

    // Then addition and subtraction
    match = expression.match(/(-?\d+(?:\.\d*)?|\.\d+)([+-])(-?\d+(?:\.\d*)?|\.\d+)/);

    if (match) {
        let a = Number(match[1]);
        let b = Number(match[3]);

        let result = match[2] === '+'
            ? add(a, b)
            : subtract(a, b);

        expression = expression.replace(match[0], result);

        return calculate(expression);
    }

    return Number(expression);
}

function equals() {
    try {
        let result = calculate(show.textContent);
        show.textContent = String(result);
    } catch {
        show.textContent = 'Error';
    }
}

function giveValue(index) {

    const values = {
        3: '/', 4: '7', 5: '8', 6: '9',
        7: '*', 8: '4', 9: '5', 10: '6',
        11: '-', 12: '1', 13: '2', 14: '3',
        15: '+', 17: '0', 18: '.'
    };

    if (index === 0) {
        show.textContent = '';

    } else if (index === 2) {
        show.textContent = show.textContent.slice(0, -1);

    }else if(index ===1){
        //percentile of that number
        show.textContent = String(calculate(show.textContent) / 100);
    }
    else if(index === 3){
        //! use only if the last character is a number
        if (!show.textContent || /[+\-*/]$/.test(show.textContent)) return;
        show.textContent += '/';
    }
    else if(index === 7){
        //! use only if the last character is a number
        if (!show.textContent || /[+\-*/]$/.test(show.textContent)) return;
        show.textContent += '*';
    }
    else if(index === 11){
       
        if (!show.textContent || /[+\-*/]$/.test(show.textContent)) return;
        show.textContent += '-';
    }
    else if(index === 15){
        if (!show.textContent || /[+\-*/]$/.test(show.textContent)) return;
        show.textContent += '+';
    }
    else if (index === 19) {
        equals();

    } else if (values[index] !== undefined) {
        show.textContent += values[index];
    }
}


function start() {
    buttons.forEach((value, index) => {
        value.addEventListener('click', () => {
            
            giveValue(index);
        });
    });
}

start();
