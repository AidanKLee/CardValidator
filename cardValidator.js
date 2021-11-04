// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// validate card
const validateCred = array => {
  const reducer = (x, y) => x + y;
  let popNum = array.slice(-1);
  let popArray = array.slice(0, -1);
  popArray.reverse();
  for (i = 0; i < popArray.length; i += 2) {
    popArray[i] *= 2
    if (popArray[i] > 9) {
      popArray[i] -= 9;
    };
  };
  sum = popArray.reduce(reducer);
  const mod = sum % 10
  if (mod === 10 - popNum) {
    return true;
  } else {
    return false;
  };
};

// find all invalid cards in nested array
const findInvalidCards = nestArr => {
  let invalidCards = nestArr.filter(array => !validateCred(array));
  return invalidCards;
};

// find companies of invalid cards
const idInvalidCardCompanies = nestArr => {
  const invalidCardCompanies = [];
  const amex = 3;
  const visa = 4;
  const mastercard = 5;
  const discover = 6;
  nestArr.forEach(arr => {
    if (arr[0] === amex) {
      if (!invalidCardCompanies.includes('Amex')) {
        invalidCardCompanies.push('Amex');
      };
    } else if (arr[0] === visa) {
      if (!invalidCardCompanies.includes('Visa')) {
        invalidCardCompanies.push('Visa');
      };
    } else if (arr[0] === mastercard) {
      if (!invalidCardCompanies.includes('Mastercard')) {
        invalidCardCompanies.push('Mastercard');
      };
    } else if (arr[0] === discover) {
      if (!invalidCardCompanies.includes('Discover')) {
        invalidCardCompanies.push('Discover');
      };
    } else {
      console.log(`Company not found for card: ${arr}.`)
    };
  });
  return invalidCardCompanies;
};

// convert a string of numbers within '' into an array of numbers
const stringToArray = string => {
  const newArray = string.split('').map(number => Number(number));
  return newArray;
};

// push new numbers to main batch array
const pushToBatch = varName => {
  batch.push(varName);
}

// convert invalid card number into a valid card number with minimal destruction(last number, second last number, both numbers)
const createValidNumber = array => {
  const lastNumber = Number(array.slice(-1));
  if (!validateCred(array)) {
    for (let a = 0; a < 10 && !validateCred(array); a ++) {
      array.splice(-1, 1, a);
      // uncomment console logs to watch the process in the console
      // console.log(array + ": " + validateCred(array))
    };
  };
  if (!validateCred(array)) {
    array.splice(-1, 1, lastNumber)
    for (let b = 0; b < 10 && !validateCred(array); b ++) {
      array.splice(-2, 1, b);
      // console.log(array + ": " + validateCred(array))
    };
  };
  if (!validateCred(array)) {
    for (let c = 0; c < 10 && !validateCred(array); c ++) {
      array.splice(-2, 1, c);
      // console.log(array + ": " + validateCred(array))
      for (let d = 0; d < 10 && !validateCred(array); d ++) {
        array.splice(-1, 1, d);
        // console.log(array + ": " + validateCred(array))
      };
    };
  };
};

// convert a batch of invalid card nummbers into valid numbers
const convertInvalidNumbers = array => {
  array.forEach(number => {
    console.log(`${number} is now:`);
    createValidNumber(number);
    console.log(`${number}`);
  });
};

// testing the functions
// adding new card numbers and pushing them to the batch
const newArray1 = stringToArray('4716543633488255');
pushToBatch(newArray1);
const newArray2 = stringToArray('5403010983234361');
pushToBatch(newArray2);
const newArray3 = stringToArray('3540499821744070');
pushToBatch(newArray2);
const newArray4 = stringToArray('4175002780031719');
pushToBatch(newArray4);
const newArray5 = stringToArray('6011441675863054');
pushToBatch(newArray5);

console.log('All card numbers in batch:');
console.log(batch);

console.log('\nFinding Invalid Card Numbers:');
let invalidCards = findInvalidCards(batch);
console.log(invalidCards);

console.log('\nFinding Companies of Invalid Cards:');
let invalidCardCompanies = idInvalidCardCompanies(invalidCards);
console.log(invalidCardCompanies);

console.log('\nConverting invalid card numbers to valid card numbers:');
convertInvalidNumbers(invalidCards);

console.log('\nFinding Invalid Card Numbers:');
invalidCards = findInvalidCards(batch);
console.log(invalidCards);

console.log('\nConverting invalid card numbers to valid card numbers:');
convertInvalidNumbers(invalidCards);
