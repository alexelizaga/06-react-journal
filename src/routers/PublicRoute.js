import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PublicRoute = ({
    isAuthenticated,
    element: Component
}) => {
    return isAuthenticated
        ? <Navigate to={'/'} />
        : <Component />

}

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    element: PropTypes.func.isRequired
}