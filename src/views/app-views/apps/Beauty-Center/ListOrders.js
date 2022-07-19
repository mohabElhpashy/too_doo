import React from "react";
import { useFetch } from "hooks";
import CustomTable from "../Components/CustomTable";
import { useSelector } from "react-redux";
import { Badge } from "antd";
import utils from "utils";
import { useQuery } from "react-query";
import service from "auth/FetchInterceptor";
import { getPaymentStatus } from "constants/helperFunctions";
import { useHistory } from "react-router";

const ListOrders = () => {
  const history = useHistory();

  const trncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  const { data, isLoading, refetch } = useQuery("order", async () => {
    const res = await service.get(`/web/order/4`).then((res) => res.data);
    return res;
  });
  const { direction } = useSelector((state) => state.theme);
  const columns_en = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => ` # ${id} `,
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Client Name",
      dataIndex: "client_name",

      key: "client_name",
      sorter: (a, b) => a.client_name.length - b.client_name.length,
      render: (text, Obj) => (
    
        <a
          onClick={() =>
            history.push(
               `/app/apps/CRM/ReadClient?name=view&id=${Obj.client_id}`
            )
          }
        >
          {Obj.client_name}
        </a>
     
  ),
    },
    {
      title: "Store",
      dataIndex: "store_name",
      key: "store_name",
      render: (text, Obj) => (
        
         
         
         
            <a
              onClick={() =>
                history.push(
                   `/app/apps/beauty/editReadForm?name=view&id=${Obj.store_id}`
                )
              }
            >
              {Obj.store_name}
            </a>
         
        
      ),
    },
    {
      title: "Order Date",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Order Status",
      dataIndex: "status_id",
      render: (_, record) => (
        <>
          <Badge status={getPaymentStatus(record.status_type)} />
          <span>
            {record.status_type
              .split("")
              .map((element, index) => {
                if (index > 0) {
                  return element.toLowerCase();
                } else {
                  return element;
                }
              })
              .join("")}
          </span>
          {/* {record.status_type === "REFUSED" && (
            <>
              <span style={{ marginLeft: 5, marginRight: 5 }}>By</span>
              <span>
                {record.action_by
                  .split("")
                  .map((element, index) => {
                    if (index > 0) {
                      return element.toLowerCase();
                    } else {
                      return element;
                    }
                  })
                  .join("")}
              </span>
            </>
          )} */}
        </>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "status_id"),
    },
    {
      title: "Payment Method",
      dataIndex: "payment_method",
      // sorter: (a, b) => a.total_amount - b.total_amount,
      // render: (price) => `${price} EGP`,
      key: "payment_method",
    },
    {
      title: "Total Price",
      dataIndex: "total_amount",
      sorter: (a, b) => a.total_amount - b.total_amount,
      render: (price) => `${price} EGP`,
      key: "total_amount",
    },
  ];
  const columns_ar = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "الاسم",
      dataIndex: "name_ar",
      key: "name_ar",
      sorter: (a, b) => a.name_ar.length - b.name_ar.length,
    },
    {
      title: "العنوان",
      dataIndex: "address_ar",
      render: (text) => {
        return trncate(text, 30);
      },
      key: "address_ar",
      sorter: (a, b) => a.address_ar.length - b.address_ar.length,
    },
    {
      title: "الهاتف",
      dataIndex: "phone",

      key: "phone",
    },

    {
      title: "اسم البائع",
      dataIndex: "seller_name",
      sorter: (a, b) => a.seller_name - b.seller_name,
      key: "seller_name",
    },
  ];
  return (
    <>
      <CustomTable
        pageTitle={direction === "ltr" ? "List Of Orders" : "قائمه الفنادق"}
        endPoint={"ListOrders"}
        editEndPoint="generic/readOrder"
        dataRender={data}
        coloumRender={direction === "ltr" ? columns_en : columns_ar}
        isLoading={isLoading}
        refetch={refetch}
        noAddOption={true}
        noEditAction
        noDeleteAction={true}
      />
    </>
  );
};

export default ListOrders;
