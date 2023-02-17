import { IUser } from "../user/interface";

export interface IBaseStorage {
  name: string;
  location: string;
  available: number;
  storageTypes: string; // S=small(5),M=medium(10),L=large(20)
}

export interface IStorage extends IBaseStorage {
  id: number;
}

export interface IStorageTransaction {
  id: number;
  storage: IStorage | undefined;
  customer: IUser | undefined;
  loadType: string;
  load: number;
  status: string; // stored, retreived
}
