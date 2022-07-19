import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  notification,
  Select,
  Upload,
} from "antd";
import service from "auth/FetchInterceptor";
import { useFetch } from "hooks";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
const formItemLayout = {};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const AddWeddingHall = () => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const history = useHistory();
  const [isloading, setLoading] = useState(false);
  const { services } = useFetch("hotels");
  const [visable, setVisable] = useState(false);
  const location = useLocation();
  const emptyState = {
    name_ar: "",
    name_en: "",
    description_ar: "",
    description_en: "",
    main_image: null,
    price: "",
    hotel_id: null,
  };
  let initalState;
  if (location.state !== undefined) {
    if (location.state.viewMode !== undefined) {
      var { viewMode } = location.state;
      initalState = viewMode;
    } else {
      const { record } = location.state;
      for (const key in record) {
        if (
          key === "updated_at" ||
          key === "created_at" ||
          key === "deleted_at"
        ) {
          delete record[key];
        }
      }
      initalState = record;
    }
  } else {
    initalState = emptyState;
  }
  const [postObject, setPostObject] = useState(initalState);
  //Handle sumbit Button validation
  const buttonValidation = () => {
    let count = 0;
    for (const key in emptyState) {
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
  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Process Feedback",
      description: "Your Process has been Done",
    });
  };
  //HANDEL SUBMIT
  const handelSubmit = async (postObject) => {
    try {
      const data = new FormData();
      for (const key of Object.keys(postObject)) {
        data.append(key, postObject[key]);
      }
      if (initalState === emptyState) {
        await service.post("/web/web/weddingHall", data);
      } else {
        await service.post(`/web/web/weddingHall/${postObject.id}`, data);
      }
      setLoading(false);
      openNotificationWithIcon("success");
      if (initalState !== emptyState) {
        history.push("weddingHall");
      }
    } catch (error) {
      setLoading(false);
    }
  };

  //Handel Upload Image
  const fileList = !postObject.main_image
    ? null
    : [
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: postObject.main_image,
        },
      ];
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    listType: "picture-card",
    onPreview() {
      setVisable(true);
    },
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      const img = info.fileList[0];
      setPostObject({ ...postObject, main_image: img });
      if (info.file.status !== "uploading") {
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        setPostObject({
          ...postObject,
          main_image: info.fileList[0].originFileObj,
        });
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <>
      <>
        <h2 style={{ marginBottom: 20 }}>Adding New Wedding Hall</h2>
        <Form
          {...formItemLayout}
          form={form}
          layout="vertical"
          onSubmitCapture={(e) => {
            e.preventDefault();
            handelSubmit(postObject);
          }}
          name="register"
          // onFinish={onFinish}
          initialValues={{
            residence: ["zhejiang", "hangzhou", "xihu"],
            prefix: "86",
          }}
          scrollToFirstError
        >
          <Form.Item
            name="name_ar"
            label={
              <span>
                Name in Arabic&nbsp;
                {/* <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip> */}
              </span>
            }
            // rules={[
            //   {
            //     required: true,
            //     message: "Please input your name!",
            //     whitespace: true,
            //   },
            // ]}
          >
            <Input
              placeholder="Please enter your name in Arabic"
              value={postObject.name_ar}
              defaultValue={postObject.name_ar}
              disabled={initalState === viewMode ? true : false}
              name="name_ar"
              onChange={(e) =>
                setPostObject({ ...postObject, name_ar: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            name="name_en"
            label={
              <span>
                Name in English&nbsp;
                {/* <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip> */}
              </span>
            }
            // rules={[
            //   {
            //     required: true,
            //     message: "Please input your name!",
            //     whitespace: true,
            //   },
            // ]}
          >
            <Input
              placeholder="Please enter your name in English"
              value={postObject.name_en}
              defaultValue={postObject.name_en}
              disabled={initalState === viewMode ? true : false}
              name="name_en"
              onChange={(e) =>
                setPostObject({ ...postObject, name_en: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item
            name="description_ar"
            label={
              <span>
                Description in Arabic:&nbsp;
                {/* <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip> */}
              </span>
            }
            // rules={[
            //   {
            //     required: true,
            //     message: "Please input your Description!",
            //     whitespace: true,
            //   },
            // ]}
          >
            <Input.TextArea
              onChange={(e) =>
                setPostObject({
                  ...postObject,
                  description_ar: e.target.value,
                })
              }
              placeholder="Please enter your Description in Arabic"
              value={postObject.description_ar}
              disabled={initalState === viewMode ? true : false}
              defaultValue={postObject.description_ar}
              name="description_ar"
            />
          </Form.Item>

          <Form.Item name={"description_en"} label="Descritpion in English">
            <Input.TextArea
              onChange={(e) =>
                setPostObject({
                  ...postObject,
                  description_en: e.target.value,
                })
              }
              placeholder="Please enter your Description in English"
              value={postObject.description_en}
              disabled={initalState === viewMode ? true : false}
              defaultValue={postObject.description_en}
              name="description_en"
            />
          </Form.Item>
          <Form.Item name={"price"} label="Wedding Hall Price">
            <Input
              type="number"
              addonAfter="EGP"
              onChange={(e) =>
                setPostObject({
                  ...postObject,
                  price: e.target.value,
                })
              }
              placeholder="Please enter your Price"
              value={postObject.price}
              disabled={initalState === viewMode ? true : false}
              defaultValue={postObject.price}
              name="price"
            />
          </Form.Item>
          <Form.Item name={"main_image"} label="Upload a Wedding Hall Image">
            {initalState === viewMode ? (
              <Upload file fileList={fileList} disabled={true} {...props}>
                {postObject.main_image ? null : uploadButton}
                {/* <Button disabled={initalState === viewMode?true:false } icon={<UploadOutlined />}>Upload an Image</Button> */}
              </Upload>
            ) : (
              <Upload file {...props}>
                {postObject.main_image ? null : uploadButton}
                {/* <Button disabled={initalState === viewMode?true:false } icon={<UploadOutlined />}>Upload an Image</Button> */}
              </Upload>
            )}

            <Modal
              visible={visable}
              footer={null}
              onCancel={() => setVisable(false)}
            >
              <img
                alt="example"
                style={{ width: "100%" }}
                src={postObject.main_image}
              />
            </Modal>
          </Form.Item>

          <Form.Item name={"hotel_id"} label="Hotel Name">
            <Select
              showSearch
              placeholder="Select a Hotel"
              optionFilterProp="children"
              onChange={(e) => setPostObject({ ...postObject, hotel_id: e })}
              value={postObject.hotel_id}
              disabled={initalState === viewMode ? true : false}
              defaultValue={postObject.hotel_id}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {services?.map((element) => (
                <Option value={element.id}>{element?.name_en}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            {initalState === viewMode ? (
              <Button
                className="w-50"
                type={"primary"}
                onClick={() => history.push("weddingHall")}
              >
                Go Back
              </Button>
            ) : (
              <>
                <Button
                  type="default"
                  style={{ marginRight: 20 }}
                  onClick={() => history.push("weddingHall")}
                >
                  Cancel
                </Button>
                <Button
                  loading={isloading}
                  type="primary"
                  htmlType="submit"
                  onClick={() => setLoading(true)}
                  disabled={!buttonValidation()}
                >
                  Submit
                </Button>
              </>
            )}
          </Form.Item>
        </Form>
      </>
    </>
  );
};
export default AddWeddingHall;
