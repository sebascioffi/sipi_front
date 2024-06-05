import { useParams } from "react-router-dom"

const Movie = () => {

    const params = useParams()


  return (
    <div>
      <h1>{params.id}</h1>
    </div>
  )
}

export default Movie
