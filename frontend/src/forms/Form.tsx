import React from 'react';
interface Props {
    children: React.ReactNode
}
export default function Form(props:Props){


  
    return (
      <div>
          {props.children}
      </div>

    )
  
}
