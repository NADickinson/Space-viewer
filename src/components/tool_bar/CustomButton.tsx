import { IButtonStyles, PrimaryButton } from '@fluentui/react'
import React from 'react'

export const CustomButton = ({
  onClick,
  text,
}: {
  onClick: () => void
  text?: string
  passedStyles?: IButtonStyles
}) => {
  return (
    <PrimaryButton
      styles={{
        root: {
          backgroundColor: '#958ABC',
          borderColor: '#68599B',
          fontSize: '1.2rem',
          justifySelf: 'flex-end',
        },
        rootHovered: {
          backgroundColor: '#4F4375',
          borderColor: '#342D4E',
        },
      }}
      onClick={onClick}
    >
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
