import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerService} from "../../../../api-service/service/CustomerService";
import Swal from "sweetalert2";



@Component({
  selector: 'app-addcustomer',
  templateUrl: './addmember.component.html',
  styleUrls: ['./addmember.component.scss']
})
export class AddmemberComponent  {
  customerForm: FormGroup;



  constructor(private customerService: CustomerService) {
    // this.getDeliveryCities();
    this.customerForm = new FormGroup({});
    this.createForm();
  }


  createForm(){
    this.customerForm = new FormGroup({
      MemberName: new FormControl(''),
      address: new FormControl(''),
      country: new FormControl(''),
      city: new FormControl(''),
      memberNic: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      mobileNumOne: new FormControl('',Validators.pattern('^(0|[1-9][0-9]*)$')),
      // createDateTime: new FormControl('2024-01-31'),
      createBy: new FormControl(sessionStorage.getItem('userId')),
      isActive: new FormControl('1'),
    });
  }

  onSubmit() {
    console.log(this.customerForm.value)
    this.customerService.saveCustomer(this.customerForm.value).subscribe(
      data => {
        Swal.fire({
          title: '',
          text: 'Customer Save Success!',
          icon: 'success',
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.createForm();
          }
        });
      },
      error => {
        console.log(error)
      }
    );
  }

  cancel() {
    this.customerForm?.reset();
  }

  getCustomerByMobile(){
    if (this.customerForm.get('mobileNumOne')?.value) {

      const payload = {
        mobileNumOne: this.customerForm.get('mobileNumOne')?.value
      }

      this.customerService.getCustomerDetailByMobileNumOne(payload).subscribe(
        data => {
          this.customerForm.patchValue(data.data);
        },
        error => {
          console.log(error)
        }
      );
    }
  }



}
