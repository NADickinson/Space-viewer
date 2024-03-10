import { Dropdown, IDropdownOption } from '@fluentui/react'
import React from 'react'
import { NasaObject } from '../../App'

export const dropDownFormatConversion = (objArray: NasaObject[]) => {
  return objArray.map(item => {
    return { key: item.date, text: item.title }
  })
}

export const CustomSelect1 = <Toption extends unknown>({
  options,
  toId,
  toText,
  onChange,
}: {
  options: Toption[]
  toId: (option: Toption) => string
  toText: (option: Toption) => string
  onChange: (option: Toption) => void
}) => {
  return (
    <Dropdown
      options={options.map(option => {
        return { key: toId(option), text: toText(option) }
      })}
      placeholder="Select an option"
      onChange={(_, option: IDropdownOption | undefined) => {
        const key = option?.key
        if (typeof key !== 'string') return
        const selected = options.find(option => toId(option) === key)
        if (selected) onChange(selected)
      }}
    ></Dropdown>
  )
}

export const CustomSelect = ({
  optionsToBe,
  onChange,
}: {
  optionsToBe: NasaObject[]
  onChange: (option: NasaObject) => void
}) => {
  return (
    <Dropdown
      options={dropDownFormatConversion(optionsToBe)}
      placeholder="Select an option"
      onChange={(event, o) => {
        if (!o) {
          return
        }
        let selected = optionsToBe.filter(obj => {
          return obj.date === o.key
        })
        onChange(selected[0])
      }}
    ></Dropdown>
  )
}

//TODO dropdown doesnt open when shrunk!
