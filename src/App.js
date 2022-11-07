import './App.css'
import HomePage from './Screens/HomeScreen/HomePage';
import LoginScreen from './Screens/LoginScreen/LoginScreen';
import {BrowserRouter , Routes, Route} from "react-router-dom";
import { useEffect } from 'react';
import { auth } from './Firebase';
import {useDispatch, useSelector} from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import ProfileScreen from './Screens/ProfileScreen/ProfileScreen';
function App() {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
// use effect for keeping track of user which is currently logged in
  useEffect(() =>{
    const unsubscribe =auth.onAuthStateChanged(userAuth =>{
      if(userAuth){
        dispatch(login({
          uid:userAuth.uid,
          email:userAuth.email
        }))
      }
      else{
        dispatch(logout())
      }
    })
    return unsubscribe
  },[dispatch])
  return (
    <div className='app'>
      
      <BrowserRouter>
      {!user ?(
        <LoginScreen />
      ):(
        <Routes>
          <Route exact path="/" element={<HomePage />}>
            
          </Route>

          <Route path='/profile' element={<ProfileScreen />}></Route>
        </Routes>
        
      
      )}
      </BrowserRouter>
      
    </div>
  );
}

export default App;
