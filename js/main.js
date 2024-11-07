//Cached elements
const buttonsCalc = document.querySelector('.buttons')
const outputCalc = document.querySelector('.display')

buttonsCalc.addEventListener('click', buttonClick)

/*-----------Model-----------*/

//State variables
let inputOne, inputTwo, operator

/*----------controller--------*/
function init() {
    inputOne = '0'
    inputTwo = '0'
    operator = null
    renderDisplay(inputOne)
}
function buttonClick(e) {
    const idx = [...buttonsCalc.children]
    const inputTarget = e.target.innerText

    if (idx[0].contains(e.target)) {

        if (!operator){
            inputOne = inputString(inputOne)
            renderDisplay(inputOne)
        } else if (operator){
            inputTwo = inputString(inputTwo) 
            renderDisplay(inputTwo)  
        }

    }
    if (idx[1].contains(e.target)){

        if (inputTwo !== '0') {
            inputOne = output()
            renderDisplay(inputOne)
            inputTwo = '0'
        }

        operator = e.target.innerText;

        if (inputTarget === 'C') {
            init()
        }
        if (e.target.innerText === '±') {
            polarity()
        }
        
    }
    function inputString(input) {
        if (input === '0') {
            if (inputTarget === '.') return '0.'
            return inputTarget
        } else return input + inputTarget
    }
    
    }
    function polarity(){
        if (inputTwo === '0') {
            inputOne = inputOne*(-1)
            renderDisplay(inputOne)
        } else {
            inputTwo = inputTwo*(-1)
            renderDisplay(inputTwo)
        }
    }

function output(){
    switch (operator) {
        case '+':
            return parseFloat(inputOne + inputTwo)
        case '-':
            return parseFloat(inputOne - inputTwo)
        case '*':
            return parseFloat(inputOne * inputTwo)
        case '/':
            return inputTwo !== 0 ? parseFloat(inputOne / inputTwo) : '0'
    }
}

/*-------------View------------*/

function renderDisplay(value) {
    outputCalc.innerText = value
}

init()