import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select,TimePicker,
  Modal,Row,Col,Tabs

} from "antd";
import { languageValidator, numberValidator } from "constants/helperFunctions";
import {
  ARABIC_alpha,
  ENGLISH_ALPH,
  NUMBER_CONSTANTS,
} from "constants/LanguagesConstent";
import React, { useEffect, useState } from "react";
import service from "auth/FetchInterceptor";
import { Card } from 'react-bootstrap';
import index from "views/app-views/apps/doctors";
import Disabled from "views/app-views/components/general/button/Disabled";
import { set, sortedIndex } from "lodash";
import { WEEKDAYS } from "constants/DateConstant";
import moment from "moment";


const { Option } = Select;
const { TabPane } = Tabs;


function VariationField({
  periods_General
  ,setperiods_General,
  periods_Variations,
  setperiods_Variations,
  Periods,setPeriods,
  checkView,

  periods_packagePrices,setperiods_packagePrices}) {
  // console.log("periods_General",periods_packagePrices)
  const [Periods_,setAllPeriods]=useState([])
  const[OpenModal,setOpenModal]=useState(false)
  const [Index,sortedIndex]=useState()
  const [flag,setflag]=useState(false)
  const weeks=[
    {name:"Sa",value:"Saturday"},
    {name:"Su",value:"Sunday"},
    {name:"Mo",value:"Monday"},
    {name:"Tu",value:"Tuesday"},
    {name:"We",value:"Wednesday"},
    {name:"Th",value:"Thursday"},
    {name:"Fr",value:"Friday"},
  ]
  const rules = {
    name: [
      {
        required: true,
        message: "Please enter product name",
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
  };
  const dateFormat = 'hh:mm:ss a';

  console.log("periods_Variations",Periods)
  const handleChange = ( event,index) => {
    const values = [...Periods];
    values[index][event.target.name] = event.target.value;
    setPeriods(values);
  };

  const handleChange_Variations = ( index_VARI,INDEX,e) => {

    const values = [...Periods];
    // console.log(values[INDEX]["wedding_hall_variation"])

    // console.log("test",values)
    values[INDEX]["variations"][index_VARI][e.target.name] = e.target.value;
    setPeriods(values);
  };
  const handleChange_Variations_Package = (e,indexpack,index_VARI,INDEX) => {
    // console.log("indexpack",indexpack)

    const values = [...Periods];
    console.log("test",values)
    values[INDEX]["variations"][index_VARI]["week_end"][indexpack][e.target.name] = e.target.value;
    setPeriods(values);
  };
  const handleChange_available_from = ( event,index) => {
    console.log("event",event)
    const values = [...Periods];
    values[index]["available_from"] =  moment(event).format("HH:mm:ss");
    console.log("values",values)
    setPeriods(values);
  };
//////////change price Period Package price 
const handleChange_periods_packagePrices = ( event,index) => {
  const values = [...periods_packagePrices];
  values[index][event.target.name] = event.target.value;
  setperiods_packagePrices(values);
};
  console.log("Periods",Periods)

  const handleChange_available_to = ( event,index) => {
    console.log("event",event)
    const values = [...Periods];
    values[index]["available_to"] = moment(event).format("HH:mm:ss");
    setPeriods(values);
  };
  const OPENMODAL=(index,e)=>{
    console.log("eeeeee",e)

    // sortedIndex(index)
    // // setOpenModal(true)
    // const values = [...periods_General];
    // values[0]["wedding_hall_period_id"] =e;
    // setperiods_General(values);
var name= Periods_.find(x => x.id == e)
console.log("banem",name)
setPeriods([
      ...Periods,
      {
        id: Math.floor(Math.random() * 10000),
      //  name: name.name_en,
  wedding_hall_period_id:e,
    capacity:"",
    available_from:"00:00:00",
    available_to:"00:00:00" ,
    period:{name_en:name.name_en},

    variations:[{
        id: Math.floor(Math.random() * 10000),
        name_ar:"",
        name_en:"",
        description_ar:"",
        description_en:"",
        week_end:[],
        weeks:[
          {name:"Sa",value:"Saturday"},
          {name:"Su",value:"Sunday"},
          {name:"Mo",value:"Monday"},
          {name:"Tu",value:"Tuesday"},
          {name:"We",value:"Wednesday"},
          {name:"Th",value:"Thursday"},
          {name:"Fr",value:"Friday"},
        ]
      }],
      
  },
    ]);
  }
  const handleCancel=()=>{
    setOpenModal(false)

  }
 
     const handleAddition = (INDEX)=>{
      const values = [...Periods];
      console.log("values.variations",values)
      values[INDEX]["variations"].push({
        id: Math.floor(Math.random() * 10000),
      name_ar:"",
      name_en:"",
      description_ar:"",
      description_en:"",
      week_end:[],
      
      weeks:[
        {name:"Sa",value:"Saturday"},
        {name:"Su",value:"Sunday"},
        {name:"Mo",value:"Monday"},
        {name:"Tu",value:"Tuesday"},
        {name:"We",value:"Wednesday"},
        {name:"Th",value:"Thursday"},
        {name:"Fr",value:"Friday"},
      ]})

      setPeriods(values)

     }
  //     const choose_Day=(index,e,INDEX)=>{
       
  // }
  const Choose_Day=(index,e,INDEX)=>{
    console.log("ID",e.target.className)
    const values = [...Periods];
    var name= values[INDEX]["variations"][index]["week_end"].find(x => x.Button_id === e.target.id)

    if(name==null){

     document.getElementById(e.target.id).style.backgroundColor="gray";
   document.getElementById(e.target.id).style.color="white";
   values[INDEX]["variations"][index]["week_end"].push({id: Math.floor(Math.random() * 10000)
    ,day:e.target.className,Button_id:e.target.id}) 
    setPeriods(values);}
    else{
      document.getElementById(e.target.id).style.backgroundColor="white";
      document.getElementById(e.target.id).style.color="black";
    var x=values[INDEX]["variations"][index]["week_end"].filter(x => x.Button_id !== e.target.id)
    values[INDEX]["variations"][index]["week_end"]=x
    setPeriods(values);
    }
  }
  
  useEffect(async()=>{
    try {
      await service.get(`web/WeddingHallPeriods`).then(res=>{
        // console.log(" setAllPeriods(res.records)",res.records)
        setAllPeriods(res.records)
      });
  
       
    } catch (error) {
     }  },[ ])
  // const removeElement = (field, id) => {
  //   const filteredList = variationList.filter((element) => element.id !== id);
  //   setVariationList(filteredList);
  // };
  // const handleAddition = () => {
  //   setVariationList([
  //     ...variationList,
  //     { id: Math.floor(Math.random() * 10000) },
  //   ]);
  // };
  const removeElement = ( id) => {
    const filteredList = Periods.filter((element) => element.id !== id);
    setPeriods(filteredList);
    
  };
  const removeVariations = ( INDEX,index_VARI,id) => {
    const values = [...Periods];

    console.log("Periods",INDEX,index_VARI,id)
    const filteredList = values[INDEX]['variations'].filter((element) => element.id !== id);
    values[INDEX]['variations']=filteredList
    setPeriods(values);
    
  };

  return (
    <>
     <Form.Item
            name="agency_id"
            required
            label={<span>Periods&nbsp;</span>}
            
          >
            <Select
            
              showSearch
              placeholder="Select a Periods"
              optionFilterProp="children"
              
              // disabled={props.storeIdProp ? true : false}
              // defaultValue={props.storeIdProp && parseInt(props.storeIdProp)}
              // onChange={(e) =>
              //   props.setPostObject({ ...props.postObject, agency_id: e })
              // }
              
              onSelect={(e)=>OPENMODAL(index,e)}
              
              // value={props.postObject.agency_id}
              // filterOption={(input, option) =>
              //   option.props.children
              //     .toLowerCase()
              //     .indexOf(input.toLowerCase()) >= 0
              // }
              mode="multiple"
                        
              // value={Periods.map((ele=>ele.period.name_en ))}
              disabled={checkView}
              style={{width:"70%"}}
            >
              {Periods_?.map((dta,index) => (
                <Option
                  value={dta.id}>{dta.name_en}</Option>
              ))}
            </Select>
          </Form.Item>
     <div style={{display:"flex",justifyContent:"space-around"
     ,width:"863px",flexWrap:"wrap",padding: "18px"    }}>  
       {Periods.map((dta,INDEX)=>{
       return(
         <>
            <div
                      style={{
                        display: "flex",
                        flex: 1,
                        width: "100%",
                        justifyContent: "space-between",
                        alignItems: "baseline"
                      }}
                    >
                            <h4 style={{ textDecoration: "underline"}}>{dta.period.name_en } </h4>

                      <MinusCircleOutlined
                        className="mt-md-4 pt-md-3 "
                        onClick={(e) => {
                          removeElement(dta.id);
                        }}
                      />
                    </div>
    <div  
    style={{border:"1px solid gainsboro",borderRadius:"7px",marginBottom:"5px",paddingBottom:"5px"}} 
    className="container"key={dta.id}>
      {/* <h4>mohab{dta.name_en}</h4> */}
          <Tabs defaultActiveKey="1">
            <TabPane tab="General" key="1">
            
             {/* {periods_General.map((dta,index)=>{
               return(
               
               )
              
 
             })
             } */}
              <div style={{display:"flex",justifyContent:"space-around"}} >
                  <div key={INDEX} style={{borderBottom:"1px solid gainsboro ",marginTop:"9px"}}>
                <Row gutter={16}>
              
<Col xs={24} sm={24} md={24}>
      
    <Form.Item name="namr_ar" label="Capacity"  
    required
      >
        <div key={dta.id}>
      <Input
        placeholder=" enter your capacity "
        disabled={checkView}
        name="capacity"
        defaultValue={dta.capacity}
        // onPressEnter={(e) => e.preventDefault()}
       onChange={(e)=> handleChange(e,INDEX)}
        rows={4}
      
      />
      </div>
    </Form.Item>
    
 
    <Form.Item
      style={{
        display: "inline-block",
        width: "calc(50% - 5px)",
        marginRight: 8,
      }}
      required

      name="Start Date"
      label="Available From"
      // rules={rules.price}
      // key={currentPrice}

    >
        <div key={dta.id}>
      <TimePicker
      disabled={checkView}
      name="available_from"
        showTime
        className="w-100"
        placeholder="Select Time"
        defaultValue={moment(dta.available_from, dateFormat)} 

        onOk={ (e)=>handleChange_available_from(e,INDEX)}
        // onChange={(e)=> handleChange(e)}
      />
      </div>
    </Form.Item>
    
    <Form.Item
      style={{ display: "inline-block", width: "calc(50% - 5px)" }}
      name="end_date"
      label="Available To"
      required
      // rules={rules.comparePrice}
      // key={currentPrice}
    >
        <div key={dta.id}>

      <TimePicker
      name="available_to"
      disabled={checkView}

        showTime
        placeholder="Select Time"
        className="w-100"
        defaultValue={moment(dta.available_to, dateFormat)} 

        onOk={ 
          (e)=> handleChange_available_to(e,INDEX)
        }
      />
      </div>
    </Form.Item>
  

    
</Col>


                 </Row>
                 </div>
                 
               
             </div>
             {/* <Form.Item style={{marginTop:"7px"}}>
                <Button
                  // disabled={orignalDetailesList?.length === detailsList.length}
                  type="dashed"
                  onClick={() => handleAddition()}
                  className="w-100"
                >
                  <PlusOutlined /> Add Another Detail
                </Button>
              </Form.Item> */}
           

            </TabPane>
           
             <TabPane tab="Variations" key="2">
             <div style={{height:"700px",overflowY:"scroll",borderBottom:"1px solid gainsboro "}}>

              {dta.variations.map((variation,index_VARI)=>(
                <div style={{borderBottom:"3px solid gainsboro ",marginBottom:"6px"}} >
                <Row gutter={16}>
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
                          <h4 style={{ textDecoration: "underline"}}>{`Variation :  ${index_VARI}`} </h4>

                    <MinusCircleOutlined
                      className="mt-md-4 pt-md-3 "
                      onClick={(e) => {
                        removeVariations(INDEX,index_VARI,variation.id);
                      }}
                    />
                  </div>
                <Col xs={24} sm={24} md={24}>
                  <div key={variation.id}>
                    <Form.Item
                      hasFeedback
                      required
                      style={{
                        display: "inline-block",
                        width: "calc(100% - 5px)",
                        marginRight: 8,
                      }}
                      name="name_ar"
                      label="Name in Arabic"
                      // rules={[
                      //   {
                      //     whitespace: true,
                      //   },
                      //   ({ getFieldValue }) => ({
                      //     validator(_, value) {
                      //       const checkValidation = languageValidator(
                      //         value.toLowerCase(),
                      //         ARABIC_alpha
                      //       );
                      //       if (checkValidation) {
                      //         return Promise.resolve();
                      //       } else {
                      //         return Promise.reject("Please enter The Name in Arabic");
                      //       }
                      //     },
                      //   }),
                      // ]}
                    >
                      <div key={variation.id}>
                      <Input
                            disabled={checkView}

                      name="name_ar"
                      defaultValue={variation.name_ar}
                        onPressEnter={(e) => e.preventDefault()}
                        onChange={(e)=> handleChange_Variations(index_VARI,INDEX,e)}
                        placeholder="Please enter Product Name in Arabic"
                      />
                      </div>
                    </Form.Item>
                    </div>
                    <div key={variation.id}>
                    <Form.Item
                      style={{
                        display: "inline-block",
                        width: "calc(100% - 5px)",
                      }}
                      required
                      name="name_en"
                      label="Name in English"
                      hasFeedback
                      // rules={[
                      //   {
                      //     whitespace: true,
                      //   },
                      //   ({ getFieldValue }) => ({
                      //     validator(_, value) {
                      //       const checkValidation = languageValidator(
                      //         value.toLowerCase(),
                      //         ENGLISH_ALPH
                      //       );
                      //       if (checkValidation) {
                      //         return Promise.resolve();
                      //       } else {
                      //         return Promise.reject("Please enter The Name in English");
                      //       }
                      //     },
                      //   }),
                      // ]}
                    >
            <div key={variation.id}>

                      <Input
                            disabled={checkView}

                      name="name_en"
                      defaultValue={variation.name_en}

                        onPressEnter={(e) => e.preventDefault()}
                        onChange={(e)=> handleChange_Variations(index_VARI,INDEX,e)}
           
                        placeholder="Please enter Product Name in English"
                      />
                      </div>
                    </Form.Item>
                    </div>
                    <div key={variation.id}>
                    <Form.Item
                      required
                      name="description_ar"
                      label="Description in Arabic"
                      style={{
                        display: "inline-block",
                        width: "calc(100% - 5px)",
                        marginRight: 8,
                      }}
                      // rules={[
                      //   ({ getFieldValue }) => ({
                      //     validator(_, value) {
                      //       const checkValidation = languageValidator(
                      //         value.toLowerCase(),
                      //         ARABIC_alpha
                      //       );
                      //       if (checkValidation) {
                      //         return Promise.resolve();
                      //       } else {
                      //         return Promise.reject(
                      //           "Please enter The Description in Arabic"
                      //         );
                      //       }
                      //     },
                      //   }),
                      // ]}
                    >
                      <div key={variation.id}>
                      <Input.TextArea
                            disabled={checkView}

                      name="description_ar"
                        placeholder="Enter the Description in Arabic"
                        onChange={(e)=> handleChange_Variations(index_VARI,INDEX,e)}
                        defaultValue={variation.description_ar}

                        rows={4}
                      />
                      </div>
                    </Form.Item>
                    </div>
           <div key={variation.id}>
                    <Form.Item
                      required
                      style={{
                        display: "inline-block",
                        width: "calc(100% - 5px)",
                        marginRight: 8,
                      }}
                      name="description_en"
                      label="Description in English"
                      // rules={[
                      //   ({ getFieldValue }) => ({
                      //     validator(_, value) {
                      //       const checkValidation = languageValidator(
                      //         value.toLowerCase(),
                      //         ENGLISH_ALPH
                      //       );
                      //       if (checkValidation) {
                      //         return Promise.resolve();
                      //       } else {
                      //         return Promise.reject(
                      //           "Please enter The Description in English"
                      //         );
                      //       }
                      //     },
                      //   }),
                      // ]}
                    >
            <div key={variation.id}>

                      <Input.TextArea
                            disabled={checkView}

                      name="description_en"
                        placeholder="Enter the Description in English"
                        onChange={(e)=> handleChange_Variations(index_VARI,INDEX,e)}
                        defaultValue={variation.description_en}

                        rows={4}
                      />
                      </div>
                    </Form.Item>
                    </div>
                    <div key={variation.id}>
                    <Form.Item
                      style={{
                        display: "inline-block",
                        width: "calc(100% - 5px)",
                      }}
                      required
                      name="name_en"
                      label="Price"
                      
                      hasFeedback
                      // rules={[
                      //   {
                      //     whitespace: true,
                      //   },
                      //   ({ getFieldValue }) => ({
                      //     validator(_, value) {
                      //       const checkValidation = languageValidator(
                      //         value.toLowerCase(),
                      //         ENGLISH_ALPH
                      //       );
                      //       if (checkValidation) {
                      //         return Promise.resolve();
                      //       } else {
                      //         return Promise.reject("Please enter The Name in English");
                      //       }
                      //     },
                      //   }),
                      // ]}
                    >
            <div key={variation.id}>

                      <Input
                      name="price"
                      addonAfter="EGP"
                        onPressEnter={(e) => e.preventDefault()}
                        onChange={(e)=> handleChange_Variations(index_VARI,INDEX,e)}
           defaultValue={variation.price}
                        placeholder="Please enter the Price"
                      />
                      </div>
                    </Form.Item>
                    </div>
                        </Col></Row>
                       
                        <Row gutter={16}>
              
              <Col xs={24} sm={24} md={24}>
                  <div key={dta.id} style={{display:"flex",justifyContent:"space-evenly"}}>
                    <span>Packages week_End days:</span>
                    {variation.weeks.map((ele,index_Variaton)=>{
                                  //  var x =`${INDEX}_${index}`
                       return   (
                                     <div style={{
                                       width: "56px",
                                       outline: "none",
                                       backgroundColor: "white",
                                       color: "black",
                                       border: "1px solid gray",
                                       borderRadius: "5px",
                                       height: "35px",
                                       textAlign: "center",
                                       cursor: "pointer"
                                       
                                     }} 
                                     className={ele.value}
                                      key={index_VARI}  
                                      id={`LEVEl_${variation.id}_${index_Variaton}`}
                                      
                                      value={ele.value}
                                     onClick={(e) => Choose_Day( index_VARI,e,INDEX)}
                                     
                                     >
                                       {ele.name}
                                     </div>
                            
                                         )
       
                    }
                  )}
                  
       
                  </div>
       
                     {variation.week_end.map((days,indexpack)=>(
                       <div key={index}>
                       <Form.Item
                    style={{
                      display: "inline-block",
                      width: "calc(100% - 5px)",
                    }}
                    
                    required
                    name="name_en"
                    label={days.day}
                    hasFeedback
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
                     //         return Promise.reject("Please enter The Price Numbers");
                     //       }
                     //     },
                     //   }),
                     // ]}
                  >
                    <div style={{marginTop:"7px"}} key={days.id}>
                    <Input
                    name="price"
                    disabled={checkView}

                    defaultValue={days.price}
                    addonAfter="EGP"
                      onPressEnter={(e) => e.preventDefault()}
                       onChange={(event) =>handleChange_Variations_Package(event,indexpack,index_VARI,INDEX) }
                      placeholder="Please enter Your Price"
                    />
                    </div>
                  </Form.Item>
                  </div>
                     ))}
                  
       
                 
                   
                      </Col></Row> </div>
                        
              ))}
               </div>
               <Form.Item style={{marginTop:"7px"}}>
                <Button
                  // disabled={orignalDetailesList?.length === detailsList.length}
                  type="dashed"
                  onClick={() => handleAddition(INDEX)}
                  className="w-100"
                >
                  <PlusOutlined /> Add Another Variations
                </Button>
              </Form.Item>
           
             </TabPane>   
              
          </Tabs>
        </div>
      </>
     )
    
     })}
     </div>
     
   
     </>

   
  );
}

export default VariationField;