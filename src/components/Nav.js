import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {

  const navigate = useNavigate()
  const auth = localStorage.getItem('UserInfo');

  const logout = () => {
    localStorage.clear()
    navigate('/signup');
  }
  return (
    <div>
      <div className='nav-ul' style={{float:'left'}}>
        <img className='logo' src='./logo512.png' alt='logo' />
      </div>
      {auth ? <ul className='nav-ul'>
        <li><Link to='/'>Products</Link></li>
        <li><Link to='/add'>Add Products</Link></li>
        <li><Link to='/update'>Update Products</Link></li>
        <li><Link to='/profile'>Profile</Link></li>
        <li style={{ float: 'right' }}><Link onClick={logout} to='/signup'>Logout [ {JSON.parse(auth).user.name} ]</Link></li>
      </ul>
        :
        <ul className='nav-ul'>
          <li style={{ float: 'right' }}><Link to='/signup'>Signup</Link></li>
          <li style={{ float: 'right' }}><Link to='/login'>Login</Link></li>
        </ul>
      }
    </div>
  )
}

export default Nav;