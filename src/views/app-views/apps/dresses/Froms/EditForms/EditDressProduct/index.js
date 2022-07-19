import { Button, Form, notification, Tabs } from "antd";
import service from "auth/FetchInterceptor";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import { useFetch, useFetchSingle } from "hooks";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import DressVariationField from "./DressVariationField";
import GeneralField from "./GeneralField";
import Loading from "components/shared-components/Loading";
import DressDetails from "./DressDetails";
const { TabPane } = Tabs;
const DEFAULT_DETAILS = [
  {
    id: 1,
    generic_detail_type_id: null,
    generic_detail_id: null,
  },
];

const DRESS_ID = 7;
const ProductForm = (props) => {
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const { services } = useFetch("dressStore");
  const history = useHistory();
  const tags = useFetch("tags");
  const genericDetailes = useFetch(`genericDetailsProducts/${DRESS_ID}`);
  const orignalDetailesList = genericDetailes.services;
  const detailIsSuccess = genericDetailes.isSuccess;
  const [buttonCheker, setButtonChecker] = useState(true);

  const [genericDetailsList, setGenericDetials] = useState();
  const tagsList = tags.services;
  const location = useLocation();
  const recordId = new URLSearchParams(location.search).get("id");
  const actionType = new URLSearchParams(location.search).get("name");
  const getSingleDress = useFetchSingle(`dress/${recordId}`);
  const singleDress = getSingleDress.services;
  const refetch = getSingleDress.refetch;
  const isSuccess = getSingleDress.isSuccess;
  const [variationList, setVariationList] = useState([
    // {
    //   id: 0,
    //   price: null,
    //   purchase_type: "",
    // },
  ]);
  const INITAL_STATE = {
    name_ar: "",
    name_en: "",
    description_ar: "",
    description_en: "",
    dress_store_id: null,
    color: "#e42525",
    main_image: null,
    handmade: false,
    with_accessories: false,
    with_veil: false,
    with_modification: false,
    images: [],
    details: [],
    tags: [],
  };
  const DISABLE_OBJ = {
    name_ar: "",
    name_en: "",
    description_ar: "",
    description_en: "",
    dress_store_id: null,
    color: "#e42525",
    images: [],
    details: [],
    tags: [],
  };
  const [postObject, setPostObject] = useState(INITAL_STATE);
  const [detailsList, setDetailsList] = useState(DEFAULT_DETAILS);
  const [PayMentmethod,setPayMentmethod]=useState([])


  useEffect(() => {
    setGenericDetials(orignalDetailesList);
  }, [detailIsSuccess]);
  const buttonValidation = () => {
    let count = 0;
    for (const key in DISABLE_OBJ) {
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
  const variationButtonValidation = () => {
    let varationChecker;
    const variationCheckerr = variationList.find(
      (element) => !element.price || !element.purchase_type
    );
    if (variationCheckerr) {
      varationChecker = false;
    } else {
      varationChecker = true;
    }
    return varationChecker;
    // for (const key in variationList) {
    //   if (!variationList[key]) {
    //     count++;
    //   }
    // }
  };
  // console.log("singleDress",singleDress)
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      console.log("To work",singleDress)
      setPostObject({
        ...singleDress,
        tags: singleDress?.tags.map((element, index) => element.tag_id),
        // main_image: singleDress.main_image.split("/")[4],
      });
      // setPayMentmethod([...singleCar.car_payment_method])
      setVariationList(singleDress.variations.map((ele)=>(
        {id:ele.id,
          price:ele.price,
          purchase_type:ele.purchase_type,
          payment_methods:ele.payment_method_variation
        }
      )));
      const cleanDetails = singleDress?.details?.map((element) => {
        return {
          id: element.id,
          generic_detail_type_id: element.parent_id,
          generic_detail_id: element.detail_id,
        };
      });

      setDetailsList(cleanDetails);
    }
  }, [isSuccess]);

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
      await service.put(`/web/dress/${recordId}`, {
        ...postObject,
        main_image: postObject.main_image.split("Dress/")[1]
          ? postObject.main_image.split("Dress/")[1]
          : postObject.main_image,
      });
      setSubmitLoading(false);
      refetch();
      openNotificationWithIcon("success");
      history.push("dress");
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
                  {actionType === "view" ? "Read Dress" : "Edit Dress"}
                </h2>
                <div className="mb-3">
                  <Button
                    className="mr-2"
                    onClick={() => history.push("dress")}
                  >
                    Discard
                  </Button>
                  <Button
                    type="primary"
                    disabled={
                      !buttonValidation() ||
                      !detailsButtonValidation() ||
                      !variationButtonValidation() ||
                      detailsList.length === 0 ||
                      !buttonCheker ||
                      actionType === "view"
                    }
                    onClick={() =>
                      setPostObject({
                        ...postObject,
                        variations: variationList,
                        details: detailsList.map(
                          (element) => element.generic_detail_id
                        ),
                      })
                    }
                    htmlType="submit"
                    loading={submitLoading}
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
                  checkView={actionType === "view"}
                  postObject={postObject}
                  setPostObject={setPostObject}
                  setButtonChecker={setButtonChecker}
                />
              </TabPane>
              <TabPane tab="Details" key="2">
                <DressDetails
                  postObject={postObject}
                  setPostObject={setPostObject}
                  variationList={variationList}
                  setVariationList={setVariationList}
                  orignalDetailesList={orignalDetailesList}
                  detailsList={detailsList}
                  setDetailsList={setDetailsList}
                  genericDetailsList={genericDetailsList}
                  setGenericDetials={setGenericDetials}
                  checkView={actionType === "view"}
                />
              </TabPane>
              <TabPane tab="Variation" key="3">
                <DressVariationField
                  checkView={actionType === "view"}
                  postObject={postObject}
                  setPostObject={setPostObject}
                  variationList={variationList}
                  setVariationList={setVariationList}
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
