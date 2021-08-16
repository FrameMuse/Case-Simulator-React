/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { useLayoutEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { CasePreviewProps } from "resources/interfaces/case"
import { CaseLocationState } from "views/case"

export default function CasePreview(props: CasePreviewProps & { hidden?: boolean }) {
  // const caseTrans = useTranslation(trans => trans.views.case)
  const casePreviewImageRef = useRef<HTMLImageElement | null>(null)
  const snapshot = useRef<ReturnType<typeof getSnapshot> | null>(null)
  function getSnapshot() {
    const rect = casePreviewImageRef.current?.getBoundingClientRect()
    console.log(rect)

    return {
      scrollY,
      rect
    }
  }
  useLayoutEffect(() => {
    // snapshot.current = getSnapshot()
  }, [props, getSnapshot])
  return (
    <div className="case-preview" hidden={props.hidden}>
      <div className="case-preview__image-section">
        <img src={"/assets/images/cases/id_" + props.id + ".png"} alt={"Case " + props.title} className="case-preview__image" ref={casePreviewImageRef} />
      </div>
      <div className="case-preview__title">{props.title || "unnamed > " + props.id}</div>
      <div className="case-preview__bottom">
        {Boolean(props.price) && (
          <div className="case-preview__price">
            <span className="case-preview__text">{props.price.toPrice()}</span>
          </div>
        )}
      </div>
      <Link className="ghost" onMouseDown={() => snapshot.current = getSnapshot()} to={{
        state: {
          snapshot,
          noScrollBack: true
        } as CaseLocationState,
        pathname: "/case/" + props.id,
      }} />
    </div >
  )
}
