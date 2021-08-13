/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

export default function Row({ children, gap }: { children: any, gap?: string }) {
  return (
    <div className="row" style={{ "--row-margin-left": gap } as any}>{children}</div>
  )
}
