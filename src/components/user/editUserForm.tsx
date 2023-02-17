import React, { useState, useEffect } from "react";
import { IUser } from "./interface";

interface IProps {
  user: IUser;
  onUpdateUser: (id: number, user: IUser) => void;
  setEdit: (bool: boolean) => void;
}

export default function EditUserForm(props: IProps) {
  const [user, setUser] = useState(props.user);
  useEffect(() => setUser(props.user), [props]);
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user.firstName || !user.lastName) {
      console.log("em");
      return false;
    }
    props.onUpdateUser(user.id, user);
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  return (
    <div className="user-form">
      <h1>Edit Customer</h1>
      <form className="form-edit" onSubmit={onFormSubmit}>
        <div className="form-row">
          <label>Last Name</label>
          <input
            type="text"
            placeholder="please input last name"
            name="lastName"
            value={user.lastName}
            onChange={onInputChange}
          />
          <div className="form-error">too short</div>
        </div>
        <div className="form-row">
          <label>First Name</label>
          <input
            type="text"
            placeholder="please input first name"
            name="firstName"
            value={user.firstName}
            onChange={onInputChange}
          />
        </div>
        <div className="form-row">
          <label>Phone</label>
          <input
            type="text"
            placeholder="please input phone"
            name="phone"
            value={user.phone}
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
