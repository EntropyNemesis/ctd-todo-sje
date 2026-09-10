import { Link } from 'react-router';
import Logoff from '../features/Logoff.jsx';

function NotFound() {
  return (
    <>
    <div className="notFoundMsg">
        <h2>404: Not Found</h2>
    </div>
  
    <div className="buttonGroup">
        <Link className="linkButton" to={'/'}>
            Return to Homepage
        </Link>
        <Link className="linkButton" to={'/profile'}>
            Go to My Profile
        </Link>

    </div>
    </>
  );
}
export default NotFound;