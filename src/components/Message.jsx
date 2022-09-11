import React from 'react'

export const Message = ({message, color}) => {
    const estilos = {
        backgroundColor: color,
        color: "#721c24",
        padding: "1rem 2rem",
        borderColor: "#f5c6cb",
        borderRadius: ".25rem",
        fontWeight: '500',
        textAlign: 'center',
        placeSelf: 'center'
    };

  return (
    <div style={estilos}>
        <p>{message}</p>
    </div>
  )
}
