import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useModal } from '../contexts/ModalContext'
import { useNavigate } from 'react-router-dom'
import {
    fetchUserProfile,
    updateUserProfile,
    updateUserAvatar,
    deleteUserAccount
} from '../logic/userAPI'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import AvatarEditor from '../components/AvatarEditor'

function ProfilePage() {
    const navigate = useNavigate()
    const { user, logout, updateUser } = useAuth()
    const { showModal } = useModal()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    })
    const [errors, setErrors] = useState({})

    const loadUserData = async () => {
        try {
            if (user?.username && user?.email) {
                setFormData({
                    username: user.username,
                    email: user.email,
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                })
                return
            }

            const userData = await fetchUserProfile()
            setFormData({
                username: userData.username,
                email: userData.email,
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            })
        } catch (error) {
            console.error('Error loading user data:', error)

            if (error.response?.status === 401 || error.response?.status === 404) {
                logout({ redirect: false })
                navigate('/login')
                return
            }

            if (error.response?.status !== 401 && error.response?.status !== 404) {
                showModal('Error', 'Failed to load user data')
            }
        }
    }

    useEffect(() => {
        if (user) {
            loadUserData()
        }
    }, [user])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const validateForm = () => {
        const newErrors = {}
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required'
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format'
        }

        if (formData.newPassword) {
            if (!formData.currentPassword) {
                newErrors.currentPassword = 'Current password is required'
            }

            if (!passwordRegex.test(formData.newPassword)) {
                newErrors.newPassword = 'Password must contain: 8+ chars, 1 uppercase, 1 number, 1 special char'
            }

            if (formData.newPassword !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match'
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0
    }

    const handleProfileUpdate = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        try {
            const updates = {}

            if (formData.username !== user.username) updates.username = formData.username
            if (formData.email !== user.email) updates.email = formData.email
            if (formData.newPassword) {
                updates.currentPassword = formData.currentPassword
                updates.newPassword = formData.newPassword
            }

            const updatedUser = await updateUserProfile(user.id, updates)
            updateUser(updatedUser)

            if (formData.newPassword) {
                setFormData(prev => ({
                    ...prev,
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                }))
            }

            showModal('Success', 'Profile updated successfully!')
        } catch (error) {
            let errorMessage = 'Failed to update profile'

            if (error.response) {
                if (error.response.status === 400) {
                    errorMessage = error.response.data.message || 'Validation error'
                    if (error.response.data.message?.includes('Password must contain')) {
                        errorMessage = error.response.data.message;
                    }
                } else if (error.response.status === 401) {
                    errorMessage = 'Session expired. Please login again.'
                    logout();
                    navigate('/login')
                }
            }
            showModal('Error', errorMessage)
        }
    }

    const handleAvatarChange = async (avatarData) => {
        try {
            const updatedUser = await updateUserAvatar(user.id, avatarData)
            updateUser(updatedUser)
            showModal('Success', 'Avatar updated successfully!')
        } catch (error) {
            showModal('Error', error.response?.data?.message || 'Failed to update avatar')
        }
    }

    const handleAvatarRemove = async () => {
        try {
            const updatedUser = await updateUserAvatar(user.id, null)
            updateUser(updatedUser)
            showModal('Success', 'Avatar removed successfully!')
        } catch (error) {
            showModal('Error', error.response?.data?.message || 'Failed to remove avatar')
        }
    }

    const handleDeleteAccount = () => {
        showModal(
            'Confirm Account Deletion',
            'Are you sure you want to delete your account? This will remove all your data permanently.',
            async () => {
                try {
                    await deleteUserAccount(user.id)
                    logout()
                } catch (error) {
                    let errorMessage = 'Failed to delete account'

                    if (error.response?.status === 401) {
                        errorMessage = 'Session expired. Please login again.'
                    } else if (error.response?.status === 403) {
                        errorMessage = 'You are not authorized to delete this account'
                    } else if (error.response?.status === 404) {
                        errorMessage = 'User not found'
                    }

                    showModal('Error', errorMessage)
                }
            }
        )
    }

    return (
        <div className="min-h-screen bg-retro-dark p-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-retro-pink font-retro text-3xl">
                        Your Profile
                    </h1>
                    <Button
                        onClick={() => navigate('/home')}
                        variant="secondary"
                        className="font-retro flex items-center gap-1 px-3 py-2"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span className="sr-only md:not-sr-only">HOME</span>
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-retro">
                        <h2 className="text-retro-purple font-retro text-xl mb-4">
                            Avatar Settings
                        </h2>
                        <AvatarEditor
                            currentAvatar={user?.avatar}
                            username={user?.username}
                            onChange={handleAvatarChange}
                            onRemove={handleAvatarRemove}
                        />
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-retro">
                        <h2 className="text-retro-purple font-retro text-xl mb-4">
                            Profile Information
                        </h2>
                        <form onSubmit={handleProfileUpdate} className="space-y-4">
                            <Input
                                label="Username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                error={errors.username}
                                required
                            />
                            <Input
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                error={errors.email}
                                required
                            />
                            <Input
                                label="Current Password (to change password)"
                                name="currentPassword"
                                type="password"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                error={errors.currentPassword}
                            />
                            <Input
                                label="New Password"
                                name="newPassword"
                                type="password"
                                value={formData.newPassword}
                                onChange={handleChange}
                                error={errors.newPassword}
                            />
                            <Input
                                label="Confirm New Password"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                error={errors.confirmPassword}
                            />
                            <div className="pt-2">
                                <Button type="submit" variant="primary" className="w-full">
                                    Update Profile
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="mt-8 bg-white p-6 rounded-lg shadow-retro">
                    <h2 className="text-retro-purple font-retro text-xl mb-4">
                        Danger Zone
                    </h2>
                    <p className="text-gray-700 mb-4">
                        Deleting your account will remove all your data permanently.
                    </p>
                    <Button onClick={handleDeleteAccount} variant="danger">
                        Delete Account
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage