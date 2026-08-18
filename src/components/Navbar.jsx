import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <ul className='flex bg-blue-600 p-6 gap-28 font-bold text-white'>
          <li >  <Link to='/'>Create task</Link> </li>
          <li><Link to='/taskilist'>Task List</Link></li>
      </ul>
    </div>
  );
}
export default Navbar;


