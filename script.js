let numbers = document.querySelectorAll('.numbers')
let operators = document.querySelectorAll('.operators')
let screen_calc = document.querySelector('#screen_calc')
let screen_result = document.querySelector('#screen_result')
let equals = document.querySelector('#equals')
let ac = document.querySelector('.ac')
let del = document.querySelector('#del')
let period = document.querySelector('#period')

function operate(a,b,op){
    switch(op){
        case '+' : return parseFloat(a) + parseFloat(b)
        case '-' : return a-b
        case '×' : return a*b
        case '/' : return number_two == 0 ? screen_result.textContent = "imbecile" : a/b;
        case '%' : return a%b;
    }
}

let number_one = '';
let number_two = '';
let op;

function reset(){
    number_one = '';
    number_two = '';
    op = undefined;
    screen_calc.textContent = '';
    period1 = false ;
    period2 = false;
}

function add_up(operator){
    if(screen_result.textContent != 'imbecile'){
        number_one = screen_result.textContent
        op = operator.textContent
        screen_calc.textContent = number_one
        screen_calc.textContent += ` ${op} `
    }
}



function reset_style(){
    operators.forEach(element => {
        element.style.transition = '.9s'
        element.classList.remove('active')
    })
}

function op_handler(operator){
    reset_style()
    let length = screen_calc.textContent.length - 2
    if(op == undefined && number_one != ''){
        op = operator.textContent
        screen_calc.textContent += ` ${op} `
        operator.classList.add('active')
    }
    else if(op != undefined && number_two == '' && screen_calc.textContent[length] == op){
        screen_calc.textContent = screen_calc.textContent.slice(0, -3)
        op = operator.textContent
        screen_calc.textContent += ` ${op} `
        operator.classList.add('active')
    }
    else if ((number_one && number_two) != '' && op !=  undefined && screen_result.textContent != 'imbecile'){
        screen_result.textContent = operate(parse(number_one), parse(number_two), op)
        reset()
        add_up(operator)
        operator.classList.add('active')
    }
    else if (screen_result.textContent != '' && (number_one && number_two) == '' && op == undefined && screen_result.textContent != 'imbecile'){
        add_up(operator)
        operator.classList.add('active')
    }
}


function op_choice(){
    operators.forEach(element => {
        element.addEventListener('click', function(){
            op_handler(element)
        })
    })
}


function expressions(number){
    if(op == undefined && screen_calc.textContent.length < 16){
        screen_result.textContent = ''
        number_one += number.textContent
        screen_calc.textContent += number.textContent
    }
    else if(op != undefined && screen_calc.textContent.length < 33){
        screen_result.textContent = ''
        number_two += number.textContent
        screen_calc.textContent += number.textContent
    }
}

function numbers_events(){
    numbers.forEach(element => {
            element.addEventListener('click', function(){
                if(screen_calc.textContent == 'This is a calculator ya know'){
                    screen_calc.textContent = ''
                }
                expressions(element)
            })
    })      
}

function style_button(button){
    button.classList.add('active')
        setTimeout(() => {
            button.classList.remove('active')
            button.style.transition = '.1s'
        }, 100);
}

let period1 = false
let period2 = false

function period_handler(){
    if(number_one != ''  && period1 == false && number_two == ''){
        number_one += '.'
        screen_calc.textContent += '.'
        period1 = true
    }
    else if (number_two != '' && period2 == false){
        number_two += '.'
        screen_calc.textContent += '.'
        period2 = true
    }
}

period.addEventListener('click', function(){
    period_handler()
})

function del_handler(){
    if(number_two == '' && op == undefined){
        number_one = number_one.slice(0, number_one.length - 1)
        console.log('del number_one ' + number_one)
        screen_calc.textContent = screen_calc.textContent.slice(0, -1)
    }
    else if ((number_one && number_two) != '' && op != undefined){
        number_two = number_two.slice(0, -1)
        console.log('del number_two ' + number_two)
        screen_calc.textContent = screen_calc.textContent.slice(0, -1)
    }
    else if(op != undefined && number_two == ''){
        op = undefined
        console.log(op)
        screen_calc.textContent = screen_calc.textContent.slice(0, -3)
    }
    style_button(del)
}

function parse(number){
    const number_parsed = Math.floor(parseFloat(number) * 100) / 100
    return number_parsed
}

function equals_handler(){
    if(number_one != '' && number_two != ''){
        screen_result.textContent = operate(parse(number_one), parse(number_two), op)
        reset()
        reset_style()
        period1 = false
        period2 = false
    }

    style_button(equals)
}

function clear(){
    ac.classList.add('active')
    setTimeout(() => {
        ac.classList.remove('active')
        ac.style.transition = '.1s'
    }, 100);
    reset()
    reset_style()
    screen_result.textContent = ''
}

function display(){
    screen_calc.textContent = "This is a calculator ya know"

    op_choice()
    
    numbers_events()

    ac.addEventListener('click', clear)
    del.addEventListener('click', del_handler)
}

equals.addEventListener('click', equals_handler)

let body = document.querySelector('body')



body.addEventListener('keydown', function(event){
    let keydown = event.key
    
    numbers.forEach(element => {
        if(keydown == element.textContent){
            expressions(element)
        }
    })

    operators.forEach(element => {
        if(keydown == element.textContent){
           op_handler(element)
        
        }
    })
console.log(keydown)
    operators.forEach(element => {
        if(keydown == '*') keydown = '×'
        if(keydown == element.textContent){
            op_handler(element)
        }
    })

    if(keydown == 'Enter'){
        equals_handler()
    }

    if(keydown == '.'){
        period_handler()     
    }

    if(keydown == 'Backspace'){
        del_handler()
    }
    if(keydown == 'Escape'){
        reset()
        screen_result.textContent = ''
    }
    if(keydown == ' '){
        clear()
    }
})

display()