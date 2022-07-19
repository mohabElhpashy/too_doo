import { Upload, Modal } from "antd";
import { useFetch } from "hooks";
import React, { useState } from "react";
import { useHistory } from "react-router";
import CustomTable from "../Components/CustomTable";
const handleSelection = (service_id, modelId) => {
  switch (service_id) {
    case 8:
      return `makeup/editmakeupService?name=view&id=${modelId}`;
    case 7:
      return `dresses/editProduct?name=view&id=${modelId}`;
    case 6:
      return `trips/editReadTrip?name=view&id=${modelId}`;

    case 5:
      return `photographer/editphotoSession?name=view&id=${modelId}`;

    case 4:
      return `beauty/editBeautyCenterService?name=view&id=${modelId}`;

    case 3:
      return `doctors/eeditCheckUp?name=view&id=${modelId}`;

    case 2:
      return `hotel/editWeddinghall?name=view&id=${modelId}`;

    case 1:
      return `cars/editCar?name=view&id=${modelId}`;

    default:
      break;
  }
};
function Recommended() {
  const { services, refetch, isLoading, error } = useFetch("recommended");
  const [singleImage, setSingleImage] = useState("");
  const history = useHistory();
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => `# ${id}`,
    },
    {
      title: "Model Name",
      dataIndex: "model_name_en",
      key: "model_name_en",
      render: (model_name_en, Obj) => (
        <a
          onClick={() =>
            history.push(
              `/app/apps/${handleSelection(Obj.service_id, Obj.model_id)}`
            )
          }
        >
          {model_name_en}
        </a>
      ),
    },
    {
      title: "Product Image ",
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
      title: "Service Name",
      dataIndex: "service_name_en",
      key: "service_name_en",
    },
  ];
  return (
    <>
      <CustomTable
        refetch={refetch}
        error={error}
        isLoading={isLoading}
        coloumRender={columns}
        dataRender={services}
        pageTitle="Recommeneded"
        endPoint="recommended"
        editEndPoint="recommended"
        addEndPoint="social/addRecommendedForm"
        noEditAction={true}
        noViewAction={true}
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

export default Recommended;
