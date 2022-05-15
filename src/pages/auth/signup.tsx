import { UserOutlined, LockOutlined, EyeOutlined, MailOutlined } from '@ant-design/icons'
import { Input, Button, Form } from 'antd'
import ExternalLogins from 'components/External-logins';
import Link from 'next/link';
import { useState } from 'react';

type ValidateStatus = Parameters<typeof Form.Item>[0]['validateStatus']

interface PasswordValidation {
  validateStatus: ValidateStatus;
  errorMsg: string | null;
  value: string;
}

function validatePassword(password: string) {
  let passwordLevel = 0
  let validated: 'success' | 'error' = 'success';
  let errorMsg = null

  if (password.length < 8) {
    errorMsg = 'Password must be at least 8 characters long'
    validated = 'error';
  } else {
    passwordLevel++
  }

  if (!/\d/.test(password)) {
    errorMsg = errorMsg ? errorMsg : 'Password must contain at least 1 number'
    validated = 'error';
  } else {
    passwordLevel++
  }

  if (!/[a-z]/.test(password)) {
    errorMsg = errorMsg ? errorMsg : 'Password must contain at least one lowercase character'
    validated = 'error';
  } else {
    passwordLevel++
  }

  if (!/[A-Z]/.test(password)) {
    errorMsg = errorMsg ? errorMsg : 'Password must contain at least one uppercase character'
    validated = 'error';
  } else {
    passwordLevel++
  }

  if (!/[^0-9a-zA-Z]/.test(password)) {
    errorMsg = errorMsg ? errorMsg : 'Password must contain at least one symbol'
    validated = 'error';
  } else {
    passwordLevel++
  }

  return {
    passwordLevel,
    validateStatus: validated,
    errorMsg: errorMsg
  }
}

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [passwordLevel, setPasswordLevel] = useState(-1)
  const [password, setPassword] = useState<PasswordValidation>({ value: '', validateStatus: 'success', errorMsg: null } as PasswordValidation)

  const onFinish = (values: { password: string; email: string; username: string }) => {
    if (!values.password) {
      setPassword(prev => ({ ...prev, validateStatus: 'error' }))
      setPasswordLevel(0)
      return
    }
  };

  const onPasswordChange = (value: string) => {
    const passwordValidation = validatePassword(value)
    setPassword({ value, errorMsg: passwordValidation.errorMsg, validateStatus: passwordValidation.validateStatus })
    setPasswordLevel(passwordValidation.passwordLevel)
  }

  return (
    <div className='grid place-items-center bg-neutral-800 h-screen overflow-auto'>
      <div className="w-full max-w-md sm:shadow-xl rounded-lg px-8 pt-8 pb-6 bg-white">
        <h1 className="text-3xl xl:text-4xl 2xl:text-5xl font-semibold font-acme text-center">Nimonikku</h1>
        <img src="/brain-webp.png" className="cover w-32 xl:w-36 2xl:w-40 mx-auto" />
        <h2 className="text-xl lg:text-2xl font-semibold mb-6">Sign up</h2>
        <Form
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
            className='mb-4'
          >
            <Input prefix={<UserOutlined />} placeholder='John Doe' className='rounded-sm h-10' type='text' />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input a valid email', type: 'email' }]}
            className='mb-4'
          >
            <Input prefix={<MailOutlined />} placeholder='example@gmail.com' className='rounded-sm h-10' type='email' />
          </Form.Item>
          <Form.Item
            name="password"
            validateStatus={password.validateStatus}
            className='mb-1'
          >
            <Input
              prefix={<LockOutlined />}
              suffix={<EyeOutlined onClick={() => setShowPassword(prev => !prev)} />}
              placeholder='password'
              className='rounded-sm h-10'
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => onPasswordChange(e.target.value)}
            />
            <div className="flex mt-2 w-64">
              <div className={`w-full h-2 border-[1px] border-solid border-r-0 ${passwordLevel > 0 ? 'bg-green-600' : (passwordLevel !== -1 ? 'bg-red-600' : '')}`}></div>
              <div className={`w-full h-2 border-[1px] border-solid border-r-0 ${passwordLevel > 1 ? 'bg-green-600' : (passwordLevel !== -1 ? 'bg-red-600' : '')}`}></div>
              <div className={`w-full h-2 border-[1px] border-solid border-r-0 ${passwordLevel > 2 ? 'bg-green-600' : (passwordLevel !== -1 ? 'bg-red-600' : '')}`}></div>
              <div className={`w-full h-2 border-[1px] border-solid border-r-0 ${passwordLevel > 3 ? 'bg-green-600' : (passwordLevel !== -1 ? 'bg-red-600' : '')}`}></div>
              <div className={`w-full h-2 border-[1px] border-solid ${passwordLevel > 4 ? 'bg-green-600' : (passwordLevel !== -1 ? 'bg-red-600' : '')}`}></div>
            </div>
          </Form.Item>
          <Form.Item
            className="mt-4 mb-0"
          >
            <Button htmlType="submit" className="border-none w-full rounded-xl text-center table mx-auto h-[42px] py-2 bg-indigo-800 focus:bg-indigo-700 focus:text-neutral-200 hover:bg-indigo-700 hover:text-neutral-200 text-neutral-200 font-bold">Create account</Button>
          </Form.Item>
        </Form>
        <p className="text-neutral-500 font-bold text-xs text-center my-4">OR</p>
        <ExternalLogins />
        <p className='text-center font-noto-sans text-xs'>Already have an account? <Link href="/auth/signin"><a><span className="text-blue-600 font-bold">Sign in</span></a></Link></p>
      </div>
    </div>
  );
}

