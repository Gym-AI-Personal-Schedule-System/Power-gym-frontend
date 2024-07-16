export class routes {
  private static base = '';

  public static get baseUrl(): string {
    return this.base;
  }
  // auth routes
  public static get auth(): string {
    return this.base + '/auth';
  }
  public static get signIn(): string {
    return this.base + '/signin';
  }
  public static get signUp(): string {
    return this.base + '/signup';
  }
  public static get forgotPassword(): string {
    return this.base + '/forgetpassword';
  }
  // auth routes *ends*

  // error pages routes

  public static get errorPages(): string {
    return this.baseUrl + '/errorpages';
  }
  public static get errorPage404(): string {
    return this.errorPages + '/error404';
  }
  public static get errorPage500(): string {
    return this.errorPages + '/error500';
  }

  public static get core(): string {
    return this.baseUrl;
  }


  public static get dashboard(): string {
    return this.core + '/dashboard';
  }




  public static get member(): string {
    return this.core + '/member';
  }

  public static get memberList(): string {
    return this.member + '/member-list';
  }

  public static get addMember(): string {
    return this.member + '/add-member';
  }


  public static get schedule(): string {
    return this.core + '/schedule';
  }
  public static get generateSchedule(): string {
    return this.schedule + '/create-schedule';
  }
  public static get addExercise(): string {
    return this.schedule + '/add-exercise';
  }
 public static get viewExercise(): string {
    return this.schedule + '/view-exercise';
  }
  public static get manageExercise(): string {
    return this.schedule + '/manage-exercise';
  }



  public static get productList(): string {
    return this.product + '/product-list';
  }


  public static get product(): string {
    return this.core + '/product';
  }




  public static get users(): string {
    return this.core + '/user';
  }
  public static get userList(): string {
    return this.users + '/user-lists';
  }
  public static get addUser(): string {
    return this.users + '/add-user';
  }
  public static get userPrivilege(): string {
    return this.users + '/user-privilege';
  }






}
