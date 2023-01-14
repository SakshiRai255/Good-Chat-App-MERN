import * as AuthAPI from "../api/AuthRequest";

export const logIn = (formData,navigate) => async (dispatch) => {
 
    dispatch({type:"AUTH_START"})
 
 try {
   
    const { data } = await AuthAPI.logIn(formData);
    dispatch({type:"AUTH_SUCCESS",data:data})
    navigate("../home", { replace: true });
  } catch (error) {
    console.log(error);
    dispatch({type:"AUTH_FAIL"})
  }
};

export const signUp = (formData,navigate) => async (dispatch) => {
 
    dispatch({type:"AUTH_START"})
 
 try {
   
    const { data } = await AuthAPI.signUp(formData);
    dispatch({type:"AUTH_SUCCESS",data:data})
    navigate("../home", { replace: true });
  } catch (error) {
    console.log(error);
    dispatch({type:"AUTH_FAIL"})
  }
};

export const logOut = () => async(dispatch) => {
dispatch({type: "LOG_OUT"})
}
