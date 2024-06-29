import Banner from "./Banner/Banner";
import MealsCategory from "./MealsCategory/MealsCategory";
import MembershipPackage from "./MembershipPackage/MembershipPackage";


const Home = () => {
    return (
        <div className="">
            <Banner />
            <MealsCategory />
            <MembershipPackage />
        </div>
    );
};

export default Home;