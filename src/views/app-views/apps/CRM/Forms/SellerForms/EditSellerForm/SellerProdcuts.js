import { Badge, Modal, Rate, Upload, Table, Button } from "antd";
import { useFetch } from "hooks";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import CustomTable from "views/app-views/apps/Components/CustomTable";

const handleSelection = (service_id) => {
  switch (service_id) {
    case 8:
      return `makeup/AddMakeupService`;
    case 7:
      return `dresses/AddDress`;
    case 6:
      return `trips/AddTripForm`;

    case 5:
      return `photographer/AddPhotoSession`;

    case 4:
      return `beauty/AddBeautyCenterServices`;

    case 3:
      return `doctors/AddCheckUPs`;

    case 2:
      return `hotel/addWedding`;

    case 1:
      return `cars/AddCar`;

    default:
      break;
  }
};
const handleSelectionStore = (service_id) => {
  switch (service_id) {
    case 8:
      return `makeup_name_en`;
    case 7:
      return `dress_store_name_en`;
    case 6:
      return `traveling_agency_name_en`;

    case 5:
      return `photographer_name_en`;

    case 4:
      return `beauty_center_name_en`;

    case 3:
      return `clinic_name_en`;

    case 2:
      return `hotel_name_en`;

    case 1:
      return `agency_name_en`;

    default:
      break;
  }
};
const SellerProducts = ({ sellerId, serviceId, store_id }) => {
  const { services, isLoading, refetch } = useFetch(
    `sellerProducts/${sellerId}`
  );
  const [singleImage, setSingleImage] = useState("");

  const { direction } = useSelector((state) => state.theme);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  //   const changeStatus = async (record) => {
  //     setLoading(true);
  //     const key = "updatable!";
  //     message.loading({ content: "Loading...", key, duration: 15 });

  //     try {
  //       await service.post(`/web/dress/changeStatus/${record.id}`);
  //       message.success({ content: "Done!", key, duration: 2 });

  //       refetch();
  //       setLoading(false);
  //     } catch (error) {
  //       message.error({ content: "Error Occured!", key, duration: 2 });
  //       setLoading(false);
  //     }
  //   };
  const getStoreAndUrl = (serviceId) => {
    switch (serviceId) {
      case 1:
        return {
          storeUrl: "cars",
          editUrl: "editCar",
        };
      case 2:
        return {
          storeUrl: "hotel",
          editUrl: "editWeddinghall",
        };
      case 3:
        return {
          storeUrl: "doctors",
          editUrl: "eeditCheckUp",
        };
      case 4:
        return {
          storeUrl: "beauty",
          editUrl: "editBeautyCenterService",
        };
      case 5:
        return {
          storeUrl: "photographer",
          editUrl: "editphotoSession",
        };
      case 6:
        return {
          storeUrl: "trips",
          editUrl: "editReadTrip",
        };
      case 7:
        return {
          storeUrl: "dresses",
          editUrl: "editProduct",
        };
      case 8:
        return {
          storeUrl: "makeup",
          editUrl: "editmakeupService",
        };

      default:
        break;
    }
  };
  const columns = [
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
      render: (name, obj) => (
        <a
          onClick={() =>
            history.push(
              `/app/apps/${getStoreAndUrl(serviceId).storeUrl}/${
                getStoreAndUrl(serviceId).editUrl
              }?name=view&id=${obj.id}`
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
    // {
    //   title: "Seller",
    //   dataIndex: "seller_name",
    //   key: "seller_name",
    //   // sorter: (a, b) => a.seller_name.length - b.seller_name.length,
    //   render: (name, obj) => (
    //     <a
    //       onClick={() =>
    //         history.push(`/app/apps/CRM/veForm?name=view&id=${obj.seller_id}`)
    //       }
    //     >
    //       {name}
    //     </a>
    //   ),
    // },
    {
      title: "Store",
      dataIndex: "store_name_en",
      key: "store_name_en",
      // sorter: (a, b) => a.store_name.length - b.store_name.length,
      render: (_, obj) => (
        <span
        //   onClick={() =>
        //     history.push(
        //       `/app/apps/dresses/editDressStore?name=view&id=${obj.store_id}`
        //     )
        //   }
        >
          {obj[`${handleSelectionStore(obj.service_id)}`]}
        </span>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      // sorter: (a, b) => a.store_name.length - b.store_name.length,
      render: (price, obj) => {
        if (obj.variation_price) {
          return `${obj.variation_price} EGP`;
        } else {
          return `${price} EGP`;
        }
      },
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
          style={{ width: 150 }}
          defaultValue={parseFloat(rate)}
        />
      ),
      sorter: (a, b) => a.raiting - b.rating,
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
    // {
    //   title: "Approved",
    //   dataIndex: "approve",
    //   key: "approve",
    //   render: (text, record) => {
    //     if (text) {
    //       return (
    //         <Tag
    //           className="cursor-pointer"
    //           onClick={() => changeStatus(record)}
    //           color="green"
    //         >
    //           Approve
    //         </Tag>
    //       );
    //     } else {
    //       return (
    //         <Tag
    //           className="cursor-pointer "
    //           onClick={() => changeStatus(record)}
    //           color="red"
    //         >
    //           UnApproved
    //         </Tag>
    //       );
    //     }
    //   },
    // },
  ];

  return (
    <>
      <Table
        title={() => (
          <div style={{ justifyContent: "space-between", display: "flex" }}>
            <h2>Products List</h2>
            <Link
              to={{
                pathname: `/app/apps/${handleSelection(serviceId)}`,
                search: `?store_id=${store_id}&seller_id=${sellerId}`,
              }}
            >
              <Button type="primary" style={{ minWidth: 130 }}>
                Add Product
              </Button>
            </Link>
          </div>
        )}
        dataSource={services}
        columns={columns}
        isLoading={isLoading}
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
    </>
  );
};

export default SellerProducts;
