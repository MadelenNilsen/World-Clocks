import { CityProvider } from "./components/CityProvider";
import CityList from './components/CityList'

function App() {

  return (
    <>
    <CityProvider>
     <CityList />
     </CityProvider>
    </>
  );
}

export default App
