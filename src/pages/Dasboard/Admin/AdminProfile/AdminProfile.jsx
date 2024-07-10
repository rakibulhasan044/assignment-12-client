
import useUserDetails from "../../../../hooks/useUserDetails";


const AdminProfile = () => {
    const [userInfo] = useUserDetails()
    return (
        <div className="flex justify-center items-center h-screen pr-4 w-full">
          <div className="bg-white shadow-lg rounded-2xl">
            <img
              alt="profile"
              src="https://wallpapercave.com/wp/wp10784415.jpg"
              className="w-full mb-4 rounded-t-lg h-36"
            />
            <div className="flex flex-col items-center justify-center p-4 -mt-16">
              <a href="#" className="relative block">
                <img
                  alt="profile"
                  src={userInfo?.photo}
                  className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white "
                />
              </a>
    
              <div className="text-center md:px-24">
              <p className="text-xl font-semibold text-black">Name: {userInfo.name}</p>
              <p className="text-xl font-semibold text-black">Email: {userInfo.email}</p>
              <p className="text-xl font-semibold text-black">Item Added: {userInfo?.item_added || 0 }</p>
              </div>
              <div className="">
                <button className="bg-[#F43F5E] px-10 py-2 mt-3 rounded-lg text-white cursor-pointer hover:bg-[#af4053] block mb-1">
                  Update Profile
                </button>
                <button className="bg-[#F43F5E] px-7 mt-2 py-2 rounded-lg text-white cursor-pointer hover:bg-[#af4053]">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      );
};

export default AdminProfile;