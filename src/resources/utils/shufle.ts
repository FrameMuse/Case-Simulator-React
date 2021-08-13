/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

function shuffleArray<T = any>(array: T[]) {
  const newArray = [...array]
  for (const element of newArray) {
    const index = newArray.indexOf(element)

    const randomIndex = Math.floor(Math.random() * index)
    const randomElement = newArray[randomIndex]

    newArray[index] = randomElement
    newArray[randomIndex] = element
  }
  return newArray
}

export default shuffleArray
