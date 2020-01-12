import React from 'react'
import './index.scss'

interface LoadingProps {
  color?: string;
  size?: number;
  className?: string;
}

export default function LoadingSpinner({ color="#AAA", size=10, className }: LoadingProps) {
    return (
      <div className="lds-ring" style={{width: size, height: size}}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
}