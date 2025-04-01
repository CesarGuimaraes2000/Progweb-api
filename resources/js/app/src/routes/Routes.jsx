import React from 'react'
import Routes, { Route } from 'react-router-dom';
import UserFormList from '../views-user/UserFormList';
import UserFormStore from '../views-user/UserFormStore';
import UserFormDestroy from '../views-user/UserFormDestroy';
import UserFormShow from '../views-user/UserFormShow';
import UserFormUpdate from '../views-user/UserFormUpdate';

const Routes = () => {
  return (
    <Routes>
        <Route path='/user/index' element ={<UserFormList/>}/>
        <Route path='/user/store' element ={<UserFormStore/>}/>
        <Route path='/user/destroy' element ={<UserFormDestroy/>}/>
        <Route path='/user/show' element ={<UserFormShow/>}/>
        <Route path='/user/update' element ={<UserFormUpdate/>}/>
    </Routes>
  )
}

export default Routes