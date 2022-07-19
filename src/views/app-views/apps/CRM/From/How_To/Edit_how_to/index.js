import { Button, Form, message, notification, Tabs } from "antd";
import service from "auth/FetchInterceptor";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
// import { useFetch } from "hooks";
import React, { useState,useEffect } from "react";
import { useHistory,useLocation } from "react-router-dom";
import GeneralField from "./GeneralField";
import { useFetch, useFetchSingle } from "hooks";

// import Videos from './Upload_videos'

const { TabPane } = Tabs;

const ADD = "ADD";

const ProductForm = (props) => {
   // const tags = useFetch("tags");
  // const tagsList = tags.services;
  const location = useLocation();
  const recordId = new URLSearchParams(location.search).get("id");
  const actionType = new URLSearchParams(location.search).get("name");
  const getSingleCompetition = useFetchSingle(`howTo/${recordId}`);
  const single_true_view = getSingleCompetition.services;
  const isSuccess = getSingleCompetition.isSuccess;
  const refetch = getSingleCompetition.refetch;
  const [requestedData, setRequestedData] = useState({
    service: [],
    store: [],
    product: [],
  });
  const [submitLoading, setSubmitLoading] = useState(false);

  const { mode = ADD } = props;
  const { services } = useFetch("services");
   
  const [postObject, setPostObject] = useState({
    service_id:"",
    video_url:"",
    link_URL:""

  });
    const [form] = Form.useForm();
 

  const history = useHistory();
  


  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Process Feedback",
      description: "Your Process has been Done",
    });
  };
 useEffect(()=>{
if(isSuccess)
{
  setPostObject(single_true_view)
}
 },[])

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
                
                setPostObject={setPostObject}
                category={services}
                checkView={actionType === "view"}

                postObject={postObject}
             

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
