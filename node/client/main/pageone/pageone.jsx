const _           = require('lodash');
const createClass = require('create-react-class');
const React       = require('react');

const Break      = require('../../shared/components/break/break.jsx');
const Paragraph  = require('../../shared/components/paragraph/paragraph.jsx');
const TitleBlock = require('../../shared/components/titleblock/titleblock.jsx');


const PageOne = createClass({
    
    getDefaultProps: function() {
        return {

        };
    },
    
    getInitialState: function() {
        return {
            quizData: {},
            highestQuizScore: 0,
            museData: {
                '17': {
                    alpha: 3,
                    beta: 4,
                    gamma: 3,
                    delta: 6,
                    theta: 4,
                    quality: 76,
                },
                '18': {
                    alpha: 2,
                    beta: 4,
                    gamma: 3,
                    delta: 6,
                    theta: 3,
                    quality: 76,
                },
                '19': {
                    alpha: 1,
                    beta: 4,
                    gamma: 5,
                    delta: 3,
                    theta: 4,
                    quality: 76,
                },
            },
            lowestMuseTimestamp: Infinity,
        };
    },

    componentDidMount: function() {
        if (!WebSocket) {
            return;
        }
        const connection = new WebSocket(`ws://${location.host.split(':')[0]}:8080`);
        this.setState({ connection });

        connection.onMessage = (e) => {
            const msg = e.data;
            if (msg.type === 'museValue') {
                if (msg.timestamp < this.state.lowestMuseTimestamp) {
                    this.setState({ lowestMuseTimestamp: msg.timestamp });
                }
                const museData = this.state.museData;
                museData[msg.timestamp] = msg.value;
            }
            
            if (msg.type === 'quizValue') {
                this.setState({
                    quizData: msg.value,
                });
            }
        };
    },
    
    renderBars: function() {
        return _.map(this.state.museData, (key, val) => {
            const barStyle = {
                order: key,
            };
            return <div className='bar'>
                
            </div>
        });
    },

    render: function() {
        return <div className='pageone'>
            <div className='container'>
                <div className='graph'>
                    {this.renderBars()}
                </div>
            </div>
        </div>;
    }
});

module.exports = PageOne;
