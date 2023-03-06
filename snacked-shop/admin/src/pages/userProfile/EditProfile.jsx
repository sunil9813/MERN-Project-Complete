import React, { useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Loader from "../../components/loader/Loader"
import { selectUser } from "../../redux/auth/authSlice"
import { updateUser } from "../../services/authServices"
import { ChangePassword } from "./ChangePassword"

export const EditProfile = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const user = useSelector(selectUser)
  console.log(`User === ${user}`)
  const { email } = user

  useEffect(() => {
    if (!email) {
      navigate("/profile")
    }
  }, [email, navigate])

  const initialState = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    photo: user?.photo,
  }
  const [profile, setProfile] = useState(initialState)
  const [profileImg, setProfileImg] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfile({
      ...profile,
      [name]: value,
    })
  }

  const handleImageChange = (e) => {
    setProfileImg(e.target.files[0])
  }

  // save the profile
  const saveProfile = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // handle Image upload in cloudnary
      let imageURL
      if (profileImg && (profileImg.type === "image/jpeg" || profileImg.type === "image/jpg" || profileImg.type === "image/png")) {
        const image = new FormData()
        image.append("file", profileImg)
        image.append("cloud_name", "dpkp8ha7b")
        image.append("upload_preset", "qcpi319o")

        // first save image in cloudinary
        const res = await fetch("https://api.cloudinary.com/v1_1/dpkp8ha7b/image/upload", { method: "post", body: image })
        const imageData = await res.json()
        imageURL = imageData.url.toString()
      }
      //save profile
      const formData = {
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
        photo: profileImg ? imageURL : profile.photo,
      }

      const data = await updateUser(formData)
      console.log(data)
      toast.success("User updated successfully")
      navigate("/profile")
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      toast.error(error.message)
    }
  }

  return (
    <>
      <section className='w-[60%] m-auto my-5'>
        <div className='bg-white card rounded-lg h-auto p-7'>
          {isLoading && <Loader />}
          <form onSubmit={saveProfile}>
            <div className='inputs border-2 border-gray-200 rounded-lg mb-4'>
              <h3 className='text-md p-3 text-primary'>USER INFORMATION</h3>
              <hr />
              <div className='p-3 w-full'>
                <div className='flex justify-between'>
                  <div className='input w-full m-2'>
                    <label className='mb-2 block'>Name</label>
                    <input type='text' name='name' value={profile?.name} onChange={handleInputChange} className='rounded-lg border-2 border-solid border-gray-300 text-gray-900  text-sm p-3 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300' />
                  </div>
                  <div className='input w-full m-2'>
                    <label className='mb-2 block'>Email</label>
                    <input type='text' placeholder={profile?.email} onChange={handleInputChange} disabled className='rounded-lg border-2 border-solid border-red-300 text-gray-900 text-sm p-3 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300' />
                    <code className='text-red-400'>Email cannot be changed</code>
                  </div>
                </div>
                <div className='input m-2 mr-2'>
                  <label className='mb-2 block'>Phone</label>
                  <input type='text' name='phone' value={profile?.phone} onChange={handleInputChange} className='rounded-lg border-2 border-solid border-gray-300 text-gray-900  text-sm p-3 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300' />
                </div>
                <div className='input m-2 mr-2'>
                  <label className='mb-2 block'>Bio</label>
                  <textarea value={profile?.bio} name='bio' onChange={handleInputChange} cols='30' rows='10' className='rounded-lg border-2 border-solid border-gray-300 text-gray-900  text-sm p-3 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300'></textarea>
                </div>
                <div className='input m-2 mr-2'>
                  <label className='mb-2 block'>Photo</label>
                  <input type='file' name='image' onChange={handleImageChange} className='rounded-lg border-2 border-solid border-gray-300 text-gray-900  text-sm p-3 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300' />
                </div>
              </div>
            </div>
            <button type='submit' className='rounded-lg mt-4 py-2.5 px-12 text-smfont-medium text-center text-white bg-blue  border-2 border-solid border-blue focus:ring-4 focus:outline-none focus:ring-blue-300 '>
              Save Changes
            </button>
          </form>
        </div>
      </section>
      <ChangePassword />
    </>
  )
}
