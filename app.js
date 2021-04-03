//creating an array of objects to store the key datas...
const calculatorButtons = [
    {
        name: 'delete',
        symbol: '☒',
        formula: false,
        type: 'key'
    },
    {
        name: 'clear',
        symbol: 'C',
        formula: false,
        type: 'key'
    },
    {
        name: 'percent',
        symbol: '%',
        formula: '/100',
        type: 'number'  
    },
    {
        name: 'division',
        symbol: '÷',
        formula: '/',
        type: 'operator'
    },
    {
        name: '7',
        symbol: 7,
        formula: 7,
        type: 'number' 
    },
    {
        name: '8',
        symbol: 8,
        formula: 8,
        type: 'number'
    },
    {
        name: '9',
        symbol: 9,
        formula: 9,
        type: 'number'
    },
    {
        name: 'multiply',
        symbol: 'x',
        formula: '*',
        type: 'operator'
    },
    {
        name: '4',
        symbol: 4,
        formula: 4,
        type: 'number'
    },
    {
        name: '5',
        symbol: 5,
        formula: 5,
        type: 'number'
    },
    {
        name: '6',
        symbol: 6,
        formula: 6,
        type: 'number'
    },
    {
        name: 'add',
        symbol: '+',
        formula: '+',
        type: 'operator'
    },
    {
        name: '1',
        symbol: 1,
        formula: 1,
        type: 'number'
    },
    {
        name: '2',
        symbol: 2,
        formula: 2,
        type: 'number'
    },
    {
        name: '3',
        symbol: 3,
        formula: 3,
        type: 'number'
    },
    {
        name: 'subtract',
        symbol: '-',
        formula: '-',
        type: 'operator'
    },
    {
        name: '0',
        symbol: 0,
        formula: 0,
        type: 'number'
    },
    {
        name: 'period',
        symbol: '.',
        formula: '.',
        type: 'number'
    },
    {
        name: 'equality',
        symbol: '=',
        formula: '=',
        type: 'calculate'
    }
]


//selecting elements...
const input = document.querySelector('.input');
const outputResult = document.querySelector('.result .value');
const outputOperation = document.querySelector('.operation .value');


//creating the calculator buttons...
const createButtons = () => {
    const buttonsPerRow = 4; 
    let addedButtons = 0;

    calculatorButtons.forEach((button, index) => {
        if(addedButtons % buttonsPerRow == 0){
            input.innerHTML += `
                <div class="row"></div>
            `
        }

        const row = document.querySelector('.row:last-child');

        row.innerHTML += `
            <button id="${button.name}">
                ${button.symbol}
            </button>
        `
        addedButtons++;
    })
}

createButtons();


//an object holding empty arrays for the storage of our datas or inputs...
const data = {
    operation : [],
    result : []
};


//creating the calculator function...
const calculator = (button) => {
    if(button.type == 'operator'){
        data.operation.push(button.symbol);
        data.result.push(button.formula);
    }

    else if(button.type == 'number'){
        data.operation.push(button.symbol);
        data.result.push(button.formula);
    }

    else if(button.type == 'key'){
        if(button.name == 'clear'){
            data.operation = [];
            data.result = [];
            updateOutputResult(0);
        }
        else if(button.name == 'delete'){
            data.operation.pop();
            data.result.pop();
        }
    }

    else if(button.type == 'calculate'){
        let joinedResult = data.result.join('');

        //clear all arrays ...
        data.operation = [];
        data.result= [];

        //check for syntax error in the operation...
        let finalResult;
        try{
            finalResult = eval(joinedResult);
        }  
        catch(error) {
            if(error instanceof SyntaxError) {
                finalResult = 'syntax Error!'
                updateOutputResult(finalResult);
                return;
            }
        }

        //format the result...
        finalResult = formatResult(finalResult);

        //to save the result...
        data.operation.push(finalResult);
        data.result.push(finalResult);

        //update the output result...
        updateOutputResult(finalResult);
        return;
    }
    updateOutputOperation(data.operation.join(''))
}


const updateOutputResult = (result) => {
    outputResult.innerHTML = result;
};

const updateOutputOperation = (operation) => {
    outputOperation.innerHTML = operation;
}


//creating eventlisteners...
input.addEventListener('click', event => {
    const targetButton = event.target;

    calculatorButtons.forEach(button => {
        if(button.name == targetButton.id) calculator(button);
    });
});


//digit counter function...
const digitCounter = (number) => {
    return number.toString().length;
};


//check if a number is float...
const isFloat = (number) => {
    return number % 1 != 0;
}


//format the result given...
const formatResult = (result) => {
    const maxOutputNumberLength = 10;
    const outputPrecision = 5;


    if(digitCounter(result) > maxOutputNumberLength){
        
        if(isFloat(result)){
            const resultInt = parseInt(result);
            const resultIntLength = digitCounter(resultInt);

            if(resultIntLength > maxOutputNumberLength){
                return result.toPrecision(outputPrecision);
            }
            else{
                const numOfDigitsAfterPoint = maxOutputNumberLength - resultIntLength;
                return result.toFixed(numOfDigitsAfterPoint);
            }
        }
        else{
            //if the number is an integer...
            return result.toPrecision(outputPrecision);
        }
    }
    else{
        return result;
    }
};