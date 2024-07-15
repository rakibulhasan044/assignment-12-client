


import LoadSpinner from "../../../components/Spiner/LoadSpinner";
import useAuth from "../../../hooks/useAuth";
import useUserDetails from "../../../hooks/useUserDetails";

const Profile = () => {
  const { user, loading } = useAuth();
  const [userInfo, isLoading] = useUserDetails();

  if (isLoading || loading) return <LoadSpinner />;

  return (
    <div className="flex justify-center items-center h-screen pr-4 w-full">
      <div className="bg-white shadow-lg rounded-2xl lg:w-2/3 xl:w-1/2">
        <img
          alt="profile"
          src="https://wallpapercave.com/wp/wp10784415.jpg"
          className="w-full mb-4 rounded-t-lg h-36"
        />
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <a href="#" className="relative block">
            <img
              alt="profile"
              src={user?.photoURL}
              className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white "
            />
          </a>

          <p className="p-2 px-4 uppercase text-xs text-white bg-pink-500 rounded-full">
            {userInfo.package}
          </p>
          <p className="mt-2 text-xl font-medium text-gray-800 ">
            User Id: {userInfo._id}
          </p>
          <div className="w-full p-2 mt-4 rounded-lg">
            <div className="flex gap-2 flex-wrap items-center justify-between text-sm text-gray-600">
              <p className="flex flex-col">
                Name:
                <span className="font-bold text-black ">
                  {user?.displayName}
                </span>
              </p>
              <p className="flex flex-col">
                Email:
                <span className="font-bold text-black ">{user?.email}</span>
              </p>

              <div>
                <button className="bg-[#F43F5E] px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053] block mb-1">
                  Update Profile
                </button>
                <button className="bg-[#F43F5E] px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053]">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
