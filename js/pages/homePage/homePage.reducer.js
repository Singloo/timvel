import {createStore,combineReducers} from 'redux'

const initialState = {
  count:10
}

function counter(state = initialState,action){
  let num = action.num
  switch(action.type){
    case 'ADD':
    return {
      ...state,
      count:state.count+1
    }

    case 'MINUS':
    return {
      ...state,
      count:state.count-1
    }

    case 'ADD_CUSTOM':
    return {
      ...state,
      count:state.count + num
    }
    default:
    return state
  }
}

let reducers = combineReducers({counter})

let store = createStore(reducers)

export default store