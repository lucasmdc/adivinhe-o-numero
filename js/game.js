window.onload = async () => {
  const form = document.getElementById('gameForm')
  const reset = Button({
    label: 'Nova Partida'
  })
  const [state, setState] = useState({
    message: '',
    guess: '',
    randomNumber: 0,
    isDisableForm: false
  })

  await start()
  updateDisplay()

  function useState(initialValue) {
    let value = initialValue

    function setValue(newValue) {
      Object.assign(value, newValue)
    }

    return [value, setValue]
  }

  async function start() {
    try {
      setState({
        randomNumber: await getRandomNumber(),
        isDisableForm: false,
        digitTheme: 'primary',
        guess: 0
      })
      disableForm(form, false)
    } catch (error) {
      setState({
        randomNumber: error.StatusCode,
        isDisableForm: true,
        digitTheme: 'error',
        guess: error.StatusCode
      })
    }
  }

  function updateDisplay(props) {
    const ref = document.getElementById('gameResult')

    const _props = props || {}
    const injectNodes = _props.injectNodes || []
    const injectHTML = _props.injectHTML || []

    ref.innerHTML = `<div>
        <p>${getNumber(state.guess, state.digitTheme)}</p>
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

  form.addEventListener('submit', e => {
    e.preventDefault()

    let gotTheResult = false
    const formData = new FormData(form)
    setState({ guess: formData.get('guess') || state.guess })

    if (state.guess > state.randomNumber) {
      setState({ message: "É menor" })
    } else if (state.guess < state.randomNumber) {
      setState({ message: "É maior" })
    } else {
      setState({ message: "Acertou!" })
    }

    gotTheResult = state.message === 'Acertou!'

    setState({
      digitTheme: gotTheResult ? 'success' : state.digitTheme
    })

    updateDisplay({
      injectHTML: [`<p>${state.message}</p>`],
      injectNodes: gotTheResult && [reset]
    })

    if (gotTheResult) {
      disableForm(form, true)
    }

    form.reset()
  })

  reset.addEventListener('click', async () => {
    await start()
    updateDisplay({
      injectNodes: state.isDisableForm && [reset]
    })
  })
}