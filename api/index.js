require('dotenv').config();
const axios = require('axios');

const URL = process.env.API_URLBASE;

// ROBOT
const getRobot = numberSeries => axios.get(`${URL}robot/${numberSeries}`)
  .then(response => response.data)
  .catch(error => error);

// USER
const getUser = serviceId => axios.get(`${URL}user/${serviceId}`)
  .then(response => response.data)
  .catch(error => error);

const addUser = (numberSeries, user) => axios.post(`${URL}user/${numberSeries}`, {
  name: user.name,
  email: user.email,
  service: user.service,
  serviceId: user.serviceId,
})
  .then(response => response.data)
  .catch(error => error);

// ROUTE
const getRoute = numberSeries => axios.get(`${URL}route/${numberSeries}`)
  .then(response => response.data)
  .catch(error => error);

const addRoute = (numberSeries, route) => axios.post(`${URL}route/${numberSeries}`, {
  name: route.name,
  type: route.type,
  start: route.start,
})
  .then(response => response.data)
  .catch(error => error);

// WORK
const getWork = idRoute => axios.get(`${URL}work/${idRoute}`)
  .then(response => response.data)
  .catch(error => error);

// BATTERY
const getBattery = numberSeries => axios.get(`${URL}battery/${numberSeries}`)
  .then(response => response.data)
  .catch(error => error);

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
