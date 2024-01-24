import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { userRequest } from '../utils/makeRequest';
import { AuthContext } from '../context/AuthContext';
import { logout } from '../context/AuthAction';

const apiUrl = import.meta.env.VITE_API_URL;

const Navbar = ({ user }) => {
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        if (user?.accountType === 'google') {
            window.open(`${apiUrl}/auth/logout`, "_self");
        } else {
            const res = await userRequest.post('/auth/logout');
            if (res) {
                dispatch(logout());
                navigate('/');
            }
        }
    };

    return (
        <nav className='w-full bg-slate-500 text-white flex justify-center'>
            <div className='flex gap-6 py-3 text-base'>
                <Link to='/'>Home</Link>
                {
                    user ? (
                        <span
                            onClick={handleLogout}
                            className='cursor-pointer'
                        >
                            Logout
                        </span>
                    ) : (
                        <>
                            <Link to='/register'>Register</Link>
                            <Link to='/login'>Login</Link>
                        </>
                    )
                }
            </div>
        </nav>
    )
}

export default Navbar;