import React, { Component } from 'react';
import { connect } from 'react-redux';
import { play, pause, setSrc, setVolume, setUserVolume } from '../../../_actions/MusicPlayerActions';
import { Icon } from 'antd';
import PropTypes from 'prop-types';

import 'antd/dist/antd.css';

class Play extends Component{
    constructor(props){
        super(props);
        this.play=this.play.bind(this);
        this.pause=this.pause.bind(this);
        this.unpause=this.unpause.bind(this);
    }
    
    async play(){
        let { play, setSrc, audio } = this.props;
        if(!this.props.songList[this.props.songNumber]){
            return;
        }
        let currSrc = "/" + this.props.songList[this.props.songNumber].file_url.split(" ").join("%20");
        if(this.props.src !== currSrc){
            setSrc(currSrc);
        }
        if(audio.paused){
            play(); // sets the state in redux
            this.unpause();
        }else{
            //one sets the pause for store state, the other sets the audio
            this.pause();
        }
    }

    async pause(){
        let { audio, setVolume, pause } = this.props;
        let interval = setInterval(()=>{
            if(audio.volume > 0.05){
                setVolume(audio.volume - 0.05);
            }else{
                clearInterval(interval);
                pause();
            }
        }, 11);
    }

    async unpause(){
        let { audio, setVolume } = this.props;
        let interval = setInterval(()=>{
            if(audio.volume < this.props.userVolume){
                setVolume(audio.volume + 0.05);
            }else{
                clearInterval(interval);
            }
        }, 11);
    }

    render(){
        return(
            <button className="play" onClick={this.play}>{this.props.playing && !this.props.paused ? <Icon type="pause" /> :<Icon type="caret-right" />}</button>             
        );
    }
}

Play.propTypes={
    audio: PropTypes.object,
    songList: PropTypes.array,
    src: PropTypes.string,
    songNumber: PropTypes.number,
    playing: PropTypes.bool,
    paused: PropTypes.bool,
    userVolume: PropTypes.number
}

const mapStateToProps = state => ({
    audio: state.music.audio,
    songList: state.music.songList,
    songNumber: state.music.songNumber,
    paused: state.music.paused,
    playing: state.music.playing,
    src: state.music.src,
    userVolume: state.music.userVolume
});

const mapDispatchToProps = dispatch => ({
    pause: () => {
        dispatch(pause());
    },
    play: () => {
        dispatch(play());
    },
    setSrc: (src) => {
        dispatch(setSrc(src));
    },
    setVolume: (volume) => {
        dispatch(setVolume(volume));
    },
    setUserVolume: (volume) => {
        dispatch(setUserVolume(volume));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Play);