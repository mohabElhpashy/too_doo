import { Avatar, Comment, message, Rate, Table, Tag, Tooltip } from "antd";
import service from "auth/FetchInterceptor";
import { useFetch } from "hooks";
import moment from "moment";
import React, { useState } from "react";
import { useHistory } from "react-router";
import TestError from "../../../auth-views/errors/error-page-2";
function Reviews() {
  const { services, refetch, isLoading, isError } = useFetch("review");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const changeStatus = async (record) => {
    const key = "updatable";
    message.loading({ content: "Loading...", key });
    setLoading(true);
    try {
      await service.put(`/web/review/${record.id}`);
      refetch();
      message.success({ content: "Done!", key, duration: 2 });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error({ content: "Error Occured!", key, duration: 2 });
    }
  };
  if (isError) {
    <TestError />;
  }
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => `# ${id}`,
    },
    {
      title: "Client Review",
      key: "id",
      render: (text, Obj) => (
        <Comment
          actions={[
            <span key=' key="comment-basic-dislike"'>
              {/* <span className="comment-action">Rating</span> */}
              <Rate
                allowHalf
                disabled
                style={{ fontSize: 16 }}
                defaultValue={parseFloat(Obj.rating)}
              />
            </span>,
          ]}
          datetime={
            <Tooltip
              title={moment(Obj.created_at).format("YYYY-MM-DD HH:mm:ss")}
            >
              <span>{moment(Obj.created_at).fromNow()}</span>
            </Tooltip>
          }
          content={<p>{Obj.review}</p>}
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          author={
            <a
              onClick={() =>
                history.push(
                  `/app/apps/CRM/ReadClient?name=view&id=${Obj.client_id}`
                )
              }
            >
              {Obj.client_name}
            </a>
          }
        />
      ),
    },

    // },
    //   {
    //     title: "Client Name",
    //     dataIndex: "client_name",
    //     key: "client_name",
    //   },
    {
      title: "Service",
      dataIndex: "service_name",
      key: "service_name",
      render: (data) => <span style={{ fontWeight: "bold" }}>{data}</span>,
    },

    //   {
    //       title: "Rating",
    //       dataIndex: "rating",
    //       key: "rating",
    //       render:(rate)=>  <Rate allowHalf disabled defaultValue={rate} />
    //       ,
    //       sorter: (a, b) => a.rating - b.rating,
    //     },
    //   {
    //       title: "Review",
    //       dataIndex: "review",
    //       key: "review",
    //     },
    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      render: (text, record) => {
        if (text) {
          return (
            <Tag
              className="cursor-pointer"
              onClick={() => changeStatus(record)}
              color="green"
            >
              Active
            </Tag>
          );
        } else {
          return (
            <Tag
              className="cursor-pointer "
              onClick={() => changeStatus(record)}
              color="red"
            >
              InActive
            </Tag>
          );
        }
      },
    },

    // {
    //   title: "Actions",
    //   key: "actions",
    //   render: (test,record)=>{
    //     return <Button key={record.id} loading={loading} className="w-100" type="primary" onClick={()=>changeStatus(record)} >Change Status</Button>
    //   }
    // },

    ,
  ];
  return (
    <>
      <Table
        tableLayout="auto"
        rowKey={(item) => item.id?.toString()}
        columns={columns}
        bordered
        dataSource={services}
        title={() => <h2> Reviews </h2>}
      ></Table>
    </>
  );
}

export default Reviews;
