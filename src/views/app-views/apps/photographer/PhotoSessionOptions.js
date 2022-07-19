import { useFetch } from "hooks";
import React from "react";
import CustomTable from "../Components/CustomTable";

const PhotoSessionOptions = () => {
  const { services, isLoading, refetch } = useFetch("photoSessionOption");

  const columns = [
    {
      title: "#",
      key: "#",
      render: (text, record, index) => {
        return index;
      },
    },
    {
      title: "Photo Session Generic Option ID",
      dataIndex: "photo_session_generic_option_id",
      key: "photo_session_generic_option_id",
      sorter: (a, b) =>
        a.photo_session_generic_option_id - b.photo_session_generic_option_id,
    },
    {
      title: "Photo Session ID",
      dataIndex: "photo_session_id",
      key: "photo_session_id",
      sorter: (a, b) => a.photo_session_id - b.photo_session_id,
    },
  ];

  return (
    <>
      <CustomTable
        pageTitle="Photo Session Options"
        endPoint="makeupServiceOptions"
        addEndPoint="photographer/AddPhotoSessionOptions"
        dataRender={services}
        coloumRender={columns}
        isLoading={isLoading}
        refetch={refetch}
      />
    </>
  );
};

export default PhotoSessionOptions;
