import { useState } from 'react'
import FetchItems from '../src/client/components/FetchItems.tsx';
import './App.css'
import React from 'react';
import TodoItemForm from './client/components/TodoItemForm.tsx';

function App() {


  return (
    <>
    <TodoItemForm />
    <FetchItems />    
    </>
  )
}

export default App
