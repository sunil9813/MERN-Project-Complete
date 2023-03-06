import React from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const ProductForm = ({ product, productImage, imagePreview, description, setDescription, handleInputChange, handleImageChange, saveProduct, button }) => {
  return (
    <>
      <form onSubmit={saveProduct}>
        <div className='flex justify-between'>
          <div className='border-2 border-gray-200 p-5 rounded-lg w-3/5 m-2'>
            <div className='flex justify-between items-center'>
              <div className='input w-full m-2'>
                <label className='mb-2 block'>Product Name</label>
                <input name='name' value={product?.name} onChange={handleInputChange} type='text' className='rounded-lg border-2 border-solid border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-3 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300' placeholder='Product Name' />
              </div>
              <div className='input w-full m-2'>
                <label className='mb-2 block'>Category</label>
                <input type='text' name='category' value={product?.category} onChange={handleInputChange} placeholder='Category' className='rounded-lg border-2 border-solid border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-3 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300' />
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <div className='input w-full m-2'>
                <label className='mb-2 block mt-5'>Price</label>
                <input type='text' name='price' value={product?.price} onChange={handleInputChange} placeholder='Price' className='rounded-lg border-2 border-solid border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-3 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300' />
              </div>
              <div className='input w-full m-2'>
                <label className='mb-2 block mt-5'>Quantity</label>
                <input type='text' name='quantity' placeholder='Quantity' value={product?.quantity} onChange={handleInputChange} className='rounded-lg border-2 border-solid border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-3 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300' />
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <div className='input w-full m-2'>
                <label className='mb-2 block mt-5'>Color</label>
                <input type='text' name='color' placeholder='Color' value={product?.color} onChange={handleInputChange} className='rounded-lg border-2 border-solid border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-3 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300' />
              </div>
              <div className='input w-full m-2'>
                <label className='mb-2 block mt-5'>Size</label>
                <input type='text' name='size' placeholder='Size' value={product?.size} onChange={handleInputChange} className='rounded-lg border-2 border-solid border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-3 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300' />
              </div>
            </div>
          </div>
          <div className='border-2 border-gray-200 p-5 rounded-lg w-2/5 m-2'>
            <label className=''>Product Image</label>
            <label class='block text-sm font-medium text-white ' for='file_input'>
              Upload file
            </label>
            <input onChange={handleImageChange} multiple class='mb-4 block w-full cursor-pointer rounded-lg border-2 border-solid border-gray-300 text-gray-900 flex-1 min-w-0 text-sm p-3 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300' id='file_input' type='file' />
            {imagePreview != null ? (
              <div className='image_preview my-3 w-full h-52'>
                <img src={imagePreview[0]} alt='imags' className='w-full h-full object-cover' />
              </div>
            ) : (
              <p className='my-3'>No Image set for this product</p>
            )}
          </div>
        </div>
        <div className='border-2 border-gray-200 p-5 rounded-lg m-2'>
          <label>Product Description:</label>
          <ReactQuill theme='snow' value={description} onChange={setDescription} modules={ProductForm.modules} formats={ProductForm.formats} />
        </div>

        <button type='submit' class='rounded-lg mt-4 py-2.5 px-4 text-smfont-medium text-center text-white bg-blue  border-2 border-solid border-blue focus:ring-4 focus:outline-none focus:ring-blue-300 '>
          {button}
        </button>
      </form>
    </>
  )
}

ProductForm.modules = {
  toolbar: [
    [
      {
        header: "1",
      },
      { header: "2" },
      { font: [] },
    ],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    ["clean"],
  ],
}
ProductForm.formats = ["header", "font", "size", "bold", "italic", "underline", "strike", "blockquote", "color", "background", "list", "bullet", "indent", "link", "video", "image", "code-block", "align"]

export default ProductForm
