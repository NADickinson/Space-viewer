import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './global.css'
import { initializeIcons } from '@fluentui/react'

initializeIcons()

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(<App />)
console.log('hello homies')
