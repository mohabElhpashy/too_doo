import { MinusCircleOutlined, PlusOutlined ,CloseOutlined} from "@ant-design/icons";
import { Button, Card, Col, Form, Input, message, Modal, Row, Select,Table } from "antd";
import { numberValidator } from "constants/helperFunctions";
import { NUMBER_CONSTANTS } from "constants/LanguagesConstent";
import React, { useEffect } from "react";
import { useState } from "react";
import service from "auth/FetchInterceptor";
import { variance } from "@babel/types";
import { valuesIn } from "lodash";

const { Option } = Select;
const staticPurchaseList = [
  { type: "rent", id: 2 },
  { type: "sell", id: 1 },
];
const COol = (service_id, setSingleImage) => {
  const [x,setx]=useState({value:""})
useEffect(()=>{console.log("my test",x)},[x])
  console.log("service id ",service_id)
  return[
  {
    title: "ID",
    dataIndex:"id",
    key: "id",
    render: (_, obj) => `# ${obj.id ? obj.id : obj.id}`,
  },
  {
    title: "payment_method_name",
    dataIndex: "payment_method_name",
    key: "payment_method_name",
    // sorter: (a, b) => a.product_name.length - b.product_name.length,
  },
  {
    title: "Down Payment Value",
    
    render: (_, obj) => <Input             addonAfter="%"
    onChange={(e)=>setx({value:e.target.value})}></Input>,
  },
  
]; }
const ListOfProducts = ({
  name,
  col,
  data,
   postObject,
  

 }) => {
  const [singleImage, setSingleImage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [Product_details,setProduct_details]=useState({total_capacity:"",discount:"",product_id:"",variation_id:"",available_from:"",available_to:""});
  const [oldprice,setoldprice]=useState({value:""});


 

  
 
//   const handlech = (index) => {
//     console.log("indexxxxxxx",index)
//     let filteredArray = ar.filter(data => (data.value != index.id))
//     console.log("first",filteredArray)
//     if (filteredArray.length !== ar.length) {//check if arr clicked before then
//         ar = filteredArray
//         listofProduct.pop(data.product_id)
//         console.log("hbashy", listofProduct)

//         return;
//     } else {
//       console.log("for test",index)
//       setProduct_details({...Product_details,variation_id:index.variation_id,product_id:index.id})
//       console.log("PRICEEEE",index.price)
     
//  showModal(index.price)
//         ar.push({value: index.id })
//     }
//     console.log("hbashy", ar)
//   }
//   useEffect(()=>{
// console.log("maaap",Product_details)
//   },[Product_details])
  return (
    <>
      <Table
        
        rowSelection={{
          type: "checkbox",
          // onSelect:(index,data)=>handlech(index)
            
          // ,
        
          getCheckboxProps: (record) => ({
            onClick: (t) => alert(record.id),
          }),
        }}
        columns={col(postObject?.service_id, setSingleImage)}
        dataSource={data}
        rowKey={(item) => (item.variation_id ? item.variation_id : item.id)}
        
      />
     
   
    </>
  );
};
var x=[]

function VariationField({
  postObject,
  setPostObject,
  variationList,
  setVariationList,
  services,
  ALL_Data
}) {
  //    const handleAddition = (add,fields)=>{
  //      add();
  
  const [purchaseList, setPurchaseList] = useState(staticPurchaseList);
  const [Iside,setIside]=useState([{value:""}])
  const [down_payment,setdown_payment]=useState({value:""})
  const [MY_Index,setMY_Index]=useState(0)
 


  const handleChange = (index, event) => {
    const values = [...variationList];
    values[index][event.target.name] = event.target.value;
    setVariationList(values);
  };
  const  handleSelect = async(index, event) => {
  //  x.push({paymethodname:event})
    const values = [...variationList];
    values[index]["purchase_type"] = event;
  //  setPurchaseList(
  //     purchaseList.filter((element, index) => element.type !== event)
  //   );
    setVariationList(values);
  };
  const handle_Select_Payment=(index, event)=>{
//  x.push({name:ALL_Data[event].payment_method_name,id:ALL_Data[event].payment_method_id})
const values = [...variationList];
let filteredArray = values[index]["payment_methods"].filter(data => (data.payment_method_id != ALL_Data[event].payment_method_id))
console.log("first",filteredArray)
if (filteredArray.length !== values[index]["payment_methods"].length) {//check if arr clicked before then
    message.error(`${ALL_Data[event].payment_method_name} added before`)
  return}
values[index]["payment_methods"].push({name:ALL_Data[event].payment_method_name,payment_method_id:ALL_Data[event].payment_method_id}) 
    setVariationList(values);
console.log("{{{{{{{{{",index)
  }

  console.log("{{{{{{{{{",variationList)


   
  const removeElement = (field, id) => {
    setMY_Index(prev=>prev-1  )
    const filteredList = variationList.filter((element) => element.id !== id);
    setVariationList(filteredList);
    setPurchaseList(staticPurchaseList);
  };
  const remove_Element = (INDEX,ele) => {
    const values = [...variationList];
    console.log("from delele",ele)
    values[INDEX]["payment_methods"]= values[INDEX]["payment_methods"].filter(function(item) {
      return item !== ele
  })
        setVariationList(values);
};

  const handleAddition = () => {
    x = [];
    setMY_Index(prv=>prv+1)
    setVariationList([
      ...variationList,
      { id: Math.floor(Math.random() * 10000), price: null, purchase_type: "",payment_methods:[]},
    ]);
    
    
  };
  const add_CHANGE=(INDEX,index,e,ele)=>{
console.log("22222222222",e)
const values = [...variationList];
// values[MY_Index]["payment_methods"]= values[MY_Index]["payment_methods"].filter(function(item) {
//   return item !== e
// })
values[INDEX]["payment_methods"][index]={name:ele.name,down_payment_value:e.target.value,
  down_payment_type:"PERCENTAGE",payment_method_id:ele.payment_method_id}
// .push({name:e.name,payment_method_id:e.payment_method_id
//   ,down_payment_type:"PERCENTAGE",down_payment_value:down_payment.value}) 
    setVariationList(values);


// message.success(`${e.name} added`)
  }
useEffect(()=>{
console.log(down_payment)
},[down_payment])
const anOldHope=(e)=>{
  
  e.target.value.slice(0, 3)
  if(e.target.value>100){
    e.target.value = 100

  }
  else if(e.target.value<0)
  {    e.target.value = 0  }
  else return

}
  // const handle_Select=(e)=>{
  //   console.log("eeeee",e)
  //   x.push({id:ALL_Data[e].id,payment_method_name:ALL_Data[e].payment_method_name})
  //   setVariationList([{selected_PaymentMethod:x}])
   
  // }
 
console.log("my paymaent change",variationList)

  return (
    <>
    <Card title="Variants">
      <Form.List name="variants">
        {(fields, { add, remove }) => {
          return (
            <div className="mt-3">
              {variationList?.map((field, INDEX) => (
                <Row key={field.id} gutter={16}>
                  <Col sm={24} md={11}>
                    <Form.Item
                      label="Purchase Type"
                      name={[field.id, "purchase_type"]}
                      fieldKey={[field.Purchase, "purchase_type"]}
                      rules={[
                        { required: true, message: "Please enter variant SKU" },
                      ]}
                      className="w-100"
                    >
                      <Select
                        placeholder="Enter the Purchase Type"
                        value={field.purchase_type}
                        onSelect={(e) => handleSelect(INDEX, e)}
                        className="w-100"
                      >
                        {purchaseList.map((element) => (
                          <Select.Option
                          disabled={variationList.find(
                            (item) => element.type === item.purchase_type
                          )}
                            value={element.type}
                            key={element.id}
                          >
                            {element.type}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col sm={24} md={11}>
                  
                    <Form.Item
                      hasFeedback
                      required
                      label="Price"
                      name={[field.id, "pricee"]}
                      fieldKey={[field.price, "price"]}
                      rules={[
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!numberValidator(value, NUMBER_CONSTANTS)) {
                              return Promise.reject(
                                "Your Cant include Charcters"
                              );
                            } else {
                              return Promise.resolve();
                            }
                          },
                        }),
                      ]}
                      className="w-100"
                    >
                        <div key={INDEX}> 
                      <Input
                        name="price"
                        placeholder="Enter the Price"
                        key={field.id}
                        onChange={(e) => handleChange(INDEX, e)}
                        className="w-100"
                        value={field.price}
                      />
                                          </div>

                    </Form.Item>
                  </Col>
                  
              
                  <Col sm={24} md={2}>
                    <MinusCircleOutlined
                      className="mt-md-4 pt-md-3"
                      onClick={(e) => {
                        removeElement(field, field.id);
                      }}
                    />
                  </Col>
                 
                  <Col sm={24} md={22}>
                  <Form.Item
                      label="payment_methods"
                      name={[field.id, "payment_methods"]}
                      fieldKey={[field.payment_methods, "payment_methods"]}
                      rules={[
                        { required: true, message: "Please enter variant SKU" },
                      ]}
                      className="w-100"
                    >
                      <Select
                        placeholder="selected_PaymentMethod"
                        // mode="multiple"
                        value={field.payment_methods}
                        onSelect={(e) => handle_Select_Payment(INDEX, e)}
                        className="w-100"
                      >
                        {ALL_Data.map((element,index) => (
                          <Select.Option
                            
                            key={index}
                          >
                            {element.payment_method_name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <div style={{  width:"100%",  display: "flex",flexFlow:"wrap",justifyContent:"space-around"}}   >
                    
                  {field.payment_methods.map((ele,index)=>{
                    return <div style={{display:"flex"}}> <Card  
                     style={{marginBottom:"10px",width:"500px"}}
                      title={ele.name} 
                      key={index}>
                     
                     <Form.Item
                      hasFeedback
                      required
                      label="Down Payment Value"
                       rules={[
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!numberValidator(value, NUMBER_CONSTANTS)) {
                              return Promise.reject(
                                "Your Cant include Charcters"
                              );
                            } else {
                              return Promise.resolve();
                            }
                          },
                        }),
                      ]}
                      className="w-100"
                    >
                     <div key={index}>
                      <Input
                        name="Down Payment Methos VAlue"
                        placeholder="Enter the Down Payment Value  "
                        addonAfter="%"
                        autocomplete="off"
                        minLength="0"
                        min="0"
          maxLength="3"
                         onInput={(e) =>anOldHope(e)} 
                        onChange={(e) => add_CHANGE(INDEX,index,e,ele)}
                        className="w-100"
                        // value={field.down_payment}

                      />
                      </div>  
                    </Form.Item>
                  
                    {/* <div style={{display: "flex",
    justifyContent: "end"}}><Button onClick={()=>add_CHANGE(index,e,ele)}>Add</Button></div> */}
                    
                
                   
          
                    </Card>
                    <CloseOutlined 
                      //  style={{fl}}
                      value={field.payment_methods}

                      // className="mt-md-4 pt-md-3"
                      color="red"
                      onClick={( ) => {
                        remove_Element(INDEX, ele);
                      }}
                    />
                    </div>
                  
                  })}
                  
                  </div>
                  </Row>
                 
              ))}
              <Form.Item>
            
      
                <Button
                  type="dashed"
                  disabled={variationList.length === 2}
                  onClick={() => handleAddition()}
                  className="w-100"
                >
                  <PlusOutlined /> Add Another Variation
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
    </Card>
     
    </>

  );
}

export default VariationField;
