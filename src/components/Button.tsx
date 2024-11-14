import { ComponentProps } from "react"

type ButtProps = {
    danger?:boolean,
    text:string
} & ComponentProps<'button'>

const Button = ({danger, text, className, ...props}:ButtProps) => {
  return (
    <button className={`rounded px-2 py-1 text-white ${danger ? 'bg-red-800 hover:bg-red-700':'bg-blue-800 hover:bg-blue-700'} ${className}`} {...props} >{text}</button>
  )
}

export default Button