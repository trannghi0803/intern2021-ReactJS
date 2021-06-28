import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Space, Spin, Table, Pagination } from "antd";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { RiCalendarTodoFill } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import { TiMessages } from "react-icons/ti";
import { GlobalState } from "../../../GlobalState";
import SelectOption from "./filter/SelectOption";
import SelectStatus from "./filter/SelectStatus";
import SelectReportType from "./filter/SelectReportType";
import SelectIncidentObject from "./filter/SelectIncidentObject";
import FilterDate from "./filter/FilterDate";
import SearchKey from "./filter/SearchKey";
import Loading from "../../loading/Loading";

function Home() {
  //Nhận dữ liệu từ GlobalState
  const {
    allReport,
    statusName,
    incidentObject,
    reportType,
    pagination,
    setPagination,
    totalPage,
    setDepartmentId,
    loading,
    setLoading,
    // allCommons,
  } = useContext(GlobalState);
  const state = useContext(GlobalState);
  const [department, setDepartment] = state.filterAPI.department;
  const [reportStatus, setReportStatus] = state.filterAPI.reportStatus;
  const [allReportType, setAllReportType] = state.filterAPI.allReportType;
  const [allIncidentObject, setAllIncidentObject] =
    state.filterAPI.allIncidentObject;
  // console.log(reportStatus);
  // const [status, setStatus] = useState(null);

  // console.log(totalPage);
  // setPagination({ page: 2 });
  const isLogged = localStorage.getItem("login");

  // const handleChange = (value) => {
  //   console.log(`selected ${value}`);
  // };
  // Table
  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (text) => (
        <div className="number">
          {text} <TiMessages className="mes" />
          <BsThreeDots className="dots" />
        </div>
      ),
      width: 170,
    },
    {
      title: "Trạng thái",
      dataIndex: "reportStatus",
      key: "reportStatus",
      render: (text, record) => {
        return {
          props: {
            style: {
              color: text === "Phân tích" ? "#ef8932" : "#03b803",
            },
          },
          children: <div>{text}</div>,
        };
      },
      width: 100,
    },
    {
      title: "Mã BC",
      dataIndex: "reportNo",
      key: "reportNo",
      width: 110,
    },
    {
      title: "Loại BC",
      dataIndex: "reportType",
      key: "reportType",
      width: 110,
    },
    {
      title: "Đối tượng",
      dataIndex: "incidentObject",
      key: "incidentObject",
      width: 190,
    },
    {
      title: "Ngày báo cáo",
      dataIndex: "reportTime",
      key: "reportTime",
      width: 140,
    },
    {
      title: "Người báo cáo",
      dataIndex: "reporterName",
      key: "reporterName",
      width: 140,
    },
    {
      title: "Mô tả",
      dataIndex: "detailDescription",
      key: "detailDescription",
      ellipsis: true,
    },
  ];

  //đẩy dữ liệu vào table

  let data = [];
  // console.log(allReport);
  const [currentIndex, setCurrentIndex] = useState(1);
  const mapData = () => {
    for (let i = 0; i < allReport.length; ) {
      // setCurrentIndex(i + 1);
      data.push({
        key: i + 1,
        index: pagination.page === 1 ? i + 1 : currentIndex + i,
        reportStatus: statusName[i],
        reportNo: allReport[i].reportNo,

        reportType: reportType[i],

        incidentObject: incidentObject[i],
        reportTime: moment(allReport[i].reportTime * 1000).format(
          "DD-MM-YYYY HH:mm"
        ),
        reporterName: allReport[i].reporterName,
        detailDescription: allReport[i].detailDescription,
      });

      ++i;
    }
  };
  mapData();

  //phân trang
  // const onPageChange = (page) => {
  //   console.log(page);
  // };
  // console.log(pagination);
  // =================
  if (isLogged === null) {
    return <Redirect to="/auth/login" />;
  } else {
    return (
      <>
        <div className="main">
          <div className="container banner">
            <div className="title">Danh sách báo cáo</div>
            <div className="right-title">
              <FilterDate
                pagination={pagination}
                setPagination={setPagination}
                setLoading={setLoading}
              />
              <button className="btn" type="submit">
                <RiCalendarTodoFill />
                Báo cáo sự cố
              </button>
            </div>
          </div>
          <div className="content-table">
            <div className="search">
              <SearchKey
                pagination={pagination}
                setPagination={setPagination}
                setLoading={setLoading}
              />
            </div>
            <div className="select-filter">
              <SelectOption
                department={department}
                pagination={pagination}
                setPagination={setPagination}
                setDepartmentId={setDepartmentId}
                setLoading={setLoading}
              />
            </div>
            <div className="select-filter">
              <SelectStatus
                reportStatus={reportStatus}
                pagination={pagination}
                setPagination={setPagination}
                setLoading={setLoading}
              />
            </div>
            <div className="select-filter">
              <SelectReportType
                allReportType={allReportType}
                pagination={pagination}
                setPagination={setPagination}
                setLoading={setLoading}
              />
            </div>
            <div className="select-filter">
              <SelectIncidentObject
                allIncidentObject={allIncidentObject}
                pagination={pagination}
                setPagination={setPagination}
                setLoading={setLoading}
              />
            </div>

            <div className="data-table">
              <Table columns={columns} dataSource={data} pagination={false} />
              <Pagination
                defaultCurrent={1}
                total={totalPage}
                showTotal={(total, range) => {
                  setCurrentIndex(range[0]);
                  return `Hiển thị ${range[0]} - ${range[1]} trên tổng ${total} báo cáo`;
                }}
                defaultPageSize={30}
                pageSizeOptions={["30"]}
                onChange={(page) => {
                  setPagination({ page });
                  // console.log(page);
                }}
              />
            </div>
          </div>
        </div>
        {loading && (
          <Space size="middle">
            <Spin size="large" />
          </Space>
        )}
        {allReport.length === 0 && (
          <Space size="middle">
            <Spin size="large" />
          </Space>
        )}
      </>
    );
  }
}

export default Home;
