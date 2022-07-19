import React, { useState, useEffect } from "react";

import { useFetch } from "hooks";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import CustomTable from "../Components/CustomTable";
import { Modal, Upload,Badge } from "antd";
import service from "auth/FetchInterceptor";

const Banner = () => {
  const { services, refetch, isLoading, error, isSuccess } =
    useFetch("competition");

  const [currentList, setCurrentList] = useState([]);
  // console.log("lisisisisis",services)
  useEffect(() => setCurrentList(services), [isSuccess, services]);

  const history = useHistory();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
       {
      title: "Name Ar",
      dataIndex: "name_en",
      key: "name_en",
      
    },
    {
      title: "Name Eng",
      dataIndex: "name_ar",
      key: "name_ar",
     
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
     
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
     
    },
    {
      title: "Status",
      dataIndex: "active",
      render: (test, record) => (record.active ?
        <div style={{ display: "flex" }}>
        <Badge status="success" />
        <span style={{ fontWeight: "bolder" }}>Active</span>
      </div>
      :<div style={{ display: "flex" }}>
      <Badge status="error" />
      <span style={{ fontWeight: "bolder" }}>Inactiv</span>
    </div>
      ),     
    },
  ];

  return (
    <>
      <CustomTable
        pageTitle="List of Competitions "
        endPoint={"competition"}
        addEndPoint="Competitions/AddCompetitions"
        editEndPoint="Competitions/edit_Competitions_ReadForm"
        dataRender={services}
        coloumRender={columns}
        refetch={refetch}
        isLoading={isLoading}
        error={error}
        dataRender={currentList}
        prevousState={services}
        setCurrentList={setCurrentList}
        refetch={refetch}
      error={error}
      />
      
     
    
    </>
  );
};


export default Banner;
