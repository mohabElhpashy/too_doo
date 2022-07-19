
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
        Tabs ,
        Input,
        Col,
        Card,
        Row,
        Button,
        notification

    } from "antd";
    import {
        EyeTwoTone 

      } from '@ant-design/icons';
    import service from "auth/FetchInterceptor";
    import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
    import Flex from "components/shared-components/Flex";
    import { getPaymentStatus, handleChange,handleChange_cLIENT  } from "constants/helperFunctions";
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
    import CustomTable from "../Components/CustomTable";
import { set } from "lodash";
import Dress from './List/Dress'
import MakeUp from "./List/Makeup";
import Trips from './List/trips'
import Doctors from './List/Doctors'
import Photograph from './List/Photographer'
import BeautyCenter from './List/Beautycenter'
import Hotel from './List/Hotels'
import Cars from './List/Cars'

    const Reservations = () => {
        const CURRENT_DATE = moment().format(DATE_FORMAT_Farahy);
        const { TabPane } = Tabs;
        

        var [staet,setstaet]=useState("")
        var [check,setcheck]=useState("")
        const[store,setStoreList]=useState()
        const[endPoint,setendPoint]=useState({value:""})
        const [endPOINT,setendPOINT]=useState("")
        const [key,setkey]=useState(1)
        const[service_For_Status,ser_service_For_Status]=useState("")
        const { services, isLoading, refetch } = useFetch(
            "makeupServiceReservations"
          );
    
        // const { services, isLoading, refetch, error } = useFetch('carReservation');
        const dressProdctRes = useFetch("dress");
        const dressVariationRes = useFetch("dressVariation");
        const [isModalVisible, setIsModalVisible] = useState(false);
        const[Comment,setComment]=useState({data:""})
        const[ProductId,setProductId]=useState({value:""})

       
      
        useEffect(async()=>{
            // console.log("my key",MYdata.record)
             
                if(key==1){

                    if(staet==""){
                        try {
                        const data = await service.get(`web/carReservation`);
                        console.log("msmdmasdmasd",data.data)
                        setStoreList(data.data);
                         setendPOINT("cars/readReservation")
                    } catch (error) {
                        <h2>{error}</h2>;
                    }}
                    
                    else{

                        try {
                            const data = await service.get(`web/carReservation`);
                            const result = data.data.filter(word => word.order_id==staet)
                            console.log("my result ",result)
                            setStoreList(result);
                            setendPOINT("cars/readReservation")

                          
                        } catch (error) {
                            <h2>{error}</h2>;
                        }
                    }
            
                }
                if(key==2){
                
                    if(staet==""){

                    try {
                        const data = await service.get(`web/weddingHallReservation`);
                        console.log("msmdmasdmasd",data.data)
                        setStoreList(data.data);
                        setendPOINT("hotel/readReservation")
                    } catch (error) {
                        <h2>{error}</h2>;
                    }}
                    else{

                        try {
                            const data = await service.get(`web/weddingHallReservation`);
                            const result = data.data.filter(word => word.order_id==staet)
                            console.log("my result ",result)
                            setStoreList(result);
                            setendPOINT("hotel/readReservation")

                          
                        } catch (error) {
                            <h2>{error}</h2>;
                        }
                    }

            
                }
                if(key==3)
                {
                    if(staet==""){
                    try {
                        const data = await service.get(`web/checkupReservation`);
                        console.log("msmdmasdmasd",data.data)
                        setStoreList(data.data);
                        setendPOINT("doctors/readReservation")
                    } catch (error) {
                        <h2>{error}</h2>;
                    }}
                    else{

                        try {
                            const data = await service.get(`web/checkupReservation`);
                            const result = data.data.filter(word => word.order_id==staet)
                            console.log("my result ",result)
                            setStoreList(result);
                            setendPOINT("doctors/readReservation")

                          
                        } catch (error) {
                            <h2>{error}</h2>;
                        }
                    }
            
                }
                if(key==4)
                {
                    if(staet==""){

                    try {
                        const data = await service.get(`web/beautyCenterServices`);
                        console.log("msmdmasdmasd",data.data)
                        setStoreList(data.data);
                        setendPOINT("beauty/readReservation")
                    } catch (error) {
                        <h2>{error}</h2>;
                    }}
                    else{

                        try {
                            const data = await service.get(`web/beautyCenterServices`);
                            const result = data.data.filter(word => word.order_id==staet)
                            console.log("my result ",result)
                            setStoreList(result);
                            setendPOINT("beauty/readReservation")

                          
                        } catch (error) {
                            <h2>{error}</h2>;
                        }
                    }

            
                }
                if(key==5)
                {
                    if(staet==""){
                
                    try {
                        const data = await service.get(`web/photoSessionReservation`);
                        console.log("msmdmasdmasd",data.data)
                        setendPOINT("photographer/readReservation")
                        setStoreList(data.data);
                    } catch (error) {
                        <h2>{error}</h2>;
                    }}
                    else{

                        try {
                            const data = await service.get(`web/photoSessionReservation`);
                            const result = data.data.filter(word => word.order_id==staet)
                            console.log("my result ",result)
                            setStoreList(result);
                            setendPOINT("photographer/readReservation")

                          
                        } catch (error) {
                            <h2>{error}</h2>;
                        }
                    }

            
                }
                if(key==6)
                {
                    if(staet==""){

                    try {
                        const data = await service.get(`web/tripReservation`);
                        console.log("msmdmasdmasd",data.data)
                        setStoreList(data.data);
                        setendPOINT("trips/readReservation")
                    } catch (error) {
                        <h2>{error}</h2>;
                    }}
                    else{

                        try {
                            const data = await service.get(`web/tripReservation`);
                            const result = data.data.filter(word => word.order_id==staet)
                            console.log("my result ",result)
                            setStoreList(result);
                            setendPOINT("trips/readReservation")

                          
                        } catch (error) {
                            <h2>{error}</h2>;
                        }
                    }
                }
                // if(key==7)
                // {
                //     if(staet==""){
                //     try {
                //         const data = await service.get(`web/dressReservation`);
                //         console.log("msmdmasdmasd",data.data)
                //         setStoreList(data.data);
                //         setendPOINT("dresses/readReservation")
                //         ser_service_For_Status("dressReservation")
                //     } catch (error) {
                //         <h2>{error}</h2>;
                //     }}
                //     else{

                //         try {
                //             const data = await service.get(`web/dressReservation`);
                //             const result = data.data.filter(word => word.order_id==staet)
                //             console.log("my result ",result)
                //             setStoreList(result);
                //             setendPOINT("dresses/readReservation")

                          
                //         } catch (error) {
                //             <h2>{error}</h2>;
                //         }
                //     }
            
                // }
                if(key==8)
                {
                    if(staet==""){
                
                    try {
                        const data = await service.get(`web/makeupServiceReservations`);
                        console.log("msmdmasdmasd",data.data)
                        setendPOINT("makeup/readReservation")
                        ser_service_For_Status("makeupServiceReservations")
                        

                        setStoreList(data.data);
                    } catch (error) {
                        <h2>{error}</h2>;
                    }}
                    else{

                        try {
                            const data = await service.get(`web/makeupServiceReservations`);
                            const result = data.data.filter(word => word.order_id==staet)
                            console.log("my result ",result)
                            setStoreList(result);
                            setendPOINT("makeup/readReservation")
                            
                          
                        } catch (error) {
                            <h2>{error}</h2>;
                        }
                    }
            
                }
            
            
           
            
    
console.log("end point",endPOINT)
        console.log("Comment=>",Comment)},[key,Comment,staet])
        const history = useHistory();
        const inialState = {
        type: null,
        reservation_id: null,
        seller_id: null,
        data: [],
        new_date: "",
        };
        const [statusVisible, setStatusVisible] = useState({
        replace: false,
        rescdual: false,
        });
        const [currentObject, setCurrentObject] = useState({
        type: null,
        reservation_id: null,
        seller_id: null,
        id: null,
        data: [],
        new_date: "",
        new_product_id: "",
        new_variation_id: "",
        });

    
        const [form] = Form.useForm();
        const[Allcomments,setAllcomments]=useState([])
    
        let changeStatus = {};
        const Show_Modal_cooment =async (obj) => {
            try {
                const data = await service.get(`web/allComments/reservation`).then(res=>{
                    console.log(res.data)
                  const x= res.data.filter(function(item) {
                      console.log("mohababa",item.id)
                        return item.reservation_id == obj.id
                    })
setAllcomments(x)

                });
                // setStoreList(data.data);
                // setendPOINT("cars/readReservation")
            } catch (error) {
                <h2>{error}</h2>;
            }
            console.log("my mym mymym",obj.id)
            setProductId({value:obj.id})

            setIsModalVisible(true);
          };
          const openNotificationWithIcon = (type) => {
            notification[type]({
              message: "Process Feedback",
              description: "Your Process has been Done",
            });
          };
          const dropdowNMenu =  (row) => {
   
            return(
              <Menu>
                <span className=" d-flex align-items-center justify-content-center">
                  <h5 className="mt-1">Status</h5>
                </span>
                {row.next_statues !="PICKUP" && row.next_statues !="REFUSED"   ?
                <>
                <Menu.Item
                  onClick={() =>
                    handleChange(
                      row.id,
                      `${service_For_Status}`,
                      row.next_statues.type,   
                        refetch )
                  }
                >
                  <Flex alignItems="center">
                    <Badge status="processing" />
                      <span className="ml-2">{row.next_statues.name_en}</span><br/>
                  </Flex>
                </Menu.Item>
               
                 <Menu.Item
                  onClick={() =>
                    handleChange_cLIENT(
                      row.id,
                      `${service_For_Status}`,
                      'REFUSED',  
                       
refetch                    )
                  }
                >
                  <Flex alignItems="center">
                    <Badge status="error" />
                      <span className="ml-2">Refused By Client</span><br/>
                  </Flex>
                </Menu.Item>
        
        
               
                 <Menu.Item
                  onClick={() =>
                    handleChange(
                      row.id,
                      `${service_For_Status}`,
                      'REFUSED',   
                      refetch
                    )
                  }
                >
                  <Flex alignItems="center">
                    <Badge status="error" />
                      <span className="ml-2">Refused By Seller</span><br/>
                  </Flex>
                </Menu.Item>
                {/* /Can Renew/ */}
                {row.can_renew == true?
                <Menu.Item
                  // onClick={() =>
                  //   handleChange(
                  //     row.id,
                  //     "dressReservation",
                  //     'REFUSED',   
                  //     refetch
                  //   )
                  // }
                >
                  <Flex alignItems="center">
                    <Badge status="success" />
                      <span className="ml-2">Can Renew</span><br/>
                  </Flex>
                </Menu.Item>:
                <Menu.Item
                 disabled={true}
                 // onClick={() =>
                  //   handleChange(
                  //     row.id,
                  //     "dressReservation",
                  //     'REFUSED',   
                  //     refetch
                  //   )
                  // }
                >
                  <Flex alignItems="center">
                    <Badge status="success" />
                      <span className="ml-2">Can Renew</span><br/>
                  </Flex>
                </Menu.Item>}
               {/* /can_replace/ */}
               {row.can_replace== true?<Menu.Item
                  // onClick={() =>
                  //   handleChange(
                  //     row.id,
                  //     "dressReservation",
                  //     'REFUSED',   
                  //     refetch
                  //   )
                  // }
                >
                  <Flex alignItems="center">
                    <Badge status="success" />
                      <span className="ml-2">Can Replace</span><br/>
                  </Flex>
                </Menu.Item>:<Menu.Item
                disabled
                  // onClick={() =>
                  //   handleChange(
                  //     row.id,
                  //     "dressReservation",
                  //     'REFUSED',   
                  //     refetch
                  //   )
                  // }
                >
                  <Flex alignItems="center">
                    <Badge status="success" />
                      <span className="ml-2">Can Replace</span><br/>
                  </Flex>
                </Menu.Item>}
                  
                  {/* /can_replace/ */}
               {row.can_reschedule== true?<Menu.Item
                  // onClick={() =>
                  //   handleChange(
                  //     row.id,
                  //     "dressReservation",
                  //     'REFUSED',   
                  //     refetch
                  //   )
                  // }
                >
                  <Flex alignItems="center">
                    <Badge status="success" />
                      <span className="ml-2">Can Reschedule</span><br/>
                  </Flex>
                </Menu.Item>:<Menu.Item
                disabled
                  // onClick={() =>
                  //   handleChange(
                  //     row.id,
                  //     "dressReservation",
                  //     'REFUSED',   
                  //     refetch
                  //   )
                  // }
                >
                  <Flex alignItems="center">
                    <Badge status="success" />
                      <span className="ml-2">Can Reschedule</span><br/>
                  </Flex>
                </Menu.Item>}
                  </>
                 : 
                 <>
                <Menu.Item  
                disabled
                  onClick={() =>
                    handleChange(
                      row.id,
                      `${service_For_Status}`,
                      row.next_statues.type,   
refetch                    )
                  }
                >
                  <Flex alignItems="center">
                    <Badge status="error" />
                      <span className="ml-2">Refused By Client</span><br/>
                  </Flex>
                </Menu.Item>
        
        
               
                 <Menu.Item
                 disabled={true}
                  onClick={() =>
                    handleChange(
                      row.id,
                      `${service_For_Status}`,
                      row.next_statues.type,   
refetch                    )
                  }
                >
                  <Flex alignItems="center"  >
                    <Badge status="error"  />
                      <span   className="ml-2">Refused By Seller</span><br/>
                  </Flex>
                </Menu.Item>
                {/* /Can Renew/ */}
                {row.can_renew == true?
                <Menu.Item
                  
                >
                  <Flex alignItems="center">
                    <Badge status="success" />
                      <span className="ml-2">Can Renew</span><br/>
                  </Flex>
                </Menu.Item>:
                <Menu.Item
                 disabled={true}
                 
                >
                  <Flex alignItems="center">
                    <Badge status="success" />
                      <span className="ml-2">Can Renew</span><br/>
                  </Flex>
                </Menu.Item>}
               {/* /can_replace/ */}
               {row.can_replace== true?<Menu.Item
                 
                >
                  <Flex alignItems="center">
                    <Badge status="success" />
                      <span className="ml-2">Can Replace</span><br/>
                  </Flex>
                </Menu.Item>:<Menu.Item
                disabled
                 
                >
                  <Flex alignItems="center">
                    <Badge status="success" />
                      <span className="ml-2">Can Replace</span><br/>
                  </Flex>
                </Menu.Item>}
                  
                  {/* /can_replace/ */}
               {row.can_reschedule== true?<Menu.Item
                 
                >
                  <Flex alignItems="center">
                    <Badge status="success" />
                      <span className="ml-2">Can Reschedule</span><br/>
                  </Flex>
                </Menu.Item>:<Menu.Item
                disabled
                 
                >
                  <Flex alignItems="center">
                    <Badge status="success" />
                      <span className="ml-2">Can Reschedule</span><br/>
                  </Flex>
                </Menu.Item>}
                 </>
                 }
                  
                 
          
              
              </Menu>
            );
          }
        
          const handleOk =async () => {
              const Post={
                service_id:key,
                reservation_id:ProductId.value,
                comment:Comment.data
              }
              console.log("my post=>",Post)
            try {
                const data = await service.post(`web/addComment/reservation`,Post).then(res=>{
                    console.log(res)
                    openNotificationWithIcon("success");

                });
                console.log("msmdmasdmasd",data.data)
                // setStoreList(data.data);
                // setendPOINT("cars/readReservation")
            } catch (error) {
                <h2>{error}</h2>;
            }
            setIsModalVisible(false);
          };
        
          const handleCancel = () => {
            setIsModalVisible(false);
          };
      
        
    
        const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: "Client Name",
            dataIndex: "client_name",
            key: "client_name",
            render: (id) => `${id}`,
            sorter: (a, b) => a.client_name - b.client_name,
        },
        {
            title: "Dress Name",
            dataIndex: "product_name_en",
            key: "product_name_en",
            // sorter: (a, b) => a.store_name.length - b.store_name.length,
            render: (name, obj) => (
            <a
                onClick={() =>
                history.push(
                    `/app/apps/dresses/editProduct?name=view&id=${obj.product_id}`
                )
                }
            >
                {name}
            </a>
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
                    `/app/apps/dresses/editDressStore?name=view&id=${obj.store_id}`
                )
                }
            >
                {name}
            </a>
            ),
        },
     
    
        {
            title: "Status",
            dataIndex: "status_id",
            render: (_, record) => (
            <>
                <Badge status={getPaymentStatus(record.status_type)} />
                <span>
                {record.status_type
                    .split("")
                    .map((element, index) => {
                    if (index > 0) {
                        return element.toLowerCase();
                    } else {
                        return element;
                    }
                    })
                    .join("")}
                </span>
                {record.status_type === "REFUSED" && (
                <>
                    <span style={{ marginLeft: 5, marginRight: 5 }}>By</span>
                    <span>
                    {record.action_by
                        .split("")
                        .map((element, index) => {
                        if (index > 0) {
                            return element.toLowerCase();
                        } else {
                            return element;
                        }
                        })
                        .join("")}
                    </span>
                </>
                )}
            </>
            ),
            sorter: (a, b) => utils.antdTableSorter(a, b, "status_id"),
        },
        {
            title: "Total Price",
            dataIndex: "total_price",
            key: "total_price",
            render: (price) => `${price} EGP`,
            sorter: (a, b) => a.total_price - b.total_price,
        },
        {
            title: "CommentS",
            style:{ textAlign: "center"},
           
            render: (_,obj) => <Button onClick={()=>Show_Modal_cooment(obj)}>Add Comment</Button>
        },
        {
            title: "",
            dataIndex: "actions",
            render: (_, elm) => 
            (
              <div className="text-right">
                <EllipsisDropdown menu={dropdowNMenu(elm)} />
              </div>
            ),
          },
        ];
        const  callback=async(key)=> {

    setkey(key)

        }
       
        return (
        <>
        <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Cars" key="1">
        {/* <Input value={staet} onChange={e=>setstaet(e.target.value)}/> */}
        <Cars/>

        </TabPane>
        <TabPane tab="Hotels" key="2" value="sdbasbdb">
<Hotel/>
        </TabPane>
        <TabPane tab="Doctors" key="3">
<Doctors/>
        </TabPane>
        <TabPane tab="Beauty Center" key="4">
<BeautyCenter/>
        </TabPane>
        <TabPane tab="Photographer" key="5">
        <Photograph/>
        </TabPane>
        <TabPane tab="Trips" key="6">
<Trips/>
        </TabPane>
        <TabPane tab="Dresses" key="7">
 <Dress/>
        </TabPane>
        <TabPane tab="MakeUp" key="8">

{/* <div style={{display: "flex",
    justifyContent: "center",
    marginBottom: "20px"}}>
        <Form.Item
          name="phone"
          label="Search by Order ID:"
          onPressEnter={(e) => e.preventDefault()}
          hasFeedback
          
        >
          <Input
            onChange={(e) => {
              setstaet(  e.target.value );
            }}
            onPressEnter={(e) => e.preventDefault()}
            value={staet}
            placeholder="Search by Order ID"
            style={{ width: "100%" }}
          />
        </Form.Item>
         </div>             */}
         <MakeUp/>
        </TabPane>
    </Tabs>
          
            <Modal title="Comments" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Tabs defaultActiveKey="1"  >
            <TabPane tab="Add Comments" key="1">
              <Card >
        <Form.Item
        name="Comment"
        // label="Comment"
        // rules={rules.capacity}
         
      >
             

        <Input.TextArea
        placeholder="Enter your comment"
           onPressEnter={(e) => e.preventDefault()}
          onChange={(e) =>{setComment({ data: e.target.value })}}
        />
      </Form.Item>
      </Card>
            </TabPane>
            <TabPane tab="List Of Comments" key="2">
            {Allcomments.map((comments,index)=>{
            //     return <div ><Form.Item
            //     name="Comment"
            //     // label="Comment"
            //     // rules={rules.capacity}
                 
            //   >
                     
        
            //     <Input.TextArea key={index}
            //     disabled
            //     defaultValue={comments.comment}
            //     placeholder="Enter your comment"
            //        onPressEnter={(e) => e.preventDefault()}
            //     //   onChange={(e) =>{setComment({ data: e.target.value })}}
            //     // value={comments.admin_id}
            //     // disabled
            //     />
            //   </Form.Item></div>
            return <Card key={index} title={comments.admin.email}></Card>
            })}
            </TabPane>
           </Tabs>
         
      </Modal>
        </>
        );
    };
    
    
    export default Reservations;
    