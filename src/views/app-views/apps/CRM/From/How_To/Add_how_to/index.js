import { Button, Form, message, notification, Tabs } from "antd";
import service from "auth/FetchInterceptor";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import { useFetch } from "hooks";
import React, { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import GeneralField from "./GeneralField";
// import Videos from './Upload_videos'

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
  const productss={
    product_id: null,
    variation_id: null,


  }
  const [postObject, setPostObject] = useState({
    service_id:"",
    video_url:"",
    link_URL:""

  });
  const [PRODUCT, setPRODUCT] = useState(productss);
const [ALL_Products,setALL_Products]=useState()
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [currentPackage, setPackage] = useState([]);
  const [listofStores, setStoreList] = useState([]);
  const [productList, setProductList] = useState([]);

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
    // console.log("from my idex=>>>>>>>>>",postObject)
     
 
   try {
      await service.post("/web/product_videos/addVideoTrueView", postObject);
      openNotificationWithIcon("success");
      history.push("HOW_TO");
      setSubmitLoading(false);
    } catch (error) {
      setSubmitLoading(false);
    }
  };
 
  useEffect(async () => {
    

    if (postObject.service_id) {
      try {
        const data = await service.get(`web/stores/${postObject.service_id}`);
        setStoreList(data.data);
      } catch (error) {
        <h2>{error}</h2>;
      }
    }
    
  }, [postObject.service_id,postObject.name_en,PRODUCT]);
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
                  onClick={() => history.push("HOW_TO")}
                >
                  Discard
                </Button>
               { postObject.service_id=="" ||	postObject.link_URL==""?
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
                setPackage={setPackage}
                currentPackage={currentPackage}
                category={services}
                listofStores={listofStores}
                setPostObject={setPostObject}
                
               
                postObject={postObject}
                setRequestedData={setRequestedData}
                requestedData={requestedData}
                operations={operations}
                setOperation={setOperation}
                inialOperations={inialOperations}
                setProductList={setProductList}
                setALL_Products={setALL_Products}

              />
            </TabPane>
            {/* <TabPane tab="Add Video" key="2">
              <Videos
                setPackage={setPackage}
                currentPackage={currentPackage}
                category={services}
                listofStores={listofStores}
                setPostObject={setPostObject}
                
                setPRODUCT={setPRODUCT}
                PRODUCT={PRODUCT}
                postObject={postObject}
                setRequestedData={setRequestedData}
                requestedData={requestedData}
                operations={operations}
                setOperation={setOperation}
                inialOperations={inialOperations}
                setProductList={setProductList}
                setALL_Products={setALL_Products}

              />
            </TabPane> */}
            {/* <TabPane tab="Variation" key="2">
              <VariationField />
            </TabPane>
            */}
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default ProductForm;
