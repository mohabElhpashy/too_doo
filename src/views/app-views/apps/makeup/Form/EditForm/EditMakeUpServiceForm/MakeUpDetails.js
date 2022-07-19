import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Row, Select } from "antd";
import React from "react";

function MakeUpDetails({
  detailsList,
  setDetailsList,
  orignalDetailesList,
  genericDetailsList,
  checkView,
}) {
  //    const handleAddition = (add,fields)=>{
  //      add();
  //      if(fields.length>0)setTempList([...tempList,variationList])
  //    }

  const handleSelect = (index, event, key) => {
    const values = [...detailsList];
    values[index][key] = event;
    // values[index]["name_en"] = orignalDetailesList.find(
    //   (element) => element.id === event
    // ).name_en;
    // genericDetailsList.filter((element, index) => element.id !== event);
    setDetailsList(values);
  };

  const removeElement = (field, id) => {
    const filteredList = detailsList.filter((element) => element.id !== id);
    setDetailsList(filteredList);
    // setGenericDetials([
    //   ...genericDetailsList,
    //   ...orignalDetailesList.filter(
    //     (element) => element.id === field.generic_detail_type_id
    //   ),
    // ]);
  };
  const handleAddition = () => {
    setDetailsList([
      ...detailsList,
      {
        id: Math.floor(Math.random() * 10000),
        generic_detail_type_id: null,
        generic_detail_id: null,
      },
    ]);
  };
  return (
    <Card title="">
      <Form.List name="details">
        {(fields, { add, remove }) => {
          return (
            <div className="mt-3">
              {detailsList?.map((field, index) => (
                <Row key={field.id} gutter={16}>
                  <Col sm={24} md={11}>
                    <Form.Item
                      required
                      label="Details"
                      name={[field.id, "generic_detail_type_id"]}
                      fieldKey={[
                        field.generic_detail_type_id,
                        "generic_detail_type_id",
                      ]}
                      // rules={[
                      //   ({}) => ({
                      //     validator(_, value) {
                      //       if (
                      //         index > 1 &&
                      //         field.generic_detail_type_id === value
                      //       ) {
                      //         return Promise.reject(
                      //           "Your Cant Duplicate Detail Type"
                      //         );
                      //       } else {
                      //         return Promise.resolve();
                      //       }
                      //     },
                      //   }),
                      // ]}
                      className="w-100"
                    >
                      <Select
                        disabled={checkView}
                        placeholder="Enter the Detail"
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        value={field.generic_detail_type_id}
                        defaultValue={field.generic_detail_type_id}
                        onChange={(e) => {
                          handleSelect(index, e, "generic_detail_type_id");
                        }}
                        className="w-100"
                      >
                        {genericDetailsList?.map((element) => (
                          <Select.Option
                            disabled={detailsList.find(
                              (item) =>
                                element.id === item.generic_detail_type_id
                            )}
                            value={element.id}
                            key={element.id}
                          >
                            {element.name_en}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col sm={24} md={11}>
                    {detailsList[index].generic_detail_type_id && (
                      <Form.Item
                        required
                        label="Value"
                        name={[field.id, "generic_detail_id"]}
                        fieldKey={[
                          field.generic_detail_id,
                          "generic_detail_id",
                        ]}
                        className="w-100"
                      >
                        <Select
                          disabled={checkView}
                          placeholder="Enter the Value"
                          showSearch
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          value={field?.generic_detail_id}
                          defaultValue={field.generic_detail_id}
                          onChange={(e) =>
                            handleSelect(index, e, "generic_detail_id")
                          }
                          className="w-100"
                        >
                          {orignalDetailesList
                            .find(
                              (element) =>
                                element.id ===
                                detailsList[index].generic_detail_type_id
                            )
                            .generic_details?.map((element) => (
                              <Select.Option
                                value={element.id}
                                key={element.id}
                              >
                                {element.name_en}
                              </Select.Option>
                            ))}
                        </Select>
                      </Form.Item>
                    )}
                  </Col>
                  <Col sm={24} md={2}>
                    <MinusCircleOutlined
                      className="mt-md-4 pt-md-3"
                      onClick={(e) => {
                        if (checkView) return null;
                        removeElement(field, field.id);
                      }}
                    />
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button
                  disabled={
                    checkView ||
                    orignalDetailesList?.length === detailsList.length
                  }
                  type="dashed"
                  onClick={() => handleAddition()}
                  className="w-100"
                >
                  <PlusOutlined /> Add Another Detail
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
    </Card>
  );
}

export default MakeUpDetails;
