import React from 'react'
import MyInput from './UI/input/MyInput'
import MySelect from './UI/select/MySelect'

const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
            
            <MyInput
                value={filter.query}
                placeholder="Searching ... "
                onChange={e => setFilter({...filter, query: e.target.value})}
            />
            <MySelect
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                options={
                    [
                        { id: 0, name: "sort by title", value: 'title' },
                        { id: 1, name: "sort by body", value: 'body' },
                    ]
                }
                defaultOption="no sorting" />

        </div>
    )
}

export default PostFilter

