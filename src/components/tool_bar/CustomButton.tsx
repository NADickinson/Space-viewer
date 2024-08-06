import { IButtonStyles, PrimaryButton } from '@fluentui/react'
import React, { ComponentProps } from 'react'

export const CustomButton = ({
  onClick,
  text,
  deleteButton,
  passedStyles,
  children,
}: {
  onClick: () => void
  text?: string
  passedStyles?: ComponentProps<typeof PrimaryButton>['styles']
  deleteButton?: boolean
  children?: React.ReactNode
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
        ...passedStyles,
      }}
      onClick={onClick}
    >
      {deleteButton ? <span className="material-symbols-outlined">delete</span> : undefined}
      {text}
      {children}
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
