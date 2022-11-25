import { API_MESSAGE } from '../constants';
import { API_BEGIN } from '../constants';
import { API_FAIL } from '../constants';
import { API_RESULT } from '../constants';
const initialState = {
messageData: [],
loading: false,
message:'',
result:false
};
const MessageReducer = (state = initialState, action) => {
    switch(action.type) {
        case API_MESSAGE:{
            return {
                ...state,
                messageData: action.payload,
                loading : false,                
                message:action.message                
              };
           }
           case API_RESULT:{
            return {
                ...state,                
                result : action.payload,
                loading : false,
              };
           }
           case API_FAIL : {
               alert(JSON.stringify(action.payload.error.message));
            return {
                ...state,
                messageData: action.payload,
                loading : false
                
              };
           }
           case API_BEGIN : {
            return {
                ...state,
                messageData: action.payload,
                loading : true
                
              };
           }
         default:
           return state;
           }
}
export default MessageReducer;