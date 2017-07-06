import React from 'react';
import axios from 'axios';

export default class NewPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: {value: '', dirty: false},
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/api/playlists', { name: this.state.inputValue.value })
      .then(res => res.data)
      .then(result => {
        this.props.updatePlaylist(result)
      })
      .catch(err => console.error(err));
    this.setState({inputValue: {value: "", dirty: false}});
  }

  handleChange(e) {
    this.setState({inputValue: {value: e.target.value, dirty: true}});
  }

  isDisabled() {
    return !(this.state.inputValue.value.length > 0 && this.state.inputValue.value.length <= 16);
  }

  isValid() {
    return !this.state.inputValue.dirty || !this.isDisabled();
  }


  render() {
    return (
      <div className="well">
        <form className="form-horizontal" onSubmit={(e) => this.handleSubmit(e)} >
          <fieldset>
            <legend>New Playlist</legend>
            {this.isValid() ? null : <div className="alert alert-warning">Please enter a name</div>}
            <div className="form-group">
              <label className="col-xs-2 control-label">Name</label>
              <div className="col-xs-10">
                <input className="form-control" type="text" value={this.state.inputValue.value} onChange={(e) => this.handleChange(e)}/>
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button disabled={this.isDisabled()} type="submit" className="btn btn-success">Create Playlist</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }

}
