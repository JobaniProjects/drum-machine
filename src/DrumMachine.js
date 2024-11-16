import React from 'react';
import './styles.scss';
import $ from "jquery";
import 'bootstrap/scss/bootstrap.scss';

const drumpads = [
    {
        drumpad: "Q",
        keycode: 81,
        soundName: "Heater 1",
        position: "0",
        src : "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3"
    },
    {
        drumpad: "W",
        keycode: 87,
        soundName: "Heater 2",
        position: "1",
        src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3"
    },
    {
        drumpad: "E",
        keycode: 69,
        soundName: "Heater 3",
        position: "2",
        src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3"
    },
    {
        drumpad: "A",
        keycode: 65,
        soundName: "Heater 4",
        position: "3",
        src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3"
    },
    {
        drumpad: "S",
        keycode: 83,
        soundName: "Clap",
        position: "4",
        src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3"
    },
    {
        drumpad: "D",
        keycode: 68,
        soundName: "Open-HH",
        position: "5",
        src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3"
    },
    {
        drumpad: "Z",
        keycode: 90,
        soundName: "Kick-n'-Hat",
        position: "6",
        src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3"
    },
    {
        drumpad: "X",
        keycode: 88,
        soundName: "Kick",
        position: "7",
        src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3"
    },
    {
        drumpad: "C",
        keycode: 67,
        soundName: "Closed-HH",
        position: "8",
        src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3"
    }
];

class DrumMachine extends React.Component{
    constructor(props){
        super(props);
        this.playAudio = this.playAudio.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handlePadPress = this.handlePadHighlight.bind(this);
        this.getDrumpad = this.getDrumpad.bind(this);
        this.state = {
            displayDrum:'',
            position:""
        };
    }

    handlePadHighlight(pad){
        //console.log("handlePadPress method, pad is :" + pad);
        $(`.${pad}`).addClass("pink");
        setTimeout(()=>{
            $(`.${pad}`).removeClass("pink");
        },200);
    }

    playAudio(btn, soundName){
        let audio = document.getElementById(btn);
        console.log(audio);
        audio.play();
        
        //CODE BEFORE IMPLEMENTING
        this.setState({
            displayDrum: soundName
        }) 
        // console.log("playAudio method, padPressed value: " + padPressed);
        
    }
    
    handleKeyPress(event){
        console.log(event.key);
        for(let drum of drumpads){
            if(drum.drumpad === event.key.toUpperCase()){
                this.playAudio(drum.drumpad, drum.soundName);
            }
        }
    }

    //Gets what key was pressed from drumpad and sets state 
    getDrumpad(event){
        //console.log("getDrumpad method, event is :" + event.key);
        for(let drum of drumpads){
            if(drum.drumpad === event.key.toUpperCase()){
                this.setState({
                    position: drum.position
                });
                this.handlePadHighlight(this.state.position);
            }
        }
        // this.handlePadPress(this.state.position);
    }

    componentDidMount(){
        document.addEventListener("keydown", this.handleKeyPress);
        
        $(".test").addClass("pink");
        document.addEventListener("keydown",this.getDrumpad);
    }

    componentWillUnmount(){
        document.removeEventListener('keydown',this.handleKeyPress);
        document.removeEventListener('keydown',this.getDrumpad);
    }

    render(){
        
        return (
            <div id="drum-machine">
                {/* <h1>TEST TEST TEST</h1> */}
                <div id="container-drums">
                    <div className="drums">
                        {drumpads.map((el)=>(
                            <div key={el.src} className={el.position + " drum-pad pad-bg-color-1"} id="drumpad" onClick={()=>{
                                this.playAudio(el.drumpad, el.soundName);
                                this.handlePadHighlight(el.position);
                                }}>
                                {el.drumpad}
                                <audio src={el.src} id={el.drumpad} className='clip'></audio>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="dm-title">
                    Drum Machine <i class="bi bi-music-note-beamed"></i>
                </div> 

                <div id="display">
                    <div id="display-text">
                        {this.state.displayDrum}
                    </div>
                    
                </div>
            </div>
        );
        
    }
}

export default DrumMachine;