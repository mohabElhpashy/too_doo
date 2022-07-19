import { Button, Form, message, notification, Tabs } from "antd";
import service from "auth/FetchInterceptor";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
// import { useFetch } from "hooks";
import React, { useState,useEffect } from "react";
import { useHistory,useLocation } from "react-router-dom";
import GeneralField from "./GeneralField";
import { useFetch, useFetchSingle } from "hooks";
import Loading from "components/shared-components/Loading";


// import Videos from './Upload_videos'

const { TabPane } = Tabs;

const ADD = "ADD";

const ProductForm = (props) => {
   // const tags = useFetch("tags");
  // const tagsList = tags.services;
  const location = useLocation();
  const recordId = new URLSearchParams(location.search).get("id");
  const actionType = new URLSearchParams(location.search).get("name");
  const getSingleCompetition = useFetchSingle(`services/${recordId}`);
  const single_true_view = getSingleCompetition.services;
  const isSuccess = getSingleCompetition.isSuccess;
  const refetch = getSingleCompetition.refetch;
  
  const [submitLoading, setSubmitLoading] = useState(false);

  const { mode = ADD } = props;
    
  const [postObject, setPostObject] = useState({
    // name_ar:"",
    // name_en:"",
    icon:"",
    iconsURL:"",
    name_en:"",
    name_ar:""

  });
    const [form] = Form.useForm();
 

  const history = useHistory();
  console.log("postObject",postObject)


  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Process Feedback",
      description: "Your Process has been Done",
    });
  };
 useEffect(()=>{
if(isSuccess)
{
  form.resetFields();

  setPostObject( {
    name_en:single_true_view.name_en,
    name_ar:single_true_view.name_ar,

    iconsURL:single_true_view.icon}
   )
}
 },[isSuccess])

  const onFinish =     async() => {
    // console.log("from my idex=>>>>>>>>>",postObject)
     
 
   try {
      await service.put(`/web/services/${recordId}`,postObject );
      openNotificationWithIcon("success");
      history.push("ListOFService");
      setSubmitLoading(false);
    } catch (error) {
      setSubmitLoading(false);
    }
  };
 
  
  // console.log("main oob=>",postObject)
  // console.log("main oob=>",operations)
  return (
    <>
    {isSuccess ? (
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
                  onClick={() => history.push("ListOFService")}
                >
                  Discard
                </Button>
               { postObject.name_ar=="" ||	postObject.name_en==""||postObject.icon==""?
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
      </Form> ) : (
        <Loading cover="content" align={"center"} loading={true} />
      )}
    </>
  );
};

export default ProductForm;
