import { API_LESSON_DETAILS } from '../constants';
import { API_BEGIN } from '../constants';
import { API_FAIL } from '../constants';
import { API_SUBSCRIPTION_STATUS } from '../constants';
const homeState = {
ldetailsdata: [],
ldetailsloading: false,
ldetailsmessage:'',
ldetailsresult:false,
submessage:'',
subresult:false
};
const lessonDetailsReducer = (state = homeState, action) => {
    switch(action.type) {
        case API_LESSON_DETAILS:{
            return {
                ...state,
                ldetailsdata: action.payload,
                ldetailsloading : false,                
                ldetailsmessage:action.message ,
                ldetailsresult:action.result               
              };
           }
           case API_SUBSCRIPTION_STATUS:{
            return {
                ...state,
                ldetailsloading : false,                
                submessage:action.message ,
                subresult:action.result               
              };
           }
           case API_BEGIN : {
            return {
                ...state,
                ldetailsdata: action.payload,
                ldetailsloading : true
                
              };
           }
                    case API_FAIL : {
               alert(JSON.stringify(action.payload.error.message));
            return {
                ...state,
                ldetailsdata: action.payload,
                ldetailsloading : false
                
              };
           }
        
         default:
           return state;
           }
}
export default lessonDetailsReducer;