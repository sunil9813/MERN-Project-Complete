import React from "react"
import { category } from "../../components/assets/data"
import { Link } from "react-router-dom"
import { AiFillEye } from "react-icons/ai"
import { BiPencil } from "react-icons/bi"
import { MdDelete } from "react-icons/md"

export const Category = () => {
  return (
    <>
      <section className='p-7'>
        <div className='bg-white p-3 card rounded-sm'>
          <h2 className='text-lg pt-3 text-primary'>Add Product Category</h2>
          <hr className='my-5' />

          {/* category list */}
          <div className='flex justify-between w-full'>
            <div className='w-[27%] border-2 border-gray-200 p-3 rounded-lg'>
              <form>
                <label className='mb-2 block'>Category Name</label>
                <input type='text' className='rounded-lg border-2 border-solid border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-3 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300' placeholder='Category Name' />

                <label className='mb-2 block mt-5'>Slug</label>
                <input type='text' className='rounded-lg border-2 border-solid border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-3 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300' placeholder='Category Name' />

                <label className='mb-2 block mt-5'>Description</label>
                <textarea cols='30' rows='9' className='rounded-lg border-2 border-solid border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-3 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300'></textarea>
                <button class='w-full rounded-lg mt-4 py-2.5 px-4 text-smfont-medium text-center text-white bg-blue  border-2 border-solid border-blue focus:ring-4 focus:outline-none focus:ring-blue-300 ' type='button'>
                  Add Category
                </button>
              </form>
            </div>
            <div class='w-[70%] overflow-x-auto relative rounded-lg p-3 border-2 border-gray-200'>
              <table class='w-full text-sm text-left text-gray-500'>
                <thead class='text-xs uppercase bg-gray-100 text-primary '>
                  <tr>
                    <th scope='col' class='py-3 px-6'>
                      ID
                    </th>
                    <th scope='col' class='py-3 px-6'>
                      Category name
                    </th>
                    <th scope='col' class='py-3 px-6'>
                      Description
                    </th>
                    <th scope='col' class='py-3 px-6'>
                      Slug
                    </th>
                    <th scope='col' class='py-3 px-6'>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {category.map((item) => (
                    <tr class='bg-white border-b'>
                      <td class='py-4 px-6'>{item.id}</td>
                      <td class='py-4 px-6'>{item.name}</td>
                      <td class='py-4 px-6'>{item.desc.slice(0, 35)}...</td>
                      <td class='py-4 px-6'>{item.slug}</td>
                      <td class='py-4 px-6 flex justify-between align-center'>
                        <Link to='productView'>
                          <AiFillEye className='text-blue text-lg' />
                        </Link>
                        <Link to='productEdit'>
                          <BiPencil className='text-green-500 text-lg' />
                        </Link>
                        <Link to='productDelete'>
                          <MdDelete className='text-red-500 text-lg' />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
