import Dropdown from "react-dropdown";
import React, { useState } from "react";
import { IUser } from "../user/interface";
import { IStorage, IStorageTransaction } from "./interface";

interface IProps {
  onAddStorageTransaction: (transaction: IStorageTransaction) => void;
  customers: Array<IUser>;
  storageFacilities: Array<IStorage>;
}

// initial values
const initStorageTransaction: IStorageTransaction = {
  id: 0,
  storage: {
    available: 0,
    location: "",
    name: "",
    storageTypes: "",
    id: 0,
  },
  customer: {
    firstName: "",
    lastName: "",
    phone: "",
    id: 0,
  },
  loadType: "",
  load: 0,
  status: "",
};

const AddStorageTransactionForm: React.FunctionComponent<IProps> = (props) => {
  // set the state
  const [formValue, setFormValue] = useState(initStorageTransaction);
  //const [errors, setErrors] = useState<FormErrors>({});

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const rules = [
    //   { key: "lastName", required: true, label: "Last Name" },
    //   { key: "firstName", required: true, label: "First Name" },
    //   { key: "phone", required: true, label: "Phone" },
    //   { key: "lastName", maxLength: 16, label: "Last Name" },
    //   { key: "firstName", minLength: 16, label: "First Name" },
    //   { key: "phone", minValue: 18, label: "Phone" },
    //   { key: "phone", maxValue: 60, label: "Phone" },
    // ];
    // validator(formValue, rules, (errors: any): any => {
    //   if (noErrors(errors)) {
    //     props.onAddUser(formValue);
    //     setFormValue(initCustomer);
    //     return false;
    //   }
    //   setErrors(errors);
    // });
    let selectedFacility = props.storageFacilities.find(
      (m) => m.id === formValue.storage?.id
    );
    let loadCost = 0;
    switch (formValue.loadType) {
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
      selectedFacility?.storageTypes.includes(formValue.loadType) &&
      selectedFacility?.available >= formValue.load * loadCost
    ) {
      formValue.status = "stored";
      props.onAddStorageTransaction(formValue);
      setFormValue(initStorageTransaction);
      return false;
    }
    console.log("unable to add transaction");
  };

  // update the values base on input changes
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: parseInt(value) });
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
    setFormValue({ ...formValue, loadType: selectedLoadType });
  };

  const onHandleSelectCustomer = (option: any) => {
    const selectedCustomer = props.customers.find(
      (m) => m.id.toString() === option.value
    );

    setFormValue({ ...formValue, customer: selectedCustomer });
    console.log(formValue);
  };

  const onHandleSelectStorage = (option: any) => {
    const selectedStorage = props.storageFacilities.find(
      (m) => m.id.toString() === option.value
    );
    console.log(selectedStorage);
    console.log(option);
    setFormValue({ ...formValue, storage: selectedStorage });
    console.log(formValue);
  };

  return (
    <div className="storage-transaction-form">
      <h1>Add Storage Transaction</h1>
      <form className="form-edit" onSubmit={onFormSubmit}>
        <div className="form-row">
          <label>Storage Name</label>
          <Dropdown
            options={listOfStorages}
            onChange={onHandleSelectStorage}
            value={formValue.storage?.id.toString()}
            placeholder="Select an option"
          />
        </div>
        <div className="form-row">
          <label>Customer Name</label>
          <Dropdown
            options={listOfCustomers}
            onChange={onHandleSelectCustomer}
            value={formValue.customer?.id.toString()}
            placeholder="Select an option"
          />
        </div>
        <div className="form-row">
          <label>Load Type</label>
          <Dropdown
            options={loadTypes}
            onChange={onHandleSelectLoadType}
            value={formValue.loadType}
            placeholder="Select an option"
          />
        </div>
        <div className="form-row">
          <label>Load</label>
          <input
            type="number"
            placeholder="please load"
            name="load"
            value={formValue.load}
            onChange={onInputChange}
          />
        </div>
        <div className="form-row">
          <button>Add new transaction</button>
        </div>
      </form>
    </div>
  );
};
export default AddStorageTransactionForm;
