import {Button} from 'antd'
import {GoogleOutlined, FacebookFilled, AppleFilled} from '@ant-design/icons'

export default function ExternalLogins() {
  return (

    <div className='flex gap-x-4 w-full justify-center my-4'>
      <Button className='rounded-xl p-2 h-12 px-6'>
        <GoogleOutlined className="text-2xl text-red-600 relative bottom-[1px]" />
      </Button>
      <Button className='rounded-xl p-2 h-12 px-6'>
        <FacebookFilled className='text-blue-700 text-2xl relative bottom-[1px]' />
      </Button>
      <Button className='rounded-xl p-2 h-12 px-6'>
        <AppleFilled className="relative bottom-[3px] text-black" style={{ fontSize: '28px' }} />
      </Button>
    </div>
  )
}
