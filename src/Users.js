import React from 'react';
import { connect } from 'react-redux';
import { updateThing, createUser, deleteUser } from './store'

const Users = ({ users, createUser, deleteUser, things, removeThingFromUser })=> {
  return (
    <div>
      <h1>Users</h1>
      <button onClick={ createUser }>+</button>
      <ul>
        {
          users.map( user => {
            return (
              <li key={ user.id }>
                { user.name } rank { user.ranking }
                <button onClick={ ()=> deleteUser(user)}>x</button>

                <ul>
                {
                  things.filter( thing => thing.userId === user.id)
                    .map(thing => {
                      return (
                        <li key={ thing.id }>
                          { thing.name } ({ thing.ranking })
                          <button onClick={ ()=> removeThingFromUser(thing)}>x</button>
                        </li>
                      );
                    }) 
                  
                }
                </ul>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

export default connect (
  (state)=> {
    return {
      things: state.things, 
      users: state.users
    }
  },
  (dispatch)=> {
    return {
      createUser: ()=> {
        dispatch(createUser());
      },
      deleteUser: (user)=> {
        dispatch(deleteUser(user));
      },
      removeThingFromUser : (thing,userId)=>{
        thing = {...thing, userId: null}
        dispatch(updateThing(thing));
      }
    }
  }
)(Users);