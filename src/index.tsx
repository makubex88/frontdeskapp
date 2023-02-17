import React, { useState } from "react";
import * as ReactDOM from "react-dom";
import AddUserForm from "./components/user/addUserForm";
import EditUserForm from "./components/user/editUserForm";
import UserTable from "./components/user/userTable";
import { IBaseCustomer, IUser } from "./components/user/interface";
import { IStorage, IStorageTransaction } from "./components/storage/interface";

import "./style.css";
import StorageTransactionTable from "./components/storage/storageTransactionTable";
import StorageFacility from "./components/storage/storageTable";
import EditStorageTransactionForm from "./components/storage/editStorageTransaction";
import AddStorageTransactionForm from "./components/storage/addStorageTransaction";

// inital seed records of customers
const defaultCustomers: Array<IUser> = [
  { firstName: "Thomas", lastName: "Riddle", id: 1, phone: "33132313" },
  { firstName: "Albus", lastName: "Dumbledore", id: 2, phone: "33132313" },
];

// repository for storage facility
const defaultStorages: Array<IStorage> = [
  {
    id: 1,
    name: "Diagon Alley",
    location: "Hogsmade",
    storageTypes: "Small,Medium,Large",
    available: 95,
  },
  {
    id: 2,
    name: "Azkaban-DOC",
    location: "Azkaban",
    storageTypes: "Small,Medium",
    available: 50,
  },
];

// repository for facility storage transactions
const defaultStorageTransactions: Array<IStorageTransaction> = [
  {
    id: 1,
    storage: defaultStorages[1],
    customer: defaultCustomers[1],
    loadType: "Small",
    load: 5,
    status: "stored",
  },
];

// initial value of current users
const initCurrentUser: IUser = {
  firstName: "",
  lastName: "",
  phone: "33132313",
  id: 0,
};

// initial value of current users
const initCurrentTransaction: IStorageTransaction = {
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

function App() {
  // customer component
  const [users, setUsers] = useState(defaultCustomers);
  const [editUser, setEditUser] = useState(initCurrentUser);
  const [editing, setEdit] = useState(false);

  // storage component
  const [storages, setStorages] = useState(defaultStorages);

  // storage transaction
  const [storagesTransactions, setStoragesTransactions] = useState(
    defaultStorageTransactions
  );
  const [editStorageTransaction, setEditStorageTransaction] = useState(
    initCurrentTransaction
  );
  const [editingTransaction, setEditTransaction] = useState(false);

  //customer add event
  const onAddUser = (newUser: IBaseCustomer) => {
    const id = users.length + 1;
    setUsers([...users, { ...newUser, id }]);
  };

  // customer edit event
  const onCurrentUser = (user: IUser) => {
    setEditUser(user);
    setEdit(true);
  };

  // customer update event
  const onUpdateUser = (id: number, newUser: IUser) => {
    setEdit(false);
    setUsers(users.map((i) => (i.id === id ? newUser : i)));
  };

  // customer delete event
  const onDeleteUser = (currentUser: IUser) => {
    setUsers(users.filter((i) => i.id !== currentUser.id));
  };

  // storage transaction edit event
  const onCurrentStorageTransaction = (
    storagesTransactions: IStorageTransaction
  ) => {
    setEditStorageTransaction(storagesTransactions);
    setEditTransaction(true);
  };

  // storage transaction add event
  const onAddStorageTransaction = (
    newStorageTransaction: IStorageTransaction
  ) => {
    console.log(newStorageTransaction);
    const id = storagesTransactions.length + 1;
    console.log(id);
    const newItem = { ...newStorageTransaction, id };
    console.log(newItem);
    setStoragesTransactions([...storagesTransactions, newItem]);

    console.log(storagesTransactions);

    // update the storage facility
    let consume = 0;
    switch (newStorageTransaction.loadType) {
      case "Small":
        consume = 5 * newStorageTransaction.load;
        break;
      case "Medium":
        consume = 10 * newStorageTransaction.load;
        break;
      case "Large":
        consume = 20 * newStorageTransaction.load;
        break;
    }
    const updatedStorage = newStorageTransaction.storage;

    if (updatedStorage !== undefined) {
      updatedStorage.available = updatedStorage.available - consume;
      setStorages([...storages, updatedStorage]);
    }
  };

  const onUpdateTransaction = (
    id: number,
    newTransaction: IStorageTransaction
  ) => {
    setEditTransaction(true);
    setStoragesTransactions(
      storagesTransactions.map((i) => (i.id === id ? newTransaction : i))
    );
  };

  return (
    <div className="App">
      <h1>Front Desk App</h1>
      <div className="row">
        <div className="user-flex-wrapper">
          {editing ? (
            <EditUserForm
              user={editUser}
              onUpdateUser={onUpdateUser}
              setEdit={setEdit}
            />
          ) : (
            <AddUserForm onAddUser={onAddUser} />
          )}
          <UserTable
            users={users}
            onEdit={onCurrentUser}
            onDelete={onDeleteUser}
          />
        </div>
      </div>
      <div className="row">
        <StorageFacility storageFacilities={defaultStorages} />
      </div>
      <div className="row">
        <div className="user-flex-wrapper">
          {editingTransaction ? (
            <EditStorageTransactionForm
              transaction={editStorageTransaction}
              customers={defaultCustomers}
              storageFacilities={defaultStorages}
              onUpdateTransaction={onUpdateTransaction}
              setEdit={setEditTransaction}
            />
          ) : (
            <AddStorageTransactionForm
              onAddStorageTransaction={onAddStorageTransaction}
              customers={defaultCustomers}
              storageFacilities={defaultStorages}
            />
          )}
        </div>
        <StorageTransactionTable
          customers={users}
          onEdit={onCurrentStorageTransaction}
          transaction={storagesTransactions}
          storageFacilities={defaultStorages}
        />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
