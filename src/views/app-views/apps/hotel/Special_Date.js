import React, { useState, useEffect } from "react";
// import { Avatar, Comment, message, Rate, Table, Tag, Tooltip,Form,Input ,Badge, Button,Card,Modal} from "antd";

import { useFetch } from "hooks";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import CustomTable from "../Components/CustomTable";
import { Modal, Upload ,Badge} from "antd";
import service from "auth/FetchInterceptor";

const Special_Date = () => {
  const { services, refetch, isLoading, error, isSuccess } =
    useFetch("weddingSpecialDates");
  const [singleImage, setSingleImage] = useState("");

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
      title: "Name_En",
      dataIndex: "name_en",
      key: "name_en",
    
    },
    {
      title: "Reservation_Date",
      dataIndex: "reservation_date",
      key: "reservation_date",
       
    },
    {
        title: "Price",
        dataIndex: "price",
        key: "price",
        render: (price) => `${price} EGP`

         
      },
     
    
    // {
    //   title: "Created At",
    //   dataIndex: "created_at",
    //   key: "created_at",
    // //   render: (text, obj) => {
    // //     return (
    // //       <span>{obj.created_at}{obj.currency}</span>
    // //     );
    // //   },
    // },
  
  ];
 

  return (
    <>
    {/* mohab */}
      <CustomTable
        pageTitle="List of Special Date "
        endPoint={"weddingSpecialDates"}
        addEndPoint="hotel/Add_Special_Date"
        editEndPoint="hotel/Edit_Special_Date"
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


export default Special_Date;
