import React from 'react';
import './Square.css';

class Square extends React.Component {

  constructor(props) {
    super(props);
    this.state = { status: this.props.status };
  }

  componentDidMount() {
    //console.log("status: "+this.state.status);
  }

  render() {
  //  console.log(this.props.id);
    if (this.state.status) {
      return(<td key={this.props.id} id={this.props.id} className="alive"></td>);
    } else {
      return(<td key={this.props.id} id={this.props.id} className="dead"></td>);
    }
  }
}
export default Square;
