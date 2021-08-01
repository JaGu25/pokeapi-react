import React from 'react'
import './index.scss'

interface IOption {
    name: string
}

interface IProps {
    options?: IOption[]
    handleChange?: (e: any) => void
    currentValue: string
}

const Select: React.FC<IProps> = ({
    options,
    handleChange,
    currentValue
}) => {
    return (
        <select className="select" onChange={handleChange} value={currentValue}>
            {
                options?.map((option) => (
                    <option value={option.name} key={option.name}>{option.name}</option>
                ))
            }
        </select>
    )
}

export default Select
