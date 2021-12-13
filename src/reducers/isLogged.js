export default function loggedReducer(state = false, action) {
  switch(action.type){
    case 'LOGGEDIN':
      return !state;
    default: 
      return state;
  }
}