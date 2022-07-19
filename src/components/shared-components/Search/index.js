import React, { useState } from "react";

import { Button, Input, message, Select } from "antd";
import service from "auth/FetchInterceptor";
import { SearchOutlined } from "@ant-design/icons";
import { useFetch } from "hooks";

const Search = ({
  dataIndex,
  setCurrentList,
  prevousState,
  url,
  currentList,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  return (
    <div style={{ padding: 8 }}>
      {/* <Input
        placeholder={`Search...`}
        allowClear={true}
        value={searchTerm}
        autoFocus
        prefix={<SearchOutlined />}
        onChange={(e) => setSearchTerm(e.target.value)}
        // onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
        style={{ width: 200, marginBottom: 8 }}
      /> */}
      <Select
        onPressEnter={(e) => e.preventDefault()}
        showSearch={true}
        placeholder="Name:ex"
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        defaultActiveFirstOption={false}
        notFoundContent={null}
        style={{ minWidth: 150, marginBottom: 10 }}
        onSelect={async (e) => {
          try {
            const res = await service
              .get(`/web/${url}=${e}`)
              .then((res) => res);
            setLoading(false);
            setCurrentList(res.records.data);
          } catch (error) {
            setLoading(false);
          }
        }}
        onSearch={async (e) => {
          try {
            const res = await service
              .get(`/web/${url}=${e}`)
              .then((res) => res);
            setLoading(false);
            setCurrentList(res.records.data);
          } catch (error) {
            setLoading(false);
          }
        }}
      >
        {/* {services?.map((element) => (
          <Select.Option key={element.id} value={element.id}>
            {element.name}
          </Select.Option>
        ))} */}
      </Select>
      {/* <Button
        type="primary"
        icon={<SearchOutlined />}
        loading={loading}
        size="small"
        style={{ width: 90, marginRight: 8, marginLeft: 8 }}
        onClick={async () => {
          const key = "updatable";
          message.loading({ content: "Loading...", key, duration: 15 });
          setLoading(true);
          try {
            const res = await service
              .get(`/web/${url}=${searchTerm}`)
              .then((res) => res);
            message.success({ content: "Done!", key, duration: 2 });
            setLoading(false);
            setCurrentList(res.records.data);
          } catch (error) {
            setLoading(false);
            message.error({ content: "Error Occured!", key, duration: 2 });
          }
        }}
      >
        Search
      </Button> */}
      <Button
        style={{ marginLeft: 8 }}
        onClick={() => setCurrentList(prevousState)}
      >
        Reset
      </Button>
    </div>
  );
};
export default Search;
