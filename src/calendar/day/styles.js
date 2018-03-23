import glamorous from 'glamorous'

export const Day = glamorous.div({
  position: `relative`,
  height: `2.5em`,
  width: `2.5em`,
  float: `left`,
  margin: `0em`,
  lineHeight: `2.5em`,
  textAlign: `center`,
  backgroundColor: 'orangered',
  ':hover': {
    cursor: 'pointer',
    color: 'white',
    backgroundColor: 'darkblue'
  }
})
