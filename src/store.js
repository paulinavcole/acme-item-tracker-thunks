import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';
const { faker } = require("@faker-js/faker");


const initialState = {
  view: window.location.hash.slice(1),
  users: [],
  things: []
};

const viewReducer = (state =window.location.hash.slice(1), action)=> { 
  if(action.type === 'SET_VIEW'){
    return action.view;
  }
  return state;
};

const usersReducer = (state = [], action)=> { 
  if(action.type === 'DELETE_USER'){
    return state.filter(user => user.id !== action.user.id )
  }
  if(action.type === 'SET_USERS'){
    return action.users;
  }
  if(action.type === 'CREATE_USER'){
    return [...state, action.user ]; 
  }
  return state;
};

const thingsReducer = (state = [], action)=> { 
  if(action.type === 'DELETE_THING'){
    return state.filter(thing => thing.id !== action.thing.id);
  }
  if(action.type === 'UPDATE_THING'){
    return state.map(thing => thing.id !== action.thing.id ? thing : action.thing);
  }
  if(action.type === 'SET_THINGS'){
    return action.things;
  }
  if(action.type === 'CREATE_THING'){
    return [...state, action.thing ]; 
  }
  return state;
};

const reducer = combineReducers({
  users: usersReducer,
  things: thingsReducer,
  view: viewReducer
});

const updateThing = (thing)=> {
  return async(dispatch)=> {
    thing = (await axios.put(`/api/things/${thing.id}`, thing)).data;
    dispatch({ type: 'UPDATE_THING', thing });
  };
};
const deleteThing = (thing)=> {
  return async(dispatch)=> {
    await axios.delete(`/api/things/${thing.id}`);
    dispatch({ type: 'DELETE_THING', thing });
  };
};
const createUser = ()=> {
  return async(dispatch) => {
      const response = await axios.post('/api/users', {
          name: `${faker.name.firstName()} ${faker.name.lastName()}`
      });
      const user = response.data;
      dispatch({
          type: 'CREATE_USER',
          user
      });
  };
};
const deleteUser = (user) => {
  return async(dispatch)=> {
    await axios.delete(`/api/users/${user.id}`);
    dispatch({ type: 'DELETE_USER', user});
  }
}
const createThing = () => {
  return async (dispatch) => {
    const response = await axios.post("/api/things", { name: faker.commerce.product(), ranking: 1, });
    const thing = response.data;
    dispatch({ type: "CREATE_THING", thing });
  };
};
const loadData = () =>{
  return async(dispatch) =>{
    const responses = await Promise.all([
      axios.get('/api/users'),
      axios.get('/api/things'),
    ]);
    dispatch({
      type: 'SET_USERS',
      users: responses[0].data
    });
    dispatch({
      type: 'SET_THINGS',
      things: responses[1].data
    });
  }
}
const updateRanking = (user) =>{
  return async(dispatch) =>{
    user = (await axios.put(`/api/users/${user.id}`, user)).data;
    dispatch({
      type: 'UPDATE_USER',
      user
    })
  }
}

const store = createStore(reducer, applyMiddleware(logger, thunk));

export { deleteThing, updateThing, createUser, deleteUser, createThing, loadData, updateRanking };

export default store;

