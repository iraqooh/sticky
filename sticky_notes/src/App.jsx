import Page from "./pages/Page"
import Provider from "./context/Context"

function App() {
  return (
    <div>
      <Provider>
        <Page />
      </Provider>
    </div>
  )
}

export default App
