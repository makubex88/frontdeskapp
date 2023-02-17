export interface IBaseCustomer {
  lastName: string;
  firstName: string;
  phone: string;
}
export interface IUser extends IBaseCustomer {
  id: number;
}
