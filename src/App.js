import React from 'react';
import List from './components/List.jsx'
import {Container, Row} from 'react-bootstrap'
import FileData from './data.json'

class App extends React.Component {

  //  Set initial component state
  constructor(){
    super();
    this.state = {
      loading: true,
      fetchData: {}
    }
  }

  componentDidMount(){
    //  Fetching data from API, in case of error, load data from imported .json file
    fetch('https://5d7607717804ec0014d78aff.mockapi.io/data')
      .then( response => response.json() )
      .then( data => this.setState({ fetchData: data, loading: false }))
      .catch( error => {
        console.log( error )  // Write catched error into console
        this.setState({ fetchData: FileData, loading: false })
      })
  }

  render(){

    const items  = !this.state.loading && this.state.fetchData.map( data => (<List key={data.id} data={data}/>) )

    return (
      <Container>
        <Row>
          { !this.state.loading ? items : "Loading..." }
        </Row>
      </Container>
    )
  }
}

export default App;
