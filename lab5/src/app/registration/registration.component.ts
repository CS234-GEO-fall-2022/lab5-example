import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  cityList: string[];
  isSubmitted: boolean;
  
  customValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    let password = control.get('password').value;
    let confirmPassword = control.get('confirmPassword').value;

    return password !== confirmPassword ? {passwordMismatch: true} : null;
  };

  registrationForm = this.fb.group({
    name: ['', [Validators.required, 
                Validators.minLength(2), 
                Validators.pattern('[A-Za-z]+$')]
              ],
    surname: ['', [Validators.minLength(2), Validators.pattern('[A-Za-z]+$')]],
    city: [[]],
    phoneNumber: ['', Validators.pattern('^5[1-9]*$')],
    email: ['', [Validators.required, 
                 Validators.email]
                ],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    agreeWithTermsAndConditions: [false, [Validators.requiredTrue]]
  }, { validator: this.customValidator});

  constructor(private fb: FormBuilder) { }

  get name() { return this.registrationForm.controls['name'] }
  get surname() { return this.registrationForm.controls['surname'] }
  get city() { return this.registrationForm.controls['city'] }
  get phoneNumber() { return this.registrationForm.controls['phoneNumber'] }
  get email() { return this.registrationForm.controls['email'] }
  get password() { return this.registrationForm.controls['password'] }
  get confirmPassword() { return this.registrationForm.controls['confirmPassword'] }
  get agreeWithTermsAndConditions() { return this.registrationForm.controls['agreeWithTermsAndConditions'] }


  ngOnInit(): void {
    this.cityList = ['თბილისი', 'ბათუმი', 'თელავი', 'ქუთაისი']
  }

  onSubmit(){
    this.isSubmitted = true;
    console.log(this.registrationForm);
  }

}
