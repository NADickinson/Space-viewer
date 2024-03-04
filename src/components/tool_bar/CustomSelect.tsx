import { Dropdown, IDropdownOption } from '@fluentui/react'
import React from 'react'
import { NasaObject } from '../../App'

export const dropDownFormatConversion = (objArray: NasaObject[]) => {
  return objArray.map(item => {
    return { key: item.date, text: item.title }
  })
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
