import { EllipsisOutlined } from "@ant-design/icons";
import { Badge, Form, Input, message, Modal, Select, Upload } from "antd";
import service from "auth/FetchInterceptor";
import { useFetch } from "hooks";
import React, { useState } from "react";
import { useHistory } from "react-router";
import CustomTable from "../Components/CustomTable";

const DEFULT_STATUS = [
  {
    id: 1,
    statusName: "Accept",
    name: "accepted",
  },
  {
    id: 2,
    statusName: "Reject",
    name: "rejected",
  },
];
const INITAL_STATE = {
  reason: "",
  status: null,
};
const ListUnApproved = () => {
  const { services, refetch } = useFetch("makeupServices?unApproved");
  const [recordId, setRecordId] = useState(null);
  const [singleImage, setSingleImage] = useState("");
  const [form] = Form.useForm();
  const [statusVisible, setStatusVisible] = useState(false);
  const [postObject, setPostObject] = useState(INITAL_STATE);

  const history = useHistory();

  // const changeStatus = async (record) => {
  //   setLoading(true);
  //   const key = "updatable!";
  //   message.loading({ content: "Loading...", key, duration: 15 });

  //   try {
  //     await service.post(`/web/dress/changeStatus/${record.id}`);
  //     refetch();
  //     setLoading(false);
  //     message.success({ content: "Done!", key, duration: 2 });
  //   } catch (error) {
  //     message.error({ content: "Error Occured!", key, duration: 2 });

  //     setLoading(false);
  //   }
  // };

  // const dropdownMenu = (row) => (
  //   <Menu>
  //     <span className=" d-flex align-items-center justify-content-center">
  //       <h5 className="mt-1">Status</h5>
  //     </span>

  //     <Menu.Item>
  //       <Flex alignItems="center">
  //         <Badge status="error" />

  //         <span className="ml-2">Declined By Seller</span>
  //       </Flex>
  //     </Menu.Item>

  //     <Menu.Item>
  //       <Flex alignItems="center">
  //         <Badge status="error" />
  //         <span className="ml-2">Declined By Client</span>
  //       </Flex>
  //     </Menu.Item>
  //   </Menu>
  // );
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name_en",
      key: "name_en",
      sorter: (a, b) => a.name_en.length - b.name_en.length,
      render: (name, obj) => (
        <a
          onClick={() =>
            history.push(
              `/app/apps/makeup/editmakeupService?name=view&id=${obj.id}`
            )
          }
        >
          {name}
        </a>
      ),
    },

    // {
    //   title: "Description ",
    //   dataIndex: "description_en",
    //   key: "description_en",
    //   render: (text) => {
    //     return trncate(text, 40);
    //   },
    //   sorter: (a, b) => a.description_en.length - b.description_en.length,
    // },
    {
      title: "Seller",
      dataIndex: "seller_name",
      key: "seller_name",
      // sorter: (a, b) => a.seller_name.length - b.seller_name.length,
      render: (name, obj) => (
        <a
          onClick={() =>
            history.push(`/app/apps/CRM/veForm?name=view&id=${obj.seller_id}`)
          }
        >
          {name}
        </a>
      ),
    },
    {
      title: "Store",
      dataIndex: "store_name",
      key: "store_name",
      // sorter: (a, b) => a.store_name.length - b.store_name.length,
      render: (name, obj) => (
        <a
          onClick={() =>
            history.push(
              `/app/apps/makeup/editReadForm?name=view&id=${obj.store_id}`
            )
          }
        >
          {name}
        </a>
      ),
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
    // {
    //   title: "Rating",
    //   dataIndex: "rating",
    //   key: "rating",
    //   render: (rate) => (
    //     <Rate
    //       allowHalf
    //       disabled
    //       style={{ width: 150 }}
    //       defaultValue={parseFloat(rate)}
    //     />
    //   ),
    //   sorter: (a, b) => a.raiting - b.rating,
    // },
    {
      title: "Status",
      dataIndex: "approve",

      key: "approve",
      render: (text, record) => {
        return (
          <>
            <Badge status="warning" />
            <span style={{ fontWeight: "bold" }}>Pending</span>
          </>
        );
      },
    },
    {
      title: "",
      dataIndex: "actions",
      render: (_, elm) => (
        <div className="text-right">
          <EllipsisOutlined
            onClick={() => {
              setRecordId(elm.id);
              setStatusVisible(true);
            }}
            style={{ fontSize: 30, cursor: "pointer" }}
          />
        </div>
      ),
    },
  ];
  const okButtonValidation = () => {
    if (!postObject.status || !postObject.reason) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <>
      <CustomTable
        pageTitle={"List Pending Products"}
        dataRender={services}
        coloumRender={columns}
        noAddOption
        noEditAction
        editEndPoint="makeup/readPendingProducts"
        noDeleteAction
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

      {/* Status Modal*/}
      <Modal
        title="Change Status"
        visible={statusVisible}
        destroyOnClose={true}
        okText="Save"
        // afterClose={() => }
        onCancel={() => {
          form.resetFields();
          setPostObject(INITAL_STATE);
          setStatusVisible(false);
        }}
        okButtonProps={{ disabled: okButtonValidation() }}
        onOk={async () => {
          const key = "Updateable!";
          message.loading({ content: "Loading...", key, duration: 15 });

          try {
            await service.post(
              `web/makeupServices/confirmChanges/${recordId}`,
              postObject
            );
            setStatusVisible(false);
            refetch();
            message.success({ content: "Done!", key, duration: 2 });
          } catch (error) {
            message.error({ content: "Error Occured!", key, duration: 2 });
          }
        }}
      >
        <Form form={form} name="addCardForm" layout="vertical">
          <Form.Item required label="Product Status" name="productStatus">
            <Select
              showArrow
              placeholder="Select a Status"
              value={postObject.status}
              onChange={(e) => setPostObject({ ...postObject, status: e })}
            >
              {DEFULT_STATUS?.map((element, index) => (
                <Select.Option key={element.id} value={element.name}>
                  <Badge status={element.id === 1 ? "success" : "error"} />
                  <span className="ml-2">{element.statusName}</span>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item required name="reason" label="Reason">
            <Input.TextArea
              name="reason"
              onChange={(e) =>
                setPostObject({ ...postObject, reason: e.target.value })
              }
              placeholder="Enter the Reason for the Status"
              value={postObject.reason}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ListUnApproved;
