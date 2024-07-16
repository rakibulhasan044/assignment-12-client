
import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";
import Footer from "../shared/Footer/Footer";


const Main = () => {
    return (
        <div  className="container mx-auto px-4 md:px-8">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Main;