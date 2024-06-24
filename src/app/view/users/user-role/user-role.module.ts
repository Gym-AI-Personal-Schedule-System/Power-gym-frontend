import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UserPrivilegeRoutingModule} from "../user-privilege/user-privilege-routing.module";
import {sharedModule} from "../../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {UserRoleComponent} from "./user-role.component";
import {UserRoleRoutingModule} from "./user-role-routing.module";

@NgModule({
  declarations: [
    UserRoleComponent
  ],
  imports: [
    CommonModule,
    UserRoleRoutingModule,
    sharedModule,
    ReactiveFormsModule
  ]
})
export class UserRoleModule{}
