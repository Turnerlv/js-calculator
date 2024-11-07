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

        if (e.target.innerText === 'C') {
            init()
        }
        
    }
    
    function inputString(input) {
        
        input = input + inputTarget
        
        if (!input.includes('.')){
        
            input = parseInt(input)
            
        } // else if (input.includes('.')) {
        
        //     input = parseFloat(input)
        // }
    
        return input
    }


}


function output(){
    switch (operator) {
        case '+':
            return inputOne + inputTwo
        case '-':
            return inputOne - inputTwo
        case '*':
            return inputOne * inputTwo
        case '/':
            return inputTwo !== 0 ? inputOne / inputTwo : '0'
    }
}

/*-------------View------------*/

function renderDisplay(value) {
    outputCalc.innerText = value
}

init()