import { PlusOutlined } from "@ant-design/icons";
import { Button, message, Modal, Tag, Upload, Tooltip,  Form,Select,
Input} from "antd";
import service from "auth/FetchInterceptor";
import { convertingServiceId } from "constants/helperFunctions";
import ServiceIdConstants from "constants/ServiceIdConstants";
import { useFetch } from "hooks";
import { lowerCase } from "lodash";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CustomTable from "../Components/CustomTable";
import { Table } from 'react-bootstrap';
import {
    ARABIC_alpha,
    ENGLISH_ALPH,
    NUMBER_CONSTANTS,
  } from "constants/LanguagesConstent";
  const rules = {
    name: [
      {
        required: true,
        message: "Please enter product name",
      },
    ],
    description: [
      {
        required: true,
        message: "Please enter product description",
      },
    ],
    price: [
      {
        required: true,
        message: "Please enter product price",
      },
    ],
    comparePrice: [],
    taxRate: [
      {
        required: true,
        message: "Please enter tax rate",
      },
    ],
    cost: [
      {
        required: true,
        message: "Please enter item cost",
      },
    ],
  };
const Search_by_phone=()=>{
    const [List,setList]=useState([])
    const[Phone,setPhone]=useState({Myphone:""})
    const egyptianPhoneValidation = (value) => {
        let resultCheck = false;
        if (value == "1" || value == "2" || value == "0" || value == "5") {
          resultCheck = true;
        }
        return resultCheck;
      };
      const numberValidator = (value) => {
        const arrayOfChar = value.split("");
        let checker;
        for (let index = 0; index < arrayOfChar.length; index++) {
          if (NUMBER_CONSTANTS.find((element) => element === arrayOfChar[index])) {
            checker = true;
          } else {
            checker = false;
            break;
          }
        }
        return checker;
      };
      const prefixSelector= ()=>{return (
        <Form.Item name="prefix" noStyle>
          <Select style={{ width: 70 }}></Select>
        </Form.Item>
      )}
      const Search=async()=>{
          console.log("search")
        await service.get(`phoneSearch?phone=${Phone.Myphone}`).then(res=>{
            setList(res.data)
            console.log(res.data)
        });
      }
    useEffect(async()=>{
          
            console.log("useeffect",List)
    },[Phone])
return <>
<h3>Search By Phone</h3>
<div style={{display: "flex",
    justifyContent: "center",
    marginBottom: "20px"}}>
 <Form.Item
          name="phone"
        //   label="Phone Number:"
          onPressEnter={(e) => e.preventDefault()}
          hasFeedback
          rules={[
            {
              whitespace: true,
            },
            ({ getFieldValue }) => ({
              async validator(_, value) {
                if (value.length !== 11) {
                  return Promise.reject("Your Phone Must be 11 digits");
                } else if (
                  value[0] != 0

                  //  &&
                  // (value[2] != 0 ||
                  //   value[2] != 1 ||
                  //   value[2] != 2 ||
                  //   value[2] != 5)
                ) {
                  return Promise.reject("Your Phone Must be Valid Number");
                } else if (!egyptianPhoneValidation(value[2])) {
                  return Promise.reject("Your Phone Must be Valid Number");
                } else if (
                  !numberValidator(
                    value,
                    <Form.Item
                      name="phone"
                      label="Phone Number:"
                      val
                      onPressEnter={(e) => e.preventDefault()}
                      hasFeedback
                      rules={[
                        {
                          whitespace: true,
                        },
                        ({ getFieldValue }) => ({
                          async validator(_, value) {
                            if (value.length !== 11) {
                              return Promise.reject(
                                "Your Phone Must be 11 digits"
                              );
                            } else if (value[0] != 0) {
                              return Promise.reject(
                                "Your Phone Must be Valid Number"
                              );
                            } else if (value[1] != 1) {
                              return Promise.reject(
                                "Your Phone Must be Valid Number"
                              );
                            } else if (!egyptianPhoneValidation(value[2])) {
                              return Promise.reject(
                                "Your Phone Must be Valid Number"
                              );
                            } else if (!numberValidator(value)) {
                              return Promise.reject(
                                "Your Cant include Charcters"
                              );
                            } else {
                              if (value.length === 11) {
                                let checkDuplicate;
                                
                              }
                            }
                          },
                        }),
                      ]}
                    >
                      <Input
                        addonBefore={prefixSelector()}
                        maxLength={11}
                        onChange={(e) => {
                          setPhone({
                              ...Phone,
                            Myphone: e.target.value,
                          });
                        }}
                        onPressEnter={(e) => e.preventDefault()}
                        value={Phone.Myphone}
                        placeholder="Please enter your Phone Number"
                        style={{ width: "70%" }}
                      />
                    </Form.Item>
                  )
                ) {
                  return Promise.reject("Your Cant include Charcters");
                } else {
                  if (value.length === 11) {
                    let checkDuplicate;
                    try {
                      const res = await service.post("web/phones", {
                        phone: value,
                      });

                      if (res[0] === "seller not founded") {
                        checkDuplicate = false;
                      } else {
                        checkDuplicate = true;
                      }
                    } catch (error) {}
                    if (!checkDuplicate) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject("This Number is Already Exists");
                    }
                  }
                }
              },
            }),
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            maxLength={11}
            onChange={(e) => {
              setPhone({...Phone,
                Myphone: e.target.value });
            }}
            onPressEnter={(e) => e.preventDefault()}
            value={Phone.Myphone}
            placeholder="Please enter your Phone Number"
            style={{ width: "100%" }}
          />
        </Form.Item>
  <Button onClick={Search}>Search</Button></div>


<Table striped bordered hover title="Search Key Word">
<thead>
<tr>
<th>#Id</th>
<th>Name</th>
<th>Type</th>

<th>Phone</th>
<th>Created At</th>

</tr>
</thead>
<tbody style={{backgroundColor:"white"}}>
{List=="Not Found"?<h1>No Data Found</h1>:
List.map((data,index)=>{
// console.log(data.key_word.product)
const F_date=data.created_at.replace('Z','')
const E_Date=F_date.replace('T',' ')
return(
<tr key={index}>
<td>{data.id}</td>
<td><Tag
        className="cursor-pointer"
        // onClick={() => changeStatus(record)}
        color="#2db7f5"
        >{data.first_name} {data.last_name}</Tag></td>



    <td><div className="d-flex align-items-center justify-content-start ">
        <Tag
        // className="cursor-pointer"
        // onClick={() => changeStatus(record)}
        color="#f50"
        >
        {data.type}
        </Tag>
    </div></td>

<td> {data.phone}</td>
<td>{E_Date}</td>
</tr>
)
})}


</tbody>
</Table>
 
</>
}
export default Search_by_phone

