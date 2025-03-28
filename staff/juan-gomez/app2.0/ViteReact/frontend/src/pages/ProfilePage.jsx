import React from 'react';
import {
    getUsers,
    saveUsers,
    validateEmail,
    validatePassword,
    createModal,
    getLoggedUserId
} from '../utils/utils';
import '../index.css';

const ProfilePage = ({ navigation }) => {
    const users = getUsers();
    const loggedUserId = getLoggedUserId();
    const loggedUser = users.find(user => user.id === loggedUserId);

    const [formData, setFormData] = React.useState({
        userName: (loggedUser && loggedUser.userName) || '',
        email: (loggedUser && loggedUser.email) || '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = React.useState({});

    if (!loggedUserId) {
        navigation.navigateToLogin();
        return null;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.userName.trim()) {
            newErrors.userName = 'Username is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (formData.password || formData.confirmPassword) {
            if (formData.password.length < 6) {
                newErrors.password = 'Password must be at least 6 characters';
            } else if (!validatePassword(formData.password)) {
                newErrors.password = 'Password must contain at least one uppercase, one lowercase, one number and one special character';
            }

            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const updatedUsers = users.map(user => {
            if (user.id === loggedUserId) {
                const updatedUser = {
                    ...user,
                    userName: formData.userName,
                    email: formData.email
                };

                if (formData.password) {
                    updatedUser.password = formData.password;
                }

                return updatedUser;
            }
            return user;
        });

        saveUsers(updatedUsers);
        createModal('Profile updated successfully!', () => {
            navigation.navigateToHome();
        });
    };

    return (
        <div className="profilePageContainer">
            <div className="homeHeaderContainer">
                <div className="homeImgContainer">
                    <img src="/Logo.jpg" className="homeImg" alt="Logo" />
                </div>

                <h1 className="homeMsg">Edit Profile</h1>

                <button
                    className="menuButton"
                    onClick={() => navigation.navigateToHome()}
                    aria-label="Back to home"
                >
                    <i className="fas fa-arrow-left"></i>
                </button>
            </div>

            <div className="profileFormContainer">
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label htmlFor="userName">Username:</label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            className={errors.userName ? 'error' : ''}
                        />
                        {errors.userName && <span className="error-message">{errors.userName}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'error' : ''}
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">New Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? 'error' : ''}
                        />
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm New Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={errors.confirmPassword ? 'error' : ''}
                        />
                        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="buttonJoin">Save Changes</button>
                        <button type="button" className="buttonGoToLogin" onClick={() => navigation.navigateToHome()}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;
