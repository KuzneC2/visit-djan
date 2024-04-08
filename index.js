const block = document.querySelectorAll('.questions__quest-box');

block.forEach(item => {
    const description = item.querySelector('.questions__ansver');
    item.addEventListener('click', () => {
        if (description.classList.contains('open')) {
            description.classList.remove('open');
        }
        else {
            description.classList.add('open')
        }
    })
})

function rotateTriangle() {
    const triangle = document.querySelector('.triangle');
    const selectMenu = document.querySelector('.select-menu');
    
    triangle.style.transform = triangle.style.transform === 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)';
    
    if (document.createEvent) {
        const event = document.createEvent('MouseEvents');
        event.initMouseEvent('mousedown', true, true, window);
        selectMenu.dispatchEvent(event);
    } else if (document.createEventObject) {
        const event = document.createEventObject();
        selectMenu.fireEvent('onmousedown', event);
    }

}












































// римско-арабские значения
const numbers = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
};

// перевод римских в арабские
function translateRomanInArab(string) {
    return string.toUpperCase().split('').reduce(function (res, symbol, i, arr) {
        const [a, b, c] = [
            numbers[arr[i]],
            numbers[arr[i + 1]],
            numbers[arr[i + 2]]
        ];
        return b > a ? res - a : res + a;
    }, 0)
}
//перевод арабских в римские
function translateArabInRome(num) {
    if (num < 1) return '';
    let result = '';
    for (key in numbers)
        while (num >= numbers[key]) {
            result += key;
            num -= numbers[key];
        }
    return result;
}
// функция математических действий
function calculateExpression(arrOperands, operator) {
    switch (operator) {
        case '+':
            return +arrOperands[0] + +arrOperands[1];
        case '-':
            return arrOperands[0] - arrOperands[1];
        case '*':
            return arrOperands[0] * arrOperands[1];
        case '/':
            return arrOperands[0] / arrOperands[1];
        default:
            throw Error('Неизвестный оператор');
    }
}

function calculator(string) {
    //Проверка на цифры
    let notCorrectSymbols = [];
    string = string.replace(/[^IVXLCDMZ\d+\-*\/]/gi, symbol => {
        if (symbol !== ' ') {
            notCorrectSymbols.push(symbol);
        }
        return '';
    });
    if (notCorrectSymbols.length > 0)
        throw Error('Символы не допустимы, Вы ввели это: ' + notCorrectSymbols);
    // --------------------

    //создание массива операндов(убираем знаки)
    let arrOperands = string.split(/[+\-*\/]/g)
    if (arrOperands.length !== 2)
        throw Error('Должно быть 2 операнда');
    //---------------------------------------


    // проверка операндов - пара чисел или нет
    const regexRome = /^[IVXLCDMZ]+$/i;

    const res = arrOperands.reduce((sum, item) => sum + regexRome.test(item), 0);

    if (res === 1)
        throw Error('Оба числа должны быть записаны арабскими или Римскими цифрами')
    // перевод в арабские цифры
    else if (res === 2)
        arrOperands = arrOperands.map(symbol => translateRomanInArab(symbol));
    if (arrOperands.some(value => value < 1 || value > 10))
        throw Error('Допустимое значение операндов от 1 до 10 включительно');

    let operator = string.match(/[+\-*\/]/)[0]

    let mathRes = Math.floor(calculateExpression(arrOperands, operator));
    //ответ и перевод если нужно в римские
    return res === 0 ? mathRes.toString() : translateArabInRome(mathRes)
}





function minmax(min, max, step) {
    let res = [];
    for (let i = min; i <= max; i += step) {
        res.push(i);
    }
    return res
}

