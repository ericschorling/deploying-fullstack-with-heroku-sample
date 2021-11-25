import axios from 'axios'

axios.defaults.headers.common = {
  "Content-Type": "application/json"
}

const baseUrl = 'api/images' 

const getAllImages = user => {
  console.log(user)
  const request = axios.post(baseUrl, user)
  return request.then(response => response.data)
}

const addImage = imageData => {
  console.log(imageData)
  const request = axios.post(`${baseUrl}/add`, imageData)
  
  return request.then(response => {
    console.log('this got sent back from the backend', response)
    return response.data
  })
}

const addUser = userData => {
  console.log(userData)
  const request = axios.post(`${baseUrl}/addUser`, userData)
  
  return request.then(response => {
    console.log('this got sent back from the backend', response)
    return response.data
  })
}

const getLoggedInUser = params => {
  console.log(params)
  const request = axios.post(`${baseUrl}/user`,params)
  return request.then(response => response.data)
}

  export default { getAllImages, addImage, getLoggedInUser, addUser }