import fetch from 'isomorphic-unfetch';
import {
  MESSAGE_FETCH,
  MESSAGE_FETCHED_SUCCESS,
  MESSAGE_FETCHED_ERROR,
  MESSAGE_CREATE,
  MESSAGE_CREATED_SUCCESS,
  MESSAGE_CREATED_ERROR,
  MESSAGE_DELETE,
  MESSAGE_DELETED_SUCCESS,
  MESSAGE_DELETED_ERROR,
  SET_ITEM
} from '..';


export function getMessages(id = '') {
  return async (dispatch) => {
    dispatch({ type: MESSAGE_FETCH });
    const response = await fetch(
      `${process.env.SERVER_URL}/messages/${id}`,
      {
        method: 'GET'
      },
    );
    const json = await response.json();
    if (!json.errors) {
      return dispatch({
        type: MESSAGE_FETCHED_SUCCESS,
        payload: json
      });
    }
    return dispatch({ type: MESSAGE_FETCHED_ERROR, payload: json });
  };
}

export function createMessage(data) {
  return async (dispatch) => {
    dispatch({ type: MESSAGE_CREATE });
    data.date = new Date();
    const options = {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' })
    };
    options.body = JSON.stringify(data);

    fetch(`${process.env.SERVER_URL}/messages`, options)
      .then((response) => {
        if (response.ok) {
          dispatch({ type: MESSAGE_CREATED_SUCCESS, payload: response });
        } else {
          dispatch({ type: MESSAGE_CREATED_ERROR, payload: response });
        }
      })
      .catch((error) => {
        dispatch({ type: MESSAGE_CREATED_ERROR, payload: error.message });
      });
  };
}

export function deleteMessage(id, items) {
  return async (dispatch) => {
    dispatch({ type: MESSAGE_DELETE });
    const response = await fetch(
      `${process.env.SERVER_URL}/messages/${id}`,
      {
        method: 'DELETE'
      },
    );
    const json = await response.json();
    if (!json.errors) {
      return dispatch({ type: MESSAGE_DELETED_SUCCESS, payload: items });
    }
    return dispatch({ type: MESSAGE_DELETED_ERROR, payload: json });
  };
}

export function setItem(item) {
  return dispatch => dispatch({ type: SET_ITEM, payload: item });
}
