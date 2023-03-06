import React from "react"
import { Search, Widget, Chat, Notification, Profile } from "../../routes/index"

export const Header = () => {
  return (
    <>
      <section className='header'>
        <div className='container'>
          <div className='header_left'>
            <Search />
          </div>
          <div className='header_right'>
            <>
              <Widget />
              <Chat />
              <Notification />
              <Profile />
            </>
          </div>
        </div>
      </section>
    </>
  )
}
