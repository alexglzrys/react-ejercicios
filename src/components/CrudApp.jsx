import React, { useState } from 'react'
import { CrudForm } from './CrudForm'
import { CrudTable } from './CrudTable'

// Estado inicial de la aplicación global
const initialDB = [
  {
    id: 1,
    name: 'Seiya de Pegasus',
    constellation: 'Marte'
  },
  {
    id: 2,
    name: 'Shun de Andromeda',
    constellation: 'Andromeda'
  },
  {
    id: 3,
    name: 'Ikki de Phoenix',
    constellation: 'Tierra'
  },
  {
    id: 4,
    name: 'Shiryū de Dragon',
    constellation: 'Júpiter'
  },
  {
    id: 5,
    name: 'Hyōga de Cygnus',
    constellation: 'Luna'
  }
]

export const CrudApp = () => {
  const [db, setDb] = useState(initialDB);

  return (
    <>
        <h3>CRUD con React</h3>
        <CrudForm />
        <CrudTable data={db} />
    </>
  )
}
