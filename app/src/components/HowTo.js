import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { xyz } from "../store";

function HowTo(props) {
  const id = useParams().id;

  useEffect(() => {
    props.xyz(id)
  }, []);

  return (
    <div>
      {props.howTo && (
        <container>
          <h2>{props.howTo.title}</h2>
          <h3>{props.howTo.category}</h3>
          <p>{props.howTo.content}</p>
        </container>
      )}
    </div>
  );
}

const mapStateToProps = (state) => { //step 1
  return {
    howTo: state.howTo,
  };
};

export default connect(mapStateToProps, { xyz })(HowTo); 
