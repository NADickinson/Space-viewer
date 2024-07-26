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
          backgroundColor: '#007fbd',
          fontSize: '1.2rem',
          justifySelf: 'flex-end',
          color: 'black',
          fontWeight: 'bold',
        },
        rootHovered: {
          backgroundColor: '#007fff',
          borderColor: '#007fbd',
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
