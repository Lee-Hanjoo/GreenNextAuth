// 프론트단

import { signIn } from 'next-auth/react'
import React from 'react'

const login = () => {

  const handleSubmit = async (e) => {
    e.preventDefault();
    let id = e.target.id.value;
    let pw = e.target.pw.value;
    console.log(id,pw);
    let result = await signIn('credentials', {redirect:false,id,pw})
    if(result.ok) {
      
    } else {
      alert(result.error)
    }
  }

  return (
    <div>
      <h2>login</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <input style={{display:'block'}} name='id' type='text' placeholder='id' />
          <input style={{display:'block'}} name='pw' type='password' placeholder='pw' />
          <input style={{display:'block'}} type='submit' value='sign In' />
        </form>
      </div>
      <div>
        <button onClick={()=>{signIn('github', {callbackUrl:'/'})}}>Github</button>
        <button onClick={()=>{signIn('google', {callbackUrl:'/'})}}>Google</button>
        <button onClick={()=>{signIn('naver', {callbackUrl:'/'})}}>naver</button>
        <button onClick={()=>{signIn('kakao', {callbackUrl:'/'})}}>kakao</button>
      </div>
    </div>
  )
}

export default login