import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Register = () => {

  const [show, setShow] = useState(false);
  const { user, googleSignIn, signIn } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log(data);
    signIn(data.email, data.password)
    .then(res => {
      console.log(res.user);
    })
    .catch(error => {
      console.log(error);
    }) 
  };

  const handleGoogleLogin = async () => {
    console.log("google click");
    try {
      const result = await googleSignIn();
      console.log(result.user);
      // navigate(location?.state ? location.state : "/");
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: 'Register successful',
        text: `Welcome, ${user?.displayName}`,
        showConfirmButton: false,
        timer: 1500
      });
    } catch (err) {
      console.log(err.message);
      Swal.fire({
        position: "top-end",
        title: `${err.message}`,
        icon: "error",
        text: `${err.message}`,
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  return (
    <div className="flex flex-col gap-8 items-center md:mt-20 mx-auto max-w-2xl min-h-screen">
      <form className="w-full"
      onSubmit={handleSubmit(onSubmit)}>

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
            Do not have an account ? 
            <Link to="/register" className="text-primary font-semibold">
              Register here
            </Link>
          </p>
        </div>

    </div>
  );
};

export default Register;