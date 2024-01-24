import { useState } from 'react';
import GoogleImage from '../assets/google.png';

const apiUrl = import.meta.env.VITE_API_URL;


const Form = ({ onSubmit, title, btn }) => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUser(prev => (
            {
                ...prev,
                [name]: value
            }
        ));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(user);
    };

    return (
        <div className='h-[92dvh] flex justify-center items-center'>
            <div className='w-[50dvw] h-[70dvh] bg-white shadow-md rounded-md py-6 flex justify-center'>
                <div className='w-[40dvw] flex flex-col gap-6'>
                    <h1 className="text-xl text-center mb-4 font-semibold leading-tight tracking-tight text-gray-800 md:text-2xl">
                        {title}
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className='flex flex-col gap-6'
                    >
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                            type="email" name="email" value={user.email}
                            placeholder="enter your email" required
                            onChange={handleChange}
                        />
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                            type="password" name="password" value={user.password}
                            placeholder="enter password" required
                            onChange={handleChange}
                        />
                        <button
                            type="submit"
                            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-md px-5 py-2.5 text-center"
                        >
                            {btn}
                        </button>
                    </form>

                    <h2 className='text-center text-gray-700 font-medium'>OR</h2>

                    <a href={`${apiUrl}/auth/google`}>
                        <div
                            className='hover:bg-gray-100 border border-gray-300 text-gray-900 md:text-md flex justify-center items-center gap-2 py-2 rounded-md cursor-pointer'
                        >
                            <img
                                src={GoogleImage}
                                alt="google"
                                className='w-[30px] h-[30px] object-cover'
                            />
                            <span>Log in with Google</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Form;