import { Button, Form, message, notification, Tabs } from "antd";
import service from "auth/FetchInterceptor";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import { useFetch } from "hooks";
import React, { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import GeneralField from "./General";
import Variations from './Variations'

const { TabPane } = Tabs;

const ADD = "ADD";

const ProductForm = (props) => {
  const [requestedData, setRequestedData] = useState({
    service: [],
    store: [],
    product: [],
  });
  const { mode = ADD } = props;
  const { services } = useFetch("services");
  const emptyState = {
   
    ServiceName:"",
    service_id:"",
    product_id:""
    
  };

  const initalState = emptyState;

  const inialOperations = {
    service_id: null,
    store_id: null,
    product_id: null,
    image_URL:"",
    image:"",
    duration:""

  };
 
  const [postObject, setPostObject] = useState({
    service_id: null,
    product_id: null,
    image_URL:"",
    image:"",
    duration:"",
    link: "",
    link_URL:""

  });
  const [variationList, setVariationList] = useState(
    {
  
      price: null,
      reservation_date: "",
    },
  );
  const [PRODUCT, setPRODUCT] = useState({name_en:"",name_ar:""});
const [ALL_Products,setALL_Products]=useState()
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
   const [StoreList,setStoreList]=useState([])
   const[ Postobject,setPostobject]=useState({
    wedding_hall_variation_id:""
   })
   const[VARIATIONS,setVARIATIONS]=useState([])
 

  const history = useHistory();
  
useEffect(async()=>{
  try {
    const data = await service.get(`web/stores/2`);
    setStoreList(data.data);
    
  } catch (error) {
    <h2>{error}</h2>;
  }
},[])

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Process Feedback",
      description: "Your Process has been Done",
    });
  };
 
  const onFinish =     async() => {
    const data={
      ...variationList,

      ...Postobject
    }
    console.log("from my idex=>>>>>>>>>",data)
    
     
    
    // var data['videos'] = videos;
   
  
   try {
      await service.post("/web/weddingSpecialDates", data);
      openNotificationWithIcon("success");
      history.push("ListSpecial_date");
      setSubmitLoading(false);
    } catch (error) {
      setSubmitLoading(false);
    }
  };
 
   
  // console.log("main oob=>",postObject)
  // console.log("main oob=>",operations)
  return (
    <>
      <Form
        layout="vertical"
        form={form}
        // onSubmitCapture={(e) => {
        //   // e.preventDefault();
        //   onFinish();
        // }}
        name="advanced_search"
        className="ant-advanced-search-form"
        initialValues={{
          heightUnit: "cm",
          widthUnit: "cm",
          weightUnit: "kg",
        }}
      >
        <PageHeaderAlt className="border-bottom" overlap>
          <div className="container">
            <Flex
              className="py-2"
              mobileFlex={false}
              justifyContent="between"
              alignItems="center"
            >
              <h2 className="mb-3">
                {mode === "ADD" ? "Add New Record" : `Edit Record`}{" "}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() => history.push("ListSpecial_date")}
                >
                  Discard
                </Button>
               { variationList.price=="" ||	variationList.reservation_date==""?
                <Button
                type="primary"
                // htmlType="submit"
                loading={submitLoading}
                disabled
                
                onClick={
                  // () =>
                  // setPostObject({
                  //   ...postObject,
                  //   products: [...currentPackage],
                  //   number_of_items: currentPackage.length,
                  // })
                  onFinish
                }
              >
                {mode === "ADD" ? "Add" : `Save`}
              </Button>:
               <Button
               type="primary"
               // htmlType="submit"
               loading={submitLoading}
               onClick={
                 // () =>
                 // setPostObject({
                 //   ...postObject,
                 //   products: [...currentPackage],
                 //   number_of_items: currentPackage.length,
                 // })
                 onFinish
               }
             >
               {mode === "ADD" ? "Add" : `Save`}
             </Button>}
               
              </div>
            </Flex>
          </div>
        </PageHeaderAlt>
        <div className="container">
          <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
            <TabPane tab="General" key="1">
              <GeneralField
               setPRODUCT={setPRODUCT}
               PRODUCT={PRODUCT}
               StoreList={StoreList}
               Postobject={Postobject}
               setPostobject={setPostobject}
               VARIATIONS={VARIATIONS}
               setVARIATIONS={setVARIATIONS}
              />
            </TabPane>
            {Postobject.wedding_hall_variation_id? <TabPane tab="Variations" key="2">
              <Variations
               setPRODUCT={setPRODUCT}
               PRODUCT={PRODUCT}
               StoreList={StoreList}
               Postobject={Postobject}
               setPostobject={setPostobject}
               variationList={variationList}
                setVariationList={setVariationList}
              />
            </TabPane>:null}
           
 
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default ProductForm;
