import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';

import { useForm } from '../../hooks/useForm';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

  const dispatch = useDispatch();
  const { ui } = useSelector( state => state );
  console.log(ui.msgError);

  const [ formValue, handleInputChange ] = useForm({
    name: 'Alex',
    email: 'alex@gmail.com',
    password: '123456',
    password2: '123456'
  });

  const { name, email, password, password2 } = formValue;

  const handleRegister = (e) => {
    e.preventDefault();
    
    if ( isFormValid() ) {
      dispatch( startRegisterWithEmailPasswordName( email, password, name) );
    }
    
  }

  const isFormValid = () => {
    if ( name.trim().length === 0 ) {
      dispatch( setError('Name is required') );
      return false;
    } else if ( !validator.isEmail(email) ) {
      dispatch( setError('Email is not valid') );
    } else if ( password.length < 5 ) {
      dispatch( setError('Password should be at least 6 characters') );
      return false;
    } else if ( password !== password2 ) {
      dispatch( setError('Password should match each other') );
    }

    dispatch( removeError() );
    return true;
  }

  return (
    <>
      <h3 className="auth__title">Register</h3>

      <form onSubmit={handleRegister}>

        { 
          ui.msgError &&
          (
            <div className='auth__alert-error'>
              { ui.msgError }
            </div>
          )
        }

        <input
          type="text"
          placeholder="Name"
          name="name"
          className="auth__input"
          autoComplete="off"
          value={ name }
          onChange={ handleInputChange }
        />

        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={ email }
          onChange={ handleInputChange }
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={ password }
          onChange={ handleInputChange }
        />

        <input
          type="password"
          placeholder="Confirm password"
          name="password2"
          className="auth__input"
          value={ password2 }
          onChange={ handleInputChange }
        />

        <button
          type="submit"
          className="btn btn-primary btn-block mb-5"
          disabled={ ui.loading }
        >
          Register
        </button>

        <Link
          to='/auth/login'
          className="link"
        >
          Already registered?
        </Link>
      </form>
    </>
  )
}
