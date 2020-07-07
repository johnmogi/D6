export class AuthModel {
  public constructor(
    public userID?: 0,
    public id?: Number,
    public username_email?: String,
    public firstName?: String,
    public lastName?: String,
    public password?: String,
    public city?: String,
    public street?: String,
    public isAdmin?: String,
    public firstVisit?: String
  ) {}
}

export class RegAuthModel extends AuthModel {
  public constructor(
    public userID?: 0,
    public id?: Number,
    public username_email?: String,
    public firstName?: String,
    public lastName?: String,
    public password?: String,
    public city?: String,
    public street?: String,
    public conf_password?: String
  ) {
    super(
      userID,
      id,
      username_email,
      firstName,
      lastName,
      password,
      city,
      street
    );
  }
}
