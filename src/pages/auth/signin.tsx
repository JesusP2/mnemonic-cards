import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Input, Form } from 'antd';
import Link from 'next/link';
import ExternalLogins from 'components/External-logins';

export default function SignIn() {
  return (
    <div className="grid place-items-center bg-neutral-800 h-screen">
      <div className="w-full max-w-md sm:shadow-xl rounded-lg px-8 py-8 bg-white">
        <h1 className="text-3xl xl:text-4xl 2xl:text-5xl font-semibold font-acme text-center">Nimonikku</h1>
        <img src="/brain-webp.png" className="cover w-32 xl:w-36 2xl:w-40 mx-auto" />
        <h2 className="text-xl lg:text-2xl font-semibold mb-6">Login</h2>
        <Form onFinish={(values: {email: string; password: string}) => console.log(values)}>
          <Form.Item
            name="email"
            style={{marginBottom: '1rem'}}
            rules={[{ required: true, message: 'Please input a valid email', type: 'email' }]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="example@gmail.com"
              style={{borderRadius: '0.125rem', height: '2.5rem'}}
              type="email"
            />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Please fill out this field' }]}>
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="password"
              style={{borderRadius: '0.125rem', height: '2.5rem', marginBottom: '0.25rem'}}
            />
          </Form.Item>
          <p className="text-xs font-noto-sans">
            Forgot password?{' '}
            <Link href="/auth/reset">
              <a>
                <span className="text-blue-600 font-bold">Restore</span>
              </a>
            </Link>
          </p>
          <Form.Item name="submit" style={{marginBottom: '1rem'}}>
            <button
              type="submit"
              className="border-none w-full rounded-xl text-center table mx-auto h-[42px] py-2 bg-indigo-800 text-white focus:bg-indigo-700 hover:bg-indigo-700 font-bold"
            >
              Login
            </button>
          </Form.Item>
        </Form>
        <p className="text-neutral-500 font-bold text-xs text-center my-4">OR</p>
        <ExternalLogins />
        <p className="text-center font-noto-sans text-xs">
          New in Nimonikku?{' '}
          <Link href="/auth/signup">
            <a>
              <span className="text-blue-600 font-bold">Register</span>
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
}
