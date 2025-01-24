export interface IUser {
  id: number;
  fullName: string;
  company: string;
  position: string;
  checkedIn: boolean;
  checkedOut: boolean;
}


export interface IUserResponse {
  success: boolean;
  data: Array<IUser>;
}

export interface IUpdateResponse {
  success: boolean;
  message: string;
}