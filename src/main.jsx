import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './app/store'
import { Provider } from 'react-redux'
import { worker } from './api/server.js'
import { fetchTeachers } from './parts/teachers/teachersSlice.js'

async function main() {
  await worker.start({ onUnhandledRequest: 'bypass' });
  store.dispatch(fetchTeachers());

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>,
  )
}

main();