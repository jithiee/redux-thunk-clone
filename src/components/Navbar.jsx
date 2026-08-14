import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <ul className='flex bg-green-400 p-6 gap-28 font-bold'>
          <li >  <Link to='/'>Create task</Link> </li>
          <li><Link to='/taskilist'>Task List</Link></li>
      </ul>
    </div>
  );
}
export default Navbar;


