import React from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import QuoteNavigation from './QuoteNavigation';
import Form from './Form'
import Quote from './Quote'

class QuotesDisplay extends React.Component {
  constructor() {
    super()
    this.state = {
      quote: {},
      fireRedirect: false,
      text: "",
      author: "",
      addClicked: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleAddClicked = this.handleAddClicked.bind(this);
  }

  handleAddClicked(event) {
    if (this.state.addClicked === false){
      this.setState({addClicked: true});
    } else {
      this.setState({addClicked: false});
    }
  }

  handleAuthorChange(event) {
    let newAuthor = event.target.value;
    this.setState({ author: newAuthor });
  }

  handleTextChange(event) {
    let newText = event.target.value;
    this.setState({ text: newText });
  }
  fetchQuote(id) {
    axios.get(`api/quotes/${id}`)
    .then(response => {
      this.setState({ quote: response.data })
    })
    .catch(error => {
      console.error(error)
      this.setState({ fireRedirect: true })
    })
  }

  handleSubmit(event) {
    axios.post('api/quotes', {
      author: this.state.author,
      text: this.state.text
    })
    .then((response) => this.setState({
      addClicked: false,
      author: "",
      text: ""
    }))
  }


  setQuoteIdFromQueryString(qs) {
    this.qsParams = queryString.parse(qs)
    if (this.qsParams.quote) {
      // assign quote ID from the URL's query string
      this.quoteId = Number(this.qsParams.quote)
    } else {
      this.quoteId = this.props.startingQuoteId
      // update URL in browser to reflect current quote in query string
      this.props.history.push(`/?quote=${this.quoteId}`)
    }
  }

  componentDidMount() {
    this.setQuoteIdFromQueryString(this.props.location.search)
    this.fetchQuote(this.quoteId)
  }

  componentWillReceiveProps(nextProps) {
    this.setQuoteIdFromQueryString(nextProps.location.search)
    this.fetchQuote(this.quoteId)
  }

  render() {
    const quote = this.state.quote
    const nextQuoteId = quote.next_id
    const previousQuoteId = quote.previous_id
    const clicked = this.state.addClicked;
    let form = (
      <Form
        handleSubmit={this.handleSubmit}
        handleAuthorChange={this.handleAuthorChange}
        handleTextChange={this.handleTextChange}
        handleAddClicked={this.handleAddClicked}
        clicked={clicked}
      />
    )
    let footer = (
      <div id='footer'>
        <Link className='btn btn-primary' to={`/?quote=${this.props.startingQuoteId}`}>
          Back to Beginning
        </Link>
      </div>
    )
    if (quote.author === undefined) {
      return(
        <div>Loading...</div>
      )
    }
    else if (quote.id !== nextQuoteId && quote.id !== previousQuoteId){
      return (
        <div>
          <div className='quote-container'>
            {this.state.fireRedirect &&
              <Redirect to={'/'} />}
            <QuoteNavigation direction='previous' otherQuoteId={previousQuoteId} />
            <Quote quote={quote} />
            <QuoteNavigation direction='next' otherQuoteId={nextQuoteId} />
            {form}
          </div>
          {footer}
        </div >
      )
    } else if (previousQuoteId === quote.id){
      return (
        <div>
          <div className='quote-container'>
            {this.state.fireRedirect &&
              <Redirect to={'/'} />
            }
            <Quote quote={quote} />
            <QuoteNavigation direction='next' otherQuoteId={nextQuoteId} />
            {form}
          </div>
        </div >
      )
    } else {
      return (
        <div>
          <div className='quote-container'>
            {this.state.fireRedirect &&
              <Redirect to={'/'} />
            }
            <QuoteNavigation direction='previous' otherQuoteId={previousQuoteId} />
            <Quote quote={quote} />
            {form}
          </div>
          {footer}
        </div >
      )
    }
  }
}

export default QuotesDisplay
