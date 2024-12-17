export interface ErrorMessage {
  property: string;
  children: ErrorMessage[];
  constraints: Constraints;
}

export interface Constraints {
  [key: string]: string;
}


export interface AxiosResponseSuccessData<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface AxiosResponseErrorData {
  statusCode: number;
  message: ErrorMessage[] | string;
  error: string;
}

export type AxiosResponseData<T> = AxiosResponseSuccessData<T> | AxiosResponseErrorData;

const test: AxiosResponseData<string> ={
  statusCode: 404,
  message: "test",
  data: "test",
};

console.log(test)
