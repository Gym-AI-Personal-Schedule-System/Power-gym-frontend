import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from "sweetalert2";
import {AuthService} from "../../../../api-service/service/AuthService";
import {UserService} from "../../../../api-service/service/UserService";



@Component({
  selector: 'app-addcustomer',
  templateUrl: './addmember.component.html',
  styleUrls: ['./addmember.component.scss']
})
export class AddmemberComponent  {
  customerForm: FormGroup;
  Female?:string= "Female";
  Male?:string="Male";



  constructor(private userService: UserService,private authService:AuthService) {
    // this.getDeliveryCities();
    this.customerForm = new FormGroup({});
    this.createForm();
    this.customerForm.get('height')?.valueChanges.subscribe(() => this.calculateBMI());
    this.customerForm.get('weight')?.valueChanges.subscribe(() => this.calculateBMI());
  }


  createForm(){
    this.customerForm = new FormGroup({
      mobileNum: new FormControl('',Validators.pattern('^(0|[1-9][0-9]*)$')),
      name: new FormControl(''),
      address: new FormControl(''),
      gender: new FormControl(''),
      height: new FormControl(0),
      weight: new FormControl(0),
      bmi: new FormControl(0),
      age: new FormControl(0),
      role: new FormControl(['ROLE_MEMBER']),
      username: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      isActive: new FormControl('1'),

    });
  }
  calculateBMI() {
    const height = this.customerForm.get('height')?.value;
    const weight = this.customerForm.get('weight')?.value;
    if (height && weight) {

      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      this.customerForm.patchValue({bmi: bmi.toFixed(2)});

    }
  }

  onSubmit() {
    this.authService.addUser(this.customerForm.value).subscribe(
      data => {
        Swal.fire({
          title: '',
          text: 'Member Save Success!',
          icon: 'success',
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.createForm();
          }
        });
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error.message,
          confirmButtonText: 'OK'
        });
      }
    );
  }

  cancel() {
    this.customerForm?.reset();
  }

  isValidValue(value: any): boolean {
    return value !== null && value !== undefined && value !== '';
  }

  getUserDataByMobileNumber(){
    if (this.customerForm.get('mobileNum')?.value) {

      const payload = {
        mobileNum: this.customerForm.get('mobileNum')?.value
      }

      this.userService.getUserDataByMobileNumber(payload).subscribe({
        next: (response) => {
          if (response.statusCode === 200 && response.data) {
            const userData = response.data;
            // Patch the form with user data
            this.customerForm.patchValue({
              name: this.isValidValue(userData.name) ? userData.name : '',
              address: this.isValidValue(userData.address) ? userData.address : '',
              username: this.isValidValue(userData.username) ? userData.username : '',
              email: this.isValidValue(userData.email) ? userData.email : '',
              mobileNum: this.isValidValue(userData.mobileNum) ? userData.mobileNum : '',
              age: this.isValidValue(userData.age) ? userData.age : '0',
              height: this.isValidValue(userData.height) ? userData.height : '0',
              weight: this.isValidValue(userData.weight) ? userData.weight : '0',
              bmi: this.isValidValue(userData.bmi) ? userData.bmi : '0'
            });

            if (userData.gender) {
              this.customerForm.patchValue({
                gender: userData.gender
              });
            }
          } else {
            Swal.fire({
              icon: 'error',
              title: 'User Not Found',
              text: `No user found with the provided contact number.`,
              confirmButtonText: 'OK'
            });
          }
        },
        error: (error) => {
          console.error('Error fetching user data', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error.message,
            confirmButtonText: 'OK'
          });

        }
      });
    }
  }


  clearFrom() {
    this.customerForm.reset({
      mobileNum: '',
      name: '',
      address: '',
      gender: '',
      height: 0,
      weight: 0,
      bmi: 0,
      age: 0,
      role: ['ROLE_MEMBER'],
      username: '',
      email: '',
      password: '',
      isActive: '1'
    });
  }
}
