function Button(props) {
  const label = props.label || ''

  const _reset = document.createElement('button')
  _reset.innerHTML = label

  return _reset
}