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
        if (!WebSocket) {
            return; // Don't do this on the server
        }
        var connection = new WebSocket('ws://' + location.host.split(':')[0] + ':8080');
        //let counter = 0;
        //setInterval(() => { connection.send('Alpha ' + counter++) }, 3000);

        this.setState({ connection: connection });

        connection.onmessage = function (a, b) {
            console.log(a.data);
        };
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

function generateQuestion() {
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
}

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
            this.state.connection.send(message);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvbWFpbi9mb3Vyb2hmb3VyL2ZvdXJvaGZvdXIuanN4IiwiY2xpZW50L21haW4vbWFpbi5qc3giLCJjbGllbnQvbWFpbi9wYWdlb25lL3BhZ2VvbmUuanN4IiwiY2xpZW50L21haW4vcGFnZXR3by9wYWdldHdvLmpzeCIsImNsaWVudC9tYWluL3F1aXovcXVpei5qc3giLCJjbGllbnQvc2hhcmVkL2NvbXBvbmVudHMvYnJlYWsvYnJlYWsuanN4IiwiY2xpZW50L3NoYXJlZC9jb21wb25lbnRzL3BhcmFncmFwaC9wYXJhZ3JhcGguanN4IiwiY2xpZW50L3NoYXJlZC9jb21wb25lbnRzL3RpdGxlYmxvY2svdGl0bGVibG9jay5qc3giLCJjbGllbnQvc2hhcmVkL2xvd2Jhci9sb3diYXIuanN4IiwiY2xpZW50L3NoYXJlZC9tYWlucGFnZS9tYWlucGFnZS5qc3giLCJjbGllbnQvc2hhcmVkL3RvcGJhci90b3BiYXIuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLElBQWMsUUFBUSxRQUFSLENBQXBCO0FBQ0EsSUFBTSxjQUFjLFFBQVEsb0JBQVIsQ0FBcEI7QUFDQSxJQUFNLFFBQWMsUUFBUSxPQUFSLENBQXBCOztBQUdBLElBQU0sYUFBYSxZQUFZO0FBQzlCLGtCQUFpQiwyQkFBVTtBQUMxQixTQUFPLEVBQVA7QUFHQSxFQUw2QjtBQU05QixTQUFRLGtCQUFVO0FBQ2pCLFNBQU87QUFBQTtBQUFBLEtBQUssV0FBVSxZQUFmO0FBQUE7QUFBQSxHQUFQO0FBR0E7QUFWNkIsQ0FBWixDQUFuQjs7QUFhQSxPQUFPLE9BQVAsR0FBaUIsVUFBakI7Ozs7O0FDbEJBLElBQU0sSUFBZSxRQUFRLFFBQVIsQ0FBckI7QUFDQSxJQUFNLGNBQWUsUUFBUSxvQkFBUixDQUFyQjtBQUNBLElBQU0sZUFBZSxRQUFRLGFBQVIsRUFBdUIsWUFBNUM7QUFDQSxJQUFN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LEVBQWYsQ0FBakIsRUFBdUYsV0FBUyxLQUFLLElBQXJHLEVBQTZHLFNBQVMsTUFBSyxjQUEzSDtBQUNGLHFCQUFLO0FBREgsYUFBUDtBQUdILFNBSk0sQ0FBUDtBQUtILEtBN0JzQjs7QUErQjFCLFlBQVEsa0JBQVc7QUFDbEIsZUFBTztBQUFBO0FBQUEsY0FBSyxXQUFVLFFBQWY7QUFDRztBQUFBO0FBQUEsa0JBQUksV0FBVSxVQUFkO0FBQUE7QUFBQSxhQURIO0FBRU47QUFBQTtBQUFBLGtCQUFLLFdBQVUsY0FBZjtBQUNjLHFCQUFLLGVBQUw7QUFEZDtBQUZNLFNBQVA7QUFNQTtBQXRDeUIsQ0FBWixDQUFmOztBQXlDQSxPQUFPLE9BQVAsR0FBaUIsTUFBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY29uc3QgXyAgICAgICAgICAgPSByZXF1aXJlKCdsb2Rhc2gnKTtcbmNvbnN0IGNyZWF0ZUNsYXNzID0gcmVxdWlyZSgnY3JlYXRlLXJlYWN0LWNsYXNzJyk7XG5jb25zdCBSZWFjdCAgICAgICA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cblxuY29uc3QgRm91cm9oZm91ciA9IGNyZWF0ZUNsYXNzKHtcblx0Z2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpe1xuXHRcdHJldHVybiB7XG5cblx0XHR9O1xuXHR9LFxuXHRyZW5kZXI6IGZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIDxkaXYgY2xhc3NOYW1lPSdmb3Vyb2hmb3VyJz5cblx0XHRcdEZvdXJvaGZvdXIgQ29tcG9uZW50IFJlYWR5LlxuXHRcdDwvZGl2Pjtcblx0fVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRm91cm9oZm91cjtcbiIsImNvbnN0IF8gICAgICAgICAgICA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuY29uc3QgY3JlYXRlQ2xhc3MgID0gcmVxdWlyZSgnY3JlYXRlLXJlYWN0LWNsYXNzJyk7XG5jb25zdCBjcmVhdGVSb3V0ZXIgPSByZXF1aXJlKCdwaWNvLXJvdXRlcicpLmNyZWF0ZVJvdXRlcjtcbmNvbnN0IExpbmsgICAgICAgICA9IHJlcXVpcmUoJ3BpY28tcm91dGVyJykuTGluaztcbmNvbnN0IFJlYWN0ICAgICAgICA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IFBhZ2VPbmUgICAgPSByZXF1aXJlKCcuL3BhZ2VvbmUvcGFnZW9uZS5qc3gnKTtcbmNvbnN0IFBhZ2VUd28gICAgPSByZXF1aXJlKCcuL3BhZ2V0d28vcGFnZXR3by5qc3gnKTtcbmNvbnN0IFF1aXogICAgICAgPSByZXF1aXJlKCcuL3F1aXovcXVpei5qc3gnKTtcbmNvbnN0IEZvdXJPaEZvdXIgPSByZXF1aXJlKCcuL2ZvdXJvaGZvdXIvZm91cm9oZm91ci5qc3gnKTtcblxuY29uc3QgVG9wQmFyICAgPSByZXF1aXJlKCcuLi9zaGFyZWQvdG9wYmFyL3RvcGJhci5qc3gnKTtcbmNvbnN0IE1haW5QYWdlID0gcmVxdWlyZSgnLi4vc2hhcmVkL21haW5wYWdlL21haW5wYWdlLmpzeCcpO1xuY29uc3QgTG93QmFyICAgPSByZXF1aXJlKCcuLi9zaGFyZWQvbG93YmFyL2xvd2Jhci5qc3gnKTtcblxuY29uc3QgUm91dGVyID0gY3JlYXRlUm91dGVyKHtcblx0Jy8nOiA8UGFnZU9uZSAvPixcbiAgICAnL3R3byc6IDxQYWdlVHdvIC8+LFxuICAgICcvcXVpeic6IDxRdWl6IC8+LFxuICAgICcvKic6IDxNYWluUGFnZT48Rm91ck9oRm91ciAvPjwvTWFpblBhZ2U+XG59KTtcblxuY29uc3QgbmF2QmFyTGlua3MgPSBbXG4gICAge1xuICAgICAgICBuYW1lOiAnT25lJyxcbiAgICAgICAgbGluazogJy8nLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnVHdvJyxcbiAgICAgICAgbGluazogJy90d28nLFxuICAgIH0sXG5dO1xuXG5jb25zdCBNYWluID0gY3JlYXRlQ2xhc3Moe1xuICAgIFxuXHRnZXREZWZhdWx0UHJvcHMgOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4ge1xuICAgICAgICAgICAgdXJsOiAnLydcblx0XHR9O1xuXHR9LFxuICAgIFxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb25uZWN0aW9uOiBudWxsXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghV2ViU29ja2V0KSB7XG4gICAgICAgICAgICByZXR1cm47IC8vIERvbid0IGRvIHRoaXMgb24gdGhlIHNlcnZlclxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBuZXcgV2ViU29ja2V0KGB3czovLyR7bG9jYXRpb24uaG9zdC5zcGxpdCgnOicpWzBdfTo4MDgwYCk7XG4gICAgICAgIC8vbGV0IGNvdW50ZXIgPSAwO1xuICAgICAgICAvL3NldEludGVydmFsKCgpID0+IHsgY29ubmVjdGlvbi5zZW5kKCdBbHBoYSAnICsgY291bnRlcisrKSB9LCAzMDAwKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjb25uZWN0aW9uIH0pO1xuICAgICAgICBcbiAgICAgICAgY29ubmVjdGlvbi5vbm1lc3NhZ2UgPSAoYSxiKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhLmRhdGEpO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICB9LFxuICAgIFxuXHRyZW5kZXIgOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gPGRpdiBjbGFzc05hbWU9J21haW4nPlxuICAgICAgICAgICAgPFRvcEJhciBwYWdlcz17bmF2QmFyTGlua3N9IC8+XG5cdFx0XHQ8Um91dGVyIGRlZmF1bHRVcmw9e3RoaXMucHJvcHMudXJsfSAvPlxuXHRcdDwvZGl2PlxuXHR9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBNYWluO1xuIiwiY29uc3QgXyAgICAgICAgICAgPSByZXF1aXJlKCdsb2Rhc2gnKTtcbmNvbnN0IGNyZWF0ZUNsYXNzID0gcmVxdWlyZSgnY3JlYXRlLXJlYWN0LWNsYXNzJyk7XG5jb25zdCBSZWFjdCAgICAgICA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IEJyZWFrICAgICAgPSByZXF1aXJlKCcuLi8uLi9zaGFyZWQvY29tcG9uZW50cy9icmVhay9icmVhay5qc3gnKTtcbmNvbnN0IFBhcmFncmFwaCAgPSByZXF1aXJlKCcuLi8uLi9zaGFyZWQvY29tcG9uZW50cy9wYXJhZ3JhcGgvcGFyYWdyYXBoLmpzeCcpO1xuY29uc3QgVGl0bGVCbG9jayA9IHJlcXVpcmUoJy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL3RpdGxlYmxvY2svdGl0bGVibG9jay5qc3gnKTtcblxuXG5jb25zdCBQYWdlT25lID0gY3JlYXRlQ2xhc3Moe1xuXHRnZXREZWZhdWx0UHJvcHMgOiBmdW5jdGlvbigpe1xuXHRcdHJldHVybiB7XG5cblx0XHR9O1xuXHR9LFxuXHRyZW5kZXIgOiBmdW5jdGlvbigpe1xuXHRcdHJldHVybiA8ZGl2IGNsYXNzTmFtZT0ncGFnZW9uZSc+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICA8L2Rpdj5cblx0fVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZU9uZTtcbiIsImNvbnN0IF8gICAgICAgICAgID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5jb25zdCBjcmVhdGVDbGFzcyA9IHJlcXVpcmUoJ2NyZWF0ZS1yZWFjdC1jbGFzcycpO1xuY29uc3QgUmVhY3QgICAgICAgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBCcmVhayAgICAgID0gcmVxdWlyZSgnLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYnJlYWsvYnJlYWsuanN4Jyk7XG5jb25zdCBQYXJhZ3JhcGggID0gcmVxdWlyZSgnLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvcGFyYWdyYXBoL3BhcmFncmFwaC5qc3gnKTtcbmNvbnN0IFRpdGxlQmxvY2sgPSByZXF1aXJlKCcuLi8uLi9zaGFyZWQvY29tcG9uZW50cy90aXRsZWJsb2NrL3RpdGxlYmxvY2suanN4Jyk7XG5cblxuY29uc3QgUGFnZVR3byA9IGNyZWF0ZUNsYXNzKHtcblx0Z2V0RGVmYXVsdFByb3BzIDogZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4ge1xuXG5cdFx0fTtcblx0fSxcblx0cmVuZGVyIDogZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4gPGRpdiBjbGFzc05hbWU9J3BhZ2V0d28nPlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgPC9kaXY+XG5cdH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBhZ2VUd287XG4iLCJjb25zdCBfICAgICAgICAgICA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuY29uc3QgY3JlYXRlQ2xhc3MgPSByZXF1aXJlKCdjcmVhdGUtcmVhY3QtY2xhc3MnKTtcbmNvbnN0IFJlYWN0ICAgICAgID0gcmVxdWlyZSgncmVhY3QnKTtcblxuZnVuY3Rpb24gZ2VuZXJhdGVRdWVzdGlvbigpIHtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBjb25zdCBvbmUgPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDIwKTtcbiAgICAgICAgY29uc3QgdHdvID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgIGNvbnN0IHRocmVlID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiAyMCk7XG4gICAgICAgIGNvbnN0IG9wZXJhdG9yID0gTWF0aC5yYW5kb20oKSA+IDAuNSA/ICcrJyA6ICctJztcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHN0cmluZyA9IGAoJHtvbmV9ICogJHt0d299KSAke29wZXJhdG9yfSAke3RocmVlfWA7XG4gICAgICAgIGNvbnN0IGFuc3dlciA9IGV2YWwoc3RyaW5nKTtcbiAgICAgICAgaWYgKGFuc3dlciA+IDk5IHx8IGFuc3dlciA8IDEpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbYW5zd2VyLCBgJHtzdHJpbmd9ID1gLnJlcGxhY2UoJyonLCAnw5cnKV07XG4gICAgfVxufVxuXG5jb25zdCBRVUVTVElPTlMgPSAyO1xuXG5jb25zdCBRdWl6ID0gY3JlYXRlQ2xhc3Moe1xuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIHtcblxuICAgICAgICB9O1xuICAgIH0sXG4gICAgXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3VsdHM6IFtdLFxuICAgICAgICAgICAgYW5zd2VyVmFsdWU6ICcnLFxuICAgICAgICAgICAgY29ycmVjdEFuc3dlcjogMCxcbiAgICAgICAgICAgIHF1ZXN0aW9uVGV4dDogJycsXG4gICAgICAgICAgICB0aW1lc3RhbXA6IDAsXG4gICAgICAgICAgICBwcm9ncmVzczogMCxcbiAgICAgICAgICAgIGNvbm5lY3Rpb246IG51bGwsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCFXZWJTb2NrZXQpIHtcbiAgICAgICAgICAgIHJldHVybjsgLy8gRG9uJ3QgZG8gdGhpcyBvbiB0aGUgc2VydmVyXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29ubmVjdGlvbiA9IG5ldyBXZWJTb2NrZXQoYHdzOi8vJHtsb2NhdGlvbi5ob3N0LnNwbGl0KCc6JylbMF19OjgwODBgKTtcbiAgICAgICAgLy9sZXQgY291bnRlciA9IDA7XG4gICAgICAgIC8vc2V0SW50ZXJ2YWwoKCkgPT4geyBjb25uZWN0aW9uLnNlbmQoJ0FscGhhICcgKyBjb3VudGVyKyspIH0sIDMwMDApO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGNvbm5lY3Rpb24gfSk7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgdGhpcy5yZWZzLmFuc3dlci5mb2N1cygpO1xuICAgICAgICB0aGlzLmJlZ2luUHJvY2VzcygpO1xuICAgIH0sXG4gICAgXG4gICAgaGFuZGxlS2V5UHJlc3M6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgaWYgKG5ld1ZhbHVlLmxlbmd0aCA+IDIgfHwgbmV3VmFsdWUubWF0Y2goL1xcRC8pKSB7XG4gICAgICAgICAgICB0aGlzLnJlZnMuYW5zd2VyLnZhbHVlID0gdGhpcy5zdGF0ZS5hbnN3ZXJWYWx1ZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgYW5zd2VyVmFsdWU6IG5ld1ZhbHVlIH0pO1xuICAgICAgICBpZiAoK25ld1ZhbHVlID09PSB0aGlzLnN0YXRlLmNvcnJlY3RBbnN3ZXIpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQodGhpcy5oYW5kbGVDb3JyZWN0QW5zd2VyLCAxMDApO1xuICAgICAgICB9XG4gICAgICAgIGdlbmVyYXRlUXVlc3Rpb24oKTtcbiAgICB9LFxuICAgIFxuICAgIGhhbmRsZUNsaWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5yZWZzLmFuc3dlci5mb2N1cygpO1xuICAgIH0sXG4gICAgXG4gICAgaGFuZGxlQ29ycmVjdEFuc3dlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucmVmcy5hbnN3ZXIudmFsdWUgPSAnJztcbiAgICAgICAgY29uc3QgbmV3UmVzdWx0cyA9IHRoaXMuc3RhdGUucmVzdWx0cztcbiAgICAgICAgY29uc3QgZCA9IG5ldyBEYXRlKCk7XG4gICAgICAgIG5ld1Jlc3VsdHMucHVzaChkLmdldFRpbWUoKSAtIHRoaXMuc3RhdGUudGltZXN0YW1wKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBhbnN3ZXJWYWx1ZTogJycsXG4gICAgICAgICAgICByZXN1bHRzOiBuZXdSZXN1bHRzLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKG5ld1Jlc3VsdHMubGVuZ3RoIDwgUVVFU1RJT05TKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0UXVlc3Rpb24oKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXG4gICAgY29tcG9uZW50RGlkVXBkYXRlOiBmdW5jdGlvbihwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5yZXN1bHRzLmxlbmd0aCA9PT0gUVVFU1RJT05TICYmIHRoaXMuc3RhdGUucHJvZ3Jlc3MgPT09IDEpIHtcbiAgICAgICAgICAgIC8vIGZpbmlzaCBwcm9ncmFtXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZG9uZScsIHRoaXMuc3RhdGUucmVzdWx0cywgdGhpcy5zdGF0ZS5yZXN1bHRzLnJlZHVjZSgoc3VtLHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdW0gKyB2YWw7XG4gICAgICAgICAgICB9LCAwKSk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBwcm9ncmVzczogMixcbiAgICAgICAgICAgICAgICBxdWVzdGlvblRleHQ6ICdEb25lIScsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3F1aXonLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLnJlc3VsdHMsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5jb25uZWN0aW9uLnNlbmQobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFxuICAgIHN0YXJ0UXVlc3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnUXVlc3Rpb25zOicsIHRoaXMuc3RhdGUucmVzdWx0cy5sZW5ndGgpXG4gICAgICAgIGNvbnN0IG5ld1F1ZXN0aW9uID0gZ2VuZXJhdGVRdWVzdGlvbigpO1xuICAgICAgICBjb25zdCBkID0gbmV3IERhdGUoKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjb3JyZWN0QW5zd2VyOiBuZXdRdWVzdGlvblswXSxcbiAgICAgICAgICAgIHF1ZXN0aW9uVGV4dDogbmV3UXVlc3Rpb25bMV0sXG4gICAgICAgICAgICB0aW1lc3RhbXA6IGQuZ2V0VGltZSgpLFxuICAgICAgICAgICAgcHJvZ3Jlc3M6IDEsXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgXG4gICAgYmVnaW5Qcm9jZXNzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUucXVlc3Rpb25UZXh0ID09PSAnMScpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRRdWVzdGlvbigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5leHRTdHIgPSB0aGlzLnN0YXRlLnF1ZXN0aW9uVGV4dCA9PT0gJycgPyAnMycgOiBgJHsrdGhpcy5zdGF0ZS5xdWVzdGlvblRleHQgLSAxfWA7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcXVlc3Rpb25UZXh0OiBuZXh0U3RyLFxuICAgICAgICB9KTtcbiAgICAgICAgc2V0VGltZW91dCh0aGlzLmJlZ2luUHJvY2VzcywgMTAwMCk7XG4gICAgfSxcbiAgICBcbiAgICByZW5kZXJUZXh0QXJlYTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnByb2dyZXNzID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9J3RleHRBcmVhJz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncXVlc3Rpb24nPlxuICAgICAgICAgICAgICAgICAgICA8cD57dGhpcy5zdGF0ZS5xdWVzdGlvblRleHR9PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBjbGFzc05hbWU9J2Fuc3dlcicgb25DaGFuZ2U9e3RoaXMuaGFuZGxlS2V5UHJlc3N9IHJlZj0nYW5zd2VyJy8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9J3RleHRBcmVhJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdub3RpY2UnPlxuICAgICAgICAgICAgICAgIDxwPnt0aGlzLnN0YXRlLnF1ZXN0aW9uVGV4dH08L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgfSxcbiAgICBcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCl7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBhbnN3ZXJTdHlsZSA9IHtcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLnN0YXRlLnByb2dyZXNzID09PSAxID8gJzMwMHB4JyA6ICcwJyxcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT0ncXVpeicgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndGV4dEFyZWEnPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdxdWVzdGlvbic+XG4gICAgICAgICAgICAgICAgICAgIDxwPnt0aGlzLnN0YXRlLnF1ZXN0aW9uVGV4dH08L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIGNsYXNzTmFtZT0nYW5zd2VyJyBzdHlsZT17YW5zd2VyU3R5bGV9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUtleVByZXNzfSByZWY9J2Fuc3dlcicvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PjtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBRdWl6O1xuIiwiY29uc3QgXyAgICAgICAgICAgPSByZXF1aXJlKCdsb2Rhc2gnKTtcbmNvbnN0IGNyZWF0ZUNsYXNzID0gcmVxdWlyZSgnY3JlYXRlLXJlYWN0LWNsYXNzJyk7XG5jb25zdCBSZWFjdCAgICAgICA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IFRpdGxlQmxvY2sgPSBjcmVhdGVDbGFzcyh7XG4gICAgXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IHN0eWxlID0gdGhpcy5wcm9wcy5oZWlnaHQgPyB7IGhlaWdodDogdGhpcy5wcm9wcy5oZWlnaHQgfSA6IHt9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYnJlYWsnIHN0eWxlPXtzdHlsZX0+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9LFxuICAgIFxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVGl0bGVCbG9jaztcbiIsImNvbnN0IF8gICAgICAgICAgID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5jb25zdCBjcmVhdGVDbGFzcyA9IHJlcXVpcmUoJ2NyZWF0ZS1yZWFjdC1jbGFzcycpO1xuY29uc3QgUmVhY3QgICAgICAgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBUaXRsZUJsb2NrID0gY3JlYXRlQ2xhc3Moe1xuICAgIFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFyYWdyYXBoJz5cbiAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfSxcbiAgICBcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRpdGxlQmxvY2s7XG4iLCJjb25zdCBfICAgICAgICAgICA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuY29uc3QgY3JlYXRlQ2xhc3MgPSByZXF1aXJlKCdjcmVhdGUtcmVhY3QtY2xhc3MnKTtcbmNvbnN0IFJlYWN0ICAgICAgID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgVGl0bGVCbG9jayA9IGNyZWF0ZUNsYXNzKHtcbiAgICBcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3RpdGxlQmxvY2snPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0ncGFnZVRpdGxlJz57dGhpcy5wcm9wcy5uYW1lfTwvcD5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2J5bGluZSc+e3RoaXMucHJvcHMuZGF0ZX08L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9LFxuICAgIFxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVGl0bGVCbG9jaztcbiIsImNvbnN0IF8gICAgICAgICAgID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5jb25zdCBjcmVhdGVDbGFzcyA9IHJlcXVpcmUoJ2NyZWF0ZS1yZWFjdC1jbGFzcycpO1xuY29uc3QgUmVhY3QgICAgICAgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5cbmNvbnN0IExvd0JhciA9IGNyZWF0ZUNsYXNzKHtcbiAgICBcblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICggICBcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdib3R0b21iYXInPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0nY29weXJpZ2h0Jz48c3Bhbj7CqTwvc3Bhbj4gMjAxNyAtIFdpbGwgQ2xhcms8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9LFxuICAgIFxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTG93QmFyO1xuIiwiY29uc3QgXyAgICAgICAgICAgPSByZXF1aXJlKCdsb2Rhc2gnKTtcbmNvbnN0IGNyZWF0ZUNsYXNzID0gcmVxdWlyZSgnY3JlYXRlLXJlYWN0LWNsYXNzJyk7XG5jb25zdCBSZWFjdCAgICAgICA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IE1haW5QYWdlID0gY3JlYXRlQ2xhc3Moe1xuICAgIFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAoICAgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbWFpblBhZ2UnPlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfSxcbiAgICBcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1haW5QYWdlO1xuIiwiY29uc3QgXyAgICAgICAgICAgPSByZXF1aXJlKCdsb2Rhc2gnKTtcbmNvbnN0IGN4ICAgICAgICAgID0gcmVxdWlyZSgnY2xhc3NuYW1lcycpO1xuY29uc3QgY3JlYXRlQ2xhc3MgPSByZXF1aXJlKCdjcmVhdGUtcmVhY3QtY2xhc3MnKTtcbmNvbnN0IFJlYWN0ICAgICAgID0gcmVxdWlyZSgncmVhY3QnKTtcbmNvbnN0IExpbmsgICAgICAgID0gcmVxdWlyZSgncGljby1yb3V0ZXInKS5MaW5rO1xuXG5jb25zdCBUb3BCYXIgPSBjcmVhdGVDbGFzcyh7XG5cdGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHtcbiAgICAgICAgICAgIHBhZ2VzOiBbXSxcblx0XHR9O1xuXHR9LFxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjdXJyZW50UGFnZTogJy8nXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRDdXJyZW50UGFnZTogZnVuY3Rpb24oZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlOiBkZWNvZGVVUkkoZS5jdXJyZW50VGFyZ2V0LmhyZWYuc3BsaXQod2luZG93LmxvY2F0aW9uLm9yaWdpbilbMV0pXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlOiBkZWNvZGVVUkkod2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQod2luZG93LmxvY2F0aW9uLm9yaWdpbilbMV0pXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgXG4gICAgcmVuZGVyUGFnZUxpbmtzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF8ubWFwKHRoaXMucHJvcHMucGFnZXMsIChwYWdlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gPExpbmsgY2xhc3NOYW1lPXtjeCgncGFnZUxpbmsnLCB7IGFjdGl2ZVBhZ2U6IHRoaXMuc3RhdGUuY3VycmVudFBhZ2UgPT09IHBhZ2UubGluayB9KX0gaHJlZj17YCR7cGFnZS5saW5rfWB9IG9uQ2xpY2s9e3RoaXMuZ2V0Q3VycmVudFBhZ2V9PlxuICAgICAgICAgICAgICAgIHtwYWdlLm5hbWV9XG4gICAgICAgICAgICA8L0xpbms+XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIDxkaXYgY2xhc3NOYW1lPSd0b3BiYXInPlxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT0nc2l0ZU5hbWUnPk1pbmRTZXQ8L2gzPlxuXHRcdFx0PG5hdiBjbGFzc05hbWU9J3BhZ2VMaW5rTGlzdCc+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyUGFnZUxpbmtzKCl9XG5cdFx0XHQ8L25hdj5cblx0XHQ8L2Rpdj47XG5cdH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRvcEJhcjtcbiJdfQ==
