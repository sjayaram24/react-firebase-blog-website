import "../App.css";
import Tabs from "../components/Tab";
function App({isAuth}) {
  return (
    <div className="App">
      <Tabs isAuth/>
    </div>
  );
}
export default App;