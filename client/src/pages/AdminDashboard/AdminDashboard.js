import React from 'react'
import {Link} from "react-router-dom"

const AdminDashboard = ({history}) => {
    return (
        <div>
           <h1>Welcome to Admin Dashboard</h1> 
           <Link to="/quiz/add"><button className="btn btn-outline-primary">Add Quiz</button></Link>

        </div>
    )
}

export default AdminDashboard
