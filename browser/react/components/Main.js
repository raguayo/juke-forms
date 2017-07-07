import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import StatefulAlbums from './StatefulAlbums';
import SingleAlbum from './SingleAlbum';
import AllArtists from './AllArtists';
import SingleArtist from './SingleArtist';
import Sidebar from './Sidebar';
import Player from './Player';
import NewPlaylist from './NewPlaylist';
import Playlist from './Playlist';
import axios from 'axios'

export default class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      playlists: [],
      availableSongs: []
    }

    this.updatePlaylist = this.updatePlaylist.bind(this);
  }

  componentDidMount() {
    const playlistPromise = axios.get('api/playlists').then(res => res.data)
    const songsPromise = axios.get('api/songs').then(res => res.data)

    Promise.all([playlistPromise, songsPromise])
    .then(([playlists, availableSongs]) => this.setState({playlists, availableSongs}))
    .catch(console.error)
  }

  updatePlaylist(value) {
    axios.post('/api/playlists', { name: value })
      .then(res => res.data)
      .then(newPlaylist => {
        this.setState(prevState => ( { playlists: [...prevState.playlists, newPlaylist] } ));
      })
      .catch(err => console.error(err));
  }



  render () {
    return (
      <Router>
        <div id="main" className="container-fluid">
          <div className="col-xs-2">
            <Sidebar playlists={this.state.playlists}/>
          </div>
          <div className="col-xs-10">
            <Switch>
              <Route exact path="/albums" component={StatefulAlbums} />
              <Route path="/albums/:albumId" component={SingleAlbum} />
              <Route exact path="/artists" component={AllArtists} />
              <Route path="/artists/:artistId" component={SingleArtist} />
              <Route path="/newPlaylist" render={
                () => { return <NewPlaylist updatePlaylist={this.updatePlaylist} /> }
                } />
              <Route path="/playlists/:playlistId" render={
                (props) =>  { return <Playlist match={props.match} availableSongs={this.state.availableSongs} /> }
              } />
              <Route component={StatefulAlbums} />
            </Switch>
          </div>
          <Player />
        </div>
    </Router>
    );
  }
}
