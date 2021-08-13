/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

export default function Flex({ children, style }: { children: any; style?: Partial<CSSStyleDeclaration> }) {
  return (
    <div className="flex" style={{ ...style, columnGap: null, "--flex-rowGap": style?.columnGap } as any}>
      {children}
    </div>
  )
}
