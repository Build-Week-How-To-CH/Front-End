import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { xyz } from "../store";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { HowToEdit } from "./HowToEdit";
import { useParams } from "react-router-dom";



function HowTo(props) {
  const id = useParams().id;

  useEffect(() => {
    props.xyz(id);
  }, []);

  return (
    <div>
      {props.howTo && (
        <container>
          <h2>{props.howTo.title}</h2>
          <h3>{props.howTo.category}</h3>
          <p>{props.howTo.content}</p>
          <button>Edit</button>
        </container>
      )}
      <HowToEdit />
    </div>
  );
}

const mapStateToProps = (state) => {
  //step 1
  return {
    howTo: state.howTo,
  };
};

export default connect(mapStateToProps, { xyz })(HowTo);
