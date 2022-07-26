import { Button, Form, message, notification, Tabs } from "antd";
import service from "auth/FetchInterceptor";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import { useFetch } from "hooks";
import React, { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import Banner from "views/app-views/components/feedback/alert/Banner";
import GeneralField from "./GeneralField";

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
    
    arb_img: "",
    eng_img: "",
    eng_img_URL: "",
    arb_img_URL: "",
    
  };

  const initalState = emptyState;

  const inialOperations = {
    service_id: null,
    store_id: null,
    product_id: null,
    new_price: 0,
    product_name: null,
    Discount:"",
    total_capacity:null,
    available_from:null,
    available_to:null,
    name_en: "",
    name_ar: "",
    name_en_URL: "",
    name_ar_URL: "",


  

  };
 
  const [postObject, setPostObject] = useState(initalState);
const [ALL_Products,setALL_Products]=useState()
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [currentPackage, setPackage] = useState([]);
  const [listofStores, setStoreList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [ALLL,setALLL]=useState(
    {name_ar:"",name_en:"",type:"",banner_media_id:"",reference:"",screen_id:"",screen_service_id:"",types:null})
    

  const history = useHistory();
  const [operations, setOperation] = useState(inialOperations);
  const [state,setstate]=useState([])
  const main_array=[]


  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Process Feedback",
      description: "Your Process has been Done",
    });
  };
 
  const onFinish =     async() => {
    const POSTOBJECT=ALLL
    console.log("POSTOBJECT",POSTOBJECT.types)

   try {
      await service.post("/web/banners", POSTOBJECT).then(res=>console.log("my res",res));
      openNotificationWithIcon("success");
      history.push("Banner");
      setSubmitLoading(false);
    } catch (error) {
      setSubmitLoading(false);
    }
  };
 
//  useEffect(()=>{
// console.log("my my my my my ",ALLL)
//  },[ALLL])

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
              {/* { ALLL.types[0].start_date=="" ||	ALLL.types[0].end_date==""?
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
             </Button>} */}
                <Button
                  className="mr-2"
                  onClick={() => history.push("Banner")}
                >
                  Discard
                </Button>
               
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
                </Button>
              </div>
            </Flex>
          </div>
        </PageHeaderAlt>
       <GeneralField
    ALLL={ALLL}setALLL={setALLL}
       />
      </Form>
    </>
  );
};

export default ProductForm;
