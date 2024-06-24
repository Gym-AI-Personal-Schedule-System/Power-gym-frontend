import {Component} from '@angular/core';
import {routes} from 'src/app/core/routes-path/routes';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../../api-service/service/Product.service";
import {apiResultFormat} from "../../../core/models/models";
import Swal from "sweetalert2";
import {UserService} from "../../../../api-service/service/UserService";
import {ApiResultFormatModel} from "../../../../api-service/model/common/ApiResultFormatModel";
import {UserModel} from "../../../../api-service/model/UserModel";

interface data {
  value: string;
}

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent {
  public routes = routes;
  public selectedValue1 = '';
  public selectedValue2 = '';
  public selectedValue3 = '';

  public selectedCategoryCode = '';
  public selectedSubCategoryCode = '';

  public selectedRoleUsers: Array<UserModel> = [];

  productForm: FormGroup;
  userForm: FormGroup;

  usersLit: any = [];
  supplierList: any = [];
  categoryList: any = [];
  subCategoryList: any = [];

  errorLoadingUsers = false;
  validateSellingPrice = false;

  constructor(private productService: ProductService, private userService: UserService) {
    // this.redo();
    this.productForm = new FormGroup({});
    this.userForm = new FormGroup({});
    this.createForm();
    this.getActiveProductSupplierList();
    this.getCategoryList();

  }

  createForm() {
    this.productForm = new FormGroup({
      brandName: new FormControl('',Validators.required),
      productName: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required),
      costPrice: new FormControl('',Validators.required),
      sellingPrice: new FormControl('',Validators.required),
      productQty: new FormControl('',Validators.required),
      categoryCode: new FormControl('',Validators.required),
      categoryID: new FormControl('',Validators.required),
      subCategoryID: new FormControl('',Validators.required),
      productSupplierID: new FormControl('',Validators.required),
      commissionList: new FormControl(''),
      createBy: new FormControl(sessionStorage.getItem('userId')),
      isActive: new FormControl('1'),
    });

    this.userForm = new FormGroup({
      commissionRole: new FormControl('',Validators.required),
      commissionBy: new FormControl('',Validators.required),
      commissionRate: new FormControl('',Validators.required),
      commissionPrice: new FormControl('',Validators.required),
    });
  }


  getActiveProductSupplierList() {
    this.productService.getActiveProductSupplierList().subscribe(
      data => {
        this.supplierList = data.data;
      },
      error => {
        this.errorMassage(error);
      }
    );
  }

  getCategoryList() {
    this.productService.getAllActiveCategoryList().subscribe(
      (apiRes: apiResultFormat) => {
        this.categoryList = apiRes.data
      }
    )
  }

  onSubmit(x: number) {
    switch (x) {
      case 1:
        // save product
        if (this.productForm.valid){
          if (this.usersLit.length > 0){
            this.productForm.get('commissionList')?.setValue(this.usersLit);
            this.productService.saveProduct(this.productForm.value).subscribe(
              data => {
                Swal.fire(
                  '',
                  'Product Added!.',
                  'success'
                )
              }
            );
          }else{
            Swal.fire(
              '',
              'Please Add Commission.',
              'warning'
            )
          }
        }else{
          Swal.fire(
            '',
            'Please Fill Product Details.',
            'warning'
          )
        }
        break;
      case 2:
        // commision Roles set
        if (this.productForm.valid){
          if (this.userForm.valid){
            this.usersLit.push(this.userForm.value)
            this.userForm.reset();
          }else{
            Swal.fire(
              '',
              'Please Fill Commission Fields.',
              'warning'
            )
          }
        }else{
          Swal.fire(
            '',
            'Please Fill Product Details Fields.',
            'warning'
          )
        }
        break;
    }
  }

  getAllActiveSubCategoryListByCategoryID(event: any) {
    console.log(event)
    if (this.productForm) {
      this.selectedCategoryCode = event.categoryCode;
      this.productForm.get('categoryCode')?.setValue(this.selectedCategoryCode);
      this.productForm.get('categoryID')?.setValue(event.categoryID);
    }
    const payload = {
      categoryID: event.categoryID
    }
    this.productService.getAllActiveSubCategoryListByCategoryID(payload).subscribe(
      data => {
        this.subCategoryList = data.data
      }
    );
  }

  onSubCategorySelected(event: any) {
    if (this.productForm) {
      this.selectedSubCategoryCode = event.subCategoryCode;
      this.productForm.get('categoryCode')?.setValue(this.selectedCategoryCode + this.selectedSubCategoryCode);
      this.productForm.get('subCategoryID')?.setValue(event.subCategoryID);
    }
  }

  commissionPriceCalculate() {
    this.validateSellingPrice = false;
    if (this.productForm.value.sellingPrice){
      const comPrice = (this.userForm.value.commissionRate * this.productForm.value.sellingPrice) / 100;
      this.userForm.get('commissionPrice')?.setValue(comPrice);
    }else{
      this.userForm.get('commissionPrice')?.setValue('');
      this.userForm.get('commissionRate')?.setValue('');
      this.validateSellingPrice = true;
    }

  }

  deleteTableRow(row: number) {
    this.usersLit.splice(row, 1);
    console.log(this.usersLit)
  }

  clearForm() {
    this.productForm.reset();
    this.userForm.reset();
    this.usersLit = [];
  }

  errorMassage(error: any) {
    console.log(error)
    Swal.fire(
      error.error.statusCode,
      error.error.message,
      'error'
    )
  }

  selectCommissionRole(role) {
    this.selectedRoleUsers = [];
    const payload = {
      roles: [role]
    }
    this.userService.getUserRolWiseUser(payload).subscribe(
      (value: ApiResultFormatModel) => {
        this.errorLoadingUsers = false;
        this.selectedRoleUsers = value.data;
      },
      error => {
        this.errorLoadingUsers = true;
      }
    )
  }
}
