import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../api-service/service/UserService";
import Swal from "sweetalert2";
import * as XLSX from 'xlsx';
import {saveAs} from "file-saver";


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


  generateExcel() {
    if (this.tableData.length === 0) {
      Swal.fire('Error', 'No data available to export', 'error');
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(this.tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Trip Reports');
    const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    this.saveAsExcelFile(excelBuffer, 'user-report');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    saveAs(data, `${fileName}_${new Date().getTime()}.xlsx`);
  }
}
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
