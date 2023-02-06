import React,{useState} from 'react'
import {Link} from "react-router-dom"
import {BeatLoader} from "react-spinners"
import {  useQuery,useMutation } from 'react-query'
import { FaEdit,FaTrash } from 'react-icons/fa';


import request from "../utils/axios-client"

const fetchOrders = (pageNumber:number) =>{
   return request({url:`/order-items?page=${pageNumber}&limit=20`}).then(res => res.data)
}

const deleteOrder = (id:string) =>{
    return request({url:`/order-items/${id}`}).then(res => res.data)
 }
 


const TableRole:React.FC<any> = ({order,onDeleteOrder}) =>{

    return  <tr className="border-b-2 border-gray-200 text-gray-600">
    <th className="p-3 text-left">{order?._id.substr(17,7) || "ID"}</th>
    <th className="p-3 text-left">{order?.product_id.substr(0,6) || "Product ID"}</th>
    <th className="p-3 text-left">{order?.seller_id.substr(0,6) || "Seller ID"}</th>
    <th className="p-3 text-left">{order?.price || "Price"}</th>
    <th className="p-3 text-left">{order?.shipping_limit_date || "2017-09-19"}</th>
    <th className="p-3 text-center"><span className="flex gap-x-1"><span><Link to={`/orders/${order?._id}`}><FaEdit /></Link></span><span className="cursor-pointer" onClick={()=> onDeleteOrder(order?._id)}><FaTrash /></span></span></th>
</tr>
}

const Orders = () => {
    const [pageNumber,setPageNumber] = useState(1)
    const { isLoading, data } = useQuery('orders',()=>fetchOrders(pageNumber),{
        keepPreviousData:true
    })

    const {mutate} = useMutation(deleteOrder)

    const onDeleteOrder = (id:string) => {
        mutate(id)
    }

  if(isLoading) return <p className='h-screen flex justify-center items-center'><BeatLoader /></p>


  const numOfPages = Math.ceil(data.total/20)
  console.log(data)

  return (
    <div className="w-screen h-screen flex p-4 justify-center">
       <div className="w-7/12">
       <table className="w-full">
            <thead className="bg-blue-600 text-white border-x-2 border-gray-200">
                <tr>
                    <th className="p-3 text-left">ID</th>
                    <th className="p-3 text-left">Product ID</th>
                    <th className="p-3 text-left">Seller ID</th>
                    <th className="p-3 text-left">Price</th>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Actions</th>
                </tr>
            </thead>
            <tbody className="border-x-2 border-gray-200">
            {data.orders.map((order:any,i:number) => <TableRole order={order} key={i} onDeleteOrder={onDeleteOrder} />)}
            </tbody>
        </table>
        <div className='mt-4 flex justify-end gap-x-4'>
            <button disabled={pageNumber === 1} onClick={()=>setPageNumber(prev => --prev)} className="bg-blue-500 text-white px-2 py-1">Previous</button>
            <button disabled={pageNumber === numOfPages}  onClick={()=>setPageNumber(prev => ++prev)} className="bg-blue-500 text-white px-2 py-1">Next</button>
        </div>
       </div>
    </div>
  )
}

export default Orders