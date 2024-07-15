import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import PropTypes from 'prop-types';


const AdminRoutes = ({children}) => {
    const { user, loading } = useAuth();
    const [userInfo, isAdminLoading] = useAdmin();
    const location = useLocation();

    if(loading || isAdminLoading) {
        console.log(loading);
        return <progress className="progress w-56"></progress>
    }
    if(user && userInfo) {
        return children
    }
    return <Navigate to='/' state={{from: location}} replace ></Navigate>
};

AdminRoutes.propTypes = {
    children: PropTypes.node,
}

export default AdminRoutes;