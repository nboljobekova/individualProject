import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Welcome from "./pages/welcome"
import AdminUsers from "./pages/adminUsers"
import AdminSystems from "./pages/adminSystems"
import AdminQuestions from "./pages/adminQuestions"
import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'

library.add(faStroopwafel)



function App() {
  return (
    <Router>
      <Fragment>
        <Route path="/" exact component={ Welcome } />
        <Route path="/admin_users" exact component={ AdminUsers } />
        <Route path="/admin_systems" exact component={ AdminSystems } />
        <Route path="/admin_questions" exact component={ AdminQuestions } />
      </Fragment>
    </Router>
  );
}

export default App;
