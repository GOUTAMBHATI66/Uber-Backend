import { useNavigate } from "react-router-dom";
import { HiArrowLongRight } from "react-icons/hi2";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-[url(https://plus.unsplash.com/premium_photo-1736435070040-c98215ce275e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fHRyYWZmaWMlMjBsaWdodHN8ZW58MHx8MHx8fDA%3D)] //  
    // h-screen bg-cover bg-left w-full pt-8 flex flex-col justify-between"
    >
      {/* logo image */}
      <img
        className="w-32 ml-8 text-white"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
        alt="Uber logo img"
      />
      <div className=" bg-white flex flex-col items-center gap-5 px-4 py-6 ">
        <h1 className=" text-3xl">Get started with Uber</h1>
        <button
          className=" bg-black text-white w-full px-8 py-3 rounded text-xl relative"
          onClick={() => navigate("/usersignin")}
        >
          <span>Continue</span>
          <HiArrowLongRight size={24} className=" absolute right-3 top-1/3" />
        </button>
      </div>
    </div>
  );
};

export default Home;
