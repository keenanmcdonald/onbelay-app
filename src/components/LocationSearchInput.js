import React from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'
import OBContext from '../OBContext'
 
class LocationSearchInput extends React.Component {
  static contextType = OBContext

  constructor(props) {
    super(props)
    this.state = { 
        address: '',
        inputValue: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  componentDidMount(){
    this.setState({address: this.context.user.address ? this.context.user.address : ''})
  }
 
  handleChange(address){
    this.setState({ address })
  }
 
  handleSelect(address){
    this.setState({address})
    geocodeByAddress(address)
      .then(results => {
        return getLatLng(results[0])
      })
      .then(latLng => {
          this.props.updateLocation(address, latLng)
        })
      .catch(error => console.error('Error', error))
  };
 
  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className='location-input-container'>
            <input value = {this.state.inputValue}
              {...getInputProps({
                className: 'location-search-input input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item'
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' }
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput