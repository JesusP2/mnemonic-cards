import {GoogleOutlined, FacebookFilled, AppleFilled} from '@ant-design/icons'

export default function ExternalLogins() {
  return (

    <div className='flex gap-x-4 w-full justify-center my-4'>
      <button className='rounded-xl p-2 h-12 px-6 border-solid border-[1px] hover:border-blue-400 focus:border-blue-400'>
        <GoogleOutlined style={{color: '#DC2626', position: 'relative', bottom:'3px', fontSize: '1.5rem', lineHeight: '2rem'}} />
      </button>
      <button className='rounded-xl h-12 px-6 text-blue-700 border-solid border-[1px] hover:border-blue-400 focus:border-blue-400'>
        <FacebookFilled style={{color: '#1D4ED8', position: 'relative', bottom:'3px', fontSize: '1.5rem', lineHeight: '2rem'}}  />
      </button>
      <button className='rounded-xl p-2 h-12 px-6 border-solid border-[1px] hover:bg-neutral-200 focus:border-blue-400'>
        <AppleFilled style={{color: 'black', position: 'relative', bottom:'5px', fontSize: '1.5rem', lineHeight: '2rem'}}  />
      </button>
    </div>
  )
}
