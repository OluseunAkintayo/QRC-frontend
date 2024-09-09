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

export interface INewQrCodeResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    title: string;
    imageUrl: string;
    siteUrl: string;
    urlId: string;
    visitCount: number;
    isActive: boolean;
    createdAt: string;
  }
}

export interface IQRCode {
  id: string;
  title: string;
  imageUrl: string;
  siteUrl: string;
  urlId: string;
  visitCount: number;
  isActive: boolean;
  createdAt: string;
}

export interface IQRCodeResponse {
  success: boolean;
  message: string;
  data: Array<IQRCode>;
}
