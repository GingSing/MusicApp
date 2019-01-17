import { GET_USER_INFO_FAILURE, GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS } from './types';
import { UserService } from '../_services';

export function getUserInfo(){
    return dispatch => {
        dispatch(request());
        UserService.getUserInfo()
            .then(info=>dispatch(success(info)))
            .catch(err=>{
                dispatch(failure()); 
                console.log(err);
            });
    }

    function request(){ return { type:GET_USER_INFO_REQUEST }}
    function success(info){ return { type:GET_USER_INFO_SUCCESS, info }}
    function failure(){ return { type:GET_USER_INFO_FAILURE }}
}