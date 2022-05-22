
import { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';

import { JournalScreen } from '../components/journal/JournalScreen';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged (auth, async (user) => {
      if(user?.uid) {
        dispatch( login(user.uid, user.displayName) );
        setIsLoggedIn(true);

        dispatch( startLoadingNotes( user.uid ) );
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
        <Route path='/auth/*' element={
            <PublicRoute isAuthenticated={ isLoggedIn } element={AuthRouter} />
          }
        />
        <Route path='/' element={
            <PrivateRoute isAuthenticated={ isLoggedIn} element={JournalScreen}/>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
