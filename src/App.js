import './App.css';

import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import DashboardMachineDataMain from './Components/MachineData/MachineData';
import ReportMachine from './Components/ReportMachine/ReportMachine';
import Login from './Components/Auth/Login/Login';
import ProtedtedRoute from './Components/GlobalRoute/ProtedtedRoute';
import Error from './Components/PageNotFound/PageError';
import Footer from './Components/Common/Footer/Footer';

const ProtectedRoutes = () => {
  let location = useLocation()

  return (
    <>
      <div className="App">
        <Routes>
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/' element={<Navigate replace to='/login' />}></Route>
          <Route exact path='/dashboard/Dep' element={<ProtedtedRoute Component={DashboardMachineDataMain} />}></Route>
          <Route exact path='/dashboard/report' element={<ProtedtedRoute Component={ReportMachine} />}></Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
      {location.pathname !== "/login" && location.pathname !== "/dashboard/Dep" && location.pathname !== "/dashboard/report" && <Footer comp={"Developed & Designed by HUNCH Automation Private Limited"} />}
    </>
  )
}

function App() {
  return (
    <>
      <Router>
        <ProtectedRoutes />
      </Router>
    </>
  );
}

export default App;
