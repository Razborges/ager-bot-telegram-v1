require('dotenv').config();

const URL = process.env.API_URLBASE;

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

// ROBOT
const getRobot = async (numberSeries) => {
  try {
    const response = await fetch(`${URL}/robot/${numberSeries}`, { headers });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// USER
const getUser = async (serviceId) => {
  try {
    const response = await fetch(`${URL}/user/${serviceId}`, { headers });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

const addUser = async (numberSeries, user) => {
  try {
    const response = await fetch(`${URL}/user/${numberSeries}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// ROUTE
const getRoute = async (numberSeries) => {
  try {
    const response = await fetch(`${URL}/route/${numberSeries}`, { headers });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

const addRoute = async (numberSeries, route) => {
  try {
    const response = await fetch(`${URL}/route/${numberSeries}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(route),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// WORK
const getWork = async (idRoute) => {
  try {
    const response = await fetch(`${URL}/work/${idRoute}`, { headers });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// BATTERY
const getBattery = async (numberSeries) => {
  try {
    const response = await fetch(`${URL}/battery/${numberSeries}`, { headers });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

const API = {
  getRobot,
  getUser,
  addUser,
  getRoute,
  addRoute,
  getWork,
  getBattery,
};

export default API;
