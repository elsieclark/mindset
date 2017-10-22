const _           = require('lodash');
const createClass = require('create-react-class');
const React       = require('react');
const cx          = require('classnames');

const Break      = require('../../shared/components/break/break.jsx');
const Paragraph  = require('../../shared/components/paragraph/paragraph.jsx');
const TitleBlock = require('../../shared/components/titleblock/titleblock.jsx');


let count = 0;


const PageOne = createClass({

    getDefaultProps: function() {
        return {

        };
    },

    getInitialState: function() {
        return {
            quizData: {},
            highestQuizScore: 0,
            museData: {},
            highestMuseData: 21,
            currentScore: 73,
            graphHeight: 0,
            barWidth: 40,
            lowestMuseTimestamp: Infinity,
            highestMuseTimestamp: 1508672240,
            visible: 'all',
        };
    },

    componentDidMount: function() {
        this.setState({ graphHeight: this.refs.graph.clientHeight * 0.80 });        
        
        if (!WebSocket) {
            return;
        }
        const connection = new WebSocket(`ws://${location.host.split(':')[0]}:8080`);
        this.setState({ connection });

        connection.onmessage = (e) => {
            
            let msg;
            try {
                msg = JSON.parse(e.data);
            } catch (e) {
                console.log('JSON Error', e);
                return
            }
            console.log('Recieved', msg.type);
            if (msg.type === 'museValue') {
                if (msg.timestamp < this.state.lowestMuseTimestamp) {
                    this.setState({ lowestMuseTimestamp: msg.timestamp });
                }
                if (msg.timestamp > this.state.highestMuseTimestamp) {
                    this.setState({ highestMuseTimestamp: msg.timestamp });
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
        
        setInterval(() => {
            const payload = {
                type: 'client',
                timestamp: this.state.highestMuseTimestamp,
            };
            connection.send(JSON.stringify(payload));
        }, 1000);
        
        setInterval(() => {
            console.log('Seconds: ', ++count);
        }, 1000);
        
    },

    renderBars: function() {
        return _.map(this.state.museData, (val, key) => {
            const barStyle = {
                order: key,
            };
            //console.log(this.refs.graph)//, this.refs.graph.height)
            const unit = this.state.graphHeight / this.state.highestMuseData;
            return <div className='timeSegment'>
                <div className='bar alpha' style={{ 
                        width: this.state.barWidth, 
                        height: val.alpha * unit * (this.state.visible === 'all' || this.state.visible === 'alpha')}} />
                <div className='bar beta' style={{ 
                        width: this.state.barWidth, 
                        height: val.beta * unit * (this.state.visible === 'all' || this.state.visible === 'beta')}} />
                <div className='bar gamma' style={{ 
                        width: this.state.barWidth, 
                        height: val.gamma * unit * (this.state.visible === 'all' || this.state.visible === 'gamma')}} />
                <div className='bar delta' style={{ 
                        width: this.state.barWidth, 
                        height: val.delta * unit * (this.state.visible === 'all' || this.state.visible === 'delta')}} />
                <div className='bar theta' style={{ 
                        width: this.state.barWidth, 
                        height: val.theta * unit * (this.state.visible === 'all' || this.state.visible === 'theta')}} />
            </div>;
        });
    },
    
    handleLabelClick: function(e, type) {
        this.setState({ visible: type === this.state.visible ? 'all' : type });
    },
    
    handleRescale: function(e) {
        this.setState({
            barWidth: this.refs.scale.value
        });
    },

    render: function() {
        return <div className='pageone'>
            <div className='container'>
                
                <div className='legend'>
                    <div className={cx('label', 'alpha',{'active': this.state.visible === 'alpha'})}
                        onClick={(e) => {this.handleLabelClick(e, 'alpha')}}>
                        <div className='sample alpha' />Alpha Waves (0.21)
                    </div>
                    <div className={cx('label', 'beta',{'active': this.state.visible === 'beta'})}
                        onClick={(e) => {this.handleLabelClick(e, 'beta')}}>
                        <div className='sample beta'/>Beta Waves (-0.07)
                    </div>
                    <div className={cx('label', 'gamma',{'active': this.state.visible === 'gamma'})}
                        onClick={(e) => {this.handleLabelClick(e, 'gamma')}}>
                        <div className='sample gamma'/>Gamma Waves (-0.67)
                    </div>
                    <div className={cx('label', 'delta',{'active': this.state.visible === 'delta'})}
                        onClick={(e) => {this.handleLabelClick(e, 'delta')}}>
                        <div className='sample delta'/>Delta Waves (-0.15)
                    </div>
                    <div className={cx('label', 'theta',{'active': this.state.visible === 'theta'})}
                        onClick={(e) => {this.handleLabelClick(e, 'theta')}}>
                        <div className='sample theta'/>Theta Waves (0.92)
                    </div>
                </div>
                
                <input type='range' className='scale' min='10' max='100' defaultValue='40' ref='scale' onChange={this.handleRescale}/>
                
                <div className='controls'>
                    <div className='currentScore'>
                        <p>Current Score: {this.state.currentScore}</p>
                    </div>
                </div>
                
                <div className='graph' ref='graph'>
                    {this.renderBars()}
                </div>
                
            </div>
        </div>;
    }
});

module.exports = PageOne;
