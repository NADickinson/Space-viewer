import { Dropdown, IDropdownOption } from '@fluentui/react'
import React from 'react'

export const CustomSelect = <Toption extends unknown>({
  options,
  toId,
  toText,
  onChange,
  placeHolder,
  disabled,
  styles,
}: {
  options: Toption[]
  toId: (option: Toption) => string
  toText: (option: Toption) => string
  onChange: (option: Toption) => void
  placeHolder: string
  disabled?: boolean
  styles?: object
}) => {
  return (
    <Dropdown
      options={options.map(option => {
        return { key: toId(option), text: toText(option) }
      })}
      styles={{
        root: {
          selectors: {
            ':hover .ms-Dropdown-title': {
              color: '#B1B3B3 !important',
              backgroundColor: '#035984',
            },
          },
        },
        title: {
          backgroundColor: '#033A56',
          borderWidth: '0px',
          color: '#B1B3B3',
          fontSize: '1.2rem',
          fontWeight: '700',
          borderRadius: '5px',
        },
        callout: {
          border: '2px solid #033A56',
          borderRadius: '4px',
          padding: '0px',
        },
        dropdownItem: {
          selectors: {
            ':hover': {
              backgroundColor: '#035984',
              color: '#B1B3B3',
            },
          },
          backgroundColor: '#033A56',
          color: '#B1B3B3',
          fontWeight: 'bold',
          fontSize: '14px',
        },
      }}
      selectedKey={null}
      placeholder={placeHolder}
      disabled={disabled}
      onChange={(_, option: IDropdownOption | undefined) => {
        const key = option?.key
        if (typeof key !== 'string') return
        const selected = options.find(option => toId(option) === key)
        if (selected !== undefined) onChange(selected)
      }}
    ></Dropdown>
  )
}

//TODO dropdown doesnt open when shrunk!
