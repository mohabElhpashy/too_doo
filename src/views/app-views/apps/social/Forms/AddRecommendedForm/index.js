import {
  Button,
  Form,
  message,
  Modal,
  notification,
  Rate,
  Select,
  Table,
  Upload,
} from "antd";
import service from "auth/FetchInterceptor";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const STANDARD_SERVICES = [
  { id: 2, name: "Car", serviceId: 1 },
  { id: 3, name: "Hotel", serviceId: 2 },
  { id: 4, name: "Doctors", serviceId: 3 },
  { id: 5, name: "Beauty Centers", serviceId: 4 },
  { id: 6, name: "Photographers", serviceId: 5 },
  { id: 7, name: "Trips", serviceId: 6 },
  { id: 8, name: "Dresses", serviceId: 7 },
  { id: 9, name: "Makeup Artistes", serviceId: 8 },
];
const ProductForm = () => {
  const [visable, setVisable] = useState(true);
  const history = useHistory();
  const [singleImage, setSingleImage] = useState("");

  const [paginationn, setPagenation] = useState({});
  const [loadingValidation, setLoading] = useState(false);
  const [sumbitLoading, setSumbitLoading] = useState(false);
  // const [perviouseState, setPreviouse] = useState(1);
  const [postObject, setPostObject] = useState({
    service_id: null,
    model_id: null,
  });
  // const [producsList, setProductsList] = useState([]);
  // useEffect(() => {
  //   if (
  //     paginationn?.data?.find(
  //       (element) => element.id === postObject.model_id
  //     ) === undefined
  //   ) {
  //     setPostObject({ ...postObject, model_id: null });
  //   }
  // }, [paginationn]);
  const handleChange = async (currentObj) => {
    // console.log("m y tags",`${currentObj.path}?page=${currentObj.current}`)
    const data = await service.get(
      `${currentObj.path}?page=${currentObj.current}`
    );
    setPagenation(data.records);
  };
  const col = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "name_en",
      key: "name_en",
      sorter: (a, b) => a.name_en.length - b.name_en.length,
    },
    {
      title: "Main Image ",
      dataIndex: "main_image",
      key: "main_image",
      render: (text, obj) => {
        return (
          <Upload
            disabled={true}
            // fileList={props?.postObject?.images}
            fileList={[
              {
                uid: obj.id,
                name: obj.name_en,
                status: "done",
                url: obj.main_image,
              },
            ]}
            onPreview={(t) => setSingleImage(obj.main_image)}
            listType="picture-card"
          />
        );
      },
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rate) => (
        <Rate
          allowHalf
          disabled
          style={{ fontSize: 16 }}
          defaultValue={parseFloat(rate)}
        />
      ),
      sorter: (a, b) => a.raiting - b.rating,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price} EGP`,
      sorter: (a, b) => a.price - b.price,
    },
  ];
  //Handle Notification
  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Process Feedback",
      description: "Your Process has been Done Successfully!",
    });
  };

  // Button Disabled
  const onOkSubmit = async () => {
    const key = "updatable";
    message.loading({ content: "Loading...", key, duration: 15 });
    setLoading(true);
    try {
      const data = await service.get(
        `/web/productsByService/${postObject?.service_id}`
      );
      message.success({ content: "Done!", key, duration: 2 });
      setPagenation(data.records);
      // setProductsList(data.records.data);
      setVisable(false);
      setLoading(false);
    } catch (error) {
      message.error({ content: "Error Occured!", key, duration: 2 });
      setLoading(false);
    }
  };
  const rowSelection = {
    onChange: (modual_id) => {
      console.log("pagi",modual_id[0])
      setPostObject({ ...postObject, model_id: modual_id[0] });
    },
  };
  const buttonValidation = () => {
    let count = 0;
    for (const key in postObject) {
      if (!postObject[key]) {
        count++;
      }
    }
    if (count == 0) {
      return true;
    } else {
      return false;
    }
  };

  // const onFinish = async (postObject) => {
  //   setLoading(true);
  //   try {
  //     await service.post(`/web/privacyPolicy`, postObject);
  //     setLoading(false);
  //     openNotificationWithIcon("success");
  //     history.push("recommended");
  //   } catch (error) {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      <div className="container">
        <Table
      
          // pagination={paginationn}
          
          onChange={(current) => handleChange(current)}
          tableLayout="auto"
          rowSelection={{
            type: "radio",
            ...rowSelection,
            getCheckboxProps: (record) => ({
              onClick: (t) => console.log(t, "Hopeeee", record, "Hope Tany"),
            }),
          }}
          title={() => {
            return (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h2>List of Products</h2>

                <a type="primary" onClick={() => setVisable(true)}>
                  Change Service
                </a>

                <div>
                  <Button
                    className="mr-2"
                    onClick={() => history.push("recommended")}
                  >
                    Discard
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={sumbitLoading}
                    onClick={async () => {
                      setSumbitLoading(true);
                      const key = "updatable!";
                      message.loading({
                        content: "Loading...",
                        key,
                        duration: 15,
                      });

                      try {
                        await service.post("/web/recommended", postObject);
                        message.success({ content: "Done!", key, duration: 2 });
                        setSumbitLoading(false);
                        history.push("recommended");
                      } catch (error) {
                        message.error({
                          content: "Error Occured!",
                          key,
                          duration: 2,
                        });

                        setSumbitLoading(false);
                      }
                    }}
                    disabled={!postObject.service_id || !postObject.model_id}
                  >
                    Add
                  </Button>
                </div>
              </div>
            );
          }}
          rowKey={(item) => item.id}
          columns={col}
          dataSource={paginationn?.data}
        />
        <Modal
          visible={singleImage.length > 0}
          footer={null}
          onCancel={() => setSingleImage("")}
        >
          <img
            alt="image"
            style={{ width: "100%", height: 350 }}
            src={singleImage}
          />
        </Modal>
        {/* <Tabs
            defaultActiveKey="2"
            style={{ marginTop: 30 }}
          >
            {/* <TabPane tab="General" key="1">
              <GeneralField
                setPostObject={setPostObject}
                postObject={postObject}
              />
            </TabPane> */}
        {/* {STANDARD_SERVICES.map((element, index) => (
            <TabPane tab={element.name} key={element.id}>
              <ServiceTab
                setHandleLoading={setHandleLoading}
                handleLoading={handleLoading}
                serviceId={index}
                title={element.name}
                setPostObject={setPostObject}
                postObject={postObject}
                form={form}
              />  
            </TabPane>
          ))} */}
        {/* </Tabs>  */}
      </div>
      <Modal
        visible={visable}
        title="Service Selection"
        onCancel={() => setVisable(false)}
        okText="Confirm"
        onOk={onOkSubmit}
        okButtonProps={{ loading: loadingValidation }}
      >
        <Form name="selectService" layout="vertical">
          <Form.Item label="Select Service" name="seriveSelection">
            <Select
              showSearch
              placeholder="Select a Service Name"
              onChange={(e) => setPostObject({ ...postObject, service_id: e })}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {STANDARD_SERVICES?.map((element, index) => (
                <Select.Option key={element.id} value={element.serviceId}>
                  {element?.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProductForm;
