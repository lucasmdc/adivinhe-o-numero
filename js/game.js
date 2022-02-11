window.onload = async () => {
  const form = document.getElementById('gameForm')
  const result = document.getElementById('gameResult')
  const reset = document.createElement('button')
  reset.innerHTML = 'Nova Partida'

  let message = ''
  let guess = 0
  let randomNumber = 0
  let isDisableForm = false
  let digitTheme = ''

  await start()

  result.innerHTML = `<div>
        <p>${getNumber(guess, digitTheme)}</p>
      </div>`

  if (isDisableForm) {
    result.appendChild(reset)
  }

  form.addEventListener('submit', e => {
    e.preventDefault()

    const formData = new FormData(form)
    const _guess = formData.get('guess')
    let gotTheResult = false

    if (_guess > randomNumber) {
      message = "É menor"
    } else if (_guess < randomNumber) {
      message = "É maior"
    } else {
      message = 'Acertou!'
    }

    form.reset()
    gotTheResult = message === 'Acertou!'
    digitTheme = gotTheResult ? 'success' : digitTheme

    result.innerHTML = `<div>
          <p>${message}</p>
          <p>${getNumber(_guess, digitTheme)}</p>
        </div>`

    if (gotTheResult) {
      result.appendChild(reset)
    }
  })

  reset.addEventListener('click', async () => {
    await start()

    result.innerHTML = `<div>
        <p>${getNumber(guess, digitTheme)}</p>
      </div>`
  })

  async function start() {
    try {
      randomNumber = await getRandomNumber()
      isDisableForm = false
      disableForm(form, false)
      digitTheme = 'primary'
      guess = 0
    } catch (error) {
      randomNumber, guess = error.StatusCode
      isDisableForm = true
      disableForm(form, true)
      digitTheme = 'error'
    }
  }
}