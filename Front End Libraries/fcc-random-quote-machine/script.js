class Quote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      author: "",
      quotes: [] };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    let randIndex = Math.floor(Math.random() * this.state.quotes.length);
    let randText = this.state.quotes[randIndex].text;
    let randAuth = this.state.quotes[randIndex].author;
    this.setState({
      text: randText,
      author: randAuth });

  }

  componentDidMount() {
    fetch("https://type.fit/api/quotes").
    then(data => data.json()).
    then(quotes => {
      let randIndex = Math.floor(Math.random() * quotes.length);
      this.setState({
        quotes: quotes,
        text: quotes[randIndex].text,
        author: quotes[randIndex].author });

    });
  }

  render() {
    return (
      React.createElement("div", { id: "wrapper" },
      React.createElement("div", { id: "quote-box" },
      React.createElement("div", { class: "jumbotron text-center" },
      React.createElement("div", { id: "text", class: "blockquote" }, "\"", this.state.text, "\""),
      React.createElement("div", { id: "author", class: "blockquote-footer text-right" }, " ", this.state.author),
      React.createElement("p", null,

      React.createElement("a", { href: "https://twitter.com/intent/tweet?text=" + encodeURIComponent(this.state.text) + " - " + encodeURIComponent(this.state.author),
        target: "_blank", title: "Post this quote on twitter!", id: "tweet-quote" },
      React.createElement("button", {
        class: "button", class: "btn btn-secondary my-2 mx-2" },
      React.createElement("i", { class: "fab fa-twitter mr-2" }), " Tweet!")),




      React.createElement("button", { class: "button", class: "btn btn-primary my-2 mx-2", id: "new-quote", onClick: this.handleClick }, "New quote"))))));






  }}


function Footer() {
  return (
    React.createElement("div", { class: "footer text-right" }, " by ", React.createElement("a", { href: "https://codepen.io/martinmilani" }, "M.M"), " "));

}

function App() {

  return (
    React.createElement("div", { class: "container" },
    React.createElement("h1", { class: "text-center display-3 mb-5 mt-5" }, "Random Quote Machine"),
    React.createElement(Quote, null),
    React.createElement(Footer, null)));


}


ReactDOM.render(React.createElement(App, null), document.getElementById("root"));