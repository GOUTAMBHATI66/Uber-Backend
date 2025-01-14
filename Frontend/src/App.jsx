
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserRegister from './pages/UserRegister'
import CaptainLogin from './pages/CaptainLogin'
import CaptainRegister from './pages/CaptainRegister'

const App = () => {

  // const navigate 
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/userSignin' element={<UserLogin />} />
        <Route path='/userSignup' element={<UserRegister />} />
        <Route path='/captainSignin' element={<CaptainLogin />} />
        <Route path='/captainSignup' element={<CaptainRegister />} />
      </Routes>
    </div>
  )
}

export default App