// App should pass a callback prop, onChangeType, to <Filters />. This callback needs to update <App />'s state.filters.type

// <Filters /> needs a callback prop, onFindPetsClick. When the <Filters /> component calls onFindPetsClick, <App /> should fetch a list of pets using fetch().

// Assuming your app is up and running, you can make a fetch to this exact URL: /api/pets with an optional query parameter to get your data.
// Use App's state.filters to control/update this parameter
// If the type is 'all', send a request to /api/pets
// If the type is 'cat', send a request to /api/pets?type=cat. Do the same thing for dog and micropig.
// The pet data received will include information on individual pets and their adoption status.
// Set <App/>'s state.pets with the results of your fetch request so you can pass the pet data down as props to <PetBrowser />
// Even though we're using fetch here, its responses have been mocked in order to make the tests work properly. That means it's important to use the exact URLs as described above, or your tests will fail!
// Finally, App should pass a callback prop, onAdoptPet, to <PetBrowser />. This callback should take in an id for a pet, find the matching pet in state.pets and set the isAdopted property to true.

import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (breed) => {
    this.setState({
      filters: {type: breed}
    })
  }

  fetchPets = () => {
    let endpoint = "/api/pets"
    // Filtered endpoints: "/api/pets?type=cat"
    // TO DO: ADD FILTER FUNCTIONALITY
    if (this.state.filters.type !== 'all'){
      endpoint += `?type=${this.state.filters.type}`
    }

    fetch(endpoint)
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        pets: data
      })
    })
  }

  onAdoptPet = (petId) => {
    // TO DO
    // This callback should take in an id for a pet, find the matching pet in state.pets and set the isAdopted property to true.
    const updatedPets = this.state.pets.map(pet => {
      return pet.id === petId ? {...pet, isAdopted: true} : pet
    })

    this.setState({
      pets: updatedPets
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
              onChangeType={this.onChangeType}
              onFindPetsClick={this.fetchPets} />
            </div>
            <div className="twelve wide column">
              <PetBrowser
              pets={this.state.pets}
              onAdoptPet={this.onAdoptPet}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
