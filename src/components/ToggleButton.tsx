import { useToggleButton } from '@react-aria/button'
import { useToggleState } from '@react-stately/toggle';
import { MoonStars, SunDim } from 'phosphor-react';
import { ButtonHTMLAttributes, useRef } from 'react';

interface Props {
  children: React.ReactNode;
  onClick?: (e?: React.MouseEvent) => void;
}
export default function ToggleButton(props: Props) {
  const ref = useRef(null)
  const state = useToggleState(props)
  const { buttonProps } = useToggleButton(props, state, ref)
  console.log(buttonProps)
  return (
    <button
      {...buttonProps as ButtonHTMLAttributes<HTMLButtonElement>}
      ref={ref}
      className={`block w-[42px] h-[25px] rounded-full relative shadow-xl border border-[1px] ${state.isSelected ? 'bg-black border-gray-600' : 'bg-neutral-200 border-neutral-900'}`}
    >
      <div className={`w-[21px] h-[21px] grid place-items-center bg-white shadow-xl block rounded-full will-change-transform ${state.isSelected ? 'translate-x-full duration-300' : 'translate-x-0 duration-300'}`}>
            {state.isSelected ?
              <MoonStars size={18} />
              : <SunDim size={18} />
            }
      </div>
    </button>
  )
}

