import React from "react";
import { IBaseCustomer } from "../user/interface";
import { IStorage, IStorageTransaction } from "./interface";

interface IProps {
  transaction: Array<IStorageTransaction>;
  onEdit: (user: IStorageTransaction) => void;
  //   onDelete: (user: IStorageTransaction) => void;
  storageFacilities: Array<IStorage>;
  customers: Array<IBaseCustomer>;
}

const StorageTransactionTable: React.FunctionComponent<IProps> = (props) => {
  return (
    <div className="storage-transaction-table">
      <h1>View Storage Transactions</h1>
      <table>
        <thead>
          <tr>
            <th>Storage Name</th>
            <th>Customer Name</th>
            <th>Load Type</th>
            <th>Number of Load</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.transaction.length > 0 ? (
            props.transaction.map((i) => (
              <tr key={i.id}>
                <td>{i.storage?.name}</td>
                <td>
                  {i.customer?.lastName} {i.customer?.firstName}
                </td>
                <td>{i["loadType"]}</td>
                <td>{i["load"]}</td>
                <td>{i["status"]}</td>
                <td>
                  <button onClick={() => props.onEdit(i)}>edit</button>
                  {/* <button onClick={() => props.onDelete(i)}>delete</button> */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No Transactions</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default StorageTransactionTable;
