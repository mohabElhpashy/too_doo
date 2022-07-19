import { Card, Form, Input, Row, Select, Upload,Button ,Tag} from "antd";
import service from "auth/FetchInterceptor";
import {
  ARABIC_alpha,
  ENGLISH_ALPH,
  NUMBER_CONSTANTS,
} from "constants/LanguagesConstent";
import { useFetch } from "hooks";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import countryList from "react-select-country-list";
// import { Table } from 'react-bootstrap';
import { Table } from "antd";



const { Dragger } = Upload;
const { Option } = Select;

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

 
const GeneralField = ({ listOfSellers }) => {
  const history = useHistory();

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: (a, b) => a.id - b.id,
    render: (id) => `# ${id}`,
  },
  {
    title: "Name",
    dataIndex: "first_name",
    // key: "first_name",
    render: (first_name, obj) => (
      <a
        onClick={() =>{
          if(obj.type=="Seller"){history.push(`veForm?name=view&id=${obj.id}`)} 
          else{history.push(`ReadClient?name=view&id=${obj.id}`)}
        }
        }
        
      >
        {/* {obj.first_name || obj.first_name +obj.last_name} */}
        {obj.first_name} {obj.last_name}
      </a>
    ),

  },
  {
    title: "Type ",
    dataIndex: "type",
    key: "type",
    render: (url) => `${url}`,
  },
  {
    title: "Phone ",
    dataIndex: "phone",
    key: "phone",
    render: (url) => `${url}`,
  },
  {
    title: "Created At ",
    dataIndex: "created_at",
    key: "created_at",
    render: (url) => `${url}`,
  },

  
];

  const [value, setValue] = useState("");
  const[postObject, setPostObject]=useState({phone:""})
  const [List,setList]=useState([])
  const options = useMemo(() => countryList().getData(), []);

  // const { services } = useFetch("services");
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}></Select>
    </Form.Item>
  );
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
  const egyptianPhoneValidation = (value) => {
    let resultCheck = false;
    if (value == "1" || value == "2" || value == "0" || value == "5") {
      resultCheck = true;
    }
    return resultCheck;
  };
//   const Search=async()=>{
//     console.log("search")
//   await service.get(`phoneSearch?phone=${postObject.phone}`).then(res=>{
//       setList(res.data)
//       console.log(res.data)
//   });
// }
useEffect(async()=>{
  await service.get(`phoneSearch?phone=${postObject.phone}`).then(res=>{
    setList(res.data)
    console.log(res.data)
});
},[postObject])
  return (
    <Row xs={24} sm={24} md={17}>
      <Card title="Basic Info" className="w-100">
       

      <div style={{display: "flex",
    justifyContent: "center",
    marginBottom: "20px"}}><Form.Item
          name="phone"
          // label="Phone Number:"
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
                              console.log(value.length)
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
                                  return Promise.reject(
                                    "This Number is Already Exists"
                                  );
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
                          setPostObject({
                            ...postObject,
                            phone: e.target.value,
                          });
                        }}
                        onPressEnter={(e) => e.preventDefault()}
                        value={postObject.phone}
                        placeholder="Please enter your Phone Number"
                        style={{ width: "100%" }}
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
              setPostObject({ ...postObject, phone: e.target.value });
            }}
            onPressEnter={(e) => e.preventDefault()}
            value={postObject.phone}
            placeholder="Please enter your Phone Number"
            style={{ width: "100%" }}
          />
        </Form.Item>
        {/* <Button onClick={Search}>Search</Button> */}
        </div>
        {/* <Table striped bordered hover title="Search Key Word">
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
        onClick={() => {
          if(data.type=="Seller"){history.push(`veForm?name=view&id=${data.id}`)} 
          else{history.push(`ReadClient?name=view&id=${data.id}`)}
        }
           }
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
</Table> */}
 <div>
   {List=="Not Found"?<h1>No Data Found</h1>: <Table
        // bordered
        // title={() => <h2>Admin Logs</h2>}
        // dataSource={paginationn?.data}
        // rowKey={(item) => item.id}
        dataSource={List}
        columns={columns}
        // pagination={paginationn}
        // onChange={(current) => handleChange(current)}
      />}
     
    </div>
        
      </Card>
    </Row>
  );
};

export default GeneralField;
