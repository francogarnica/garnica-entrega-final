import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'controlErrorMessage'
})
export class ControlErrorMessagePipe implements PipeTransform {

  transform(error: { key: string, value: any }, ...args: unknown[]): unknown {
    const erorrMessages: Record<string, string> = {
      required: 'Este campo es requerido',
      email: 'Debe ser un email valido',
      minlength: 'Debe tener más de 2 caracteres',
      maxlength: 'No debe tener más de 20 caracteres',
      pattern: 'La contraseña debe contener al menos 1 digito',
    };

    return erorrMessages[error.key];
  }

}
