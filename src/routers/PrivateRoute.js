import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PrivateRoute = ({
    isAuthenticated,
    element: Component
}) => {
    return isAuthenticated
        ? <Component />
        : <Navigate to={'/auth/login'} />

}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    element: PropTypes.func.isRequired
}