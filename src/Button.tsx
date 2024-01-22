import React from 'react';

type ButtonPropsType = {
    title: string
    onClickHandler: () => void
    class?: string
}
export const Button: React.FC<ButtonPropsType> = ({title, onClickHandler, ...props}) => {
    return (
        <button className={props.class} onClick={onClickHandler}>{title}</button>
    );
};