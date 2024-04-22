import { IButtonStyles, PrimaryButton } from '@fluentui/react'
import React from 'react'

export const CustomButton = ({
  onClick,
  text,
  passedStyles,
}: {
  onClick: () => void
  text?: string
  passedStyles?: IButtonStyles
}) => {
  return (
    <PrimaryButton styles={passedStyles} onClick={onClick}>
      {text}
    </PrimaryButton>
  )
}

// // root: {
//   backgroundColor: '#CEABD8',
//   borderColor: '#B681C5',
//   fontSize: '1.2rem',
// },
// rootHovered: {
//   backgroundColor: '#B681C5',
//   borderColor: '#A665B8',
// },
