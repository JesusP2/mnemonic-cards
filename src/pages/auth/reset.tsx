import { LockOutlined, EyeOutlined, MailOutlined } from '@ant-design/icons'
import { Input, Button } from 'antd'
import Link from 'next/link'
import ExternalLogins from 'components/External-logins';
import { useState } from 'react';

export default function SignIn() {
  return (
    <div className='grid place-items-center bg-neutral-800 h-screen'>
      <div className="w-full max-w-md sm:shadow-xl rounded-lg px-8 py-8 bg-white">
        <h1 className="text-3xl xl:text-4xl 2xl:text-5xl font-semibold font-acme text-center">Nimonikku</h1>
        <img src="/brain-webp.png" className="cover w-32 xl:w-36 2xl:w-40 mx-auto" />
        <h2 className="text-xl lg:text-2xl font-semibold mb-6">Forgot password?</h2>
        <p className="text-neutral-500 font-semibold text-xs text-noto-sans mt-4 mb-8">Enter your registered email below to receive the password reset instructions</p>
        <Input prefix={<MailOutlined />} placeholder='example@gmail.com' className='rounded-sm h-10 mb-4' type='email' />
        <Button className="border-none w-full rounded-xl text-center table mx-auto h-[42px] py-2 bg-indigo-800 text-neutral-200  focus:bg-indigo-700 focus:text-neutral-200 hover:bg-indigo-700 hover:text-neutral-200 font-bold">Send</Button>
        <p className='text-center mt-4 font-noto-sans text-xs'>Do you rememebr your password? <Link href="/auth/signin"><a><span className="text-blue-600 font-bold">Login</span></a></Link></p>
      </div>
    </div>
  );
}

