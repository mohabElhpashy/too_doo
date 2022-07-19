import { MinusCircleOutlined, PlusOutlined,CloseOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, message, Row, Select } from "antd";
import { numberValidator } from "constants/helperFunctions";
import { NUMBER_CONSTANTS } from "constants/LanguagesConstent";
import React, { useEffect } from "react";
import { useState } from "react";
import service from "auth/FetchInterceptor";

function VariationField({
  postObject,
  setPostObject,
  PayMentmethod,
  setPayMentmethod,
  checkView
}) {
  //    const handleAddition = (add,fields)=>{
  //      add();
  //      if(fields.length>0)setTempList([...tempList,variationList])
  //    }
  const [AllData,setAllData]=useState([])
  const [down_payment,setdown_payment]=useState({value:""})
  const [MY_Index,setMY_Index]=useState(0)


//   const handleChange = (index, event) => {
//     const values = [...variationList];
//     values[index][event.target.name] = event.target.value;
//     setVariationList(values);
//   };

// console.log("{{{{{{{{{",PayMentmethod)

const remove_Element = (index,ele) => {
  var  values = [...PayMentmethod];
  // console.log("from delele",ele)
  values = values.filter(function(item) {
    return item !== ele
})
console.log("values",values)
      setPayMentmethod(values);
};


const handle_Select_Payment=(event)=>{
 
  const values = [...PayMentmethod];
  let filteredArray = values.filter(data => (data.payment_method_id != AllData[event].payment_method_id))
  console.log("first",filteredArray)
  if (filteredArray.length !== values.length) {//check if arr clicked before then
      message.error(`${AllData[event].payment_method_name} added before`)
    return}
  values.push({name_en:AllData[event].payment_method_name,payment_method_id:AllData[event].payment_method_id}) 
      setPayMentmethod(values);
  // console.log("{{{{{{{{{",index)
      };
      const add_CHANGE=(index,e,ele)=>{
             
          PayMentmethod[index]={name_en:ele.name_en,down_payment_value:e.target.value,
            down_payment_type:"PERCENTAGE",payment_method_id:ele.payment_method_id}
          // console.log("values",values)
            }
        
        
useEffect(async()=>{
  // console.log("from my general",postObject.agency_id)
  console.log("down_payment,",PayMentmethod)
  if(AllData==""){
    try {
      await service.get(`web/sellerPaymentMethods/8/${postObject.makeup_id}`).then(res=> setAllData(res.records));
  
       
    } catch (error) {
     }
  }else{
    return
  }
  
  //  console.log("for for for ",PayMentmethod)
},[AllData,postObject,PayMentmethod])

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
                <Col sm={24} md={22}>
                  
                  <Form.Item
                      label="paymentMethods"
                    //   name={[field.id, "paymentMethods"]}
                    //   fieldKey={[field.paymentMethods, "paymentMethods"]}
                      rules={[
                        { required: true, message: "Please enter variant SKU" },
                      ]}
                      className="w-100"
                    >
                      <Select
                        placeholder="selected_PaymentMethod"

                        mode="multiple"
                        
                        value={PayMentmethod.map((ele=>ele.name_en))}
                        // defaultValue={postObject.makeup_payment_method.map((ele=>ele.paymentMethod.name_en))}
                        disabled={checkView}

                        onSelect={(e) => handle_Select_Payment(e)}
                        className="w-100"
                      >
                        {AllData.map((element,index) => (
                          <Select.Option
                            // disabled={variationList.find(
                            //   (item) => element.type === item.purchase_type
                            // )}
                            // value={element}
                            key={index}
                          >
                            {element.payment_method_name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
              
                <Row   gutter={16}>
                 
                  
                  <div style={{  width:"100%",  display: "flex",flexFlow:"wrap",justifyContent:"space-around"}}   >
                    
                    {checkView? 
                    postObject.makeup_payment_method.map((ele,index)=>{
                    return <div style={{display:"flex"}} > 
                    <Card   style={{marginBottom:"10px",width:"500px"}} title={ele.name_en} >
                     
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
                      disabled={checkView}
                        name="Down Payment Methos VAlue"
                        placeholder="Enter the Down Payment Value  "
                        addonAfter="%"
                         onChange={(e) => setdown_payment({...postObject,value:e.target.value})}
                        className="w-100"
                        defaultValue={ele.down_payment_value}
                        // value={field.down_payment}

                      />
                      </div>  
                    </Form.Item>
                  
                    {/* <div style={{display: "flex",
    justifyContent: "end"}}>
            <Button onClick={()=>add_CHANGE(ele)}>Add</Button>
        </div> */}
                    
                
                   
          
                    </Card>
                    {/* <CloseOutlined 
                      //  style={{fl}}
                    //   value={field.paymentMethods}

                      // className="mt-md-4 pt-md-3"
                      color="red"
                      onClick={( ) => {
                        remove_Element(index, ele);
                      }}
                    /> */}
                    </div>
                  
                  }):
                  PayMentmethod.map((ele,index)=>{
                    return <div style={{display:"flex"}} > 
                    <Card disabled key={ele.payment_method_id} style={{marginBottom:"10px",width:"500px"}} title={ele.name_en} >
                     
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
                        defaultValue={ele.down_payment_value}

                        addonAfter="%"
                        autocomplete="off"
                        minLength="0"
                        min="0"
          maxLength="3"
                         onInput={(e) =>anOldHope(e)}           
                        //  onChange={(e) => setdown_payment({value:e.target.value})}
                        onChange={(e) =>add_CHANGE(index,e,ele)}         
                                       className="w-100"
                        // value={field.down_payment}

                      />
                      </div>  
                    </Form.Item>
                  
                    {/* <div style={{display: "flex",
    justifyContent: "end"}}>
            <Button onClick={()=>add_CHANGE(ele,index)}>Add</Button>
        </div> */}
                    
                
                   
          
                    </Card>
                    <CloseOutlined 
                      //  style={{fl}}
                    //   value={field.paymentMethods}

                      // className="mt-md-4 pt-md-3"
                      color="red"
                      onClick={( ) => {
                        remove_Element(index, ele);
                      }}
                    />
                    </div>
                  
                  })}
                  
                 
                  
                  </div>
                </Row>
             
              {/* <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => handleAddition()}
                  className="w-100"
                >
                  <PlusOutlined /> Add Another Variation
                </Button>
              </Form.Item> */}
            </div>
          );
        }}
      </Form.List>
    </Card>
  );
}

export default VariationField;
