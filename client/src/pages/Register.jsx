import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import { userRequest } from '../utils/makeRequest';

const Register = () => {
    const navigate = useNavigate();

    const handleSubmit = async (user) => {
        try {
            const res = await userRequest.post('/auth/register', user);
            res && navigate('/login');
        } catch (err) {
            console.log('error', err);
        }
    }


    return (
        <>
            <Form
                onSubmit={handleSubmit}
                title='Create an Account'
                btn='Sign up'
            />
        </>
    )
}

export default Register;