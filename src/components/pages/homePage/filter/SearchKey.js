import React from "react";
import { Space, Input } from "antd";

function SearchKey(props) {
  const { pagination, setPagination, setLoading } = props;
  // const { reportStatus } = allCommons;
  // console.log(allReportType);
  const { Search } = Input;

  const onSearch = (value) => {
    setLoading(true);
    console.log(value);
    if (value === "") {
      delete pagination.searchKey;
      setPagination({ ...pagination });
    } else {
      setPagination({ ...pagination, searchKey: value });
      console.log(value);
      console.log(pagination);
    }
  };
  return (
    <div>
      <Space direction="vertical">
        <Search
          placeholder="Tìm tên người báo cáo, số bệnh án"
          allowClear
          onSearch={onSearch}
          style={{ width: 200 }}
        />
      </Space>
    </div>
  );
}

export default SearchKey;
