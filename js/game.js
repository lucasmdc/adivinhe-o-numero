window.onload = async () => {
  const form = document.getElementById('gameForm')
  const result = document.getElementById('gameResult')
  const reset = createReset()

  let message = ''
  let randomNumber = 0
  let disableForm = false

  await load()
  createOrUpdateGameDisplay(disableForm)

  function createReset() {
    const _reset = document.createElement('button')
    reset.innerHTML = 'Nova Partida'

    return _reset
  }

  async function load() {
    try {
      randomNumber = await getRandomNumber()
      disableForm = false
      disableForm(form, false)
    } catch (error) {
      randomNumber = error.StatusCode
      disableForm = true
      disableForm(form, true)
    }
  }

  function createOrUpdateGameDisplay(props) {
    const displayReset = props.displayReset || false

    result.innerHTML = `<div>
      ${message ? `<p>${message}</p>` : ''}
      <p>${getNumbers(randomNumber)}</p>
    </div>`

    if (displayReset) {
      result.appendChild(reset)
    }
  }

  form.addEventListener('submit', e => {
    e.preventDefault()

    const formData = new FormData(form)
    const guessNumber = formData.get('guess')

    if (guessNumber > randomNumber) {
      message = "É menor"
    } else if (guessNumber < randomNumber) {
      message = "É maior"
    } else {
      message = 'Acertou!'
    }

    createOrUpdateGameDisplay(message === 'Acertou!')
  })

  reset.addEventListener('click', async () => {
    await load()
    createOrUpdateGameDisplay()
  })
}