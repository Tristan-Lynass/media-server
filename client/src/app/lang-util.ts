export function isDefined<T>(value: T): value is NonNullable<T> {
  return value != null;
}

export function isNotDefined<T>(value: Nullable<T>): value is Nullish {
  return !isDefined(value);
}

export type Nullish = null | undefined;

export type Nullable<T> = T | Nullish;
