import React from 'react'
import empty from '../../Image/emptyNote.svg'
function Empty() {
    return <>


        <div className='empty text-center '>
            <figure className='position-relative w-75 text-center m-auto'>
                <p>No Notes Now <i className='fa fa-trash text-danger'></i> </p>

                <img src={empty} className='w-100 ' alt="Empty" />

            </figure>

        </div>


    </>
}

export default Empty
