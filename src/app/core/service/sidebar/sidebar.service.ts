import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {routes} from '../../core.index';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {

  public sideBarPosition: BehaviorSubject<string> = new BehaviorSubject<string>(
    sessionStorage.getItem('sideBarPosition') || 'false'
  );

  public toggleMobileSideBar: BehaviorSubject<string> =
    new BehaviorSubject<string>(
      sessionStorage.getItem('isMobileSidebar') || 'false'
    );

  public expandSideBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  public switchSideMenuPosition(): void {
    if (sessionStorage.getItem('sideBarPosition')) {
      this.sideBarPosition.next('false');
      this.expandSideBar.next(true);
      sessionStorage.removeItem('sideBarPosition');
    } else {
      this.sideBarPosition.next('true');
      this.expandSideBar.next(false);
      sessionStorage.setItem('sideBarPosition', 'true');
    }
  }

  public switchMobileSideBarPosition(): void {
    if (sessionStorage.getItem('isMobileSidebar')) {
      this.toggleMobileSideBar.next('false');
      sessionStorage.removeItem('isMobileSidebar');
    } else {
      this.toggleMobileSideBar.next('true');
      sessionStorage.setItem('isMobileSidebar', 'true');
    }
  }


  public sidebarData1 = [
    {
      tittle: 'Main',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Dashboard',
          route: routes.dashboard,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'grid',
          subMenus: [],
        }
      ],
    },
    {
      tittle: 'Customers',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Customers',
          route: routes.customer,
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'user',
          subMenus: [
            {
              menuValue: 'Add Customers',
              hasSubRoute: false,
              showSubRoute: false,
              route: routes.addCustomer,
              subRoutes: [],
            },
            {
              menuValue: 'Customers List',
              hasSubRoute: false,
              showSubRoute: false,
              route: routes.customerList,
              subRoutes: [],
            },
          ],
        },
      ],
    },
    {
      tittle: 'Products',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Products',
          route: routes.product,
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'box',
          subMenus: [
            {
              menuValue: 'Product Add',
              hasSubRoute: false,
              showSubRoute: false,
              route: routes.addProduct,
              subRoutes: [],
            },
            {
              menuValue: 'Product List',
              hasSubRoute: false,
              showSubRoute: false,
              route: routes.productList,
              subRoutes: [],
            },
            {
              menuValue: 'Category',
              hasSubRoute: false,
              showSubRoute: false,
              route: routes.category,
              subRoutes: [],
            },
            {
              menuValue: 'Supplier',
              hasSubRoute: false,
              showSubRoute: false,
              route: routes.supplier,
              subRoutes: [],
            },
          ],
        },
      ],
    },
    {
      tittle: 'User',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'User',
          route: routes.users,
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'user',
          subMenus: [
            {
              menuValue: 'Add User',
              hasSubRoute: false,
              showSubRoute: false,
              route: routes.addUser,
              subRoutes: [],
            },
            {
              menuValue: 'User List',
              hasSubRoute: false,
              showSubRoute: false,
              route: routes.userList,
              subRoutes: [],
            },
            {
              menuValue: 'User Role',
              hasSubRoute: false,
              showSubRoute: false,
              route: routes.userRole,
              subRoutes: [],
            },
            {
              menuValue: 'User Privilege',
              hasSubRoute: false,
              showSubRoute: false,
              route: routes.userPrivilege,
              subRoutes: [],
            },
          ],
        },
      ],
    },
    {
      tittle: 'Report',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Report',
          route: routes.categoryList,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'bar-chart-2',
          subMenus: [],
        },
      ],
    },
    {
      tittle: 'Commission',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Commission',
          route: routes.commission,
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'dollar-sign',
          subMenus: [
            {
              menuValue: 'Commission Process',
              hasSubRoute: false,
              showSubRoute: false,
              route: routes.commissionProcess,
              subRoutes: [],
            },

          ],
        },
      ],
    },

  ];


}
