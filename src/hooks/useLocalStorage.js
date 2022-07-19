// import {useState,useEffect} from 'react'

// const PREFIX="farahy"
// const useLocalStorage =(key,initalValue)=>
// {
   
//     const [value,setValue]=useState(()=>{
//         const jsonValue =localStorage.getItem(key);
//         if(jsonValue != null) return JSON.parse(jsonValue);
//         if(typeof initalValue ==="function"){
//             return initalValue();
//         }
//         else{
//             initalValue
//         }
      
//     });
    

//     useEffect(()=>
//     {
//     localStorage.setItem(key,JSON.stringify(value))
//   }
//     ,[key,value])

//     return[value,setValue]
// }
// export default useLocalStorage