/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import WeaponSkeleton from "app/skeletons/weapon"
import { classWithModifiers } from "../../resources/utils"

export default function CaseSkeletonScrolling({ multiply, type }: { multiply?: number, type?: "flat" }) {
  return (
    <div className={classWithModifiers("case-page-scroll", [type])} style={{ "--weapon-scroll-x": "-19.5em" }}>
      {[...Array(multiply)].map((_, index) => (
        <CaseSection key={"CaseSection_" + index} />
      ))}
    </div>
  )
}

function CaseSection() {
  return (
    <div className="case-page-scroll__section">
      <div className="case-page-scroll__inner case-page-scroll__inner--animation">
        <WeaponSkeleton />
        <WeaponSkeleton />
        <WeaponSkeleton />
        <WeaponSkeleton />
        <WeaponSkeleton />
        <WeaponSkeleton />
        <WeaponSkeleton />
        <WeaponSkeleton />
        <WeaponSkeleton />
        <WeaponSkeleton />
        <WeaponSkeleton />
        <WeaponSkeleton />
        <WeaponSkeleton />
        <WeaponSkeleton />
        <WeaponSkeleton />
        <WeaponSkeleton />
        <WeaponSkeleton />
        <WeaponSkeleton />
        <WeaponSkeleton />
        <WeaponSkeleton />
        <WeaponSkeleton />
      </div>
    </div>
  )
}
