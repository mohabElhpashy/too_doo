import React, { useState, useEffect } from "react";
import { useFetch } from "hooks";
 import { useHistory } from "react-router";
import { Modal, Upload } from "antd";
import CustomTable from "../Components/Custome_table_for_perm";
import service from "auth/FetchInterceptor";

const MakeUp = () => {
  // const { services, isLoading, refetch, isSuccess } = useFetch("makeups");
  const [currentList, setCurrentList] = useState([]);
  const [totalPages, settotalPages] = useState();

  const [loading, setloading] = useState(false);

  useEffect(async()=>{
    try {
      Fetch_record()
      } catch (error) {
        // setSubmitLoading(false);
      }
  },[])
  //get records
  const Fetch_record=async(page)=>{
    setloading(true)
    if(page==undefined){
      const Records= await service.get(`/web/makeups?itemsPerPage=10&page=${1}`).then(respose=>{
        setCurrentList(respose.records)
        console.log("paginationInfo",respose.paginationInfo.totalPages)
        settotalPages(respose.paginationInfo.totalRecords)
        setloading(false)
      }) ;
    }
    else{
      try {
        const Records= await service.get(`/web/makeups?itemsPerPage=10&page=${page}`).then(respose=>{
          setCurrentList(respose.records)
          console.log("paginationInfo",respose.paginationInfo.totalPages)
          settotalPages(respose.paginationInfo.totalRecords)
          setloading(false)
        }) ;
         // openNotificationWithIcon("success");
         // history.push("flashdeals");
         // setSubmitLoading(false);
         
         console.log("currentList",currentList)
  
       } catch (error) {
         // setSubmitLoading(false);
       }
    }

    
  }
  const [singleImage, setSingleImage] = useState("");

  const history = useHistory();
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Store Name",
      dataIndex: "name_en",
      key: "name_en",
      sorter: (a, b) => a.name_en.length - b.name_en.length,
    },
    {
      title: "Seller Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      render: (name, obj) => (
        <a
          onClick={() =>
            history.push(`/app/apps/CRM/veForm?name=view&id=${obj.seller_id}`)
          }
        >
          {name}
        </a>
      ),
    },
    {
      title: "Main Image ",
      dataIndex: "main_image",
      key: "main_image",
      render: (text, obj) => {
        return (
          <Upload
            disabled={true}
            // fileList={props?.postObject?.images}
            fileList={[
              {
                uid: obj.id,
                name: obj.name_en,
                status: "done",
                url: obj.main_image,
              },
            ]}
            onPreview={(t) => setSingleImage(obj.main_image)}
            listType="picture-card"
          />
        );
      },
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
      sorter: (a, b) => a.phone - b.phone,
    },

    {
      title: "City Name",
      dataIndex: "city_name",
      key: "city_name",
    },
  ];
  return (
    <>
      {/* <CustomTable  
        pageTitle="MakeUp List"
        dataRender={currentList}
        coloumRender={columns}
        refetch={refetch}
        isLoading={isLoading}
        endPoint="makeups"
        addEndPoint="makeup/AddMakeUp"
        editEndPoint="makeup/editReadForm"
        prevousState={services}
        setCurrentList={setCurrentList}
        searchUrl="stores/search/8?store_search"
        noAddOption
      /> */}
      <CustomTable
        loading={loading}
         Fetch_record={(page)=>Fetch_record(page)}
        totalPages={totalPages}
        pageTitle="MakeUp List"
        dataRender={currentList}
        coloumRender={columns}
        // refetch={refetch}
        // isLoading={isLoading}
        endPoint="makeups"
        addEndPoint="makeup/AddMakeUp"
        editEndPoint="makeup/editReadForm"
        prevousState={currentList}
        setCurrentList={setCurrentList}
        searchUrl="stores/search/8?store_search"
        noAddOption
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

export default MakeUp;
