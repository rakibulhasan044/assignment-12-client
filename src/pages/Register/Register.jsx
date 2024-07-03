import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { imageUpload } from "../../Utils/image";

const Register = () => {

  const [show, setShow] = useState(false);
  const { user, googleSignIn } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm();
  // const handleRegister = (e) => {
  //   e.preventDefault();
  //   const form = e.target;
  //   const name = form.name.value;
  //   const email = form.email.value;
  //   const photourl = form.photourl.value;
  //   const password = form.password.value;

  //   const uppercaseRegex = /[A-Z]/;
  //   const lowercaseRegex = /[a-z]/;
  //   const lengthRegex = /.{6,}/;

  //   if (!lengthRegex.test(password)) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: `Password must be longer than 6 character!`,
  //     });
  //     return;
  //   } 
  //   if (!uppercaseRegex.test(password)) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: `Please include a uppercase character!`,
  //     });
  //     return;
  //   }
  //   if (!lowercaseRegex.test(password)) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: `Please include a lowercase character!`,
  //     });
  //     return;
  //   }

  //   createUser(email, password)
  //     .then((res) => {
  //       console.log(res.user);
  //       updateUserProfile(name, photourl);
  //       setUser({ ...res?.user, displayName: name, photoURL: photourl });
  //       navigate(location?.state ? location.state : '/', {replace: true})
  //       Swal.fire({
  //         title: "Successfully Register!",
  //         text: "Welcome!",
  //         icon: "success",
  //       });
  //     })
  //     .catch((error) => {
  //       Swal.fire({
  //         title: "Please Try Again!",
  //         text: `${error.message}`,
  //         icon: "error",
  //       });
  //     });
  // };

  const onSubmit = async (data) => {
    console.log(data);
    const imageUrl = await imageUpload(data.photoUrl[0]);
    //console.log(imageUrl);
  };

  const handleGoogleLogin = async () => {
    console.log("google click");
    try {
      const result = await googleSignIn();
      console.log(result.user);
      // navigate(location?.state ? location.state : "/");
      Swal.fire({
        title: "Successfully Login!",
        text: "Welcome!",
        icon: "success",
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
            Do not have an account ? 
            <Link to="/login" className="text-primary font-semibold">
              Login here
            </Link>
          </p>
        </div>

    </div>
  );
};

export default Register;