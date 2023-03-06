import Home from './pages/Home.jsx';
import Analytics from './pages/Analytics.jsx';
import Sidebar from './components/Sidebar'
import Map from './components/map_layer'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="comps">
      <Sidebar />
        <Switch> 
            <Route exact path="/" component={Home}/>
            <Route path="/analytics" component={Analytics}/>
            <Route path="/Explorer" component={Map}/>
        </Switch>      
    </div>
    </BrowserRouter>
  );
}

export default App;
