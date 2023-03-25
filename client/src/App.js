// import logo from './logo.svg';
import './App.css';
import { Switch, Route, Link } from "react-router-dom"
import Hi from './Components.js/Hi';
import Bye from './Components.js/Bye';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello Holly</h1>
        <Link to="/hi">click for hi</Link>
        <br></br>
        <Link to="/bye">click for bye</Link>
      
      <Switch>
        <Route path="/hi">
        <Hi/>
        </Route>

        <Route path="/bye">
        <Bye/>
        </Route>

      </Switch>
      </header>
    </div>
  );
}

export default App;
