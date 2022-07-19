import {
  Card,
Col,
DatePicker,
Form,
Input,
Modal,
Row,
Select,
Table,
Upload,
message,
notification,
Button
} from "antd";import service from "auth/FetchInterceptor";
import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import CustomIcon from "components/util-components/CustomIcon";

import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import { useFetch, useFetchSingle } from "hooks";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
// import DressVariationField from "./DressVariationField";
import GeneralField from "./GeneralField";
import Loading from "components/shared-components/Loading";
import { ImageSvg } from "assets/svg/icon";

const DEFAULT_DETAILS = [
  {
    id: 1,
    generic_detail_type_id: null,
    generic_detail_id: null,
  },
];

const ProductForm = (props) => {
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const { services } = useFetch("dressStore");
  const history = useHistory();
  const tags = useFetch("tags");
  // const genericDetailes = useFetch(`genericDetailsProducts/${DRESS_ID}`);

  const [buttonCheker, setButtonChecker] = useState(true);

  
                 
  const location = useLocation();
  const recordId = new URLSearchParams(location.search).get("id");
  const actionType = new URLSearchParams(location.search).get("name");
  const getSingleBanner = useFetchSingle(`targetType/${recordId}`);

  const singeltarget = getSingleBanner.services;
  console.log("single banner",singeltarget)

  const refetch = getSingleBanner.refetch;
  const isSuccess = getSingleBanner.isSuccess;
  
  // console.log("mohab",singleDress)
  const [postObject, setPostObject] = useState({value:""});
  const { Dragger } = Upload;



  
 
  

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Process Feedback",
      description: "Your Process has been Done",
    });
  };

  const onFinish = async (postObject) => {
    const show_in={
      show_in:postObject.value
    }
    setSubmitLoading(true);
console.log("moahsdhasdh",show_in)
    try {
    
      await service.put(`web/targetType/${recordId}`,
      show_in
      ).then(res=>console.log("my response"))
      setSubmitLoading(false);
      refetch();
      openNotificationWithIcon("success");
      history.push("targetType");
    } catch (error) {
      setSubmitLoading(false);
    }
    console.log("test",postObject)
  };
  return (
    <>
      {isSuccess ? (
        <Form
          layout="vertical"
          form={form}
          name="advanced_search"
          onFinish={() => {
            onFinish(postObject);
          }}
          onSubmitCapture={(e) => {
            e.preventDefault();
          }}
          className="ant-advanced-search-form"
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
                  {actionType === "view" ? "Read Target Types" : "Edit Target Types"}
                </h2>
                <div className="mb-3">
                  <Button
                    className="mr-2"
                    onClick={() => history.push("targetType")}
                  >
                    Discard
                  </Button>
                  <Button
                    type="primary"
                    disabled={
                      
                      actionType === "view"
                    }
                    // onClick={() =>
                    //   setPostObject({
                    //     ...postObject,
                    //     variations: variationList,
                    //     details: detailsList.map(
                    //       (element) => element.generic_detail_id
                    //     ),
                    //   })
                    // }
                    htmlType="submit"
                    loading={submitLoading}
                  >
                    Save
                  </Button>
                </div>
              </Flex>
            </div>
          </PageHeaderAlt>
          <div className="container" style={{marginTop:83}}>
         <GeneralField singeltarget={singeltarget} checkViewMode={actionType} setPostObject={setPostObject}/>
          </div>
        </Form>
      ) : (
        <Loading cover="content" align={"center"} loading={true} />
      )}
    </>
  );
};

export default ProductForm;
