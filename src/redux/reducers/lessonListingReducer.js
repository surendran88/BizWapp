import { API_LESSON_LISTING } from '../constants';
import { API_BEGIN } from '../constants';
import { API_FAIL } from '../constants';
import { API_RESULT } from '../constants';
const homeState = {
lldata: [],
lloading: false,
llmessage:'',
llresult:false
};
const lessonListingReducer = (state = homeState, action) => {
    switch(action.type) {
        case API_LESSON_LISTING:{
            return {
                ...state,
                lldata: action.payload,
                lloading : false,                
                llmessage:action.message ,
                llresult:action.result               
              };
           }
           case API_BEGIN : {
            return {
                ...state,
                lldata: action.payload,
                lloading : true
                
              };
           }
                    case API_FAIL : {
               alert(JSON.stringify(action.payload.error.message));
            return {
                ...state,
                lldata: action.payload,
                lloading : false
                
              };
           }
        
         default:
           return state;
           }
}
export default lessonListingReducer;