import React from "react";
import { DatePicker, Space } from "antd";
import moment from "moment";

function FilterDate(props) {
  const { RangePicker } = DatePicker;
  const dateFormat = "DD/MM/YYYY";
  const { pagination, setPagination, setLoading } = props;

  const handleChange = (value) => {
    // console.log(moment(value[0]._d).unix());
    // console.log(value);
    setLoading(true);
    if (value === null) {
      delete pagination.reportTime;
      setPagination({ ...pagination });
      // console.log(pagination);
    } else {
      let timeStart = moment(value[0]._d).unix();
      let timeEnd = moment(value[1]._d).unix();
      // console.log(timeStart, timeEnd);
      setPagination({ ...pagination, reportTime: `${timeStart}, ${timeEnd}` });
      // console.log(value);
      console.log(pagination);
    }
  };
  return (
    <div>
      <Space className="ant-datepicker" direction="vertical" size={12}>
        <RangePicker
          defaultValue={[moment("01/01/2021", dateFormat), moment()]}
          format={dateFormat}
          onChange={handleChange}
        />
      </Space>
    </div>
  );
}

export default FilterDate;
