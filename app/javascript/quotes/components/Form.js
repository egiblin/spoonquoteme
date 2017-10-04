import React from 'react';

const Form = (props) => {
  if (props.clicked) {
    return(
      <div>
        <input type='submit' value="Actually, Nevermind" onClick={event => {event.preventDefault(), props.handleAddClicked()}} />
        <form>
          <div>
            <input type="text" name="text" placeholder="Enter text here..." onChange={props.handleTextChange}/>
          </div>
          <div className="input-field col s3">
            <input type="text" name="author" placeholder="Enter author here..." onChange={props.handleAuthorChange}/>
          </div>
          <div>
          <input type="submit" value="Submit Quote" name="Submit" onClick={props.handleSubmit}/>
          </div>
        </form>
      </div>
    )
  } else {
    return(
    <div>
      <input type='submit' value="Add New Quote" onClick={event => {event.preventDefault(), props.handleAddClicked()}} />
    </div>
  )}
}

export default Form;
