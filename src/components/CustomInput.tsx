import { useState } from "react";

interface Props {
  outlineName: string;
  placeholder: string;
}
export default function CustomImput(props: Props) {
  const [focused, setFocused] = useState(false)
  return (
    <div className='relative h-10 mt-10 ml-10 bg-inherit'>
      <input onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} type="email" className='h-10 w-64 rounded-sm hover:outline-white pl-4 outline-neutral-400 outline outline-[1px] bg-inherit focus:outline-indigo-600 border-0' />
      <p className={`bg-inherit absolute ml-2 ${focused ? '-top-2 text-xs text-indigo-400' : 'top-2'} duration-100 px-2`}>{props.outlineName}</p>
    </div>
  )
}
