import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class AllArtists extends Component {

  constructor () {
    super();
    this.state = {
      artists: [],
      artistName: {value: '', dirty: false},
    };
    //this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount () {
    axios.get('/api/artists')
      .then(res => res.data)
      .then(artists => this.setState({ artists }));
  }

  handleChange(e) {
    const artist = e.target.value;
    this.setState({artistName: {value: artist}});
  }

  render () {
    const allArtists = this.state.artists;
    const artists = allArtists.filter(artist => artist.name.match(this.state.artistName.value));
    return (
      <div>
        <form className="form-group" style={{marginTop: '20px'}}>
          <input
            className="form-control"
            placeholder="Enter artist name"
            onChange={(e) => this.handleChange(e)}
          />
        </form>
        <h3>Artists</h3>
        <div className="list-group">
          {
            artists.map(artist => {
              return (
                <div className="list-group-item" key={artist.id}>
                  <Link to={`/artists/${artist.id}`}>{ artist.name }</Link>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}
