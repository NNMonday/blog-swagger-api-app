import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export function convertDate(dateString) {
    const date = new Date(dateString);
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    const monthName = months[monthIndex];
    const day = date.getDate();
    return `${monthName} ${day}, ${year}`;
}

export default function AuthorInfo({ author, updatedAt }) {
    const navigate = useNavigate()
    return (
        <div className='d-flex'>
            <div className='d-flex align-items-center' onClick={() => navigate(`/@${author.username}`)}>
                <img className='rounded-circle' src={author.image} alt="" style={{ width: '32px' }} />
            </div>
            <div className='mx-2'>
                <Link to={`/@${author.username}`} className='m-0 author'>{author.username}</Link>
                <p className='m-0 date'>{convertDate(updatedAt)}</p>
            </div>
        </div>
    )
}
