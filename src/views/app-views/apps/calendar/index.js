import { CalendarOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Badge,
  Button,
  Calendar,
  Card,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  TimePicker,
  Tooltip,
} from "antd";
import service from "auth/FetchInterceptor";
import { DATE_FORMAT_Farahy } from "constants/DateConstant";
import moment from "moment";
import React, { useEffect, useState } from "react";
const { Option } = Select;

const badgeColors = [
  "pink",
  "red",
  "yellow",
  "orange",
  "cyan",
  "green",
  "blue",
  "purple",
  "geekblue",
  "magenta",
  "volcano",
  "gold",
  "lime",
];

const initialFormValues = {
  title: "",
  start: moment("00:00:00", "HH:mm:ss"),
  end: moment("00:00:00", "HH:mm:ss"),
  bullet: badgeColors[1],
};

const CURRENT_DATE = moment().format(DATE_FORMAT_Farahy);
const getDate = (date) => {
  return date;
  //   return moment(new Date(y, m, date)).format(DATE_FORMAT_YYYY_MM_DDTHH_mm_ssZ);
};
const dateFormat = DATE_FORMAT_Farahy;

const AgendaList = (props) => {
  const { list, onDelete, checkView } = props;
  return list?.map((list) => (
    <div key={list?.date} className="calendar-list">
      <h4>
        <CalendarOutlined />
        <span className="ml-2">{list.date}</span>
      </h4>
      {list?.event?.map((eventItem, i) => (
        <div key={`${eventItem.title}-${i}`} className="calendar-list-item">
          <div className="d-flex">
            <Badge color={eventItem.bullet} />
            <div>
              <h5 className="mb-1">{eventItem.title}</h5>
              <span className="text-muted">Locked</span>
            </div>
          </div>
          <div className="calendar-list-item-delete">
            <Tooltip title="Delete event">
              <DeleteOutlined
                onClick={() => {
                  if (checkView) return null;
                  else {
                    onDelete(list, i);
                  }
                }}
              />
            </Tooltip>
          </div>
        </div>
      ))}
    </div>
  ));
};

const EventModal = ({
  visible,
  addEvent,
  cancel,
  sellerProductList,
  loadingButton,
  checkView,
}) => {
  const [form] = Form.useForm();
  const [disableButton, setDisableButton] = useState(true);
  const onSubmit = (values) => {
    addEvent(values);
  };

  useEffect(() => {
    form.setFieldsValue(initialFormValues);
  });
  return (
    <Modal
      title="Lock Product"
      visible={visible}
      footer={null}
      destroyOnClose={true}
      onCancel={cancel}
    >
      <Form
        form={form}
        layout="vertical"
        name="new-event"
        preserve={false}
        onFinish={onSubmit}
      >
        <Form.Item required name="product_id" label="Product Name:">
          <Select
            onPressEnter={(e) => e.preventDefault()}
            showSearch
            placeholder="Select a Product"
            onSelect={(e) => setDisableButton(false)}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {sellerProductList?.map((element, index) => (
              <Option key={element.id} value={element.id}>
                {element?.name_en}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {/* <Row gutter="16">
          <Col span={12}>
            <Form.Item name="start" label="Start">
              <TimePicker className="w-100" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="end" label="End">
              <TimePicker className="w-100" />
            </Form.Item>
          </Col>
        </Row> */}
        <Form.Item name="bullet" label="Label">
          <Select>
            {badgeColors.map((elm) => (
              <Option value={elm} key={elm}>
                <Badge color={elm} />
                <span className="text-capitalize font-weight-semibold">
                  {elm}
                </span>
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item className="text-right mb-0">
          <Button
            type="primary"
            htmlType="submit"
            loading={loadingButton}
            disabled={disableButton || checkView}
          >
            Lock Product
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const CalendarApp = ({
  backCalenderList,
  sellerProducts,
  sellerid,
  refetchManualLock,
  readyToLoad,
  checkView,
}) => {
  const [calendarList, setCalendarList] = useState(backCalenderList);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loadingButton, setLoadingButton] = useState(false);
  const sellerProductList = sellerProducts;
  const cellRender = (value) => {
    const listData = getListData(value.format(dateFormat));
    return (
      <ul className="calendar-event">
        {listData.map((item, i) => (
          <li key={`${item.title}-${i}`}>
            <Badge
              color={item.bullet}
              text={item.title}
              style={{ fontWeight: "bold", fontSize: 24 }}
            />
            <span
              className="text-muted"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Locked
            </span>
          </li>
        ))}
      </ul>
    );
  };

  const getListData = (value) => {
    let listData = [];
    calendarList.forEach((elm) => {
      if (elm.date === value) {
        listData = elm.event;
      }
    });
    return listData;
  };

  const onSelect = (value) => {
    // const selectedDate = value.format(dateFormat);
    setModalVisible(true);
    setSelectedDate(value?._d?.toUTCString());
  };

  const onDeleteEvent = async (date, index) => {
    const key = "updateable";
    message.loading({ content: "Loading...", key, duration: 15 });

    try {
      await service.delete(`web/manualLocks/${date.seller_id}/${date.id}`);
      const newData = await refetchManualLock();
      if (newData.data.data.length >= 0) {
        const newCreatedArray = newData.data.data?.map((element) => {
          return { ...element, newLockDate: element.lock_date?.split(" ")[0] };
        });

        setCalendarList(
          newCreatedArray.map((element) => {
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
      message.success({ content: "Done!", key, duration: 2 });
    } catch (error) {
      message.error({ content: "Error Occured!", key, duration: 2 });
    }
    // const data = calendarList
    //   .map((calendarList) => {
    //     if (calendarList.date === date) {
    //       calendarList.event = calendarList.event.filter((_, i) => i !== index);
    //     }
    //     return calendarList;
    //   })
    //   .filter((elm) => elm.event.length !== 0);
    // setCalendarList(data);
  };

  const onAddEvent = async (values) => {
    const key = "updateable";
    const postData = {
      product_id: values.product_id,
      lock_date: selectedDate,
    };
    message.loading({ content: "Loading...", key, duration: 15 });
    setLoadingButton(true);
    try {
      await service.post(`web/manualLocks/${sellerid}`, postData);
      setLoadingButton(false);
      const newData = await refetchManualLock();
      if (newData.data.data.length > 0) {
        const newCreatedArray = newData.data.data?.map((element) => {
          return { ...element, newLockDate: element.lock_date?.split(" ")[0] };
        });

        setCalendarList(
          newCreatedArray.map((element) => {
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
      message.success({ content: "Done!", key, duration: 2 });
      // const data = [
      //   {
      //     title: values.title
      //       ? values.title
      //       : values.product_id
      //       ? sellerProductList.find(
      //           (element) => element.id === values.product_id
      //         ).name_en
      //       : "Untitled Event",
      //     bullet: values.bullet,
      //   },
      // ];
      // const newCalendarArr = calendarList;
      // const isExistingDate = newCalendarArr.find(
      //   (x) => x.date === selectedDate
      // );

      // if (isExistingDate) {
      //   for (let elm of newCalendarArr) {
      //     if (elm.date === selectedDate) {
      //       elm.event = [...elm.event, ...data];
      //     }
      //   }
      // } else {
      //   newCalendarArr.push({ date: selectedDate, event: data });
      // }
      // const sortedNewCalendarArr = newCalendarArr.sort(
      //   (a, b) => moment(a.date) - moment(b.date)
      // );

      setModalVisible(false);
      // setCalendarList(sortedNewCalendarArr);
    } catch (error) {
      setLoadingButton(false);

      message.error({ content: "Error Occured!", key, duration: 2 });
    }
  };

  const onAddEventCancel = () => {
    setModalVisible(false);
  };

  return (
    <Card className="calendar mb-0">
      {readyToLoad && (
        <>
          <Row>
            <Col
              xs={24}
              sm={24}
              md={9}
              lg={6}
              style={{ maxHeight: 800, overflowY: "auto" }}
            >
              <h2 className="mb-4">Agenda</h2>
              <AgendaList
                list={calendarList}
                checkView={checkView}
                onDelete={onDeleteEvent}
              />
            </Col>
            <Col xs={24} sm={24} md={15} lg={18}>
              <Calendar
                disabledDate={(current) =>
                  CURRENT_DATE > current.format(DATE_FORMAT_Farahy)
                }
                onSelect={(val) => onSelect(val)}
                dateCellRender={cellRender}
              />
            </Col>
          </Row>
          <EventModal
            visible={modalVisible}
            sellerProductList={sellerProductList}
            addEvent={onAddEvent}
            cancel={onAddEventCancel}
            loadingButton={loadingButton}
            checkView={checkView}
          />
        </>
      )}
    </Card>
  );
};

export default CalendarApp;
