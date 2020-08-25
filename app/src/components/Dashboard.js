import React, { useState, useEffect} from "react";
import { connect } from "react-redux";
import HowToForm from "./HowToForm";
import { axiosWithAuth } from "../utils/axiosWithAuth"
import { fetchHowTos } from "../store/actions"

//DASHBOARD//HOW-TO'S LIST//How-To form?

const Dashboard = () => {
  const [howToList, setHowToList] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("https://bw-how-2.herokuapp.com/api/howtos")
      .then((response) => {
          console.log(response)
        setHowToList(response.data.howtos);
      });
  }, []);

  return (
    <>
      <div>
        <h1>Welcome to your How-To Dashboard</h1>
        <h2>How-Tos:</h2>
        {howToList.map((ht) => {
          return <div>{ht.title}</div>;
        })}
      </div>
      <HowToForm />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    howTos: state.howTos,
    isLoading: state.isLoading,
    error: state.error,
  };
};

export default connect(mapStateToProps, {fetchHowTos})(Dashboard);