// PE 1/3 - stop using this
export default interface MyAxiosError {
  response?: {
    data: {
      errors: MyFieldError[]
    }
  }
  status: number
  statusText: string
}

export interface MyFieldError {
  message: string
  field: string
}
