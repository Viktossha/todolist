import React from 'react';

type ButtonPropsType = {
    title: string
    onClickHandler: () => void
    isDisabled?: boolean
    class?: string
}
export const Button: React.FC<ButtonPropsType> = ({title, onClickHandler, isDisabled, ...props}) => {
    return (
        <button className={props.class} disabled={isDisabled} onClick={onClickHandler}>{title}</button>
    );
};