const Input = ({ id, type, name, placeholder, onChange }) => {
  return (
    <input
      className="h-10 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
      id={id}
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange} />
  )
}

export default Input;