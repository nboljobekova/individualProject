import React from 'react';
import { Route, Switch } from "react-router-dom";
import Welcome from "./pages/welcome"
import { AdminUsers, AdminMedSystems, AdminMedQuestions, MedSurvey } from "./pages"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'

library.add(faStroopwafel)



function App() {  
  return (
    <Switch>
        <Route path="/" exact component={ Welcome } />
        <Route path="/med_survey" exact component={ MedSurvey } />
        <Route path="/admin_users" component={ AdminUsers } />
        <Route path="/med_systems" component={ AdminMedSystems } />
        <Route path="/med_questions" component={ AdminMedQuestions } />
    </Switch>
  );
}

export default App;
