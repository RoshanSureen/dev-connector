import React, { Component } from "react";
import Moment from "react-moment";

class ShowExperience extends Component {
  onDelete(id, event) {
    event.preventDefault();
    this.props.delete(id);
  }
  render() {
    const experience = this.props.experience.map((exp, i) => {
      return (
        <tr key={exp._id}>
          <td>{exp.company}</td>
          <td>{exp.title}</td>
          <td>
            <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
            {exp.to === null ? (
              " Present"
            ) : (
              <Moment format="YYYY/MM/DD">{exp.to}</Moment>
            )}
          </td>
          <td>
            <button
              onClick={this.onDelete.bind(this, exp._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
            {experience}
          </thead>
        </table>
      </div>
    );
  }
}

export default ShowExperience;
