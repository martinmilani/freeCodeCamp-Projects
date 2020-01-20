function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const Header = () => React.createElement("div", { class: "text-center display-3 text-white" }, "Pomodoro Clock");

const SetTimer = ({ type, value, handleClick }) =>
React.createElement("div", null,
React.createElement("div", { class: "h4 text-center text-light", id: `${type}-label` }, type === 'session' ? 'Session ' : 'Break ', "Length"),
React.createElement("div", null,
React.createElement("div", { id: `${type}-length`, class: "text-center h4 text-light" }, value),
React.createElement("div", { class: "btn btn-group d-flex justify-content-center" },
React.createElement("button", {
  type: "button",
  class: "btn btn-info",
  id: `${type}-decrement`,
  onClick: () => handleClick(false, `${type}Value`) },
React.createElement("i", { class: "fas fa-minus" })),

React.createElement("button", {
  type: "button",
  class: "btn btn-info",
  id: `${type}-increment`,
  onClick: () => handleClick(true, `${type}Value`) },
React.createElement("i", { class: "fas fa-plus" })))));






const Timer = ({ mode, time }) =>
React.createElement("div", { class: "text-center mt-4" },
React.createElement("h1", { id: "timer-label" }, mode === "session" ? "Session" : "Break"),
React.createElement("div", { id: "time-left", class: "font-weight-bold display-3" }, time === 3600000 ? '60:00' : moment(time).format('mm:ss')));



const Controls = ({ active, handleReset, handlePlayPause }) =>
React.createElement("div", { class: "btn btn-group d-flex justify-content-center mt-3" },
React.createElement("button", {
  id: "start_stop",
  type: "button",
  class: "btn btn-info",
  onClick: handlePlayPause },
active ? React.createElement("i", { class: "fas fa-pause" }) : React.createElement("i", { class: "fas fa-play" })),

React.createElement("button", {
  id: "reset",
  type: "button",
  class: "btn btn-info",
  onClick: handleReset },

React.createElement("i", { class: "fas fa-redo-alt" })));




function Footer() {
  return (
    React.createElement("div", { class: "footer text-center mt-2 text-muted" }, " by ", React.createElement("a", { href: "https://codepen.io/martinmilani", class: "text-secondary" }, "M.M"), " "));

}

class App extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "handleSetTimers",





















    (inc, type) => {
      if (this.state[type] === 60 && inc) return;
      if (this.state[type] === 1 && !inc) return;
      this.setState({ [type]: this.state[type] + (inc ? 1 : -1) });
      if (type === 'sessionValue') {
        this.setState({ time: (this.state[type] + (inc ? 1 : -1)) * 60 * 1000 });
      }
    });_defineProperty(this, "handleReset",



    () => {
      this.setState({
        breakValue: 5,
        sessionValue: 25,
        time: 25 * 60 * 1000,
        mode: 'session',
        touched: false,
        active: false });

      clearInterval(this.pomodoro);
      this.audio.pause();
      this.audio.currentTime = 0;
    });_defineProperty(this, "handlePlayPause",

    () => {
      if (this.state.active) {
        this.setState({ active: false }, () => clearInterval(this.pomodoro));
      } else {
        if (!this.state.touched && this.state.breakValue === 5 && this.state.sessionValue === 25) {
          this.pomodoro = setInterval(() => this.setState({ time: this.state.time - 1000 }), 1000);
          this.setState({ active: true });
        } else {
          this.setState({
            time: this.state.sessionValue * 60 * 1000,
            touched: true,
            active: true },
          () => this.pomodoro = setInterval(() => this.setState({ time: this.state.time - 1000 }), 1000));
        }
      }
    });_defineProperty(this, "formatTime",

    milSec => {
      return milSec === 3600000 ? "60:00" : new Date(milSec).toISOString().substr(14, 5);
    });this.state = { breakValue: 5, sessionValue: 25, mode: "session", time: 25 * 60 * 1000, active: false, touched: false };}componentDidUpdate(prevProps, prevState) {if (prevState.time === 0 && prevState.mode === 'session') {this.setState({ time: this.state.breakValue * 60 * 1000, mode: 'break' });this.audio.play();}if (prevState.time === 0 && prevState.mode === 'break') {this.setState({ time: this.state.sessionValue * 60 * 1000, mode: 'session' });this.audio.play();}}

  render() {
    return (
      React.createElement("div", null,
      React.createElement("div", { class: "container" },
      React.createElement(Header, { class: "row justify-content-center" }),
      React.createElement("div", { class: "row  justify-content-center mt-4 " },
      React.createElement("div", { class: "col-4 mt-4 mb-4" },
      React.createElement(SetTimer, {
        type: "break",
        label: "Break Length",
        value: this.state.breakValue,
        handleClick: this.handleSetTimers })),


      React.createElement("div", { class: "col-4 mt-4 mb-4" },
      React.createElement(SetTimer, {
        type: "session",
        label: "Session Length",
        value: this.state.sessionValue,
        handleClick: this.handleSetTimers }))),



      React.createElement(Timer, {
        mode: this.state.mode,
        time: this.state.time,
        class: "row justify-content-center" }),

      React.createElement(Controls, {
        class: "row justify-content-center",
        active: this.state.active,
        handlePlayPause: this.handlePlayPause,
        handleReset: this.handleReset }),

      React.createElement("audio", {
        id: "beep",
        src: "https://s3-us-west-1.amazonaws.com/benjaminadk/Data+synth+beep+high+and+sweet.mp3",
        ref: el => this.audio = el }),


      React.createElement(Footer, null))));



  }}


ReactDOM.render(React.createElement(App, null), document.getElementById("root"));