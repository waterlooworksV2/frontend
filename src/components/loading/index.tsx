import React from 'react'
import './index.scss'

interface LoadingProps {
  color?: string;
  size?: number;
  className?: string;
}

export default function Ellipsis({ color="#AAA", size=80, className }: LoadingProps) {
    const circles = [...Array(4)].map((_, index) => <div key={index} style={{ background: `${color}` }} />)

    return (
        <div className={`lds-ellipsis ${className}`} style={{ width: size, height: size }}>
            {circles}
        </div>
    )
}