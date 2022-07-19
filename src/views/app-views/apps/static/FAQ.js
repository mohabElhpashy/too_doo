import React from "react";
import { useFetch } from "hooks";
import CustomTable from "../Components/CustomTable";
const FAQ = () => {
  const { services, isLoading, isError, refetch, error } = useFetch("faqs");
  const trncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Question",
      dataIndex: "question_en",
      key: "question_en",
      sorter: (a, b) => a.question_en.length - b.question_en.length,
    },
    {
      title: "Answer",
      dataIndex: "answer_en",
      render: (answer) => trncate(answer, 50),
      key: "answer_en",
      sorter: (a, b) => a.answer_en.length - b.answer_en.length,
    },
  ];
  return (
    <>
      <CustomTable
        pageTitle="FAQ"
        coloumRender={columns}
        dataRender={services}
        isLoading={isLoading}
        error={error}
        endPoint={"faqs"}
        refetch={refetch}
        addEndPoint="staticPages/FAQAddForm"
        editEndPoint="staticPages/FAQEditForm"
      />
    </>
  );
};

export default FAQ;
