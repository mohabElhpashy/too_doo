import { Card, Form, Input, Row, Select, Upload,Modal,
  DatePicker,Col,Table} from "antd";
import React, { useState } from "react";
import { languageValidator, numberValidator } from "constants/helperFunctions";
import moment from "moment";
import { DATE_FORMAT_YYYY_MM_DDTHH_mm_ssZ } from "constants/DateConstant";
import { ImageSvg } from "assets/svg/icon";
import { DeleteOutlined, LoadingOutlined,MinusCircleOutlined } from "@ant-design/icons";
import CustomIcon from "components/util-components/CustomIcon";
import service from "auth/FetchInterceptor";



import {
  ARABIC_alpha,
  ENGLISH_ALPH,
  NUMBER_CONSTANTS,
} from "constants/LanguagesConstent";
import { lowerCase } from "lodash";
const { Dragger } = Upload;
const col = (service_id, setSingleImage) => {
  console.log("service id ",service_id)
  return[
  {
    title: "ID",
    
    key: "id",
    render: (_, obj) => `# ${obj.variation_id ? obj.variation_id : obj.id}`,
  },
  {
    title: "product_name",
    dataIndex: "product_name",
    key: "product_name",
    // sorter: (a, b) => a.product_name.length - b.product_name.length,
  },

  
  // {
  //   title: "product_name_en ",
  //   dataIndex: "product_name_en",
  //   key: "product_name_en",
   
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
    render: (price) =>  price,
  },
  // {
  //   title: "Store_Name",
  //   dataIndex: "store_name_en",
  //   key: "store_name_en",
  //   render: (store_name_en) => `${store_name_en}`,
  // },
  // {
  //   title: "New Price",
  //   dataIndex: "new_price",
  //   key: "new_price",
  //   render: (new_price) => `${new_price} EGP`,
  // },
  // {
  //   title: "Total Capacity",
  //   dataIndex: "total_capacity",
  //   key: "total_capacity",
  // },
  // {
  //   title: "Price",
  //   dataIndex: "price",
  //   key: "price",
  //   render: (price) => `${price} EGP`,
  // },
]; }
const ListOfProducts = ({
  name,
  col,
  data,
  setPostObject,
  postObject,
  setCurrentPrice,
  setPRODUCT,
  setALL_Products,
  setDetails,
  listofStores ,
  Products_Details,
  setProducts_Details,

  PRODUCT
}) => {
  const [singleImage, setSingleImage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [Product_details,setProduct_details]=useState({total_capacity:"",discount:"",product_id:"",variation_id:"",available_from:"",available_to:""});
  const [oldprice,setoldprice]=useState({value:""});
  

  const handlech = (index) => {
    console.log("indexxxxxxx",index)
    var values = [...Products_Details];
    var name= values.find(x => x.product_id === index.id)

    console.log("first",name)
    if(name==null){
      values.push({
        id_: Math.floor(Math.random() * 10000),
        total_capacity:"", 
        discount:"", 
        product_id:index.id,
        variation_id:index.variation_id,
        available_from:"2022-03-27 15:03:21+02",
        available_to:"2022-03-27 15:03:21+02",
        product_name:index.product_name,
        price:index.price,
        // PRO_ID:index.id
      
       })
       setProducts_Details(values) ;}
       else{
        var x=values.filter(x => x.product_id  !==  index.id)
        values=x
        setProducts_Details(values);
       }
    // if (filteredArray.length !== Inner_products.length) {//check if arr clicked before then
    //   Inner_products = filteredArray
    //   Inner_products.pop(data.product_id)
    //     // console.log("hbashy", listofProduct)

    //     return;
    // } 
   
    // console.log("hbashy", ar)
  }
   console.log("postObject",postObject.id)
   const showModal = (index) => {
    // console.log("from Modal",index)
    setoldprice({...oldprice,value:index})
    // setProduct_details({total_capacity:"",discount:"",product_id:"",variation_id:"",available_from:"",available_to:""})
    setIsModalVisible(true);
  };
  const handleOk = () => {
    // listofProduct.push(Product_details)
    // setALL_Products(listofProduct)
    // console.log("alllLISTT",listofProduct)

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Table
        // title={() => (
        //   <Search
        //     setCurrentList={setCurrentList}
        //     prevousState={data}
        //     url={''}
        //   />
        // )}
        rowSelection={{
          type: "checkbox",
          onSelect:(index,data)=>handlech(index)
            
          ,
        
          getCheckboxProps: (record) => ({
            onClick: (t) => alert(record.id),
          }),
        }}
        columns={col(postObject?.service_id, setSingleImage)}
        dataSource={data}
        rowKey={(item) => (item.variation_id ? item.variation_id : item.id)}
      />
     <Modal title="Product Details" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
{/* <input value={discount} onChange={(e)=>setdiscount(e.target.value)}/>
        <p>Some contents...</p> */}
         <Card 
        //  key={index} id={index}
         >
          {/* <h3>{product.product_name}{`(${product.variation_id })`}</h3> */}
        <Form.Item
          style={{
            display: "inline-block",
            width: "calc(50% - 5px)",
            marginRight: 8,
            
          }}
          
          name="currentPrice"
          label="Old Price"
        >
          <div key={oldprice.value}>
            <Input
              disabled={true} 
              addonAfter="EGP"
              className="w-100"
defaultValue={oldprice.value}     
value={oldprice.value}       />
          </div>
        </Form.Item>
        <Form.Item
          required
          // defaultValue={operations.Discount}

          style={{
            display: "inline-block",
            width: "calc(50% - 5px)",
            
          }}
          name="discount"
          label="Discount"
          // rules={[
          //   ({ getFieldValue }) => ({
          //     validator(_, value) {
          //       if (numberValidator(value) === true) {
          //         if (parseInt(value) > 100 || parseInt(value) < 0) {
          //           props.setButtonChecker(true);

          //           return Promise.reject(
          //             "The Discount Cant be  Greater than 100 %"
          //           );
          //         } else {
          //           props.setButtonChecker(false);
          //           return Promise.resolve();
          //         }
          //       } else {
          //         props.setButtonChecker(true);
          //         return Promise.reject(
          //           "Please enter a the Correct Format of a Number"
          //         );
          //       }
          //     },
          //   }),
          // ]}
          // rules={rules.discount}
        >
                        {/* <div key={currentPrice  }> */}

          <Input
            name="discount"
            placeholder="Enter the Discount"
            addonAfter="%"
            onPressEnter={(e) => e.preventDefault()}
            
            onChange={(e) =>{
              setProduct_details({ ...Product_details, discount: e.target.value })
              // console.log("dasdasdsad",Pricing.id) 
            }
}
              
            className="w-100"
          />
          {/* </div> */}
        </Form.Item>

        <Form.Item
        name="total capacity"
        label="total capacity"
        // rules={rules.capacity}
        // defaultValue={operations.total_capacity}
      >
               {/* <div key={currentPrice}> */}

        <Input
          // onChange={(e) =>
          //   setOperation({ ...operations, total_capacity: e.target.value })
          // }
          placeholder="total capacity
          "
          onPressEnter={(e) => e.preventDefault()}
          onChange={(e) =>{
            setProduct_details({ ...Product_details, total_capacity: e.target.value })
          }
            
          }
        />
        {/* </div> */}
      </Form.Item>
      <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
            name="Start Date"
            label="Start Date"
            // rules={rules.price}
            required
          >
                                                <div key={oldprice.value}>

            <DatePicker
              showTime
              className="w-100"
              placeholder="Select Time"
              onOk={(e) =>
                setProduct_details({
                  ...Product_details,
                  available_from: e._d.toISOString('yyyy-MM-dd'),
                })
              }
            />
            </div>
          </Form.Item>

          <Form.Item
            style={{ display: "inline-block", width: "calc(50% - 5px)" }}
            name="end_date"
            label="End Date"
            required
            // rules={rules.comparePrice}
            
          >
                                                <div key={oldprice.value}>

            <DatePicker
              showTime
              placeholder="Select Time"
              className="w-100"
              onOk={(e) =>
                setProduct_details({
                  ...Product_details,
                  available_to: e._d.toISOString('yyyy-MM-dd'), 
                })
              }
            />
            </div>
          </Form.Item>
     
      </Card>
      </Modal>
      
    </>
  );
};

const GeneralField = ({
  postObject,
  setPostObject,
  checkViewMode,
  MyProducts,
  setMyProducts,
  VAR_PRODUCTS,
  setButtonChecker,
  category,
  Var,setvar,
  Products_Details,
  setProducts_Details
}) => {
  const [feildChecker, setFieldChecker] = useState({
    number: true,
    subject_ar: true,
    subject_en: true,
    body_ar: true,
    body_en: true,
    capacity:null
  });
  const [Products, setProducts] = useState([]);
const[Details,setDetails]=useState({
  Old_Price:"",
  Discount:"",
  total_capacity:"",
  Start_Date:"",
  End_Date:""
 })
 const dateFormat = 'YYYY/MM/DD';


  const [listofStores, setStoreList] = useState([]);

  console.log("service list =>>>>>",Products_Details)
  const getStores=async(e)=>{
    setPostObject({ ...postObject, service_id: e });
    try {
        const data = await service.get(`web/stores/${e}`);
        setStoreList(data.data);
      } catch (error) {
        <h2>{error}</h2>;
     }
  }
  const handleChange_Variations_Package = (event,Main_Index) => {
    // console.log("indexpack",indexpack)

    const values = [...Products_Details];
    console.log("test",event.target.name,Main_Index)
    values[Main_Index][event.target.name] = event.target.value;
    setProducts_Details(values);
  };
  const handleChange_available_to = ( event,index) => {
    console.log("event",event)
    const values = [...Products_Details];
    values[index]["available_to"] = moment(event).format("YYYY-MM-DD");
    setProducts_Details(values);
  };
  const handleChange_available_From = ( event,index) => {
    console.log("event",event)
    const values = [...Products_Details];
    values[index]["available_from"] = moment(event).format("YYYY-MM-DD");
    setProducts_Details(values);
  };
  const sellerSelection = async (e) => {
    // setPostObject({ ...postObject, store_id: e });
    // console.log("store____id",postObject.service_id,e)
    try {
      const data = await service.get(
        `web/products/${postObject.service_id}/${e}`
      ).then(res=>{
        console.log("response",res.data)
        setMyProducts(res.data)});
      // console.log(data.data)
    } catch (error) {
      <h2>{error}</h2>;
    }
  };
  const removeVariations = ( id) => {
    var values = [...Products_Details];
  
    var x=values.filter(x => x.id_  !==  id)
          values=x
          setProducts_Details(values);
    
  };
  return (
    <>
    <Row xs={24} sm={24} md={17}>
    <Col xs={24} sm={24} md={17}>
    <Card title="Basic Info" className="w-100">
        <Form.Item
          name="subject_ar"
          label="Subject in Arabic:"
          hasFeedback
          required
          onPressEnter={(e) => e.preventDefault()}
          // rules={[
          //   feildChecker.subject_ar
          //     ? []
          //     : ({ getFieldValue }) => ({
          //         validator(_, value) {
          //           const checkValidation = languageValidator(
          //             value,
          //             ARABIC_alpha
          //           );
          //           if (checkValidation) {
          //             setButtonChecker(true);
          //             return Promise.resolve();
          //           } else {
          //             setButtonChecker(false);
          //             return Promise.reject(
          //               "Please enter The Subject in Arabic"
          //             );
          //           }
          //         },
          //       }),
          // ]}
          style={{
            display: "inline-block",
            width: "calc(50% - 5px)",
            marginRight: 8,
          }}
        >
          <Input
            placeholder="Please enter the Subject in Arabic"
            defaultValue={postObject?.name_ar}
            disabled={checkViewMode}
            onChange={(e) => {
              setPostObject({ ...postObject, name_ar: e.target.value });
              setFieldChecker({ ...feildChecker, subject_ar: false });
            }}
            onPressEnter={(e) => e.preventDefault()}
          />
        </Form.Item>
        <Form.Item
          hasFeedback
          name="subject_en"
          label="Subject in English:"
          required
          // rules={[
          //   feildChecker.subject_en
          //     ? []
          //     : ({ getFieldValue }) => ({
          //         validator(_, value) {
          //           const checkValidation = languageValidator(
          //             lowerCase(value),
          //             ENGLISH_ALPH
          //           );
          //           if (checkValidation) {
          //             setButtonChecker(true);
          //             return Promise.resolve();
          //           } else {
          //             setButtonChecker(false);
          //             return Promise.reject(
          //               "Please enter The Subject in English"
          //             );
          //           }
          //         },
          //       }),
          // ]}
          style={{ display: "inline-block", width: "calc(50% - 5px)" }}
        >
          <Input
            onPressEnter={(e) => e.preventDefault()}
            disabled={checkViewMode}
            defaultValue={postObject?.name_en}
            onChange={(e) => {
              setPostObject({ ...postObject, name_en: e.target.value });
              setFieldChecker({ ...feildChecker, subject_en: false });
            }}
            placeholder="Please enter the Subject in English"
          />
        </Form.Item>

        <Form.Item required name="service_id" label="Service Name:">
          <Select
            onPressEnter={(e) => e.preventDefault()}
            showSearch
            placeholder="Select a Service Name"
            // onChange={(e) =>
            //   setOperation({ ...operations, service_id: e })
            // }
            onSelect={(e) => getStores(e)}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
            defaultValue={postObject.service_name}
            rows={4}
            disabled={checkViewMode}


          >
            {category?.map((element, index) => (
              <Select.Option key={element.id} value={element.value}>
                {element.type}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item required name="Store Name" label="Store Name:">
          <Select
            onPressEnter={(e) => e.preventDefault()}
            showSearch
            placeholder="Select a Store Name"
            // onChange={(e) =>
            //   setOperation({ ...operations, service_id: e })
            // }
            // onSelect={(e) => {
            //   sellerSelection(e);
            // }}
            onSelect={(e) => sellerSelection(e)}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
            rows={4}
            disabled={checkViewMode}
            defaultValue={"_____________________"}


          >
            {listofStores?.map((element, index) => (
              <Select.Option key={element.id} value={element.value}>
                {element.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
         <Form.Item required name="offer_date" label="Offer Period">
            <DatePicker.RangePicker
              className="w-100"
              showTime
              disabled={checkViewMode}
              defaultValue={[
                moment(
                  postObject?.end_date,
                  DATE_FORMAT_YYYY_MM_DDTHH_mm_ssZ
                ),
                moment(
                  postObject?.start_date,
                  DATE_FORMAT_YYYY_MM_DDTHH_mm_ssZ
                ),
              ]}
              onOk={(event) => {
                const offerFrom = moment(event[0]).format(
                  DATE_FORMAT_YYYY_MM_DDTHH_mm_ssZ
                );
                const offerTo = moment(event[1]).format(
                  DATE_FORMAT_YYYY_MM_DDTHH_mm_ssZ
                );
                setPostObject({
                  ...postObject,
                  offer_to: postObject.end_date,
                  offer_from: postObject.start_date,
                });
              }}
            />
          </Form.Item>
      </Card>
    </Col>
     
      <Col xs={24} sm={24} md={7}>
        <Card title="Product Image" style={{ marginLeft: 15 }}>
          <Form.Item required label="Main Image">
            <Dragger
              showUploadList={false}
              name="main_image"
              // customRequest={(options) => uploadHandler(options, "main_image")}
              disabled={checkViewMode}
            >
              {postObject?.main_image ? (
                <img
                  src={postObject?.main_image}
                  alt="avatar"
                  className="img-fluid"
                  style={{ maxHeight: 200 }}
                />
              ) : (
                <div>
                  {postObject.main_image ? (
                    <div>
                      <LoadingOutlined className="font-size-xxl text-primary" />
                      <div className="mt-3">Uploading</div>
                    </div>
                  ) : (
                    <div>
                      <CustomIcon className="display-3" svg={ImageSvg} />
                      <p>Clic k or drag file to upload</p>
                    </div>
                  )}
                </div>
              )}
            </Dragger>
          </Form.Item>
        </Card>
      </Col>
      
     

    </Row>
    
    <Row gutter={12}>
              <Col xs={24} sm={24} md={17} lg={17}>
              <Card title={"My Products"}>
          <ListOfProducts
            col={col}
            setDetails={setDetails}
            postObject={postObject}
            data={MyProducts}
            Products_Details={Products_Details}
            setProducts_Details={setProducts_Details}
            
     
          />
        </Card>
      
      </Col>
       
      <Col xs={24} sm={24} md={7}>
        
        <Card title={"My Products Details"}
    //  key={index} id={index}
     >
       <div style={{height:"300px",overflowY:"scroll"}}>
       {Products_Details!=0?
       Products_Details.map((data,Main_Index)=>(
         <div key={data.id_}style={{borderBottom:"1px solid gainsboro",marginBottom:"3px"}}>
           {/* <h4 style={{ textDecoration: "underline"}}>{data.product_name}</h4> */}
           <div
                    style={{
                      display: "flex",
                      flex: 1,
                      width: "100%",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      padding: "18px"

                    }}
                  >
                          <h4 style={{ textDecoration: "underline"}}>{data.product_name} </h4>

                    {checkViewMode?null:<MinusCircleOutlined
                      className="mt-md-4 pt-md-3 "
                      onClick={(e) => {
                        removeVariations(data.id_);
                      }}
                    />}
                  </div>
          <Form.Item
      style={{
        display: "inline-block",
        width: "calc(50% - 5px)",
        marginRight: 8,
        
      }}
      
      name="currentPrice"
      label="Old Price"
    >
      <div 
      // key={oldprice.value}
      >
        <Input
          disabled={true} 
          defaultValue={data.price}
          addonAfter="EGP"
          className="w-100"
          
// defaultValue={Details.Old_Price}     
// value={Details.Old_Price}   
/>
      </div>
    </Form.Item>
    <Form.Item
      required
      // defaultValue={operations.Discount}

      style={{
        display: "inline-block",
        width: "calc(50% - 5px)",
        
      }}
      name="discount"
      label="Discount"
      // rules={[
      //   ({ getFieldValue }) => ({
      //     validator(_, value) {
      //       if (numberValidator(value) === true) {
      //         if (parseInt(value) > 100 || parseInt(value) < 0) {
      //           props.setButtonChecker(true);

      //           return Promise.reject(
      //             "The Discount Cant be  Greater than 100 %"
      //           );
      //         } else {
      //           props.setButtonChecker(false);
      //           return Promise.resolve();
      //         }
      //       } else {
      //         props.setButtonChecker(true);
      //         return Promise.reject(
      //           "Please enter a the Correct Format of a Number"
      //         );
      //       }
      //     },
      //   }),
      // ]}
      // rules={rules.discount}
    >
                    <div key={data.id_  }>

      <Input
        name="discount"
        placeholder="Enter the Discount"
        defaultValue={data.discount}     
        disabled={checkViewMode}

        // defaultValue={Details.Discount}
        addonAfter="%"
        onPressEnter={(e) => e.preventDefault()}
        onChange={(event) =>handleChange_Variations_Package(event,Main_Index) }

        
        // onChange={(event) =>handleChange_Variations_Package(event,Main_Index) }
          
        className="w-100"
      />
      </div>
    </Form.Item>

    <Form.Item
    name="total capacity"
    label="total capacity"
    // rules={rules.capacity}
    // defaultValue={operations.total_capacity}
  >
           <div key={data.id_ }>

    <Input
            name="total_capacity"

      // onChange={(e) =>
      //   setOperation({ ...operations, total_capacity: e.target.value })
      // }
      disabled={checkViewMode}

      defaultValue={data.total_capacity}

      placeholder="total capacity"
      // onChange={(event) =>handleChange_Variations_Package(event,Main_Index) }
      onChange={(event) =>handleChange_Variations_Package(event,Main_Index) }

      onPressEnter={(e) => e.preventDefault()}
      // onChange={(e) =>{
      //   setProduct_details({ ...Product_details, total_capacity: e.target.value })
      // }
        
      // }
    />
    </div>
  </Form.Item>
  <Form.Item
        style={{
          display: "inline-block",
          width: "calc(50% - 5px)",
          marginRight: 8,
        }}
        name="Start Date"
        label="Start Date"
        // rules={rules.price}
        required
      >
                                            <div
                                            //  key={oldprice.value}
                                             >

        <DatePicker
                    disabled={checkViewMode}

          showTime
          className="w-100"
          placeholder="Select Time"
          defaultValue={moment(data.available_from, dateFormat)} 
          onOk={(e) =>handleChange_available_From(e,Main_Index)}
        />
        </div>
      </Form.Item>

      <Form.Item
        style={{ display: "inline-block", width: "calc(50% - 5px)" }}
        name="end_date"
        label="End Date"
        required
        // rules={rules.comparePrice}
        
      >
                                            <div 
                                            // key={oldprice.value}
                                            >

        <DatePicker
          defaultValue={moment(data.available_to, dateFormat)} 
          disabled={checkViewMode}

          showTime
          placeholder="Select Time"
          className="w-100"
          onOk={(e) =>handleChange_available_to(e,Main_Index)}
        />
        </div>
      </Form.Item>
         </div>
       )):<h3 style={{ textDecoration: "underline"}}>No Products Selected</h3>}
       </div>
       
      {/* <h3>{product.product_name}{`(${product.variation_id })`}</h3> */}
   
 
  </Card>
      </Col>
      
    
     
      
          
            </Row>
    

    
    </>
    
  );
};

export default GeneralField;
