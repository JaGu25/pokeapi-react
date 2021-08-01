import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route
} from 'react-router-dom'
import Home from '../pages/home'

const AppRouter = (): any => {
    return (
        <Router>
            <Switch>
                <Route exact path="/"><Home/></Route>
            </Switch>
        </Router>
    )
}

export default AppRouter