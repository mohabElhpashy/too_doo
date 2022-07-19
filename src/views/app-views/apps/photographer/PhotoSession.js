import { useFetch } from "hooks";
// import { message, Tag ,Button,Modal,Input,
//   Row,
//   Col,
//   Card,
//   Popconfirm,

//   Form,} from "antd";
import React, { useEffect, useState } from "react";
import CustomTable from "../Components/Custome_table_for_perm";
import { APPLICATION_CURRENCY } from "../Components/constants/viewConstants";
import { Modal, Upload,message, Tag,Comment ,Input,Form, Button} from "antd";
import { useHistory } from "react-router";
import service from "auth/FetchInterceptor";

const PhotoSession = () => {
  // const { services, refetch, isLoading, error } = useFetch("photosession");
  const [singleImage, setSingleImage] = React.useState("");
  const [Weddinghall,setWeddinghall]=useState([])
  const [from,setfrom]=useState("")
  const [to,setto]=useState("")
  const [currentList, setCurrentList] = useState([]);
  const [totalPages, settotalPages] = useState(1);

  const [loading, setloading] = useState(false);
  const history = useHistory();
  const key = "updatable";

  const trncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  const changeStatus = async (record) => {
    message.loading({ content: "Loading...", key, duration: 15 });

    try {
      await service.put(`/web/photosession/changeStatus/${record.id}`);
      // refetch();
      message.success({ content: "Done!", key, duration: 2 });
    } catch (error) {
      message.error({ content: "Error Occured!", key, duration: 2 });
    }
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    // {
    //   title: "Description ",
    //   dataIndex: "description",
    //   key: "description",
    //   render: (text) => {
    //     return trncate(text, 50);
    //   },
    //   sorter: (a, b) => a.description.length - b.description.length,
    // },
    {
      title: "Seller",
      dataIndex: "seller_name",
      key: "seller_name",
      // sorter: (a, b) => a.seller_name.length - b.seller_name.length,
      render: (text, Obj) => (
        <Comment
          // actions={[
          //   <span key=' key="comment-basic-dislike"'>
             
          //   </span>,
          // ]}
     
          content={
          // <p>{Obj.seller_first_name}{" "}{Obj.seller_last_name}</p>
          (
            <a
            onClick={() =>
                    history.push(`/app/apps/CRM/veForm?name=view&id=${Obj.seller_id}`)
                  }
              
            >
              {/* {Obj.first_name || Obj.first_name +Obj.last_name} */}
              {Obj.seller_first_name}{" "}{Obj.seller_last_name}
            </a>
          )

        }
        
        />
      ),
    },
    {
      title: "Store",
      dataIndex: "store_name",
      key: "store_name",
      // sorter: (a, b) => a.store_name.length - b.store_name.length,
      render: (name, obj) => (
        <a
          onClick={() =>
            history.push(
              `/app/apps/photographer/editReadForm?name=view&id=${obj.store_id}`
            )
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
      title: "Status",
      dataIndex: "active",
      align: "center",
      key: "active",
      render: (text, record) => {
        if (record.approve) {
          return (
            <div className="d-flex align-items-center justify-content-center">
              <Tag
                className="cursor-pointer"
                onClick={() => changeStatus(record)}
                color="green"
              >
                Approved
              </Tag>
            </div>
          );
        } else {
          return (
            <div className="d-flex align-items-center justify-content-center">
              <Tag
                className="cursor-pointer "
                onClick={() => changeStatus(record)}
                color="red"
              >
                unapproved
              </Tag>
            </div>
          );
        }
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) => `${price} ${APPLICATION_CURRENCY}`,
      key: "price",
    },

    {
      title: "Photo Count",
      dataIndex: "photos_count",
      render: (photo) => `${photo} Photos`,

      key: "photos_count",
    },
  ];
  const Fetch_record=async(page)=>{
    setloading(true)
    console.log("page",page)
    if(page==undefined)
    {
      const Records= await service.get(`/web/photosession?itemsPerPage=10&page=${1}`).then(respose=>{
        setCurrentList(respose.records)
        settotalPages(respose.paginationInfo.totalRecords)
        setloading(false)
      }) ;
    }
    else{
      try {

        const Records= await service.get(`/web/photosession?itemsPerPage=10&page=${page}`).then(respose=>{
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
  useEffect(async()=>{
    if(from==""&&to==""){
      // const Post=await service.get(`web/cars`).then(
      //   res=>{
      //     console.log("my response with out",res.records)
      //     refetch()

      //     setWeddinghall(res.records)}
      // )
      Fetch_record()
      return
    }
      
  },[from,to])
  const Fetch_all_record=async()=>{
    console.log("my response before",Weddinghall)

    setCurrentList()
      const Post=await service.get(`web/photosession/searchPrice?priceFrom=${from}&priceTo=${to}`).then(
        res=>{
          console.log("my response with in",res.records)
           setCurrentList(res.records)}
      )
  }
 const reset=()=>{
   setfrom('');
   setto('')
 }
  return (
    <>
    <div style={{display:"flex",justifyContent:'center',    alignItems: 'baseline'}}>
     <span style={{fontWeight: 800}}>serach By Price</span>
               <Form.Item><Input value={from} onChange={e=>setfrom(e.target.value)}/></Form.Item>

               <Form.Item><Input value={to}  onChange={e=>setto(e.target.value)}/></Form.Item>
               <Button onClick={Fetch_all_record}>Serach</Button>
               <Button onClick={reset}>Reset</Button>



    </div>
      {/* <CustomTable
        pageTitle="List of PhotoSessions"
        endPoint="photosession"
        addEndPoint="photographer/AddPhotoSession"
        editEndPoint="photographer/editphotoSession"
        dataRender={Weddinghall}
        coloumRender={columns}
        refetch={refetch}
        isLoading={isLoading}
        error={error}
      /> */}
          <CustomTable
        loading={loading}
         Fetch_record={(page)=>Fetch_record(page)}
        totalPages={totalPages}
        pageTitle="List of PhotoSessions"
        endPoint="photosession"
        addEndPoint="photographer/AddPhotoSession"
        editEndPoint="photographer/editphotoSession"
        dataRender={currentList}
        coloumRender={columns}
        // refetch={refetch}
        // isLoading={isLoading}
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

export default PhotoSession;
