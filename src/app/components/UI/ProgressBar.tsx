/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

interface ProgressBarProps {
  className: string
}

export default function ProgressBar(props: ProgressBarProps) {
  return (
    <div className="progress-bar">
      <div className="progress-bar__line" style={{ width: 1 + "%" }} />
    </div>
  )
}
