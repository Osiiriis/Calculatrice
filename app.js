class Calculator {
    constructor(previous, operand){
        this.previous = previous
        this.operand = operand
        this.clear();
        this.readyToReset = false;
    }
   

clear () {

    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined 
}

delete () {

    this.currentOperand = this.currentOperand.toString().slice(0, -1)
}

apparitionNumber (number){ 
    if(number === '.' && this.currentOperand.includes(".")) return
    this.currentOperand = this.currentOperand.toString() + number.toString();
}

chooseOperation (operation){
    if(this.currentOperand === '') return
    if(this.previousOperand !== ''){
        this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand= ''
}

compute (){
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if(isNaN(prev) || isNaN(current))return
    switch(this.operation){
        case '+' :
            computation = prev + current
            break
        case '-' :
            computation = prev - current
            break
        case '*':
            computation = prev * current 
            break
        case '÷':
            computation = prev / current
            break
        default:
            return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ""
    this.readyToReset = true;
}

getDisplayNumber(){}

updateDisplay() {
    this.operand.innerText = this.currentOperand;
    if (this.operation != null) {
        this.previous.innerText =
        `${this.previousOperand} ${this.operation}`
    } else {
        this.previous.innerText = "";
    }

}
    

}
const number = document.querySelectorAll("[data-nb]");
const operatione = document.querySelectorAll("[data-ope]");
const buttonequal = document.querySelector("[data-equal]")
const buttondel = document.querySelector("[data-del]")
const buttonAc = document.querySelector("[data-clear]")
const previous = document.querySelector("[data-previous]")
const operand = document.querySelector("[data-operand]")

const calculator = new Calculator(previous, operand);

number.forEach(button => {
    button.addEventListener('click', () => {
        if(calculator.previousOperand === "" &&
        calculator.currentOperand !== "" &&
    calculator.readyToReset) {
            calculator.currentOperand = "";
            calculator.readyToReset = false;
        }
        calculator.apparitionNumber(button.innerText)
        calculator.updateDisplay();
    })
})

operatione.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay() 
    })
})

buttonequal.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

buttonAc.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()

})

buttondel.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()

})


