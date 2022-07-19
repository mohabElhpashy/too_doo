import React, { useState, useEffect } from "react";
import { useFetch } from "hooks";
// import CustomTable from "../Components/CustomTable";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Modal, Upload,Button,Card,Col,Form, Input,Checkbox } from "antd";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import GoogleMapsStyle from "constants/GoogleMapsStyle";
import service from "auth/FetchInterceptor";
import CustomTable from "../Components/Custome_table_for_perm";
 
import { GOOGLE_MAPS_KEY } from "configs/EnvironmentConfig";
const libraries = ["places"];
const options = {
  styles: GoogleMapsStyle,
  disableDefaultUI: true,
  zoomControl: true,
};
const Hotels = () => {
  const history = useHistory();
  //  const { services, isLoading, refetch, isSuccess } = useFetch("hotels");
  const [singleImage, setSingleImage] = useState("");
  const [currentList, setCurrentList] = useState([]);
  const [totalPages, settotalPages] = useState(1);
  const[pages,setpages]=useState(1)

  const [loading, setloading] = useState(false);

  useEffect(async()=>{
    try {
      Fetch_record()
      } catch (error) {
        // setSubmitLoading(false);
      }
  },[])
  //get records
  const Fetch_record=async(page)=>{
    setloading(true)
    if(page==undefined)
    {
      const Records= await service.get(`/web/hotels?itemsPerPage=6&page=${1}`).then(respose=>{
        setCurrentList(respose.records)
        settotalPages(respose.paginationInfo.totalRecords)
        setloading(false)
        setpages(1)
      }) 
    }
else{
  try {
    const Records= await service.get(`/web/hotels?itemsPerPage=6&page=${page}`).then(respose=>{
      setCurrentList(respose.records)
      settotalPages(respose.paginationInfo.totalRecords)
      setloading(false)
      setpages(page)

    }) ;
     // openNotificationWithIcon("success");
     // history.push("flashdeals");
     // setSubmitLoading(false);
     
     console.log("currentList",currentList)

   } catch (error) {
     // setSubmitLoading(false);
   }
}
    
  }
  //map
  const [FromSearch,setFromSearch]=useState([])
  const[postObject,setPostObject]=useState({
    lat:"29.9494005",long:"31.2637297"
  })
  //periods
  const [Period,setPeriod]=useState("")
  const [openPeriod,setopenPeriod]=useState(false)
//price
const [Price,setPrice]=useState("")
const [price_range,setprice_range]=useState({price_from:"",price_to:""})
const [openPrice,setopenPrice]=useState(false)
 //check box
 const [changeg,setChange]=useState(false)
 const [changegCapacity,setChangeCapacity]=useState(false)
 //Capacity

 const [Capacity,setCapacity]=useState("")
const [Capacity_range,setCapacity_range]=useState({Capacity_from:"",Capacity_to:""})
const [openCapacity,setopenCapacity]=useState(false)


 
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_KEY,
    libraries,
  });
  const onMapClick = (event) => {
    // setMarker({lat:event.latLng.lat() ,lng:event.latLng.lng()})
    const test = event.latLng.lat();
    const test1 = event.latLng.lng();
    setPostObject({
      ...postObject,
      lat: test,
      long: test1,
    });
  };
const [openMap,setopenMap]=useState(false)
useEffect(async()=>{
  if(Period!=""){SearchPerPeriod()}
  if(Price!=""){Searchprice()}
  if(price_range.price_from!=""&&price_range.price_to!=""){Searchprice_Range()}
  if(Capacity!=""){Searchcapacity()}
  if(Capacity_range.Capacity_from!=""&&Capacity_range.Capacity_to!=""){Searchcapacity_Range()}



  else{
    const Post=await service.get(`web/hotels?itemsPerPage=6&page=${pages}`).then(
      res=>{
        console.log("my response with out",res.records)
        // refetch()

        setFromSearch(res.records)}
    )
  }
  
 
      
},[Period,Price,price_range,Capacity,Capacity_range])
 
console.log("post objects",postObject)
  const trncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  //map
const SerachonMap_open=()=>{
  setopenMap(true)
}
const SerachonMap_close=()=>{
  setopenMap(false)

}
//period
const openSearch_per_period=()=>{
  setopenPeriod(true)}
const closeSearch_per_period=()=>{
  setopenPeriod(false)}
const SearchPerPeriod=async()=>{
     const Post=await service.get(`web/hotels/period/search?period_id=${Period}`).then(
      res=>{
        console.log("my response with out",res.records)
        // refetch()

        setFromSearch(res.records)}
    )
 }

 //price
 const openSearch_per_price=()=>{
  setopenPrice(true)}
const closeSearch_per_price=()=>{
  setopenPrice(false)}
  const onChange_Checked_range=(e)=>{
    setChange(e.target.checked)
console.log("e",e.target.checked)
  
  }

const Searchprice=async()=>{
     const Post=await service.get(`web/hotels/price/search?price=${Price}`).then(
      res=>{
        console.log("my response with out",res.records)
        // refetch()

        setFromSearch(res.records)}
    )
 }
  const Searchprice_Range=async()=>{
  const Post=await service.get(`web/hotels/price/search?price_from=${price_range.price_from}&price_to=${price_range.price_to}`).then(
   res=>{
     console.log("my response with out",res.records)
    //  refetch()

     setFromSearch(res.records)
    return;}
      
 )
}
//capacity
const openSearch_per_capacity=()=>{
  setopenCapacity(true)}
const closeSearch_per_capacity=()=>{
  setopenCapacity(false)}
  const onChange_Checked_capacity=(e)=>{
    setChangeCapacity(e.target.checked)
console.log("e",e.target.checked)
  
  }

const Searchcapacity=async()=>{
     const Post=await service.get(`web/hotels/capacity/search?capacity=${Capacity}`).then(
      res=>{
        console.log("my response with out",res.records)
        // refetch()

        setFromSearch(res.records)}
    )
 }
 const Searchcapacity_Range=async()=>{
  const Post=await service.get(`web/hotels/capacity/search?capacity_from=${Capacity_range.Capacity_from}&capacity_to=${Capacity_range.Capacity_to}`).then(
   res=>{
     console.log("my response with out",res.records)
    //  refetch()

     setFromSearch(res.records)
    return;}
      
 )
}
console.log(Capacity_range.Capacity_from,Capacity_range.Capacity_to)
const RESET=()=>{
  setPeriod('');
  setPrice('');
  setprice_range({price_from:'',price_to:''})
  setCapacity('')
  setCapacity_range({Capacity_from:'',Capacity_to:''})

}

   const { direction } = useSelector((state) => state.theme);
  const columns_en = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Store Name",
      dataIndex: "name_en",
      key: "name_en",
      sorter: (a, b) => a.name_en.length - b.name_en.length,
    },
    {
      title: "Seller Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      render: (name, obj) => (
        <a
          onClick={() =>
            history.push(`/app/apps/CRM/veForm?name=view&id=${obj.seller_id}`)
          }
        >
          {name}
        </a>
      ),
    },
    {
      title: "Main Image ",
      dataIndex: "main_image",
      key: "main_image",
      render: (text, obj) => {
        return (
          <Upload
            disabled={true}
            fileList={[
              {
                uid: obj.id,
                name: obj.name_en,
                status: "done",
                url: obj.main_image,
              },
            ]}
            onPreview={(t) => setSingleImage(obj.main_image)}
            listType="picture-card"
          />
        );
      },
    },
    {
      title: "Phone Number",
      dataIndex: "phone",

      key: "phone",
    },
    {
      title: "Open At",
      dataIndex: "open_at",
      sorter: (a, b) => a.open_at - b.open_at,
      key: "open_at",
    },

    {
      title: "City Name",
      dataIndex: "city_name",
      sorter: (a, b) => a.city_name - b.city_name,
      key: "city_name",
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
      dataIndex: "name",
      sorter: (a, b) => a.name - b.name,
      key: "name",
    },
  ];
  return (
    <>
    <div style={{display:"flex",justifyContent:'center',    alignItems: 'baseline'}}>
     {/* <span style={{fontWeight: 800}}>serach By Price</span> */}
               {/* <Form.Item><Input value={from} onChange={e=>setfrom(e.target.value)}/></Form.Item>

               <Form.Item><Input value={to}  onChange={e=>setto(e.target.value)}/></Form.Item>
               <Button onClick={Fetch_all_record}>Serach</Button> */}
               <div style={{display:'flex',justifyContent:"space-around",width: '40%'}}>
               <Button onClick={SerachonMap_open} type="primary" >Serach On Map</Button>
               <Button onClick={openSearch_per_period} type="primary" >Search Per Period</Button>
               <Button onClick={openSearch_per_price} type="primary" >Search BY Price</Button>
               <Button onClick={openSearch_per_capacity} type="primary" >Search BY Capacity</Button>

               <Button onClick={RESET} >RESET</Button>



               </div>
               



    </div>
      {/* <CustomTable
        pageTitle={direction === "ltr" ? "List Of Hotels" : "قائمه الفنادق"}
        endPoint={"hotels"}
        addEndPoint="hotel/addHotel"
        editEndPoint="hotel/veHotelForm"
        dataRender={FromSearch}
        coloumRender={direction === "ltr" ? columns_en : columns_ar}
        isLoading={isLoading}
        refetch={refetch}
        setCurrentList={setCurrentList}
        noAddOption
        prevousState={FromSearch}
        searchUrl="stores/search/2?store_search"
      /> */}
       <CustomTable
        loading={loading}
         Fetch_record={(page)=>Fetch_record(page)}
        totalPages={totalPages}
        pageTitle={direction === "ltr" ? "List Of Hotels" : "قائمه الفنادق"}
        endPoint={"hotels"}
        addEndPoint="hotel/addHotel"
        editEndPoint="hotel/veHotelForm"
        dataRender={FromSearch}
        coloumRender={direction === "ltr" ? columns_en : columns_ar}
        // isLoading={isLoading}
        // refetch={refetch}
        setCurrentList={setCurrentList}
        noAddOption
        prevousState={FromSearch}
        searchUrl="stores/search/2?store_search"
      />
      <Modal
        visible={singleImage.length > 0}
        footer={null}
        onCancel={() => setSingleImage("")}
      >
        <img
          alt="image"
          style={{ width: "100%", height: 350 }}
          src={singleImage}
        />
      </Modal>
      {/* map */}
      <Modal
        visible={openMap}
        footer={null}
        onCancel={SerachonMap_close}
      >
       <Col xs={24} sm={24} md={24}>
        <Card title="Location">
        <Form.Item>
            <GoogleMap
                  mapContainerStyle={{ width: 400, height: 400 }}
                  center={{
                    lat: parseFloat(postObject.lat),
                    lng: parseFloat(postObject.long),
                  }}
                  zoom={15}
                  onClick={onMapClick}
                >
                  <Marker
                    position={{
                      lat: parseFloat(postObject.lat),
                      lng: parseFloat(postObject.long),
                    }}
                  />
                </GoogleMap>
          </Form.Item>
  
        </Card>
      
      </Col>
      </Modal>
      {/* //PERIOD// */}
      <Modal
        visible={openPeriod}
        footer={null}
        onCancel={closeSearch_per_period}
       >
       <Col xs={24} sm={24} md={24}>
        <Card title="Search Per Period">
        <Form.Item>
          <Input placeholder="serach per period" onChange={(e)=>setPeriod(e.target.value)}value={Period}/>
          </Form.Item>
  
        </Card>
      
      </Col>
      </Modal>
     {/* /price/ */}
    <Modal
        visible={openPrice}
        footer={null}
        onCancel={closeSearch_per_price}
       >
       <Col xs={24} sm={24} md={24}>
        <Card title="Search BY price">
        <Checkbox onChange={(e)=>onChange_Checked_range(e)}>Use Price Range</Checkbox>
        {changeg?<div style={{display:"flex",justifyContent:'center',    alignItems: 'baseline'}}>
                <Form.Item> <Input value={price_range.price_from} onChange={(e)=>setprice_range({...price_range,price_from:e.target.value})} placeholder="price_from"/></Form.Item>

               <Form.Item><Input value={price_range.price_to} onChange={(e)=>setprice_range({...price_range,price_to:e.target.value})} placeholder="price_to"/></Form.Item>
        



    </div>:<Form.Item>
          <Input placeholder="serach By price" onChange={(e)=>setPrice(e.target.value)}value={Price}/>
          </Form.Item>}
        
        
  
        </Card>
      
      </Col>
      </Modal>
        {/* /Capacity/ */}
    <Modal
        visible={openCapacity}
        footer={null}
        onCancel={closeSearch_per_capacity}
       >
       <Col xs={24} sm={24} md={24}>
        <Card title="Search BY Capacity">
        <Checkbox onChange={(e)=>onChange_Checked_capacity(e)}>Use Capacity Range</Checkbox>
        {changegCapacity?<div style={{display:"flex",justifyContent:'center',    alignItems: 'baseline'}}>
                <Form.Item> 
      <Input value={Capacity_range.Capacity_from} onChange={(e)=>setCapacity_range({...Capacity_range,Capacity_from:e.target.value})} placeholder="Capacity_from"/></Form.Item>

               <Form.Item><Input value={Capacity_range.Capacity_to}onChange={(e)=>setCapacity_range({...Capacity_range,Capacity_to:e.target.value})} placeholder="Capacity_to"/></Form.Item>
        



    </div>:<Form.Item>
          <Input placeholder="serach By Capacity" onChange={(e)=>setCapacity(e.target.value)}value={Capacity}/>
          </Form.Item>}
        
        
  
        </Card>
      
      </Col>
      </Modal>
    </>
  );
};

export default Hotels;
