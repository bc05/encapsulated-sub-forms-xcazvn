import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, ControlContainer} from '@angular/forms';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit, OnDestroy {

    @Input() control: AbstractControl;
    @Input() errorMessages: {[key: string]: string} = {};

    public error: string;

    private controlValueSubscription;
    private controlStatusSubscription;

    constructor() {
    }

    ngOnInit() {
      if (this.control) {
        this.controlValueSubscription = this.control.valueChanges.subscribe((value) => {
            this.buildError();
        });

        this.controlStatusSubscription = this.control.statusChanges.subscribe((value) => {
            this.buildError();
        });
      }
    }

    ngOnDestroy(): void {
        this.controlValueSubscription.unsubscribe();
        this.controlStatusSubscription.unsubscribe();
    }

    public clearError (): void {
        this.control.markAsUntouched();
    }

    private buildError(): void {
        if (!this.control.invalid) {
            return;
        }

        const errorKeys = Object.keys(this.control.errors);
        const errorAccumulator = [];

        for (let i = 0; i < errorKeys.length; i++) {
            const errorKey = errorKeys[i];

            if (this.control.errors[errorKey] === null) {
                break;
            }

            if (this.errorMessages[errorKey]) {
                errorAccumulator.push(this.errorMessages[errorKey]);
            } else {
                const error = this.control.errors[errorKey];

                if (typeof error === 'string') {
                    errorAccumulator.push(error);
                } else {
                    // Messages for boolean type validation go here
                    switch (errorKey) {
                        case 'required': errorAccumulator.push('This field is required'); break;
                        case 'pattern': errorAccumulator.push('Please only insert valid values'); break;
                        default: errorAccumulator.push('This field is invalid');
                    }
                }
            }
        }

        this.error = (errorAccumulator.join('. ') + '.').replace(/\.\s?\./, '.');
    }
}
