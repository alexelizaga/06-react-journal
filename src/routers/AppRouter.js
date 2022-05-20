import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { login } from '../actions/auth'

export const AppRouter = () => {

  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged (auth, (user) => {
      if(user?.uid) {
        dispatch( login(user.uid, user.displayName) );
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setChecking(false);
    });
  }, [dispatch, checking, setIsLoggedIn]);

  if (checking) {
    return(
      <h1>Loading...</h1>
    )
  }
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth/*' element={ <AuthRouter /> } />
        <Route path='/' element={ <JournalScreen /> } />
      </Routes>
    </BrowserRouter>
  )
}
