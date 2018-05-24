import { createLogic } from 'redux-logic';


const login = createLogic({
  type:'LOGIN',
  latest:true,
  async process(
    { action, logic, User, httpClient ,I18n},
    dispatch,
    done
  ){
    try{
      const {username,password,successCallback} = action.payload
    }catch(error){
      console.warn(error)
    }finally{
      done()
    }
  }
})
export default [];
