import { useState, useCallback, useEffect,useRef } from 'react'
// import reactLogo from './assets/react.svg'
//  import viteLogo from '/vite.svg'
// import './App.css'

function App() {
const [length, setLength] = useState(7);

      const [numAllowed , setNumAllowed] = useState(false);
      const [charAllowed, setCharAllowed] = useState(false);
      const [password, setPassword] = useState("");

      const passwordGenerator = useCallback( () => {
        let pass="";
        let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if(numAllowed) str +="0123456789";
        if(charAllowed) str +="!@#$%^&*()_+~`|}{[]:;?><,./-=";

        for(let i=1; i<= length; i++){
          let char= Math.floor(Math.random() * str.length +1);
          pass += str.charAt(char);
          
        }
        setPassword(pass);
      } , [length,numAllowed,charAllowed,setPassword])

        // useRef hook 

      const passwordRef= useRef(null);

      const copyPasswordToClipboard= useCallback(() => {
        window.navigator.clipboard.writeText(password);
        passwordRef.current?.select();
        passwordRef.current?.setSelectionRange(0,999);
      },[password])
      useEffect(() => {passwordGenerator()},[length,numAllowed,charAllowed,passwordGenerator])      

     
  return (
    <>
    
  <div className="w-full max-w-md shadow-md rounded-lg px-4 py-3 text-orange-500 bg-gray-800 items-center ">
    <h1 className="text-white text-center my-3">Password Generator</h1>

    <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input
        type="text"
        className="outline-none w-full px-3 py-1 bg-white"
        value={password}
        placeholder="Password"
        readOnly
        ref={passwordRef}
      />
    
  <button 
  onClick={copyPasswordToClipboard}
  className='outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0 '>Copy</button>
      </div>
      <div className='flex gap-x-3 text-sm'>
        <div className='flex text-center '>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e) => {setLength(e.target.value)}}
        />
        <label htmlFor=""> Length : {length} </label>
        </div>
      
      <div className='flex intem-center gap-x-1'>
        <input
        type='checkbox'
        defaultChecked={numAllowed}
        id='nuberInput'
        onChange = {() => {
          setNumAllowed((prev) => !prev)

        }}
        />
       <label htmlFor="numberInput">Nunber</label>
      </div>
       <div className='flex intem-center gap-x-1'>
        <input
        type='checkbox'
        defaultChecked={charAllowed}
        id='characterInput'
        onChange = {() => {
          setCharAllowed((prev) => !prev)

        }}
        />
       <label htmlFor="characterInput">Characters</label>

      </div>
      
      </div>


      </div>
      

    </>
  )
}

export default App
