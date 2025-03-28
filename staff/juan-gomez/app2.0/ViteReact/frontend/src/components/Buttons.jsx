import React from 'react'

const Button = ({ buttonContent, buttonCallback, className }) => {
    return (
        <button className={className} onClick={buttonCallback}>
            {buttonContent}
        </button>
    )
}

const ImgButton = ({ imgSrc, className, onClick }) => {
    return (
        <button
            style={{ border: 'none', background: 'transparent' }}
            onClick={onClick}
            className={className}
        >
            <img src={imgSrc} alt="Button" style={{ width: '100%', height: 'auto' }} />
        </button>
    )
}

export { Button, ImgButton }