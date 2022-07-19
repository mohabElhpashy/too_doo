import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    QuestionCircleOutlined,
    BellOutlined,
  } from "@ant-design/icons";
  import {
    Button,
    message,
    Popconfirm,
    Table,
    Form,
    Select,
    Input,
    Modal,
  } from "antd";
  import service from "auth/FetchInterceptor";
  import Loading from "components/shared-components/Loading";
  import Search from "components/shared-components/Search";
  import Search_order_id from "components/shared-components/Search_order_id";
  
  
  import { languageValidator } from "constants/helperFunctions";
  import { ARABIC_alpha, ENGLISH_ALPH } from "constants/LanguagesConstent";
  import React, { useState } from "react";
  import { useSelector } from "react-redux";
  import { Link } from "react-router-dom";
  import TestError from "../../../auth-views/errors/error-page-2";
  
  export default function CustomTable({
    dataRender,
    coloumRender,
    loading,
    refetch,
    pageTitle,
    isLoading,
    Fetch_record,
    endPoint,totalPages,
    error,
    noAddOption,
    addEndPoint,
    editEndPoint,
    noDeleteAction,
    noEditAction,
    noViewAction,
    setCurrentList,
    prevousState,
    searchUrl,
    searchUrl_order,
    sellerId,
    readClient,
    noAction,
    hasNotification,
    radio,
    setPostobject,
    Postobject,
    useSELECT,
    i_d
  }) {
    const key = "updatable";
    //Modifiying String
    // const tryAgain=(entireEndPoint,lastEndPoint)=>{
    //   const splitStr=entireEndPoint.split('/');
    //     return (`${splitStr[0]}/${lastEndPoint}`)
  
    // }
    const INITAL_STATE = {
      title_ar: "",
      title_en: "",
      body_ar: "",
      body_en: "",
      type: "statement",
      topic: "",
    };
    const [postObject, setPostObject] = useState(INITAL_STATE);
    const [statusVisible, setStatusVisible] = useState(false);
    //Delete Part
    const [form] = Form.useForm();
    const { direction } = useSelector((state) => state.theme);
    const [selectedItems, SetSelectedItems] = useState([]);
    const [deleteError, setDeleteError] = useState(false);
    const handelDelete = async (serviceName, url_endPoint) => {
      const key = "test";
      message.loading({ content: "Loading...", key, duration: 15 });
      if (selectedItems.length === 0) {
        try {
          await service.delete(`web/${serviceName}/${url_endPoint}`);
          refetch();
          message.success({ content: "Done!", key, duration: 2 });
        } catch (error) {
          setDeleteError(true);
          message.error({ content: "Error Occured!", key, duration: 2 });
        }
      } else {
        for (const element of selectedItems) {
          try {
            await service.delete(`web/${serviceName}/${element["id"]}`);
            message.success({ content: "Done!", key, duration: 2 });
          } catch (error) {
            message.error({ content: "Error Occured!", key, duration: 2 });
          }
          refetch();
        }
      }
    };
  
    // Edit Part
    // Handeling Error`s
  
    if (error) {
      return <TestError />;
    }
  
    // Model Part
  
    // LoadingHandler
    if (isLoading) {
      return <Loading cover="content" align={"center"} loading={true} />;
    }
  
    // rowSelection object indicates the need for row selection
  
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        SetSelectedItems([...selectedRows]);
      },
      getCheckboxProps: (record) => ({
        // Column configuration not to be checked
        name: record.name,
      }),
    };
    const onFinish = async () => {
      console.log("Working ???");
      const key = "Updateable!";
      message.loading({ content: "Loading...", key, duration: 15 });
  
      try {
        await service.post(`web/notifications`, postObject);
        setStatusVisible(false);
        setPostObject(INITAL_STATE);
        message.success({ content: "Done!", key, duration: 2 });
      } catch (error) {
        message.error({ content: "Error Occured!", key, duration: 2 });
      }
    };
  
    //Colums
    const okButtonValidation = () => {
      if (
        !postObject.title_ar ||
        !postObject.title_en ||
        !postObject.body_en ||
        !postObject.body_ar ||
        !postObject.topic
      ) {
        return true;
      } else {
        return false;
      }
    };
    const columns = [
      noAction
        ? {}
        : {
            title: `${direction === "rtl" ? "أجراءات" : "Actions"}`,
            key: "action",
            align: "center",
            width: 220,
            render: (text, record) => {
              return (
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                  {/* <Link
                to={{
                  pathname: `/app/apps/${editEndPoint}?name=view`,
                  
                  state: { record: { ...record, view: true } },
                }}
              > */}
                    {/* Single product start*/}
  
                  <Link
                    to={{
                      pathname: readClient
                        ? `/app/apps/${readClient}`
                        : `/app/apps/${editEndPoint}`,
                      search: `?name=view&id=${record.id}`,
                    }}
                  >
                    {noViewAction ? null : (
                      <Button
                        type="default"
                        disabled={selectedItems.length > 1}
                        style={{
                          borderColor: "gray",
                          backgroundColor: "transparent",
                        }}
                        icon={<EyeOutlined />}
                      ></Button>
                    )}
                  </Link>
                       {/* Single product End*/}
  
                  {noEditAction ? null : (
                    <Link
                      to={
                        sellerId
                          ? {
                              pathname: `/app/apps/${editEndPoint}`,
                              search: `?name=edit&id=${record.id}&sellerId=${sellerId}`,
                            }
                          : {
                              pathname: `/app/apps/${editEndPoint}`,
                              search: `?name=edit&id=${record.id}`,
                            }
                      }
                    >
                      <Button
                        disabled={selectedItems.length > 1}
                        type="primary"
                        style={{
                          borderColor: "#3e79f7",
                          backgroundColor: "transparent",
                        }}
                        icon={<EditOutlined style={{ color: "#3e79f7" }} />}
                      ></Button>
                    </Link>
                  )}
  
                  {/* {hasNotification && (
                    <Button
                      onClick={() => {
                        setPostObject({
                          ...postObject,
                          topic: `single${hasNotification}`,
                          target_id: record.id,
                        });
                        setStatusVisible(true);
                      }}
                      type="primary"
                      icon={<BellOutlined />}
                    ></Button>
                  )} */}
  
                  {/* {noDeleteAction ? null : (
                    <Popconfirm
                      title="Are you sure？"
                      onConfirm={() => handelDelete(endPoint, record.id)}
                      icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                    >
                      <Button
                        danger
                        type="primary"
                        style={{
                          borderColor: "tomato",
                          backgroundColor: "transparent",
                        }}
                        icon={<DeleteOutlined style={{ color: "tomato" }} />}
                      ></Button>
                    </Popconfirm>
                  )} */}
                </div>
              );
            },
          },
    ];
    // console.log("from My custome table",radio)
    const x="ex"
    return (
      <div>
        {/* {deleteError ? (
          <Result
            status="error"
            title="Submission Failed"
            subTitle="Please check and modify the following information before resubmitting."
            extra={[
              <div>
                <Link to="/app/dashboards/default">
                 <Button type="primary" key="console" >
                Go Back
              </Button>
              </Link>
                <Link to={`${endPoint}`}>
              <Button key="buy">Try Again</Button>
                </Link>
              </div>
      
            ]}
          ></Result> */}
          
        <Table
          tableLayout="auto"
          
          rowKey={(item) => item.id?.toString()}
          rowSelection={{
            type: radio?"radio":"checkbox",
            ...rowSelection,
            // selectedRowKeys:['179'],
            defaultSelectedRowKeys:i_d?[i_d]:null,
            // getCheckboxProps: (record) => ({
              
            //   disabled: record.service_name_en === "Dresses",
            //   // Column configuration not to be checked
            //   checked:record.service_name_en === "Dresses",
            //   style:{backgroundColor:"red"},
            //   service_name_en: record.service_name_en
            //   // selected:record.name
            // }),          
            
            onSelect:useSELECT==true?(index,data)=> setPostobject({...Postobject,screen_id:index.id,screen_service_id:index.service_id}):null
          }}
          pagination={{
            pageSize:10,
            total:totalPages,
            onChange:(page)=>{
                Fetch_record(page)
            }
          }}
          loading={loading}
           columns={[...coloumRender, ...columns]}
          dataSource={dataRender}
          title={() => {
            return (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h2>{pageTitle}</h2>
                {searchUrl && (
                  <Search
                    setCurrentList={setCurrentList}
                    prevousState={prevousState}
                    url={searchUrl}
                  />
                )}
                {searchUrl_order && (
                  <Search_order_id
                    setCurrentList={setCurrentList}
                    prevousState={prevousState}
                    url={searchUrl_order}
                  />
                )}
                <div  
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {hasNotification && (
                    <Button
                      type="default "
                      style={{ minWidth: 100 }}
                      onClick={() => {
                        setPostObject({
                          ...postObject,
                          topic:
                            hasNotification === "Seller" ? "seller" : "client",
                        });
                        setStatusVisible(true);
                      }}
                      icon={<BellOutlined />}
                    >
                      Notifiy All
                    </Button>
                  )}
                  {noAddOption ? null : (
                    <Link
                      to={{
                        pathname: `/app/apps/${addEndPoint}`,
                        search: sellerId ? `?name=${sellerId}` : "",
                      }}
                    >
                      <Button
                        style={{ minWidth: 130, marginTop: 10 }}
                        type="primary"
                      >
                        {direction === "ltr" ? "Add Record" : "اضافه سجل "}
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            );
          }}
        ></Table>
        <Modal
          title="Change Status"
          visible={statusVisible}
          destroyOnClose={true}
          onOk={() => onFinish()}
          okText="Save"
          // footer={[
          //   <Button
          //     key="back"
          //     onClick={() => {
          //       form.resetFields();
          //       setPostObject(INITAL_STATE);
          //       setStatusVisible(false);
          //     }}
          //   >
          //     Cancel
          //   </Button>,
          //   <Button key="submit" htmlType="submit" type="primary">
          //     Submit
          //   </Button>,
          // ]}
          // afterClose={() => }
          onCancel={() => {
            form.resetFields();
            setPostObject(INITAL_STATE);
            setStatusVisible(false);
          }}
          okButtonProps={{ disabled: okButtonValidation() }}
        >
          <Form
            onSubmitCapture={(e) => {
              e.preventDefault();
            }}
            form={form}
            name="notification"
            layout="vertical"
          >
            <Form.Item
              required
              style={{
                display: "inline-block",
                width: "calc(50% - 5px)",
                marginRight: 8,
              }}
              name="title_ar"
              hasFeedback
              label="Title in Arabic"
              // rules={[
              //   ({ getFieldValue }) => ({
              //     validator(_, value) {
              //       if (!value)
              //         return Promise.reject("Please enter The Title in Arabic");
  
              //       const checkValidation = languageValidator(
              //         value.toLowerCase(),
              //         ARABIC_alpha
              //       );
              //       if (checkValidation) {
              //         return Promise.resolve();
              //       } else {
              //         return Promise.reject("Please enter The Title in Arabic");
              //       }
              //     },
              //   }),
              // ]}
            >
              <Input
                onPressEnter={(e) => e.preventDefault()}
                onChange={(event) =>
                  setPostObject({
                    ...postObject,
                    title_ar: event.target.value,
                  })
                }
                placeholder="Please enter Title in Arabic"
              />
            </Form.Item>
            <Form.Item
              style={{
                display: "inline-block",
                width: "calc(50% - 5px)",
              }}
              required
              name="title_en"
              label="Title in English"
              hasFeedback
              // rules={[
              //   ({ getFieldValue }) => ({
              //     validator(_, value) {
              //       const checkValidation = languageValidator(
              //         value.toLowerCase(),
              //         ENGLISH_ALPH
              //       );
              //       if (checkValidation) {
              //         return Promise.resolve();
              //       } else {
              //         return Promise.reject("Please enter The Title in English");
              //       }
              //     },
              //   }),
              // ]}
            >
              <Input
                onPressEnter={(e) => e.preventDefault()}
                onChange={(event) =>
                  setPostObject({
                    ...postObject,
                    title_en: event.target.value,
                  })
                }
                placeholder="Please enter Product Title in English"
              />
            </Form.Item>
  
            <Form.Item
              required
              name="body_ar"
              label="Body in Arabic"
              hasFeedback
              // rules={[
              //   ({ getFieldValue }) => ({
              //     validator(_, value) {
              //       if (!value)
              //         return Promise.reject("Please enter The Body in Arabic");
  
              //       const checkValidation = languageValidator(
              //         value.toLowerCase(),
              //         ARABIC_alpha
              //       );
              //       if (checkValidation) {
              //         return Promise.resolve();
              //       } else {
              //         return Promise.reject("Please enter The Body in Arabic");
              //       }
              //     },
              //   }),
              // ]}
            >
              <Input.TextArea
                placeholder="Enter the Body in Arabic"
                onChange={(event) =>
                  setPostObject({
                    ...postObject,
                    body_ar: event.target.value,
                  })
                }
                rows={4}
              />
            </Form.Item>
  
            <Form.Item
              required
              name="body_en"
              hasFeedback
              label="Body in English"
              // rules={[
              //   ({ getFieldValue }) => ({
              //     validator(_, value) {
              //       const checkValidation = languageValidator(
              //         value.toLowerCase(),
              //         ENGLISH_ALPH
              //       );
              //       if (checkValidation) {
              //         return Promise.resolve();
              //       } else {
              //         return Promise.reject("Please enter The Body in English");
              //       }
              //     },
              //   }),
              // ]}
            >
              <Input.TextArea
                placeholder="Enter the Body in English"
                onChange={(event) =>
                  setPostObject({
                    ...postObject,
                    body_en: event.target.value,
                  })
                }
                rows={4}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
  