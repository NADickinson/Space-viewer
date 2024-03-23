import { Dropdown, IDropdownOption } from '@fluentui/react'
import React from 'react'

export const CustomSelect = <Toption extends unknown>({
  options,
  toId,
  toText,
  onChange,
  placeHolder,
}: {
  options: Toption[]
  toId: (option: Toption) => string
  toText: (option: Toption) => string
  onChange: (option: Toption) => void
  placeHolder: string
}) => {
  return (
    <Dropdown
      options={options.map(option => {
        return { key: toId(option), text: toText(option) }
      })}
      placeholder={placeHolder}
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
