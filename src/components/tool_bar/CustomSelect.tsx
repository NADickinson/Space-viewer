import { Dropdown, IDropdownOption } from '@fluentui/react'
import React from 'react'
import { NasaObject } from '../../App'

// const options: IDropdownOption[] = [
//   { key: 'ssss', text: '2222' },
//   { key: 'dddd', text: '111' },
// ]

export const dropDownFormatConversion = (objArray: NasaObject[] | undefined) => {
  console.log(objArray)
  if (!Array.isArray(objArray)) {
    return
  }
  return objArray.map(item => {
    return { key: item.date, text: item.title }
  })
}

export const CustomSelect = ({ options }: { options: IDropdownOption[] | undefined }) => {
  if (options === undefined) {
    return <Dropdown options={[]}> </Dropdown>
  }

  return <Dropdown options={options}></Dropdown>
}
