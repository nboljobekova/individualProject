import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Welcome from "./pages/welcome"
// import { AdminUsers, AdminMedSystems, AdminMedQuestions, AdminPsScales, AdminPsQuestions } from "./pages"
import AdminUsers from "./pages/adminUsers"
import AdminMedSystems from "./pages/adminMedSystems_"
import AdminMedQuestions from "./pages/adminMedQuestions"
import AdminPsScales from "./pages/adminPsScales"
import AdminPsQuestions from "./pages/adminPsQuestions"
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
        <Route path="/admin_med_systems" exact component={ AdminMedSystems } />
        <Route path="/admin_med_questions" exact component={ AdminMedQuestions } />
        <Route path="/admin_ps_scales" exact component={ AdminPsScales } />
        <Route path="/admin_ps_questions" exact component={ AdminPsQuestions } />
      </Fragment>
    </Router>
  );
}

export default App;
