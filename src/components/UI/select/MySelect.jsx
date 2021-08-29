import React from 'react'

const MySelect = ({ options, defaultOption, value, onChange }) => {
    return (
        <select 
            vlaue={value}
            onChange={event => onChange(event.target.value)}    
        >
            <option value="" selected>{defaultOption}</option>
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
    