import React from 'react'
import axios from 'axios'

export default class AddSongForm extends React.Component{
  constructor() {
    super()

    this.state = {
      songToAdd: "",
      error: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const newSongId = e.target.value
    this.setState({songToAdd: newSongId, error: false})
  }

  handleSubmit(e) {
    e.preventDefault()

    const playlistId = this.props.match.params.playlistId
    const error = this.props.addSongToPlaylist(playlistId, this.state.songToAdd)

    if (error) {
      this.setState({error: true})
    } else {
      this.setState({songToAdd: ""})
    }

  }

  render() {
    const availableSongs = this.props.availableSongs
    return (
       <div className="well">
          <form className="form-horizontal" noValidate name="songSelect" onSubmit={this.handleSubmit}>
            <fieldset>
              <legend>Add to Playlist</legend>
              {this.state.error ? <div className="alert alert-warning">That song was already added</div> : null}
              <div className="form-group">
                <label htmlFor="song" className="col-xs-2 control-label">Song</label>
                <div className="col-xs-10">
                  <select className="form-control" name="song" value={this.state.songToAdd} onChange={this.handleChange}>
                    {
                      availableSongs.map(song => (
                        <option key={song.id} value={song.id}>{song.name}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-10 col-xs-offset-2">
                  <button type="submit" className="btn btn-success">Add Song</button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
    )
  }
}




