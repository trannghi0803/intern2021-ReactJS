import React from "react";
import { Select } from "antd";
// import { GlobalState } from "../../../GlobalState";

function SelectOption(props) {
  // const { departmentId, setDepartmentId } = useContext(GlobalState);
  // console.log(departmentId);
  const { Option, OptGroup } = Select;
  const { department, setDepartmentId, pagination, setPagination, setLoading } =
    props;
  // console.log(department);
  const handleChange = (value) => {
    setLoading(true);
    if (value === "a") {
      delete pagination.departmentId;
      setPagination({ ...pagination });
    } else {
      setPagination({ ...pagination, departmentId: value });
      // console.log(value);
      // console.log(pagination);
    }
  };
  return (
    <div>
      <Select
        defaultValue="a"
        value={department.id}
        style={{ width: 200 }}
        onChange={handleChange}
      >
        <Option value="a">--Phòng ban--</Option>
        {department.map((dep) => (
          <Option value={dep.id} key={dep.id}>
            {dep.departmentName}
          </Option>
        ))}
      </Select>
    </div>
  );
}

export default SelectOption;
