import React, { Component } from "react";
const Brand = props => {
  return (
    <tr>
      <td>{props.brandId}</td>
      <td>{props.name}</td>
      <td>{props.companyName}</td>
      <td>
        <button
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#modalEditBrand"
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

export default Brand;
