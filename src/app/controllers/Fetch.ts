/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

class Fetch {
  public static History: Response[] = []
  public static Errors: Record<string, Error> = {}
  /**
   * Parse fetch with some error handlers.
   * Write history in development mode.
   */
  public static json(response: Response) {
    if (process.env.NODE_ENV === "development") {
      Fetch.History.push(response)
    }
    try {
      return response.json()
    } catch (error) {
      throw new Error("Ошибка FetchJson: Вероятно ошибка в ответе сервера")
    }
  }
  /**
   * Write history in development mode
   */
  public static error(error: Error) {
    if (process.env.NODE_ENV === "development") {
      Fetch.Errors[error.message] = error
      throw error
    }
  }
}

export default Fetch
