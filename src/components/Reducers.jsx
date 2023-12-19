const initial ={
    user:""
}
const Reducers = (state=initial,action) =>{
    if(action.type === "fetch"){

        return {
            ...state,
            user: action.data
        };
    }
    return state
}
export default Reducers;