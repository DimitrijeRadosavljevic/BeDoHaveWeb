export interface ExpressResponse<T = any> {
  token?: string;
  data: T;
  code?: number;
  status: string;
}
