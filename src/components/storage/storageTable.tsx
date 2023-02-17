import React from "react";
import { IStorage } from "./interface";

interface IProps {
  storageFacilities: Array<IStorage>;
}

const StorageFacility: React.FunctionComponent<IProps> = (props) => {
  return (
    <div className="storage-table">
      <h1>View Storage Facilities</h1>
      <table>
        <thead>
          <tr>
            <th>Storage Name</th>
            <th>Location</th>
            <th>Types</th>
            <th>Available</th>
          </tr>
        </thead>
        <tbody>
          {props.storageFacilities.length > 0 ? (
            props.storageFacilities.map((i) => (
              <tr key={i.id}>
                <td>{i["name"]}</td>
                <td>{i["location"]}</td>
                <td>{i["storageTypes"]}</td>
                <td>{i["available"]}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No Facility Records</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default StorageFacility;
