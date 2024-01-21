const ContentTitle = ({ title }) => {
  return (
    <div className="flex flex-col space-y-1.5 p-6">
      <div className="text-2xl font-semibold leading-none tracking-tight">
        {title}
      </div>
    </div>
  )
}

export default ContentTitle;