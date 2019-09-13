import React from 'react'
import {Row, Col, Button, Card, ListGroup, Form} from 'react-bootstrap'

class List extends React.Component {

  //  Set initial component state
  constructor(props){
    super(props)
    this.state = {
      editing: false,
      avatar: this.props.data.avatar,
      name: this.props.data.name,
      surname: this.props.data.surname,
      street: this.props.data.street,
      city: this.props.data.city,
      country: this.props.data.country,
      email: this.props.data["e-mail"],
      words: this.props.data.words
    }

    // Binding component methods
    this.togglEdit = this.togglEdit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.newItem = this.newItem.bind(this)
  }

  //  Change state from all input text fields
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  //  Pushing new word into state.word array
  newItem(event){
    event.preventDefault()
    let newWords = [...this.state.words]    // Creates copy of actual state.words
    const splitStr = event.target.elements.word.value.split(' ')    // Split inputed string by ' '
    event.target.elements.word.value = ""   // Empty input element
    splitStr.map( singleWord => newWords.push( singleWord ))  // Push single words into new array of words
    this.setState({
      words: newWords
    })
  }

  //  Deleting word from state.word
  deleteItem(e) {
    let newWords = [...this.state.words]  // Creates copy of actual state.words
    newWords.splice(e.target.value, 1)  // Remove given index from array
    this.setState({
      words: newWords
    })
  }

  //  Toggl editing mode
  togglEdit(){
    this.setState({editing:!this.state.editing})
  }

  render (){

    const words = this.state.words.map( (word, index) => (<ListGroup.Item>{word}</ListGroup.Item>))

    return(
      <Col sm="12" md="6" lg="4">
        <Card style={{width: "100%", marginBottom: 30}}>

            {!this.state.editing ?
              <Card.Img variant="top" src={this.state.avatar} /> :
              <Row><Col><Form.Control type="url" name="avatar" onChange={this.handleChange} value={this.state.avatar} /></Col></Row>
            }
            <Card.Body>
              {!this.state.editing ?
                <Card.Title>{this.state.name} {this.state.surname}</Card.Title> :
                <Row><Col><Form.Control type="text" name="name" onChange={this.handleChange} value={this.state.name} /></Col><Col><Form.Control type="text" name="surname" onChange={this.handleChange} value={this.state.surname} /></Col></Row>
              }
              {!this.state.editing ?
                <Card.Subtitle className="mb-2 text-muted">
                  {this.state.street} {this.state.city}, {this.state.country}
                </Card.Subtitle> :
                <Row><Col><Form.Control type="text" name="street" onChange={this.handleChange} value={this.state.street} /></Col><Col><Form.Control type="text" name="city" onChange={this.handleChange} value={this.state.city} /></Col><Col><Form.Control type="text" name="country" onChange={this.handleChange} value={this.state.country} /></Col></Row>
              }
              {!this.state.editing ?
                <Card.Text>
                  <a href={"mailto:" + this.state.email}>{this.state.email}</a>
                </Card.Text> :
                <Row><Col><Form.Control type="email" name="email" onChange={this.handleChange} value={this.state.email} /></Col></Row>
              }
            </Card.Body>

              {!this.state.editing ?
                <ListGroup variant="flush"> {words} </ListGroup> :
                <div>
                  <ListGroup variant="flush">
                    {this.state.words.map( (word, index) => (<ListGroup.Item>{word} <Button variant="danger" value={index} onClick={this.deleteItem} className="float-right" size="sm">Delete</Button></ListGroup.Item>))}
                  </ListGroup>
                  <Form noValidate onSubmit={this.newItem}><Row><Col xs="10"><Form.Control type="text" name="word" placeholder="New word" /></Col><Col xs="2"><Button type="submit" className="float-right" variant="primary" size="sm">Add</Button></Col></Row></Form>
                </div>
              }

            {!this.state.editing ? <Button variant="primary" onClick={this.togglEdit}>Edit</Button> : <Button variant="success" onClick={this.togglEdit}>Save</Button> }
        </Card>
      </Col>
    )

  }
}

export default List
