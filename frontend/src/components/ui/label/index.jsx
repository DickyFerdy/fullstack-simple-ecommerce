const Label = ({ name }) => {
  return (
    <label
      className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {name}
    </label>
  )
}

export default Label;