import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { imageUpload } from "../../Utils/image";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Register = () => {

  const [show, setShow] = useState(false);
  const { googleSignIn, updateUserProfile, createUser, setUser } = useAuth();
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate()

  const { register, reset, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const imageUrl = await imageUpload(data.photoUrl[0]);

    createUser(data.email, data.password)
    .then(res => {
      updateUserProfile(data.name, imageUrl)
      .then(() => {

        const userInfo = {
          name: data.name,
          email: data.email,
          photo: imageUrl,
          package: 'bronze',
          role: 'user'
        }

        axiosPublic.post('/users', userInfo)
        .then(res => {
          if(res.data.insertedId) {
            reset()
            navigate(location?.state ? location?.state : '/')
            Swal.fire({
              position: "center",
              icon: "success",
              title: 'Register successful',
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
      })
      setUser({...res?.user, displayName: data.name, photoURL: imageUrl})
      
    })
    .catch(error => {
      console.log(error);
      Swal.fire({
        position: "top-end",
        title: `${error.message}`,
        icon: "error",
        text: `${error.message}`,
        showConfirmButton: false,
        timer: 1500
      });
    }) 
    
    
  };

  const handleGoogleLogin = async () => {
    console.log("google click");
    try {
      const result = await googleSignIn();
      const currentUser = result.user;
      const userInfo = {
        name: currentUser?.displayName,
        email: currentUser?.email,
        photo: currentUser?.photoURL,
        package: 'bronze',
        role: 'user'
      };

      await axiosPublic.post('/users', userInfo);
      navigate(location?.state ? location?.state : '/')
      Swal.fire({
        position: "top",
        title: "Successfully Login!",
        text: "Welcome!",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      });
      
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex flex-col gap-8 items-center justify-center mx-auto max-w-2xl">
      <form className="w-full"
      onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text"
          placeholder="name"
          name="name"
          {...register("name", {required: true})} 
          className="input input-bordered" />
          {errors.name && <span>This field is required</span>}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email"
           placeholder="email"
           name="email"
           {...register("email", {required: true})}
          className="input input-bordered" />
          {errors.email && <span>This field is required</span>}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input type="file"
          placeholder="photo url"
          name="photoUrl"
          {...register("photoUrl", { required: true})}
         
          className="file-input file-input-bordered w-full max-w-2xl" />
          {errors.email && <span>This field is required</span>}
        </div>

        <div className="form-control ">
          <label className="label relative "
          onClick={() => setShow(!show)}>
            <span className="label-text ">Password</span>
            {
              show ? <FaEye size={20} className=" absolute right-[5%] top-[140%]"/> :
              <FaEyeSlash size={20} className=" absolute right-[5%] top-[140%]"/>
            }
          </label>
          <input type={ show ? 'text' : 'password' }
          placeholder="password"
          name="password"
          {...register("password", { required: true})}
          className="input input-bordered" />
          {errors.password && <span>This field is required</span>}
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Register</button>
        </div>
      </form>

      <div className="text-center space-y-2">
          <h1 className="text-xl font-bold">Or login with</h1>
          <ul className="flex gap-10 items-center justify-center">
            <li
              onClick={handleGoogleLogin}
              tabIndex={0}
              role="button"
              aria-label="Login with Google"
            >
              <div className="flex gap-3 border p-2 rounded border-orange-400">
                <FaGoogle size={30} />
                <p className=" text-2xl font-semibold">GOOGLE</p>
              </div>
            </li>
          </ul>
          <p>
            Allready have an account ? 
            <Link to="/login" className="text-primary font-semibold">
              Login here
            </Link>
          </p>
        </div>

    </div>
  );
};

export default Register;