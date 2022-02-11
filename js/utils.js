function disableForm(element, disabled) {
  Array.from(element.children).forEach(child => {
    if (child.children.length > 0) {
      return disableForm(child, disabled)
    } else {
      if (['INPUT', 'BUTTON'].indexOf(child.nodeName) !== -1) {
        if (disabled) {
          child.setAttribute('disabled', 'disabled')
        } else {
          child.removeAttribute('disabled')
        }
      }
    }
  })
}