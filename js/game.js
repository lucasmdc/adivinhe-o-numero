window.onload = async () => {
  const form = document.getElementById('gameForm')

  const reset = Button({
    label: 'Nova Partida'
  })

  let message = ''
  let guess = 0
  let randomNumber = 0
  let isDisableForm = false
  let digitTheme = ''

  await start()
  Display()

  form.addEventListener('submit', e => {
    e.preventDefault()

    const formData = new FormData(form)
    guess = formData.get('guess')

    let gotTheResult = false

    if (guess > randomNumber) {
      message = "É menor"
    } else if (guess < randomNumber) {
      message = "É maior"
    } else {
      message = 'Acertou!'
    }

    gotTheResult = message === 'Acertou!'
    digitTheme = gotTheResult ? 'success' : digitTheme

    Display({
      injectHTML: [`<p>${message}</p>`],
      injectNodes: gotTheResult && [reset]
    })

    if (gotTheResult) {
      isDisableForm = true
      disableForm(form, true)
    }

    form.reset()
  })

  reset.addEventListener('click', async () => {
    await start()
    Display({
      injectNodes: isDisableForm && [reset]
    })
  })

  function Display(props) {
    const ref = document.getElementById('gameResult')

    const _props = props || {}
    const injectNodes = _props.injectNodes || []
    const injectHTML = _props.injectHTML || []

    ref.innerHTML = `<div>
        <p>${getNumber(guess, digitTheme)}</p>
      </div>`

    if (injectHTML.length > 0) {
      injectHTML.forEach(text => {
        ref.insertAdjacentHTML('afterbegin', text)
      })
    }

    if (injectNodes.length > 0) {
      injectNodes.forEach(node => {
        ref.appendChild(node)
      })
    }
  }

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