import {
    Badge,
    Menu,
    message,
    Table,
    Tooltip,
    Modal,
    Form,
    DatePicker,
    Select,
    Button,
    Input,
    Row,
    Card
  } from "antd";
  import  {PlusOutlined} from "@ant-design/icons";
  
  import service from "auth/FetchInterceptor";
  import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
  import Flex from "components/shared-components/Flex";
  import { getPaymentStatus, handleChange,handleChange_cLIENT } from "constants/helperFunctions";
  import { useFetch } from "hooks";
  import React, { useEffect, useState } from "react";
  import { useHistory } from "react-router";
  import utils from "utils";
  import { RESERVATION_STATUS } from "constants/statusConstant";
  import {
    DATE_FORMAT_Farahy,
    DATE_FORMAT_YYYY_MM_DDTHH_mm_ssZ,
  } from "constants/DateConstant";
  import ServiceIdConstants from "constants/ServiceIdConstants";
  import moment from "moment";
  import CustomTable from "../../../Components/CustomTable";
  const ListRequests = ({
    recordId
  }) => {
   
   
    
  

    const [AddComments,setAddComments]=useState(false)
    const[allComment,setallComment]=useState([])
    const[PostComment,setPostComment]=useState("")
    const[GetRes_id,setGetRes_id]=useState()
  
 useEffect(async()=>{
    try {
        await service.get(`/web/allComments/reservation/${6}/${recordId}`).then(comment=>{
          // console.log("comment",comment.data)
          setallComment(comment.data)});
          
       } catch (error) {
       }
 })
  
   
  
  const PostCoMMent=async()=>{
    console.log("PostComment",PostComment)
    try {
      await service.post(`/web/addComment/reservation`,{
        service_id:6,
        reservation_id:recordId,
        comment:PostComment
      });
      setPostComment("")
        setAddComments(false)
      // message.success({ content: "Done!", key, duration: 2 });
    } catch (error) {
      // message.error({ content: "Error Occured!", key, duration: 2 });
    }
  }
//     const columns = [
//       {
//         title: "ID",
//         dataIndex: "id",
//         key: "id",
//         sorter: (a, b) => a.id - b.id,
//       },
//       {
//         title: "Client Name",
//         dataIndex: "client_name",
//         key: "client_name",
//         render: (id) => `${id}`,
//         sorter: (a, b) => a.client_name - b.client_name,
//       },
//       {
//         title: "Dress Name",
//         dataIndex: "product_name_en",
//         key: "product_name_en",
//         // sorter: (a, b) => a.store_name.length - b.store_name.length,
//         render: (name, obj) => (
//           <a
//             onClick={() =>
//               history.push(
//                 `/app/apps/dresses/editProduct?name=view&id=${obj.product_id}`
//               )
//             }
//           >
//             {name}
//           </a>
//         ),
//       },
//       {
//         title: "Store",
//         dataIndex: "store_name_en",
//         key: "store_name_en",
//         // sorter: (a, b) => a.store_name.length - b.store_name.length,
//         render: (name, obj) => (
//           <a
//             onClick={() =>
//               history.push(
//                 `/app/apps/dresses/editDressStore?name=view&id=${obj.store_id}`
//               )
//             }
//           >
//             {name}
//           </a>
//         ),
//       },
  
//       {
//         title: "Fit Date",
//         dataIndex: "fit_date",
//         key: "fit_date",
//         sorter: (a, b) => a.fit_date - b.fit_date,
//         render: (date) => date.split(" ")[0],
//       },
//       {
//         title: "PickUp Date",
//         dataIndex: "pickup_date",
//         key: "pickup_date",
//         sorter: (a, b) => a.pickup_date - b.pickup_date,
//         render: (date) => date.split(" ")[0],
//       },
  
//       {
//         title: "Status",
//         dataIndex: "status_id",
//         render: (_, record) => (
//           <>
//             <Badge status={getPaymentStatus(record.status_type)} />
//             <span>
//               {record.status_type
//                 .split("")
//                 .map((element, index) => {
//                   if (index > 0) {
//                     return element.toLowerCase();
//                   } else {
//                     return element;
//                   }
//                 })
//                 .join("")}
//             </span>
//             {record.status_type === "REFUSED" && (
//               <>
//                 <span style={{ marginLeft: 5, marginRight: 5 }}>By</span>
//                 <span>
//                   {record.action_by
//                     .split("")
//                     .map((element, index) => {
//                       if (index > 0) {
//                         return element.toLowerCase();
//                       } else {
//                         return element;
//                       }
//                     })
//                     .join("")}
//                 </span>
//               </>
//             )}
//           </>
//         ),
//         sorter: (a, b) => utils.antdTableSorter(a, b, "status_id"),
//       },
//       {
//         title: "Total Price",
//         dataIndex: "total_price",
//         key: "total_price",
//         render: (price) => `${price} EGP`,
//         sorter: (a, b) => a.total_price - b.total_price,
//       },
//       {
//         title: "",
//         dataIndex: "actions",
//         render: (_, elm) => {
//           // console.log("my Item=>",elm)
//           return(
//           <div className="text-right">
//             <EllipsisDropdown  menu={dropdownMenu(elm)} />
//           </div>
//         )}
//       },
//       {
//         title: "Add Comments",
//         dataIndex: "actions",
//         render: (_, elm) => {
//           // console.log("my Item=>",elm)
//           return(
//           <div className="text-right">
//   <Button onClick={()=>getallComments(elm)} ><PlusOutlined /></Button>        </div>
//         )}
//       },
//     ];
  
    return (
      <div >
             <Row xs={24} sm={24} md={17}>
      <Card title="List Of comments" className="w-100">
      <div  style={{display:"flex",flexDirection:"column" ,height:"200px",overflowY:"scroll",padding:"5px"}}>
          {allComment!=""?allComment.map((dta,index)=>{
        return(
          <>
          <div style={{display:"flex",justifyContent:"space-evenly",marginBottom:"3px"}}>
            <div><span>Email:</span><span style={{ textDecoration: "underline"}}>{dta.admin.email}</span></div>
            <div><span>Date:</span><span style={{ textDecoration: "underline"}}>{dta.updated_at.slice(0, 10)}</span></div>
  
          </div>
          <Form.Item
          required
          name="description_ar"
         
        >
          <div key={index}>
          <Input.TextArea
            // placeholder="Enter the Description in Arabic"
            // onChange={(event) =>
            //   props.setPostObject({
            //     ...props.postObject,
            //     description_ar: event.target.value,
            //   })
            // }
            disabled
            defaultValue={dta.comment}
            rows={4}
          />
          </div>
        </Form.Item>
        </> 
        )
      }):<h1>No Comments Added</h1>}
      
         
          </div>
          <div  style={{display:"flex",flexDirection:"column"}}>
      <Form.Item
          required
          name="description_ar"
          // label="Description in Arabic"
         
        >
          <Input.TextArea
            placeholder="Enter Your Comments "
            // onChange={(event) =>
            //   props.setPostObject({
            //     ...props.postObject,
            //     description_ar: event.target.value,
            //   })
            // }
            onChange={(e)=>setPostComment( e.target.value)}
            rows={4}
          />
        </Form.Item>
     <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>  
     {PostComment==""?      <Button disabled style={{width:"35%"}} onClick={PostCoMMent} type="primary">POST</Button>
:      <Button  style={{width:"35%"}} onClick={PostCoMMent} type="primary">POST</Button>
}       
      </div>
      </div>
      </Card>
    </Row>
      
      </div>
    );
  };
  
  export default ListRequests;
  