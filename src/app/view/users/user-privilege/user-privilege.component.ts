import {Component} from '@angular/core';
import {UserService} from "../../../../api-service/service/UserService";
import {ApiResultFormatModel} from "../../../../api-service/model/common/ApiResultFormatModel";
import {UserModel} from "../../../../api-service/model/UserModel";
import {PrivilegeService} from 'src/api-service/service/PrivilegeService';
import Swal from 'sweetalert2';

interface data {
  value: string;
  label: string;
}

@Component({
  selector: 'app-user-privilege',
  templateUrl: './user-privilege.component.html',
  styleUrls: ['./user-privilege.component.scss']
})
export class UserPrivilegeComponent {
  public userList: Array<UserModel> = [];
  public privilegeList = [];
  public userWisePrivilegeList = [];
  public checkedIds = [];
  public unCheckedIds = [];
  public tempIdList = [];
  public selectedUserCode: string;

  emptyUsersForRole= false;
  emptyUserPrivileges= false;
  disableSubmitBtn= false;

  userRoles: data[] = [
    { label: 'ROLE_SUPER_ADMIN', value: 'super-admin' },
    { label: 'ROLE_ADMIN', value: 'admin' },
    { label: 'ROLE_DOCTOR', value: 'doctor' },
    { label: 'ROLE_MANAGER', value: 'manager' },
    { label: 'ROLE_MARKETING', value: 'marketing' },
    { label: 'ROLE_MARKETING_MANAGER', value: 'marketing-manager' },
    { label: 'ROLE_ACCOUNTANT', value: 'accountant' },
    { label: 'ROLE_ACCOUNTANT_MANAGER', value: 'accountant-manager' },
    { label: 'ROLE_PRODUCTION_MANAGER', value: 'production-manager' },
    { label: 'ROLE_STORE_KEEPER', value: 'store-keeper' },
    { label: 'ROLE_RIDER', value: 'rider' },
  ];

  constructor(private userService: UserService, private privilegeService: PrivilegeService) {
    this.getAllPrivilagesList();
  }

  getAllPrivilagesList() {
    this.privilegeList = [];
    this.userWisePrivilegeList = [];
    this.privilegeService.getAllPrivileges().subscribe((value: ApiResultFormatModel) => {
      if (value.statusCode == 200) {
        value.data.forEach((privilege: any) => {
          this.privilegeList.push(privilege)
        })
      }

    }
    );
  }

  setRoleSingleValue(value: string) {
    this.getUsersListForRole(value);
    this.getAllPrivilagesList();
    this.selectedUserCode ='';
    this.resetLists();
  }

  getUsersListForRole(role: string) {
    const payload = {
      roles: [role]
    }
    this.userList = [];
    this.emptyUsersForRole = false;
    this.userService.getUserRolWiseUser(payload).subscribe((value: ApiResultFormatModel) => {
      if (value.statusCode == 200) {
        value.data.forEach((rider: any) => {
          const riderData: UserModel = rider;
          this.userList.push(riderData)
        })
      }
    }, error => {
      this.emptyUsersForRole = true;
    })
  }

  selectUser(value: string) {
    this.resetLists();
    this.selectedUserCode = value;
    const payload = {
      userCode: value
    }

    this.userService.getUserWiseUserPrivilege(payload).subscribe((value: ApiResultFormatModel) => {
      if (value.statusCode == 200) {
        value.data.forEach((userWisePrivilege: any) => {
          this.userWisePrivilegeList.push(userWisePrivilege)

        })
      }
    }, error=>{
        this.emptyUserPrivileges = true;
      }
    );

  }

  isPrivilegeChecked(privilegeId: number): boolean {
    return this.userWisePrivilegeList.some(item => item.privilegeId === privilegeId);
  }

  togglePrivilegeCheckbox(event: any, data: any) {
    let hasPrivilageId = this.tempIdList.some(num => num === data.privilegeId);
      // ||
      // this.userWisePrivilegeList.some(item => item.privilegeId === data.privilegeId);

    if (!hasPrivilageId) {
      // id not in list
      this.tempIdList.push(data.privilegeId)

      if (event.target.checked) {
        this.checkedIds.push(data.privilegeId)
      } else {
        this.unCheckedIds.push(data.privilegeId)
      }

    } else {
      // id already in list
      // this.tempIdList = this.tempIdList.filter(num => num !== data.privilegeId);
      if (event.target.checked) {
        this.unCheckedIds = this.unCheckedIds.filter(num => num !== data.privilegeId);
      } else {
        this.checkedIds = this.checkedIds.filter(num => num !== data.privilegeId);
      }
    }

    console.log('checked list')
    console.log(this.checkedIds)
    console.log('unchecked list')
    console.log(this.unCheckedIds)
  }

  onSubmit() {
    let checkedListBool = false;
    let unCheckedListBool = false;
    this.disableSubmitBtn = true;

    if (this.checkedIds.length > 0) {
      console.log('cjeck')
      const payload = {
        userCode: this.selectedUserCode,
        privilegeIds: this.checkedIds,
        status: 1
      }

      this.privilegeService.assignPrivileges(payload).subscribe((value: ApiResultFormatModel) => {
        if (value.statusCode == 200) {
         checkedListBool = true;
        }
      }
      );

    }


    if (this.unCheckedIds.length > 0) {
      console.log('uncjeck')
      const payload = {
        userCode: this.selectedUserCode,
        privilegeIds: this.unCheckedIds,
        status: 0
      }

      this.privilegeService.assignPrivileges(payload).subscribe((value: ApiResultFormatModel) => {
        if (value.statusCode == 200) {
          unCheckedListBool = true;
        }
      }
      );
    }

    console.log('checkedListBool :'+checkedListBool)
    console.log('unCheckedListBool :'+unCheckedListBool)
    // if (unCheckedListBool || checkedListBool){

    setTimeout(() => {
      Swal.fire({
        title: '',
        text: 'Privilege Updated!',
        icon: 'success',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        showConfirmButton: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.resetLists();
          this.selectUser(this.selectedUserCode);
          this.disableSubmitBtn = false;
          window.scrollTo({ top: 0 });
        }
      });
    }, 3000)
  }

  resetLists(){
    this.userWisePrivilegeList = [];
    this.tempIdList =[];
    this.checkedIds =[];
    this.unCheckedIds =[];
    this.emptyUserPrivileges =false;
  }

}
