import React, { useState, useEffect } from "react";
// import { Avatar, Comment, message, Rate, Table, Tag, Tooltip,Form,Input ,Badge, Button,Card,Modal} from "antd";

import { useFetch } from "hooks";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import CustomTable from "../Components/CustomTable";
import { Modal, Upload ,Badge} from "antd";
import service from "auth/FetchInterceptor";

const Banner = () => {
  const { services, refetch, isLoading, error, isSuccess } =
    useFetch("WeddingHallPeriods");
  const [singleImage, setSingleImage] = useState("");

  const [currentList, setCurrentList] = useState([]);
  console.log("lisisisisis",services)
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
      dataIndex: "name_ar",
      key: "name_ar",
    
    },
    {
      title: "Name En",
      dataIndex: "name_en",
      key: "name_en",
       
    },
     
    // {
    //   title: "Number Of Views",
    //   dataIndex: "number_of_views",
    //   key: "number_of_views",
      
    // },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
    //   render: (text, obj) => {
    //     return (
    //       <span>{obj.created_at}{obj.currency}</span>
    //     );
    //   },
    },
    // {
    //   title: "Is Favourite",
    //   dataIndex: "is_favourite",
    //   render: (test, record) => (record.is_favourite ?
    //     <div style={{ display: "flex" }}>
    //     <Badge status="success" />
    //     <span style={{ fontWeight: "bolder" }}>YES</span>
    //   </div>
    //   :<div style={{ display: "flex" }}>
    //   <Badge status="error" />
    //   <span style={{ fontWeight: "bolder" }}>No</span>
    // </div>
    //   ),
    // },
  ];
 

  return (
    <>
      <CustomTable
        pageTitle="List of Periods "
        endPoint={"WeddingHallPeriods"}
        addEndPoint="hotel/Add_Periods"
        editEndPoint="hotel/Edit_Periods"
        dataRender={currentList}
        coloumRender={columns}
        refetch={refetch}
        isLoading={isLoading}
        error={error}
        // dataRender={currentList}
        prevousState={services}
        setCurrentList={setCurrentList}
        // refetch={refetch}
      // error={error}
      />
     
    
    </>
  );
};


export default Banner;
