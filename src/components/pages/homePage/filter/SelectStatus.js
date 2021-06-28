import React from "react";
import { Select } from "antd";

function SelectStatus(props) {
  const { Option, OptGroup } = Select;
  const { reportStatus, pagination, setPagination, setLoading } = props;
  // const { reportStatus } = allCommons;
  // console.log(reportStatus);
  const handleChange = (value) => {
    setLoading(true);
    if (value === "a") {
      delete pagination.status;
      setPagination({ ...pagination });
    } else {
      setPagination({ ...pagination, status: value });
      // console.log(value);
      // console.log(pagination);
    }
  };
  return (
    <div>
      <Select
        defaultValue="a"
        value={reportStatus.code}
        style={{ width: 200 }}
        onChange={handleChange}
      >
        <Option value="a">--Trạng thái--</Option>
        {reportStatus.map((status) => (
          <Option value={status.code} key={status.id}>
            {status.name}
          </Option>
        ))}
      </Select>
    </div>
  );
}

export default SelectStatus;
