import React, { useState, useEffect} from "react";
import { connect } from "react-redux";
import HowToForm from "./HowToForm";
import { axiosWithAuth } from "../utils/axiosWithAuth"
import { fetchHowTos } from "../store/actions"
import HowToCard from "./HowToCard";

//DASHBOARD//HOW-TO'S LIST//How-To form?

const Dashboard = (props) => {
  const [howToList, setHowToList] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("https://bw-how-2.herokuapp.com/api/howtos")
      .then((response) => {
          console.log(response)
        setHowToList(response.data.howtos);
      });
  }, []);

  console.log('My ID is', props.user_id)
  
  return (
    <>
      <div>
        <h1>Welcome to your How-To Dashboard</h1>
        <h2>How-Tos:</h2>
        {howToList.map((ht) => {
          return <div key={ht.id}>{ht.title}</div>;
        })}
      </div>
      <HowToForm />
      <HowToCard />
    </>
  );
};

const mapStateToProps = (state) => {

  return {
    howTos: state.howTos,
    isLoading: state.isLoading,
    data: state.data,
    error: state.error,
    user_id:state.user_id,
  };
};

export default connect(mapStateToProps, {fetchHowTos})(Dashboard);