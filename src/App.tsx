import { Toaster } from 'sonner'
import './App.css'
import { ImageProcessor } from './components/ImageProcessor/ImageProcessor'
function App() {

  return (
    <>
      <ImageProcessor />
	  <Toaster position="bottom-center"/>
    </>
  )
}

export default App
