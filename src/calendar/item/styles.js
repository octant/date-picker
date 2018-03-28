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
  backgroundColor: 'orangered',
  color: `white`
}, ({clickable, selected, muted, focused}) => {
  const style = {}

  /**
   * Come up with names for the 'styles'
   * selected, highlighted, emphasized etc...
   */
  if (focused) {
    style.lineHeight = `calc(2.5em - 2px)`
    style.border = `1px #FFF solid`
    style.color = `#FFF`
    style.backgroundColor = 'orangered'
  }

  if (muted) {
    style.color = `#BBB`
  }

  if (selected) {
    style.lineHeight = `calc(2.5em - 2px)`
    style.fontWeight = `bold`
    style.border = `1px #0A64A4 solid`
    style.color = `orangered`
    style.backgroundColor = 'white'
  }

  if (clickable) {
    style[':hover'] = {
      lineHeight: `calc(2.5em - 2px)`,
      border: `1px #FFF solid`,
      cursor: `pointer`,
      color: `white`,
      backgroundColor: `#0A64A4`
    }
  }

  return style
})
