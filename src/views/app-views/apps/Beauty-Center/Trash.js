import { useFetch } from "hooks";
import React, { useEffect, useState } from "react";
import TrashTable from "../Components/Trash";
import { statusStyle } from "../Components/constants/coloumStyle";
import { Badge, message, Modal, Rate, Tag, Upload,Comment,Input,Form, Button } from "antd";
import service from "auth/FetchInterceptor";
import { useHistory } from "react-router";
const CheckUps = () => {
  // const { services, isLoading, refetch } = useFetch("checkups/trashed");
  const [singleImage, setSingleImage] = React.useState("");
  const history = useHistory();
  const [Weddinghall,setWeddinghall]=useState([])
  const [from,setfrom]=useState("")
  const [to,setto]=useState("")
  const [currentList, setCurrentList] = useState([]);
  const [totalPages, settotalPages] = useState(1);

  const [loading, setloading] = useState(false);

  // console.log("lisisisisis",services)
  useEffect(async()=>{
    try {
      Fetch_record()
      } catch (error) {
        // setSubmitLoading(false);
      }
  },[])

  const Fetch_record=async(page)=>{
    setloading(true)
    try {
      const Records= await service.get(`/web/beautyCenterServices/trashed?page=${page}`).then(respose=>{
        setCurrentList(respose.records.data)
        console.log("respose.data.last_page",respose.records.last_page)
        settotalPages(respose.data.last_page)
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
  const trncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

   
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name ",
      dataIndex: "name_en",
      key: "name_en",
      sorter: (a, b) => a.name_en.length - b.name_en.length,
    },
    // {
    //   title: "Seller",
    //   dataIndex: "seller_name",
    //   key: "seller_name",
    //   // sorter: (a, b) => a.seller_name.length - b.seller_name.length,
    //   render: (text, Obj) => (
    //     <Comment
    //       // actions={[
    //       //   <span key=' key="comment-basic-dislike"'>
             
    //       //   </span>,
    //       // ]}
     
    //       content={
    //       // <p>{Obj.seller_first_name}{" "}{Obj.seller_last_name}</p>
    //       (
    //         <a
    //         onClick={() =>
    //                 history.push(`/app/apps/CRM/veForm?name=view&id=${Obj.seller_id}`)
    //               }
              
    //         >
    //           {/* {Obj.first_name || Obj.first_name +Obj.last_name} */}
    //           {Obj.seller_first_name}{" "}{Obj.seller_last_name}
    //         </a>
    //       )

    //     }
        
    //     />
    //   ),
    // },
    // {
    //   title: "Store",
    //   dataIndex: "store_name",
    //   key: "store_name",
    //   // sorter: (a, b) => a.store_name.length - b.store_name.length,
    //   render: (name, obj) => (
    //     <a
    //       onClick={() =>
    //         history.push(
    //           `/app/apps/doctors/editReadForm?name=view&id=${obj.store_id}`
    //         )
    //       }
    //     >
    //       {name}
    //     </a>
    //   ),
    // },
    // {
    //   title: "Description ",
    //   dataIndex: "description_en",
    //   key: "description_en",
    //   render: (text) => {
    //     return trncate(text, 20);
    //   },
    // },

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
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price} EGP`,
      sorter: (a, b) => a.price - b.price,
    },
    // {
    //   title: "Raiting",
    //   dataIndex: "rating",
    //   render: (rate) => {
    //     return (
    //       <Rate
    //         style={{ width: 150 }}
    //         allowHalf
    //         disabled
    //         defaultValue={parseFloat(rate)}
    //       />
    //     );
    //   },

    //   key: "rating",
    //   sorter: (a, b) => a.raiting - b.raiting,
    // },

    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      render: (text, record) => {
        if (text) {
          return (
            <div style={{ display: "flex" }}>
              <Badge status="success" />
              <span style={{ fontWeight: "bolder" }}>Active</span>
            </div>
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
            //   className="cursor-pointer"
            //   onClick={() => changeStatus(record)}
              color="green"
            >
              Approve
            </Tag>
          );
        } else {
          return (
            <Tag
            //   className="cursor-pointer"
            //   onClick={() => changeStatus(record)}
              color="red"
            >
              UnApproved
            </Tag>
          );
        }
      },
    },
  ];
  
//   useEffect(async()=>{
//     if(from==""&&to==""){
//       // const Post=await service.get(`web/cars`).then(
//       //   res=>{
//       //     console.log("my response with out",res.records)
//       //     refetch()

//       //     setWeddinghall(res.records)}
//       // )
//       Fetch_record()
//       return
//     }
      
//   },[from,to])
//   const Fetch_all_record=async()=>{
//     console.log("my response before",Weddinghall)

//     setCurrentList()
//       const Post=await service.get(`web/checkups/searchPrice?priceFrom=${from}&priceTo=${to}`).then(
//         res=>{
//           console.log("my response with in",res.records)
//            setCurrentList(res.records)}
//       )
//   }
 const reset=()=>{
   setfrom('');
   setto('')
 }
  return (
    <>
      {/* <div style={{display:"flex",justifyContent:'center',    alignItems: 'baseline'}}>
     <span style={{fontWeight: 800}}>serach By Price</span>
               <Form.Item><Input value={from} onChange={e=>setfrom(e.target.value)}/></Form.Item>

               <Form.Item><Input value={to}  onChange={e=>setto(e.target.value)}/></Form.Item>
               <Button onClick={Fetch_all_record}>Serach</Button>
               <Button onClick={reset}>Reset</Button>



    </div> */}
      {/* <CustomTable
        pageTitle={"CheckUps List"}
        endPoint={"checkups"}
        editEndPoint="doctors/eeditCheckUp"
        addEndPoint="doctors/AddCheckUPs"
        dataRender={Weddinghall}
        coloumRender={columns}
        refetch={refetch}
        isLoading={isLoading}
      /> */}
       <TrashTable
       
        totalPages={totalPages}
        pageTitle={"Recycle Bin"}
        endPoint={"checkups"}
        editEndPoint="doctors/eeditCheckUp"
        addEndPoint="doctors/AddCheckUPs"
        dataRender={currentList}
        coloumRender={columns}
        // refetch={refetch}
        // isLoading={isLoading}
        noAddOption
        noEditAction
        noViewAction   
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

export default CheckUps;
