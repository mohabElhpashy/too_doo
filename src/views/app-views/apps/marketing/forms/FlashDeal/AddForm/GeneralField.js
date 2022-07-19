import { DeleteOutlined,MinusCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  Card,
Col,
DatePicker,
Form,
Input,
Modal,
Row,
Select,
Table,
Upload,
message,
Button
} from "antd";
import { ImageSvg } from "assets/svg/icon";
import service from "auth/FetchInterceptor";
import CustomIcon from "components/util-components/CustomIcon";
import { add, indexOf } from "lodash";
import React, { useEffect, useState } from "react";
import index from "views/app-views/apps/doctors";
import {
  ARABIC_alpha,
  ENGLISH_ALPH,
  NUMBER_CONSTANTS,
} from "constants/LanguagesConstent";
import { languageValidator, numberValidator } from "constants/helperFunctions";
import moment from "moment";


var Pricing=[]
var test={};
var new_array=[]
var ar=[]

const { Dragger } = Upload;
const { Option } = Select;
const main=[]
const listofProduct=[]
// console.log("main",main)
const col = (service_id, setSingleImage) => {
  // console.log("service id ",service_id)
  return[
  {
    title: "ID",
    
    key: "id",
    render: (_, obj) => `# ${obj.variation_id ? obj.variation_id : obj.id}`,
  },
  {
    title: "Name",
    dataIndex: "product_name",
    key: "product_name",
    // sorter: (a, b) => a.product_name.length - b.product_name.length,
  },

  service_id == 7
    ? {   
        title: "Purchase Type",
        key: "variation_type",
        render: (_, obj) => `${obj.variation_type}`,
      }
    : service_id == 1
    ? {
        title: "Number of Hours",
        key: "VariationType",
        render: (_, obj) => `${obj.variation_type} Hours`,
      }
    : service_id == 6
    ? {
        title: "Number of Days",
        key: "VariationType",
        render: (_, obj) => `${obj.variation_type} Days`,
      }
    : service_id == 2
    ? {
        title: "Varation Name",
        key: "VariationType",
        render: (_, obj) => `${obj.variation_type}`,
      }
    : {},
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
  },
  // {
  //   title: "Price",
  //   dataIndex: "price",
  //   key: "price",
  //   render: (price) => `${price} EGP`,
  // },
]; }
const rules = {
  name: [
    {
      required: true,
      message: "Please enter name",
    },
  ],
  description: [
    {
      required: true,
      message: "Please enter product description",
    },
  ],
  price: [
    {
      required: true,
      message: "Please enter product price",
    },
  ],
  ratio_discount:[
    {
      required: true,
      message: "Please enter ratio discount",
    }
  ],
  comparePrice: [],
  taxRate: [
    {
      required: true,
      message: "Please enter tax rate",
    },
  ],
  cost: [
    {
      required: true,
      message: "Please enter item cost",
    },
  ],
  capacity: [
    {
      required: true,
      message: "Please enter capacity",
    },
  ],
  discount: [
    {
      required: true,
      message: "Please enter discount",
    },
  ],
};

// const uploadTest = async(e)=>{
//   try {
//   const imgFile= e.fileList[0].originFileObj
//   const data = new FormData();
//   data.append(imgFile)
//   const urlPath = await service.get('http://dev.farahymall.com/api/admin/upload_media')

// } catch (error) {

// }

// }
const ListOfProducts = ({
  name,
  col,
  data,
  setPostObject,
  postObject,
  setCurrentPrice,
  setPRODUCT,
  setALL_Products,
  Inner_products ,
  setInner_products ,
  PRODUCT
}) => {
  const [singleImage, setSingleImage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [Product_details,setProduct_details]=useState([]);
  const [oldprice,setoldprice]=useState({value:""});

console.log("Product_details",Inner_products)
  const showModal = (index) => {
    // console.log("from Modal",index)
    setoldprice({...oldprice,value:index})
    // setProduct_details({total_capacity:"",discount:"",product_id:"",variation_id:"",available_from:"",available_to:""})
    setIsModalVisible(true);
  };
  const handleOk = () => {
    listofProduct.push(Product_details)
    setALL_Products(listofProduct)
    // console.log("alllLISTT",listofProduct)

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
 

  const handlech = (index) => {
    console.log("indexxxxxxx",index)
    var values = [...Inner_products];
    var name= values.find(x => x.product_id === index.id)

    // console.log("first",filteredArray)
    if(name==null){
      values.push({
        id_: Math.floor(Math.random() * 10000),
        total_capacity:"", 
        discount:"", 
        product_id:index.id,
        variation_id:index.variation_id,
        available_from:"",
        available_to:"",
        product_name:index.product_name,
        price:index.price,
        // PRO_ID:index.id
      
       })
       setInner_products(values) ;}
       else{
        var x=values.filter(x => x.product_id  !==  index.id)
        values=x
        setInner_products(values);
       }
    // if (filteredArray.length !== Inner_products.length) {//check if arr clicked before then
    //   Inner_products = filteredArray
    //   Inner_products.pop(data.product_id)
    //     // console.log("hbashy", listofProduct)

    //     return;
    // } 
   
    // console.log("hbashy", ar)
  }
  useEffect(()=>{
console.log("maaap",Product_details)
  },[Product_details])
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
      <Modal title="Product Details" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
{/* <input value={discount} onChange={(e)=>setdiscount(e.target.value)}/>
        <p>Some contents...</p> */}
         <Card key={index} id={index}>
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
          rules={rules.discount}
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
        rules={rules.capacity}
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
            rules={rules.comparePrice}
            
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
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const imageUploadProps = {
  name: "file",
  multiple: true,
  listType: "picture-card",
  showUploadList: false,

  // action:async(e)=>{
  //   const rag = {type:'Dress' , file:e}
  //   const data = new FormData();
  //   for (const key of Object.keys(rag)) {
  //     data.append(key, rag[key]);
  //   }

  // }
};

const GeneralField = ({
  category,
  setPostObject,
  postObject,
  setRequestedData,
  requestedData,
  inialOperations,
  setPackage,
  currentPackage,
  setOperation,
  operations,
  uploadLoading,
  uploadedImg,
  services,
  listofStores,
  productList,
  setProductList,
  setPRODUCT,

  PRODUCT,
  ALL_Products,
  setALL_Products,
  Inner_products,
                setInner_products

  

}) => {

  const [currentPrice, setCurrentPrice] = useState("0");
  const [Products, setProducts] = useState([]);

  const add=(index,product)=>{
try{ if(Pricing[index].id==product.id){
  const discount={discount:operations.Discount}
  const total_capacity={total_capacity:operations.total_capacity}
  const available_from={available_from:operations.available_from};
  const available_to={available_to:operations.available_to}
const x= {...Pricing[index],...discount,...total_capacity,...available_from,...available_to}
new_array.push(x)
setALL_Products(new_array)
message.success({
  content: `Product added`,
  duration: 2,
});
}}
catch{

}
   

    // console.log("INDEXXX",product)
// alert(id)
  }
  const handleChange_available_to = ( event,index) => {
    console.log("event",event)
    const values = [...Inner_products];
    values[index]["available_to"] = moment(event).format("YYYY-MM-DD");
    setInner_products(values);
  };
  const handleChange_available_From = ( event,index) => {
    console.log("event",event)
    const values = [...Inner_products];
    values[index]["available_from"] = moment(event).format("YYYY-MM-DD");
    setInner_products(values);
  };
 
  // console.log("yaaah",new_array)


// console.log("=>>0",Products)
  const sellerSelection = async (e) => {
    setPostObject({ ...postObject, store_id: e });
    try {
      const data = await service.get(
        `web/products/${postObject.service_id}/${e}`
      );
      setProducts(data.data);
      // console.log(data.data)
    } catch (error) {
      <h2>{error}</h2>;
    }
  };
  const handelSelection = async (endPoint, type, typeId, input) => {
    setOperation({ ...operations, [typeId]: input });
    try {
      const data = await service.get(`/web/${endPoint}`).then((res) => res);
      setRequestedData({ ...requestedData, [type]: [...data.data] });
    } catch (error) {}
  };
  //Handel Add To Package
  const handelAddToPackage = () => {
    setPackage([...currentPackage, operations]);
    setOperation({
      service_id: "",
      store_id: "",
      product_id: "",
      new_price: "",
      product_name: "",
      Discount:""
    });
  };
  const handleChange_Variations_Package = (event,Main_Index) => {
    // console.log("indexpack",indexpack)

    const values = [...Inner_products];
    console.log("test",event.target.name,Main_Index)
    values[Main_Index][event.target.name] = event.target.value;
    setInner_products(values);
  };
  
  // //Select Product
  // const handleProduct = (id, t) => {
  //   setCurrentPrice(
  //     requestedData?.product[
  //       requestedData.product?.findIndex((element) => element.id == id)
  //     ]?.price
  //   );
  //   setOperation({ ...operations, product_id: id, product_name: t.children });
  // };
//  console.log("discount=>>>",operations.Discount)
const removeVariations = ( id) => {
  var values = [...Inner_products];

  var x=values.filter(x => x.id_  !==  id)
        values=x
        setInner_products(values);
  
};
  return (
    <>
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Form.Item
            name="namr_en"
            label="English Name"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const checkValidation = languageValidator(
                    value.toLowerCase(),
                    ENGLISH_ALPH
                  );
                  if (checkValidation) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject("Please enter The Name in English");
                  }
                },
              }),
            ]}            defaultValue={operations.name_en}
            >
            <Input
              onChange={(e) =>
                setOperation({ ...operations, name_en: e.target.value })
              }
              placeholder="Name in English"
              // onPressEnter={(e) => e.preventDefault()}
            />
          </Form.Item>
          <Form.Item 
          name="namr_ar"
          label="Arabic Name" 
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                const checkValidation = languageValidator(
                  value.toLowerCase(),
                  ARABIC_alpha
                );
                if (checkValidation) {
                  return Promise.resolve();
                } else {
                  return Promise.reject("Please enter The Name in Arabic");
                }
              },
            }),
          ]}           defaultValue={operations.name_ar}>
            <Input
              placeholder="Name in Arabic "
              // onPressEnter={(e) => e.preventDefault()}
              onChange={(e) =>
                setOperation({ ...operations, name_ar: e.target.value })
              }
              rows={4}
            
            />
          </Form.Item>
          <Form.Item required name="service_id" label="Service Name:">
          <Select
            onPressEnter={(e) => e.preventDefault()}
            showSearch
            placeholder="Select a Service Name"
            onChange={(e) =>
              setOperation({ ...operations, service_id: e })
            }
            onSelect={(e) => setPostObject({ ...operations, service_id: e })}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
            rows={4}

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
            onChange={(e) =>
              setOperation({ ...operations, service_id: e })
            }
            onSelect={(e) => {
              sellerSelection(e);
            }}
            // onSelect={(e) => setPostObject({ ...postObject, service_id: e })}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
            rows={4}

          >
            {listofStores?.map((element, index) => (
              <Select.Option key={element.id} value={element.value}>
                {element.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      
        {/* <Form.Item name="Products" label="Products">
                <Select
                  showSearch
                  placeholder="Select a Products"
                  onSelect={(id) =>
                    handelSelection(`stores/${id}`, "store", "product_id", id)
                  }
                  optionFilterProp="children"
                  className="w-100"
                  onChange={(e) =>
                    setOperation({ ...operations, product_id: e })
                  }
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {Products?.map((element) => (
                    <Option key={element.id} >
                      {element.product_name_en}
                    </Option>
                  ))}
                </Select>
              </Form.Item> */}

            {/* 3035 */}
            {/* <Form.Item
        name="Discount"
        label="Discount"
        rules={rules.ratio_discount}
        defaultValue={operations.Discount}
      >
        <Input
          onChange={(e) =>
            setOperation({ ...operations, Discount: e.target.value })
          }
          placeholder="discount"
          onPressEnter={(e) => e.preventDefault()}
        />
      </Form.Item> */}
          
    

        
          
          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
            required

            name="Start Date"
            label="Start Date"
            // rules={rules.price}
            key={currentPrice}

          >
            <div key={currentPrice}>
            <DatePicker
              showTime
              className="w-100"
              placeholder="Select Time"
              onOk={(e) =>
                setPostObject({
                  ...postObject,
                  start_date: moment(e).format("YYYY-MM-DD")
                  // e._d.toISOString('yyyy-MM-dd'),
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
            rules={rules.comparePrice}
            key={currentPrice}
          >
                        <div key={currentPrice}>

            <DatePicker
              showTime
              placeholder="Select Time"
              className="w-100"
              onOk={(e) =>
                setPostObject({
                  ...postObject,
                  end_date: moment(e).format("YYYY-MM-DD"), 
                })
              }
            />
            </div>
          </Form.Item>
        
        </Card>

         
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Main Image" style={{ height: 365 }}>
          <Dragger
            {...imageUploadProps}
            beforeUpload={beforeUpload}
            customRequest={async (options) => {
              const key = "updatable";
              message.loading({ content: "Loading...", key, duration: 15 });

              const imageObject = { type: "FlashDeal", file: options.file };
              const data = new FormData();
              try {
                for (const key of Object.keys(imageObject)) {
                  data.append(key, imageObject[key]);
                }
                const test = await service.post("/upload_media", data);
                console.log("test",test)

                message.success({
                  content: ` Uploaded Successfully!`,
                  key,
                  duration: 2,
                });
                setPostObject({
                  ...postObject,
                  main_img: test.fileName,
                  file_url:test.file_url
                });
              } catch (error) {
                message.error({ content: `Error!`, key, duration: 2 });
              }
            }}
          >
            {postObject.file_url ? (
              <img
                src={postObject.file_url}
                alt="avatar"
                className="img-fluid"
              />
            ) : (
              <div>
                {uploadLoading ? (
                  <div>
                    <LoadingOutlined className="font-size-xxl text-primary" />
                    <div className="mt-3">Uploading</div>
                  </div>
                ) : (
                  <div>
                    <CustomIcon className="display-3" svg={ImageSvg} />
                    <p>Click or drag file to upload</p>
                  </div>
                )}
              </div>
            )}
          </Dragger>
        </Card>
        {/* <Card
          title="Package Summary"
          style={{
            maxHeight: 250,
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              height: 120,
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
            }}
          >
            {currentPackage.map((element, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    marginBottom: 10,
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      marginBottom: 10,
                      flex: 1,
                      fontWeight: "bold",
                    }}
                  >
                    <h5>{element.product_name}</h5>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      marginBottom: 10,
                      justifyContent: "center",
                      fontWeight: "500",
                      flex: 1,
                    }}
                  >
                    <h5>{element.new_price} EGP</h5>
                  </div>
                  <DeleteOutlined
                    className="cursor-pointer"
                    onClick={() =>
                      setPackage(
                        currentPackage.filter(
                          (product) => product.product_id !== element.product_id
                        )
                      )
                    }
                    style={{ color: "tomato", marginRight: 5 }}
                  />
                </div>
              );
            })}
          </div>
          <div
            style={{
              height: 50,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
            className="border-top"
          >
            <h3>Total Price</h3>
            <h2>
              {currentPackage.length == 0
                ? "0 "
                : currentPackage.reduce(
                    (acc, value) =>
                      parseFloat(acc) + parseFloat(value.new_price),
                    0
                  )}
              {"    "}
              EGP
            </h2>
          </div>
        </Card> */}
      </Col>
     </Row>
      <Row gutter={12}>
      <Col xs={24} sm={24} md={17} lg={17}>
      <Card title={"Select a Product"}>
  <ListOfProducts
  Inner_products={Inner_products}
  setInner_products={
    setInner_products}
    col={col}
    data={Products}
    postObject={postObject}
    setPostObject={setPostObject}
    setCurrentPrice={setCurrentPrice}
    setPRODUCT={ setPRODUCT}
    setALL_Products={setALL_Products}


PRODUCT={PRODUCT}
  />
</Card>
</Col>

<Col xs={24} sm={24} md={7}>
  
  <Card title={"My Products Details"}
    //  key={index} id={index}
     >
       <div style={{height:"300px",overflowY:"scroll"}}>
       {Inner_products!=0?
       Inner_products.map((data,Main_Index)=>(
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

                    <MinusCircleOutlined
                      className="mt-md-4 pt-md-3 "
                      onClick={(e) => {
                        removeVariations(data.id_);
                      }}
                    />
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
        // defaultValue={Details?.Discount}     
        // defaultValue={Details.Discount}
        addonAfter="%"
        onPressEnter={(e) => e.preventDefault()}
        
        onChange={(event) =>handleChange_Variations_Package(event,Main_Index) }
          
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
      // defaultValue={Details.total_capacity}

      placeholder="total capacity"
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
          showTime
          className="w-100"
          placeholder="Select Time"
          // defaultValue={moment(Details.Start_Date, dateFormat)} 
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
          // defaultValue={moment(Details.End_Date, dateFormat)} 

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
