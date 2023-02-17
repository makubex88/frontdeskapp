import React from "react";
import { IUser } from "./interface";

interface IProps {
  users: Array<IUser>;
  onEdit: (user: IUser) => void;
  onDelete: (user: IUser) => void;
}

const UserTable: React.FunctionComponent<IProps> = (props) => {
  return (
    <div className="user-table">
      <h1>View Customers</h1>
      <table>
        <thead>
          <tr>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.users.length > 0 ? (
            props.users.map((i) => (
              <tr key={i.id}>
                <td>{i["lastName"]}</td>
                <td>{i["firstName"]}</td>
                <td>{i["phone"]}</td>
                <td>
                  <button onClick={() => props.onEdit(i)}>edit</button>
                  <button onClick={() => props.onDelete(i)}>delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>no customer</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default UserTable;
