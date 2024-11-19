//Cached elements
const buttonsCalc = document.querySelector('.buttons')
const outputCalc = document.querySelector('.display')

buttonsCalc.addEventListener('click', buttonClick)
document.addEventListener('keyup', buttonClick)

/*-----------Model-----------*/

//State variables
let mainInput, storageInput, operator
const equation = document.querySelector('.equation')

/*----------controller--------*/
function init() {
    mainInput = '0'
    storageInput = '0'
    operator = null
    equation.innerText = ''
    renderDisplay(mainInput)
}
function buttonClick(e) {
    const idx = [...buttonsCalc.children]
    const inputTarget = e.target.innerText

    if (idx[0].contains(e.target)) {

        
        if (operator){ //second input
            
            if (inputTarget === 'DEL') { storageInput = backspace(storageInput); return }

            storageInput = inputString(storageInput, inputTarget)
            renderDisplay(storageInput)
            return
            //equation.innerText += ` ${storageInput} `

        }
        if (inputTarget === 'DEL') { mainInput = backspace(mainInput); return }
        mainInput = inputString(mainInput, inputTarget) 
        renderDisplay(mainInput)

    }
    if (idx[1].contains(e.target)){

        if (inputTarget === '±') { mainInput = polarity(mainInput); return }
        
        if (storageInput !== '0') {//check for a second input, then calculate
            if (inputTarget === '±') { storageInput = polarity(storageInput); return }
            equation.innerText += `${storageInput}`
            mainInput = output().toString()
            renderDisplay(mainInput)
            storageInput = '0'
        } else equation.innerText += `${mainInput}`

        operator = inputTarget;
        equation.innerText += ` ${operator} `
        
        if (inputTarget === 'C') {
            init()
        }
    }
    function inputString(currentVal, newDigit) {
        if (currentVal.includes('.') && newDigit === '.') return currentVal
        if (currentVal === '0') {
            if (newDigit === '.') return '0.'
            return newDigit
        } else return currentVal + newDigit
    }

    function polarity(digits){
        if (parseInt(digits) > 0){
          digits = '-' + digits  
        } else if (parseInt(digits) < 0)  digits = digits.substring(1)
        renderDisplay(digits)
        return digits
    }
    function backspace(digits){
        
            if (digits.length > 1) {
                digits = digits.substring(0, digits.length -1)
            }else if (digits.length <= 1) digits = '0'
            renderDisplay(digits)
            return digits
        
    }

    function output(){
        switch (operator) {
            case '+':
                return parseFloat(mainInput) + parseFloat(storageInput)  
            case '-':
                return parseFloat(mainInput) - parseFloat(storageInput)
            case '*':
                return parseFloat(mainInput * storageInput)
            case '/':
                return storageInput !== '0' ? parseFloat(mainInput / storageInput) : '0'
        }
    }
}
/*-------------View------------*/

function renderDisplay(digits) { 
    digits = digits.toString().slice(0,15)
    outputCalc.innerText = digits
}

init()