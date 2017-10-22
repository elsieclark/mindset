(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.main = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _ = require('lodash');
var createClass = require('create-react-class');
var React = require('react');

var Fourohfour = createClass({
    getDefaultProps: function getDefaultProps() {
        return {};
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: 'fourohfour' },
            'Fourohfour Component Ready.'
        );
    }
});

module.exports = Fourohfour;

},{"create-react-class":"create-react-class","lodash":"lodash","react":"react"}],"/Users/willclark/Documents/repos/mindset/node/client/main/main.jsx":[function(require,module,exports){
'use strict';

var _ = require('lodash');
var createClass = require('create-react-class');
var createRouter = require('pico-router').createRouter;
var Link = require('pico-router').Link;
var React = require('react');

var PageOne = require('./pageone/pageone.jsx');
var PageTwo = require('./pagetwo/pagetwo.jsx');
var Quiz = require('./quiz/quiz.jsx');
var FourOhFour = require('./fourohfour/fourohfour.jsx');

var TopBar = require('../shared/topbar/topbar.jsx');
var MainPage = require('../shared/mainpage/mainpage.jsx');
var LowBar = require('../shared/lowbar/lowbar.jsx');

var Router = createRouter({
    '/': React.createElement(PageOne, null),
    '/two': React.createElement(PageTwo, null),
    '/quiz': React.createElement(Quiz, null),
    '/*': React.createElement(
        MainPage,
        null,
        React.createElement(FourOhFour, null)
    )
});

var navBarLinks = [{
    name: 'One',
    link: '/'
}, {
    name: 'Two',
    link: '/two'
}];

var Main = createClass({

    getDefaultProps: function getDefaultProps() {
        return {
            url: '/'
        };
    },

    getInitialState: function getInitialState() {
        return {
            connection: null
        };
    },

    componentDidMount: function componentDidMount() {
        /*if (!WebSocket) {
            return; // Don't do this on the server
        }
        const connection = new WebSocket(`ws://${location.host.split(':')[0]}:8080`);
        //let counter = 0;
        //setInterval(() => { connection.send('Alpha ' + counter++) }, 3000);
        
        this.setState({ connection });
        
        connection.onmessage = (a,b) => {
            console.log(a.data);
        };*/

    },

    render: function render() {
        return React.createElement(
            'div',
            { className: 'main' },
            React.createElement(TopBar, { pages: navBarLinks }),
            React.createElement(Router, { defaultUrl: this.props.url })
        );
    }
});

module.exports = Main;

},{"../shared/lowbar/lowbar.jsx":8,"../shared/mainpage/mainpage.jsx":9,"../shared/topbar/topbar.jsx":10,"./fourohfour/fourohfour.jsx":1,"./pageone/pageone.jsx":2,"./pagetwo/pagetwo.jsx":3,"./quiz/quiz.jsx":4,"create-react-class":"create-react-class","lodash":"lodash","pico-router":"pico-router","react":"react"}],2:[function(require,module,exports){
'use strict';

var _ = require('lodash');
var createClass = require('create-react-class');
var React = require('react');
var cx = require('classnames');

var Break = require('../../shared/components/break/break.jsx');
var Paragraph = require('../../shared/components/paragraph/paragraph.jsx');
var TitleBlock = require('../../shared/components/titleblock/titleblock.jsx');

var count = 0;

var PageOne = createClass({

    getDefaultProps: function getDefaultProps() {
        return {};
    },

    getInitialState: function getInitialState() {
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
            visible: 'all'
        };
    },

    componentDidMount: function componentDidMount() {
        var _this = this;

        this.setState({ graphHeight: this.refs.graph.clientHeight * 0.80 });

        if (!WebSocket) {
            return;
        }
        var connection = new WebSocket('ws://' + location.host.split(':')[0] + ':8080');
        this.setState({ connection: connection });

        connection.onmessage = function (e) {

            var msg = void 0;
            try {
                msg = JSON.parse(e.data);
            } catch (e) {
                console.log('JSON Error', e);
                return;
            }
            console.log('Recieved', msg.type);
            if (msg.type === 'museValue') {
                if (msg.timestamp < _this.state.lowestMuseTimestamp) {
                    _this.setState({ lowestMuseTimestamp: msg.timestamp });
                }
                if (msg.timestamp > _this.state.highestMuseTimestamp) {
                    _this.setState({ highestMuseTimestamp: msg.timestamp });
                }
                var museData = _this.state.museData;
                museData[msg.timestamp] = msg.value;
            }

            if (msg.type === 'quizValue') {
                _this.setState({
                    quizData: msg.value
                });
            }
        };

        setInterval(function () {
            var payload = {
                type: 'client',
                timestamp: _this.state.highestMuseTimestamp
            };
            connection.send(JSON.stringify(payload));
        }, 1000);

        setInterval(function () {
            console.log('Seconds: ', ++count);
        }, 1000);
    },

    renderBars: function renderBars() {
        var _this2 = this;

        return _.map(this.state.museData, function (val, key) {
            var barStyle = {
                order: key
            };
            //console.log(this.refs.graph)//, this.refs.graph.height)
            var unit = _this2.state.graphHeight / _this2.state.highestMuseData;
            return React.createElement(
                'div',
                { className: 'timeSegment' },
                React.createElement('div', { className: 'bar alpha', style: {
                        width: _this2.state.barWidth,
                        height: val.alpha * unit * (_this2.state.visible === 'all' || _this2.state.visible === 'alpha') } }),
                React.createElement('div', { className: 'bar beta', style: {
                        width: _this2.state.barWidth,
                        height: val.beta * unit * (_this2.state.visible === 'all' || _this2.state.visible === 'beta') } }),
                React.createElement('div', { className: 'bar gamma', style: {
                        width: _this2.state.barWidth,
                        height: val.gamma * unit * (_this2.state.visible === 'all' || _this2.state.visible === 'gamma') } }),
                React.createElement('div', { className: 'bar delta', style: {
                        width: _this2.state.barWidth,
                        height: val.delta * unit * (_this2.state.visible === 'all' || _this2.state.visible === 'delta') } }),
                React.createElement('div', { className: 'bar theta', style: {
                        width: _this2.state.barWidth,
                        height: val.theta * unit * (_this2.state.visible === 'all' || _this2.state.visible === 'theta') } })
            );
        });
    },

    handleLabelClick: function handleLabelClick(e, type) {
        this.setState({ visible: type === this.state.visible ? 'all' : type });
    },

    handleRescale: function handleRescale(e) {
        this.setState({
            barWidth: this.refs.scale.value
        });
    },

    render: function render() {
        var _this3 = this;

        return React.createElement(
            'div',
            { className: 'pageone' },
            React.createElement(
                'div',
                { className: 'container' },
                React.createElement(
                    'div',
                    { className: 'legend' },
                    React.createElement(
                        'div',
                        { className: cx('label', 'alpha', { 'active': this.state.visible === 'alpha' }),
                            onClick: function onClick(e) {
                                _this3.handleLabelClick(e, 'alpha');
                            } },
                        React.createElement('div', { className: 'sample alpha' }),
                        'Alpha Waves (0.21)'
                    ),
                    React.createElement(
                        'div',
                        { className: cx('label', 'beta', { 'active': this.state.visible === 'beta' }),
                            onClick: function onClick(e) {
                                _this3.handleLabelClick(e, 'beta');
                            } },
                        React.createElement('div', { className: 'sample beta' }),
                        'Beta Waves (-0.07)'
                    ),
                    React.createElement(
                        'div',
                        { className: cx('label', 'gamma', { 'active': this.state.visible === 'gamma' }),
                            onClick: function onClick(e) {
                                _this3.handleLabelClick(e, 'gamma');
                            } },
                        React.createElement('div', { className: 'sample gamma' }),
                        'Gamma Waves (-0.67)'
                    ),
                    React.createElement(
                        'div',
                        { className: cx('label', 'delta', { 'active': this.state.visible === 'delta' }),
                            onClick: function onClick(e) {
                                _this3.handleLabelClick(e, 'delta');
                            } },
                        React.createElement('div', { className: 'sample delta' }),
                        'Delta Waves (-0.15)'
                    ),
                    React.createElement(
                        'div',
                        { className: cx('label', 'theta', { 'active': this.state.visible === 'theta' }),
                            onClick: function onClick(e) {
                                _this3.handleLabelClick(e, 'theta');
                            } },
                        React.createElement('div', { className: 'sample theta' }),
                        'Theta Waves (0.92)'
                    )
                ),
                React.createElement('input', { type: 'range', className: 'scale', min: '10', max: '100', defaultValue: '40', ref: 'scale', onChange: this.handleRescale }),
                React.createElement(
                    'div',
                    { className: 'controls' },
                    React.createElement(
                        'div',
                        { className: 'currentScore' },
                        React.createElement(
                            'p',
                            null,
                            'Current Score: ',
                            this.state.currentScore
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'graph', ref: 'graph' },
                    this.renderBars()
                )
            )
        );
    }
});

module.exports = PageOne;

},{"../../shared/components/break/break.jsx":5,"../../shared/components/paragraph/paragraph.jsx":6,"../../shared/components/titleblock/titleblock.jsx":7,"classnames":"classnames","create-react-class":"create-react-class","lodash":"lodash","react":"react"}],3:[function(require,module,exports){
'use strict';

var _ = require('lodash');
var createClass = require('create-react-class');
var React = require('react');

var Break = require('../../shared/components/break/break.jsx');
var Paragraph = require('../../shared/components/paragraph/paragraph.jsx');
var TitleBlock = require('../../shared/components/titleblock/titleblock.jsx');

var PageTwo = createClass({
    getDefaultProps: function getDefaultProps() {
        return {};
    },
    render: function render() {
        return React.createElement('div', { className: 'pagetwo' });
    }
});

module.exports = PageTwo;

},{"../../shared/components/break/break.jsx":5,"../../shared/components/paragraph/paragraph.jsx":6,"../../shared/components/titleblock/titleblock.jsx":7,"create-react-class":"create-react-class","lodash":"lodash","react":"react"}],4:[function(require,module,exports){
'use strict';

var _ = require('lodash');
var createClass = require('create-react-class');
var React = require('react');

var generateQuestion = function generateQuestion() {
    while (true) {
        var one = Math.ceil(Math.random() * 20);
        var two = Math.ceil(Math.random() * 10);
        var three = Math.ceil(Math.random() * 20);
        var operator = Math.random() > 0.5 ? '+' : '-';

        var string = '(' + one + ' * ' + two + ') ' + operator + ' ' + three;
        var answer = eval(string);
        if (answer > 99 || answer < 1) {
            continue;
        }
        return [answer, (string + ' =').replace('*', '×')];
    }
};

var QUESTIONS = 10;

var Quiz = createClass({
    getDefaultProps: function getDefaultProps() {
        return {};
    },

    getInitialState: function getInitialState() {
        return {
            results: [],
            answerValue: '',
            correctAnswer: 0,
            questionText: '',
            timestamp: 0,
            progress: 0,
            connection: null
        };
    },

    componentDidMount: function componentDidMount() {
        if (!WebSocket) {
            return; // Don't do this on the server
        }
        var connection = new WebSocket('ws://' + location.host.split(':')[0] + ':8080');
        //let counter = 0;
        //setInterval(() => { connection.send('Alpha ' + counter++) }, 3000);

        this.setState({ connection: connection });

        this.refs.answer.focus();
        this.beginProcess();
    },

    handleKeyPress: function handleKeyPress(e) {
        var newValue = e.target.value;
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

    handleClick: function handleClick() {
        this.refs.answer.focus();
    },

    handleCorrectAnswer: function handleCorrectAnswer() {
        this.refs.answer.value = '';
        var newResults = this.state.results;
        var d = new Date();
        newResults.push(d.getTime() - this.state.timestamp);
        this.setState({
            answerValue: '',
            results: newResults
        });
        if (newResults.length < QUESTIONS) {
            this.startQuestion();
        }
    },

    componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
        if (this.state.results.length === QUESTIONS && this.state.progress === 1) {
            // finish program
            console.log('done', this.state.results, this.state.results.reduce(function (sum, val) {
                return sum + val;
            }, 0));
            this.setState({
                progress: 2,
                questionText: 'Done!'
            });
            var message = {
                type: 'quiz',
                value: this.state.results
            };
            this.state.connection.send(JSON.stringify(message));
        }
    },

    startQuestion: function startQuestion() {
        console.log('Questions:', this.state.results.length);
        var newQuestion = generateQuestion();
        var d = new Date();
        this.setState({
            correctAnswer: newQuestion[0],
            questionText: newQuestion[1],
            timestamp: d.getTime(),
            progress: 1
        });
    },

    beginProcess: function beginProcess() {
        if (this.state.questionText === '1') {
            this.startQuestion();
            return;
        }
        var nextStr = this.state.questionText === '' ? '3' : '' + (+this.state.questionText - 1);
        this.setState({
            questionText: nextStr
        });
        setTimeout(this.beginProcess, 1000);
    },

    renderTextArea: function renderTextArea() {
        if (this.state.progress === 1) {
            return React.createElement(
                'div',
                { className: 'textArea' },
                React.createElement(
                    'div',
                    { className: 'question' },
                    React.createElement(
                        'p',
                        null,
                        this.state.questionText
                    )
                ),
                React.createElement('input', { type: 'text', className: 'answer', onChange: this.handleKeyPress, ref: 'answer' })
            );
        }
        return React.createElement(
            'div',
            { className: 'textArea' },
            React.createElement(
                'div',
                { className: 'notice' },
                React.createElement(
                    'p',
                    null,
                    this.state.questionText
                )
            )
        );
    },

    render: function render() {

        var answerStyle = {
            width: this.state.progress === 1 ? '300px' : '0'
        };

        return React.createElement(
            'div',
            { className: 'quiz', onClick: this.handleClick },
            React.createElement(
                'div',
                { className: 'textArea' },
                React.createElement(
                    'div',
                    { className: 'question' },
                    React.createElement(
                        'p',
                        null,
                        this.state.questionText
                    )
                ),
                React.createElement('input', { type: 'text', className: 'answer', style: answerStyle, onChange: this.handleKeyPress, ref: 'answer' })
            )
        );
    }
});

module.exports = Quiz;

},{"create-react-class":"create-react-class","lodash":"lodash","react":"react"}],5:[function(require,module,exports){
'use strict';

var _ = require('lodash');
var createClass = require('create-react-class');
var React = require('react');

var TitleBlock = createClass({

    render: function render() {
        var style = this.props.height ? { height: this.props.height } : {};
        return React.createElement('div', { className: 'break', style: style });
    }

});

module.exports = TitleBlock;

},{"create-react-class":"create-react-class","lodash":"lodash","react":"react"}],6:[function(require,module,exports){
'use strict';

var _ = require('lodash');
var createClass = require('create-react-class');
var React = require('react');

var TitleBlock = createClass({

    render: function render() {
        return React.createElement(
            'div',
            { className: 'paragraph' },
            React.createElement(
                'p',
                null,
                this.props.children
            )
        );
    }

});

module.exports = TitleBlock;

},{"create-react-class":"create-react-class","lodash":"lodash","react":"react"}],7:[function(require,module,exports){
'use strict';

var _ = require('lodash');
var createClass = require('create-react-class');
var React = require('react');

var TitleBlock = createClass({

    render: function render() {
        return React.createElement(
            'div',
            { className: 'titleBlock' },
            React.createElement(
                'p',
                { className: 'pageTitle' },
                this.props.name
            ),
            React.createElement(
                'p',
                { className: 'byline' },
                this.props.date
            )
        );
    }

});

module.exports = TitleBlock;

},{"create-react-class":"create-react-class","lodash":"lodash","react":"react"}],8:[function(require,module,exports){
'use strict';

var _ = require('lodash');
var createClass = require('create-react-class');
var React = require('react');

var LowBar = createClass({

    render: function render() {
        return React.createElement(
            'div',
            { className: 'bottombar' },
            React.createElement(
                'p',
                { className: 'copyright' },
                React.createElement(
                    'span',
                    null,
                    '\xA9'
                ),
                ' 2017 - Will Clark'
            )
        );
    }

});

module.exports = LowBar;

},{"create-react-class":"create-react-class","lodash":"lodash","react":"react"}],9:[function(require,module,exports){
'use strict';

var _ = require('lodash');
var createClass = require('create-react-class');
var React = require('react');

var MainPage = createClass({

    render: function render() {
        return React.createElement(
            'div',
            { className: 'mainPage' },
            this.props.children
        );
    }

});

module.exports = MainPage;

},{"create-react-class":"create-react-class","lodash":"lodash","react":"react"}],10:[function(require,module,exports){
'use strict';

var _ = require('lodash');
var cx = require('classnames');
var createClass = require('create-react-class');
var React = require('react');
var Link = require('pico-router').Link;

var TopBar = createClass({
    getDefaultProps: function getDefaultProps() {
        return {
            pages: []
        };
    },
    getInitialState: function getInitialState() {
        return {
            currentPage: '/'
        };
    },
    getCurrentPage: function getCurrentPage(e) {
        this.setState({
            currentPage: decodeURI(e.currentTarget.href.split(window.location.origin)[1])
        });
    },

    componentDidMount: function componentDidMount() {
        this.setState({
            currentPage: decodeURI(window.location.href.split(window.location.origin)[1])
        });
    },

    renderPageLinks: function renderPageLinks() {
        var _this = this;

        return _.map(this.props.pages, function (page) {
            return React.createElement(
                Link,
                { className: cx('pageLink', { activePage: _this.state.currentPage === page.link }), href: '' + page.link, onClick: _this.getCurrentPage },
                page.name
            );
        });
    },

    render: function render() {
        return React.createElement(
            'div',
            { className: 'topbar' },
            React.createElement(
                'h3',
                { className: 'siteName' },
                'MindSet'
            ),
            React.createElement(
                'nav',
                { className: 'pageLinkList' },
                this.renderPageLinks()
            )
        );
    }
});

module.exports = TopBar;

},{"classnames":"classnames","create-react-class":"create-react-class","lodash":"lodash","pico-router":"pico-router","react":"react"}]},{},[])("/Users/willclark/Documents/repos/mindset/node/client/main/main.jsx")
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvbWFpbi9mb3Vyb2hmb3VyL2ZvdXJvaGZvdXIuanN4IiwiY2xpZW50L21haW4vbWFpbi5qc3giLCJjbGllbnQvbWFpbi9wYWdlb25lL3BhZ2VvbmUuanN4IiwiY2xpZW50L21haW4vcGFnZXR3by9wYWdldHdvLmpzeCIsImNsaWVudC9tYWluL3F1aXovcXVpei5qc3giLCJjbGllbnQvc2hhcmVkL2NvbXBvbmVudHMvYnJlYWsvYnJlYWsuanN4IiwiY2xpZW50L3NoYXJlZC9jb21wb25lbnRzL3BhcmFncmFwaC9wYXJhZ3JhcGguanN4IiwiY2xpZW50L3NoYXJlZC9jb21wb25lbnRzL3RpdGxlYmxvY2svdGl0bGVibG9jay5qc3giLCJjbGllbnQvc2hhcmVkL2xvd2Jhci9sb3diYXIuanN4IiwiY2xpZW50L3NoYXJlZC9tYWlucGFnZS9tYWlucGFnZS5qc3giLCJjbGllbnQvc2hhcmVkL3RvcGJhci90b3BiYXIuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLElBQWMsUUFBUSxRQUFSLENBQXBCO0FBQ0EsSUFBTSxjQUFjLFFBQVEsb0JBQVIsQ0FBcEI7QUFDQSxJQUFNLFFBQWMsUUFBUSxPQUFSLENBQXBCOztBQUdBLElBQU0sYUFBYSxZQUFZO0FBQzNCLHFCQUFpQiwyQkFBVztBQUN4QixlQUFPLEVBQVA7QUFHSCxLQUwwQjtBQU0zQixZQUFRLGtCQUFXO0FBQ2YsZUFBTztBQUFBO0FBQUEsY0FBSyxXQUFVLFlBQWY7QUFBQTtBQUFBLFNBQVA7QUFHSDtBQVYwQixDQUFaLENBQW5COztBQWFBLE9BQU8sT0FBUCxHQUFpQixVQUFqQjs7Ozs7QUNsQkEsSUFBTSxJQUFlLFFBQVEsUUFBUixDQUFyQjtBQUNBLElBQU0sY0FBZSxRQUFRLG9CQUFSLENBQXJCO0FBQ0EsSUFBTSxlQUFlLFFBQVEsYUFBUixFQUF1QixZQUE1QztBQUNBLElBQU0s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QUFBQTtBQUFBLGtCQUFLLFdBQVUsY0FBZjtBQUNLLHFCQUFLLGVBQUw7QUFETDtBQUZHLFNBQVA7QUFNSDtBQXRDc0IsQ0FBWixDQUFmOztBQXlDQSxPQUFPLE9BQVAsR0FBaUIsTUFBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY29uc3QgXyAgICAgICAgICAgPSByZXF1aXJlKCdsb2Rhc2gnKTtcbmNvbnN0IGNyZWF0ZUNsYXNzID0gcmVxdWlyZSgnY3JlYXRlLXJlYWN0LWNsYXNzJyk7XG5jb25zdCBSZWFjdCAgICAgICA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cblxuY29uc3QgRm91cm9oZm91ciA9IGNyZWF0ZUNsYXNzKHtcbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuXG4gICAgICAgIH07XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9J2ZvdXJvaGZvdXInPlxuXHRcdFx0Rm91cm9oZm91ciBDb21wb25lbnQgUmVhZHkuXG4gICAgICAgIDwvZGl2PjtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBGb3Vyb2hmb3VyO1xuIiwiY29uc3QgXyAgICAgICAgICAgID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5jb25zdCBjcmVhdGVDbGFzcyAgPSByZXF1aXJlKCdjcmVhdGUtcmVhY3QtY2xhc3MnKTtcbmNvbnN0IGNyZWF0ZVJvdXRlciA9IHJlcXVpcmUoJ3BpY28tcm91dGVyJykuY3JlYXRlUm91dGVyO1xuY29uc3QgTGluayAgICAgICAgID0gcmVxdWlyZSgncGljby1yb3V0ZXInKS5MaW5rO1xuY29uc3QgUmVhY3QgICAgICAgID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgUGFnZU9uZSAgICA9IHJlcXVpcmUoJy4vcGFnZW9uZS9wYWdlb25lLmpzeCcpO1xuY29uc3QgUGFnZVR3byAgICA9IHJlcXVpcmUoJy4vcGFnZXR3by9wYWdldHdvLmpzeCcpO1xuY29uc3QgUXVpeiAgICAgICA9IHJlcXVpcmUoJy4vcXVpei9xdWl6LmpzeCcpO1xuY29uc3QgRm91ck9oRm91ciA9IHJlcXVpcmUoJy4vZm91cm9oZm91ci9mb3Vyb2hmb3VyLmpzeCcpO1xuXG5jb25zdCBUb3BCYXIgICA9IHJlcXVpcmUoJy4uL3NoYXJlZC90b3BiYXIvdG9wYmFyLmpzeCcpO1xuY29uc3QgTWFpblBhZ2UgPSByZXF1aXJlKCcuLi9zaGFyZWQvbWFpbnBhZ2UvbWFpbnBhZ2UuanN4Jyk7XG5jb25zdCBMb3dCYXIgICA9IHJlcXVpcmUoJy4uL3NoYXJlZC9sb3diYXIvbG93YmFyLmpzeCcpO1xuXG5jb25zdCBSb3V0ZXIgPSBjcmVhdGVSb3V0ZXIoe1xuICAgICcvJzogPFBhZ2VPbmUgLz4sXG4gICAgJy90d28nOiA8UGFnZVR3byAvPixcbiAgICAnL3F1aXonOiA8UXVpeiAvPixcbiAgICAnLyonOiA8TWFpblBhZ2U+PEZvdXJPaEZvdXIgLz48L01haW5QYWdlPlxufSk7XG5cbmNvbnN0IG5hdkJhckxpbmtzID0gW1xuICAgIHtcbiAgICAgICAgbmFtZTogJ09uZScsXG4gICAgICAgIGxpbms6ICcvJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ1R3bycsXG4gICAgICAgIGxpbms6ICcvdHdvJyxcbiAgICB9LFxuXTtcblxuY29uc3QgTWFpbiA9IGNyZWF0ZUNsYXNzKHtcblxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB1cmw6ICcvJ1xuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29ubmVjdGlvbjogbnVsbFxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8qaWYgKCFXZWJTb2NrZXQpIHtcbiAgICAgICAgICAgIHJldHVybjsgLy8gRG9uJ3QgZG8gdGhpcyBvbiB0aGUgc2VydmVyXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29ubmVjdGlvbiA9IG5ldyBXZWJTb2NrZXQoYHdzOi8vJHtsb2NhdGlvbi5ob3N0LnNwbGl0KCc6JylbMF19OjgwODBgKTtcbiAgICAgICAgLy9sZXQgY291bnRlciA9IDA7XG4gICAgICAgIC8vc2V0SW50ZXJ2YWwoKCkgPT4geyBjb25uZWN0aW9uLnNlbmQoJ0FscGhhICcgKyBjb3VudGVyKyspIH0sIDMwMDApO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGNvbm5lY3Rpb24gfSk7XG4gICAgICAgIFxuICAgICAgICBjb25uZWN0aW9uLm9ubWVzc2FnZSA9IChhLGIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGEuZGF0YSk7XG4gICAgICAgIH07Ki9cblxuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9J21haW4nPlxuICAgICAgICAgICAgPFRvcEJhciBwYWdlcz17bmF2QmFyTGlua3N9IC8+XG4gICAgICAgICAgICA8Um91dGVyIGRlZmF1bHRVcmw9e3RoaXMucHJvcHMudXJsfSAvPlxuICAgICAgICA8L2Rpdj47XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTWFpbjtcbiIsImNvbnN0IF8gICAgICAgICAgID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5jb25zdCBjcmVhdGVDbGFzcyA9IHJlcXVpcmUoJ2NyZWF0ZS1yZWFjdC1jbGFzcycpO1xuY29uc3QgUmVhY3QgICAgICAgPSByZXF1aXJlKCdyZWFjdCcpO1xuY29uc3QgY3ggICAgICAgICAgPSByZXF1aXJlKCdjbGFzc25hbWVzJyk7XG5cbmNvbnN0IEJyZWFrICAgICAgPSByZXF1aXJlKCcuLi8uLi9zaGFyZWQvY29tcG9uZW50cy9icmVhay9icmVhay5qc3gnKTtcbmNvbnN0IFBhcmFncmFwaCAgPSByZXF1aXJlKCcuLi8uLi9zaGFyZWQvY29tcG9uZW50cy9wYXJhZ3JhcGgvcGFyYWdyYXBoLmpzeCcpO1xuY29uc3QgVGl0bGVCbG9jayA9IHJlcXVpcmUoJy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL3RpdGxlYmxvY2svdGl0bGVibG9jay5qc3gnKTtcblxuXG5sZXQgY291bnQgPSAwO1xuXG5cbmNvbnN0IFBhZ2VPbmUgPSBjcmVhdGVDbGFzcyh7XG5cbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBxdWl6RGF0YToge30sXG4gICAgICAgICAgICBoaWdoZXN0UXVpelNjb3JlOiAwLFxuICAgICAgICAgICAgbXVzZURhdGE6IHt9LFxuICAgICAgICAgICAgaGlnaGVzdE11c2VEYXRhOiAyMSxcbiAgICAgICAgICAgIGN1cnJlbnRTY29yZTogNzMsXG4gICAgICAgICAgICBncmFwaEhlaWdodDogMCxcbiAgICAgICAgICAgIGJhcldpZHRoOiA0MCxcbiAgICAgICAgICAgIGxvd2VzdE11c2VUaW1lc3RhbXA6IEluZmluaXR5LFxuICAgICAgICAgICAgaGlnaGVzdE11c2VUaW1lc3RhbXA6IDE1MDg2NzIyNDAsXG4gICAgICAgICAgICB2aXNpYmxlOiAnYWxsJyxcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgZ3JhcGhIZWlnaHQ6IHRoaXMucmVmcy5ncmFwaC5jbGllbnRIZWlnaHQgKiAwLjgwIH0pOyAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBpZiAoIVdlYlNvY2tldCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBuZXcgV2ViU29ja2V0KGB3czovLyR7bG9jYXRpb24uaG9zdC5zcGxpdCgnOicpWzBdfTo4MDgwYCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjb25uZWN0aW9uIH0pO1xuXG4gICAgICAgIGNvbm5lY3Rpb24ub25tZXNzYWdlID0gKGUpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IG1zZztcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbXNnID0gSlNPTi5wYXJzZShlLmRhdGEpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdKU09OIEVycm9yJywgZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUmVjaWV2ZWQnLCBtc2cudHlwZSk7XG4gICAgICAgICAgICBpZiAobXNnLnR5cGUgPT09ICdtdXNlVmFsdWUnKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1zZy50aW1lc3RhbXAgPCB0aGlzLnN0YXRlLmxvd2VzdE11c2VUaW1lc3RhbXApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGxvd2VzdE11c2VUaW1lc3RhbXA6IG1zZy50aW1lc3RhbXAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChtc2cudGltZXN0YW1wID4gdGhpcy5zdGF0ZS5oaWdoZXN0TXVzZVRpbWVzdGFtcCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgaGlnaGVzdE11c2VUaW1lc3RhbXA6IG1zZy50aW1lc3RhbXAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IG11c2VEYXRhID0gdGhpcy5zdGF0ZS5tdXNlRGF0YTtcbiAgICAgICAgICAgICAgICBtdXNlRGF0YVttc2cudGltZXN0YW1wXSA9IG1zZy52YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1zZy50eXBlID09PSAncXVpelZhbHVlJykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICBxdWl6RGF0YTogbXNnLnZhbHVlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnY2xpZW50JyxcbiAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IHRoaXMuc3RhdGUuaGlnaGVzdE11c2VUaW1lc3RhbXAsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29ubmVjdGlvbi5zZW5kKEpTT04uc3RyaW5naWZ5KHBheWxvYWQpKTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIFxuICAgICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU2Vjb25kczogJywgKytjb3VudCk7XG4gICAgICAgIH0sIDEwMDApO1xuICAgICAgICBcbiAgICB9LFxuXG4gICAgcmVuZGVyQmFyczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfLm1hcCh0aGlzLnN0YXRlLm11c2VEYXRhLCAodmFsLCBrZXkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGJhclN0eWxlID0ge1xuICAgICAgICAgICAgICAgIG9yZGVyOiBrZXksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnJlZnMuZ3JhcGgpLy8sIHRoaXMucmVmcy5ncmFwaC5oZWlnaHQpXG4gICAgICAgICAgICBjb25zdCB1bml0ID0gdGhpcy5zdGF0ZS5ncmFwaEhlaWdodCAvIHRoaXMuc3RhdGUuaGlnaGVzdE11c2VEYXRhO1xuICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPSd0aW1lU2VnbWVudCc+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2JhciBhbHBoYScgc3R5bGU9e3sgXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy5zdGF0ZS5iYXJXaWR0aCwgXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHZhbC5hbHBoYSAqIHVuaXQgKiAodGhpcy5zdGF0ZS52aXNpYmxlID09PSAnYWxsJyB8fCB0aGlzLnN0YXRlLnZpc2libGUgPT09ICdhbHBoYScpfX0gLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYmFyIGJldGEnIHN0eWxlPXt7IFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMuc3RhdGUuYmFyV2lkdGgsIFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiB2YWwuYmV0YSAqIHVuaXQgKiAodGhpcy5zdGF0ZS52aXNpYmxlID09PSAnYWxsJyB8fCB0aGlzLnN0YXRlLnZpc2libGUgPT09ICdiZXRhJyl9fSAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdiYXIgZ2FtbWEnIHN0eWxlPXt7IFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMuc3RhdGUuYmFyV2lkdGgsIFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiB2YWwuZ2FtbWEgKiB1bml0ICogKHRoaXMuc3RhdGUudmlzaWJsZSA9PT0gJ2FsbCcgfHwgdGhpcy5zdGF0ZS52aXNpYmxlID09PSAnZ2FtbWEnKX19IC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2JhciBkZWx0YScgc3R5bGU9e3sgXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy5zdGF0ZS5iYXJXaWR0aCwgXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHZhbC5kZWx0YSAqIHVuaXQgKiAodGhpcy5zdGF0ZS52aXNpYmxlID09PSAnYWxsJyB8fCB0aGlzLnN0YXRlLnZpc2libGUgPT09ICdkZWx0YScpfX0gLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYmFyIHRoZXRhJyBzdHlsZT17eyBcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLnN0YXRlLmJhcldpZHRoLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogdmFsLnRoZXRhICogdW5pdCAqICh0aGlzLnN0YXRlLnZpc2libGUgPT09ICdhbGwnIHx8IHRoaXMuc3RhdGUudmlzaWJsZSA9PT0gJ3RoZXRhJyl9fSAvPlxuICAgICAgICAgICAgPC9kaXY+O1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIFxuICAgIGhhbmRsZUxhYmVsQ2xpY2s6IGZ1bmN0aW9uKGUsIHR5cGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZpc2libGU6IHR5cGUgPT09IHRoaXMuc3RhdGUudmlzaWJsZSA/ICdhbGwnIDogdHlwZSB9KTtcbiAgICB9LFxuICAgIFxuICAgIGhhbmRsZVJlc2NhbGU6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBiYXJXaWR0aDogdGhpcy5yZWZzLnNjYWxlLnZhbHVlXG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9J3BhZ2VvbmUnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbnRhaW5lcic+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2xlZ2VuZCc+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjeCgnbGFiZWwnLCAnYWxwaGEnLHsnYWN0aXZlJzogdGhpcy5zdGF0ZS52aXNpYmxlID09PSAnYWxwaGEnfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge3RoaXMuaGFuZGxlTGFiZWxDbGljayhlLCAnYWxwaGEnKX19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3NhbXBsZSBhbHBoYScgLz5BbHBoYSBXYXZlcyAoMC4yMSlcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjeCgnbGFiZWwnLCAnYmV0YScseydhY3RpdmUnOiB0aGlzLnN0YXRlLnZpc2libGUgPT09ICdiZXRhJ30pfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHt0aGlzLmhhbmRsZUxhYmVsQ2xpY2soZSwgJ2JldGEnKX19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3NhbXBsZSBiZXRhJy8+QmV0YSBXYXZlcyAoLTAuMDcpXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y3goJ2xhYmVsJywgJ2dhbW1hJyx7J2FjdGl2ZSc6IHRoaXMuc3RhdGUudmlzaWJsZSA9PT0gJ2dhbW1hJ30pfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHt0aGlzLmhhbmRsZUxhYmVsQ2xpY2soZSwgJ2dhbW1hJyl9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzYW1wbGUgZ2FtbWEnLz5HYW1tYSBXYXZlcyAoLTAuNjcpXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y3goJ2xhYmVsJywgJ2RlbHRhJyx7J2FjdGl2ZSc6IHRoaXMuc3RhdGUudmlzaWJsZSA9PT0gJ2RlbHRhJ30pfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHt0aGlzLmhhbmRsZUxhYmVsQ2xpY2soZSwgJ2RlbHRhJyl9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzYW1wbGUgZGVsdGEnLz5EZWx0YSBXYXZlcyAoLTAuMTUpXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y3goJ2xhYmVsJywgJ3RoZXRhJyx7J2FjdGl2ZSc6IHRoaXMuc3RhdGUudmlzaWJsZSA9PT0gJ3RoZXRhJ30pfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHt0aGlzLmhhbmRsZUxhYmVsQ2xpY2soZSwgJ3RoZXRhJyl9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzYW1wbGUgdGhldGEnLz5UaGV0YSBXYXZlcyAoMC45MilcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3JhbmdlJyBjbGFzc05hbWU9J3NjYWxlJyBtaW49JzEwJyBtYXg9JzEwMCcgZGVmYXVsdFZhbHVlPSc0MCcgcmVmPSdzY2FsZScgb25DaGFuZ2U9e3RoaXMuaGFuZGxlUmVzY2FsZX0vPlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb250cm9scyc+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjdXJyZW50U2NvcmUnPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+Q3VycmVudCBTY29yZToge3RoaXMuc3RhdGUuY3VycmVudFNjb3JlfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2dyYXBoJyByZWY9J2dyYXBoJz5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQmFycygpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PjtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlT25lO1xuIiwiY29uc3QgXyAgICAgICAgICAgPSByZXF1aXJlKCdsb2Rhc2gnKTtcbmNvbnN0IGNyZWF0ZUNsYXNzID0gcmVxdWlyZSgnY3JlYXRlLXJlYWN0LWNsYXNzJyk7XG5jb25zdCBSZWFjdCAgICAgICA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IEJyZWFrICAgICAgPSByZXF1aXJlKCcuLi8uLi9zaGFyZWQvY29tcG9uZW50cy9icmVhay9icmVhay5qc3gnKTtcbmNvbnN0IFBhcmFncmFwaCAgPSByZXF1aXJlKCcuLi8uLi9zaGFyZWQvY29tcG9uZW50cy9wYXJhZ3JhcGgvcGFyYWdyYXBoLmpzeCcpO1xuY29uc3QgVGl0bGVCbG9jayA9IHJlcXVpcmUoJy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL3RpdGxlYmxvY2svdGl0bGVibG9jay5qc3gnKTtcblxuXG5jb25zdCBQYWdlVHdvID0gY3JlYXRlQ2xhc3Moe1xuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG5cbiAgICAgICAgfTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT0ncGFnZXR3byc+XG5cbiAgICAgICAgPC9kaXY+O1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBhZ2VUd287XG4iLCJjb25zdCBfICAgICAgICAgICA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuY29uc3QgY3JlYXRlQ2xhc3MgPSByZXF1aXJlKCdjcmVhdGUtcmVhY3QtY2xhc3MnKTtcbmNvbnN0IFJlYWN0ICAgICAgID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgZ2VuZXJhdGVRdWVzdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGNvbnN0IG9uZSA9IE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogMjApO1xuICAgICAgICBjb25zdCB0d28gPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgY29uc3QgdGhyZWUgPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDIwKTtcbiAgICAgICAgY29uc3Qgb3BlcmF0b3IgPSBNYXRoLnJhbmRvbSgpID4gMC41ID8gJysnIDogJy0nO1xuXG4gICAgICAgIGNvbnN0IHN0cmluZyA9IGAoJHtvbmV9ICogJHt0d299KSAke29wZXJhdG9yfSAke3RocmVlfWA7XG4gICAgICAgIGNvbnN0IGFuc3dlciA9IGV2YWwoc3RyaW5nKTtcbiAgICAgICAgaWYgKGFuc3dlciA+IDk5IHx8IGFuc3dlciA8IDEpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbYW5zd2VyLCBgJHtzdHJpbmd9ID1gLnJlcGxhY2UoJyonLCAnw5cnKV07XG4gICAgfVxufTtcblxuY29uc3QgUVVFU1RJT05TID0gMTA7XG5cbmNvbnN0IFF1aXogPSBjcmVhdGVDbGFzcyh7XG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcblxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzdWx0czogW10sXG4gICAgICAgICAgICBhbnN3ZXJWYWx1ZTogJycsXG4gICAgICAgICAgICBjb3JyZWN0QW5zd2VyOiAwLFxuICAgICAgICAgICAgcXVlc3Rpb25UZXh0OiAnJyxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogMCxcbiAgICAgICAgICAgIHByb2dyZXNzOiAwLFxuICAgICAgICAgICAgY29ubmVjdGlvbjogbnVsbCxcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIVdlYlNvY2tldCkge1xuICAgICAgICAgICAgcmV0dXJuOyAvLyBEb24ndCBkbyB0aGlzIG9uIHRoZSBzZXJ2ZXJcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb25uZWN0aW9uID0gbmV3IFdlYlNvY2tldChgd3M6Ly8ke2xvY2F0aW9uLmhvc3Quc3BsaXQoJzonKVswXX06ODA4MGApO1xuICAgICAgICAvL2xldCBjb3VudGVyID0gMDtcbiAgICAgICAgLy9zZXRJbnRlcnZhbCgoKSA9PiB7IGNvbm5lY3Rpb24uc2VuZCgnQWxwaGEgJyArIGNvdW50ZXIrKykgfSwgMzAwMCk7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGNvbm5lY3Rpb24gfSk7XG5cblxuICAgICAgICB0aGlzLnJlZnMuYW5zd2VyLmZvY3VzKCk7XG4gICAgICAgIHRoaXMuYmVnaW5Qcm9jZXNzKCk7XG4gICAgfSxcblxuICAgIGhhbmRsZUtleVByZXNzOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgIGlmIChuZXdWYWx1ZS5sZW5ndGggPiAyIHx8IG5ld1ZhbHVlLm1hdGNoKC9cXEQvKSkge1xuICAgICAgICAgICAgdGhpcy5yZWZzLmFuc3dlci52YWx1ZSA9IHRoaXMuc3RhdGUuYW5zd2VyVmFsdWU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGFuc3dlclZhbHVlOiBuZXdWYWx1ZSB9KTtcbiAgICAgICAgaWYgKCtuZXdWYWx1ZSA9PT0gdGhpcy5zdGF0ZS5jb3JyZWN0QW5zd2VyKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMuaGFuZGxlQ29ycmVjdEFuc3dlciwgMTAwKTtcbiAgICAgICAgfVxuICAgICAgICBnZW5lcmF0ZVF1ZXN0aW9uKCk7XG4gICAgfSxcblxuICAgIGhhbmRsZUNsaWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5yZWZzLmFuc3dlci5mb2N1cygpO1xuICAgIH0sXG5cbiAgICBoYW5kbGVDb3JyZWN0QW5zd2VyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5yZWZzLmFuc3dlci52YWx1ZSA9ICcnO1xuICAgICAgICBjb25zdCBuZXdSZXN1bHRzID0gdGhpcy5zdGF0ZS5yZXN1bHRzO1xuICAgICAgICBjb25zdCBkID0gbmV3IERhdGUoKTtcbiAgICAgICAgbmV3UmVzdWx0cy5wdXNoKGQuZ2V0VGltZSgpIC0gdGhpcy5zdGF0ZS50aW1lc3RhbXApO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGFuc3dlclZhbHVlOiAnJyxcbiAgICAgICAgICAgIHJlc3VsdHM6IG5ld1Jlc3VsdHMsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAobmV3UmVzdWx0cy5sZW5ndGggPCBRVUVTVElPTlMpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRRdWVzdGlvbigpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZTogZnVuY3Rpb24ocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUucmVzdWx0cy5sZW5ndGggPT09IFFVRVNUSU9OUyAmJiB0aGlzLnN0YXRlLnByb2dyZXNzID09PSAxKSB7XG4gICAgICAgICAgICAvLyBmaW5pc2ggcHJvZ3JhbVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2RvbmUnLCB0aGlzLnN0YXRlLnJlc3VsdHMsIHRoaXMuc3RhdGUucmVzdWx0cy5yZWR1Y2UoKHN1bSwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1bSArIHZhbDtcbiAgICAgICAgICAgIH0sIDApKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHByb2dyZXNzOiAyLFxuICAgICAgICAgICAgICAgIHF1ZXN0aW9uVGV4dDogJ0RvbmUhJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncXVpeicsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUucmVzdWx0cyxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnN0YXRlLmNvbm5lY3Rpb24uc2VuZChKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RhcnRRdWVzdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdRdWVzdGlvbnM6JywgdGhpcy5zdGF0ZS5yZXN1bHRzLmxlbmd0aCk7XG4gICAgICAgIGNvbnN0IG5ld1F1ZXN0aW9uID0gZ2VuZXJhdGVRdWVzdGlvbigpO1xuICAgICAgICBjb25zdCBkID0gbmV3IERhdGUoKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjb3JyZWN0QW5zd2VyOiBuZXdRdWVzdGlvblswXSxcbiAgICAgICAgICAgIHF1ZXN0aW9uVGV4dDogbmV3UXVlc3Rpb25bMV0sXG4gICAgICAgICAgICB0aW1lc3RhbXA6IGQuZ2V0VGltZSgpLFxuICAgICAgICAgICAgcHJvZ3Jlc3M6IDEsXG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBiZWdpblByb2Nlc3M6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5xdWVzdGlvblRleHQgPT09ICcxJykge1xuICAgICAgICAgICAgdGhpcy5zdGFydFF1ZXN0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmV4dFN0ciA9IHRoaXMuc3RhdGUucXVlc3Rpb25UZXh0ID09PSAnJyA/ICczJyA6IGAkeyt0aGlzLnN0YXRlLnF1ZXN0aW9uVGV4dCAtIDF9YDtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBxdWVzdGlvblRleHQ6IG5leHRTdHIsXG4gICAgICAgIH0pO1xuICAgICAgICBzZXRUaW1lb3V0KHRoaXMuYmVnaW5Qcm9jZXNzLCAxMDAwKTtcbiAgICB9LFxuXG4gICAgcmVuZGVyVGV4dEFyZWE6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5wcm9ncmVzcyA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPSd0ZXh0QXJlYSc+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3F1ZXN0aW9uJz5cbiAgICAgICAgICAgICAgICAgICAgPHA+e3RoaXMuc3RhdGUucXVlc3Rpb25UZXh0fTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgY2xhc3NOYW1lPSdhbnN3ZXInIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUtleVByZXNzfSByZWY9J2Fuc3dlcicvPlxuICAgICAgICAgICAgPC9kaXY+O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT0ndGV4dEFyZWEnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J25vdGljZSc+XG4gICAgICAgICAgICAgICAgPHA+e3RoaXMuc3RhdGUucXVlc3Rpb25UZXh0fTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj47XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgY29uc3QgYW5zd2VyU3R5bGUgPSB7XG4gICAgICAgICAgICB3aWR0aDogdGhpcy5zdGF0ZS5wcm9ncmVzcyA9PT0gMSA/ICczMDBweCcgOiAnMCcsXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPSdxdWl6JyBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd0ZXh0QXJlYSc+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3F1ZXN0aW9uJz5cbiAgICAgICAgICAgICAgICAgICAgPHA+e3RoaXMuc3RhdGUucXVlc3Rpb25UZXh0fTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgY2xhc3NOYW1lPSdhbnN3ZXInIHN0eWxlPXthbnN3ZXJTdHlsZX0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlS2V5UHJlc3N9IHJlZj0nYW5zd2VyJy8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+O1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFF1aXo7XG4iLCJjb25zdCBfICAgICAgICAgICA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuY29uc3QgY3JlYXRlQ2xhc3MgPSByZXF1aXJlKCdjcmVhdGUtcmVhY3QtY2xhc3MnKTtcbmNvbnN0IFJlYWN0ICAgICAgID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgVGl0bGVCbG9jayA9IGNyZWF0ZUNsYXNzKHtcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IHN0eWxlID0gdGhpcy5wcm9wcy5oZWlnaHQgPyB7IGhlaWdodDogdGhpcy5wcm9wcy5oZWlnaHQgfSA6IHt9O1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2JyZWFrJyBzdHlsZT17c3R5bGV9PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfSxcblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVGl0bGVCbG9jaztcbiIsImNvbnN0IF8gICAgICAgICAgID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5jb25zdCBjcmVhdGVDbGFzcyA9IHJlcXVpcmUoJ2NyZWF0ZS1yZWFjdC1jbGFzcycpO1xuY29uc3QgUmVhY3QgICAgICAgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBUaXRsZUJsb2NrID0gY3JlYXRlQ2xhc3Moe1xuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdwYXJhZ3JhcGgnPlxuICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9LFxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBUaXRsZUJsb2NrO1xuIiwiY29uc3QgXyAgICAgICAgICAgPSByZXF1aXJlKCdsb2Rhc2gnKTtcbmNvbnN0IGNyZWF0ZUNsYXNzID0gcmVxdWlyZSgnY3JlYXRlLXJlYWN0LWNsYXNzJyk7XG5jb25zdCBSZWFjdCAgICAgICA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IFRpdGxlQmxvY2sgPSBjcmVhdGVDbGFzcyh7XG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3RpdGxlQmxvY2snPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0ncGFnZVRpdGxlJz57dGhpcy5wcm9wcy5uYW1lfTwvcD5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2J5bGluZSc+e3RoaXMucHJvcHMuZGF0ZX08L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9LFxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBUaXRsZUJsb2NrO1xuIiwiY29uc3QgXyAgICAgICAgICAgPSByZXF1aXJlKCdsb2Rhc2gnKTtcbmNvbnN0IGNyZWF0ZUNsYXNzID0gcmVxdWlyZSgnY3JlYXRlLXJlYWN0LWNsYXNzJyk7XG5jb25zdCBSZWFjdCAgICAgICA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cblxuY29uc3QgTG93QmFyID0gY3JlYXRlQ2xhc3Moe1xuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdib3R0b21iYXInPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0nY29weXJpZ2h0Jz48c3Bhbj7CqTwvc3Bhbj4gMjAxNyAtIFdpbGwgQ2xhcms8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9LFxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBMb3dCYXI7XG4iLCJjb25zdCBfICAgICAgICAgICA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuY29uc3QgY3JlYXRlQ2xhc3MgPSByZXF1aXJlKCdjcmVhdGUtcmVhY3QtY2xhc3MnKTtcbmNvbnN0IFJlYWN0ICAgICAgID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgTWFpblBhZ2UgPSBjcmVhdGVDbGFzcyh7XG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J21haW5QYWdlJz5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH0sXG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1haW5QYWdlO1xuIiwiY29uc3QgXyAgICAgICAgICAgPSByZXF1aXJlKCdsb2Rhc2gnKTtcbmNvbnN0IGN4ICAgICAgICAgID0gcmVxdWlyZSgnY2xhc3NuYW1lcycpO1xuY29uc3QgY3JlYXRlQ2xhc3MgPSByZXF1aXJlKCdjcmVhdGUtcmVhY3QtY2xhc3MnKTtcbmNvbnN0IFJlYWN0ICAgICAgID0gcmVxdWlyZSgncmVhY3QnKTtcbmNvbnN0IExpbmsgICAgICAgID0gcmVxdWlyZSgncGljby1yb3V0ZXInKS5MaW5rO1xuXG5jb25zdCBUb3BCYXIgPSBjcmVhdGVDbGFzcyh7XG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhZ2VzOiBbXSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjdXJyZW50UGFnZTogJy8nXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRDdXJyZW50UGFnZTogZnVuY3Rpb24oZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlOiBkZWNvZGVVUkkoZS5jdXJyZW50VGFyZ2V0LmhyZWYuc3BsaXQod2luZG93LmxvY2F0aW9uLm9yaWdpbilbMV0pXG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY3VycmVudFBhZ2U6IGRlY29kZVVSSSh3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdCh3aW5kb3cubG9jYXRpb24ub3JpZ2luKVsxXSlcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIHJlbmRlclBhZ2VMaW5rczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfLm1hcCh0aGlzLnByb3BzLnBhZ2VzLCAocGFnZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIDxMaW5rIGNsYXNzTmFtZT17Y3goJ3BhZ2VMaW5rJywgeyBhY3RpdmVQYWdlOiB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlID09PSBwYWdlLmxpbmsgfSl9IGhyZWY9e2Ake3BhZ2UubGlua31gfSBvbkNsaWNrPXt0aGlzLmdldEN1cnJlbnRQYWdlfT5cbiAgICAgICAgICAgICAgICB7cGFnZS5uYW1lfVxuICAgICAgICAgICAgPC9MaW5rPjtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT0ndG9wYmFyJz5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9J3NpdGVOYW1lJz5NaW5kU2V0PC9oMz5cbiAgICAgICAgICAgIDxuYXYgY2xhc3NOYW1lPSdwYWdlTGlua0xpc3QnPlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclBhZ2VMaW5rcygpfVxuICAgICAgICAgICAgPC9uYXY+XG4gICAgICAgIDwvZGl2PjtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBUb3BCYXI7XG4iXX0=
