import React from 'react'
import classes from "./MySelect.module.css"

const MySelect = ({ options, defaultOption, value, onChange }) => {
    return (
        <select 
            vlaue={value}
            onChange={event => onChange(event.target.value)}    
        >
            <option value="">{defaultOption}</option>
            {
                options.map(
                    option => <option 
                                value={option.value}
                                key={option.id}
                              >
                                  {option.name}
                              </option>
                )
            }
        </select>
    )
}

export default MySelect
    