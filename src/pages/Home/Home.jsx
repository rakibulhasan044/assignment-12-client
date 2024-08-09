import Banner from "./Banner/Banner";
import ExtraSection from "./ExtraSection/ExtraSection";
import MealsCategory from "./MealsCategory/MealsCategory";
import MembershipPackage from "./MembershipPackage/MembershipPackage";


const Home = () => {
    return (
        <div className="">
            <Banner />
            <MealsCategory />
            <MembershipPackage />
            <ExtraSection />
        </div>
    );
};

export default Home;