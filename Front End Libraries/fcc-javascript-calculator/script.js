class Equation extends React.Component {
  render() {
    return (
      React.createElement("div", { class: "row" },
      React.createElement("div", {
        class: "col bg-dark text-warning p-2 ml-1 mr-1",
        id: "display-formula" },

      React.createElement("div", { class: "h6" }, this.props.equation))));



  }}


class Display extends React.Component {
  render() {
    return (
      React.createElement("div", { class: "row" },
      React.createElement("div", {
        class: "col bg-dark text-warning pr-2 pb-2 mb-1 ml-1 mr-1",
        id: "display" },

      React.createElement("div", { class: "h3" }, this.props.display))));



  }}


class Buttons extends React.Component {
  render() {
    return (
      React.createElement("div", null,
      React.createElement("div", { class: "row" },
      React.createElement("button", {
        id: "clear",
        class: "btn btn-danger col-6 m-1",
        value: "clear",
        onClick: this.props.initialize }, "C"),



      React.createElement("button", {
        id: "divide",
        class: "btn btn-primary col m-1",
        value: "/",
        onClick: this.props.operators }, "/"),



      React.createElement("button", {
        id: "multiply",
        class: "btn btn-primary col m-1",
        value: "*",
        onClick: this.props.operators }, "*")),




      React.createElement("div", { class: "row" },
      React.createElement("button", {
        id: "seven",
        class: "btn btn-secondary col  m-1",
        value: "7",
        onClick: this.props.numbers }, "7"),



      React.createElement("button", {
        id: "eight",
        class: "btn btn-secondary col m-1",
        value: "8",
        onClick: this.props.numbers }, "8"),



      React.createElement("button", {
        id: "nine",
        class: "btn btn-secondary col m-1",
        value: "9",
        onClick: this.props.numbers }, "9"),



      React.createElement("button", {
        id: "add",
        class: "btn btn-primary col m-1",
        value: "+",
        onClick: this.props.operators }, "+",

      " ")),


      React.createElement("div", { class: "row" },
      React.createElement("button", {
        id: "four",
        class: "btn btn-secondary col m-1",
        value: "4",
        onClick: this.props.numbers }, "4"),



      React.createElement("button", {
        id: "five",
        class: "btn btn-secondary col m-1",
        value: "5",
        onClick: this.props.numbers }, "5"),



      React.createElement("button", {
        id: "six",
        class: "btn btn-secondary col m-1",
        value: "6",
        onClick: this.props.numbers }, "6"),



      React.createElement("button", {
        id: "subtract",
        class: "btn btn-primary col m-1",
        value: "-",
        onClick: this.props.operators }, "-")),




      React.createElement("div", { class: "row" },
      React.createElement("button", {
        id: "one",
        class: "btn btn-secondary col m-1",
        value: "1",
        onClick: this.props.numbers }, "1"),



      React.createElement("button", {
        id: "two",
        class: "btn btn-secondary col m-1",
        value: "2",
        onClick: this.props.numbers }, "2"),



      React.createElement("button", {
        id: "three",
        class: "btn btn-secondary col m-1",
        value: "3",
        onClick: this.props.numbers }, "3"),



      React.createElement("button", {
        id: "decimal",
        class: "btn btn-primary col m-1",
        value: ".",
        onClick: this.props.decimal }, ".")),




      React.createElement("div", { class: "row" },
      React.createElement("button", {
        id: "zero",
        class: "btn btn-secondary col m-1",
        value: "0",
        onClick: this.props.numbers }, "0"),



      React.createElement("button", {
        id: "equals",
        class: "btn btn-primary col m-1",
        value: "=",
        onClick: this.props.calculate }, "="))));






  }}


function Footer() {
  return (
    React.createElement("div", { class: "footer text-center mt-2 text-muted" }, " by ", React.createElement("a", { href: "https://codepen.io/martinmilani", class: "text-white" }, "M.M"), " "));

}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      equation: "",
      display: "0" };

    this.initialize = this.initialize.bind(this);
    this.handleNumbers = this.handleNumbers.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleCalculate = this.handleCalculate.bind(this);
  }

  handleCalculate(e) {
    if (this.state.equation.includes("=")) {
      let val = `${this.state.display} = ${this.state.display}`;
      this.setState({
        equation: val });

    } else if (this.state.equation !== "" && this.state.equation.match(/[+\-*\/]/) != null && this.state.equation.match(/[+\-*\/]$/) == null) {
      let result = math.evaluate(this.state.equation).toString();
      let val = this.state.equation + "=" + result;
      this.setState({
        display: result,
        equation: val });

    }
  }

  handleDecimal(e) {
    if (this.state.equation == "" || this.state.equation.includes("=")) {
      let val = "0.";
      this.setState({
        diaplay: val,
        equation: val });

    } else if (this.state.equation.match(/[+\*\/-]$/)) {
      let val = "0.";
      this.setState({
        display: val,
        equation: this.state.equation + val });

    } else if (!this.state.display.includes(".")) {
      this.setState({
        display: this.state.display + e.currentTarget.value,
        equation: this.state.equation + e.currentTarget.value });

    }
  }

  handleNumbers(e) {
    if (
    this.state.equation.match(/[0-9\.]$/) &&
    !this.state.equation.includes("="))
    {
      if (this.state.equation.match(/[+\-*\/]/) == null) {
        let val = this.state.equation + e.currentTarget.value;
        this.setState({
          display: val,
          equation: val });

      } else {
        this.setState({
          display: this.state.display + e.currentTarget.value,
          equation: this.state.equation + e.currentTarget.value });

      }
    } else {
      if (this.state.equation.match(/[+\-*\/]$/)) {
        let val = this.state.equation + e.currentTarget.value;
        this.setState({
          display: e.currentTarget.value,
          equation: val });

      } else {
        if (
        this.state.display === "0" && e.currentTarget.value !== "0" ||
        this.state.equation.includes("="))
        {
          this.setState({
            display: e.currentTarget.value,
            equation: e.currentTarget.value });

        }
      }
    }
  }

  handleOperators(e) {
    if (this.state.equation.includes("=")) {
      let val = this.state.display;
      val += e.currentTarget.value;
      this.setState({
        equation: val,
        display: e.currentTarget.value });

    } else if (this.state.equation != "" && this.state.equation.match(/[*\-\/+]$/) == null) {
      let val = this.state.equation;
      val += e.currentTarget.value;
      this.setState({
        equation: val,
        display: e.currentTarget.value });

    } else if (this.state.equation.match(/[*\-\/+]$/) != null) {
      let val = this.state.equation;
      if (e.currentTarget.value == "-" && this.state.equation.match(/[*\/+]$/) != null) {
        val += e.currentTarget.value;
        this.setState({
          equation: val,
          display: e.currentTarget.value });

      } else {
        val = val.substring(0, val.length - 1);
        console.log(val);
        if (val.match(/[*\/+]$/)) {
          val = val.substring(0, val.length - 1);
          console.log(val);
        }
        val += e.currentTarget.value;
        this.setState({
          equation: val,
          display: e.currentTarget.value });

      }
    }
  }

  initialize() {
    this.setState({
      equation: "",
      display: "0" });

  }

  render() {
    return (
      React.createElement("div", null,
      React.createElement("h1", { class: "text-center display-4 font-weight-bold m-4 p-2 text-light" }, "JavaScript Calculator"),


      React.createElement("div", { class: "container border border-dark rounded p-4" },
      React.createElement(Equation, { equation: this.state.equation }),
      React.createElement(Display, { display: this.state.display }),
      React.createElement(Buttons, {
        initialize: this.initialize,
        numbers: this.handleNumbers,
        operators: this.handleOperators,
        decimal: this.handleDecimal,
        calculate: this.handleCalculate })),


      React.createElement(Footer, null)));


  }}


ReactDOM.render(React.createElement(App, null), document.getElementById("root"));