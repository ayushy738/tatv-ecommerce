import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { backendUrl,currency } from '../App';
import { toast } from 'react-toastify';

const List = ({token}) => {

  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get( backendUrl +'/api/product/list')
      if (response.data.success) {
        setList(response.data.products)
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log('Error fetching list:', error)
      toast.error(response.data.message || 'Failed to fetch list')
    }
  }
  const removeItem = async (id) => {
    try {
      const response = await axios.post(backendUrl + `/api/product/remove`,{id},{headers: {token}})
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log('Error removing item:', error)
      toast.error('Failed to remove item')
    }
  }

  useEffect(() => {
    fetchList()
  }, [])
  
  
  return (
    <>
  <p className="mb-4 text-lg font-semibold">All Products List</p>

<div className="flex flex-col gap-3">

  {/* Table Header (Visible on md and above) */}
  <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 bg-gray-200 text-gray-800 text-sm font-semibold border rounded-md">
    <span>Image</span>
    <span>Name</span>
    <span>Category</span>
    <span>Price</span>
    <span className="text-center">Action</span>
  </div>

  {/* Product List */}
  {list.map((item, index) => (
    <div 
      key={index}
      className="grid grid-cols-[1fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-3 md:gap-4 py-2 px-4 border rounded-md bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      <img 
        src={item.image[0]} 
        alt={item.name} 
        className="w-14 h-12 object-cover rounded border" 
      />
      <span className="truncate">{item.name}</span>
      <span className="text-sm text-gray-700">{item.category}</span>
      <span className="font-medium text-gray-900">{currency}{item.price}</span>
      <button 
        className="text-red-500 text-center text-2xl hover:text-red-700 transition-colors"
        title="Remove item" onClick={() => removeItem(item._id)}
      >
        X
      </button>
    </div>
  ))}
</div>

    </>
  )
}

export default List
