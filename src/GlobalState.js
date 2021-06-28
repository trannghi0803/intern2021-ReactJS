import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import FilterAPI from "./api/FilterAPI";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [allReport, setAllReport] = useState([]);
  const [statusName, setStatusName] = useState([]);
  const [reportType, setReportType] = useState([]);
  // const [department, setDepartment] = useState([]);
  // const [allCommons, setAllCommons] = useState([]);
  const [incidentObject, setIncidentObject] = useState([]);
  const [pagination, setPagination] = useState({ page: 1 });
  const [departmentId, setDepartmentId] = useState({ departmentId: null });
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const login = localStorage.getItem("login");
    // console.log(pagination);
    async function getData() {
      if (login) {
        let allPage1 = [];
        // let allPage2 = [];
        let tempCommon = [];
        const allReport = await axios.post(
          "https://qlsc.maysoft.io/server/api/getAllReports",

          pagination,

          // departmentId.departmentId !== null ? departmentId : pagination,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${login}`,
            },
          }
        );
        // console.log(allReport);
        allPage1 = allReport.data.data.data;

        const common = await axios.post(
          "https://qlsc.maysoft.io/server/api/getCommon",
          {
            groups: "incidentObject, reportStatus, reportType",
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${login}`,
            },
          }
        );
        tempCommon = common.data.data;
        // setAllCommons(tempCommon);

        // //getDepartment
        // let tempDepart = [];
        // const depart = await axios.post(
        //   "https://qlsc.maysoft.io/server/api/getAllDepartments",
        //   {},
        //   {
        //     headers: {
        //       Accept: "application/json",
        //       "Content-Type": "application/json",
        //       Authorization: `Bearer ${login}`,
        //     },
        //   }
        // );
        // setDepartment(depart.data.data.data);

        //Get status
        let status = [];
        allPage1.forEach((item) => {
          tempCommon.reportStatus.forEach((common) => {
            if (item.status === common.code) {
              status.push(common.name);
              // console.log(status);
            }
          });
        });

        //get reportType
        let report = [];
        allPage1.forEach((item) => {
          tempCommon.reportType.forEach((common) => {
            if (item.reportType === common.code) {
              report.push(common.name);
              // console.log(temp);
            }
          });
        });

        //get incidentObject
        let incident = [];
        allPage1.forEach((item) => {
          tempCommon.incidentObject.forEach((common) => {
            if (item.incidentObject === common.code) {
              incident.push(common.name);
              // console.log(temp);
            }
          });
        });

        // console.log(incident, status, report, all);
        setTotalPage(allReport.data.data.sizeQuerySnapshot);
        setIncidentObject(incident);
        setReportType(report);
        setStatusName(status);
        setAllReport(allPage1);
        setLoading(false);
      }
    }
    getData();

    // temp = depart.data.data.data;
    // setDepartment(temp);
  }, [pagination]);
  // console.log(allCommons);
  // console.log(department);

  const state = {
    allReport: allReport,
    incidentObject: incidentObject,
    reportType: reportType,
    statusName: statusName,
    pagination: pagination,
    setPagination: setPagination,
    totalPage: totalPage,
    loading: loading,
    setLoading: setLoading,
    // allCommons: allCommons,
    departmentId: departmentId,
    setDepartmentId: setDepartmentId,
    filterAPI: FilterAPI(),
  };
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
