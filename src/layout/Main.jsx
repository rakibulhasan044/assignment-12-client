
import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";


const Main = () => {
    return (
        <div  className="container mx-auto px-4 md:px-8">
            <Navbar />
            <Outlet />
        </div>
    );
};

export default Main;