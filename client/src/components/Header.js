import { useContext } from 'react';
import { Link } from 'react-router-dom';

import UserContext from '../context/UserContext';

const Header = () => {
  const { authUser } = useContext(UserContext);

  return (
    <header>
      <div className='wrap header--flex'>
        <h1 className='header--logo'><a href='/'>Courses</a></h1>
        <nav>
          {authUser ?
            <>
              {/* class should be header--signedin but has a li marker */}
              <ul className='header--signedout'>
                <li><a href='/signout'>Sign Out</a></li>
              </ul>
            </>
            :
            <>
              <ul className='header--signedout'>
                <li><a href='/signup'>Sign Up</a></li>
                <li><a href='/signin'>Sign in</a></li>
              </ul>
            </>
          }
        </nav>
      </div>
    </header>
  );
}

export default Header;
