import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Form from '../components/Form';
import { userRequest } from '../utils/makeRequest';
import { AuthContext } from '../context/AuthContext';
import { loginSuccessful } from '../context/AuthAction';

const Login = () => {
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (user) => {
        try {
            const res = await userRequest.post('/auth/login', user);

            if (res) {
                dispatch(loginSuccessful(res?.data?.payload?.user));
                navigate('/');
            }
        } catch (err) {
            console.log('error', err);
        }
    }

    return (
        <>
            <Form
                onSubmit={handleSubmit}
                title='Log into your Account'
                btn='Sign in'
            />
        </>
    )
}

export default Login;