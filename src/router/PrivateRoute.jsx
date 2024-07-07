
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import LoadSpinner from '../components/Spiner/LoadSpinner';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if(loading) return <LoadSpinner />

    if(user) return children;

    return <Navigate state={location.pathname}
    to='/login' replace={true}></Navigate>
};

PrivateRoute.propTypes = {
    children: PropTypes.node
  }

export default PrivateRoute;