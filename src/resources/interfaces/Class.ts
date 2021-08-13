/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

export abstract class ComplicatedString {
  [extra: string]: any;
  public constructor() { }
  public abstract toString(): any
}

ComplicatedString.prototype.toString = function () {
  return this.toString()
}
