import React, { Component } from 'react';

import ReactCountdownClock from 'react-countdown-clock'

import Navbar from './components/Navbar';
import WordWrapper from './components/Content/Word';
import Input from '@material-ui/core/Input';

const URL = 'http://localhost:3001'

class App extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      word : '',
      inputValue: '',
      counter: 60,
      score: 0,
      isCorrect: false,
      falseMsg: 'Wrong! Try Again',
      startTheTimer: false,
      stopTheGame: false,
      rankList: [],
      rankInput: 'none',
      username: ''
    }

    this.getInputValue = this.getInputValue.bind(this);
    this.enterClicked = this.enterClicked.bind(this);
  }

  componentDidMount() {
    this.getRankList()
  }
  

  getWord() {
    
    fetch(URL + '/api/words')
      .then(response => response.json())
      .then(data => this.setState({word : data[0]}))
  }

  getInputValue(e) {
      let value = e.target.value
      this.setState({inputValue : value})
     
  }


  isCorrect() {
    const { inputValue, word, score } = this.state
    if(inputValue === word) {
      this.getWord();
      this.setState({
        score : score + word.length,
        inputValue : '', isCorrect : false})
      this.getWord()
    } else {
      this.setState({isCorrect : true})
    }
  }

  startTheGame() {
    this.setState({startTheGame : true})
  }

  stopTheGame() {
    this.setState({startTheGame : false, stopTheGame : true, rankInput : ''})
   // if(this.state.stopTheGame) {
      this.createRecord()
      
   // }
    
  }

  createRecord() {
    let {score,username} = this.state
    let name = username
    if(name) {
    fetch(`${URL}/api/score?score=${score}&user=${name}`, {
      method: 'POST',
    })
    window.location.reload()
  }
  }

  getRankList() {
    fetch(`${URL}/api/ranklist`)
      .then(response => response.json())
      .then(data => this.setState({rankList : data}))
  }

  getUser(e) {
      let username = e.target.value
      this.setState({username : username})
  }

  enterClicked(e) {
    if(e.key === 'Enter'){
        this.startTheGame()
        this.isCorrect()
    }
}
  
  render() {
    const { word, rankList, startTheGame, rankInput,
           isCorrect, falseMsg, inputValue } = this.state
    return (
      <div className="App">
        <Navbar />
        <WordWrapper 
          word={word}/>
        <Input 
          disabled={this.state.stopTheGame}
          value={inputValue}
          onChange={this.getInputValue} 
          placeholder="Type the word" id="input"
          onKeyPress={this.enterClicked}
          />
          {isCorrect ? <h3>{falseMsg}</h3> : ''}
          <div className="counter-points-wrapper">
          {startTheGame ? 
          <ReactCountdownClock seconds={10}
                     className="counter"
                     color="#000"
                     alpha={0.5}
                     size={50}
                     onComplete={this.stopTheGame.bind(this)} />
           : ''
            }
          <span>{this.state.score}</span>
          </div>
          <h3>Records</h3>
          <div style={{display : rankInput}}>
            <input onChange={this.getUser.bind(this)} type="text"/>
            <button onClick={this.createRecord.bind(this)}>Save</button>
          </div>
          <ul>
            {rankList.map(data => {
              return (
                <p key={data.createdAt}>{data.user} : {data.score}</p>
              )
            })}
          </ul>
      </div>
    );
  }
}

export default App;
