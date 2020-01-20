const initialMarkdown = `
Headers
=========

# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Hader 6

List
===========
- List Item 1 
- List Item 2
- List Item 3

Links
======
[freeCodeCamp](https://www.freecodecamp.org/)

Text Decoration
===============
*Italic*

**Bold**

***Bold & Italic***

Images
======
![Deadpool Unicorn](https://i.pinimg.com/236x/cc/59/ac/cc59ac3d2495fe1f6ceca9cbfe5c7c29--deadpool-unicorn-a-unicorn.jpg 'cute deadpool on unicorn')


Block Quotes
============
> ##### “Build your own dreams, or someone else will hire you to build theirs.”
> Farrah
> Gray

Code
=====
\`npm install create-react-app -g\`

\`\`\`
function addTwoNum (a,b) {
  return a+b
}
let num=Math.random()*10
\`\`\`
`;

marked.setOptions({
  highlight: function (code) {
    return hljs.highlightAuto(code).value;},
  breaks: true });


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      markdown: initialMarkdown };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ markdown: event.target.value });
  }


  render() {
    return (
      React.createElement("div", null,
      React.createElement("div", { class: "jumbotron" },
      React.createElement("h1", { class: "text-center mt-2 mb-3 bg display-3" }, "Markdown Previewer"),
      React.createElement("div", { class: "footer text-right " }, " by ", React.createElement("a", { href: "https://codepen.io/martinmilani" }, "M.M"))),

      React.createElement("div", { className: "container" },
      React.createElement("div", { class: "row w-100 m-0" },
      React.createElement("div", { class: "form-group mt-5 mb-5 w-100" },
      React.createElement("label", { class: "h3", for: "ediitor" }, "Editor"),
      React.createElement("textarea", {
        id: "editor",
        value: this.state.markdown,
        onChange: this.handleChange,
        rows: "15",
        class: "col-sm form-control  bg-light border border-dark" }))),




      React.createElement("div", { class: "row w-100 m-0" },
      React.createElement("div", { class: "form-group mt-3 w-100 " },
      React.createElement("label", { class: "h3", for: "preview" }, "Previewer"),
      React.createElement("div", {
        class: "col-sm bg-light border border-dark rounded",
        id: "preview",
        dangerouslySetInnerHTML: { __html: marked(this.state.markdown) } }))))));






  }}


ReactDOM.render(React.createElement(App, null), document.getElementById("root"));