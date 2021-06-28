import React from "react";
import { Select } from "antd";

function SelectReportType(props) {
  const { Option, OptGroup } = Select;
  const { allReportType, pagination, setPagination, setLoading } = props;
  // const { reportStatus } = allCommons;
  // console.log(allReportType);
  const handleChange = (value) => {
    setLoading(true);
    if (value === "a") {
      delete pagination.reportType;
      setPagination({ ...pagination });
    } else {
      setPagination({ ...pagination, reportType: value });
      // console.log(value);
      // console.log(pagination);
    }
  };
  return (
    <div>
      <Select
        defaultValue="a"
        value={allReportType.code}
        style={{ width: 200 }}
        onChange={handleChange}
      >
        <Option value="a">--Loại báo cáo--</Option>
        {allReportType.map((type) => (
          <Option value={type.code} key={type.id}>
            {type.name}
          </Option>
        ))}
      </Select>
    </div>
  );
}

export default SelectReportType;
