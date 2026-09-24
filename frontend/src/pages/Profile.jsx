import { useEffect, useState } from 'react'
import axiosClient from '../api/axiosClient'

function Profile() {
  const [profile, setProfile] = useState(null)
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosClient.get('/api/users/profile')

        setProfile(response.data.user)
        setName(response.data.user.name)
        setAvatar(response.data.user.avatar || '')
      } catch (error) {
        setMessage('Không thể tải thông tin profile')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')

    try {
      const response = await axiosClient.put('/api/users/profile', {
        name,
        avatar,
      })

      setProfile(response.data.user)
      setMessage('Cập nhật profile thành công')
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Cập nhật profile thất bại'
      )
    }
  }

  if (loading) {
    return <p>Đang tải profile...</p>
  }

  if (!profile) {
    return <p>{message}</p>
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold">Profile</h1>

      <div className="mt-6 rounded bg-white p-6 shadow">
        <form onSubmit={handleSubmit}>

          {/* Avatar */}
          <div className="mb-6 flex justify-center">
            {avatar ? (
              <img
                src={avatar}
                alt="Avatar"
                className="h-28 w-28 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-slate-200 text-3xl font-bold text-slate-500">
                {name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Name */}
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">
              Name
            </label>

            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded border px-3 py-2"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">
              Email
            </label>

            <input
              value={profile.email}
              disabled
              className="w-full rounded border bg-slate-100 px-3 py-2"
            />
          </div>

          {/* Avatar URL */}
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">
              Avatar URL
            </label>

            <input
              value={avatar}
              onChange={(event) => setAvatar(event.target.value)}
              placeholder="Avatar URL"
              className="w-full rounded border px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="rounded bg-slate-900 px-4 py-2 text-white"
          >
            Update Profile
          </button>

          {message && (
            <p className="mt-4 text-sm text-slate-600">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

export default Profile
