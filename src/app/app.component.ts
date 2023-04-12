import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  public ngOnInit() {
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      subForm: [null],
    });
  }

  public doStuff() {
    this.form.markAllAsTouched();
  }
}
