import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">404</h1>
      <Link to="/" className="mt-4 inline-block font-medium">
        Về trang chủ
      </Link>
    </div>
  )
}

export default NotFound