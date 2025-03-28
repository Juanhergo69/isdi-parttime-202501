import React from 'react'
import { getUsers, saveUsers, capitalizeFirstLetter, validateEmail, validatePassword, createModal } from '../utils/utils';
import Form from '../components/Forms';
import '../index.css';

const RegisterPage = ({ navigation }) => {
    const handleSubmit = (formData) => {
        if (!validateEmail(formData.email)) {
            createModal('Email must contain text + @ + text + valid termination (example .com, .es, .net, etc...)');
            return;
        }

        if (!validatePassword(formData.password)) {
            createModal('Password must contain 6 characters, 1 upper letter, 1 lower letter, 1 number and 1 special character');
            return;
        }

        if (formData.password !== formData['confirmation-password']) {
            createModal('Passwords are not the same. Please, try again');
            return;
        }

        const users = getUsers();
        const doesUserExist = users.some(user => user.email === formData.email);

        if (doesUserExist) {
            createModal('This mail is already in use');
            return;
        }

        const userName = formData.email.split('@')[0];
        const capitalizedUserName = capitalizeFirstLetter(userName);
        const userCreated = {
            email: formData.email,
            password: formData.password,
            userName: capitalizedUserName,
            id: Date.now()
        };

        users.push(userCreated);
        saveUsers(users);
        sessionStorage.setItem('id', userCreated.id);
        navigation.navigateToHome();
    };

    return (
        <div className="registerForm">
            <button
                className="imgButton"
                onClick={navigation.navigateToLanding}
            >
                <img src="/Logo.jpg" alt="Home" />
            </button>
            <h1 className="title">REGISTER</h1>
            <Form
                inputsArray={[
                    { label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email', isRequired: true, autoComplete: "email" },
                    { label: 'Password', inputType: 'password', inputPlaceholder: '*******', inputId: 'password', isRequired: true, autoComplete: "new-password" },
                    { label: 'Confirm password', inputType: 'password', inputPlaceholder: '*******', inputId: 'confirmation-password', isRequired: true, autoComplete: "new-password" }
                ]}
                submitButtonText="Register"
                onSubmit={handleSubmit}
            />
            <h4 className="registerMsg">Have you an account?</h4>
            <button
                className="buttonGoToLogin"
                onClick={navigation.navigateToLogin}
            >
                Go to login
            </button>
        </div>
    );
};

export default RegisterPage