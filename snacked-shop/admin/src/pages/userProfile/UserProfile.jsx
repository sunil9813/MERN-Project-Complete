import React from "react"
import { AddUserProfile, ViewUserProfile } from "../../routes/index"

export const UserProfile = () => {
  return (
    <>
      <section className='p-7 profile'>
        <div className='mt-52'>
          <div className='flex justify-between w-full'>
            <div className='flex w-[60%]'>
              <AddUserProfile />
            </div>
            <div className='flex w-[38%]'>
              <ViewUserProfile />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
