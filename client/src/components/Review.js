import React, { Component } from 'react'
import axios from 'axios'

export default class Review extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            verdict: []
        }
    }
    componentDidMount() {
        console.log("hello")
        const id = this.props.match.params.id
        axios.get(`http://localhost:3001/api/get/${id}`)
         .then((response) =>{
             console.log(response.data)
             this.setState({verdict: response.data})
         })
    }

    render() {
        return (
            <div>
                {
                    this.state.verdict.map(version =>{
                        return (
                            <div>
                                Name: {version.name}
                                Verdict: {version.review}
                            </div>
                        )
                    })
                }
                
            </div>
        )
    }
}
