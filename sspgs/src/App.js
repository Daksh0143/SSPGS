
import './App.css';
import Navbar from './Component/Navbar';
import { Route, Routes } from 'react-router-dom';
import AdminMember from './Component/AdminMember';
import Update from './Component/Update';
import Login from './Component/Login';
import Register from './Component/Register';
import Home from './Component/Home';
import AdminCalender from './Component/AdminCalender';
import Events from './Component/Events';
import AddEvent from './Component/AddEvent';
import AdminRegister from './Component/AdminRegister';
import AdminLogin from './Component/AdminLogin';
import Member from './Component/Member';
import AddMember from './Component/AddMember';
import AdminHome from './Component/AdminHome';
import Calender from './Component/Calender';
import AdminAnouncement from './Component/AdminAnouncement';




function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin/member' element={<AdminMember />}></Route>
        <Route path='/admin/add' element={<AddMember />}></Route>
        <Route path='/admin/update/:id' element={<Update />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/calender' element={<Calender />}></Route>
        <Route path='/admin/calender' element={<AdminCalender />}></Route>
        <Route path='/admin/addEvent' element={<AddEvent />}></Route>
        <Route path='/events' element={<Events />}></Route>
        <Route path='/member' element={<Member />}></Route>
        <Route path='/admin/register' element={<AdminRegister />}></Route>
        <Route path='/admin/login' element={<AdminLogin />}></Route>
        <Route path='/admin/' element={<AdminHome />}></Route>
        <Route path='/admin/anouncement' element={<AdminAnouncement />}></Route>
      </Routes>
    </div>
  );
}

export default App;
