class SpellerBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value : "",
      spell : true,
      read : false
    };
  }
  getMessage = (event) => {
    if(event.target.value == ""){
      this.setState({
        value: ""
      });
    }
    if(this.state.spell){
      const Http = new XMLHttpRequest();
      const url='http://localhost:8030/spell?number=' + event.target.value;
      Http.open("GET", url);
      Http.responseType = 'text'
      Http.send();
      Http.onreadystatechange=(e)=>{
          if(Http.responseText != ""){
            let answer = JSON.parse(Http.responseText)
            this.setState({
              value: answer["Text"]
            });
          }
      }
    } else {
      const Http = new XMLHttpRequest();
      const url='http://localhost:8030/read?text=' + event.target.value;
      Http.open("POST", url);
      Http.responseType = 'text'
      Http.send();
      Http.onreadystatechange=(e)=>{
        if(Http.responseText != ""){
          let answer = JSON.parse(Http.responseText)
          if(answer["Number"] == -1){
            this.setState({
              value: ""
            });
          } else {
            this.setState({
              value: answer["Number"]
            });
          }
        }
      }
    }
  }
  getSpell = () =>{
    this.setState({
      spell : true,
      read : false
    });
  }
  getRead = () => {
    this.setState({
      spell : false,
      read : true
    });
  }
  render(){
    return (
      <div className="container">
        <div id="optionBox">
          <button className={this.state.spell ? "option" : "unoption"}option onClick={this.getSpell}>
             Spell
          </button>
          <button className={this.state.read ? "option" : "unoption"} onClick={this.getRead}>
            Read
          </button>
        </div>
        <div className="row">
          <div className="col-12 col-sm-6">
            <form> 
              <div className="form-group">
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={this.getMessage}></textarea>
              </div>
            </form>
          </div>
          <div className="col-12 col-sm-6">
            <form> 
              <div className="form-group">
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" readOnly="readonly" value={this.state.value}>
                </textarea>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

class Speller extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div >
        <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand mb-0 h1" >Indonesian Numeral Speller</span>
        </nav>
        <SpellerBox />
      </div>
    )
  }
}

ReactDOM.render(
  <Speller />,
  document.getElementById('root')
);