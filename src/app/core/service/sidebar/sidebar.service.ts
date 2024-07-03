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
      tittle: 'Member',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Member',
          route: routes.customer,
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'user',
          subMenus: [
            {
              menuValue: 'Add member',
              hasSubRoute: false,
              showSubRoute: false,
              route: routes.addCustomer,
              subRoutes: [],
            },
            {
              menuValue: 'Member list',
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
      tittle: 'Schedule',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Schedule',
          route: routes.customerList,
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'box',
          subMenus: [
            {
              menuValue: 'Create Schedule',
              hasSubRoute: false,
              showSubRoute: false,
              route: routes.customerList,
              subRoutes: [],
            },
            {
              menuValue: 'Exercise',
              hasSubRoute: false,
              showSubRoute: false,
              route: routes.customerList,
              subRoutes: [],
            },
            {
              menuValue: 'Exercise video',
              hasSubRoute: false,
              showSubRoute: false,
              route: routes.customerList,
              subRoutes: [],
            }
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
              menuValue: 'Add user',
              hasSubRoute: false,
              showSubRoute: false,
              route: routes.addUser,
              subRoutes: [],
            },
            {
              menuValue: 'User list',
              hasSubRoute: false,
              showSubRoute: false,
              route: routes.userList,
              subRoutes: [],
            },
            {
              menuValue: 'Privilege',
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
          route: routes.customerList,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'bar-chart-2',
          subMenus: [],
        },
      ],
    },

  ];


}
