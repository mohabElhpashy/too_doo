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
  setPayMentmethod
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

const remove_Element = (index,ele) => {
    var  values = [...PayMentmethod];
    console.log("from delele",ele)
    values = values.filter(function(item) {
      return item !== ele
  })
        setPayMentmethod(values);
};

//   const handleAddition = () => {
//     setMY_Index(prv=>prv+1)
//     setVariationList([
//       ...variationList,
//       { id: Math.floor(Math.random() * 10000), price: null, purchase_type: "",paymentMethods:[]},
//     ]);
    
//   };
  const handle_Select_Payment=(event)=>{
   
    const values = [...PayMentmethod];
    let filteredArray = values.filter(data => (data.payment_method_id != AllData[event].payment_method_id))
    console.log("first",filteredArray)
    if (filteredArray.length !== values.length) {//check if arr clicked before then
        message.error(`${AllData[event].payment_method_name} added before`)
      return}
    values.push({name:AllData[event].payment_method_name,payment_method_id:AllData[event].payment_method_id}) 
        setPayMentmethod(values);
    // console.log("{{{{{{{{{",index)
        };
        const add_CHANGE=(index,e,ele)=>{
             
          PayMentmethod[index]={name:ele.name,down_payment_value:e.target.value,
            down_payment_type:"PERCENTAGE",payment_method_id:ele.payment_method_id}
          // console.log("values",values)
            }
            const anOldHope=(e)=>{
  
              e.target.value.slice(0, 3)
              if(e.target.value>100){
                e.target.value = 100
            
              }
              else if(e.target.value<0)
              {    e.target.value = 0  }
              else return
            
            }
        
useEffect(async()=>{
  // console.log("from my general",postObject.agency_id)
//   console.log(down_payment)
  try {
    await service.get(`web/sellerPaymentMethods/2/${postObject.hotel_id}`).then(res=> setAllData(res.records));

     
  } catch (error) {
   }  
 },[ ])

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
                        // mode="multiple"
                        // value={paymentMethods}
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
                    
                  {PayMentmethod.map((ele,index)=>{
                    return <div  key={ele.payment_method_id} style={{display:"flex",justifyContent:"space-between"}}>
                       <Card    style={{marginBottom:"10px",width:"500px"}} title={ele.name} >
 
                     <Form.Item
                      hasFeedback
                      required
                      label="Down Payment Value"
                      // rules={[
                      //   {
                      //     whitespace: true,
                      //   },
                      //   ({ getFieldValue }) => ({
                      //     validator(_, value) {
                      //       const checkValidation = languageValidator(
                      //         value.toLowerCase(),
                      //         NUMBER_CONSTANTS
                      //       );
                      //       if (checkValidation) {
                      //         return Promise.resolve();
                      //       } else {
                      //         return Promise.reject("Please enter Nubers");
                      //       }
                      //     },
                      //   }),
                      // ]}
                      className="w-100"
                    >
                      <div key={ele.payment_method_id}>
                      <Input
              autocomplete="off"
                        name="Down Payment Methos VAlue"
                        placeholder="Enter the Down Payment Value  "
                        addonAfter="%"
                        minLength="0"
              min="0"
maxLength="3"
               onInput={(e) =>anOldHope(e)} 
                         onChange={(e) =>add_CHANGE(index,e,ele)}
                          //  setdown_payment({value:e.target.value})
                          
                        className="w-100"
                        // value={field.down_payment}

                      />
                      </div>  
                    </Form.Item>
 
                  
                
                    {/* {down_payment.value?
                      <div style={{display: "flex",
                      justifyContent: "end"}}>
                              <Button   type="primary"
           onClick={()=>add_CHANGE(ele)}>Add</Button>
                          </div>:
                                <div style={{display: "flex",
                                justifyContent: "end"}}>
                                        <Button  disabled={true} onClick={()=>add_CHANGE(ele)}>Add</Button>
                                    </div>  
                } */}
                    
                
                   
          
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
