import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Welcome from "./pages/welcome"
import { AdminUsers, AdminMedSystems, AdminMedQuestions, AdminPsScales, AdminPsQuestions } from "./pages"
import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
// import store from "./store";

library.add(faStroopwafel)



function App() {
  return (
    // <Provider store={store}>
      <Router>
        <Fragment>
          <Route path="/" exact component={ Welcome } />
          <Route path="/admin_users" component={ AdminUsers } />
          <Route path="/med_systems" component={ AdminMedSystems } />
          <Route path="/med_questions" component={ AdminMedQuestions } />
          <Route path="/ps_scales" component={ AdminPsScales } />
          <Route path="/ps_questions" component={ AdminPsQuestions } />
        </Fragment>
      </Router>
    // </Provider>
  );
}

export default App;
