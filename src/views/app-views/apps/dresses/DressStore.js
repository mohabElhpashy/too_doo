import React, { useState, useEffect } from "react";
import { useFetch } from "hooks";
// import CustomTable from "../Components/CustomTable";
import { useHistory } from "react-router-dom";
import { Modal, Upload } from "antd";
import service from "auth/FetchInterceptor";
import CustomTable from "../Components/Custome_table_for_perm";
const DressStore = () => {
  // const { services, isLoading, refetch, isSuccess } = useFetch("dressStore");
  const history = useHistory();
  const [singleImage, setSingleImage] = useState("");
  const [currentList, setCurrentList] = useState([]);
  const [totalPages, settotalPages] = useState(1);

  const [loading, setloading] = useState(false);
  const[PAge,setPAge]=useState("1")

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
    console.log("page",page)
    if(page==undefined)
    {
      const Records= await service.get(`/web/dressStore?itemsPerPage=10&page=${1}`).then(respose=>{
        setCurrentList(respose.records)
        settotalPages(respose.paginationInfo.totalRecords)
        setloading(false)
      }) ;
    }
    else{
      try {

        const Records= await service.get(`/web/dressStore?itemsPerPage=10&page=${page}`).then(respose=>{
          setCurrentList(respose.records)
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
          {obj.seller_first_name || obj.name}
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
    },

    {
      title: "City",
      dataIndex: "city_name",
      sorter: (a, b) => a.city_name - b.city_name,
      key: "city_name",
      render: (name, obj) => obj.city_name_en || obj.city_name,
    },
  ];
  return (
    <div>
      {/* <CustomTable
        pageTitle={"Dress Stores"}
        dataRender={currentList}
        setCurrentList={setCurrentList}
        prevousState={services}
        coloumRender={columns}
        isLoading={isLoading}
        refetch={refetch}
        endPoint={"dressStore"}
        editEndPoint="dresses/editDressStore"
        addEndPoint={"dresses/AddDressStore"}
        noAddOption
        searchUrl="stores/search/7?store_search"
      /> */}
          <CustomTable
        loading={loading}
         Fetch_record={(page)=>Fetch_record(page)}
        totalPages={totalPages}
        pageTitle={"Dress Stores"}
        dataRender={currentList}
        setCurrentList={setCurrentList}
        prevousState={currentList}
        coloumRender={columns}
        // isLoading={isLoading}
        // refetch={refetch}
        endPoint={"dressStore"}
        editEndPoint="dresses/editDressStore"
        addEndPoint={"dresses/AddDressStore"}
        noAddOption
        searchUrl="stores/search/7?store_search"
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
    </div>
  );
};

export default DressStore;
