const previousOperationText = document.querySelector('.previous-operation')
const currentOperationText = document.querySelector('.current-operation')
const buttons = document.querySelectorAll('.container-buttons button')

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText
    this.currentOperationText = currentOperationText
    this.currentOperation = ''
  }

  addDigit(digit) {

    if(digit === '.' && this.currentOperationText.innerText.includes('.')) {
      return
    }
    
    this.currentOperation = digit

    if(!this.currentOperationText.innerText && this.currentOperation === '.') {
      return
    }

    this.updateScreen()
  }

  processOperation(operation) {

    if(!this.currentOperationText.innerText && operation !== 'C') {
      if(this.previousOperationText.innerText) {
        this.changeOperation(operation)
      }

      return
    }
    
    let operationValue
    const previous = +this.previousOperationText.innerText.split(' ')[0]
    const current = +this.currentOperationText.innerText

    switch(operation) {
      case '+':
        operationValue = previous + current
        this.updateScreen(operationValue, operation, current, previous)
      break

      case '-':
        operationValue = previous - current
        this.updateScreen(operationValue, operation, current, previous)
      break

      case '/':
        operationValue = previous / current
        this.updateScreen(operationValue, operation, current, previous)
      break

      case '*':
        operationValue = previous * current
        this.updateScreen(operationValue, operation, current, previous)
      break

      case '%':
        operationValue = (previous / 100) * current
        this.updateScreen(operationValue, operation, current, previous)
      break

      case 'DEL':
        this.processDelOperation()
      break

      case 'CE':
        this.procressClearOperation()
      break

      case 'C':
        this.procressClearAllOperation()
      break

      case '=':
        this.procressEqualsOperator()
      break

      default:
        return
    }
  }

  updateScreen(operationValue = null, operation, current = null, previous = null) {
    console.log(this.currentOperation)
    if(operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation
    }else{
      if(previous === 0) {
        operationValue = current 
      }

      this.previousOperationText.innerText = `${operationValue} ${operation}`
      this.currentOperationText.innerText = ''
    }
  }

  changeOperation(operation) {
    const mathOperations = ['*', '-', '%', '/', '+']

    if(!mathOperations.includes(operation)) {
      return
    }
 
    this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation
  }

  processDelOperation() {
    this.currentOperationText.innerText = 
      this.currentOperationText.innerText.splice(0, -1)
  }

  procressClearOperation() {
    this.currentOperationText.innerText = ''
  }

  procressClearAllOperation() {
    this.currentOperationText.innerText = ''
    this.previousOperationText.innerText = ''
  }

  procressEqualsOperator() {
    const operation = previousOperationText.innerHTML.split(' ')[1]

    this.processOperation(operation)
  }
}

const calc = new Calculator(previousOperationText, currentOperationText)

buttons.forEach(button => {
  button.addEventListener('click', (event) => {
    const value = event.target.innerText  
    
    if(Number(value) >= 0 || value === '.') {
      calc.addDigit(value)
    }else{
      calc.processOperation(value)
    }
  })
})