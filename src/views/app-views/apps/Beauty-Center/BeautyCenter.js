import { Modal, Upload } from "antd";
import { useFetch } from "hooks";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
// import CustomTable from "../Components/CustomTable";
import service from "auth/FetchInterceptor";
import CustomTable from "../Components/Custome_table_for_perm";

const BeautyCenter = () => {
  const [pages, setpages] = useState(1);

   

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
        const Records= await service.get(`/web/beautyCenters?itemsPerPage=10&page=${1}`).then(respose=>{
          setCurrentList(respose.records)
          settotalPages(respose.paginationInfo.totalRecords)
          setloading(false)
        }) ;
      }
      else{
        try {

          const Records= await service.get(`/web/beautyCenters?itemsPerPage=10&page=${page}`).then(respose=>{
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
      title: "Open At",
      dataIndex: "open_at",
      key: "open_at",
      sorter: (a, b) => a.open_at - b.open_at,
    },
    {
      title: "Close At",
      dataIndex: "close_at",
      key: "close_at",
      sorter: (a, b) => a.close_at - b.close_at,
    },
    // {
    //   title: "Country Name",
    //   dataIndex: "country_name",
    //   key: "country_name",
    // },

    {
      title: "City Name",
      dataIndex: "city_name",
      key: "city_name",
    },
  ];

  return (
    <>
      {/* <CustomTable
        pageTitle="Beauty Centers List"
        coloumRender={columns}
        refetch={refetch}
        isLoading={isLoading}
        error={error}
        endPoint="beautyCenters"
        addEndPoint="beauty/AddBeautyCenter"
        editEndPoint="beauty/editReadForm"
        noAddOption
        dataRender={currentList}
        prevousState={services}
        setCurrentList={setCurrentList}
        searchUrl="stores/search/4?store_search"
      /> */}
       <CustomTable
        loading={loading}
         Fetch_record={(page)=>Fetch_record(page)}
        totalPages={totalPages}
        pageTitle="Beauty Centers List"
        coloumRender={columns}
        // refetch={refetch}
        // isLoading={isLoading}
        // error={error}
        endPoint="beautyCenters"
        addEndPoint="beauty/AddBeautyCenter"
        editEndPoint="beauty/editReadForm"
        noAddOption
        dataRender={currentList}
        prevousState={currentList}
        setCurrentList={setCurrentList}
        searchUrl="stores/search/4?store_search"
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

export default BeautyCenter;
