import React from 'react';

type ButtonPropsType = {
    title: string
    onClickHandler: () => void
    classes?: string
}
export const Button: React.FC<ButtonPropsType> = ({title, onClickHandler, classes}) => {
    return (
        <button className={classes} onClick={onClickHandler}>{title}</button>
    );
};