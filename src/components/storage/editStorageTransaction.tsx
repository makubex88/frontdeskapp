import Dropdown from "react-dropdown";
import React, { useState, useEffect } from "react";
import { IStorage, IStorageTransaction } from "./interface";
import { IUser } from "../user/interface";
import "react-dropdown/style.css";

interface IProps {
  transaction: IStorageTransaction;
  customers: Array<IUser>;
  storageFacilities: Array<IStorage>;
  onUpdateTransaction: (id: number, transaction: IStorageTransaction) => void;
  setEdit: (bool: boolean) => void;
}

export default function EditStorageTransactionForm(props: IProps) {
  // set state tp the current transaction
  const [transaction, setTransaction] = useState(props.transaction);

  useEffect(() => setTransaction(props.transaction), [props]);

  // submit the form
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (!transaction. || !user.lastName) {
    //   console.log("em");
    //   return false;
    // }
    // check availabilit of storage facility
    let selectedFacility = props.storageFacilities.find(
      (m) => m.id === transaction.storage?.id
    );

    let loadCost = 0;
    switch (transaction.loadType) {
      case "Small":
        loadCost = 5;
        break;
      case "Medium":
        loadCost = 10;
        break;
      case "Large":
        loadCost = 20;
        break;
    }

    if (
      selectedFacility?.storageTypes.includes(transaction.loadType) &&
      selectedFacility?.available >= transaction.load * loadCost
    ) {
      props.onUpdateTransaction(transaction.id, transaction);
    }
    console.log("unable to add transaction");
  };

  // change on the fields
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
  };

  const loadTypes = [
    { value: "Small", label: "Small" },
    { value: "Medium", label: "Medium" },
    { value: "Large", label: "Large" },
  ];

  let listOfCustomers = props.customers.map((item) => {
    return {
      value: item.id.toString(),
      label: `${item.lastName} ${item.firstName}`,
    };
  });

  let listOfStorages = props.storageFacilities.map((item) => {
    return {
      value: item.id.toString(),
      label: `${item.name}`,
    };
  });

  const onHandleSelectLoadType = (option: any) => {
    const selectedLoadType = option.value;
    setTransaction({ ...transaction, loadType: selectedLoadType });
  };

  const onHandleSelectCustomer = (option: any) => {
    const selectedCustomer = props.customers.find((m) => m.id === option.value);

    setTransaction({ ...transaction, customer: selectedCustomer });
  };

  const onHandleSelectStorage = (option: any) => {
    const selectedStorage = props.storageFacilities.find(
      (m) => m.id === option.value
    );

    setTransaction({ ...transaction, storage: selectedStorage });
  };

  return (
    <div className="storage-transaction-form">
      <h1>Edit Storage Transaction</h1>
      <form className="form-edit" onSubmit={onFormSubmit}>
        <div className="form-row">
          <label>Storage Name</label>
          <Dropdown
            options={listOfStorages}
            onChange={onHandleSelectStorage}
            value={transaction.storage?.id.toString()}
            placeholder="Select an option"
          />
        </div>
        <div className="form-row">
          <label>Customer Name</label>
          <Dropdown
            options={listOfCustomers}
            onChange={onHandleSelectCustomer}
            value={transaction.customer?.id.toString()}
            placeholder="Select an option"
          />
        </div>
        <div className="form-row">
          <label>Load Type</label>
          <Dropdown
            options={loadTypes}
            onChange={onHandleSelectLoadType}
            value={transaction.loadType}
            placeholder="Select an option"
          />
        </div>
        <div className="form-row">
          <label>Load</label>
          <input
            type="number"
            placeholder="please load"
            name="load"
            value={transaction.load}
            onChange={onInputChange}
          />
        </div>
        <div className="form-row">
          <button>Update</button>
          <button onClick={() => props.setEdit(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
