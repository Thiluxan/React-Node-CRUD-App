import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default function Movie() {
    const [movieName, setMovieName] = useState('')
    const [review, setReview] = useState('')
    const [movieReviewList, setMovieReviewList] = useState([])
    const [newReview, setNewReview] = useState('')

    useEffect(() => {
        axios.get('http://localhost:3001/api/get')
         .then(response => {
            setMovieReviewList(response.data)
         })
    },[])

    const submitReview = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/api/insert',{
            movieName:movieName,
            movieReview:review
        })      
    }

    const deleteReview = (id) => {
        axios.delete(`http://localhost:3001/api/delete/${id}`)

    }

    const updateReview = (id) => {
        axios.put(`http://localhost:3001/api/update`,
        {review:newReview,id:id,})

        setNewReview("")
    }

    return (
      <div className="App">
        <h1>CRUD Application</h1>
  
        <div className="form">
          <label>Movie Name: </label>

          <input type="text" 
            placeholder="Movie Name" 
            name="name" 
            onChange={(e) => setMovieName(e.target.value)} 
            value={movieName} 
            />

          <label>Movie Review:</label>

          <input type="text" 
            placeholder="Movie Review" 
            name="review"
            onChange={e => setReview(e.target.value)} 
            value={review}
            />

          <input type="submit" onClick={submitReview} value="Add Review"/>
        </div>
        <table>
            <thead>
                <th>Movie Name</th>
                <th>Movie Review</th>
                <th></th>
                <th>Update Review</th>
                <th></th>
            </thead>
            {
                movieReviewList.map(movieReview => (
                    <tr key={movieReview.id}>
                        <td>{movieReview.name}</td>
                        <td>{movieReview.review}</td>
                        <td>
                            <button className="delete" onClick = {() => deleteReview(movieReview.id)}>Delete</button>
                        </td>
                        <td>
                            <input type="text" id="updateInput" onChange = {(e) => setNewReview(e.target.value)} />
                            <button className="update" onClick={() => updateReview(movieReview.id)}>Update</button>
                        </td>
                        <td>
                            <Link to={"/api/get/"+movieReview.id}>View</Link>
                        </td>
                    </tr>
                ))
            }
        </table>
      </div>
    );
}
