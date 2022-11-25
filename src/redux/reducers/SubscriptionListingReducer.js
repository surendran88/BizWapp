import { API_SUBSCRIPTION_LISTING } from '../constants';
import { API_BEGIN } from '../constants';
import { API_FAIL } from '../constants';
import { API_RESULT } from '../constants';
const homeState = {
subdata: [],
subloading: false,
submessage:'',
subresult:false
};
const SubscriptionListingReducer = (state = homeState, action) => {
    switch(action.type) {
        case API_SUBSCRIPTION_LISTING:{
            return {
                ...state,
                subdata: action.payload,
                subloading : false,                
                submessage:action.message ,
                subresult:action.result               
              };
           }
           case API_BEGIN : {
            return {
                ...state,
                subdata: action.payload,
                subloading : true
                
              };
           }
                    case API_FAIL : {
               alert(JSON.stringify(action.payload.error.message));
            return {
                ...state,
                subdata: action.payload,
                subloading : false
                
              };
           }
        
         default:
           return state;
           }
}
export default SubscriptionListingReducer;