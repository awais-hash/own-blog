import React,{useId} from 'react'


const Input = (
    {
        label,
        type= "text",
        placeholder= "",
        className= "",
        ...props
    },ref
) => {
    const id = useId();
  return (
    <div>
        {label && <label className="block mb-1 font-semibold" htmlFor={id}>{label}</label>}
      <input type= {type} placeholder={placeholder} className={`w-full px-3 py-2 border rounded ${className}`} ref={ref} {...props} />
    </div>
  )
}

export default React.forwardRef(Input);

