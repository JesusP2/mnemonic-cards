import { UserOutlined, LockOutlined, EyeOutlined, MailOutlined } from '@ant-design/icons'
import { Input, Button } from 'antd'
import ExternalLogins from 'components/External-logins';
import { useState } from 'react';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className='grid place-items-center bg-neutral-800 h-screen'>
      <div className="w-full max-w-md sm:shadow-xl rounded-lg px-8 py-8 bg-white">
        <h1 className="text-5xl font-semibold font-acme text-center">Nimonikku</h1>
        <img src="/brain-webp.png" className="cover w-40 mx-auto" />
        <h2 className="text-2xl font-semibold mb-6">Sign up</h2>
        <Input prefix={<UserOutlined />} placeholder='example@gmail.com' className='rounded-sm h-10 mb-4' type='email' />
        <Input prefix={<MailOutlined />} placeholder='example@gmail.com' className='rounded-sm h-10 mb-4' type='email' />
        <Input prefix={<LockOutlined />} suffix={<EyeOutlined onClick={() => setShowPassword(prev => !prev)} />} placeholder='password' className='rounded-sm h-10 mb-1' type={showPassword ? 'text' : 'password'} />
        <Button className="border-none w-full rounded-xl text-center table mx-auto h-[42px] py-2 bg-indigo-800 focus:bg-indigo-700 focus:text-neutral-200 hover:bg-indigo-700 hover:text-neutral-200 text-neutral-200 font-bold mt-4">Create account</Button>
        <p className="text-neutral-500 font-bold text-xs text-center my-4">OR</p>
        <ExternalLogins />
      </div>
    </div>
  );
}

