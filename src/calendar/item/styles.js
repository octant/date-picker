import glamorous from 'glamorous'

export const StyledItem = glamorous.div({
  position: `relative`,
  height: `2.5em`,
  width: `2.5em`,
  float: `left`,
  margin: `0em`,
  lineHeight: `2.5em`,
  textAlign: `center`,
  backgroundColor: 'orangered'
}, ({clickable}) => {
  const style = {}

  if (clickable) {
    style[':hover'] = {
      cursor: 'pointer',
      color: 'white',
      backgroundColor: 'darkblue'
    }
  }
  return style
})
