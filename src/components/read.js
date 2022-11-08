import React from "react";
import { Books } from "./books";
import axios from "axios";

export class Read extends React.Component {

    //used to connect to the local host and load the data from the json file 
    componentDidMount() {
        axios.get('http://localhost:4000/api/books')
            .then((response) => {
                this.setState({ books: response.data.books })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //calls the array through state
    state = {
        books: []
    }

    //method that actually puts stuff in the web page 
    render() {
        return (
            <div>
                <h3>Hello from my Read component!</h3>
                <Books books={this.state.books}></Books>
            </div>
        );
    }
}