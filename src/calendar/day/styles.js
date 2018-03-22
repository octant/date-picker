import glamorous from 'glamorous'

export const Day = glamorous.div({
  position: `relative`,
  height: `2.5em`,
  width: `2.5em`,
  margin: `0.125em`,
  lineHeight: `2.5em`,
  textAlign: `center`,
  backgroundColor: 'orangered',
  ':hover': {
    backgroundColor: 'darkblue'
  }
})
