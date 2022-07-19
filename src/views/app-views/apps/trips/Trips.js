import React from "react";
import { Table, Rate, Tag, message, Upload, Modal, Badge } from "antd";
import { useFetch } from "hooks";
import CustomTable from "../Components/CustomTable";
import { useSelector } from "react-redux";
import service from "auth/FetchInterceptor";
import { useHistory } from "react-router";

const Trips = () => {
  const { services, isLoading, refetch } = useFetch("trip");
  const [singleImage, setSingleImage] = React.useState("");
  const history = useHistory();
  const { direction } = useSelector((state) => state.theme);
  const changeStatus = async (record) => {
    const key = "updatable!";
    message.loading({ content: "Loading...", key, duration: 15 });

    try {
      await service.post(`/web/trip/changeStatus/${record.id}`);
      message.success({ content: "Done!", key, duration: 2 });

      refetch();
    } catch (error) {
      message.error({ content: "Error Occured!", key, duration: 2 });
    }
  };
  const columns_en = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name_en",
      key: "name_en",
    },

    // {
    //   title: "Description",
    //   dataIndex: "description_en",
    //   key: "description_en",
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
              `/app/apps/trips/editReadTripForm?name=view&id=${obj.store_id}`
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

    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      render: (text, record) => {
        if (text) {
          return (
            <div style={{ display: "flex" }}>
              <Badge status="success" />
              <span style={{ fontWeight: "bolder" }}>Active</span>
            </div>
          );
        } else {
          return (
            <>
              <Badge status="error" />
              <span>Inactive</span>
            </>
          );
        }
      },
    },
    {
      title: "Approved",
      dataIndex: "approve",
      key: "approve",
      render: (text, record) => {
        if (text) {
          return (
            <Tag
              className="cursor-pointer"
              onClick={() => changeStatus(record)}
              color="green"
            >
              Approve
            </Tag>
          );
        } else {
          return (
            <Tag
              className="cursor-pointer "
              onClick={() => changeStatus(record)}
              color="red"
            >
              UnApproved
            </Tag>
          );
        }
      },
    },
  ];

  const columns_ar = [
    {
      title: "#",
      key: "#",
      render: (text, record, index) => {
        return index;
      },
    },
    {
      title: "Name",
      dataIndex: "name_ar",
      key: "name_ar",
    },

    {
      title: "Description",
      dataIndex: "description_ar",
      key: "description_ar",
    },
    {
      title: "Trip Image",
      key: "main_image",
      dataIndex: "main_image",
      render: (image) => <img style={{ width: 100 }} src={image} />,
      sorter: (a, b) => a.main_image.length - b.main_image.length,
    },
    {
      title: "Destination",
      dataIndex: "destination_ar",
      key: "destination_ar",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rate) => (
        <Rate
          allowHalf
          disabled
          style={{ width: 150 }}
          defaultValue={parseFloat(rate)}
        />
      ),
      sorter: (a, b) => a.raiting - b.rating,
    },
    {
      title: "Approved",
      dataIndex: "approve",
      key: "approve",
      render: (text, record) => {
        if (text) {
          return (
            <Tag
              className="cursor-pointer"
              onClick={() => changeStatus(record)}
              color="green"
            >
              Approve
            </Tag>
          );
        } else {
          return (
            <Tag
              className="cursor-pointer "
              onClick={() => changeStatus(record)}
              color="red"
            >
              UnApproved
            </Tag>
          );
        }
      },
    },
  ];

  return (
    <div>
      <CustomTable
        pageTitle="Trips List"
        dataRender={services}
        coloumRender={direction === "ltr" ? columns_en : columns_ar}
        isLoading={isLoading}
        addPage="AddTrip"
        editEndPoint="trips/editReadTrip"
        addEndPoint="trips/AddTripForm"
        endPoint="trip"
        refetch={refetch}
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
    </div>
  );
};

export default Trips;
