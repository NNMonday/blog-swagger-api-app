import React from 'react'
import { TailSpin } from 'react-loader-spinner'

export default function LoadingIndicator() {
    return (
        <div className='d-flex justify-content-center align-items-center pt-5'>
            <TailSpin
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}
