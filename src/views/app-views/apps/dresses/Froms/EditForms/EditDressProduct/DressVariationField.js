import { MinusCircleOutlined, PlusOutlined,CloseOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, message, Row, Select } from "antd";
import { numberValidator } from "constants/helperFunctions";
import { NUMBER_CONSTANTS } from "constants/LanguagesConstent";
import React from "react";
import service from "auth/FetchInterceptor";

import { useState,useEffect } from "react";
const staticPurchaseList = [
  { type: "rent", id: 2 },
  { type: "sell", id: 1 },
];
function VariationField({
  postObject,
  setPostObject,
  variationList,
  setVariationList,
  checkView,
}) {
  //    const handleAddition = (add,fields)=>{
  //      add();
  //      if(fields.length>0)setTempList([...tempList,variationList])
  //    }
  console.log(variationList, "Varation List");
  const [purchaseList, setPurchaseList] = useState(staticPurchaseList);
  const [AllData,setAllData]=useState([])
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
//  x.push({name:AllData [event].payment_method_name,id:AllData [event].payment_method_id})
const values = [...variationList];
let filteredArray = values[index]["payment_methods"].filter(data => (data.payment_method_id != AllData [event].payment_method_id))
console.log("first",filteredArray)
if (filteredArray.length !== values[index]["payment_methods"].length) {//check if arr clicked before then
    message.error(`${AllData [event].payment_method_name} added before`)
  return}
values[index]["payment_methods"].push({name_en:AllData [event].payment_method_name,payment_method_id:AllData [event].payment_method_id}) 
console.log("{{{{{{{{{",values[index]["payment_methods"])

setVariationList(values);
  }

 

   
  const removeElement = (field, id) => {
    setMY_Index(prev=>prev-1  )
    const filteredList = variationList.filter((element) => element.id !== id);
    setVariationList(filteredList);
    setPurchaseList(staticPurchaseList);
  };
  const remove_Element = (INDEX,ele) => {
    console.log("variationList",variationList)
    const values = [...variationList];
    values[INDEX]["payment_methods"]= values[INDEX]["payment_methods"].filter(function(item) {
      return item !== ele
  })
        setVariationList(values);
};

  const handleAddition = () => {
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
    values[INDEX]["payment_methods"][index]={name_en:ele.name_en,down_payment_value:e.target.value,
      down_payment_type:"PERCENTAGE",payment_method_id:ele.payment_method_id}
    // .push({name:e.name,payment_method_id:e.payment_method_id
    //   ,down_payment_type:"PERCENTAGE",down_payment_value:down_payment.value}) 
        setVariationList(values);
    
    
    // message.success(`${e.name} added`)
      }
  const [feildChecker, setFieldChecker] = useState({
    price: true,
    down_payment_value: true,
  });
  variationList[0].payment_methods.map(ele=>console.log("general",ele))

  useEffect(async()=>{
    console.log("from my general",variationList)
    // console.log("down_payment,",PayMentmethod)
    if(AllData==""){
      try {
        await service.get(`web/sellerPaymentMethods/7/${postObject.dress_store_id}`).then(res=> setAllData(res.records));
    
         
      } catch (error) {
       }
    }else{
      return
    }
    
    //  console.log("for for for ",PayMentmethod)
  },[AllData,postObject])
  const anOldHope=(e)=>{
  
    e.target.value.slice(0, 3)
    if(e.target.value>100){
      e.target.value = 100
  
    }
    else if(e.target.value<0)
    {    e.target.value = 0  }
    else return
  
  }
  return (
    <Card title="Variants">
      <Form.List name="variants">
        {(fields, { add, remove }) => {
          return (
            <div className="mt-3">
              {variationList?.map((field, INDEX) => (
                <Row key={field.id} gutter={16}>
                  <Col sm={24} md={11}>
                    <Form.Item
                      required
                      label="Purchase Type"
                      name={[field.id, "purchase_type"]}
                      fieldKey={[field.purchase_type, "purchase_type"]}
                      className="w-100"
                    >
                      <Select
                        disabled={checkView}
                        placeholder="Enter the Purchase Type"
                        defaultValue={field.purchase_type}
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
                      required
                      label="Price"
                      name={[field.id, "pricee"]}
                      fieldKey={[field.price, "price"]}
                      rules={[
                        feildChecker.price
                          ? []
                          : ({ getFieldValue }) => ({
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
                      <Input
                        name="price"
                        disabled={checkView}
                        placeholder="Enter the Price"
                        defaultValue={field.price}
                        key={field.id}
                        onChange={(e) => {
                          setFieldChecker({ ...feildChecker, phone: false });
                          handleChange(INDEX, e);
                        }}
                        className="w-100"
                        value={field.price}
                      />
                    </Form.Item>
                  </Col>
                                      

                  {checkView ? null : (
                    <Col sm={24} md={2}>
                      <MinusCircleOutlined
                        className="mt-md-4 pt-md-3"
                        onClick={(e) => {
                          removeElement(field, field.id);
                        }}
                      />
                    </Col>
                  )}
                 
                 {checkView?
                 <>
                  <Col sm={24} md={22}>
                 <Form.Item
                     label="payment_methods"
                     name={[field.id, "payment_methods"]}
                     fieldKey={[field.payment_methods, "payment_methods"]}
                     // rules={[
                     //   { required: true, message: "Please enter variant SKU" },
                     // ]}
                     className="w-100"
                   >
                     <Select

                       placeholder="selected_PaymentMethod"
                      //  mode="multiple"
                       value={variationList[INDEX].payment_methods.map((ele)=>ele.name_en)}
                       disabled={true}
                      //  defaultValue={field.payment_methods.map((ele)=>ele.name_en)}
                       onSelect={(e) => handle_Select_Payment(INDEX, e)}
                       className="w-100"
                     >
                       {AllData.map((element,index) => (
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
                   return <div style={{display:"flex"}}> <Card   style={{marginBottom:"10px",width:"500px"}} title={ele.name_en} key={field.id}>
                    
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
                     <div key={INDEX}>
                     <Input
                       name="Down Payment Methos VAlue"
                       placeholder="Enter the Down Payment Value  "
                       addonAfter="%"
                       disabled={true}
                       key={field.id}
                       onChange={(e) => setdown_payment({value:e.target.value})}
                       className="w-100"
                       // value={ele.down_payment_value}
                       defaultValue={ele.down_payment_value}

                     />
                     </div>  
                   </Form.Item>
                 
                   <div style={{display: "flex",
   justifyContent: "end"}}><Button onClick={()=>add_CHANGE(ele,index,INDEX)}>Add</Button></div>
                   
               
                  
         
                   </Card>
                
                   </div>
                 
                 })}
                 
                 </div></>:
                 <> 
                 <Col sm={24} md={22}>
                 <Form.Item
                     label="payment_methods"
                     name={[field.id, "payment_methods"]}
                     fieldKey={[field.payment_methods, "payment_methods"]}
                     // rules={[
                     //   { required: true, message: "Please enter variant SKU" },
                     // ]}
                     className="w-100"
                   >
                     <Select

                       placeholder="selected_PaymentMethod"
                       mode="multiple"
                      //  value={field .payment_methods.map((ele)=>ele.name_en)}

                      //  value={field.payment_methods}
                      // //  defaultValue={variationList[field].payment_methods.map((ele)=>ele.name_en)}
                      value={field.payment_methods.map((ele=>ele.name_en ))}
                      onSelect={(e) => handle_Select_Payment(INDEX, e)}
                       className="w-100"
                     >
                       {AllData.map((element,index) => (
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
      return <div style={{display:"flex"}}> <Card   style={{marginBottom:"10px",width:"500px"}} title={ele.name_en}
       key={ele.id}>
                    
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
                       key={field.id}
                       autocomplete="off"
                       minLength="0"
                       min="0"
         maxLength="3"
                        onInput={(e) =>anOldHope(e)}                        onChange={(e) => add_CHANGE(INDEX,index,e,ele)}
                      
                       className="w-100"
                       // value={ele.down_payment_value}
                       defaultValue={ele.down_payment_value}

                     />
                     </div>  
                   </Form.Item>
                 
                   {/* <div style={{display: "flex",
   justifyContent: "end"}}><Button onClick={()=>add_CHANGE(ele,index,INDEX)}>Add</Button></div> */}
                   
               
                  
         
                   </Card>
                   <CloseOutlined 
                     //  style={{fl}}
                     value={field.payment_method_variation}

                     // className="mt-md-4 pt-md-3"
                     color="red"
                     onClick={( ) => {
                       remove_Element(INDEX, ele);
                      //  /msm
                     }}
                   />
                   </div>
                 
                 })}
                 
                 </div></>}

                 
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
  );
}

export default VariationField;
