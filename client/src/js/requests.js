import axios from 'axios'

// retrieve all the cars from the server
export function getCars() {
  let data = [];
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8000')
    .then(function (response) {
      response.data.forEach((element) => {
        data.push(element)
      })
      resolve(data)
    })
    .catch(function (error) {
      reject(error)
    })
  })
}

export function deleteCar(id) {
  let deleteId = new FormData();
  deleteId.append('deleteId', id)

  console.log(id)

  return new Promise((resolve, reject) => {
    axios.post('http://localhost:8000', deleteId)
    .then(function (response) {
      resolve(response.data)
    })
    .catch(function (error) {
      reject(error)
    })
  })
}

export function updateCar(formData) {
  // return new Promise((resolve, reject) => {
  //   axios.put('http://localhost:8000', formData)
  //   .then(function (response) {
  //     resolve(response.data)
  //   })
  //   .catch(function (error) {
  //     reject(error)
  //   })
  // })
}

export function addCar(formData) {
  console.log(formData)
  return new Promise((resolve, reject) => {
    axios.post('http://localhost:8000', formData)
    .then(function (response) {
      resolve(response.data)
    })
    .catch(function (error) {
      reject(error)
    })
  })
}
