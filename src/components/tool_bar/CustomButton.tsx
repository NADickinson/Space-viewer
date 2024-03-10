import { PrimaryButton } from '@fluentui/react'
import React from 'react'

export const CustomButton = ({ onClick, text }: { onClick: () => void; text: string }) => {
  return (
    <PrimaryButton
      styles={{
        root: {
          backgroundColor: '#CEABD8',
          borderColor: '#B681C5',
          fontSize: '1.2rem',
        },
        rootHovered: {
          backgroundColor: '#B681C5',
          borderColor: '#A665B8',
        },
      }}
      onClick={onClick}
    >
      {text}
    </PrimaryButton>
  )
}
