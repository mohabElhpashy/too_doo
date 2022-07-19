
export const requestGetUser = ()=>{
    return axios.request({
      method:'get',
      url:'http://dev.farahymall.com/api/admin/login'
    })
  }