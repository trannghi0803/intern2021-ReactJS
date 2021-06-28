import React from "react";
import { Select } from "antd";

function SelectIncidentObject(props) {
  const { Option, OptGroup } = Select;
  const { allIncidentObject, pagination, setPagination, setLoading } = props;
  // const { reportStatus } = allCommons;
  // console.log(allReportType);
  const handleChange = (value) => {
    setLoading(true);
    if (value === "a") {
      delete pagination.incidentObject;
      setPagination({ ...pagination });
    } else {
      setPagination({ ...pagination, incidentObject: value });
      // console.log(value);
      // console.log(pagination);
    }
  };
  return (
    <div>
      <Select
        defaultValue="a"
        value={allIncidentObject.code}
        style={{ width: 200 }}
        onChange={handleChange}
      >
        <Option value="a">--Đối tượng--</Option>
        {allIncidentObject.map((incident) => (
          <Option value={incident.code} key={incident.id}>
            {incident.name}
          </Option>
        ))}
      </Select>
    </div>
  );
}

export default SelectIncidentObject;
