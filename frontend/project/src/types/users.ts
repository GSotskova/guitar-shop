export type UserType = {
    name: string;
    email: string;
    token?: string
    isAdmin?: boolean;
  }


  export type UserAuth = Pick<UserType, 'email'> & { password: string };

  export type UserRegister = {
    name: string;
    email: string;
    password: string;
    token?: string
  }
