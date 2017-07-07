import React from 'react';
import Songs from './Songs';
import axios from 'axios';

export default class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: {},
    }
  }

  componentDidMount() {
    axios.get(`/api${this.props.match.url}`)
    .then(res => res.data)
    .then(playlist => {
      this.setState({playlist});
    });
  }

   componentWillReceiveProps(nextProps) {
     if(this.state.playlist.id !== nextProps.match.params.playlistId) {
      axios.get(`/api${nextProps.match.url}`)
      .then(res => res.data)
      .then(playlist => {
        this.setState({playlist});
      });
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
      </div>
    );
  }
}
