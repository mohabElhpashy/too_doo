import React, { useEffect, useState } from "react";
 import CustomTable from "../Components/Custome_table_for_perm";
import CustomTable_WithoutPagin from "../Components/CustomTable";

import {   Tag, message, Upload, Modal, Badge,Comment,Input,Form, Button,Col,Card,Select } from "antd";
 import service from "auth/FetchInterceptor";
import { useHistory } from "react-router";
const Dresses = () => {
   const [Weddinghall,setWeddinghall]=useState([])
  const [from,setfrom]=useState("")
  const [to,setto]=useState("")
  const [singleImage, setSingleImage] = useState("");
  
  const [currentList, setCurrentList] = useState([]);
  const [totalPages, settotalPages] = useState(1);
const[CurrentList_without,setCurrentList_without]=useState([])
  const [loadingg, setloadingg] = useState(false);
   const [loading, setLoading] = useState(false);
  //  price
   const [openPrice,setopenPrice]= useState(false)
  const [price_range,setprice_range]=useState({price_from:"",price_to:""})
// variation
const [openvariation,setopenvariation]= useState(false)
const VARiations=[{name:'sell'},{name:'rent'}]
  const [variation,setpvariation]=useState({variation:""})
  const history = useHistory();
  const changeStatus = async (record) => {
    setLoading(true);
    const key = "updatable!";
    message.loading({ content: "Loading...", key, duration: 15 });

    try {
      await service.post(`/web/dress/changeStatus/${record.id}`);
      message.success({ content: "Done!", key, duration: 2 });

      // refetch();
      setLoading(false);
    } catch (error) {
      message.error({ content: "Error Occured!", key, duration: 2 });
      setLoading(false);
    }
  };
  const { Option } = Select;


  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "name_en",
      key: "name_en",
      sorter: (a, b) => a.name_en.length - b.name_en.length,
    },

    // {
    //   title: "Description ",
    //   dataIndex: "description_en",
    //   key: "description_en",
    //   render: (text) => {
    //     return trncate(text, 40);
    //   },
    //   sorter: (a, b) => a.description_en.length - b.description_en.length,
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
              `/app/apps/dresses/editDressStore?name=view&id=${obj.store_id}`
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

    // {
    //   title: "Rating",
    //   dataIndex: "rating",
    //   key: "rating",
    //   render: (rate) => (
    //     <Rate
    //       allowHalf
    //       disabled
    //       style={{ width: 150 }}
    //       defaultValue={parseFloat(rate)}
    //     />
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
    setloadingg(true)
    console.log("page",page)
    if(page==undefined)
    {
      const Records= await service.get(`/web/beautyCenterServices?itemsPerPage=10&page=${1}`).then(respose=>{
        setCurrentList(respose.records)
        settotalPages(respose.paginationInfo.totalRecords)
        setloadingg(false)
      }) ;
    }
    else{
      try {

        const Records= await service.get(`/web/beautyCenterServices?itemsPerPage=10&page=${page}`).then(respose=>{
          setCurrentList(respose.records)
          settotalPages(respose.paginationInfo.totalRecords)
          setloadingg(false)
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
  // price
  const openSearch_per_price=()=>{
    setopenPrice(true)}
  const closeSearch_per_price=()=>{
    setopenPrice(false)}
    // variations
    const openSearch_per_variations=()=>{
      setopenvariation(true)}
    const closeSearch_per_variations=()=>{
      setopenvariation(false)}
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

    setCurrentList_without()
      const Post=await service.get(`web/dress/searchPrice?priceFrom=${price_range.price_from}&priceTo=${price_range.price_to}`).then(
        res=>{
          console.log("my response with in",res.records)
           setCurrentList_without(res.records)
          
           closeSearch_per_price()}
      )
  }
  const Fetch_all_Variations=async()=>{
    console.log("my response before",Weddinghall)

    setCurrentList_without()
      const Post=await service.get(`web/dress/searchPrice?variation=${variation.variation}`).then(
        res=>{
          console.log("my response with in",res.records)
           setCurrentList_without(res.records)
           closeSearch_per_variations()
          
          }
      )
  }
 const reset=()=>{
   setfrom('');
   setto('')
   setCurrentList_without('')
   setprice_range({price_from:''})
   setpvariation({variation:''})
 }
  return (
    <>
    <div style={{display:"flex",justifyContent:'center',    alignItems: 'baseline'}}>
    {/* <Checkbox onChange={(e)=>onChange_Checked_capacity(e)}>Use Variation Search </Checkbox>

     <span style={{fontWeight: 800}}>serach By Price</span>
               <Form.Item><Input value={from} onChange={e=>setfrom(e.target.value)}/></Form.Item>

               <Form.Item><Input value={to}  onChange={e=>setto(e.target.value)}/></Form.Item>
               <Button onClick={Fetch_all_record}>Serach</Button>
               <Button onClick={reset}>Reset</Button>
 */}
 <div style={{display:'flex',justifyContent:"space-around",width: '25%'}}>
               {/* <Button onClick={SerachonMap_open} type="primary" >Serach On Map</Button>
               <Button onClick={openSearch_per_period} type="primary" >Search Per Period</Button> */}
               <Button 
               onClick={openSearch_per_price}
                type="primary" >Search BY Price</Button>
               <Button 
          onClick={openSearch_per_variations}     
          type="primary" >Search BY Variations</Button>

               <Button onClick={reset} >RESET</Button>



               </div>

    </div>
      {/* <CustomTable
        pageTitle="Dresses List"
        dataRender={Weddinghall}
        coloumRender={columns}
        isLoading={isLoading}
        refetch={refetch}
        endPoint={"dress"}
        editEndPoint="dresses/editProduct"
        addEndPoint={"dresses/AddDress"}
      /> */}
      {price_range.price_from==""&&variation.variation==""?
          <CustomTable
          loading={loading}
           Fetch_record={(page)=>Fetch_record(page)}
          totalPages={totalPages}
          pageTitle="Dresses List"
          dataRender={currentList}
          coloumRender={columns}
          // isLoading={isLoading}
          // refetch={refetch}
          endPoint={"dress"}
          editEndPoint="dresses/editProduct"
          addEndPoint={"dresses/AddDress"}
        />:  <CustomTable_WithoutPagin
        // loading={loading}
        //  Fetch_record={(page)=>Fetch_record(page)}
        totalPages={totalPages}
        pageTitle="Dresses List"
        dataRender={CurrentList_without}
        coloumRender={columns}
        // isLoading={isLoading}
        // refetch={refetch}
        endPoint={"dress"}
        editEndPoint="dresses/editProduct"
        addEndPoint={"dresses/AddDress"}
      />}
         
        
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
         {/* /price/ */}
    <Modal
        visible={openPrice}
        footer={null}
        onCancel={closeSearch_per_price}
       >
       <Col xs={24} sm={24} md={24}>
        <Card title="Search BY price">
        {/* <Checkbox onChange={(e)=>onChange_Checked_range(e)}>Use Price Range</Checkbox> */}
        {/* {changeg? */}
        <div style={{display:"flex",justifyContent:'center',    alignItems: 'baseline'}}>
                <Form.Item> <Input value={price_range.price_from} onChange={(e)=>setprice_range({...price_range,price_from:e.target.value})} placeholder="price_from"/></Form.Item>

               <Form.Item><Input value={price_range.price_to} onChange={(e)=>setprice_range({...price_range,price_to:e.target.value})} placeholder="price_to"/></Form.Item>
               <Button type="primary" onClick={Fetch_all_record}>Serach</Button>

               </div>


    {/* :<Form.Item>
          <Input placeholder="serach By price" onChange={(e)=>setPrice(e.target.value)}value={Price}/>
          </Form.Item>} */}
        
        
  
        </Card>
      
      </Col>
      </Modal>



           {/* /variations/ */}
    <Modal
        visible={openvariation}
        footer={null}
        onCancel={closeSearch_per_variations}
       >
       <Col xs={24} sm={24} md={24}>
        <Card title="Search BY Variations">
        {/* <Checkbox onChange={(e)=>onChange_Checked_range(e)}>Use Price Range</Checkbox> */}
        {/* {changeg? */}
        <div style={{display:"flex",justifyContent:'center',    alignItems: 'baseline'}}>
        <Col xs={24} sm={24} md={17}>

        <Form.Item
            name="dress_store_id"
            required
           >
            <Select
              showSearch
              name="Variations"
              placeholder="Select a Variations"
              // onSelect={(e)=>handel_Select(e)}
              style={{width:"100%"}}
              optionFilterProp="children"
               onChange={(e) =>
                 setpvariation({variation:e})
              }
               filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {VARiations?.map((element, index) => (
                <Option key={index} value={element.name}>
                  {element?.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
</Col>
<Button type="primary" onClick={Fetch_all_Variations}>Serach</Button>

               </div>


    {/* :<Form.Item>
          <Input placeholder="serach By price" onChange={(e)=>setPrice(e.target.value)}value={Price}/>
          </Form.Item>} */}
        
        
  
        </Card>
      
      </Col>
      </Modal>
    </>
  );
};

export default Dresses;
