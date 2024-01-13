import React from 'react';

type ButtonPropsType = {
    title: string
    onClickHandler: () => void
}
export const Button: React.FC<ButtonPropsType> = ({title, onClickHandler}) => {
    return (
        <button onClick={onClickHandler}>{title}</button>
    );
};