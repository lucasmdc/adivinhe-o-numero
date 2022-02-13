function Button(props) {
  const label = props.label || ''
  const icon = props.icon || ''
  const classes = props.classes || []

  const button = document.createElement('button')
  button.innerHTML = `<p>
    ${icon &&
    `<i class='icon icon--${icon}'></i>`
    }
    <span>${label}</span>
  </p>`

  if (classes.length > 0) {
    button.classList.add(classes.join(' '))
  }

  return button
}