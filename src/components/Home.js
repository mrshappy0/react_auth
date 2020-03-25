import React from 'react'
import { Link } from "react-router-dom";

export default function Home(props) {
    return (
        <div>
            <h1>Welcome back {props.user.username ? props.user.username : "User!" }</h1>
            <Link to='/login'>Logout</Link>
        </div>
    )
}
