import { Form, Modal, notification, Table, Upload } from "antd";
import Loading from "components/shared-components/Loading";
import { SOCIAL_DATA } from "constants/SocialLoginData";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const AccountDetails = (props) => {
  const [form] = Form.useForm();
  const [visable, setVisable] = useState(true);
  const history = useHistory();
  const [paginationn, setPagenation] = useState({});
  const [loadingValidation, setLoading] = useState(false);
  const [sumbitLoading, setSumbitLoading] = useState(false);
  const [singleImage, setSingleImage] = useState("");
  const [selectedRow, setSelectedRows] = useState([]);
  useEffect(() => {
    if (
      props.postObject.facebook_login &&
      props.postObject.google_login === true
    ) {
      setSelectedRows([...selectedRow, 1, 2]);
    } else if (props.postObject.google_login === true) {
      setSelectedRows([...selectedRow, 2]);
    } else if (props.postObject.facebook_login === true) {
      setSelectedRows([...selectedRow, 1]);
    }
    if (!props.postObject.google_login && !props.postObject.facebook_login) {
      setSelectedRows([...selectedRow, 3]);
    }
  }, [props.postObject]);
  // const [perviouseState, setPreviouse] = useState(1);

  // const [producsList, setProductsList] = useState([]);
  const col = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Login With",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Service Logo",
      dataIndex: "image",
      key: "image",
      render: (text, obj) => {
        return (
          <Upload
            disabled={true}
            // fileList={props?.postObject?.images}
            fileList={[
              {
                uid: obj.id,
                name: obj.name,
                status: "done",
                url: obj.image,
              },
            ]}
            onPreview={(t) => setSingleImage(obj.image)}
            listType="picture-card"
          />
        );
      },
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

  const rowSelection = {
    onChange: (modual_id) => {
      props.setPostObject({ ...props.postObject, model_id: modual_id[0] });
    },
  };

  return (
    <>
      {selectedRow.length === 0 ? (
        <Loading cover="content" align={"center"} loading={true} />
      ) : (
        <div className="container">
          <Table
            tableLayout="auto"
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
              defaultSelectedRowKeys: [...selectedRow],
              getCheckboxProps: (record) => ({
                disabled: true,
              }),
            }}
            title={() => {
              return (
                <div>
                  <h2>Account Details</h2>
                </div>
              );
            }}
            rowKey={(item) => item.id}
            columns={col}
            dataSource={SOCIAL_DATA}
          />
        </div>
      )}

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
    </>
  );
};

export default AccountDetails;
