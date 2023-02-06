import React from 'react'
import {toast} from "react-toastify"
import {useParams} from "react-router-dom"

const EditOrder = () => {
    const {id} = useParams()
    console.log(id)
    const notify = () => toast.success("Changes submitted");

  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-4/12" >
        <form onSubmit={(e)=>{
            e.preventDefault()
            console.log(e.target)
            notify()
        }}>
            <h3 className="mb-4 font-bold text-blue-400">Update Order Details</h3>
            <div className="mb-4">
                <input className="outline-0 rounded-sm border-2 border-gray-200 w-full p-2" placeholder="Enter Price" type="number" />
            </div>
            <div className="mb-4">
                <input className="outline-0 rounded-sm border-2 border-gray-200 w-full p-2" placeholder="Enter Freight Value" type="number" />
            </div>
            <div>
                <button className="bg-blue-600 py-2 px-4 text-white rounded-sm" type="submit">Update</button>
            </div>
        </form>
    </div>
    </div>
    
  )
}

export default EditOrder