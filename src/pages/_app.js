import "./styles.css"
import ContextProvider from "../components/ContextProvider"

const App = ({ Component, pageProps }) => {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  )
}

export default App
