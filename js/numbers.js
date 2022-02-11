const enumNumbers = {
  0: 'zero',
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine'
}

function getNumbers(value, theme) {
  const numbers = String(value).split('')

  const numbersHtmlElements = numbers.map(number => {
    return `<img src='./svg/digit/${theme}/${enumNumbers[number]}.svg' alt='${enumNumbers[number]}'/>`
  })

  return numbersHtmlElements.join('')
}

async function getRandomNumber() {
  try {
    const { value } = await api.get('rand?min=1&max=300')

    return value
  } catch (error) {
    throw error
  }
}