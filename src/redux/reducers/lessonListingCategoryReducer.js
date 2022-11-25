import { API_LESSON_CATEGORY_LISTING } from '../constants';
import { API_LESSON_LISTING_USER_ID } from '../constants';
import { API_BEGIN } from '../constants';
import { API_FAIL } from '../constants';
import { API_RESULT } from '../constants';
const homeState = {
lessonCatData: [],
lcloading: false,
lcmessage:'',
lcresult:false
};
const lessonListingCategoryReducer = (state = homeState, action) => {
    switch(action.type) {
        case API_LESSON_CATEGORY_LISTING:{
            return {
                ...state,
                lessonCatData: action.payload,
                lcloading : false,                
                lcmessage:action.message ,
                lcresult:action.result               
              };
           }
           case API_LESSON_LISTING_USER_ID:{
            return {
                ...state,
                lessonCatData: action.payload,
                lcloading : false,                
                lcmessage:action.message ,
                lcresult:action.result               
              };
           }
           case API_BEGIN : {
            return {
                ...state,
                lessonCatData: action.payload,
                lcloading : true
                
              };
           }
                    case API_FAIL : {
               alert(JSON.stringify(action.payload.error.message));
            return {
                ...state,
                lessonCatData: action.payload,
                lcloading : false
                
              };
           }
        
         default:
           return state;
           }
}
export default lessonListingCategoryReducer;