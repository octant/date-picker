import glamorous from 'glamorous'

export const StyledItem = glamorous.div({
  position: `relative`,
  boxSizing: `border-box`,
  height: `2.5em`,
  width: `2.5em`,
  float: `left`,
  margin: `0em`,
  lineHeight: `2.5em`,
  textAlign: `center`,
  backgroundColor: 'orangered'
}, ({clickable, selected}) => {
  const style = {}

  if (selected) {
    style.backgroundColor = 'white'
  }

  if (clickable) {
    style[':hover'] = {
      border: `2px #FFF solid`,
      cursor: `pointer`,
      color: `white`,
      backgroundColor: `darkblue`
    }
  }

  return style
})
