import axios from 'axios'

axios.defaults.headers.common = {
  "Content-Type": "application/json"
}

const baseUrl = 'api/images' 

const getAllImages = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addImage = imageData => {
    const request = axios.post(baseUrl, imageData)
    
    return request.then(response => {
      console.log('this got sent back from the backend', response)
      return response.data
    })
  }

  export default { getAllImages, addImage }