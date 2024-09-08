import React from 'react';

type ButtonPropsType = {
    title: string
    onClickHandler: () => void
    classes?: string
    isDisabled?: boolean
    class?: string
}
export const Button: React.FC<ButtonPropsType> = ({title, onClickHandler, classes}) => {
export const Button: React.FC<ButtonPropsType> = ({title, onClickHandler, isDisabled, ...props}) => {
    return (
        <button className={classes} disabled={isDisabled} onClick={onClickHandler}>{title}</button>
    );
};