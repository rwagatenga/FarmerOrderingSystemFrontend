import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

const ErrorPage = () => {
  const error = useRouteError()

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="m-10 gap-4">
        <h1 className="text-4xl">Oops</h1>
        <p className="text-gray-500">
          {isRouteErrorResponse(error)
            ? 'This page does not exist.'
            : 'An unexpected error occurred.'}
        </p>
      </div>
    </div>
  )
}

export default ErrorPage
