import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  apiResultFormat,
  DataService,
  pageSelection,
  routes,
} from 'src/app/core/core.index';
import { supplierList, supplierReport } from 'src/app/shared/model/page.model';
import { PaginationService, tablePageSize } from 'src/app/shared/shared.index';

@Component({
  selector: 'app-supplierreport',
  templateUrl: './supplierreport.component.html',
  styleUrls: ['./supplierreport.component.scss'],
})
export class SupplierreportComponent {
  public purchaseData: supplierReport[] = [];
  public paymentData: supplierReport[] = [];
  public returnData: supplierReport[] = [];
  public tableData: Array<supplierList> = [];
  purchaseInitChecked = false;
  paymentInitChecked = false;
  returnInitChecked = false;
  public routes = routes;
  // pagination variables
  public pageSize = 10;
  public serialNumberArray: Array<number> = [];
  public totalData = 0;
  showFilter = false;
  showFilters = false;
  showFilte = false;
  dataSource!: MatTableDataSource<supplierList>;
  public searchDataValue = '';
  //** / pagination variables
  constructor(
    private data: DataService,
    private pagination: PaginationService,
    private router: Router
  ) {
    this.data.getSupplierReport1().subscribe((res) => {
      this.purchaseData = res.data;
    });
    this.data.getSupplierReport2().subscribe((res) => {
      this.paymentData = res.data;
    });
    this.data.getSupplierReport3().subscribe((res) => {
      this.returnData = res.data;
    });
    this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
      if (this.router.url == this.routes.supplierReport) {
        this.getTableData({ skip: res.skip, limit: res.limit });
        this.pageSize = res.pageSize;
      }
    });
  }
  date = new Date();
   

  private getTableData(pageOption: pageSelection): void {
    this.data.getSupplierReport1().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: supplierList, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.sNo = serialNumber;
          this.tableData.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<supplierList>(this.tableData);
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.tableData,
        serialNumberArray: this.serialNumberArray,
      });
    });
  }

  public sortPurchaseData(sort: Sort) {
    const data = this.purchaseData.slice();

    if (!sort.active || sort.direction === '') {
      this.purchaseData = data;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.purchaseData = data.sort((a: any, b: any) => {
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aValue = (a as any)[sort.active];
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public sortPaymentData(sort: Sort) {
    const data = this.purchaseData.slice();

    if (!sort.active || sort.direction === '') {
      this.purchaseData = data;
    } else {
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.purchaseData = data.sort((a: any, b: any) => {
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aValue = (a as any)[sort.active];
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
  public sortReturnData(sort: Sort) {
    const data = this.purchaseData.slice();

    if (!sort.active || sort.direction === '') {
      this.purchaseData = data;
    } else {
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.purchaseData = data.sort((a: any, b: any) => {
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aValue = (a as any)[sort.active];
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.tableData = this.dataSource.filteredData;
  }
  purchaseSelectAll(initChecked: boolean) {
    if (!initChecked) {
      this.purchaseData.forEach((f) => {
        f.isSelected = true;
      });
    } else {
      this.purchaseData.forEach((f) => {
        f.isSelected = false;
      });
    }
  }
  paymentSelectAll(initChecked: boolean) {
    if (!initChecked) {
      this.paymentData.forEach((f) => {
        f.isSelected = true;
      });
    } else {
      this.paymentData.forEach((f) => {
        f.isSelected = false;
      });
    }
  }
  returnSelectAll(initChecked: boolean) {
    if (!initChecked) {
      this.returnData.forEach((f) => {
        f.isSelected = true;
      });
    } else {
      this.returnData.forEach((f) => {
        f.isSelected = false;
      });
    }
  }
}
