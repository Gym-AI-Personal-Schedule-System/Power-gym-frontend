import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerService} from "../../../../api-service/service/CustomerService";
import {DeliveryCityService} from "../../../../api-service/service/DeliveryCity.service";
import Swal from "sweetalert2";
import {ApiResultFormatModel} from "../../../../api-service/model/common/ApiResultFormatModel";

interface Data {
  value: string;
}

@Component({
  selector: 'app-addcustomer',
  templateUrl: './addmembor.component.html',
  styleUrls: ['./addmembor.component.scss']
})
export class AddmemborComponent implements OnInit {
  customerForm: FormGroup;
  cityArray:any =[];

  selectedValue1 = '';
  selectedValue2 = '';
  selectedList1: Data[] = [
    {value: 'Choose Country'}, // Consider removing this as it's not a valid choice
    {value: 'SL'},
    // Add other countries as needed
  ];
  selectedList2: Data[] = [
    {value: 'Choose City'}, // Consider removing this as it's not a valid choice
    {value: 'Ja ela'},
    {value: 'Colombo'},
    {value: 'Galle'},
    // Add other cities as needed
  ];

  cityList: any[];


  constructor(private customerService: CustomerService, private deliveryCitiesService: DeliveryCityService) {
    // this.getDeliveryCities();
    this.customerForm = new FormGroup({});
    this.createForm();
  }

  ngOnInit() {
    this.getAllCityByJson();
  }

  getAllCityByJson() {
    this.deliveryCitiesService.getAllCityListByJson().subscribe((values: ApiResultFormatModel) => {
      this.cityList = values.data;
    });
  }



  createForm(){
    this.customerForm = new FormGroup({
      customerName: new FormControl(''),
      address: new FormControl(''),
      country: new FormControl(''),
      city: new FormControl(''),
      mobileNumOne: new FormControl('',Validators.pattern('^(0|[1-9][0-9]*)$')),
      mobileNumTwo: new FormControl('',Validators.pattern('^(0|[1-9][0-9]*)$')),
      // createDateTime: new FormControl('2024-01-31'),
      createBy: new FormControl(sessionStorage.getItem('userId')),
      isActive: new FormControl('1'),
    });
  }
  getDeliveryCities(){
    this.deliveryCitiesService.getActiveDeliveryCity().subscribe(
      data => {
        this.cityArray = data.data
      },
      error => {
        console.log(error)
      }
    );
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

  onChangeSelect(event) {
    console.log(event)
    // const selectedValue = event.value;

  }

}
