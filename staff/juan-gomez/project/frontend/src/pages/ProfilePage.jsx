import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useModal } from '../contexts/ModalContext'
import {
    updateUserProfile,
    updateUserAvatar,
    removeUserAvatar,
    deleteUserAccount,
} from '../logic/user/services/userService'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import AvatarEditor from '../components/AvatarEditor'
import { useNavigate } from 'react-router-dom'

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

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username,
                email: user.email,
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            })
        }
    }, [user])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const handleProfileUpdate = async (e) => {
        e.preventDefault()

        try {
            if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
                throw new Error('New passwords do not match')
            }

            const updates = {}
            if (formData.username !== user.username) updates.username = formData.username
            if (formData.email !== user.email) updates.email = formData.email
            if (formData.newPassword) {
                if (!formData.currentPassword) {
                    throw new Error('Current password is required to change password')
                }
                if (formData.currentPassword !== user.password) {
                    throw new Error('Current Password is not correct')
                }
                updates.password = formData.newPassword
            }

            const updatedUser = await updateUserProfile(user.id, updates)
            updateUser(updatedUser)
            showModal('Success', 'Profile updated successfully!', () => navigate('/home'))
        } catch (error) {
            showModal('Error', error.message)
        }
    }

    const handleAvatarChange = async (avatarData) => {
        try {
            const updatedUser = await updateUserAvatar(user.id, avatarData)
            updateUser(updatedUser)
            showModal('Success', 'Avatar updated successfully!')
        } catch (error) {
            showModal('Error', error.message)
        }
    }

    const handleAvatarRemove = async () => {
        try {
            const updatedUser = await removeUserAvatar(user.id)
            updateUser(updatedUser)
            showModal('Success', 'Avatar removed successfully!')
        } catch (error) {
            showModal('Error', error.message)
        }
    }

    const handleDeleteAccount = () => {
        showModal(
            'Confirm Account Deletion',
            'Are you sure you want to delete your account? This action cannot be undone.',
            async () => {
                try {
                    await deleteUserAccount(user.id)
                    logout()
                    navigate('/')
                } catch (error) {
                    showModal('Error', error.message)
                }
            }
        )
    }

    if (!user) {
        return <div>Loading...</div>
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