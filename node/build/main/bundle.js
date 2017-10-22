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

    componentDidMount: function componentDidMount() {
        if (!WebSocket) {
            return;
        }
        var connection = new WebSocket('ws://' + location.host.split(':')[0] + ':8080');
        this.setState({ connection: connection });

        connection.onMessage = {};
    },

    render: function render() {
        return React.createElement('div', { className: 'pageone' });
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

var QUESTIONS = 2;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvbWFpbi9mb3Vyb2hmb3VyL2ZvdXJvaGZvdXIuanN4IiwiY2xpZW50L21haW4vbWFpbi5qc3giLCJjbGllbnQvbWFpbi9wYWdlb25lL3BhZ2VvbmUuanN4IiwiY2xpZW50L21haW4vcGFnZXR3by9wYWdldHdvLmpzeCIsImNsaWVudC9tYWluL3F1aXovcXVpei5qc3giLCJjbGllbnQvc2hhcmVkL2NvbXBvbmVudHMvYnJlYWsvYnJlYWsuanN4IiwiY2xpZW50L3NoYXJlZC9jb21wb25lbnRzL3BhcmFncmFwaC9wYXJhZ3JhcGguanN4IiwiY2xpZW50L3NoYXJlZC9jb21wb25lbnRzL3RpdGxlYmxvY2svdGl0bGVibG9jay5qc3giLCJjbGllbnQvc2hhcmVkL2xvd2Jhci9sb3diYXIuanN4IiwiY2xpZW50L3NoYXJlZC9tYWlucGFnZS9tYWlucGFnZS5qc3giLCJjbGllbnQvc2hhcmVkL3RvcGJhci90b3BiYXIuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLElBQWMsUUFBUSxRQUFSLENBQXBCO0FBQ0EsSUFBTSxjQUFjLFFBQVEsb0JBQVIsQ0FBcEI7QUFDQSxJQUFNLFFBQWMsUUFBUSxPQUFSLENBQXBCOztBQUdBLElBQU0sYUFBYSxZQUFZO0FBQzNCLHFCQUFpQiwyQkFBVztBQUN4QixlQUFPLEVBQVA7QUFHSCxLQUwwQjtBQU0zQixZQUFRLGtCQUFXO0FBQ2YsZUFBTztBQUFBO0FBQUEsY0FBSyxXQUFVLFlBQWY7QUFBQTtBQUFBLFNBQVA7QUFHSDtBQVYwQixDQUFaLENBQW5COztBQWFBLE9BQU8sT0FBUCxHQUFpQixVQUFqQjs7Ozs7QUNsQkEsSUFBTSxJQUFlLFFBQVEsUUFBUixDQUFyQjtBQUNBLElBQU0sY0FBZSxRQUFRLG9CQUFSLENBQXJCO0FBQ0EsSUFBTSxlQUFlLFFBQVEsYUFBUixFQUF1QixZQUE1QztBQUNBLElBQU0s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LElBQTlDLEVBQWYsQ0FBakIsRUFBdUYsV0FBUyxLQUFLLElBQXJHLEVBQTZHLFNBQVMsTUFBSyxjQUEzSDtBQUNGLHFCQUFLO0FBREgsYUFBUDtBQUdILFNBSk0sQ0FBUDtBQUtILEtBN0JzQjs7QUErQnZCLFlBQVEsa0JBQVc7QUFDZixlQUFPO0FBQUE7QUFBQSxjQUFLLFdBQVUsUUFBZjtBQUNIO0FBQUE7QUFBQSxrQkFBSSxXQUFVLFVBQWQ7QUFBQTtBQUFBLGFBREc7QUFFSDtBQUFBO0FBQUEsa0JBQUssV0FBVSxjQUFmO0FBQ0sscUJBQUssZUFBTDtBQURMO0FBRkcsU0FBUDtBQU1IO0FBdENzQixDQUFaLENBQWY7O0FBeUNBLE9BQU8sT0FBUCxHQUFpQixNQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjb25zdCBfICAgICAgICAgICA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuY29uc3QgY3JlYXRlQ2xhc3MgPSByZXF1aXJlKCdjcmVhdGUtcmVhY3QtY2xhc3MnKTtcbmNvbnN0IFJlYWN0ICAgICAgID0gcmVxdWlyZSgncmVhY3QnKTtcblxuXG5jb25zdCBGb3Vyb2hmb3VyID0gY3JlYXRlQ2xhc3Moe1xuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG5cbiAgICAgICAgfTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT0nZm91cm9oZm91cic+XG5cdFx0XHRGb3Vyb2hmb3VyIENvbXBvbmVudCBSZWFkeS5cbiAgICAgICAgPC9kaXY+O1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZvdXJvaGZvdXI7XG4iLCJjb25zdCBfICAgICAgICAgICAgPSByZXF1aXJlKCdsb2Rhc2gnKTtcbmNvbnN0IGNyZWF0ZUNsYXNzICA9IHJlcXVpcmUoJ2NyZWF0ZS1yZWFjdC1jbGFzcycpO1xuY29uc3QgY3JlYXRlUm91dGVyID0gcmVxdWlyZSgncGljby1yb3V0ZXInKS5jcmVhdGVSb3V0ZXI7XG5jb25zdCBMaW5rICAgICAgICAgPSByZXF1aXJlKCdwaWNvLXJvdXRlcicpLkxpbms7XG5jb25zdCBSZWFjdCAgICAgICAgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBQYWdlT25lICAgID0gcmVxdWlyZSgnLi9wYWdlb25lL3BhZ2VvbmUuanN4Jyk7XG5jb25zdCBQYWdlVHdvICAgID0gcmVxdWlyZSgnLi9wYWdldHdvL3BhZ2V0d28uanN4Jyk7XG5jb25zdCBRdWl6ICAgICAgID0gcmVxdWlyZSgnLi9xdWl6L3F1aXouanN4Jyk7XG5jb25zdCBGb3VyT2hGb3VyID0gcmVxdWlyZSgnLi9mb3Vyb2hmb3VyL2ZvdXJvaGZvdXIuanN4Jyk7XG5cbmNvbnN0IFRvcEJhciAgID0gcmVxdWlyZSgnLi4vc2hhcmVkL3RvcGJhci90b3BiYXIuanN4Jyk7XG5jb25zdCBNYWluUGFnZSA9IHJlcXVpcmUoJy4uL3NoYXJlZC9tYWlucGFnZS9tYWlucGFnZS5qc3gnKTtcbmNvbnN0IExvd0JhciAgID0gcmVxdWlyZSgnLi4vc2hhcmVkL2xvd2Jhci9sb3diYXIuanN4Jyk7XG5cbmNvbnN0IFJvdXRlciA9IGNyZWF0ZVJvdXRlcih7XG4gICAgJy8nOiA8UGFnZU9uZSAvPixcbiAgICAnL3R3byc6IDxQYWdlVHdvIC8+LFxuICAgICcvcXVpeic6IDxRdWl6IC8+LFxuICAgICcvKic6IDxNYWluUGFnZT48Rm91ck9oRm91ciAvPjwvTWFpblBhZ2U+XG59KTtcblxuY29uc3QgbmF2QmFyTGlua3MgPSBbXG4gICAge1xuICAgICAgICBuYW1lOiAnT25lJyxcbiAgICAgICAgbGluazogJy8nLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnVHdvJyxcbiAgICAgICAgbGluazogJy90d28nLFxuICAgIH0sXG5dO1xuXG5jb25zdCBNYWluID0gY3JlYXRlQ2xhc3Moe1xuXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHVybDogJy8nXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb25uZWN0aW9uOiBudWxsXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgLyppZiAoIVdlYlNvY2tldCkge1xuICAgICAgICAgICAgcmV0dXJuOyAvLyBEb24ndCBkbyB0aGlzIG9uIHRoZSBzZXJ2ZXJcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb25uZWN0aW9uID0gbmV3IFdlYlNvY2tldChgd3M6Ly8ke2xvY2F0aW9uLmhvc3Quc3BsaXQoJzonKVswXX06ODA4MGApO1xuICAgICAgICAvL2xldCBjb3VudGVyID0gMDtcbiAgICAgICAgLy9zZXRJbnRlcnZhbCgoKSA9PiB7IGNvbm5lY3Rpb24uc2VuZCgnQWxwaGEgJyArIGNvdW50ZXIrKykgfSwgMzAwMCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgY29ubmVjdGlvbiB9KTtcbiAgICAgICAgXG4gICAgICAgIGNvbm5lY3Rpb24ub25tZXNzYWdlID0gKGEsYikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYS5kYXRhKTtcbiAgICAgICAgfTsqL1xuXG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT0nbWFpbic+XG4gICAgICAgICAgICA8VG9wQmFyIHBhZ2VzPXtuYXZCYXJMaW5rc30gLz5cbiAgICAgICAgICAgIDxSb3V0ZXIgZGVmYXVsdFVybD17dGhpcy5wcm9wcy51cmx9IC8+XG4gICAgICAgIDwvZGl2PjtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBNYWluO1xuIiwiY29uc3QgXyAgICAgICAgICAgPSByZXF1aXJlKCdsb2Rhc2gnKTtcbmNvbnN0IGNyZWF0ZUNsYXNzID0gcmVxdWlyZSgnY3JlYXRlLXJlYWN0LWNsYXNzJyk7XG5jb25zdCBSZWFjdCAgICAgICA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IEJyZWFrICAgICAgPSByZXF1aXJlKCcuLi8uLi9zaGFyZWQvY29tcG9uZW50cy9icmVhay9icmVhay5qc3gnKTtcbmNvbnN0IFBhcmFncmFwaCAgPSByZXF1aXJlKCcuLi8uLi9zaGFyZWQvY29tcG9uZW50cy9wYXJhZ3JhcGgvcGFyYWdyYXBoLmpzeCcpO1xuY29uc3QgVGl0bGVCbG9jayA9IHJlcXVpcmUoJy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL3RpdGxlYmxvY2svdGl0bGVibG9jay5qc3gnKTtcblxuXG5jb25zdCBQYWdlT25lID0gY3JlYXRlQ2xhc3Moe1xuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG5cbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIVdlYlNvY2tldCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBuZXcgV2ViU29ja2V0KGB3czovLyR7bG9jYXRpb24uaG9zdC5zcGxpdCgnOicpWzBdfTo4MDgwYCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjb25uZWN0aW9uIH0pO1xuXG4gICAgICAgIGNvbm5lY3Rpb24ub25NZXNzYWdlID0gKHtcblxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPSdwYWdlb25lJz5cblxuICAgICAgICA8L2Rpdj47XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZU9uZTtcbiIsImNvbnN0IF8gICAgICAgICAgID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5jb25zdCBjcmVhdGVDbGFzcyA9IHJlcXVpcmUoJ2NyZWF0ZS1yZWFjdC1jbGFzcycpO1xuY29uc3QgUmVhY3QgICAgICAgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBCcmVhayAgICAgID0gcmVxdWlyZSgnLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYnJlYWsvYnJlYWsuanN4Jyk7XG5jb25zdCBQYXJhZ3JhcGggID0gcmVxdWlyZSgnLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvcGFyYWdyYXBoL3BhcmFncmFwaC5qc3gnKTtcbmNvbnN0IFRpdGxlQmxvY2sgPSByZXF1aXJlKCcuLi8uLi9zaGFyZWQvY29tcG9uZW50cy90aXRsZWJsb2NrL3RpdGxlYmxvY2suanN4Jyk7XG5cblxuY29uc3QgUGFnZVR3byA9IGNyZWF0ZUNsYXNzKHtcbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuXG4gICAgICAgIH07XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9J3BhZ2V0d28nPlxuXG4gICAgICAgIDwvZGl2PjtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlVHdvO1xuIiwiY29uc3QgXyAgICAgICAgICAgPSByZXF1aXJlKCdsb2Rhc2gnKTtcbmNvbnN0IGNyZWF0ZUNsYXNzID0gcmVxdWlyZSgnY3JlYXRlLXJlYWN0LWNsYXNzJyk7XG5jb25zdCBSZWFjdCAgICAgICA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IGdlbmVyYXRlUXVlc3Rpb24gPSBmdW5jdGlvbigpIHtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBjb25zdCBvbmUgPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDIwKTtcbiAgICAgICAgY29uc3QgdHdvID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgIGNvbnN0IHRocmVlID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiAyMCk7XG4gICAgICAgIGNvbnN0IG9wZXJhdG9yID0gTWF0aC5yYW5kb20oKSA+IDAuNSA/ICcrJyA6ICctJztcblxuICAgICAgICBjb25zdCBzdHJpbmcgPSBgKCR7b25lfSAqICR7dHdvfSkgJHtvcGVyYXRvcn0gJHt0aHJlZX1gO1xuICAgICAgICBjb25zdCBhbnN3ZXIgPSBldmFsKHN0cmluZyk7XG4gICAgICAgIGlmIChhbnN3ZXIgPiA5OSB8fCBhbnN3ZXIgPCAxKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW2Fuc3dlciwgYCR7c3RyaW5nfSA9YC5yZXBsYWNlKCcqJywgJ8OXJyldO1xuICAgIH1cbn07XG5cbmNvbnN0IFFVRVNUSU9OUyA9IDI7XG5cbmNvbnN0IFF1aXogPSBjcmVhdGVDbGFzcyh7XG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcblxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzdWx0czogW10sXG4gICAgICAgICAgICBhbnN3ZXJWYWx1ZTogJycsXG4gICAgICAgICAgICBjb3JyZWN0QW5zd2VyOiAwLFxuICAgICAgICAgICAgcXVlc3Rpb25UZXh0OiAnJyxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogMCxcbiAgICAgICAgICAgIHByb2dyZXNzOiAwLFxuICAgICAgICAgICAgY29ubmVjdGlvbjogbnVsbCxcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIVdlYlNvY2tldCkge1xuICAgICAgICAgICAgcmV0dXJuOyAvLyBEb24ndCBkbyB0aGlzIG9uIHRoZSBzZXJ2ZXJcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb25uZWN0aW9uID0gbmV3IFdlYlNvY2tldChgd3M6Ly8ke2xvY2F0aW9uLmhvc3Quc3BsaXQoJzonKVswXX06ODA4MGApO1xuICAgICAgICAvL2xldCBjb3VudGVyID0gMDtcbiAgICAgICAgLy9zZXRJbnRlcnZhbCgoKSA9PiB7IGNvbm5lY3Rpb24uc2VuZCgnQWxwaGEgJyArIGNvdW50ZXIrKykgfSwgMzAwMCk7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGNvbm5lY3Rpb24gfSk7XG5cblxuICAgICAgICB0aGlzLnJlZnMuYW5zd2VyLmZvY3VzKCk7XG4gICAgICAgIHRoaXMuYmVnaW5Qcm9jZXNzKCk7XG4gICAgfSxcblxuICAgIGhhbmRsZUtleVByZXNzOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgIGlmIChuZXdWYWx1ZS5sZW5ndGggPiAyIHx8IG5ld1ZhbHVlLm1hdGNoKC9cXEQvKSkge1xuICAgICAgICAgICAgdGhpcy5yZWZzLmFuc3dlci52YWx1ZSA9IHRoaXMuc3RhdGUuYW5zd2VyVmFsdWU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGFuc3dlclZhbHVlOiBuZXdWYWx1ZSB9KTtcbiAgICAgICAgaWYgKCtuZXdWYWx1ZSA9PT0gdGhpcy5zdGF0ZS5jb3JyZWN0QW5zd2VyKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMuaGFuZGxlQ29ycmVjdEFuc3dlciwgMTAwKTtcbiAgICAgICAgfVxuICAgICAgICBnZW5lcmF0ZVF1ZXN0aW9uKCk7XG4gICAgfSxcblxuICAgIGhhbmRsZUNsaWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5yZWZzLmFuc3dlci5mb2N1cygpO1xuICAgIH0sXG5cbiAgICBoYW5kbGVDb3JyZWN0QW5zd2VyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5yZWZzLmFuc3dlci52YWx1ZSA9ICcnO1xuICAgICAgICBjb25zdCBuZXdSZXN1bHRzID0gdGhpcy5zdGF0ZS5yZXN1bHRzO1xuICAgICAgICBjb25zdCBkID0gbmV3IERhdGUoKTtcbiAgICAgICAgbmV3UmVzdWx0cy5wdXNoKGQuZ2V0VGltZSgpIC0gdGhpcy5zdGF0ZS50aW1lc3RhbXApO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGFuc3dlclZhbHVlOiAnJyxcbiAgICAgICAgICAgIHJlc3VsdHM6IG5ld1Jlc3VsdHMsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAobmV3UmVzdWx0cy5sZW5ndGggPCBRVUVTVElPTlMpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRRdWVzdGlvbigpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZTogZnVuY3Rpb24ocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUucmVzdWx0cy5sZW5ndGggPT09IFFVRVNUSU9OUyAmJiB0aGlzLnN0YXRlLnByb2dyZXNzID09PSAxKSB7XG4gICAgICAgICAgICAvLyBmaW5pc2ggcHJvZ3JhbVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2RvbmUnLCB0aGlzLnN0YXRlLnJlc3VsdHMsIHRoaXMuc3RhdGUucmVzdWx0cy5yZWR1Y2UoKHN1bSwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1bSArIHZhbDtcbiAgICAgICAgICAgIH0sIDApKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHByb2dyZXNzOiAyLFxuICAgICAgICAgICAgICAgIHF1ZXN0aW9uVGV4dDogJ0RvbmUhJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncXVpeicsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUucmVzdWx0cyxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnN0YXRlLmNvbm5lY3Rpb24uc2VuZChKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RhcnRRdWVzdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdRdWVzdGlvbnM6JywgdGhpcy5zdGF0ZS5yZXN1bHRzLmxlbmd0aCk7XG4gICAgICAgIGNvbnN0IG5ld1F1ZXN0aW9uID0gZ2VuZXJhdGVRdWVzdGlvbigpO1xuICAgICAgICBjb25zdCBkID0gbmV3IERhdGUoKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjb3JyZWN0QW5zd2VyOiBuZXdRdWVzdGlvblswXSxcbiAgICAgICAgICAgIHF1ZXN0aW9uVGV4dDogbmV3UXVlc3Rpb25bMV0sXG4gICAgICAgICAgICB0aW1lc3RhbXA6IGQuZ2V0VGltZSgpLFxuICAgICAgICAgICAgcHJvZ3Jlc3M6IDEsXG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBiZWdpblByb2Nlc3M6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5xdWVzdGlvblRleHQgPT09ICcxJykge1xuICAgICAgICAgICAgdGhpcy5zdGFydFF1ZXN0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmV4dFN0ciA9IHRoaXMuc3RhdGUucXVlc3Rpb25UZXh0ID09PSAnJyA/ICczJyA6IGAkeyt0aGlzLnN0YXRlLnF1ZXN0aW9uVGV4dCAtIDF9YDtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBxdWVzdGlvblRleHQ6IG5leHRTdHIsXG4gICAgICAgIH0pO1xuICAgICAgICBzZXRUaW1lb3V0KHRoaXMuYmVnaW5Qcm9jZXNzLCAxMDAwKTtcbiAgICB9LFxuXG4gICAgcmVuZGVyVGV4dEFyZWE6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5wcm9ncmVzcyA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPSd0ZXh0QXJlYSc+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3F1ZXN0aW9uJz5cbiAgICAgICAgICAgICAgICAgICAgPHA+e3RoaXMuc3RhdGUucXVlc3Rpb25UZXh0fTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgY2xhc3NOYW1lPSdhbnN3ZXInIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUtleVByZXNzfSByZWY9J2Fuc3dlcicvPlxuICAgICAgICAgICAgPC9kaXY+O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT0ndGV4dEFyZWEnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J25vdGljZSc+XG4gICAgICAgICAgICAgICAgPHA+e3RoaXMuc3RhdGUucXVlc3Rpb25UZXh0fTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj47XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgY29uc3QgYW5zd2VyU3R5bGUgPSB7XG4gICAgICAgICAgICB3aWR0aDogdGhpcy5zdGF0ZS5wcm9ncmVzcyA9PT0gMSA/ICczMDBweCcgOiAnMCcsXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPSdxdWl6JyBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd0ZXh0QXJlYSc+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3F1ZXN0aW9uJz5cbiAgICAgICAgICAgICAgICAgICAgPHA+e3RoaXMuc3RhdGUucXVlc3Rpb25UZXh0fTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgY2xhc3NOYW1lPSdhbnN3ZXInIHN0eWxlPXthbnN3ZXJTdHlsZX0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlS2V5UHJlc3N9IHJlZj0nYW5zd2VyJy8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+O1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFF1aXo7XG4iLCJjb25zdCBfICAgICAgICAgICA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuY29uc3QgY3JlYXRlQ2xhc3MgPSByZXF1aXJlKCdjcmVhdGUtcmVhY3QtY2xhc3MnKTtcbmNvbnN0IFJlYWN0ICAgICAgID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgVGl0bGVCbG9jayA9IGNyZWF0ZUNsYXNzKHtcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IHN0eWxlID0gdGhpcy5wcm9wcy5oZWlnaHQgPyB7IGhlaWdodDogdGhpcy5wcm9wcy5oZWlnaHQgfSA6IHt9O1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2JyZWFrJyBzdHlsZT17c3R5bGV9PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfSxcblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVGl0bGVCbG9jaztcbiIsImNvbnN0IF8gICAgICAgICAgID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5jb25zdCBjcmVhdGVDbGFzcyA9IHJlcXVpcmUoJ2NyZWF0ZS1yZWFjdC1jbGFzcycpO1xuY29uc3QgUmVhY3QgICAgICAgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBUaXRsZUJsb2NrID0gY3JlYXRlQ2xhc3Moe1xuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdwYXJhZ3JhcGgnPlxuICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9LFxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBUaXRsZUJsb2NrO1xuIiwiY29uc3QgXyAgICAgICAgICAgPSByZXF1aXJlKCdsb2Rhc2gnKTtcbmNvbnN0IGNyZWF0ZUNsYXNzID0gcmVxdWlyZSgnY3JlYXRlLXJlYWN0LWNsYXNzJyk7XG5jb25zdCBSZWFjdCAgICAgICA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IFRpdGxlQmxvY2sgPSBjcmVhdGVDbGFzcyh7XG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3RpdGxlQmxvY2snPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0ncGFnZVRpdGxlJz57dGhpcy5wcm9wcy5uYW1lfTwvcD5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2J5bGluZSc+e3RoaXMucHJvcHMuZGF0ZX08L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9LFxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBUaXRsZUJsb2NrO1xuIiwiY29uc3QgXyAgICAgICAgICAgPSByZXF1aXJlKCdsb2Rhc2gnKTtcbmNvbnN0IGNyZWF0ZUNsYXNzID0gcmVxdWlyZSgnY3JlYXRlLXJlYWN0LWNsYXNzJyk7XG5jb25zdCBSZWFjdCAgICAgICA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cblxuY29uc3QgTG93QmFyID0gY3JlYXRlQ2xhc3Moe1xuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdib3R0b21iYXInPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0nY29weXJpZ2h0Jz48c3Bhbj7CqTwvc3Bhbj4gMjAxNyAtIFdpbGwgQ2xhcms8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9LFxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBMb3dCYXI7XG4iLCJjb25zdCBfICAgICAgICAgICA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuY29uc3QgY3JlYXRlQ2xhc3MgPSByZXF1aXJlKCdjcmVhdGUtcmVhY3QtY2xhc3MnKTtcbmNvbnN0IFJlYWN0ICAgICAgID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgTWFpblBhZ2UgPSBjcmVhdGVDbGFzcyh7XG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J21haW5QYWdlJz5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH0sXG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1haW5QYWdlO1xuIiwiY29uc3QgXyAgICAgICAgICAgPSByZXF1aXJlKCdsb2Rhc2gnKTtcbmNvbnN0IGN4ICAgICAgICAgID0gcmVxdWlyZSgnY2xhc3NuYW1lcycpO1xuY29uc3QgY3JlYXRlQ2xhc3MgPSByZXF1aXJlKCdjcmVhdGUtcmVhY3QtY2xhc3MnKTtcbmNvbnN0IFJlYWN0ICAgICAgID0gcmVxdWlyZSgncmVhY3QnKTtcbmNvbnN0IExpbmsgICAgICAgID0gcmVxdWlyZSgncGljby1yb3V0ZXInKS5MaW5rO1xuXG5jb25zdCBUb3BCYXIgPSBjcmVhdGVDbGFzcyh7XG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhZ2VzOiBbXSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjdXJyZW50UGFnZTogJy8nXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRDdXJyZW50UGFnZTogZnVuY3Rpb24oZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlOiBkZWNvZGVVUkkoZS5jdXJyZW50VGFyZ2V0LmhyZWYuc3BsaXQod2luZG93LmxvY2F0aW9uLm9yaWdpbilbMV0pXG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY3VycmVudFBhZ2U6IGRlY29kZVVSSSh3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdCh3aW5kb3cubG9jYXRpb24ub3JpZ2luKVsxXSlcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIHJlbmRlclBhZ2VMaW5rczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfLm1hcCh0aGlzLnByb3BzLnBhZ2VzLCAocGFnZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIDxMaW5rIGNsYXNzTmFtZT17Y3goJ3BhZ2VMaW5rJywgeyBhY3RpdmVQYWdlOiB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlID09PSBwYWdlLmxpbmsgfSl9IGhyZWY9e2Ake3BhZ2UubGlua31gfSBvbkNsaWNrPXt0aGlzLmdldEN1cnJlbnRQYWdlfT5cbiAgICAgICAgICAgICAgICB7cGFnZS5uYW1lfVxuICAgICAgICAgICAgPC9MaW5rPjtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT0ndG9wYmFyJz5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9J3NpdGVOYW1lJz5NaW5kU2V0PC9oMz5cbiAgICAgICAgICAgIDxuYXYgY2xhc3NOYW1lPSdwYWdlTGlua0xpc3QnPlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclBhZ2VMaW5rcygpfVxuICAgICAgICAgICAgPC9uYXY+XG4gICAgICAgIDwvZGl2PjtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBUb3BCYXI7XG4iXX0=
