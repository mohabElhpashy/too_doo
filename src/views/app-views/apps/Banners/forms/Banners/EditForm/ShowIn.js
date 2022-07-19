import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, message, Row, Select ,DatePicker,TimePicker
} from "antd";
import moment from 'moment';

import { numberValidator } from "constants/helperFunctions";
import { NUMBER_CONSTANTS } from "constants/LanguagesConstent";
import React, { useEffect } from "react";
import { useState } from "react";
import service from "auth/FetchInterceptor";

const staticPurchaseList = [
  { type: "rent", id: 2 },
  { type: "sell", id: 1 },
];
function ShowIn({
//   postObject,
//   setPostObject,
//   variationList,
//   setVariationList,
types,
checkView,
postObject,
settypes

}) {
  const dateFormat = 'YYYY/MM/DD';

  const [variationList, setVariationList] = useState([]);
    console.log(types, "Varation List ");
    const[TargetTYPe,setTargetTYPe]=useState([])
    const Status=[{name:"Active",value:1},{name:"Inactive",value:0}]
useEffect(async()=>{
  // console.log("variationList",postObject.banner_target_types)
// setPostobject({...Postobject,types:variationList})
try {
  const TargetTYPe=  await service.get("/web/targetType")
  setTargetTYPe(TargetTYPe.records)
   
  } catch (error) {
   }

},[types])

  const handleSelect_1 = (index, event) => {
    console.log("key",index)
    const values = [...types];
    values[index]["target_type_id"] = event;
    
    settypes(values);
  };
  const handleSelect_2 = (index, event) => {
    const values = [...types];
    values[index]["active"] = event;
    // setPurchaseList(
    //   purchaseList.filter((element, index) => element.type !== event)
    // );
    settypes(values);
  };
  const handleSelect_3 = (index, event) => {
    console.log("event",event)
    const values = [...types];
    const D_A_T_E= event._d.toISOString('yyyy-MM-dd');

    const F_Date=D_A_T_E.replace('T',' ')
    const F_date=F_Date.replace('Z','')
    values[index]["start_date"] = F_date
    // setPurchaseList(
    //   purchaseList.filter((element, index) => element.type !== event)
    // );
    settypes(values);
  }; 
  const handleSelect_4 = (index, event) => {
    const values = [...variationList];
    const D_A_T_E= event._d.toISOString('yyyy-MM-dd');

    const F_Date=D_A_T_E.replace('T',' ')
    const F_date=F_Date.replace('Z','')
    


    values[index]["end_date"] =F_date
    // setPurchaseList(
    //   purchaseList.filter((element, index) => element.type !== event)
    // );
    setVariationList(values);
  };
  const removeElement = (field, id) => {
    const filteredList = types.filter((element) => element.id !== id);
    settypes(filteredList);
    // setPurchaseList(staticPurchaseList);
  };

  const handleAddition = () => {
    settypes([
      ...types,
      { id: Math.floor(Math.random() * 10000), 
        active: "",
        banner_id: "",
        end_date:'2022-03-21 14:49:41+01',
        start_date: '2022-03-21 14:49:41+01',
        target_type_id: "",
        showin:""},
    ]);
    console.log("variation list",types)
  };
  return (
    <Card title="Target">
      <Form.List name="Variants">
        {(fields, { add, remove }) => {
          return (
            <div className="mt-3">
              {checkView?
              <>
               {types?.map((dta, index) => (
              <Row key={index} gutter={16}>
                <Col sm={24} md={11}>
                  <Form.Item
                    label="Target Type"
                    // name={[field.id, "target_type"]}
                    // fieldKey={[field.target_type, "target_type"]}
                 
                    className="w-100"
                  >
                   <div key={variationList.id}>

                    <Select
                      placeholder="Enter the  Target Type"
                      disabled
                      defaultValue={dta.showin}
                      // value={field.purchase_type}
                      onSelect={(e) => handleSelect_1(index, e)}
                      className="w-100"
                    >
                      {TargetTYPe.map((element,index) => (
                        <Select.Option
                          // disabled={variationList.find(
                          //   (item) => element.type === item.purchase_type
                          // )}
                          value={element.id}
                          key={index}
                        >
                          {element.show_in}
                        </Select.Option>
                      ))}
                    </Select>
                    </div>
                  </Form.Item>
                </Col>
                <Col sm={24} md={11}>
                <Form.Item
                    label="Status"
                    // name={[field.id, "active"]}
                    // fieldKey={[field.active, "active"]}
                 
                    className="w-100"
                  >
                 <div key={variationList.id}>

                    <Select
                      placeholder="Enter the Status"
                      // value={field.purchase_type}
                      disabled={true}
                      defaultValue={dta.active?"active":"inactive"}
                      onSelect={(e) => handleSelect_2(index, e)}
                      className="w-100"
                    >
                      {Status.map((element,index) => (
                        <Select.Option
                          // disabled={variationList.find(
                          //   (item) => element.type === item.purchase_type
                          // )}
                          value={element.value}
                          key={index}
                        >
                          {element.name}
                        </Select.Option>
                      ))}
                    </Select>
                    </div>
                  </Form.Item>
                </Col>
                <Col sm={24} md={22}>

                {/* <Form.Item
          style={{
            display: "inline-block",
            width: "calc(50% - 5px)",
            marginRight: 8,
          }}
          // name={[field.id, "Start_Date"]}
          //           fieldKey={[field.Status, "Start_Date"]}
          name="Start Date"
          label="Start Date"
          // rules={rules.price}
          required
          
        >
    <div key={variationList.id}>

          <DatePicker
          disabled
          // defaultValue={"dta.start_date"}
        defaultValue={dta.start_date.toString()}

            showTime
            className="w-100"
            placeholder="Select Time"
            onOk={(e) =>
              handleSelect_3(index, e)

            }
          />
          </div>
        </Form.Item> */}
        <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
            required
            name="open_at"
            label="Start Date"
            // rules={rules.price}
          >
             <DatePicker 
             disabled 
             defaultValue={moment(dta.start_date, dateFormat)} 
             format={dateFormat}
             placeholder="Select Time"
             className="w-100"
 
              />

          </Form.Item>

        <Form.Item
          style={{ display: "inline-block", width: "calc(50% - 5px)" }}
          name="end_date"
          label="End Date"
          required
          // rules={rules.comparePrice}
          // name={[field.id, "End_Date"]}
          // fieldKey={[field.Status, "End_Date"]}
        >
  <div key={variationList.id}>

            <DatePicker 
             disabled 
             defaultValue={moment(dta.end_date, dateFormat)} 
             format={dateFormat}
             placeholder="Select Time"
             className="w-100"
 
              />
          </div>
        </Form.Item>
                </Col>
                {/* <Col sm={24} md={2}>
                  <MinusCircleOutlined
                    className="mt-md-4 pt-md-3"
                    onClick={(e) => {
                      removeElement(field, field.id);
                    }}
                  />
                </Col> */}
              </Row>
            ))}
            
              </>
             :
            <>
             {types?.map((field, index) => (
              <Row key={field.id} gutter={16}>
                <Col sm={24} md={11}>
                  <Form.Item
                
                    label="Target Type"
                    name={[field.id, "target_type"]}
                    fieldKey={[field.target_type, "target_type"]}
                    // rules={[
                    //   { required: true, message: "Please enter variant SKU" },
                    // ]}
                    className="w-100"
                  >
                   <div key={index}>

                    <Select
                      placeholder="Enter the  Target Type"
                      // value={field.purchase_type}
                      defaultValue={field.showin}
                      onSelect={(e) => handleSelect_1(index, e)}
                      className="w-100"
                      
                    >
                      {TargetTYPe.map((element,index) => (
                        <Select.Option
                          // disabled={variationList.find(
                          //   (item) => element.type === item.purchase_type
                          // )}
                          value={element.id}
                          key={index}
                        >
                          {element.show_in}
                        </Select.Option>
                      ))}
                    </Select>
                    </div>
                  </Form.Item>
                </Col>
                <Col sm={24} md={11}>
                <Form.Item
                    label="Status"
                    name={[field.id, "active"]}
                    fieldKey={[field.active, "active"]}
                    // rules={[
                    //   { required: true, message: "Please enter variant SKU" },
                    // ]}
                    className="w-100"
                  >
             <div key={index}>

                    <Select
                      placeholder="Enter the Status"
                      // value={field.purchase_type}
                      defaultValue={field.active?"active":"Inactive"}
                      onSelect={(e) => handleSelect_2(index, e)}
                      className="w-100"
                    >
                      {Status.map((element,index) => (
                        <Select.Option
                          // disabled={variationList.find(
                          //   (item) => element.type === item.purchase_type
                          // )}
                          value={element.value}
                          key={index}
                        >
                          {element.name}
                        </Select.Option>
                      ))}
                    </Select>
                    </div>
                  </Form.Item>
                </Col>
                <Col sm={24} md={22}>
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
       {/* <div key={currentPrice  }> */}

            <DatePicker
          defaultValue={moment(field.end_date, dateFormat)} 

              showTime
              className="w-100"
              // value={field.start_date}
              // defaultValue={"2020"}
              placeholder="Select Time"
              // defaultValue={field.start_date}
              // defaultOpen={field.start_date}
              onOk={(e) =>
                handleSelect_3(index, e)
              }
            />
            {/* </div> */}
          </Form.Item>

          <Form.Item
            style={{ display: "inline-block", width: "calc(50% - 5px)" }}
            name="end_date"
            label="End Date"
            required
            // rules={rules.comparePrice}
          >
                                                {/* <div key={currentPrice  }> */}

            <DatePicker
              showTime
              placeholder="Select Time"
              className="w-100"
              defaultValue={moment(field.end_date, dateFormat)} 

              onOk={(e) =>
                settypes({
                  ...types,
                  end_date: e._d.toISOString('yyyy-MM-dd'),
                })
              }
            />
            {/* </div> */}
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
              </Row>
            ))}
            <Form.Item>
              <Button
                type="dashed"
              //   disabled={variationList.length === 2}
                onClick={() => handleAddition()}
                className="w-100"
              >
                <PlusOutlined /> Add Another Variation
              </Button>
            </Form.Item>
            </>
            
            
            }
              
            </div>
          );
        }}
      </Form.List>
    </Card>
  );
}

export default ShowIn;
