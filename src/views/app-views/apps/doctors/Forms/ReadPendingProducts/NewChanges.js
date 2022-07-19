import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Col, Form, Input, Modal, Row, Select, Upload } from "antd";
import { ImageSvg } from "assets/svg/icon";
import CustomIcon from "components/util-components/CustomIcon";
import React, { useState } from "react";

const { Dragger } = Upload;
const { Option } = Select;

const imageUploadProps = {
  name: "file",
  multiple: true,
  listType: "picture-card",
  showUploadList: false,
};

const NewChanges = (props) => {
  // const imgList = React.useMemo(() => (props.postObject.images.map((element, index) => ({ uid: index, url: element, name: 'image.png' }))))
  //Upload Seaction
  const [test, setTest] = useState([]);
  const [singleImage, setSingleImage] = useState("");
  //Upload Seaction
  const filteredTags = props?.tagsList?.filter(
    (element) => element.service_id === 7
  );
  // useEffect(() => {
  //   const test1 = props.postObject?.images?.map((element) => {
  //     let newObj = {};
  //     newObj["url"] = element.image;
  //     newObj["id"] = element.id;
  //     return newObj;
  //   });
  //   setTest(test1);
  // }, [props.postObject.images]);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  // const uploadHandler = async (options, name) => {
  //   const key = "updatable";
  //   message.loading({ content: "Loading...", key, duration: 15 });

  //   const imageObject = { type: "Dress", file: options.file };
  //   const data = new FormData();
  //   try {
  //     for (const key of Object.keys(imageObject)) {
  //       data.append(key, imageObject[key]);
  //     }
  //     const uploadResponse = await service.post("/upload_media", data);
  //     message.success({
  //       content: `${uploadResponse.fileName} Uploaded Successfully!`,
  //       key,
  //       duration: 2,
  //     });
  //     if (name === "main_image") {
  //       props.setPostObject({
  //         ...props.postObject,
  //         main_image: uploadResponse.fileName,
  //         custom_image: uploadResponse.file_url,
  //       });
  //     } else {
  //       props.setPostObject({
  //         ...props.postObject,
  //         images: [
  //           ...props.postObject.images,
  //           {
  //             id: Math.floor(Math.random() * 10000),
  //             image: uploadResponse?.file_url,
  //           },
  //         ],
  //       });
  //     }
  //   } catch (error) {
  //     message.error({ content: `Error!`, key, duration: 2 });
  //   }
  // };
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Form.Item
            required
            hasFeedback
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
            name="name_ar"
            label="Name in Arabic"
          >
            <Input
              name="name_ar"
              disabled={props.checkView}
              defaultValue={props.postObject.name_ar}
              onPressEnter={(e) => e.preventDefault()}
              placeholder="Please enter Product Name in Arabic"
            />
          </Form.Item>

          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
            }}
            required
            name="name_en"
            hasFeedback
            label="Name in English"
          >
            <Input
              name="name_en"
              disabled={props.checkView}
              onPressEnter={(e) => e.preventDefault()}
              defaultValue={props.postObject.name_en}
              placeholder="Please enter Product Name in English"
            />
          </Form.Item>

          <Form.Item
            required
            hasFeedback
            name="description_ar"
            label="Description in Arabic"
          >
            <Input.TextArea
              name="description_ar"
              disabled={props.checkView}
              placeholder="Enter the Description in Arabic"
              defaultValue={props.postObject.description_ar}
              rows={4}
            />
          </Form.Item>

          <Form.Item
            required
            name="description_en"
            hasFeedback
            label="Description in English"
          >
            <Input.TextArea
              name="description_en"
              disabled={props.checkView}
              placeholder="Enter the Description in English"
              defaultValue={props.postObject.description_en}
              rows={4}
            />
          </Form.Item>
          <Form.Item required name={"color"} label="Dress Color">
            <Input
              type="color"
              defaultValue={props?.postObject.color}
              disabled={props.checkView}
              value={props.postObject.color}
            />
          </Form.Item>
          <Form.Item
            name="dress_store_id"
            required
            label={<span>Dress Store&nbsp;</span>}
          >
            <Select
              showSearch
              disabled={props.checkView}
              name="dress_store_id"
              defaultValue={
                props.pendingProduct
                  ? props?.postObject?.dress_store_name_en
                  : props.postObject.dress_store_id
              }
              placeholder="Select a Dress Store Name"
              optionFilterProp="children"
              value={props.postObject.dress_store_id}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {props.services?.map((element) => (
                <Option key={element.id} value={element.id}>
                  {element?.name_en}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="tags" required label="Tags">
            <Select
              optionFilterProp="children"
              disabled={props.checkView}
              defaultValue={props?.postObject?.tags}
              mode="multiple"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              style={{ width: "100%" }}
              placeholder="Please Select a Tag"
            >
              {filteredTags?.map((elm) => (
                <Option value={elm.id} key={elm.id}>
                  {elm.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Media">
          <Form.Item required label="Main Image">
            <Dragger
              disabled={props.checkView}
              name="main_image"
              {...imageUploadProps}
              // customRequest={(options) => uploadHandler(options, "main_image")}
            >
              {props.postObject.main_image ? (
                <img
                  src={
                    props.postObject.custom_image
                      ? props.postObject.custom_image
                      : props.postObject.main_image
                  }
                  alt="avatar"
                  className="img-fluid"
                />
              ) : (
                <div>
                  {props.postObject.custom_image ? (
                    <div>
                      <LoadingOutlined className="font-size-xxl text-primary" />
                      <div className="mt-3">Uploading</div>
                    </div>
                  ) : (
                    <div>
                      <CustomIcon className="display-3" svg={ImageSvg} />
                      <p>Click or drag file to upload</p>
                    </div>
                  )}
                </div>
              )}
            </Dragger>
          </Form.Item>
          <Form.Item required label="Sub Images">
            <Upload
              disabled={props.checkView}
              // fileList={props?.postObject?.images}
              fileList={test}
              onPreview={(t) => setSingleImage(t.url)}
              // customRequest={(options) => uploadHandler(options, "images")}
              listType="picture-card"
            >
              {props.postObject?.images?.length >= 4 ? null : uploadButton}
            </Upload>
          </Form.Item>
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
        </Card>
      </Col>
    </Row>
  );
};

export default NewChanges;
