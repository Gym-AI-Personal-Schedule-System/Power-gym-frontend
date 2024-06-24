import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../api-service/service/UserService";
import {CommissionService} from "../../../../api-service/service/commission.service";
import {CommissionModel} from "../../../../api-service/model/CommissionModel";
import Swal from "sweetalert2";

@Component({
  selector: 'app-commission-process',
  templateUrl: './commission-process.component.html',
  styleUrls: ['./commission-process.component.scss']
})
export class CommissionProcessComponent implements OnInit {
  commissionGetForm: FormGroup;
  userRoleList = [];
  userList = [];
  selectedRole: string;
  role: string;
  userCode: string;
  user: string;
  isRider: boolean;
  processableCommissions: Array<CommissionModel> = [];
  selectedRows: any[] = [];

  constructor(private fb: FormBuilder, private userService: UserService, private commissionService: CommissionService) {
    this.commissionGetForm = this.createViewUserForm()
  }

  ngOnInit(): void {
    this.selectedRole = '';
    this.userCode = '';
    this.isRider = false;
    // this.getRoles();
  }

  async submitSelectedRows() {
    let rowCount = this.selectedRows.length;
    let successCount = 0; // Counter for successful commissions processed

    // Define a function to process each row asynchronously
    const processRow = async (row) => {
      try {
        let payload;
        // Prepare payload based on role
        if (this.role === 'marketing') {
          payload = {
            marketingBy: this.user,
            productCode: row.productCode,
            orderDetailID: row.orderDetailID
          };
        } else if (this.role === 'doctor') {
          payload = {
            doctorBy: this.user,
            productCode: row.productCode,
            orderDetailID: row.orderDetailID
          };
        } else if (this.role === 'rider') {
          payload = {
            riderBy: this.user,
            productCode: row.productCode,
            orderCode: row.orderCode,
          };
        }

        // Send commission to the backend
        const response = await this.sendCommission(payload);

        // Update UI based on the response
        if (response.statusCode === 200) {
          successCount++; // Increment success counter
          const rowElement = document.querySelector(`tr[data-product-code="${row.productCode}"]`);
          if (rowElement) {
            rowElement.classList.add('bg-success');
          }
        } else {
          const rowElement = document.querySelector(`tr[data-product-code="${row.productCode}"]`);
          if (rowElement) {
            rowElement.classList.add('bg-err');
          }
        }
      } catch (error) {
        const rowElement = document.querySelector(`tr[data-product-code="${row.productCode}"]`);
        if (rowElement) {
          rowElement.classList.add('bg-err');
        }
      } finally {
        rowCount--;
        if (rowCount === 0) {
          // Display success or failure message based on successCount
          if (successCount === this.selectedRows.length) {
            Swal.fire('Success', 'Commissions processed successfully', 'success');
          } else {
            Swal.fire('Failed', 'Some commissions failed to process', 'error');
          }
        }
      }
    };

    // Process each selected row asynchronously
    await Promise.all(this.selectedRows.map(row => processRow(row)));
  }

// Function to send commission to the backend
  async sendCommission(payload) {
    if (this.role === 'marketing') {
      return this.commissionService.processMarketingCommission(payload).toPromise();
    } else if (this.role === 'doctor') {
      return this.commissionService.processDoctorCommission(payload).toPromise();
    } else if (this.role === 'rider') {
      return this.commissionService.processRiderCommission(payload).toPromise();
    } else {
      throw new Error('Invalid role');
    }
  }


  toggleSelection(event: any, commission: any) {
    const checkbox = event.target;
    if (checkbox.checked) {
      this.selectedRows.push(commission);
    } else {
      this.selectedRows = this.selectedRows.filter(row => row !== commission);
    }
  }

  onRoleChange(event: any) {
    this.processableCommissions = []
    this.isRider = event.target.value === 'rider';
    this.getUsers(event.target.value)

  }

  onUserChange(event: any) {
    this.processableCommissions = []
    this.userCode = event.target.value;
  }

  private createViewUserForm() {
    return this.fb.group({
      role: ['', Validators.required],
      user: ['', Validators.required],
    })
  }

  getUsers(role: string) {
    this.userList = [];
    const payload = {
      roles: [role]
    }
    this.userService.getUserRolWiseUser(payload).subscribe(
      next => {
        this.userList = next.data;
      }, () => {
        this.userList = [];
      }
    )
  }

  getRoles() {
    this.userService.getRoles().subscribe(
      next => {
        this.userRoleList = next.data;
      }
    )
  }

  getUnprocessedCommissions() {
    if (this.commissionGetForm.valid) {
      const role = this.commissionGetForm.get('role')?.value;
      console.log(role)
      switch (role) {
        case 'marketing': {
          this.commissionService.getUnprocessedMarketingCommissions(this.userCode).subscribe(
            next => {
              this.processableCommissions = next.data;
              this.commissionGetForm = this.createViewUserForm();
              this.user = this.userCode;
              this.selectedRole = '';
              this.userCode = '';
              this.role = 'marketing'
            }
          )
          break;
        }
        case 'doctor': {
          this.commissionService.getUnprocessedDoctorCommissions(this.userCode).subscribe(
            next => {
              this.processableCommissions = next.data;
              this.commissionGetForm = this.createViewUserForm();
              this.user = this.userCode;
              this.selectedRole = '';
              this.userCode = '';
              this.role = 'doctor'
            }
          )
          break;
        }
        case 'rider': {
          this.commissionService.getUnprocessedRiderCommissions(this.userCode).subscribe(
            next => {
              this.processableCommissions = next.data;
              this.commissionGetForm = this.createViewUserForm();
              this.user = this.userCode;
              this.selectedRole = '';
              this.userCode = '';
              this.role = 'rider'
            }
          )
          break;
        }
      }

    } else {
      this.commissionGetForm.markAllAsTouched();
    }
  }

}
