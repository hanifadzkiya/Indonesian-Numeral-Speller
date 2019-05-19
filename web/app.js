var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SpellerBox = function (_React$Component) {
  _inherits(SpellerBox, _React$Component);

  function SpellerBox(props) {
    _classCallCheck(this, SpellerBox);

    var _this = _possibleConstructorReturn(this, (SpellerBox.__proto__ || Object.getPrototypeOf(SpellerBox)).call(this, props));

    _this.getMessage = function (event) {
      if (event.target.value == "") {
        _this.setState({
          value: ""
        });
      }
      if (_this.state.spell) {
        var Http = new XMLHttpRequest();
        var url = 'http://localhost:8030/spell?number=' + event.target.value;
        Http.open("GET", url);
        Http.responseType = 'text';
        Http.send();
        Http.onreadystatechange = function (e) {
          if (Http.responseText != "") {
            var answer = JSON.parse(Http.responseText);
            _this.setState({
              value: answer["Text"]
            });
          }
        };
      } else {
        var _Http = new XMLHttpRequest();
        var _url = 'http://localhost:8030/read?text=' + event.target.value;
        _Http.open("POST", _url);
        _Http.responseType = 'text';
        _Http.send();
        _Http.onreadystatechange = function (e) {
          if (_Http.responseText != "") {
            var answer = JSON.parse(_Http.responseText);
            if (answer["Number"] == -1) {
              _this.setState({
                value: ""
              });
            } else {
              _this.setState({
                value: answer["Number"]
              });
            }
          }
        };
      }
    };

    _this.getSpell = function () {
      _this.setState({
        spell: true,
        read: false
      });
    };

    _this.getRead = function () {
      _this.setState({
        spell: false,
        read: true
      });
    };

    _this.state = {
      value: "",
      spell: true,
      read: false
    };
    return _this;
  }

  _createClass(SpellerBox, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "div",
          { id: "optionBox" },
          React.createElement(
            "button",
            { className: this.state.spell ? "option" : "unoption", option: true, onClick: this.getSpell },
            "Spell"
          ),
          React.createElement(
            "button",
            { className: this.state.read ? "option" : "unoption", onClick: this.getRead },
            "Read"
          )
        ),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-12 col-sm-6" },
            React.createElement(
              "form",
              null,
              React.createElement(
                "div",
                { className: "form-group" },
                React.createElement("textarea", { className: "form-control", id: "exampleFormControlTextarea1", rows: "3", onChange: this.getMessage })
              )
            )
          ),
          React.createElement(
            "div",
            { className: "col-12 col-sm-6" },
            React.createElement(
              "form",
              null,
              React.createElement(
                "div",
                { className: "form-group" },
                React.createElement("textarea", { className: "form-control", id: "exampleFormControlTextarea1", rows: "3", readOnly: "readonly", value: this.state.value })
              )
            )
          )
        )
      );
    }
  }]);

  return SpellerBox;
}(React.Component);

var Speller = function (_React$Component2) {
  _inherits(Speller, _React$Component2);

  function Speller(props) {
    _classCallCheck(this, Speller);

    return _possibleConstructorReturn(this, (Speller.__proto__ || Object.getPrototypeOf(Speller)).call(this, props));
  }

  _createClass(Speller, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "nav",
          { className: "navbar navbar-light bg-light" },
          React.createElement(
            "span",
            { className: "navbar-brand mb-0 h1" },
            "Indonesian Numeral Speller"
          )
        ),
        React.createElement(SpellerBox, null)
      );
    }
  }]);

  return Speller;
}(React.Component);

ReactDOM.render(React.createElement(Speller, null), document.getElementById('root'));