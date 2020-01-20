function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const data = [
{ keyCode: 81, letter: 'Q', id: 'Heater-1', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
{ keyCode: 87, letter: 'W', id: 'Heater-2', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
{ keyCode: 69, letter: 'E', id: 'Heater-3', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
{ keyCode: 65, letter: 'A', id: 'Heater-4', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
{ keyCode: 83, letter: 'S', id: 'Clap', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
{ keyCode: 68, letter: 'D', id: 'Open-HH', src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
{ keyCode: 90, letter: 'Z', id: "Kick-n'-Hat", src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
{ keyCode: 88, letter: 'X', id: 'Kick', src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
{ keyCode: 67, letter: 'C', id: 'Closed-HH', src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' }];


const activeStyle = {
  backgroundColor: 'orange' };



const inactiveStyle = {
  backgroundColor: 'grey',
  boxShadow: "3px 3px 5px black" };


class DrumPad extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "handleKeyDown",




























    event => {
      if (event.keyCode === this.props.letter.charCodeAt()) {
        this.audio.play();
        this.audio.currentTime = 0;
        this.props.handleDisplay(this.props.id);
        this.activatePad();
        setTimeout(() => this.activatePad(), 100);
      }
    });_defineProperty(this, "handleClick",

    () => {
      this.audio.play();
      this.audio.currentTime = 0;
      this.props.handleDisplay(this.props.id);
      this.activatePad();
      setTimeout(() => this.activatePad(), 100);
    });this.state = { padStyle: inactiveStyle };}activatePad() {this.state.padStyle.backgroundColor === 'orange' ? this.setState({ padStyle: inactiveStyle }) : this.setState({ padStyle: activeStyle });}componentWillMount() {console.log(this.audio);document.addEventListener('keydown', this.handleKeyDown);}componentWillUnmount() {document.removeEventListener('keydown', this.handleKeyDown);}


  render() {
    return (
      React.createElement("div", {
        className: "drum-pad col-3 m-2",
        id: this.props.id,
        onClick: this.handleClick,
        style: this.state.padStyle },

      React.createElement("p", { class: "m-2" }, this.props.letter),
      React.createElement("audio", { id: this.props.letter,
        className: "clip",
        src: this.props.src,
        ref: ref => this.audio = ref })));



  }}


function Footer() {
  return (
    React.createElement("div", { class: "footer text-right mr-2" }, " by ", React.createElement("a", { href: "https://codepen.io/martinmilani", class: "text-light" }, "M.M"), " "));

}

class App extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "handleDisplay",





    display => this.setState({ display }));this.state = { display: 'Click or Press a Key' };}

  render() {
    return (
      React.createElement("div", { class: "container vertical-center" },
      React.createElement("div", { class: "jumbotron bg-secondary m-0 p-0" },
      React.createElement("div", { id: "drum-machine" },
      React.createElement("div", { class: "display-4 text-center text-primary bg-dark p-4 m-3" }, "Drum Machine"),
      React.createElement("h1", { id: "display", class: "text-center bg-warning mr-3 ml-3" }, this.state.display),
      React.createElement("div", { class: "drum-pads row text-center mr-0 ml-0 p-3 justify-content-center" }, data.map((elem) =>
      React.createElement(DrumPad, {
        key: elem.id,
        id: elem.id,
        letter: elem.letter,
        keyCode: elem.keyCode,
        src: elem.src,
        handleDisplay: this.handleDisplay }))),



      React.createElement(Footer, null)))));




  }}


ReactDOM.render(React.createElement(App, null), document.getElementById("root"));