import { Button, Form, message, notification, Tabs } from "antd";
import service from "auth/FetchInterceptor";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import { useFetch } from "hooks";
import React, { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import GeneralField from "./GeneralField";

const { TabPane } = Tabs;

const ADD = "ADD";

const ProductForm = (props) => {
  const [requestedData, setRequestedData] = useState({
    service: [],
    store: [],
    product: [],
  });
  const { mode = ADD } = props;
  const { services } = useFetch("services");
  const emptyState = {
    // name_ar: "",
    // name_en: "",
    available_from: "",
    start_date:"",
    main_img: "",
    end_date: "",
    file_url:"",
    ServiceName:"",
    service_id:"",
    variation_id:null
  };

  const initalState = emptyState;

  const inialOperations = {
    service_id: null,
    store_id: null,
    product_id: null,
    new_price: 0,
    product_name: null,
    Discount:"",
    total_capacity:null,
    available_from:null,
    available_to:null,
    name_en: "",
    name_ar: "",


  

  };
  const productss={
    product_id: null,
    variation_id: null,


  }
  const [postObject, setPostObject] = useState(initalState);
  const [PRODUCT, setPRODUCT] = useState(productss);
const [ALL_Products,setALL_Products]=useState()
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [currentPackage, setPackage] = useState([]);
  const [listofStores, setStoreList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [Inner_products,setInner_products]=useState([])

  const history = useHistory();
  const [operations, setOperation] = useState(inialOperations);
  const [state,setstate]=useState([])
  const main_array=[]


  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Process Feedback",
      description: "Your Process has been Done",
    });
  };
 
  const onFinish =     async(postObject) => {
    // console.log("from my idex=>>>>>>>>>",ALL_Products,postObject.service_id)
    // for(let i=0;i<ALL_Products.length;i++)
    // {  const F_Date=ALL_Products[i].available_from.replace('T',' ');
    // const F_date=F_Date.replace('Z','')
    // const E_Date=ALL_Products[i].available_to.replace('T',' ')
    // const E_date=E_Date.replace('Z','')
    //   let obj={total_capacity:ALL_Products[i].total_capacity,discount:parseInt(ALL_Products[i].discount),service_id:parseInt(postObject.service_id),
    //     product_id:ALL_Products[i].product_id,variation_id:ALL_Products[i].variation_id,available_from:F_date,available_to:E_date
    //   }
    //   products.push(obj)
    // }
    // setSubmitLoading(true);
    
    //edit formate start
  
    // const F_Date=postObject.available_from!=""?postObject.available_from.replace('T',' '):null
    // const F_date=F_Date.replace('Z','')
    // const E_Date=postObject.end_date!=""?postObject.end_date.replace('T',' '):null
    // const E_date=E_Date.replace('Z','')
    //end
   
   
//  const  pro_duct={
// start_date:F_date,
// end_date:E_date,
//  service_id:parseInt(postObject.service_id),
// main_image:postObject.main_img,
// name_en:operations.name_en,
// name_ar:operations.name_ar,


// // product:[{service_id:parseInt(postObject.service_id),total_capacity:operations.total_capacity,product_id:postObject.product_id,discount:parseInt(operations.Discount),
// //   variation_id:postObject.variation_id}],
  
// products

// }

console.log("ALL_PRODUCTSSSSSS=",postObject)

   try {
      await service.post("/web/flash_deal", postObject);
      openNotificationWithIcon("success");
      history.push("flashdeals");
      setSubmitLoading(false);
    } catch (error) {
      setSubmitLoading(false);
    }
  };
 
  // const Payment_Methods = () => {
  //   let PaymentMethods;
  //   // const variationCheckerr = postObject.ServiceName.length
  //   const variationCheckerr1 = postObject.available_from.length
  //   const variationCheckerr2 = postObject.end_date.length
  //   const variationCheckerr3 = postObject.main_img.length
  //   // const variationCheckerr4 = postObject.service_id.length




  //   // console.log("variationCheckerr",variationCheckerr)
  //   if ( variationCheckerr1==0||variationCheckerr2==0||variationCheckerr3==0) {
  //     PaymentMethods = false;
  //   } else {
  //     PaymentMethods = true;
  //   }
  //  return PaymentMethods
  //   // for (const key in variationList) {
  //   //   if (!variationList[key]) {
  //   //     count++;
  //   //   }
  //   // }
  // };
  useEffect(async () => {
    

    // console.log("products=>>>",PRODUCT)
    if (postObject.service_id) {
      try {
        const data = await service.get(`web/stores/${postObject.service_id}`);
        setStoreList(data.data);
      } catch (error) {
        <h2>{error}</h2>;
      }
    }
    
  }, [postObject.service_id,postObject.name_en,PRODUCT]);
  // console.log("main oob=>",postObject)
  // console.log("main oob=>",operations)
  return (
    <>
      <Form
        layout="vertical"
        form={form}
        // onSubmitCapture={(e) => {
        //   // e.preventDefault();
        //   onFinish();
        // }}
        onFinish={() => {
          onFinish(postObject);
        }}
        name="advanced_search"
        className="ant-advanced-search-form"
        initialValues={{
          heightUnit: "cm",
          widthUnit: "cm",
          weightUnit: "kg",
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
                {mode === "ADD" ? "Add New Record" : `Edit Record`}{" "}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() => history.push("flashdeals")}
                >
                  Discard
                </Button>
               
                <Button
                  type="primary"
                  // htmlType="submit"
                  loading={submitLoading}
                    // disabled={
                    //   // !buttonValidation() ||
                    //   // !detailsButtonValidation() ||
                    //   // !variationButtonValidation()||
                    //   // !Payment_Methods()
                    // }
                    onClick={() => {
                      setPostObject({
                        ...postObject,
                        products: Inner_products,
                        // paymentMethods:PayMentmethod,
  
                        // details: detailsList.map(
                        //   (element) => element.generic_detail_id
                        // ),
                      });
                    }}
                    htmlType="submit"
                    // loading={submitLoading}
                >
                  {mode === "ADD" ? "Add" : `Save`}
                </Button>
              </div>
            </Flex>
          </div>
        </PageHeaderAlt>
        <div className="container">
          <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
            <TabPane tab="General" key="1">
              <GeneralField
                setPackage={setPackage}
                currentPackage={currentPackage}
                category={services}
                listofStores={listofStores}
                setPostObject={setPostObject}
                
                setPRODUCT={setPRODUCT}
                PRODUCT={PRODUCT}
                postObject={postObject}
                setRequestedData={setRequestedData}
                requestedData={requestedData}
                operations={operations}
                setOperation={setOperation}
                inialOperations={inialOperations}
                setProductList={setProductList}
                setALL_Products={setALL_Products}
                Inner_products={Inner_products}
                setInner_products={setInner_products}

              />
            </TabPane>
            {/* <TabPane tab="Variation" key="2">
              <VariationField />
            </TabPane>
            */}
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default ProductForm;
