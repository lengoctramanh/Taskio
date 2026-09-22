import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosClient from '../api/axiosClient'
import { saveToken } from '../utils/token'

function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const response = await axiosClient.post('/api/auth/login', form)
    saveToken(response.data.accessToken)
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md rounded bg-white p-6 shadow">
      <h1 className="mb-6 text-2xl font-bold">Login</h1>

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="mb-4 w-full rounded border px-3 py-2"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="mb-4 w-full rounded border px-3 py-2"
      />

      <button className="w-full rounded bg-slate-900 px-4 py-2 text-white">
        Login
      </button>

      <p className="mt-4 text-sm">
        Chưa có tài khoản? <Link to="/register" className="font-medium">Register</Link>
      </p>
    </form>
  )
}

export default Login