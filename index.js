const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const cls = document.querySelector('#cls');
const del = document.querySelector('#del');
const isequal = document.querySelector('#isequal');
const toggle = document.querySelector('#toggle');

let var1;
let operator;
let overwrite = false;
let lang = true;

toggle.addEventListener('click', () => {
  lang = !lang;
  updateLanguage();
  display.value = '';
});

numbers.forEach((number) => {
  number.addEventListener('click', () => {
    if (overwrite) {
      display.value = number.textContent;
      overwrite = false;
    } else {
      display.value += number.textContent;
    }
  });
});

cls.addEventListener('click', () => {
  display.value = '';
});

del.addEventListener('click', () => {
  display.value = display.value.slice(0, -1);
});

operators.forEach((operatorBtn) => {
  operatorBtn.addEventListener('click', () => {
    if (display.value === '') {
      display.value = 'FIELD CAN\'T BE EMPTY';
      overwrite = true;
      return;
    } 

    var1 = convertToEnglish(display.value);
    operator = operatorBtn.getAttribute('data-operator');
    display.value = '';
  });
});

function isEqual() {
  overwrite = true;
  let var2 = convertToEnglish(display.value);

  if (isNaN(var1) || isNaN(var2)) {
    display.value = 'SYNTAX ERROR';
    overwrite = true;
    return;
  }

  if (operator === '/' && var2 === 0) {
    display.value = 'CAN\'T DIVIDE BY ZERO';
    overwrite = true;
    return;
  }

  let result;
  switch (operator) {
    case '+':
      result = var1 + var2;
      break;
    case '-':
      result = var1 - var2;
      break;
    case '*':
      result = var1 * var2;
      break;
    case '/':
      result = var1 / var2;
      break;
  }

  display.value = lang ? result.toLocaleString('en-US', {maximumFractionDigits: 10}) : convertToDzongkha(result);
}

isequal.addEventListener('click', isEqual);

function updateLanguage() {
  if (lang) {
    toggle.style.left = '-7px';
    document.getElementById('language').textContent = 'English';
    numbers.forEach((number) => {
      number.textContent = number.getAttribute('data-value');
    });
  } else {
    toggle.style.left = '17px';
    document.getElementById('language').textContent = 'རྫོང་ཁ';
    const dzongkhaNumbers = ['༧', '༨', '༩', '༤', '༥', '༦', '༡', '༢', '༣', '.', '༠'];
    numbers.forEach((number, index) => {
      number.textContent = dzongkhaNumbers[index];
    });
  }
}

function convertToEnglish(input) {
  const dzongkhaNumbers = ['༧', '༨', '༩', '༤', '༥', '༦', '༡', '༢', '༣', '.', '༠'];
  const englishNumbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '.', '0'];
  let englishNumber = '';
  for (let i = 0; i < input.length; i++) {
    const index = dzongkhaNumbers.indexOf(input[i]);
    if (index !== -1) {
      englishNumber += englishNumbers[index];
    } else {
      englishNumber += input[i];
    }
  }
  return parseFloat(englishNumber);
}

function convertToDzongkha(number) {
  const dzongkhaNumbers = ['༧', '༨', '༩', '༤', '༥', '༦', '༡', '༢', '༣', '.', '༠'];
  const englishNumbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '.', '0'];
  let dzongkhaNumber = '';
  const numberString = number.toString();
  for (let i = 0; i < numberString.length; i++) {
    const index = englishNumbers.indexOf(numberString[i]);
    if (index !== -1) {
      dzongkhaNumber += dzongkhaNumbers[index];
    } else {
      dzongkhaNumber += numberString[i];
    }
  }
  return dzongkhaNumber;
}
