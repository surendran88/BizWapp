import { API_STUDY_MATERIALS } from '../constants';
import { API_BEGIN } from '../constants';
import { API_FAIL } from '../constants';
import { API_RESULT } from '../constants';
const homeState = {
studydata: [],
studyloading: false,
studymessage:'',
studyresult:false
};
const studyMaterialsReducer = (state = homeState, action) => {
    switch(action.type) {
        case API_STUDY_MATERIALS:{
            return {
                ...state,
                studydata: action.payload,
                studyloading : false,                
                studymessage:action.message ,
                studyresult:action.result               
              };
           }
           case API_BEGIN : {
            return {
                ...state,
                studydata: action.payload,
                studyoading : true
                
              };
           }
                    case API_FAIL : {
               alert(JSON.stringify(action.payload.error.message));
            return {
                ...state,
                studydata: action.payload,
                studyoading : false
                
              };
           }
        
         default:
           return state;
           }
}
export default studyMaterialsReducer;