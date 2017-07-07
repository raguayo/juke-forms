import React from 'react';
import Songs from './Songs';
import AddSongForm from './AddSongForm'
import axios from 'axios';

export default class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: {},
    }

    this.addSongToPlaylist = this.addSongToPlaylist.bind(this)
  }

  componentDidMount() {
    axios.get(`/api${this.props.match.url}`)
      .then(res => res.data)
      .then(playlist => {
        this.setState({ playlist });
      });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.playlist.id !== nextProps.match.params.playlistId) {
      axios.get(`/api${nextProps.match.url}`)
        .then(res => res.data)
        .then(playlist => {
          this.setState({ playlist });
        });
    }
  }

    addSongToPlaylist(playlistId, id) {

    if (this.state.playlist.songs.find(song => song.id === +id)) {
      // this.setState({error: true})
      // and then pass in error
    } else {
      console.log('Went into wrong logic')
      axios.post(`api/playlists/${playlistId}/songs`, {id: id})
      .then(res => res.data)
      .then(song =>
        this.setState((prevState) => {
          let newState = Object.assign(prevState);
          newState.playlist.songs.push(song)
          return newState;
        })
      )
    }
  }

  render() {
    const playlist = this.state.playlist;
    return (
      <div>
        <h3>{playlist.name}</h3>
        <Songs songs={playlist.songs} /> {/** Hooray for reusability! */}
        {playlist.songs && !playlist.songs.length && <small>No songs.</small>}
        <hr />
        <AddSongForm availableSongs={this.props.availableSongs} match={this.props.match} addSongToPlaylist={this.addSongToPlaylist} />
      </div>
    );
  }
}
