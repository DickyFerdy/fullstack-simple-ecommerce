const Button = ({ name, handle, disabled=false }) => {
  return (
    <button
      className="inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      type="submit" onClick={handle} disabled={disabled}>
      {name}
    </button>
  )
}

export default Button;