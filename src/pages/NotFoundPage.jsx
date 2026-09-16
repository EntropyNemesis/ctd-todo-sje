import { Link } from 'react-router';

function NotFoundPage() {
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
        <Link className="linkButton" to={'/about'}>
            About
        </Link>

    </div>
    </>
  );
}
export default NotFoundPage;