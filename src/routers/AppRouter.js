import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
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

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged (auth, (user) => {
      if(user?.uid) {
        dispatch( login(user.uid, user.displayName) );
      }
    });
  }, [])
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth/*' element={ <AuthRouter /> } />
        <Route path='/' element={ <JournalScreen /> } />
      </Routes>
    </BrowserRouter>
  )
}
