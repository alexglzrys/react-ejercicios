import React from 'react'
import { CrudApp } from './components/CrudApp'
import { CrudJSONServer } from './components/CrudJSONServer'


export const EjerciciosReactApp = () => {
  return (
    <>
        <h1>EjerciciosReactApp</h1>
        <CrudJSONServer />
        <CrudApp />
    </>
  )
}
