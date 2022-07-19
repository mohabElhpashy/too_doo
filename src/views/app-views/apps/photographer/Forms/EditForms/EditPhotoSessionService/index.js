import { Button, Form, notification, Tabs } from "antd";
import service from "auth/FetchInterceptor";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import Loading from "components/shared-components/Loading";
import { useFetch, useFetchSingle } from "hooks";
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import GeneralField from "./GeneralField";
import PhotoDetails from "./PhotoDetails";
import Payment from './Payment_Methods'

const { TabPane } = Tabs;
const DEFAULT_DETAILS = [
  {
    id: 1,
    generic_detail_type_id: null,
    generic_detail_id: null,
  },
];

const ProductForm = () => {
  const initalState = {
    name_ar: "",
    name_en: "",
    description_ar: "",
    description_en: "",
    photographer_id: null,
    main_image: null,
    images: [],
    providing_video: false,
    price: null,
    tags: [],
    details: [],
  };
  const DISABLEOBJECT = {
    name_ar: "",
    name_en: "",
    description_ar: "",
    description_en: "",
    photographer_id: null,
    main_image: null,
    images: [],
    price: null,
    tags: [],
    details: [],
  };

  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const { services } = useFetch("photographer");
  const location = useLocation();
  const recordId = new URLSearchParams(location.search).get("id");
  const actionType = new URLSearchParams(location.search).get("name");
  const test = useFetchSingle(`photosession/${recordId}`);
  const photoSessionObj = test.services;
  const refetch = test.refetch;

  const isSuccess = test.isSuccess;
  const history = useHistory();
  const tags = useFetch("tags");

  const genericDetailes = useFetch(`genericDetailsProducts/5`);
  const orignalDetailesList = genericDetailes.services;
  const detailIsSuccess = genericDetailes.isSuccess;
  const [genericDetailsList, setGenericDetials] = useState();
  const [detailsList, setDetailsList] = useState(DEFAULT_DETAILS);

  const [buttonCheker, setButtonChecker] = useState(true);
  const [postObject, setPostObject] = useState(initalState);
  const [PayMentmethod,setPayMentmethod]=useState([])

  const tagsList = tags.services;

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      setPostObject({
        ...photoSessionObj,
        tags: photoSessionObj?.tags.map((element, index) => element.tag_id),
        // main_image: singleDress.main _image.split("/")[4],
      });
      console.log("photoSessionObj",photoSessionObj)
      setPayMentmethod([...photoSessionObj.photo_session_payment_method])

      const cleanDetails = photoSessionObj?.details?.map((element) => {
        return {
          id: element.id,
          generic_detail_type_id: element.parent_id,
          generic_detail_id: element.detail_id,
        };
      });

      setDetailsList(cleanDetails);
    }
  }, [isSuccess]);
  useEffect(() => {
    setGenericDetials(orignalDetailesList);
  }, [detailIsSuccess]);
  const buttonValidation = () => {
    let count = 0;
    for (const key in DISABLEOBJECT) {
      if (!postObject[key]) {
        count++;
      }
      if (
        !postObject[key] ||
        postObject["tags"].length === 0 ||
        postObject["images"].length === 0
      ) {
        count++;
      }
    }
    if (count == 0) {
      return true;
    } else {
      return false;
    }
  };
  const detailsButtonValidation = () => {
    let detail;
    const detailsChecker = detailsList.find(
      (element) =>
        element.generic_detail_id === null ||
        element.generic_detail_type_id === null
    );
    if (detailsChecker) {
      detail = false;
    } else {
      detail = true;
    }
    return detail;
    // for (const key in variationList) {
    //   if (!variationList[key]) {
    //     count++;
    //   }
    // }
  };

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Process Feedback",
      description: "Your Process has been Done",
    });
  };

  const onFinish = async (postObject) => {
    setSubmitLoading(true);

    try {
      const data = new FormData();
      for (const key of Object.keys(postObject)) {
        data.append(key, postObject[key]);
      }
      await service.put(`/web/photosession/${recordId}`, {
        ...postObject,
        main_image: postObject.main_image.split("/")[4]
          ? postObject.main_image.split("/")[4]
          : postObject.main_image,
      });
      refetch();
      setSubmitLoading(false);
      openNotificationWithIcon("success");
      history.push("photoSession");
    } catch (error) {
      setSubmitLoading(false);
    }
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
                  {actionType === "view" ? "Read Product" : "Edit Product"}
                </h2>
                <div className="mb-3">
                  <Button
                    className="mr-2"
                    onClick={() => history.push("photoSession")}
                  >
                    Discard
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={submitLoading}
                    onClick={() =>
                      setPostObject({
                        ...postObject,
                        paymentMethods:PayMentmethod,

                        details: detailsList.map(
                          (element) => element.generic_detail_id
                        ),
                      })
                    }
                    disabled={
                      !buttonValidation() ||
                      !detailsButtonValidation() ||
                      detailsList.length === 0 ||
                      !buttonCheker ||
                      actionType === "view"
                    }
                  >
                    Save
                  </Button>
                </div>
              </Flex>
            </div>
          </PageHeaderAlt>
          <div className="container">
            <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
              <TabPane tab="General" key="1">
                <GeneralField
                  services={services}
                  tagsList={tagsList}
                  postObject={postObject}
                  setPostObject={setPostObject}
                  checkView={actionType == "view"}
                />
              </TabPane>
              <TabPane tab="Details" key="2">
                <PhotoDetails
                  postObject={postObject}
                  setPostObject={setPostObject}
                  orignalDetailesList={orignalDetailesList}
                  detailsList={detailsList}
                  setDetailsList={setDetailsList}
                  genericDetailsList={genericDetailsList}
                  setGenericDetials={setGenericDetials}
                  checkView={actionType === "view"}
                />
              </TabPane>
              <TabPane tab="Payment Methods" key="3">
              <Payment
                postObject={postObject}
                setPostObject={setPostObject}
                checkView={actionType === "view"}
                PayMentmethod={PayMentmethod}
                setPayMentmethod={setPayMentmethod}
                services={services}
              />
            </TabPane>
            </Tabs>
          </div>
        </Form>
      ) : (
        <Loading cover="content" align={"center"} loading={true} />
      )}
    </>
  );
};

export default ProductForm;
