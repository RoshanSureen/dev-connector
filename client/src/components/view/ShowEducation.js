import React, { Component } from "react";
import Moment from "react-moment";

class ShowEducation extends Component {
  onDelete(id, event) {
    event.preventDefault();
    this.props.delete(id);
  }
  render() {
    const education = this.props.education.map((edu, i) => {
      return (
        <tr key={edu._id}>
          <td>{edu.school}</td>
          <td>{edu.degree}</td>
          <td>
            <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
            {edu.to === null ? (
              " Present"
            ) : (
              <Moment format="YYYY/MM/DD">{edu.to}</Moment>
            )}
          </td>
          <td>
            <button
              onClick={this.onDelete.bind(this, edu._id)}
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
        <h4 className="mb-4">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
            {education}
          </thead>
        </table>
      </div>
    );
  }
}

export default ShowEducation;
