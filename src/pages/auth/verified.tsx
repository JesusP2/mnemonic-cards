import Link from 'next/link'
export default function Verified() {
  return (
    <div className="grid place-items-center bg-neutral-800 h-screen">
      <div className="w-full max-w-md sm:shadow-xl rounded-lg px-8 py-8 bg-white">
        <h2 className="font-bold text-lg font-acme">Nimonikku</h2>
        <h1 className='font-bold text-2xl mt-6 mb-2'>Email verified</h1>
        <p className=' text-neutral-500 mb-4'>Congratz! You&apos;ve verified your email</p>
        <Link href="/">
          <a>
            <button
              type="submit"
              className="border-none w-full rounded-xl text-center table mx-auto h-[42px] py-2 bg-indigo-700 text-white focus:bg-indigo-600 hover:bg-indigo-600 font-bold"
            >
              CONTINUE
            </button>
          </a>
        </Link>
      </div>
    </div>
  )
}
