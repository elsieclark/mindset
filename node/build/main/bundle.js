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

var Break = require('../../shared/components/break/break.jsx');
var Paragraph = require('../../shared/components/paragraph/paragraph.jsx');
var TitleBlock = require('../../shared/components/titleblock/titleblock.jsx');

var PageOne = createClass({

    getDefaultProps: function getDefaultProps() {
        return {};
    },

    getInitialState: function getInitialState() {
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
                    quality: 76
                },
                '18': {
                    alpha: 2,
                    beta: 4,
                    gamma: 3,
                    delta: 6,
                    theta: 3,
                    quality: 76
                },
                '19': {
                    alpha: 1,
                    beta: 4,
                    gamma: 5,
                    delta: 3,
                    theta: 4,
                    quality: 76
                }
            },
            lowestMuseTimestamp: Infinity
        };
    },

    componentDidMount: function componentDidMount() {
        var _this = this;

        if (!WebSocket) {
            return;
        }
        var connection = new WebSocket('ws://' + location.host.split(':')[0] + ':8080');
        this.setState({ connection: connection });

        connection.onMessage = function (e) {
            var msg = e.data;
            if (msg.type === 'museValue') {
                if (msg.timestamp < _this.state.lowestMuseTimestamp) {
                    _this.setState({ lowestMuseTimestamp: msg.timestamp });
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
    },

    renderBars: function renderBars() {
        return _.map(this.state.museData, function (key, val) {
            var barStyle = {
                order: key
            };
            return React.createElement('div', { className: 'bar' });
        });
    },

    render: function render() {
        return React.createElement(
            'div',
            { className: 'pageone' },
            React.createElement(
                'div',
                { className: 'container' },
                React.createElement(
                    'div',
                    { className: 'graph' },
                    this.renderBars()
                )
            )
        );
    }
});

module.exports = PageOne;

},{"../../shared/components/break/break.jsx":5,"../../shared/components/paragraph/paragraph.jsx":6,"../../shared/components/titleblock/titleblock.jsx":7,"create-react-class":"create-react-class","lodash":"lodash","react":"react"}],3:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvbWFpbi9mb3Vyb2hmb3VyL2ZvdXJvaGZvdXIuanN4IiwiY2xpZW50L21haW4vbWFpbi5qc3giLCJjbGllbnQvbWFpbi9wYWdlb25lL3BhZ2VvbmUuanN4IiwiY2xpZW50L21haW4vcGFnZXR3by9wYWdldHdvLmpzeCIsImNsaWVudC9tYWluL3F1aXovcXVpei5qc3giLCJjbGllbnQvc2hhcmVkL2NvbXBvbmVudHMvYnJlYWsvYnJlYWsuanN4IiwiY2xpZW50L3NoYXJlZC9jb21wb25lbnRzL3BhcmFncmFwaC9wYXJhZ3JhcGguanN4IiwiY2xpZW50L3NoYXJlZC9jb21wb25lbnRzL3RpdGxlYmxvY2svdGl0bGVibG9jay5qc3giLCJjbGllbnQvc2hhcmVkL2xvd2Jhci9sb3diYXIuanN4IiwiY2xpZW50L3NoYXJlZC9tYWlucGFnZS9tYWlucGFnZS5qc3giLCJjbGllbnQvc2hhcmVkL3RvcGJhci90b3BiYXIuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLElBQWMsUUFBUSxRQUFSLENBQXBCO0FBQ0EsSUFBTSxjQUFjLFFBQVEsb0JBQVIsQ0FBcEI7QUFDQSxJQUFNLFFBQWMsUUFBUSxPQUFSLENBQXBCOztBQUdBLElBQU0sYUFBYSxZQUFZO0FBQzNCLHFCQUFpQiwyQkFBVztBQUN4QixlQUFPLEVBQVA7QUFHSCxLQUwwQjtBQU0zQixZQUFRLGtCQUFXO0FBQ2YsZUFBTztBQUFBO0FBQUEsY0FBSyxXQUFVLFlBQWY7QUFBQTtBQUFBLFNBQVA7QUFHSDtBQVYwQixDQUFaLENBQW5COztBQWFBLE9BQU8sT0FBUCxHQUFpQixVQUFqQjs7Ozs7QUNsQkEsSUFBTSxJQUFlLFFBQVEsUUFBUixDQUFyQjtBQUNBLElBQU0sY0FBZSxRQUFRLG9CQUFSLENBQXJCO0FBQ0EsSUFBTSxlQUFlLFFBQVEsYUFBUixFQUF1QixZQUE1QztBQUNBLElBQU0s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QUEzQyxFQUFtRCxDQUFuRCxDQUFWO0FBREgsU0FBZDtBQUdILEtBckJzQjs7QUF1QnZCLHFCQUFpQiwyQkFBVztBQUFBOztBQUN4QixlQUFPLEVBQUUsR0FBRixDQUFNLEtBQUssS0FBTCxDQUFXLEtBQWpCLEVBQXdCLFVBQUMsSUFBRCxFQUFVO0FBQ3JDLG1CQUFPO0FBQUMsb0JBQUQ7QUFBQSxrQkFBTSxXQUFXLEdBQUcsVUFBSCxFQUFlLEVBQUUsWUFBWSxNQUFLLEtBQUwsQ0FBVyxXQUFYLEtBQTJCLEtBQUssSUFBOUMsRUFBZixDQUFqQixFQUF1RixXQUFTLEtBQUssSUFBckcsRUFBNkcsU0FBUyxNQUFLLGNBQTNIO0FBQ0YscUJBQUs7QUFESCxhQUFQO0FBR0gsU0FKTSxDQUFQO0FBS0gsS0E3QnNCOztBQStCdkIsWUFBUSxrQkFBVztBQUNmLGVBQU87QUFBQTtBQUFBLGNBQUssV0FBVSxRQUFmO0FBQ0g7QUFBQTtBQUFBLGtCQUFJLFdBQVUsVUFBZDtBQUFBO0FBQUEsYUFERztBQUVIO0FBQUE7QUFBQSxrQkFBSyxXQUFVLGNBQWY7QUFDSyxxQkFBSyxlQUFMO0FBREw7QUFGRyxTQUFQO0FBTUg7QUF0Q3NCLENBQVosQ0FBZjs7QUF5Q0EsT0FBTyxPQUFQLEdBQWlCLE1BQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNvbnN0IF8gICAgICAgICAgID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5jb25zdCBjcmVhdGVDbGFzcyA9IHJlcXVpcmUoJ2NyZWF0ZS1yZWFjdC1jbGFzcycpO1xuY29uc3QgUmVhY3QgICAgICAgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5cbmNvbnN0IEZvdXJvaGZvdXIgPSBjcmVhdGVDbGFzcyh7XG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcblxuICAgICAgICB9O1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPSdmb3Vyb2hmb3VyJz5cblx0XHRcdEZvdXJvaGZvdXIgQ29tcG9uZW50IFJlYWR5LlxuICAgICAgICA8L2Rpdj47XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRm91cm9oZm91cjtcbiIsImNvbnN0IF8gICAgICAgICAgICA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuY29uc3QgY3JlYXRlQ2xhc3MgID0gcmVxdWlyZSgnY3JlYXRlLXJlYWN0LWNsYXNzJyk7XG5jb25zdCBjcmVhdGVSb3V0ZXIgPSByZXF1aXJlKCdwaWNvLXJvdXRlcicpLmNyZWF0ZVJvdXRlcjtcbmNvbnN0IExpbmsgICAgICAgICA9IHJlcXVpcmUoJ3BpY28tcm91dGVyJykuTGluaztcbmNvbnN0IFJlYWN0ICAgICAgICA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IFBhZ2VPbmUgICAgPSByZXF1aXJlKCcuL3BhZ2VvbmUvcGFnZW9uZS5qc3gnKTtcbmNvbnN0IFBhZ2VUd28gICAgPSByZXF1aXJlKCcuL3BhZ2V0d28vcGFnZXR3by5qc3gnKTtcbmNvbnN0IFF1aXogICAgICAgPSByZXF1aXJlKCcuL3F1aXovcXVpei5qc3gnKTtcbmNvbnN0IEZvdXJPaEZvdXIgPSByZXF1aXJlKCcuL2ZvdXJvaGZvdXIvZm91cm9oZm91ci5qc3gnKTtcblxuY29uc3QgVG9wQmFyICAgPSByZXF1aXJlKCcuLi9zaGFyZWQvdG9wYmFyL3RvcGJhci5qc3gnKTtcbmNvbnN0IE1haW5QYWdlID0gcmVxdWlyZSgnLi4vc2hhcmVkL21haW5wYWdlL21haW5wYWdlLmpzeCcpO1xuY29uc3QgTG93QmFyICAgPSByZXF1aXJlKCcuLi9zaGFyZWQvbG93YmFyL2xvd2Jhci5qc3gnKTtcblxuY29uc3QgUm91dGVyID0gY3JlYXRlUm91dGVyKHtcbiAgICAnLyc6IDxQYWdlT25lIC8+LFxuICAgICcvdHdvJzogPFBhZ2VUd28gLz4sXG4gICAgJy9xdWl6JzogPFF1aXogLz4sXG4gICAgJy8qJzogPE1haW5QYWdlPjxGb3VyT2hGb3VyIC8+PC9NYWluUGFnZT5cbn0pO1xuXG5jb25zdCBuYXZCYXJMaW5rcyA9IFtcbiAgICB7XG4gICAgICAgIG5hbWU6ICdPbmUnLFxuICAgICAgICBsaW5rOiAnLycsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdUd28nLFxuICAgICAgICBsaW5rOiAnL3R3bycsXG4gICAgfSxcbl07XG5cbmNvbnN0IE1haW4gPSBjcmVhdGVDbGFzcyh7XG5cbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdXJsOiAnLydcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbm5lY3Rpb246IG51bGxcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvKmlmICghV2ViU29ja2V0KSB7XG4gICAgICAgICAgICByZXR1cm47IC8vIERvbid0IGRvIHRoaXMgb24gdGhlIHNlcnZlclxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBuZXcgV2ViU29ja2V0KGB3czovLyR7bG9jYXRpb24uaG9zdC5zcGxpdCgnOicpWzBdfTo4MDgwYCk7XG4gICAgICAgIC8vbGV0IGNvdW50ZXIgPSAwO1xuICAgICAgICAvL3NldEludGVydmFsKCgpID0+IHsgY29ubmVjdGlvbi5zZW5kKCdBbHBoYSAnICsgY291bnRlcisrKSB9LCAzMDAwKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjb25uZWN0aW9uIH0pO1xuICAgICAgICBcbiAgICAgICAgY29ubmVjdGlvbi5vbm1lc3NhZ2UgPSAoYSxiKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhLmRhdGEpO1xuICAgICAgICB9OyovXG5cbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPSdtYWluJz5cbiAgICAgICAgICAgIDxUb3BCYXIgcGFnZXM9e25hdkJhckxpbmtzfSAvPlxuICAgICAgICAgICAgPFJvdXRlciBkZWZhdWx0VXJsPXt0aGlzLnByb3BzLnVybH0gLz5cbiAgICAgICAgPC9kaXY+O1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1haW47XG4iLCJjb25zdCBfICAgICAgICAgICA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuY29uc3QgY3JlYXRlQ2xhc3MgPSByZXF1aXJlKCdjcmVhdGUtcmVhY3QtY2xhc3MnKTtcbmNvbnN0IFJlYWN0ICAgICAgID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgQnJlYWsgICAgICA9IHJlcXVpcmUoJy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2JyZWFrL2JyZWFrLmpzeCcpO1xuY29uc3QgUGFyYWdyYXBoICA9IHJlcXVpcmUoJy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL3BhcmFncmFwaC9wYXJhZ3JhcGguanN4Jyk7XG5jb25zdCBUaXRsZUJsb2NrID0gcmVxdWlyZSgnLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvdGl0bGVibG9jay90aXRsZWJsb2NrLmpzeCcpO1xuXG5cbmNvbnN0IFBhZ2VPbmUgPSBjcmVhdGVDbGFzcyh7XG5cbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBxdWl6RGF0YToge30sXG4gICAgICAgICAgICBoaWdoZXN0UXVpelNjb3JlOiAwLFxuICAgICAgICAgICAgbXVzZURhdGE6IHtcbiAgICAgICAgICAgICAgICAnMTcnOiB7XG4gICAgICAgICAgICAgICAgICAgIGFscGhhOiAzLFxuICAgICAgICAgICAgICAgICAgICBiZXRhOiA0LFxuICAgICAgICAgICAgICAgICAgICBnYW1tYTogMyxcbiAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDYsXG4gICAgICAgICAgICAgICAgICAgIHRoZXRhOiA0LFxuICAgICAgICAgICAgICAgICAgICBxdWFsaXR5OiA3NixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICcxOCc6IHtcbiAgICAgICAgICAgICAgICAgICAgYWxwaGE6IDIsXG4gICAgICAgICAgICAgICAgICAgIGJldGE6IDQsXG4gICAgICAgICAgICAgICAgICAgIGdhbW1hOiAzLFxuICAgICAgICAgICAgICAgICAgICBkZWx0YTogNixcbiAgICAgICAgICAgICAgICAgICAgdGhldGE6IDMsXG4gICAgICAgICAgICAgICAgICAgIHF1YWxpdHk6IDc2LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJzE5Jzoge1xuICAgICAgICAgICAgICAgICAgICBhbHBoYTogMSxcbiAgICAgICAgICAgICAgICAgICAgYmV0YTogNCxcbiAgICAgICAgICAgICAgICAgICAgZ2FtbWE6IDUsXG4gICAgICAgICAgICAgICAgICAgIGRlbHRhOiAzLFxuICAgICAgICAgICAgICAgICAgICB0aGV0YTogNCxcbiAgICAgICAgICAgICAgICAgICAgcXVhbGl0eTogNzYsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsb3dlc3RNdXNlVGltZXN0YW1wOiBJbmZpbml0eSxcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIVdlYlNvY2tldCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBuZXcgV2ViU29ja2V0KGB3czovLyR7bG9jYXRpb24uaG9zdC5zcGxpdCgnOicpWzBdfTo4MDgwYCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjb25uZWN0aW9uIH0pO1xuXG4gICAgICAgIGNvbm5lY3Rpb24ub25NZXNzYWdlID0gKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1zZyA9IGUuZGF0YTtcbiAgICAgICAgICAgIGlmIChtc2cudHlwZSA9PT0gJ211c2VWYWx1ZScpIHtcbiAgICAgICAgICAgICAgICBpZiAobXNnLnRpbWVzdGFtcCA8IHRoaXMuc3RhdGUubG93ZXN0TXVzZVRpbWVzdGFtcCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgbG93ZXN0TXVzZVRpbWVzdGFtcDogbXNnLnRpbWVzdGFtcCB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgbXVzZURhdGEgPSB0aGlzLnN0YXRlLm11c2VEYXRhO1xuICAgICAgICAgICAgICAgIG11c2VEYXRhW21zZy50aW1lc3RhbXBdID0gbXNnLnZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobXNnLnR5cGUgPT09ICdxdWl6VmFsdWUnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHF1aXpEYXRhOiBtc2cudmFsdWUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIHJlbmRlckJhcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gXy5tYXAodGhpcy5zdGF0ZS5tdXNlRGF0YSwgKGtleSwgdmFsKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBiYXJTdHlsZSA9IHtcbiAgICAgICAgICAgICAgICBvcmRlcjoga2V5LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT0nYmFyJz5cblxuICAgICAgICAgICAgPC9kaXY+O1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPSdwYWdlb25lJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb250YWluZXInPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdncmFwaCc+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckJhcnMoKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj47XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZU9uZTtcbiIsImNvbnN0IF8gICAgICAgICAgID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5jb25zdCBjcmVhdGVDbGFzcyA9IHJlcXVpcmUoJ2NyZWF0ZS1yZWFjdC1jbGFzcycpO1xuY29uc3QgUmVhY3QgICAgICAgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBCcmVhayAgICAgID0gcmVxdWlyZSgnLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYnJlYWsvYnJlYWsuanN4Jyk7XG5jb25zdCBQYXJhZ3JhcGggID0gcmVxdWlyZSgnLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvcGFyYWdyYXBoL3BhcmFncmFwaC5qc3gnKTtcbmNvbnN0IFRpdGxlQmxvY2sgPSByZXF1aXJlKCcuLi8uLi9zaGFyZWQvY29tcG9uZW50cy90aXRsZWJsb2NrL3RpdGxlYmxvY2suanN4Jyk7XG5cblxuY29uc3QgUGFnZVR3byA9IGNyZWF0ZUNsYXNzKHtcbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuXG4gICAgICAgIH07XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9J3BhZ2V0d28nPlxuXG4gICAgICAgIDwvZGl2PjtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlVHdvO1xuIiwiY29uc3QgXyAgICAgICAgICAgPSByZXF1aXJlKCdsb2Rhc2gnKTtcbmNvbnN0IGNyZWF0ZUNsYXNzID0gcmVxdWlyZSgnY3JlYXRlLXJlYWN0LWNsYXNzJyk7XG5jb25zdCBSZWFjdCAgICAgICA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IGdlbmVyYXRlUXVlc3Rpb24gPSBmdW5jdGlvbigpIHtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBjb25zdCBvbmUgPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDIwKTtcbiAgICAgICAgY29uc3QgdHdvID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgIGNvbnN0IHRocmVlID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiAyMCk7XG4gICAgICAgIGNvbnN0IG9wZXJhdG9yID0gTWF0aC5yYW5kb20oKSA+IDAuNSA/ICcrJyA6ICctJztcblxuICAgICAgICBjb25zdCBzdHJpbmcgPSBgKCR7b25lfSAqICR7dHdvfSkgJHtvcGVyYXRvcn0gJHt0aHJlZX1gO1xuICAgICAgICBjb25zdCBhbnN3ZXIgPSBldmFsKHN0cmluZyk7XG4gICAgICAgIGlmIChhbnN3ZXIgPiA5OSB8fCBhbnN3ZXIgPCAxKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW2Fuc3dlciwgYCR7c3RyaW5nfSA9YC5yZXBsYWNlKCcqJywgJ8OXJyldO1xuICAgIH1cbn07XG5cbmNvbnN0IFFVRVNUSU9OUyA9IDEwO1xuXG5jb25zdCBRdWl6ID0gY3JlYXRlQ2xhc3Moe1xuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG5cbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3VsdHM6IFtdLFxuICAgICAgICAgICAgYW5zd2VyVmFsdWU6ICcnLFxuICAgICAgICAgICAgY29ycmVjdEFuc3dlcjogMCxcbiAgICAgICAgICAgIHF1ZXN0aW9uVGV4dDogJycsXG4gICAgICAgICAgICB0aW1lc3RhbXA6IDAsXG4gICAgICAgICAgICBwcm9ncmVzczogMCxcbiAgICAgICAgICAgIGNvbm5lY3Rpb246IG51bGwsXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCFXZWJTb2NrZXQpIHtcbiAgICAgICAgICAgIHJldHVybjsgLy8gRG9uJ3QgZG8gdGhpcyBvbiB0aGUgc2VydmVyXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29ubmVjdGlvbiA9IG5ldyBXZWJTb2NrZXQoYHdzOi8vJHtsb2NhdGlvbi5ob3N0LnNwbGl0KCc6JylbMF19OjgwODBgKTtcbiAgICAgICAgLy9sZXQgY291bnRlciA9IDA7XG4gICAgICAgIC8vc2V0SW50ZXJ2YWwoKCkgPT4geyBjb25uZWN0aW9uLnNlbmQoJ0FscGhhICcgKyBjb3VudGVyKyspIH0sIDMwMDApO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjb25uZWN0aW9uIH0pO1xuXG5cbiAgICAgICAgdGhpcy5yZWZzLmFuc3dlci5mb2N1cygpO1xuICAgICAgICB0aGlzLmJlZ2luUHJvY2VzcygpO1xuICAgIH0sXG5cbiAgICBoYW5kbGVLZXlQcmVzczogZnVuY3Rpb24oZSkge1xuICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICBpZiAobmV3VmFsdWUubGVuZ3RoID4gMiB8fCBuZXdWYWx1ZS5tYXRjaCgvXFxELykpIHtcbiAgICAgICAgICAgIHRoaXMucmVmcy5hbnN3ZXIudmFsdWUgPSB0aGlzLnN0YXRlLmFuc3dlclZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBhbnN3ZXJWYWx1ZTogbmV3VmFsdWUgfSk7XG4gICAgICAgIGlmICgrbmV3VmFsdWUgPT09IHRoaXMuc3RhdGUuY29ycmVjdEFuc3dlcikge1xuICAgICAgICAgICAgc2V0VGltZW91dCh0aGlzLmhhbmRsZUNvcnJlY3RBbnN3ZXIsIDEwMCk7XG4gICAgICAgIH1cbiAgICAgICAgZ2VuZXJhdGVRdWVzdGlvbigpO1xuICAgIH0sXG5cbiAgICBoYW5kbGVDbGljazogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucmVmcy5hbnN3ZXIuZm9jdXMoKTtcbiAgICB9LFxuXG4gICAgaGFuZGxlQ29ycmVjdEFuc3dlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucmVmcy5hbnN3ZXIudmFsdWUgPSAnJztcbiAgICAgICAgY29uc3QgbmV3UmVzdWx0cyA9IHRoaXMuc3RhdGUucmVzdWx0cztcbiAgICAgICAgY29uc3QgZCA9IG5ldyBEYXRlKCk7XG4gICAgICAgIG5ld1Jlc3VsdHMucHVzaChkLmdldFRpbWUoKSAtIHRoaXMuc3RhdGUudGltZXN0YW1wKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBhbnN3ZXJWYWx1ZTogJycsXG4gICAgICAgICAgICByZXN1bHRzOiBuZXdSZXN1bHRzLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKG5ld1Jlc3VsdHMubGVuZ3RoIDwgUVVFU1RJT05TKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0UXVlc3Rpb24oKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjb21wb25lbnREaWRVcGRhdGU6IGZ1bmN0aW9uKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnJlc3VsdHMubGVuZ3RoID09PSBRVUVTVElPTlMgJiYgdGhpcy5zdGF0ZS5wcm9ncmVzcyA9PT0gMSkge1xuICAgICAgICAgICAgLy8gZmluaXNoIHByb2dyYW1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkb25lJywgdGhpcy5zdGF0ZS5yZXN1bHRzLCB0aGlzLnN0YXRlLnJlc3VsdHMucmVkdWNlKChzdW0sIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdW0gKyB2YWw7XG4gICAgICAgICAgICB9LCAwKSk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBwcm9ncmVzczogMixcbiAgICAgICAgICAgICAgICBxdWVzdGlvblRleHQ6ICdEb25lIScsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3F1aXonLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLnJlc3VsdHMsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5jb25uZWN0aW9uLnNlbmQoSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHN0YXJ0UXVlc3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnUXVlc3Rpb25zOicsIHRoaXMuc3RhdGUucmVzdWx0cy5sZW5ndGgpO1xuICAgICAgICBjb25zdCBuZXdRdWVzdGlvbiA9IGdlbmVyYXRlUXVlc3Rpb24oKTtcbiAgICAgICAgY29uc3QgZCA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY29ycmVjdEFuc3dlcjogbmV3UXVlc3Rpb25bMF0sXG4gICAgICAgICAgICBxdWVzdGlvblRleHQ6IG5ld1F1ZXN0aW9uWzFdLFxuICAgICAgICAgICAgdGltZXN0YW1wOiBkLmdldFRpbWUoKSxcbiAgICAgICAgICAgIHByb2dyZXNzOiAxLFxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgYmVnaW5Qcm9jZXNzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUucXVlc3Rpb25UZXh0ID09PSAnMScpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRRdWVzdGlvbigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5leHRTdHIgPSB0aGlzLnN0YXRlLnF1ZXN0aW9uVGV4dCA9PT0gJycgPyAnMycgOiBgJHsrdGhpcy5zdGF0ZS5xdWVzdGlvblRleHQgLSAxfWA7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcXVlc3Rpb25UZXh0OiBuZXh0U3RyLFxuICAgICAgICB9KTtcbiAgICAgICAgc2V0VGltZW91dCh0aGlzLmJlZ2luUHJvY2VzcywgMTAwMCk7XG4gICAgfSxcblxuICAgIHJlbmRlclRleHRBcmVhOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUucHJvZ3Jlc3MgPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT0ndGV4dEFyZWEnPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdxdWVzdGlvbic+XG4gICAgICAgICAgICAgICAgICAgIDxwPnt0aGlzLnN0YXRlLnF1ZXN0aW9uVGV4dH08L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIGNsYXNzTmFtZT0nYW5zd2VyJyBvbkNoYW5nZT17dGhpcy5oYW5kbGVLZXlQcmVzc30gcmVmPSdhbnN3ZXInLz5cbiAgICAgICAgICAgIDwvZGl2PjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9J3RleHRBcmVhJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdub3RpY2UnPlxuICAgICAgICAgICAgICAgIDxwPnt0aGlzLnN0YXRlLnF1ZXN0aW9uVGV4dH08L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+O1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGNvbnN0IGFuc3dlclN0eWxlID0ge1xuICAgICAgICAgICAgd2lkdGg6IHRoaXMuc3RhdGUucHJvZ3Jlc3MgPT09IDEgPyAnMzAwcHgnIDogJzAnLFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT0ncXVpeicgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndGV4dEFyZWEnPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdxdWVzdGlvbic+XG4gICAgICAgICAgICAgICAgICAgIDxwPnt0aGlzLnN0YXRlLnF1ZXN0aW9uVGV4dH08L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIGNsYXNzTmFtZT0nYW5zd2VyJyBzdHlsZT17YW5zd2VyU3R5bGV9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUtleVByZXNzfSByZWY9J2Fuc3dlcicvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PjtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBRdWl6O1xuIiwiY29uc3QgXyAgICAgICAgICAgPSByZXF1aXJlKCdsb2Rhc2gnKTtcbmNvbnN0IGNyZWF0ZUNsYXNzID0gcmVxdWlyZSgnY3JlYXRlLXJlYWN0LWNsYXNzJyk7XG5jb25zdCBSZWFjdCAgICAgICA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IFRpdGxlQmxvY2sgPSBjcmVhdGVDbGFzcyh7XG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBzdHlsZSA9IHRoaXMucHJvcHMuaGVpZ2h0ID8geyBoZWlnaHQ6IHRoaXMucHJvcHMuaGVpZ2h0IH0gOiB7fTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdicmVhaycgc3R5bGU9e3N0eWxlfT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH0sXG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRpdGxlQmxvY2s7XG4iLCJjb25zdCBfICAgICAgICAgICA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuY29uc3QgY3JlYXRlQ2xhc3MgPSByZXF1aXJlKCdjcmVhdGUtcmVhY3QtY2xhc3MnKTtcbmNvbnN0IFJlYWN0ICAgICAgID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgVGl0bGVCbG9jayA9IGNyZWF0ZUNsYXNzKHtcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFyYWdyYXBoJz5cbiAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfSxcblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVGl0bGVCbG9jaztcbiIsImNvbnN0IF8gICAgICAgICAgID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5jb25zdCBjcmVhdGVDbGFzcyA9IHJlcXVpcmUoJ2NyZWF0ZS1yZWFjdC1jbGFzcycpO1xuY29uc3QgUmVhY3QgICAgICAgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBUaXRsZUJsb2NrID0gY3JlYXRlQ2xhc3Moe1xuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd0aXRsZUJsb2NrJz5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J3BhZ2VUaXRsZSc+e3RoaXMucHJvcHMubmFtZX08L3A+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdieWxpbmUnPnt0aGlzLnByb3BzLmRhdGV9PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfSxcblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVGl0bGVCbG9jaztcbiIsImNvbnN0IF8gICAgICAgICAgID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5jb25zdCBjcmVhdGVDbGFzcyA9IHJlcXVpcmUoJ2NyZWF0ZS1yZWFjdC1jbGFzcycpO1xuY29uc3QgUmVhY3QgICAgICAgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5cbmNvbnN0IExvd0JhciA9IGNyZWF0ZUNsYXNzKHtcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYm90dG9tYmFyJz5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2NvcHlyaWdodCc+PHNwYW4+wqk8L3NwYW4+IDIwMTcgLSBXaWxsIENsYXJrPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfSxcblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTG93QmFyO1xuIiwiY29uc3QgXyAgICAgICAgICAgPSByZXF1aXJlKCdsb2Rhc2gnKTtcbmNvbnN0IGNyZWF0ZUNsYXNzID0gcmVxdWlyZSgnY3JlYXRlLXJlYWN0LWNsYXNzJyk7XG5jb25zdCBSZWFjdCAgICAgICA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IE1haW5QYWdlID0gY3JlYXRlQ2xhc3Moe1xuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdtYWluUGFnZSc+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9LFxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBNYWluUGFnZTtcbiIsImNvbnN0IF8gICAgICAgICAgID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5jb25zdCBjeCAgICAgICAgICA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKTtcbmNvbnN0IGNyZWF0ZUNsYXNzID0gcmVxdWlyZSgnY3JlYXRlLXJlYWN0LWNsYXNzJyk7XG5jb25zdCBSZWFjdCAgICAgICA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5jb25zdCBMaW5rICAgICAgICA9IHJlcXVpcmUoJ3BpY28tcm91dGVyJykuTGluaztcblxuY29uc3QgVG9wQmFyID0gY3JlYXRlQ2xhc3Moe1xuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwYWdlczogW10sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY3VycmVudFBhZ2U6ICcvJ1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0Q3VycmVudFBhZ2U6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjdXJyZW50UGFnZTogZGVjb2RlVVJJKGUuY3VycmVudFRhcmdldC5ocmVmLnNwbGl0KHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pWzFdKVxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlOiBkZWNvZGVVUkkod2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQod2luZG93LmxvY2F0aW9uLm9yaWdpbilbMV0pXG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICByZW5kZXJQYWdlTGlua3M6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gXy5tYXAodGhpcy5wcm9wcy5wYWdlcywgKHBhZ2UpID0+IHtcbiAgICAgICAgICAgIHJldHVybiA8TGluayBjbGFzc05hbWU9e2N4KCdwYWdlTGluaycsIHsgYWN0aXZlUGFnZTogdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSA9PT0gcGFnZS5saW5rIH0pfSBocmVmPXtgJHtwYWdlLmxpbmt9YH0gb25DbGljaz17dGhpcy5nZXRDdXJyZW50UGFnZX0+XG4gICAgICAgICAgICAgICAge3BhZ2UubmFtZX1cbiAgICAgICAgICAgIDwvTGluaz47XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9J3RvcGJhcic+XG4gICAgICAgICAgICA8aDMgY2xhc3NOYW1lPSdzaXRlTmFtZSc+TWluZFNldDwvaDM+XG4gICAgICAgICAgICA8bmF2IGNsYXNzTmFtZT0ncGFnZUxpbmtMaXN0Jz5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJQYWdlTGlua3MoKX1cbiAgICAgICAgICAgIDwvbmF2PlxuICAgICAgICA8L2Rpdj47XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVG9wQmFyO1xuIl19
