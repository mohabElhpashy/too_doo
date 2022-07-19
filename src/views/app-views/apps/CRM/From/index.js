 import InnerAppLayout from 'layouts/inner-app-layout';
import ChatContent from './ChatContent';
import ChatMenu from './ChatMenu';

import React, { useEffect, useState } from 'react'
 import service from "auth/FetchInterceptor";
 import { useFetch } from "hooks";


const Chat = props => {
	const listt = useFetch("chat_rooms");
	 
	const tagsList = listt.services;
	const isSuccess = listt.isSuccess;

	const [list, setList] = useState([]);
	
	// // const [Name,setName]= useState("mohab")
	// console.log("form index",Name)

	useEffect( ()=>{
		// try {
		//    const Records= await service.get("/web/chat_rooms");
		// 	 console.log("Records.records",Records.records)
		// 	setList(Records.records)
		//   } catch (error) {
		// 	// setSubmitLoading(false);
		//   }
		if(isSuccess)
		{
			setList(tagsList)

		}
	  },[isSuccess])
	//   console.log("list",list)
	return (
		<div className="chat">
			<InnerAppLayout 
				sideContent={<ChatMenu data={list} {...props}/>}
				mainContent={<ChatContent data={list} {...props}/>}
				sideContentWidth={450}
				sideContentGutter={false}
				border
			/>
		</div>
	)
}

export default Chat
