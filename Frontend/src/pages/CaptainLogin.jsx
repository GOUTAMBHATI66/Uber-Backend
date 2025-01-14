import Label from "../components/ui/Labal";
import Input from "../components/ui/Input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const CaptainLogin = () => {

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [captainDetails, setCaptainDetails] = useState({})

  const SubmitHandler = (e) => {
    e.preventDefault()
    setCaptainDetails({
      email,
      password
    })
    setEmail('')
    setPassword('')
  }


  return (
    <div className="h-screen flex flex-col gap-6 justify-between px-4 py-10">
      <div className="flex flex-col gap-10 justify-between">
        <h1 className=" text-3xl font-bold">Good To See You &#129303;</h1>

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
          Want to join us?{" "}
          <Link to={"/captainSignup"} className=" text-blue-500 hover:underline">
            Be a captain?
          </Link>{" "}
        </div>
      </div>

      <div className="border-t border-black/50 py-4">
        <button 
        onClick={() => navigate('/userSignin')}
        className=" w-full px-4 py-2 rounded bg-[#d5622d] hover:bg-[#c25b2b] text-white font-semibold text-xl ">
          Sign in as a User
        </button>
      </div>
    </div>
  );
};

export default CaptainLogin;
