import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";
import SearchField from 'terra-search-field';

export default class TutorialsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveTutorials = this.retrieveTutorials.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveTutorial = this.setActiveTutorial.bind(this);
        this.removeAllTutorials = this.removeAllTutorials.bind(this);
        this.searchTitle = this.searchTitle.bind(this);

        this.state = {
            tutorials: [],
            currentTutorial: null,
            currentIndex: -1,
            searchTitle: "",
            patientFamilyHistory: []
        };
    }

    componentDidMount() {
        this.retrieveTutorials();
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    retrieveTutorials() {
        TutorialDataService.getAll()
            .then(response => {
                this.setState({
                    tutorials: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveTutorials();
        this.setState({
            currentTutorial: null,
            currentIndex: -1
        });
    }

    setActiveTutorial(tutorial, index) {
        this.getpatiesntFamilyhistory(tutorial.id);
        this.setState({
            currentTutorial: tutorial,
            currentIndex: index
        });
    }

    removeAllTutorials() {
        TutorialDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }


    getpatiesntFamilyhistory(patintid) {
        TutorialDataService.get(patintid)
            .then(response => {
                this.setState({
                    patientFamilyHistory: response.data.entry
                })

            })
            .catch(e => {
                console.log(e);
            });
    }



    searchTitle(e) {
        this.setState({
            currentTutorial: null,
            currentIndex: -1
        });

        TutorialDataService.findByTitle(this.state.searchTitle.trim() == '' ? e : this.state.searchTitle)
            .then(response => {
                this.setState({
                    tutorials: response.data.entry
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { searchTitle, tutorials, currentTutorial, currentIndex, patientFamilyHistory } = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    {/* <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title"
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchTitle}
                                name="search"
                                id="search"
                            >
                                Search
                            </button>
                        </div>
                    </div> */}
                    <div>
                        <SearchField onSearch={this.searchTitle} onInvalidSearch={searchTitle} />
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Tutorials List hello</h4>

                    <ul className="list-group">
                        {tutorials &&
                            tutorials.map((tutorial, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveTutorial(tutorial.resource, index)}
                                    key={index}
                                >
                                    {tutorial.resource.name[0].text}
                                </li>
                            ))}
                    </ul>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllTutorials}
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {currentTutorial ? (
                        <>
                            <div>
                                <h4>Patient Details </h4>
                                <div>
                                    <label>
                                        <strong>Name:</strong>
                                    </label>{" "}
                                    {currentTutorial.name[0].text}
                                </div>
                                <div>
                                    <label>
                                        <strong>patientId:</strong>
                                    </label>{" "}
                                    {currentTutorial.id}
                                </div>
                                <div>
                                    <label>
                                        <strong>Status:</strong>
                                    </label>{" "}
                                    {currentTutorial.active == true ? "true" : "false"}
                                </div>


                            </div>
                            {currentTutorial.address !== undefined ?
                                <div>
                                    <h4>Patient Address </h4>
                                    <div>
                                        <label>
                                            <strong>city:</strong>
                                        </label>{" "}
                                        {currentTutorial.address[0].city}
                                    </div>
                                    <div>
                                        <label>
                                            <strong>country:</strong>
                                        </label>{" "}
                                        {currentTutorial.address[0].country}
                                    </div>
                                    <div>
                                        <label>
                                            <strong>district:</strong>
                                        </label>{" "}
                                        {currentTutorial.address[0].district}
                                    </div>
                                    <div>
                                        <label>
                                            <strong>postalCode:</strong>
                                        </label>{" "}
                                        {currentTutorial.address[0].postalCode}
                                    </div>
                                    <div>
                                        <label>
                                            <strong>state:</strong>
                                        </label>{" "}
                                        {currentTutorial.address[0].state}
                                    </div>
                                    <div>
                                        <label>
                                            <strong>text:</strong>
                                        </label>{" "}
                                        {currentTutorial.address[0].text}
                                    </div>
                                    <div>
                                        <label>
                                            <strong>use:</strong>
                                        </label>{" "}
                                        {currentTutorial.address[0].use}
                                    </div>


                                </div>
                                :
                                <></>
                            }



                        </>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Tutorial...</p>
                        </div>
                    )}

                    {patientFamilyHistory &&
                        patientFamilyHistory.map((his, index) => (
                            <>
                                <div>
                                    <h4>Patient Family Details </h4>
                                    <div>
                                        <label>
                                            <strong>resourceType:</strong>
                                        </label>{" "}
                                        {his.resource.resourceType}
                                    </div>
                                    <div>
                                        <label>
                                            <strong>status:</strong>
                                        </label>{" "}
                                        {his.resource.status}
                                    </div>
                                    <div>
                                        <label>
                                            <strong>relationship:</strong>
                                        </label>{" "}
                                        {his.resource?.relationship ? his.resource.relationship.text : ""}
                                    </div>
                                    {/*<div>*/}
                                    {/*    <label>*/}
                                    {/*        <strong>postalCode:</strong>*/}
                                    {/*    </label>{" "}*/}
                                    {/*    {currentTutorial.address[0].postalCode}*/}
                                    {/*</div>*/}
                                    {/*<div>*/}
                                    {/*    <label>*/}
                                    {/*        <strong>state:</strong>*/}
                                    {/*    </label>{" "}*/}
                                    {/*    {currentTutorial.address[0].state}*/}
                                    {/*</div>*/}
                                    {/*<div>*/}
                                    {/*    <label>*/}
                                    {/*        <strong>text:</strong>*/}
                                    {/*    </label>{" "}*/}
                                    {/*    {currentTutorial.address[0].text}*/}
                                    {/*</div>*/}
                                    {/*<div>*/}
                                    {/*    <label>*/}
                                    {/*        <strong>use:</strong>*/}
                                    {/*    </label>{" "}*/}
                                    {/*    {currentTutorial.address[0].use}*/}
                                    {/*</div>*/}


                                </div>
                            </>
                        ))
                    }
                </div>
            </div>
        );
    }
}
