const _           = require('lodash');
const createClass = require('create-react-class');
const React       = require('react');

function generateQuestion() {
    while (true) {
        const one = Math.ceil(Math.random() * 20);
        const two = Math.ceil(Math.random() * 10);
        const three = Math.ceil(Math.random() * 20);
        const operator = Math.random() > 0.5 ? '+' : '-';
        
        const string = `(${one} * ${two}) ${operator} ${three}`;
        const answer = eval(string);
        if (answer > 99 || answer < 1) {
            continue;
        }
        return [answer, `${string} =`.replace('*', '×')];
    }
}

const QUESTIONS = 2;

const Quiz = createClass({
    getDefaultProps: function(){
        return {

        };
    },
    
    getInitialState: function() {
        return {
            results: [],
            answerValue: '',
            correctAnswer: 0,
            questionText: '',
            timestamp: 0,
            progress: 0,
            connection: null,
        }
    },
    
    componentDidMount: function() {
        if (!WebSocket) {
            return; // Don't do this on the server
        }
        const connection = new WebSocket(`ws://${location.host.split(':')[0]}:8080`);
        //let counter = 0;
        //setInterval(() => { connection.send('Alpha ' + counter++) }, 3000);
        
        this.setState({ connection });
        
        
        this.refs.answer.focus();
        this.beginProcess();
    },
    
    handleKeyPress: function(e) {
        const newValue = e.target.value;
        if (newValue.length > 2 || newValue.match(/\D/)) {
            this.refs.answer.value = this.state.answerValue;
            return;
        }
        this.setState({ answerValue: newValue });
        if (+newValue === this.state.correctAnswer) {
            setTimeout(this.handleCorrectAnswer, 100);
        }
        generateQuestion();
    },
    
    handleClick: function() {
        this.refs.answer.focus();
    },
    
    handleCorrectAnswer: function() {
        this.refs.answer.value = '';
        const newResults = this.state.results;
        const d = new Date();
        newResults.push(d.getTime() - this.state.timestamp);
        this.setState({
            answerValue: '',
            results: newResults,
        });
        if (newResults.length < QUESTIONS) {
            this.startQuestion();
        }
    },
    
    componentDidUpdate: function(prevProps, prevState) {
        if (this.state.results.length === QUESTIONS && this.state.progress === 1) {
            // finish program
            console.log('done', this.state.results, this.state.results.reduce((sum,val) => {
                return sum + val;
            }, 0));
            this.setState({
                progress: 2,
                questionText: 'Done!',
            });
            const message = {
                type: 'quiz',
                value: this.state.results,
            };
            this.state.connection.send(JSON.stringify(message));
        }
    },
    
    startQuestion: function() {
        console.log('Questions:', this.state.results.length)
        const newQuestion = generateQuestion();
        const d = new Date();
        this.setState({
            correctAnswer: newQuestion[0],
            questionText: newQuestion[1],
            timestamp: d.getTime(),
            progress: 1,
        });
    },
    
    beginProcess: function() {
        if (this.state.questionText === '1') {
            this.startQuestion();
            return;
        }
        const nextStr = this.state.questionText === '' ? '3' : `${+this.state.questionText - 1}`;
        this.setState({
            questionText: nextStr,
        });
        setTimeout(this.beginProcess, 1000);
    },
    
    renderTextArea: function() {
        if (this.state.progress === 1) {
            return <div className='textArea'>
                <div className='question'>
                    <p>{this.state.questionText}</p>
                </div>
                <input type='text' className='answer' onChange={this.handleKeyPress} ref='answer'/>
            </div>
        }
        return <div className='textArea'>
            <div className='notice'>
                <p>{this.state.questionText}</p>
            </div>
        </div>
    },
    
    render: function(){
        
        const answerStyle = {
            width: this.state.progress === 1 ? '300px' : '0',
        };
        
        return <div className='quiz' onClick={this.handleClick}>
            <div className='textArea'>
                <div className='question'>
                    <p>{this.state.questionText}</p>
                </div>
                <input type='text' className='answer' style={answerStyle} onChange={this.handleKeyPress} ref='answer'/>
            </div>
        </div>;
    }
});

module.exports = Quiz;
