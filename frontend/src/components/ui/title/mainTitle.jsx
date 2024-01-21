const MainTitle = ({ title }) => {
  return (
    <div className="flex items-center gap-4">
      <h1 className="font-semibold text-lg md:text-xl">
        <span className="font-normal text-gray-800">
          {title}
        </span>
      </h1>
    </div>
  )
}

export default MainTitle;