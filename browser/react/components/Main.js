import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import StatefulAlbums from './StatefulAlbums';
import SingleAlbum from './SingleAlbum';
import AllArtists from './AllArtists';
import SingleArtist from './SingleArtist';
import Sidebar from './Sidebar';
import Player from './Player';
import NewPlaylist from './NewPlaylist';
import axios from 'axios'

export default class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      playlists: []
    }

    this.updatePlaylist = this.updatePlaylist.bind(this);
  }

  componentDidMount() {
    axios.get('api/playlists')
    .then(res => res.data)
    .then(playlists => this.setState({playlists: playlists}))
    .catch(console.error)
  }

  updatePlaylist(newPlaylist){
    console.log(newPlaylist)
    this.setState(prevState => ( { playlists: [...prevState.playlists, newPlaylist] } ));
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
              <Route component={StatefulAlbums} />
            </Switch>
          </div>
          <Player />
        </div>
    </Router>
    );
  }
}
