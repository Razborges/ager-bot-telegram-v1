require('dotenv').config();
const axios = require('axios');

const URL = process.env.API_URLBASE;

// ROBOT
const getRobot = numberSeries => axios.get(`${URL}robot/${numberSeries}`)
  .then(response => response.data)
  .catch(error => error.response.data);

// USER
const getUser = serviceId => axios.get(`${URL}user/${serviceId}`)
  .then(response => response.data)
  .catch(error => error.response.data);

const addUser = (numberSeries, user) => axios.post(`${URL}user/${numberSeries}`, {
  name: user.name,
  email: user.email,
  service: user.service,
  serviceId: user.serviceId,
})
  .then(response => response.data)
  .catch(error => error.response.data);

// ROUTE
const getRoute = numberSeries => axios.get(`${URL}route/${numberSeries}`)
  .then(response => response.data)
  .catch(error => error.response.data);

const addRoute = (numberSeries, route) => axios.post(`${URL}route/${numberSeries}`, {
  name: route.name,
  type: route.type,
  start: route.start,
})
  .then(response => response.data)
  .catch(error => error.response.data);

// WORK
const getWork = idRoute => axios.get(`${URL}work/${idRoute}`)
  .then(response => response.data)
  .catch(error => error.response.data);

// BATTERY
const getBattery = numberSeries => axios.get(`${URL}battery/${numberSeries}`)
  .then(response => response.data)
  .catch(error => error.response.data);

const API = {
  getRobot,
  getUser,
  addUser,
  getRoute,
  addRoute,
  getWork,
  getBattery,
};

module.exports = API;
