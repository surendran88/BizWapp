import { API_FAQ_LIST } from '../constants';
import { API_LESSON_LISTING_USER_ID } from '../constants';
import { API_BEGIN } from '../constants';
import { API_FAIL } from '../constants';
import { API_RESULT } from '../constants';
const homeState = {
faqData: [],
floading: false,
fmessage:'',
fresult:false
};
const faqReducer = (state = homeState, action) => {
    switch(action.type) {
        case API_FAQ_LIST:{
            return {
                ...state,
                faqData: action.payload,
                floading : false,                
                fmessage:action.message ,
                fresult:action.result               
              };
           }
          
           case API_BEGIN : {
            return {
                ...state,
                faqData: action.payload,
                floading : true
                
              };
           }
                    case API_FAIL : {
               alert(JSON.stringify(action.payload.error.message));
            return {
                ...state,
                faqData: action.payload,
                floading : false
                
              };
           }
        
         default:
           return state;
           }
}
export default faqReducer;