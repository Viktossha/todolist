import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    oldTitle: string
    updateTitle: (newTitle: string) => void
    className?: string
}

export const EditableSpan = ({oldTitle, className, updateTitle}: EditableSpanPropsType) => {

    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(oldTitle)

    const editModeHandler = () => {
        setEdit(!edit)
        if (edit) updateTitleHandler()
    }


    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const updateTitleHandler = () => {
        updateTitle(newTitle)
    }

    return (
        edit
            ? <input onBlur={editModeHandler} value={newTitle} autoFocus onChange={changeTaskTitleHandler}/>
            : <span className={className} onDoubleClick={editModeHandler}>{oldTitle}</span>
    )
        ;
};