import { Button, Form, notification, Tabs } from "antd";
import service from "auth/FetchInterceptor";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import Loading from "components/shared-components/Loading";
import { useFetch, useFetchSingle } from "hooks";
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import CheckUpsDetails from "views/app-views/apps/doctors/Forms/EditForm/EditCheckUp/CheckUpsDetails";
import GeneralField from "./GeneralField";
import Payment from './Payment_Methods'

const { TabPane } = Tabs;

const BEAUTY_CENTER_ID = 4;
const ProductForm = (props) => {
  const initalState = {
    name_ar: "",
    name_en: "",
    description_ar: "",
    description_en: "",
    beauty_center_id: null,
    main_image: null,
    images: [],
    price: null,
    tags: [],
    details: [],
  };
  const DEFAULT_DETAILS = [
    {
      id: 1,
      generic_detail_type_id: null,
      generic_detail_id: null,
    },
  ];

  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const { services } = useFetch("beautyCenters");
  const location = useLocation();
  const recordId = new URLSearchParams(location.search).get("id");
  const actionType = new URLSearchParams(location.search).get("name");
  const test = useFetchSingle(`beautyCenterServices/${recordId}`);
  const beautyCenterObj = test.services;
  const refetch = test.refetch;

  const isSuccess = test.isSuccess;
  const history = useHistory();
  const tags = useFetch("tags");
  const genericDetailes = useFetch(
    `genericDetailsProducts/${BEAUTY_CENTER_ID}`
  );
  const orignalDetailesList = genericDetailes.services;
  const detailIsSuccess = genericDetailes.isSuccess;
  const [buttonCheker, setButtonChecker] = useState(true);
  const [postObject, setPostObject] = useState(initalState);
  const tagsList = tags.services;
  const [genericDetailsList, setGenericDetials] = useState();
  const [detailsList, setDetailsList] = useState(DEFAULT_DETAILS);
  const [PayMentmethod,setPayMentmethod]=useState([])


  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      setPostObject({
        ...beautyCenterObj,
        tags: beautyCenterObj?.tags.map((element, index) => element.tag_id),
        // main_image: singleDress.main _image.split("/")[4],
      });
      // console.log("beautyCenterObj",beautyCenterObj)
      setPayMentmethod([...beautyCenterObj.beauty_center_payment_method])

      const cleanDetails = beautyCenterObj?.details?.map((element) => {
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
    for (const key in initalState) {
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
      await service.put(`/web/beautyCenterServices/${recordId}`, {
        ...postObject,
        main_image: postObject.main_image.split("/")[4]
          ? postObject.main_image.split("/")[4]
          : postObject.main_image,
      });
      setSubmitLoading(false);
      openNotificationWithIcon("success");
      refetch();

      history.push("beautyCenterServices");
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
                <h2 className="mb-3">Edit Product </h2>
                <div className="mb-3">
                  <Button
                    className="mr-2"
                    onClick={() => history.push("beautyCenterServices")}
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
                  setButtonChecker={setButtonChecker}
                />
              </TabPane>
              <TabPane tab="Details" key="2">
                <CheckUpsDetails
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
