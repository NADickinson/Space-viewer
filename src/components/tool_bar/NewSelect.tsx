export const NewSelect = ({
  options,
  onChange,
  toText,
  placeHolder,
  toVal,
}: {
  options: any[]
  onChange: (option: any) => void
  toText: (option: any) => string
  toVal: (option: any) => string
  placeHolder?: string
}) => {
  return (
    <select className="custom_select" onChange={e => onChange(options.find(o => toVal(o) === e.target.value))}>
      <option value="" disabled>
        {placeHolder}
      </option>
      {options.map(option => {
        return <option value={toVal(option)}>{toText(option)}</option>
      })}
    </select>
  )
}
