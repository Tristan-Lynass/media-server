import { AbstractControl, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { isDefined, Nullable } from 'src/app/lang-util';

/**
 * A FormControl that carries type safe semantics.
 */
export interface TypedFormControl<V> extends FormControl {

  readonly valueChanges: Observable<V>;

  readonly value: V | null;

}

/**
 * Should be used only to simplify the declaration of rows by allocating fields holding references to the expected form controls.
 * Throws an error if the expected form control does not exist, or is not a form control.
 *
 */
export function formControl<V = any>(container: AbstractControl, path: Array<string | number> | string): TypedFormControl<V> {
  const control = mustHave(container.get(path), `No such form control: ${path}`);
  if (!(control instanceof FormControl)) {
    throw Error(`Not a form control: ${path}`);
  }
  // TODO consider a type assertion return
  return control as TypedFormControl<V>;
}

/**
 * Utility function that checks if passed in value is null or undefined.
 *
 * @param value Of any type.
 * @param message That will be thrown if value is null or undefined.
 * @returns Passed in value, or throws error if value is null or undefined.
 */
export function mustHave<T>(value: Nullable<T>, message: string = 'Required value was not set'): NonNullable<T> {
  if (isDefined(value)) {
    return value;
  }
  throw Error(message);
}
