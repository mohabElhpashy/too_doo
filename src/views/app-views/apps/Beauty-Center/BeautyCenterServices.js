import service from "auth/FetchInterceptor";
import { useFetch } from "hooks";
import React,{useEffect,useState} from "react";
import CustomTable from "../Components/Custome_table_for_perm";
import { Badge, message, Modal, Rate, Tag, Upload ,Comment,Input,Form,Button} from "antd";
import { useHistory } from "react-router";
const BeautyCenterServices = () => {
  const [Weddinghall,setWeddinghall]=useState([])
  const [from,setfrom]=useState("")
  const [to,setto]=useState("")
  const [singleImage, setSingleImage] = React.useState("");
  const [currentList, setCurrentList] = useState([]);
  const [totalPages, settotalPages] = useState(1);
  const [pages, setpages] = useState(1);

  // const { services, isLoading, refetch } = useFetch(`beautyCenterServices?itemsPerPage=10&page=${pages}`);

  const [loading, setloading] = useState(false);
  const history = useHistory();
  const changeStatus = async (record) => {
    const key = "updatable!";
    message.loading({ content: "Loading...", key, duration: 15 });

    try {
      await service.post(`/web/beautyCenterServices/changeStatus/${record.id}`);
      message.success({ content: "Done!", key, duration: 2 });

      // refetch();
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
      sorter: (a, b) => a.name.length - b.name.length,
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
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
      dataIndex: "store_name_en",
      key: "store_name_en",
      // sorter: (a, b) => a.store_name.length - b.store_name.length,
      render: (name, obj) => (
        <a
          onClick={() =>
            history.push(
              `/app/apps/beauty/editReadForm?name=view&id=${obj.store_id}`
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
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price} EGP`,
      sorter: (a, b) => a.price - b.price,
    },

    // {
    //   title: "Rating",
    //   dataIndex: "rating",
    //   key: "rating",
    //   render: (rate) => (
    //     <Rate allowHalf disabled defaultValue={rate} style={{ width: 150 }} />
    //   ),
    //   sorter: (a, b) => a.raiting - b.rating,
    // },
    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      render: (text, record) => {
        if (text) {
          return (
            <>
              <Badge status="success" />
              <span>Active</span>
            </>
          );
        } else {
          return (
            <>
              <Badge status="error" />
              <span>Inactive</span>
            </>
          );
        }
      },
    },
    {
      title: "Approved",
      dataIndex: "approve",
      key: "approve",
      render: (text, record) => {
        if (text) {
          return (
            <Tag
              className="cursor-pointer"
              onClick={() => changeStatus(record)}
              color="green"
            >
              Approve
            </Tag>
          );
        } else {
          return (
            <Tag
              className="cursor-pointer "
              onClick={() => changeStatus(record)}
              color="red"
            >
              UnApproved
            </Tag>
          );
        }
      },
    },
  ];
  const Fetch_record=async(page)=>{
    setloading(true)
    console.log("page",page)
    if(page==undefined)
    {
      const Records= await service.get(`/web/beautyCenterServices?itemsPerPage=10&page=${1}`).then(respose=>{
        setCurrentList(respose.records)
        settotalPages(respose.paginationInfo.totalRecords)
        setloading(false)
      }) ;
    }
    else{
      try {

        const Records= await service.get(`/web/beautyCenterServices?itemsPerPage=10&page=${page}`).then(respose=>{
          setCurrentList(respose.records)
          settotalPages(respose.paginationInfo.totalRecords)
          setloading(false)
          setpages(page)
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
      const Post=await service.get(`web/beautyCenterServices/searchPrice?priceFrom=${from}&priceTo=${to}`).then(
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

               <Form.Item><Input  value={to}   onChange={e=>setto(e.target.value)}/></Form.Item>
               <Button onClick={Fetch_all_record}>Serach</Button>
               <Button onClick={reset}>Reset</Button>



    </div>
      {/* <CustomTable
        pageTitle="Beauty Center Services"
        dataRender={Weddinghall}
        coloumRender={columns}
        isLoading={isLoading}
        refetch={refetch}
        endPoint="beautyCenterServices"
        editEndPoint="beauty/editBeautyCenterService"
        addEndPoint="beauty/AddBeautyCenterServices"
      /> */}
           <CustomTable
        loading={loading}
         Fetch_record={(page)=>Fetch_record(page)}
        totalPages={totalPages}
        pageTitle="Beauty Center Services"
        dataRender={currentList}
        coloumRender={columns}
        // isLoading={isLoading}
        // refetch={refetch}
        endPoint="beautyCenterServices"
        editEndPoint="beauty/editBeautyCenterService"
        addEndPoint="beauty/AddBeautyCenterServices"
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

export default BeautyCenterServices;
