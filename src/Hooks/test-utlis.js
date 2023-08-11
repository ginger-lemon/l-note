import React from 'react'
import {render} from '@testing-library/react'
import { NoteDataContextProvider } from './NoteContext'


const customRender = (ui, options) =>
  render(
    ui, 
    {wrapper: NoteDataContextProvider, ...options})

// re-export everything
export * from '@testing-library/react'

// override render method
export {customRender as render}