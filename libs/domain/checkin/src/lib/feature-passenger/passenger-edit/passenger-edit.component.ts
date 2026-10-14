import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, input, numberAttribute } from '@angular/core';
import { FormField, form, required, schema, SchemaPath, validate } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { initialPassenger, Passenger } from '../../logic-passenger/model/passenger';

export function validateLastname(
  field: SchemaPath<string>,
  allowedLastnames: string[],
  message: string
): void {
  validate(field, ({ value }) =>
    allowedLastnames.includes(value())
      ? null
      : {
          kind: 'forbiddenLastname',
          message: message + ' Allowed last names: ' + allowedLastnames.join(', ')
        }
  );
}

export const passengerSchema = schema<Passenger>(passengerPath => {
  required(passengerPath.name, { message: 'Please enter a last name.' });
  validateLastname(passengerPath.name, ['Mustermann', 'Smith'],
    'The entered last name is not allowed.');
});

@Component({
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection -- preserves the workshop's pre-v22 behavior
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-passenger-edit',
  imports: [RouterLink, FormField],
  templateUrl: './passenger-edit.component.html'
})
export class PassengerEditComponent {
  readonly id = input(0, { transform: numberAttribute });
  protected readonly passengerResource = httpResource<Passenger>(
    () => `https://demo.angulararchitects.io/api/passenger?id=${this.id()}`,
    { defaultValue: initialPassenger }
  );
  protected readonly editForm = form(this.passengerResource.value, passengerSchema);

  protected save(): void {
    console.log(this.editForm().value(), this.passengerResource.value());
  }
}
