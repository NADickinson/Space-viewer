import { Dropdown, IDropdownOption } from '@fluentui/react'
import React from 'react'

// const options: IDropdownOption[] = [
//   { key: 'ssss', text: '2222' },
//   { key: 'dddd', text: '111' },
// ]

export const CustomSelect = ({ options }: { options: IDropdownOption[] }) => {
  return <Dropdown options={options}></Dropdown>
}
