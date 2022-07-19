import { Button, Form, Tabs } from "antd";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import Loading from "components/shared-components/Loading";
import serviceId from "constants/ServiceIdConstants";
import { useFetch, useFetchSingle } from "hooks";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import TripDetails from "../EditForms/EditTrip/TripDetails";
import TripVariationField from "../EditForms/EditTrip/TripVariationField";
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
      traveling_agency_id: null,
      main_image: null,
      images: [],
      tags: [],
      details: [],
    },
  });

  // Store List
  const dressStoreRes = useFetch("dressStore");
  const tagsRes = useFetch("tags");
  const tagList = tagsRes.services;
  const dressSoreList = dressStoreRes.services;
  const dressSoreListSuccess = dressStoreRes.isSuccess;
  const recordId = new URLSearchParams(location.search).get("id");
  const genericDetailes = useFetch(
    `genericDetailsProducts/${serviceId.TRIP_ID}`
  );
  const orignalDetailesList = genericDetailes.services;
  const detailIsSuccess = genericDetailes.isSuccess;
  const [genericDetailsList, setGenericDetials] = useState();

  useEffect(() => {
    setGenericDetials(orignalDetailesList);
  }, [detailIsSuccess]);
  const { services, isSuccess } = useFetchSingle(`trip/changes/${recordId}`);

  //Handle Notification
  // const test2 = Object.keys(postObject.changes?.information);
  // const test1 = Object.keys(postObject?.changes);

  // for (const key in postObject.changes) {
  // }
  // const totalLength = test2.length + test1.length - 1;
  // const dummyArray = Array.from({ length: totalLength });
  // const arrayyyy = Object.values(finalObjectForm);
  const [variationList, setVariationList] = useState([
    {
      price: null,
      number_of_days: "",
      description_ar: "",
      description_en: "",
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
      {isSuccess && dressSoreListSuccess ? (
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
                    services={dressSoreList}
                    tagsList={tagList}
                    // postObject={{
                    //   name_ar: "Konafa",
                    //   name_en: "Bateeee5",
                    //   variation: [
                    //     { id: 1, name: "rent", price: "4500" },
                    //     { id: 2, name: "sale", price: "7000" },
                    //   ],
                    //   details: [
                    //     { id: 1, name: "rent", price: "4500" },
                    //     { id: 2, name: "sale", price: "7000" },
                    //   ],
                    //   images: [
                    //     {
                    //       id: 123,
                    //       image:
                    //         "https://images.unsplash.com/photo-1598128558393-70ff21433be0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=789&q=80",
                    //     },
                    //     {
                    //       id: 111,
                    //       image:
                    //         "https://images.unsplash.com/photo-1598128558393-70ff21433be0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=789&q=80",
                    //     },
                    //   ],
                    //   main_image:
                    //     "https://images.unsplash.com/photo-1598128558393-70ff21433be0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=789&q=80",
                    // }}
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
                  services={dressSoreList}
                  tagsList={tagList}
                  postObject={postObject}
                  newChange={false}
                />
              </TabPane>
              <TabPane tab="Details" key="3">
                <TripDetails
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
                <TripVariationField
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
