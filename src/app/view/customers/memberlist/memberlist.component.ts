import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../api-service/service/UserService";


@Component({
  selector: 'app-customerlist',
  templateUrl: './memberlist.component.html',
  styleUrls: ['./memberlist.component.scss'],
})
export class MemberlistComponent implements OnInit{
  tableData: any[] = [];  // Array to store the member data

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadMemberList();
  }

  private loadMemberList() {
    this.userService.getActiveMemberList().subscribe((response: any) => {
      if (response.statusCode === 200) {
        this.tableData = response.data;
      } else {
        console.error("Error fetching members:", response.message);
      }
    }, error => {
      console.error("Request failed:", error);
    });
  }

  deleteButton(member: any) {
    console.log("Delete member with ID:", member.id);
  }
}
