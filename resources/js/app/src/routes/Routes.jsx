import React from 'react'
import  { Route,Routes } from 'react-router-dom';
import UserFormList from '../views/user/UserFormList';
import UserFormStore from '../views/user/UserFormStore';
import UserFormDestroy from '../views/user/UserFormDestroy';
import UserFormShow from '../views/user/UserFormShow';
import UserFormUpdate from '../views/user/UserFormUpdate';
import Layout from './Layout';
import Dashboard from '../components/Dashboard';
import NotFound from '../views/NotFound';
import Login from '../views/login/Login';
import SignUp from '../views/login/SignUp';
import UpdatePassword from '../views/login/UpdatePassword';
import ForgotPassword from '../views/login/ForgotPassword';

const Rotas = () => {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<SignUp/>}/>
      <Route path='/updatepassword' element={<UpdatePassword/>}/>
      <Route path='/forgotpassword' element={<ForgotPassword/>}/>
      <Route element={<Layout/>}>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/user/index' element ={<UserFormList/>}/>
        <Route path='/user/store' element ={<UserFormStore/>}/>
        <Route path='/user/destroy/:id' element ={<UserFormDestroy/>}/>
        <Route path='/user/show/:id' element ={<UserFormShow/>}/>
        <Route path='/user/update/:id' element ={<UserFormUpdate/>}/>
      </Route>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  )
}

export default Rotas