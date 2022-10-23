import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Archive from './screens/Archive';
import Single from './screens/Single';

export default function App() {

  return (
    <>
    <center>
      <h1>Heading</h1>
      <Router>
        <Switch>
          <Route exact path="/" component={Archive} />
          <Route path="/item/:id" component={Single} />
          {/* <Route path="*">
            <Redirect to="/" />
          </Route> */}
        </Switch>
      </Router>
    </center>
    </>
  );
};
