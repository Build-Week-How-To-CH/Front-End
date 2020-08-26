import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from 'axios'
import { fetchHowTos } from "../store/actions"
import HowToList from "./HowToList";
import HowToForm from "./HowToForm"
import { Link, useHistory } from "react-router-dom";

//USER DASHBOARD NO FORM

const Dashboard = (props) => {
  const [howToList, setHowToList] = useState([]);
  const history = useHistory();

  const getHowToList = () => {
    axios
      .get("https://bw-how-2.herokuapp.com/api/howtos")
      .then((response) => setHowToList(response.data.howtos))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // refresh
    getHowToList();
  }, [howToList]);

  // useEffect(() => {
  //   axiosWithAuth()
  //     .get("https://bw-how-2.herokuapp.com/api/howtos")
  //     .then((response) => {
  //         console.log(response)
  //       setHowToList(response.data.howtos);
  //     });
  // }, []);

  useEffect(() => {
    // refresh
    getHowToList();
  }, [howToList]);

  // console.log('My ID is', props.user_id)

  return (
    <>
      <div>
        <h1>Welcome to your How-To Dashboard</h1>
        <h2>Create How-To:</h2>
        <HowToForm />
        <h2>How-Tos:</h2>
        {
          howToList.map(ht => (
          <Link key={ht.id} to={`/dashboard/${ht.id}`}> 
            <HowToList ht={ht} getHowTosList={props.getHowTosList}
          />
          </Link>
          ))}
        <br></br>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    howTos: state.howTos,
    isLoading: state.isLoading,
    data: state.data,
    error: state.error,
    user_id: state.user_id,
  };
};

export default connect(mapStateToProps, { fetchHowTos })(Dashboard);
