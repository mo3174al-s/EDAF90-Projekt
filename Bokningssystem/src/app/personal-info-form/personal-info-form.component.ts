import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-personal-info-form',
  templateUrl: './personal-info-form.component.html',
  styleUrls: ['./personal-info-form.component.css']
})
export class PersonalInfoFormComponent {
  name = new FormControl('', [Validators.required]);
  personnummer = new FormControl('', [Validators.pattern(/^\d{6}-\d{4}$/)]);

 getErrorMessage() {
  if (this.name.invalid) {
    return 'Please enter your name.';
  }

  if (this.personnummer.invalid) {
    return 'Please enter a valid personal number (YYMMDD-XXXX).';
  }

  return 'Encountered an error';
  }
}
