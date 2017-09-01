import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

 class App extends React.Component {
    constructor(props) {
        super(props);
        this.state={ 
            value: '', 
            title: '',
            release: '',
            vote: null,
            summary: '',
            image: '',
            poster: '',
            active: false
        };
        this.onChange=this.onChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.changeBody=this.changeBody.bind(this);
        this.toggleClass=this.toggleClass.bind(this);
    }

    retrieveApi(value) {
        const apiKey = 'bcf95c0f2b3955c73addfdbbb1ecba93';
        let requestUrl = 'https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&query=' + value;
         axios.get(requestUrl).then(response => {
             console.log(response.data.results[0]);
             this.setState({title: response.data.results[0].title,
                            summary: response.data.results[0].overview, 
                            release: 'Release date: '+response.data.results[0].release_date,
                            vote: 'Vote avg: ' + response.data.results[0].vote_average,
                            image: 'http://image.tmdb.org/t/p/original'+response.data.results[0].backdrop_path, 
                            poster: 'http://image.tmdb.org/t/p/w150'+response.data.results[0].poster_path,
                            state: false
                           })
             
         }).catch(error => {
             console.log('Error fetching and parsing data', error);
         });
        
    }
     handleSubmit(event) {
         event.preventDefault();
         this.retrieveApi(this.state.value);
     }
     toggleClass() {
         const currentState = this.state.active;
         this.setState({ active: true });
     };
     onChange(event){
            this.setState({
                value: event.target.value
            });
        
    }
     changeBody(image){
         document.getElementById("app").style.backgroundImage = "url("+image+")";
    }
     render() {
         this.changeBody(this.state.image);
        return (
            <div><nav id="myNavmenu" className="navmenu navmenu-default navmenu-fixed-left offcanvas" role="navigation">
               <h2>MovieDB Search</h2>
                 <div className="input-group">
                     <form onSubmit={this.handleSubmit}>
                         <input className="form-control" placeholder="Search for movie" value={this.state.value} type="text" onChange={this.onChange} /><input className="btn btn-default" type="submit" value="Submit" onClick={this.toggleClass}/></form></div>
                    <img className="tmdb_logo" src="../src/tmdb.png"></img>
                </nav>

                <div className="navbar navbar-default navbar-fixed-top">
                    <button type="button" className="navbar-toggle navbar-toggle-reveal" data-toggle="offcanvas" data-target="#myNavmenu" data-canvas="body">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                </div>
                <div className={this.state.active ? 'text_container': null}>
                    <img className={this.state.active ? 'posterimg': null} src={this.state.poster}></img>
                    <h2>{this.state.title}</h2>
                    <p>{this.state.release}</p>
                    <p>{this.state.vote}</p>
                    <p>{this.state.summary}</p>
                </div>
            </div>
        );
        
    }
}
ReactDOM.render(<App />, document.getElementById("app"));

