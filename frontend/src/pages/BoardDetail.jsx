import { useParams } from 'react-router-dom'

function BoardDetail() {
  const { id } = useParams()

  return (
    <div>
      <h1 className="text-2xl font-bold">Board Detail</h1>
      <p className="mt-2 text-slate-600">Board ID: {id}</p>
    </div>
  )
}

export default BoardDetail