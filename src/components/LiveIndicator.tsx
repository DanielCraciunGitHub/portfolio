export const LiveIndicator = () => {
  return (
    <div className="relative">
      <div className="absolute -top-2 left-0.5">
        <div className="relative">
          <span className="absolute inline-flex size-3 animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex size-3 rounded-full bg-red-500" />
        </div>
      </div>
    </div>
  )
}
