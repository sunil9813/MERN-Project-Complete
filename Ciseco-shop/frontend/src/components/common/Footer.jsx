import React from "react"
import { footer } from "../assets/data/data"
import logo from "../assets/images/logo.svg"

export const Footer = () => {
  return (
    <>
      <footer>
        <div className='container'>
          <ul className='grid5'>
            <li>
              <img src={logo} alt='logo' className='logo' /> <br />
              <div className='flex'>
                <img src='https://img.icons8.com/color/25/null/facebook-new.png' />
                Facebook
              </div>
              <div className='flex'>
                <img src='https://img.icons8.com/color/25/null/youtube-play.png' />
                Youtube
              </div>
              <div className='flex'>
                <img src='https://img.icons8.com/color/25/null/telegram-app--v1.png' />
                Telegram
              </div>
              <div className='flex'>
                <img src='https://img.icons8.com/color/25/null/twitter-circled--v1.png' />
                Twitter
              </div>
            </li>
            {footer.map((f, i) => (
              <li key={i}>
                <h3>{f.title}</h3>
                {f.content.map((c, id) => (
                  <span key={id}>{c}</span>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </>
  )
}
