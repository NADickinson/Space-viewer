import { PrimaryButton } from '@fluentui/react'
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
          backgroundColor: '#033A56',
          fontSize: '1.2rem',
          justifySelf: 'flex-end',
          color: '#B1B3B3',
          fontWeight: 'bold',
          borderColor: '#033A56',
          borderRadius: '5px',
        },
        rootHovered: {
          backgroundColor: '#035984',
          borderColor: '#033A56',
          color: '#B1B3B3',
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
