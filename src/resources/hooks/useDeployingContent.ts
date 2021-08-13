import { useState } from "react"


export default function useDeployingContent(modifiers?: Array<string | undefined | null>) {
  const [deployed, setDeployed] = useState<boolean>(false)
  const [height, setHeight] = useState<number | undefined>()

  if (modifiers) {

    if (deployed) {
      modifiers.push("deployed")
    }

  }
  
  return {
    height,
    deployed,
    setDeployed,
    deployRef: (el: HTMLElement) => setHeight(el.scrollHeight)
  }
}
