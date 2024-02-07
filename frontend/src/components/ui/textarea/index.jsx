const TextArea = ({ id, name, placeholder, onChange }) => {
  return (
    <textarea
      className="flex min-h-[80px] text-sm w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
      id={id}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}

export default TextArea;