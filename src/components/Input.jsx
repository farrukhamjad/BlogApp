import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className="w-full">
            {label &&
                <label className='inline-block' htmlFor={id}>
                    {label}
                </label>
            }
            <input type={type} name="" id={id} className={`w-full py-2 px-3 rounded-lg border border-border-clr focus:border-primary-clr outline-none text-white mt-3 transition-all ${className}`} ref={ref} {...props}/>
        </div>
    )
})

export default Input
