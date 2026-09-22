import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosClient from '../api/axiosClient'

function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
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

    await axiosClient.post('/api/auth/register', form)
    navigate('/login')
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md rounded bg-white p-6 shadow">
      <h1 className="mb-6 text-2xl font-bold">Register</h1>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="mb-4 w-full rounded border px-3 py-2"
      />

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
        Register
      </button>

      <p className="mt-4 text-sm">
        Đã có tài khoản? <Link to="/login" className="font-medium">Login</Link>
      </p>
    </form>
  )
}

export default Register