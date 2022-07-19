import { Button, Form, message, Tabs, notification,Card ,Badge} from "antd";
import service from "auth/FetchInterceptor";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import Loading from "components/shared-components/Loading";
import { useFetch, useFetchSingle } from "hooks";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation,Link } from "react-router-dom";
import Billing from "views/app-views/pages/setting/Billing";
import GeneralField from "./GeneralField";
import StoreInformation from "./StoreInformation";
import StatisicsPage from "views/app-views/dashboards/sales";
import ProductsLocks from "../../../../calendar";
import DrAvailability from "../../../../doctors/DrAvailability";
import SellerProdcuts from "./SellerProdcuts";
import AccountManager from "../AddSellerForm/AccountManager";
import { SELLER_LOGO } from "constants/ThemeConstant";
import CustomTable from "views/app-views/apps/Components/CustomTable";
import SmS from "../../../SmS";


const { TabPane } = Tabs;
const WishListCOLOUM = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: (a, b) => a.id - b.id,
    render: (id) => `# ${id}`,
  },
  {
    title: "Body",
    dataIndex: "name",
    key: "body_en",
    render: (_, obj) => obj?.sms?.body_ar,
    // filterDropdown: (
    //   <Search
    //     setCurrentList={setCurrentList}
    //     dataIndex={"Seller Name"}
    //     prevousState={services}
    //     url="seller/search?seller_search"
    //   />
    // ),
    // filterIcon: (filtered) => (
    //   <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    // ),
  },
  {
    title: "Date",
    dataIndex: "updated_at",
    key: "updated_at",
    render: (date) => date.split("T")[0],
    sorter: (a, b) => a.updated_at - b.updated_at,
  },

  {
    title: "Is Readed ?",
    align: "center",
    render: (test, record) => (record.is_read ?
      // <div   style={{ display: "flex" }}>
      <><Badge status="success" />
      <span style={{ fontWeight: "bolder" }}>Done</span></>
      
    // </div>
    :< >
    <Badge status="error" />
    <span style={{ fontWeight: "bolder" }}>Not Yet</span>
  </>
    ),
  },
  // {
  //   title: "Status",
  //   dataIndex: "active",
  //   key: "active",
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
const NotificationList = [
  {
    title: "ID",
    dataIndex: "notification_id",
    key: "notification_id",
    sorter: (a, b) => a.notification_id - b.notification_id,
    render: (notification_id) => `# ${notification_id}`,
  },
  {
    title: "Body",
    dataIndex: "name",
    key: "body_en",
    render: (_, obj) => obj?.notification?.body_ar,
    // filterDropdown: (
    //   <Search
    //     setCurrentList={setCurrentList}
    //     dataIndex={"Seller Name"}
    //     prevousState={services}
    //     url="seller/search?seller_search"
    //   />
    // ),
    // filterIcon: (filtered) => (
    //   <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    // ),
  },
  {
    title: "Is Readed ?",
    align: "center",
    render: (test, record) => (record.is_read ?
      // <div   style={{ display: "flex" }}>
      <><Badge status="success" />
      <span style={{ fontWeight: "bolder" }}>Done</span></>
      
    // </div>
    :< >
    <Badge status="error" />
    <span style={{ fontWeight: "bolder" }}>Not Yet</span>
  </>
    ),
  },
  {
    title: "Date",
    dataIndex: "updated_at",
    key: "updated_at",
    render: (_, obj) => obj?.notification?.updated_at.split("T")[0],
    sorter: (a, b) => a.updated_at - b.updated_at,
  },

  
];
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const TableList = ({ mainList, title, columns, read }) => {
  return (
    <Card title={title}>
      {/* <Row gutter={30}>
        <Col sm={24} md={12}>
          {interestedList
            .filter((_, i) => i < 4)
            .map((elm, i) => {
              return (
                <div className="mb-3" key={`interested-${i}`}>
                  <h4 className="font-weight-semibold">{elm.title}</h4>
                  <p>{elm.desc}</p>
                </div>
              );
            })}
        </Col>
        <Col sm={24} md={12}>
          {interestedList
            .filter((_, i) => i >= 4)
            .map((elm, i) => {
              return (
                <div className="mb-3" key={`interested-${i}`}>
                  <h4 className="font-weight-semibold">{elm.title}</h4>
                  <p>{elm.desc}</p>
                </div>
              );
            })}
        </Col>
      </Row> */}
      <CustomTable
        coloumRender={columns}
        dataRender={mainList}
        noAddOption
        noDeleteAction
        noEditAction
        editEndPoint="generic/readOrder"
        noViewAction={read ? false : true}
        noAction={read ? false : true}
      />
    </Card>
  );
};

const ProductForm = () => {
  const [form] = Form.useForm();
  const [uploadedImg, setImage] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [buttonChecker, setButtonChecker] = useState(true);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [variationList, setVariationList] = useState([]);

  const location = useLocation();
  const recordId = new URLSearchParams(location.search).get("id");
  const actionType = new URLSearchParams(location.search).get("name");

  const { services, isLoading, isSuccess, refetch } = useFetchSingle(
    `sellers/${recordId}`
  );

  const sellerStatisitcsResponse = useFetch(`sellerStatistics/${recordId}`);
  const sellerStatistics = sellerStatisitcsResponse.services;
  const SMS =useFetch(`seller/sms/${recordId}`)
const Seller_Sms=SMS.services
const Notif =useFetch(`sellerNotifications/${recordId}`)
const Seller_NotificationsList=Notif.services
  // const test = useFetch(`services`);
  // const serviceList = test.services;
console.log("Seller_Sms",Seller_Sms)
  const countryListRes = useFetch("countries");
  const countryList = countryListRes.services;
  const countryListSuccess = countryListRes.isSuccess;

  const cities = useFetch("cities");
  const cityList = cities.services;
  const citySuccess = cities.isSuccess;
  const payment_method = useFetch("paymentMethods");
  const paymentMethodList = payment_method.services;
  const manualLockRes = useFetch(`manualLocks/${recordId}`);
  const manualLockList = manualLockRes.services;
  const refetchManualLock = manualLockRes.refetch;
  const manualLockSuccess = manualLockRes.isSuccess;
  const [correctArray, setCorrectArray] = useState([]);
  const sellerProductsRes = useFetch(`sellerProducts/${recordId}`);
  const sellerProducts = sellerProductsRes.services;
  // const dummyData = [
  //   {
  //     id: 1,
  //     seller_id: 1,
  //     product_id: 1,
  //     lock_date: "2021-08-23 14:40:00+02",
  //     active: true,
  //     approve: false,
  //     subscribed: true,
  //     created_at: null,
  //     updated_at: null,
  //     deleted_at: null,
  //   },
  //   {
  //     id: 2,
  //     seller_id: 1,
  //     product_id: 1,
  //     lock_date: "2021-08-24 17:50:00+02",
  //     active: true,
  //     approve: false,
  //     subscribed: true,
  //     created_at: null,
  //     updated_at: null,
  //     deleted_at: null,
  //   },
  //   {
  //     id: 3,
  //     seller_id: 1,
  //     product_id: 1,
  //     lock_date: "2021-08-26 19:20:00+02",
  //     active: true,
  //     approve: false,
  //     subscribed: true,
  //     created_at: null,
  //     updated_at: null,
  //     deleted_at: null,
  //   },
  // ];
  useEffect(() => {
    if (manualLockList?.data.length > 0) {
      const newCreatedArray = manualLockList?.data?.map((element) => {
        return { ...element, newLockDate: element.lock_date?.split(" ")[0] };
      });
      setCorrectArray(
        newCreatedArray?.map((element) => {
          return {
            ...element,
            date: element.newLockDate,
            event: [
              {
                title: element.product_name_en,
                bullet: "red",
              },
            ],
          };
        })
      );
    }
  }, [manualLockSuccess]);
  const inialState = {
    first_name: "",
    id: "",
    last_name: "",
    password: "",
    email: "",
    country_code: null,
    phone: "",
    service_id: null,
    store_name_ar: "",
    store_name_en: "",
    store_address_ar: "",
    store_address_en: "",
    // store_lat: "",
    // store_long: "",
    open_at: "10:10",
    close_at: "10:10",
    store_phone: "",
    store_lat: 30.04720230873402,
    store_long: 31.240386415272962,
    country_id: null,
    city_id: null,
    payment_method: [],
    status: true,
    is_forget_password: true,
    defaultImage: false,
    instagram_link: "",
    facebook_link: "",
    seller_type:""
  };
  const [postObject, setPostObject] = useState(inialState);
  useEffect(() => {
    if (isSuccess && countryListSuccess && citySuccess) {
      console.log("servicesservices",services)
      form.resetFields();
      setVariationList(services?.store?.account_mangers);
      setPostObject({
        ...services,
        phone: services.phone.toString().split("+2")[1],
      });
    }
  }, [isSuccess, citySuccess]);
  //Handle Notification
  const sellerTopProductRes = useFetchSingle(`sellerTopProducts/${recordId}`);
  const sellerTopProductList = sellerTopProductRes.services;
  const sellerReservationRes = useFetch(`sellerReservationsList/${recordId}`);
  const sellerReservationLit = sellerReservationRes.services;
  const sellerOrderListRes = useFetch(`sellerOrdersList/${recordId}`);
  const sellerOrderList = sellerOrderListRes.services;
  const passwordChecker = () => {
    let checker = false;
    if (postObject.password) {
      if (postObject.password.length < 6) {
        checker = true;
      } else {
        checker = false;
      }
    }
    return checker;
  };
  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Process Feedback",
      description: "Your Process has been Done Successfully!",
    });
  };
  const buttonValidationObject = {
    service_id: null,
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    payment_method: [],
  };
  // Button Disabled
  const buttonValidation = () => {
    let count = 0;
    for (const key in buttonValidationObject) {
      if (!postObject[key] || postObject["payment_method"].length == 0) {
        count++;
      }
    }
    if (count == 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleUploadChange = (info) => {
    if (info.file.status === "uploading") {
      setUploadLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImage(imageUrl);
        setUploadLoading(true);
      });
    }
  };

  const onFinish = async (postObject, recordId) => {
    setLoading(true);
    if (!postObject["password"]) {
      delete postObject["password"];
    }

    try {
      // const koanfa = { ...postObject, ...postObject?.store };
      await service.put(`/web/sellers/${recordId}`, {
        ...postObject,
        main_image: postObject.defaultImage
          ? SELLER_LOGO
          : postObject.main_image.split("/")[4]
          ? postObject.main_image.split("/")[4]
          : postObject.main_image,
      });
      setLoading(false);
      openNotificationWithIcon("success");
      refetch();
      history.push("seller");
    } catch (error) {
      setLoading(false);
    }
  };
  const paymentMethodConvert = () => {
    if (
      postObject?.payment_method?.find((element) => element.active === true)
    ) {
      setPostObject({
        ...postObject,
        payment_method: postObject.payment_method.map(
          (element) => element.payment_method_id
        ),
      });
    } else {
      setPostObject({
        ...postObject,
        payment_method: postObject.payment_method.map((element) => element.id),
      });
    }
  };
useEffect(()=>{
console.log("postObjectpostObjectpostObject",postObject)
},[postObject])
  // useEffect(() => {
  //   if (
  //     postObject?.payment_method?.find((element) => element.active === true)
  //   ) {
  //     setPostObject({
  //       ...postObject,
  //       payment_method: postObject?.payment_method?.map(
  //         (element) => element.payment_method_id
  //       ),
  //     });
  //   // } else  {
  //   //   setPostObject({
  //   //     ...postObject,
  //   //     payment_method: postObject?.payment_method?.map(
  //   //       (element) => element.id
  //   //     ),
  //   //   });
  //   // }
  // }, [postObject?.payment_method]);
  return (
    <>
      {isLoading ? (
        <Loading cover="content" align={"center"} loading={true} />
      ) : (
        <Form
          layout="vertical"
          form={form}
          name="advanced_search"
          onFinish={() => {
            paymentMethodConvert();
            const data = {
              ...postObject,
              phone: `+2${postObject.phone}`,
            };
            onFinish(data, recordId);
          }}
          onSubmitCapture={(e) => {
            e.preventDefault();
          }}
          className="ant-advanced-search-form"
          initialValues={{
            prefix: "+2",
          }}
        >
          <PageHeaderAlt className="border-bottom" overlap>
            <div className="container">
              <Flex
                className="py-2"
                mobileFlex={false}
                justifyContent="between"
                alignItems="center"
              >
                <h2 className="mb-3">
                  {actionType === "view" ? "Read Seller" : "Edit Seller"}
                </h2>
                <div className="mb-3">
                  <Button
                    className="mr-2"
                    onClick={() => history.push("seller")}
                  >
                    Go Back
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={
                      !buttonValidation() ||
                      actionType === "view" ||
                      !buttonChecker ||
                      postObject?.email?.length < 2 ||
                      passwordChecker()
                    }
                    loading={loading}
                    onClick={() => {
                      if (
                        postObject?.payment_method?.find(
                          (element) => element.active === true
                        )
                      ) {
                        setPostObject({
                          ...postObject,
                          payment_method: postObject.payment_method.map(
                            (element) => element.payment_method_id
                          ),
                        });
                      } else {
                        setPostObject({
                          ...postObject,
                          payment_method: postObject.payment_method.map(
                            (element) => element.id
                          ),
                        });
                      }
                    }}
                  >
                    Save
                  </Button>
                </div>
              </Flex>
            </div>
          </PageHeaderAlt>
          <div className="container">
            <Tabs defaultActiveKey="0" style={{ marginTop: 30 }}>
              <TabPane tab="All Products" key="0">
                <SellerProdcuts
                  serviceId={postObject.service_id}
                  sellerId={recordId}
                  store_id={services?.store?.id}
                />
              </TabPane>
              <TabPane tab="General" key="1">
                <GeneralField
                  setButtonChecker={setButtonChecker}
                  buttonChecker={buttonChecker}
                  uploadedImg={uploadedImg}
                  uploadLoading={uploadLoading}
                  handleUploadChange={handleUploadChange}
                  setPostObject={setPostObject}
                  postObject={postObject}
                  checkViewMode={actionType === "view"}
                  countries={countryList}
                  cityList={cityList}
                  paymentMethodList={paymentMethodList}
                />
              </TabPane>
              <TabPane tab="Store" key="2">
                <StoreInformation
                  postObject={postObject}
                  setPostObject={setPostObject}
                  paymentMethodList={paymentMethodList}
                  countries={countryList}
                  cityList={cityList}
                  checkView={actionType === "view"}
                />
              </TabPane>
              <TabPane tab="Account Manager" key="3">
                <AccountManager
                  isDisabled={true}
                  variationList={variationList}
                  setVariationList={setVariationList}
                />
              </TabPane>
              <TabPane tab="Payment Method" key="4">
                <Billing
                  checkView={actionType === "view"}
                  postObject={postObject}
                  setPostObject={setPostObject}
                  paymentMethodList={paymentMethodList}
                  // actionType={true}
                  countries={countryList}
                  cityList={cityList}
                  paymentList={postObject?.payment_method}
                />
              </TabPane>
              {postObject.service_id == 3 && (
                <TabPane tab="Doctor Availability" key="5">
                  <DrAvailability sellerid={recordId} />
                </TabPane>
              )}
              <TabPane tab="Locked Products" key="6">
                <ProductsLocks
                  sellerProducts={sellerProducts}
                  backCalenderList={correctArray}
                  sellerid={recordId}
                  checkView={actionType === "view"}
                  refetchManualLock={refetchManualLock}
                  readyToLoad={manualLockSuccess ? true : false}
                />
              </TabPane>

              {actionType === "view" && (
                <TabPane tab="Seller Statistics" key="7">
                  <StatisicsPage
                    sellerid={postObject.id}
                    sellerTopProductList={sellerTopProductList}
                    sellerStatistics={sellerStatistics}
                    service_id={postObject.service_id}
                    sellerReservationList={sellerReservationLit}
                    sellerOrderList={sellerOrderList?.records}
                  />
                </TabPane>
              )}
                 {actionType === "view" && (
                <TabPane tab="List of Notifications" key="8">
                  <TableList
                      title="List of Notifications"
                      mainList={Seller_NotificationsList}
                      columns={NotificationList}
                    />
                </TabPane>
              )}
               {actionType === "view" && (
                <TabPane tab="List of SMS" key="9">
                  <TableList
                      title="List of SMS"
                      mainList={Seller_Sms}
                      columns={WishListCOLOUM}
                    />
                </TabPane>
              )}
            </Tabs>
          </div>
        </Form>
      )}
    </>
  );
};

export default ProductForm;
