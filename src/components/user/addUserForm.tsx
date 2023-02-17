import React, { useState } from "react";
import { IBaseCustomer } from "./interface";
import validator, { noErrors, FormErrors } from "./validator";

interface IProps {
  onAddUser: (user: IBaseCustomer) => void;
}
const initCustomer = { firstName: "", lastName: "", phone: "" };
const AddUserForm: React.FunctionComponent<IProps> = (props) => {
  const [formValue, setFormValue] = useState(initCustomer);
  const [errors, setErrors] = useState<FormErrors>({});
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const rules = [
      { key: "lastName", required: true, label: "Last Name" },
      { key: "firstName", required: true, label: "First Name" },
      { key: "phone", required: true, label: "Phone" },
      { key: "lastName", maxLength: 16, label: "Last Name" },
      { key: "firstName", minLength: 16, label: "First Name" },
      { key: "phone", minValue: 18, label: "Phone" },
      { key: "phone", maxValue: 60, label: "Phone" },
    ];
    validator(formValue, rules, (errors: any): any => {
      if (noErrors(errors)) {
        props.onAddUser(formValue);
        setFormValue(initCustomer);
        return false;
      }
      setErrors(errors);
    });
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  return (
    <div className="user-form">
      <h1>Add Customer</h1>
      <form className="form-edit" onSubmit={onFormSubmit}>
        <div className="form-row">
          <label>Last Name</label>
          <input
            type="text"
            placeholder="please input last name"
            name="lastName"
            value={formValue.lastName}
            onChange={onInputChange}
          />
          {errors["lastName"] && errors["lastName"].length > 0 && (
            <div className="form-error">{errors["lastName"].join(",")}</div>
          )}
        </div>
        <div className="form-row">
          <label>First Name</label>
          <input
            type="text"
            placeholder="please input first name"
            name="firstName"
            value={formValue.firstName}
            onChange={onInputChange}
          />
          {errors["firstName"] && errors["firstName"].length > 0 && (
            <div className="form-error">{errors["firstName"].join(",")}</div>
          )}
        </div>
        <div className="form-row">
          <label>Phone</label>
          <input
            type="text"
            placeholder="please input phone"
            name="age"
            value={formValue.phone}
            onChange={onInputChange}
          />
          {errors["phone"] && errors["phone"].length > 0 && (
            <div className="form-error">{errors["phone"].join(",")}</div>
          )}
        </div>
        <div className="form-row">
          <button>Add new customer</button>
        </div>
      </form>
    </div>
  );
};
export default AddUserForm;
