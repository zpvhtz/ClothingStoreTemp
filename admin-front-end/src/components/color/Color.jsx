import React, { Component } from "react";
const Color = props => {
  return (
    <tr>
      <td>{props.colorId}</td>
      <td>{props.name}</td>
      <td>
        <input type="color" value={props.colorValue} disabled />
      </td>
      <td>
        <button
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#modalEditColor"
          onClick={props.onClickEdit}
        >
          Sửa
        </button>
        <button className="btn btn-danger" onClick={props.onClickDelete}>
          Xóa
        </button>
      </td>
    </tr>
  );
};

export default Color;
