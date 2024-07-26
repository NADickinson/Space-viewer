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
              color: 'white !important',
              backgroundColor: '#007fff',
            },
          },
        },
        title: {
          backgroundColor: '#007fbd',
          borderWidth: '0px',
          color: 'black',
          fontSize: '1.2rem',
          fontWeight: '600',
        },
        callout: {
          border: '2px solid #0078d4',
          borderRadius: '4px',
          padding: '0px',
        },
        dropdownItem: {
          selectors: {
            ':hover': {
              backgroundColor: '#007fff',
              color: 'black',
            },
          },
          backgroundColor: '#007fbd',
          color: 'black',
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
