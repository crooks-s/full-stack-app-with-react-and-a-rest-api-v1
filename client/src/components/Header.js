import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className='wrap header--flex'>
        <div className='header--logo'>
          <Link to='/'><h1 className='header--logo'>Courses</h1></Link>
        </div>
        <nav>
          {/* add ternary logic to see if user logged in 
              if logged in -- render sign out and a message(?) 
              else render sign up and sign in 
              NOTE: css class will be different also */}
          <ul className='header--signedout'>
            {/* Change href's */}
            <li><a href='/'>Sign Up</a></li> 
            <li><a href='/'>Sign in</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
