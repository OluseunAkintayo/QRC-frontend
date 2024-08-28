export interface ILoginResponse {
  success: boolean;
  message: string;
  data: {
    email: string;
    role: number;
    token: string;
    exp: string;
  }
}

