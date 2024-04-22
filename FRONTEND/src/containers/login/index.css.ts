import { style } from "@vanilla-extract/css"

export const mainContainer = style({
  minHeight: 400,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
})

export const questionText = style({
  marginTop: 30,
  color: 'darkgray',
})

export const goJoin = style({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  color: 'darkgray',
})