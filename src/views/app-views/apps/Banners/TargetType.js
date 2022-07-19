import React, { useState, useEffect } from "react";
import { useFetch } from "hooks";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import CustomTable from "../Components/CustomTable";
import { Modal, Upload } from "antd";

const Banners_Media = () => {
  const { services, refetch, isLoading, error, isSuccess } =
    useFetch("targetType");
  const [singleImage, setSingleImage] = useState("");

  const [currentList, setCurrentList] = useState([]);
  useEffect(() => setCurrentList(services), [isSuccess, services]);

  const history = useHistory();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
       {
      title: "Target Types",
      dataIndex: "show_in",
      key: "show_in",
    //   render: (text, obj) => {
    //     return (
    //    <h5>target type</h5>
    //     );
    //   },
    },
    
   
  ];

  return (
    <>
      <CustomTable
        pageTitle="List of Target types"
        endPoint={"targetType"}
        addEndPoint="Banners/AddtargetType"
        editEndPoint="Banners/edit_target_ReadForm"
        dataRender={services}
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
     
      <Modal
        visible={singleImage.length > 0}
        footer={null}
        onCancel={() => setSingleImage("")}
      >
        <img
          alt="image"
          style={{ width: "100%", height: 350 }}
          src={singleImage}
        />
      </Modal>
    </>
  );
};


export default Banners_Media;
