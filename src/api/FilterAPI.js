import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

function FilterAPI() {
  const [allCommons, setAllCommons] = useState([]);

  const [department, setDepartment] = useState([]);
  const [reportStatus, setReportStatus] = useState([]);
  const [allReportType, setAllReportType] = useState([]);
  const [allIncidentObject, setAllIncidentObject] = useState([]);

  useEffect(() => {
    async function getData() {
      const login = localStorage.getItem("login");
      if (login) {
        //get common
        let tempCommon = [];
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
        setAllCommons(tempCommon);
        setReportStatus(tempCommon.reportStatus);
        setAllReportType(tempCommon.reportType);
        setAllIncidentObject(tempCommon.incidentObject);

        let temp = [];
        const depart = await axios.post(
          "https://qlsc.maysoft.io/server/api/getAllDepartments",
          {},
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${login}`,
            },
          }
        );
        temp = depart.data.data.data;
        setDepartment(temp);
      }
    }
    getData();
  }, []);
  //   console.log(department);

  return {
    department: [department, setDepartment],
    allCommons: [allCommons, setAllCommons],
    reportStatus: [reportStatus, setReportStatus],
    allReportType: [allReportType, setAllReportType],
    allIncidentObject: [allIncidentObject, setAllIncidentObject],
  };
}

export default FilterAPI;
