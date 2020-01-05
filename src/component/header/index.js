import React, { Component } from 'react';
import logo from './albird.svg'
import { connect } from 'react-redux';


const audio_style={
  display:'none',
};

class Header extends Component {
  render() {
    return (
     <header className={this.props.className}>
       <img width={24}  height={24} src={logo}/>
       <span>{this.props.activityName}</span>
       <div style={audio_style}>
        <audio controls="controls" autoPlay="autoplay" loop="loop">
          <source src="/magpie-draw/bg-audio/bg-audio.mp3" type="audio/mpeg" />
        </audio>
       </div>
     </header>
    );
  }
}
const mapStateToProps = state => ({
  activityName: state.dataReducer.activitySetting.name,
});

export default connect(mapStateToProps)(Header);
