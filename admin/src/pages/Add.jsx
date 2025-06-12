import React, { useState } from 'react'
import uploadIcon from '../assets/upload_area.png'
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({token}) => {
  const [subCategory, setSubCategory] = useState('');
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [bestseller, setBestseller] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData();
      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('price', price);
      formData.append('bestseller', bestseller);
      formData.append('sizes', JSON.stringify(sizes));
      const response = await axios.post(backendUrl + "/api/product/add", formData,{headers: {token}});
      if(response.data.success) {
        toast.success("Product uploaded successfully!");
        // Reset form fields after successful upload
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setName('');
        setDescription('');
        setCategory('');
        setSubCategory('');
        setPrice('');
        setBestseller(false);
        setSizes([]);
      }else {
        toast.error("Failed to upload product. Please try again." || response.data.message);
      }
      
    } catch (error) {
      console.error("Error uploading product:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      } else {
        console.error("Error message:", error.message);
      }
    }
  }

  // Define which subcategories have sizes
  const sizeSubCategories = ['Shoes', 'Sandals', 'Slippers'];
  const [sizes, setSizes] = useState([]);

  return (
   <form className='flex flex-col w-full items-start gap-4'>
    <div>
      <p className='mb-2'>Upload Image</p>
      <div className="flex gap-2">
        <label htmlFor="image1">
          <img src={!image1 ? uploadIcon : URL.createObjectURL(image1)} alt="Add Icon" className="w-20" />
          <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id='image1' hidden/>
        </label>
        <label htmlFor="image2">
          <img src={!image2 ? uploadIcon : URL.createObjectURL(image2)} alt="Add Icon" className="w-20" />
          <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id='image2' hidden/>
        </label>
        <label htmlFor="image3">
          <img src={!image3 ? uploadIcon : URL.createObjectURL(image3)} alt="Add Icon" className="w-20" />
          <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id='image3' hidden/>
        </label>
        <label htmlFor="image4">
          <img src={!image4 ? uploadIcon : URL.createObjectURL(image4)} alt="Add Icon" className="w-20" />
          <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id='image4' hidden/>
        </label>
      </div>
    </div>

    <div className='w-full'>
      <p className='mb-2'>Product Name</p>
      <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='w-full max-w-[500px] px-3 py-2 ' placeholder='Type here' required />
    </div>

    <div className='w-full'>
      <p className='mb-2'>Product Description</p>
      <textarea onChange={(e)=>setDescription(e.target.value)} value={description} type="text" className='w-full max-w-[500px] px-3 py-2 ' placeholder='Write Content Here' required />
    </div>

    <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

      <div>
        <p className='mb-2'>Product Category</p>
        <select className='w-full px-3 py-2' value={category} onChange={(e)=>setCategory(e.target.value)}>
          <option value="">Select Product Category</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
          <option value="Electonics">Electronics</option>
        </select>
      </div>
      <div>
        <p className='mb-2'>Sub Category</p>
        <select
          className='w-full px-3 py-2'
          value={subCategory}
          onChange={e => setSubCategory(e.target.value)}
          required
        >
          <option value="">Select Sub Category</option>
          <option value="Shoes">Shoes</option>
          <option value="Sandals">Sandals</option>
          <option value="Earbuds">EarBuds</option>
          <option value="Slippers">Slippers</option>
          <option value="Watches">Watches</option>
        </select>
      </div>

      <div>
        <p className='mb-2 '>Product Price</p>
        <input onChange={(e)=>setPrice(e.target.value)} value={price} type="number" className='w-full sm:w-[120px] px-3 py-2 ' placeholder='Rs.500' required />
      </div>

    </div>
    {/* Conditionally render sizes */}
    {sizeSubCategories.includes(subCategory) && (
      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className="flex gap-3">
          <div onClick={()=>setSizes(prev => prev.includes(6) ? prev.filter(item => item !== 6) : [...prev, 6])}>
            <p className={`${sizes.includes(6) ? "bg-blue-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>6</p>
          </div>
          <div onClick={()=>setSizes(prev => prev.includes(7) ? prev.filter(item => item !== 7) : [...prev, 7])} >
            <p className={`${sizes.includes(7) ? "bg-blue-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>7</p>
          </div>
          <div onClick={()=>setSizes(prev => prev.includes(8) ? prev.filter(item => item !== 8) : [...prev, 8])}>
            <p className={`${sizes.includes(8) ? "bg-blue-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>8</p>
          </div>
          <div onClick={()=>setSizes(prev => prev.includes(9) ? prev.filter(item => item !== 9) : [...prev, 9])} >
            <p className={`${sizes.includes(9) ? "bg-blue-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>9</p>
          </div>
          <div onClick={()=>setSizes(prev => prev.includes(10) ? prev.filter(item => item !== 10) : [...prev, 10])} >
            <p className={`${sizes.includes(10) ? "bg-blue-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>10</p>
          </div>
          <div onClick={()=>setSizes(prev => prev.includes(11) ? prev.filter(item => item !== 11) : [...prev, 11])}>
            <p className={`${sizes.includes(11) ? "bg-blue-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>11</p>
          </div>
        </div>
      </div>
    )}
    <div className='flex mt-2 gap-2'>
      <input
        onChange={() => {
          setBestseller(prev => {
            console.log("Checkbox toggled, new value:", !prev);
            return !prev;
          });
        }}
        checked={bestseller}
        type="checkbox"
        id='bestseller'
      />
      <label className='cursor-pointer' htmlFor="bestseller">Add to Bestseller</label>
    </div>

    <button type='submit' onClick={handleSubmit} className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
   </form>
  )
}

export default Add
