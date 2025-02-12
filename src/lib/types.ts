export interface LoginResponseProps {
  success: boolean,
  message: string;
  data: {
    email: string;
    token: string;
    exp: string;
  }
}

export interface QrCodeDtoProps {
  title: string;
  siteUrl: string;
}

export interface QRCodeProps {
  id: number;
  title: string;
  imageUrl: string;
  siteUrl: string;
  urlId: string;
  visitCount: number;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  modifiedAt?: Date;
}

export interface QRCodeResponseProps {
  success: boolean;
  message: string;
  data: Array<QRCodeProps>;
}

export interface QRCodeComponentProps {
  code: QRCodeProps;
  refetch: () => void;
}

export interface DeleteQrCodeProps {
  open: boolean;
  close: () => void;
  data: {
    id: number;
    title: string;
  };
}

