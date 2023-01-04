import { API_WHATSNEW_LIST } from '../constants';
import { API_BEGIN } from '../constants';
import { API_FAIL } from '../constants'; 
const homeState = {
whatnewdata: [],
whatnewloading: false,
whatnewmessage:'',
whatnewresult:false
};
const WhatsnewListReducer = (state = homeState, action) => {
    switch(action.type) {
        case API_WHATSNEW_LIST:{
            return {
                ...state,
                whatnewdata: action.payload,
                whatnewloading : false,                
                whatnewmessage:action.message ,
                whatnewresult:action.result               
              };
           }
           case API_BEGIN : {
            return {
                ...state,
                whatnewdata: action.payload,
                whatnewloading : true
                
              };
           }
                    case API_FAIL : { 
            return {
                ...state,
                whatnewdata: action.payload,
                whatnewloading : false
                
              };
           }
        
         default:
           return state;
           }
}
export default WhatsnewListReducer;