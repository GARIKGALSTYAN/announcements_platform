export function parseToNumber(value: undefined | string | number): undefined | number {
  if (!value) {
    return undefined;
  } else {
    return Number(value);
  }
}

export function parseToNumberArray(value: undefined | string[]): undefined | number[] {
  if (!value) {
    return undefined;
  } else {
    return value.map((v) => Number(v));
  }
}
