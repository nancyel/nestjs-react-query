/**
 * Success HTTP Response
 */
export class BaseResponse {
  constructor(
    public success: boolean,
    public message: string,
    public data?: any,
  ) {}

  static create(message: string, data?: any): BaseResponse {
    return new BaseResponse(true, message, data);
  }
}
