import React, { Component } from "react";
import "./App.css";
import "../components/views/styles/meals/MealView.css";
import SearchBar from "../components/containers/meals/SearchBar"
import { debounce } from "lodash";
import MealContainer from "../components/containers/meals/MealContainer"
import axios from "axios"

const apiKey = process.env.REACT_APP_API_KEY;
const apiID = process.env.REACT_APP_API_ID;
const mealsHome = "https://api.edamam.com/search?q=chicken&app_id="+apiID+"&app_key="+apiKey

console.log(mealsHome)

class App extends Component {
  constructor() {
    super();

    this.state = {
      meals: [],
    };

    this.handleTermChange = this.handleTermChange.bind(this);
  }
  componentDidMount() {
    axios.get(mealsHome).then((result) => {
      this.setState({ meals: result.data.hits});})
  }

  handleTermChange(searchTerm) {
    const urlString = `https://api.edamam.com/search?q=${searchTerm.replace(
      /\s/g,
      "+"
    )}&app_id=${apiID}&app_key=${apiKey}`;

    if (searchTerm.length !== 0) {
      
       axios.get(urlString).then((result) => {
         this.setState({ meals: result.data.hits })
       });
     } else {
       axios.get(mealsHome).then((result) => {
         this.setState({ meals: result.data.hits })
       });
     }

   
  }
  render() {
    return (
      <div>
        <div className="App-header">
          <h2>Meal Search</h2>
        </div>
        <SearchBar
          style={{
            fontSize: 24,
            width: "40%",
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 10,
          }}
          onTermChange={debounce(this.handleTermChange, 1000)}
        />
        <MealContainer meals={this.state.meals} />
      </div>
    );
  }




}

export default App;
