import React, { useState } from 'react'
import { createPortal } from 'react-dom';




import "./App.css"

const RestartICon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    strokeWidth={2}
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M0 0h24v24H0z" stroke="none" />
    <path d="M19.95 11a8 8 0 1 0-.5 4m.5 5v-5h-5" />
  </svg>
)

const OIcon = (props) => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props} fill={props.color}>
    <path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" />
  </svg>
)

const XIcon = (props) => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props} fill={props.color}>
    <path
      d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
      fillRule="evenodd"
    />
  </svg>
)

const Modal = ({ children, isOpen }) => {
  if (!isOpen) return null

  return createPortal(
    <div className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-[#1f3641] w-full flex items-center justify-center">
      {children}
    </div>,
    document.body)
}

const data = ["x", "o"]

const App = () => {

  const [user, setUser] = useState("o")

  const [filter, setFilter] = useState(false)
  const [screen, setScreen] = useState(1)
  const buttons = new Array(9).fill(null)

  const setPlayer = (data) => {
    setUser(data)
  }

  const changeScreen = (i) => {
    setScreen(i)
  }

  return (


    <div className='top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute flex flex-col gap-5' >
      {
        screen == 1 && <>
          <a href="#" className='flex justify-center'>
            <img src="logo.svg" width={70} alt="logo" />
          </a>
          <div className='flex flex-col items-center py-5 px-4 gap-5 rounded shadow-[2px_3px_rgba(0,0,0,0.38)] bg-[#1f3540] '>
            <span className='text-white mb-2 font-bold'>PICK PLAYER 1'S MARK</span>
            <div className='w-96 bg-[#1a2b33] mb-2 rounded flex overflow-hidden '>
              {
                data.map((item, i) => {
                  return (
                    <button key={i} onClick={() => setPlayer(item)} className={`w-full cursor-pointer py-4 flex justify-center ${item == user && 'select_active'}`} value={item}>
                      {item == "x" ? <XIcon className='w-9' color="white" /> : <OIcon className='w-9' color="white" />}
                    </button>
                  )
                })
              }
            </div>
            <span className='mt-2 text-[#a8bfc9] font-medium'>REMEMBER: X GOES FIRST</span>
          </div>
          <button onClick={() => changeScreen(2)} className='bg-[#f2b137] font-bold text-white rounded py-3 shadow-[2px_3px_#b77c0c]'>NEW GAME (VS CPU)</button>
        </>
      }
      {
        screen == 2 && <>
          <div className='flex justify-between items-center'>
            <a href="#">
              <img src="logo.svg" width={70} alt="" />
            </a>
            <div>
              <span className='uppercase font-bold text-white bg-[#1f3641] flex items-center justify-between gap-2 px-5 py-3 rounded'>
                <XIcon color="white" className='w-4' />
                Turn</span>
            </div>
            <button className='text-white bg-[#1f3641] p-2 rounded hover:opacity-90 duration-200' onClick={() => { setFilter(true) }}>
              <RestartICon className="" />
            </button>

            <Modal isOpen={filter}>
              <div className='flex flex-col py-16 gap-5'>
                <h1 className='text-4xl font-bold text-white'>RESTART GAME</h1>
                <div className='flex gap-5'>
                  <button className='w-full bg-[#a8bfc9] hover:opacity-90 duration-200 py-2 rounded text-xl font-medium shadow-[2px_3px_#6991a2]' onClick={() => { setFilter(false) }}>No, Cancel</button>
                  <button className='w-full bg-[#f2b137] hover:opacity-90 duration-200 py-2 rounded text-xl font-medium shadow-[2px_3px_#b77c0c]' onClick={() => { console.log("Restart Game !") }}>Yes, Restart</button>
                </div>
              </div>
            </Modal>
          </div>

          <div className='grid grid-cols-3 grid-rows-3 gap-8 my-5'>
            {
              buttons.map((item, i) => {
                return (
                  <button key={i} className='bg-[#1f3641] p-8 inline-block rounded shadow-[2px_3px_rgba(0,0,0,0.38)]'>
                    <XIcon className='w-9' color="#31c3bd" />
                  </button>
                )
              })
            }

          </div>

          <div className='flex justify-between gap-5'>
            <div className='px-3 w-full py-2 bg-[#31c3bd] rounded flex flex-col justify-center items-center'>
              X (CPU)
              <span className='font-bold text-3xl'>0</span>
            </div>
            <div className='px-3 w-full py-2 bg-[#a8bfc9] rounded flex flex-col justify-center items-center'>
              Ties
              <span className='font-bold text-3xl'>0</span>
            </div>
            <div className='px-3 w-full py-2 bg-[#f2b137] rounded flex flex-col justify-center items-center'>
              O (You)
              <span className='font-bold text-3xl'>0</span>
            </div>
          </div>

        </>
      }

    </div >
  )
}

export default App