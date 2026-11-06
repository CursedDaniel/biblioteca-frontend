export type UUID = string;
export type ISODate = string;

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface ApiListResponse<T> {
  data: T[];
  status: number;
  message: string;
}