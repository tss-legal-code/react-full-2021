import React, { forwardRef } from 'react'

import classes from "./MyInput.module.css"

const MyInput = forwardRef(
    (props, ref) => {
        return (
            <input
                {...props}
                ref={ref}
                className={classes.myInput}
            />
        )
    }
)

export default MyInput
