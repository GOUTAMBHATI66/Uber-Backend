import Label from "../components/ui/Labal";
import Input from "../components/ui/Input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const UserLogin = () => {

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userDetails, setUserDetails] = useState({})

  const SubmitHandler = (e) => {
    e.preventDefault()
    setUserDetails({
      email,
      password
    })
    setEmail('')
    setPassword('')
  }
  

  return (
    <div className="h-screen flex flex-col gap-6 justify-between px-4 py-10">
      <div className="flex flex-col gap-10 justify-between">
        <img
          className="w-24 text-white"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
          alt="Uber logo img"
        />

        <form onSubmit={SubmitHandler} className=" space-y-4 ">
          <div className=" space-y-1">
            <Label htmlFor="email">What's your email?</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="example@gmail.com"
            />
          </div>
          <div className=" space-y-1">

            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="password"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-black px-4 py-2 text-white hover:bg-black/90"
          >
            Sign In
          </button>
        </form>
        <div className="text-center">
          New Here?{" "}
          <Link to={"/userSignup"} className=" text-blue-500 hover:underline">
            Create New Account
          </Link>{" "}
        </div>
      </div>

      <div className="border-t border-black/50 py-4">
        <button 
        onClick={() => navigate('/captainSignin')}
        className=" w-full px-4 py-2 rounded bg-[#10b461] hover:bg-[#288556] text-white font-semibold text-xl ">
          Sign in as a Captain
        </button>
      </div>
    </div>
  );
};

export default UserLogin;
