
export interface ILoginResponse {
  success: boolean,
  message: string;
  data: {
    email: string;
    token: string;
    exp: string;
  }
}

