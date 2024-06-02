import { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


import { ThemeProvider } from "@/components/them-provider"
import Login from '@/pages/Login'
import Navigations from './components/Navs'
import router from './routes'
const queryClient = new QueryClient()

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
    </>
  )
}

export default App
