import React from 'react'
import { getUsers, createModal } from '../utils/utils';
import Form from '../components/Forms';
import '../index.css';

const LoginPage = ({ navigation }) => {
    const handleSubmit = (formData) => {
        const users = getUsers();
        const userLoginCheckout = users.find(user => user.email === formData.email);

        if (!userLoginCheckout) {
            createModal('The email is not registered yet. Please, create an account first', () => {
                navigation.navigateToRegister();
            });
            return;
        }

        if (userLoginCheckout.password !== formData.password) {
            createModal('Incorrect password, Please, try again');
            return;
        }

        if (formData.rememberme) {
            localStorage.setItem('id', userLoginCheckout.id);
        } else {
            sessionStorage.setItem('id', userLoginCheckout.id);
        }

        navigation.navigateToHome();
    };

    return (
        <div className="loginForm">
            <button
                className="imgButton"
                onClick={navigation.navigateToLanding}
            >
                <img src="/Logo.jpg" alt="Home" />
            </button>
            <h1 className="title">LOGIN</h1>
            <Form
                inputsArray={[
                    { label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email', isRequired: true, autoComplete: "email" },
                    { label: 'Password', inputType: 'password', inputPlaceholder: '*******', inputId: 'password', isRequired: true, autoComplete: "current-password" },
                    { label: 'Remember me', inputType: 'checkbox', inputId: 'rememberme', isRequired: false }
                ]}
                submitButtonText="Login"
                onSubmit={handleSubmit}
            />
            <h4 className="loginMsg">You don't have an account?</h4>
            <button
                className="buttonGoToRegister"
                onClick={navigation.navigateToRegister}
            >
                Register now!
            </button>
        </div>
    );
};

export default LoginPage
