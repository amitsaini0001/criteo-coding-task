import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {UserPage} from './pages/UserPage/userPage.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* dirty way to add navigation instead of a component, but I will let it pass just this time.
    Don't tell anyone about this 🤫 */}
    <div className='h-[4rem] bg-[#fe5000] flex justify-start items-center px-8'>
      <img className='h-[2rem]' src={'/criteo-logo-white.svg'} alt="dsds"/>
    </div>
    <UserPage />
  </React.StrictMode>,
)
