import { Modal, Upload } from "antd";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CustomTable from "views/app-views/apps/Components/CustomTable";

function WishListProducts() {
  const location = useLocation();
  const { products } = location.state;
  const [singleImage, setSingleImage] = useState([]);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",

      key: "id",
      render: (id) => `# ${id}`,
    },
    {
      title: "Product Name",
      dataIndex: "name",

      key: "name",
      sorter: (a, b) => a.length - b.length,
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
      title: "Store Name",
      key: "store_name",

      render: (_, obj) => obj.store.name,
    },
    {
      title: "Service Name",
      key: "service_type",

      dataIndex: "service_type",
    },
  ];

  return (
    <>
      <CustomTable
        dataRender={products}
        coloumRender={columns}
        rowKey={(item) => item.id?.toString()}
        title={() => <h2>List Of Products</h2>}
        noAddOption
        noDeleteAction
        noEditAction
        noViewAction
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
}

export default WishListProducts;
