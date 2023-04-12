import { Component, OnInit, forwardRef } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  ControlValueAccessor,
  Validators,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-sub-form',
  templateUrl: './sub-form.component.html',
  styleUrls: ['./sub-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SubFormComponent),
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SubFormComponent),
      multi: true,
    },
  ],
})
export class SubFormComponent
  implements OnInit, ControlValueAccessor, Validator
{
  public form: FormGroup;

  private changed;
  private touched;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      input: [null, [Validators.required]],
    });

    this.form.valueChanges.subscribe((val) => {
      this.touched();
      this.changed(val);
    });
  }

  writeValue(value) {}

  registerOnChange(fn) {
    this.changed = fn;
  }

  registerOnTouched(fn) {
    this.touched = fn;
  }

  validate(control: AbstractControl): ValidationErrors {
    return this.form.invalid
      ? {
          invalid: true,
        }
      : null;
  }
}
