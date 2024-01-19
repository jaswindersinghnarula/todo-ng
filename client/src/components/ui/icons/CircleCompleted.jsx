import React from "react";

const CircleCompleted = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            {...props}
        >
            <circle
                cx="12"
                cy="12"
                r="9"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle
                cx="12"
                cy="12"
                r="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="currentColor"
            />
        </svg>
    );
};

export default CircleCompleted;
