window.onload = () => {
  const form = document.getElementById('gameForm')
  const reset = Button({
    label: 'NOVA PARTIDA',
    icon: 'reset',
    classes: ['game-result__reset', 'flex-end']
  })
  const [state, setState] = useState({
    guess: '',
    isDisableForm: false,
    message: '',
    randomNumber: 0,
    theme: ''
  })

  start()

  async function start() {
    await init()
    updateDisplay({
      injectHTML: state.message && [`<h4 class='game-result__message flex-start'>${state.message}</h4>`],
      injectNodes: state.isDisableForm && [reset]
    })
  }

  async function init() {
    try {
      setState({
        guess: 0,
        isDisableForm: false,
        message: '',
        randomNumber: await getRandomNumber(),
        theme: 'primary',
      })
      disableForm(form, false)
    } catch (error) {
      setState({
        guess: error.StatusCode,
        isDisableForm: true,
        message: 'ERRO',
        randomNumber: error.StatusCode,
        theme: 'error',
      })
      disableForm(form, true)
    }
  }

  function updateDisplay(props) {
    const ref = document.getElementById('gameResult')

    const _props = props || {}
    const injectNodes = _props.injectNodes || []
    const injectHTML = _props.injectHTML || []

    ref.innerHTML = `<div class='game-result__content ${state.theme}--color'>
        ${injectHTML.length > 0 ? injectHTML.join('') : ''}
        <p class="numbers">${getNumber(state.guess, state.theme)}</p>
      </div>`

    if (injectNodes.length > 0) {
      injectNodes.forEach(node => {
        ref.childNodes[0].appendChild(node)
      })
    }
  }

  function useState(initialValue) {
    let value = initialValue

    function setValue(newValue) {
      Object.assign(value, newValue)
    }

    return [value, setValue]
  }

  form.addEventListener('submit', e => {
    e.preventDefault()

    let gotTheResult = false
    const formData = new FormData(form)
    setState({ guess: formData.get('guess') || state.guess })

    if (state.guess > state.randomNumber) {
      setState({ message: "?? menor" })
    } else if (state.guess < state.randomNumber) {
      setState({ message: "?? maior" })
    } else {
      setState({ message: "Acertou!" })
    }

    gotTheResult = state.message === 'Acertou!'

    setState({
      theme: gotTheResult ? 'success' : state.theme
    })

    updateDisplay({
      injectHTML: [`<h4 class='game-result__message flex-start'>${state.message}</h4>`],
      injectNodes: gotTheResult && [reset]
    })

    if (gotTheResult) {
      disableForm(form, true)
    }

    form.reset()
  })

  reset.addEventListener('click', start)
}