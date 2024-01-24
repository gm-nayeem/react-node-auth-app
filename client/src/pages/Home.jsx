import { Link } from 'react-router-dom';
import AuthenticationImage from '../assets/authentication.jpg';

const Home = ({ user }) => {

    return (
        <div className='w-full min-h-[calc(100vh-48px)] flex flex-col items-center justify-center gap-6 p-6'>
            {
                user ? (
                    <img
                        src={user?.profilePic || AuthenticationImage}
                        alt="Profile"
                        className='w-[50dvw] h-[50dvh] object-contain'
                    />
                ) : (
                    <>
                        <img
                            src={AuthenticationImage}
                            alt="default"
                            className='w-[50dvw] h-[50dvh] object-cover'
                        />
                        <Link
                            to='/login'
                            className='text-lg text-blue-500 hover:underline'
                        >
                            Navigate to Login Page
                        </Link>
                    </>
                )
            }
        </div>
    )
}

export default Home;
