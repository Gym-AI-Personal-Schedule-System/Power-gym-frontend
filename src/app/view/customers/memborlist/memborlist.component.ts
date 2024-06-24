import {Component} from '@angular/core';
import {Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {
  apiResultFormat,
  pageSelection,
  routes,
} from 'src/app/core/core.index';
import {customerList} from 'src/app/shared/model/page.model';
import {PaginationService, tablePageSize} from 'src/app/shared/shared.index';
import {SweetalertService} from 'src/app/shared/sweetalert/sweetalert.service';
import {CustomerModel} from "src/api-service/model/CustomerModel";
import {CustomerService} from "src/api-service/service/CustomerService";
import Swal from "sweetalert2";


@Component({
  selector: 'app-customerlist',
  templateUrl: './memborlist.component.html',
  styleUrls: ['./memborlist.component.scss'],
})
export class MemborlistComponent {
  public routes = routes;
  initChecked = false;
  public tableData: Array<CustomerModel> = [];
  public pageSize = 10;
  public serialNumberArray: Array<number> = [];
  public totalData = 0;
  showFilter = false;
  dataSource!: MatTableDataSource<customerList>;
  public searchDataValue = '';
  currentPage = 1;
  totalPages = 1;

  constructor(
    private sweetalert: SweetalertService,
    private customerService: CustomerService
  ) {
    this.getTableData(0);
  }

  private getTableData(pageNo: number): void {
    const payload = {
      pageNo: pageNo,
      pageSize: 100
    }
    this.customerService.getCustomerList(payload).subscribe(data => {
      this.tableData = [];
      this.serialNumberArray = [];
      this.tableData = data.data;
      this.totalPages = data.pages;
      this.dataSource = new MatTableDataSource<customerList>(this.tableData);
    });
  }

  deleteBtn() {
    this.sweetalert.deleteBtn();
  }


  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.tableData = this.dataSource.filteredData;
  }

  public sortData(sort: Sort) {
    const data = this.tableData.slice();

    if (!sort.active || sort.direction === '') {
      this.tableData = data;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.tableData = data.sort((a: any, b: any) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aValue = (a as any)[sort.active];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }


  onPageChange(pageNo: number) {
    this.currentPage = pageNo;
    window.scrollTo({top: 0, behavior: 'smooth'});
    this.getTableData(pageNo - 1);
  }

  deleteButton(customer:CustomerModel) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'me-2 btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerService.deleteCustomer(customer.customerID).subscribe(
          next => {
            swalWithBootstrapButtons.fire(
              'Deleted!',
              next.message,
              'success'
            )
          },error => {
            Swal.fire("Failed",error.message,"error")
          }
        )

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        return
      }
    })
  }
}
