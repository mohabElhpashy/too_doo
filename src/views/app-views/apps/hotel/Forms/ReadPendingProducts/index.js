import { Button, Form, notification, Tabs } from "antd";
import service from "auth/FetchInterceptor";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import Loading from "components/shared-components/Loading";
import { useFetch, useFetchSingle } from "hooks";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import WeddingHallDetails from "../EditWeddingHall/WeddingHallDetails";
import NewChanges from "./NewChanges";
import serviceId from "constants/ServiceIdConstants";
import WeddingExtraField from "../EditWeddingHall/WeddingExtraField";
import HelperComponent from "./HelperComponent";

const { TabPane } = Tabs;

const ProductForm = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const location = useLocation();

  const [postObject, setPostObject] = useState({
    changes: { information: {} },
    new: {},
    old: {
      name_ar: "",
      name_en: "",
      description_ar: "",
      description_en: "",
      dress_store_id: null,
      main_image: null,
      images: [],
      details: [],
      tags: [],
    },
  });

  // Store List
  const hotelListRes = useFetch("hotels");
  const tagsRes = useFetch("tags");
  const tagList = tagsRes.services;
  const hotelList = hotelListRes.services;
  const hotelListIsSuccess = hotelListRes.isSuccess;
  const recordId = new URLSearchParams(location.search).get("id");
  const genericDetailes = useFetch(
    `genericDetailsProducts/${serviceId.HOTEL_ID}`
  );
  const orignalDetailesList = genericDetailes.services;
  const detailIsSuccess = genericDetailes.isSuccess;
  const [genericDetailsList, setGenericDetials] = useState();

  useEffect(() => {
    setGenericDetials(orignalDetailesList);
  }, [detailIsSuccess]);
  const checkViewMode = new URLSearchParams(location.search).get("name");
  const { services, isFetching, isSuccess } = useFetchSingle(
    `weddingHall/changes/${recordId}`
  );

  const [variationList, setVariationList] = useState([
    {
      id: 0,
      price: null,
      purchase_type: "",
    },
  ]);

  const [detailsList, setDetailsList] = useState();
  const [newChanges, setNewChanges] = useState({
    tags: [],
  });
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      setNewChanges({
        ...services?.changes?.information,
        ...services?.changes,
      });

      setPostObject({
        ...services?.old,
        tags: services?.old?.tags.map((element, index) => element.tag_id),
        // main_image: services.main_image.split("/")[4],
      });
      setVariationList(services?.old?.variations);
      const cleanDetails = services?.old?.details?.map((element) => {
        return {
          id: element.id,
          generic_detail_type_id: element.parent_id,
          generic_detail_id: element.detail_id,
        };
      });

      setDetailsList(cleanDetails);
    }
  }, [isSuccess]);

  // Button Disabled
  return (
    <>
      {isSuccess && hotelListIsSuccess ? (
        <Form
          layout="vertical"
          form={form}
          name="advanced_search"
          className="ant-advanced-search-form"
          initialValues={{
            prefix: "+02",
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
                <h2 className="mb-3">Read Pending Product</h2>
                <div className="mb-3">
                  <Button
                    className="mr-2"
                    onClick={() => history.push("unApproved")}
                  >
                    Go Back
                  </Button>
                  {/* <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!buttonValidation() || checkViewMode === "view"}
                  loading={loading}
                >
                  Save
                </Button> */}
                </div>
              </Flex>
            </div>
          </PageHeaderAlt>
          <div className="container">
            <Tabs
              defaultActiveKey={postObject.new ? "1" : "2"}
              style={{ marginTop: 30 }}
            >
              {services.new && (
                <TabPane tab="New Changes" key="1">
                  <HelperComponent
                    newChange={true}
                    services={hotelList}
                    tagsList={tagList}
                    postObject={{
                      ...newChanges,
                      tags: newChanges?.tags.map((element) => element.tag_id),
                    }}

                    // setPostObject={setPostObject}
                    // postObject={postObject.changes.information}
                    // checkView={checkViewMode === "view"}
                  />
                </TabPane>
              )}
              <TabPane tab={postObject.new ? "Old Product" : "General"} key="2">
                <HelperComponent
                  services={hotelList}
                  tagsList={tagList}
                  postObject={postObject}
                  newChange={false}
                />
              </TabPane>
              <TabPane tab="Details" key="3">
                <WeddingHallDetails
                  postObject={postObject}
                  setPostObject={setPostObject}
                  orignalDetailesList={orignalDetailesList}
                  detailsList={detailsList}
                  setDetailsList={setDetailsList}
                  genericDetailsList={genericDetailsList}
                  setGenericDetials={setGenericDetials}
                  checkView={true}
                />
              </TabPane>
              <TabPane tab="Variation" key="4">
                <WeddingExtraField
                  checkView={true}
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
