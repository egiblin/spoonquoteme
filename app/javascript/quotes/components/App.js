import React from 'react'
import {
  BrowserRouter as Router,
  Route, IndexRoute
} from 'react-router-dom'
import QuotesDisplay from './QuotesDisplay'

const App = (props) => (
  <Router startingQuoteId={props.startingQuoteId}>
    <div>
      <Route
        path='/'
        startingQuoteId={props.startingQuoteId}
        lastQuoteId={props.lastQuoteId}
        render={(routeProps) => <QuotesDisplay {...props} {...routeProps} />}
      />
    </div>
  </Router>
)

export default App;
