import useRouteElements from './useRouteElements'

function App() {
  const routeElements = useRouteElements()

  return <div className='text-[#101010]'>{routeElements}</div>
}

export default App
