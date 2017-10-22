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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvbWFpbi9mb3Vyb2hmb3VyL2ZvdXJvaGZvdXIuanN4IiwiY2xpZW50L21haW4vbWFpbi5qc3giLCJjbGllbnQvbWFpbi9wYWdlb25lL3BhZ2VvbmUuanN4IiwiY2xpZW50L21haW4vcGFnZXR3by9wYWdldHdvLmpzeCIsImNsaWVudC9tYWluL3F1aXovcXVpei5qc3giLCJjbGllbnQvc2hhcmVkL2NvbXBvbmVudHMvYnJlYWsvYnJlYWsuanN4IiwiY2xpZW50L3NoYXJlZC9jb21wb25lbnRzL3BhcmFncmFwaC9wYXJhZ3JhcGguanN4IiwiY2xpZW50L3NoYXJlZC9jb21wb25lbnRzL3RpdGxlYmxvY2svdGl0bGVibG9jay5qc3giLCJjbGllbnQvc2hhcmVkL2xvd2Jhci9sb3diYXIuanN4IiwiY2xpZW50L3NoYXJlZC9tYWlucGFnZS9tYWlucGFnZS5qc3giLCJjbGllbnQvc2hhcmVkL3RvcGJhci90b3BiYXIuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLElBQWMsUUFBUSxRQUFSLENBQXBCO0FBQ0EsSUFBTSxjQUFjLFFBQVEsb0JBQVIsQ0FBcEI7QUFDQSxJQUFNLFFBQWMsUUFBUSxPQUFSLENBQXBCOztBQUdBLElBQU0sYUFBYSxZQUFZO0FBQzlCLGtCQUFpQiwyQkFBVTtBQUMxQixTQUFPLEVBQVA7QUFHQSxFQUw2QjtBQU05QixTQUFRLGtCQUFVO0FBQ2pCLFNBQU87QUFBQTtBQUFBLEtBQUssV0FBVSxZQUFmO0FBQUE7QUFBQSxHQUFQO0FBR0E7QUFWNkIsQ0FBWixDQUFuQjs7QUFhQSxPQUFPLE9BQVAsR0FBaUIsVUFBakI7Ozs7O0FDbEJBLElBQU0sSUFBZSxRQUFRLFFBQVIsQ0FBckI7QUFDQSxJQUFNLGNBQWUsUUFBUSxvQkFBUixDQUFyQjtBQUNBLElBQU0sZUFBZSxRQUFRLGFBQVIsRUFBdUIsWUFBNUM7QUFDQSxJQUFN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akIsRUFBdUYsV0FBUyxLQUFLLElBQXJHLEVBQTZHLFNBQVMsTUFBSyxjQUEzSDtBQUNGLHFCQUFLO0FBREgsYUFBUDtBQUdILFNBSk0sQ0FBUDtBQUtILEtBN0JzQjs7QUErQjFCLFlBQVEsa0JBQVc7QUFDbEIsZUFBTztBQUFBO0FBQUEsY0FBSyxXQUFVLFFBQWY7QUFDRztBQUFBO0FBQUEsa0JBQUksV0FBVSxVQUFkO0FBQUE7QUFBQSxhQURIO0FBRU47QUFBQTtBQUFBLGtCQUFLLFdBQVUsY0FBZjtBQUNjLHFCQUFLLGVBQUw7QUFEZDtBQUZNLFNBQVA7QUFNQTtBQXRDeUIsQ0FBWixDQUFmOztBQXlDQSxPQUFPLE9BQVAsR0FBaUIsTUFBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY29uc3QgXyAgICAgICAgICAgPSByZXF1aXJlKCdsb2Rhc2gnKTtcbmNvbnN0IGNyZWF0ZUNsYXNzID0gcmVxdWlyZSgnY3JlYXRlLXJlYWN0LWNsYXNzJyk7XG5jb25zdCBSZWFjdCAgICAgICA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cblxuY29uc3QgRm91cm9oZm91ciA9IGNyZWF0ZUNsYXNzKHtcblx0Z2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpe1xuXHRcdHJldHVybiB7XG5cblx0XHR9O1xuXHR9LFxuXHRyZW5kZXI6IGZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIDxkaXYgY2xhc3NOYW1lPSdmb3Vyb2hmb3VyJz5cblx0XHRcdEZvdXJvaGZvdXIgQ29tcG9uZW50IFJlYWR5LlxuXHRcdDwvZGl2Pjtcblx0fVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRm91cm9oZm91cjtcbiIsImNvbnN0IF8gICAgICAgICAgICA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuY29uc3QgY3JlYXRlQ2xhc3MgID0gcmVxdWlyZSgnY3JlYXRlLXJlYWN0LWNsYXNzJyk7XG5jb25zdCBjcmVhdGVSb3V0ZXIgPSByZXF1aXJlKCdwaWNvLXJvdXRlcicpLmNyZWF0ZVJvdXRlcjtcbmNvbnN0IExpbmsgICAgICAgICA9IHJlcXVpcmUoJ3BpY28tcm91dGVyJykuTGluaztcbmNvbnN0IFJlYWN0ICAgICAgICA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IFBhZ2VPbmUgICAgPSByZXF1aXJlKCcuL3BhZ2VvbmUvcGFnZW9uZS5qc3gnKTtcbmNvbnN0IFBhZ2VUd28gICAgPSByZXF1aXJlKCcuL3BhZ2V0d28vcGFnZXR3by5qc3gnKTtcbmNvbnN0IFF1aXogICAgICAgPSByZXF1aXJlKCcuL3F1aXovcXVpei5qc3gnKTtcbmNvbnN0IEZvdXJPaEZvdXIgPSByZXF1aXJlKCcuL2ZvdXJvaGZvdXIvZm91cm9oZm91ci5qc3gnKTtcblxuY29uc3QgVG9wQmFyICAgPSByZXF1aXJlKCcuLi9zaGFyZWQvdG9wYmFyL3RvcGJhci5qc3gnKTtcbmNvbnN0IE1haW5QYWdlID0gcmVxdWlyZSgnLi4vc2hhcmVkL21haW5wYWdlL21haW5wYWdlLmpzeCcpO1xuY29uc3QgTG93QmFyICAgPSByZXF1aXJlKCcuLi9zaGFyZWQvbG93YmFyL2xvd2Jhci5qc3gnKTtcblxuY29uc3QgUm91dGVyID0gY3JlYXRlUm91dGVyKHtcblx0Jy8nOiA8UGFnZU9uZSAvPixcbiAgICAnL3R3byc6IDxQYWdlVHdvIC8+LFxuICAgICcvcXVpeic6IDxRdWl6IC8+LFxuICAgICcvKic6IDxNYWluUGFnZT48Rm91ck9oRm91ciAvPjwvTWFpblBhZ2U+XG59KTtcblxuY29uc3QgbmF2QmFyTGlua3MgPSBbXG4gICAge1xuICAgICAgICBuYW1lOiAnT25lJyxcbiAgICAgICAgbGluazogJy8nLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnVHdvJyxcbiAgICAgICAgbGluazogJy90d28nLFxuICAgIH0sXG5dO1xuXG5jb25zdCBNYWluID0gY3JlYXRlQ2xhc3Moe1xuICAgIFxuXHRnZXREZWZhdWx0UHJvcHMgOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4ge1xuICAgICAgICAgICAgdXJsOiAnLydcblx0XHR9O1xuXHR9LFxuICAgIFxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb25uZWN0aW9uOiBudWxsXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8qaWYgKCFXZWJTb2NrZXQpIHtcbiAgICAgICAgICAgIHJldHVybjsgLy8gRG9uJ3QgZG8gdGhpcyBvbiB0aGUgc2VydmVyXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29ubmVjdGlvbiA9IG5ldyBXZWJTb2NrZXQoYHdzOi8vJHtsb2NhdGlvbi5ob3N0LnNwbGl0KCc6JylbMF19OjgwODBgKTtcbiAgICAgICAgLy9sZXQgY291bnRlciA9IDA7XG4gICAgICAgIC8vc2V0SW50ZXJ2YWwoKCkgPT4geyBjb25uZWN0aW9uLnNlbmQoJ0FscGhhICcgKyBjb3VudGVyKyspIH0sIDMwMDApO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGNvbm5lY3Rpb24gfSk7XG4gICAgICAgIFxuICAgICAgICBjb25uZWN0aW9uLm9ubWVzc2FnZSA9IChhLGIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGEuZGF0YSk7XG4gICAgICAgIH07Ki9cbiAgICAgICAgXG4gICAgfSxcbiAgICBcblx0cmVuZGVyIDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIDxkaXYgY2xhc3NOYW1lPSdtYWluJz5cbiAgICAgICAgICAgIDxUb3BCYXIgcGFnZXM9e25hdkJhckxpbmtzfSAvPlxuXHRcdFx0PFJvdXRlciBkZWZhdWx0VXJsPXt0aGlzLnByb3BzLnVybH0gLz5cblx0XHQ8L2Rpdj5cblx0fVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTWFpbjtcbiIsImNvbnN0IF8gICAgICAgICAgID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5jb25zdCBjcmVhdGVDbGFzcyA9IHJlcXVpcmUoJ2NyZWF0ZS1yZWFjdC1jbGFzcycpO1xuY29uc3QgUmVhY3QgICAgICAgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBCcmVhayAgICAgID0gcmVxdWlyZSgnLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYnJlYWsvYnJlYWsuanN4Jyk7XG5jb25zdCBQYXJhZ3JhcGggID0gcmVxdWlyZSgnLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvcGFyYWdyYXBoL3BhcmFncmFwaC5qc3gnKTtcbmNvbnN0IFRpdGxlQmxvY2sgPSByZXF1aXJlKCcuLi8uLi9zaGFyZWQvY29tcG9uZW50cy90aXRsZWJsb2NrL3RpdGxlYmxvY2suanN4Jyk7XG5cblxuY29uc3QgUGFnZU9uZSA9IGNyZWF0ZUNsYXNzKHtcblx0Z2V0RGVmYXVsdFByb3BzIDogZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4ge1xuXG5cdFx0fTtcblx0fSxcbiAgICBcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghV2ViU29ja2V0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29ubmVjdGlvbiA9IG5ldyBXZWJTb2NrZXQoYHdzOi8vJHtsb2NhdGlvbi5ob3N0LnNwbGl0KCc6JylbMF19OjgwODBgKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGNvbm5lY3Rpb24gfSk7XG4gICAgICAgIFxuICAgICAgICBjb25uZWN0aW9uLm9uTWVzc2FnZSA9ICh7XG4gICAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICB9LFxuICAgIFxuXHRyZW5kZXIgOiBmdW5jdGlvbigpe1xuXHRcdHJldHVybiA8ZGl2IGNsYXNzTmFtZT0ncGFnZW9uZSc+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICA8L2Rpdj5cblx0fVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZU9uZTtcbiIsImNvbnN0IF8gICAgICAgICAgID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5jb25zdCBjcmVhdGVDbGFzcyA9IHJlcXVpcmUoJ2NyZWF0ZS1yZWFjdC1jbGFzcycpO1xuY29uc3QgUmVhY3QgICAgICAgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBCcmVhayAgICAgID0gcmVxdWlyZSgnLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYnJlYWsvYnJlYWsuanN4Jyk7XG5jb25zdCBQYXJhZ3JhcGggID0gcmVxdWlyZSgnLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvcGFyYWdyYXBoL3BhcmFncmFwaC5qc3gnKTtcbmNvbnN0IFRpdGxlQmxvY2sgPSByZXF1aXJlKCcuLi8uLi9zaGFyZWQvY29tcG9uZW50cy90aXRsZWJsb2NrL3RpdGxlYmxvY2suanN4Jyk7XG5cblxuY29uc3QgUGFnZVR3byA9IGNyZWF0ZUNsYXNzKHtcblx0Z2V0RGVmYXVsdFByb3BzIDogZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4ge1xuXG5cdFx0fTtcblx0fSxcblx0cmVuZGVyIDogZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4gPGRpdiBjbGFzc05hbWU9J3BhZ2V0d28nPlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgPC9kaXY+XG5cdH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBhZ2VUd287XG4iLCJjb25zdCBfICAgICAgICAgICA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuY29uc3QgY3JlYXRlQ2xhc3MgPSByZXF1aXJlKCdjcmVhdGUtcmVhY3QtY2xhc3MnKTtcbmNvbnN0IFJlYWN0ICAgICAgID0gcmVxdWlyZSgncmVhY3QnKTtcblxuZnVuY3Rpb24gZ2VuZXJhdGVRdWVzdGlvbigpIHtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBjb25zdCBvbmUgPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDIwKTtcbiAgICAgICAgY29uc3QgdHdvID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgIGNvbnN0IHRocmVlID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiAyMCk7XG4gICAgICAgIGNvbnN0IG9wZXJhdG9yID0gTWF0aC5yYW5kb20oKSA+IDAuNSA/ICcrJyA6ICctJztcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHN0cmluZyA9IGAoJHtvbmV9ICogJHt0d299KSAke29wZXJhdG9yfSAke3RocmVlfWA7XG4gICAgICAgIGNvbnN0IGFuc3dlciA9IGV2YWwoc3RyaW5nKTtcbiAgICAgICAgaWYgKGFuc3dlciA+IDk5IHx8IGFuc3dlciA8IDEpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbYW5zd2VyLCBgJHtzdHJpbmd9ID1gLnJlcGxhY2UoJyonLCAnw5cnKV07XG4gICAgfVxufVxuXG5jb25zdCBRVUVTVElPTlMgPSAyO1xuXG5jb25zdCBRdWl6ID0gY3JlYXRlQ2xhc3Moe1xuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIHtcblxuICAgICAgICB9O1xuICAgIH0sXG4gICAgXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3VsdHM6IFtdLFxuICAgICAgICAgICAgYW5zd2VyVmFsdWU6ICcnLFxuICAgICAgICAgICAgY29ycmVjdEFuc3dlcjogMCxcbiAgICAgICAgICAgIHF1ZXN0aW9uVGV4dDogJycsXG4gICAgICAgICAgICB0aW1lc3RhbXA6IDAsXG4gICAgICAgICAgICBwcm9ncmVzczogMCxcbiAgICAgICAgICAgIGNvbm5lY3Rpb246IG51bGwsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCFXZWJTb2NrZXQpIHtcbiAgICAgICAgICAgIHJldHVybjsgLy8gRG9uJ3QgZG8gdGhpcyBvbiB0aGUgc2VydmVyXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29ubmVjdGlvbiA9IG5ldyBXZWJTb2NrZXQoYHdzOi8vJHtsb2NhdGlvbi5ob3N0LnNwbGl0KCc6JylbMF19OjgwODBgKTtcbiAgICAgICAgLy9sZXQgY291bnRlciA9IDA7XG4gICAgICAgIC8vc2V0SW50ZXJ2YWwoKCkgPT4geyBjb25uZWN0aW9uLnNlbmQoJ0FscGhhICcgKyBjb3VudGVyKyspIH0sIDMwMDApO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGNvbm5lY3Rpb24gfSk7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgdGhpcy5yZWZzLmFuc3dlci5mb2N1cygpO1xuICAgICAgICB0aGlzLmJlZ2luUHJvY2VzcygpO1xuICAgIH0sXG4gICAgXG4gICAgaGFuZGxlS2V5UHJlc3M6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgaWYgKG5ld1ZhbHVlLmxlbmd0aCA+IDIgfHwgbmV3VmFsdWUubWF0Y2goL1xcRC8pKSB7XG4gICAgICAgICAgICB0aGlzLnJlZnMuYW5zd2VyLnZhbHVlID0gdGhpcy5zdGF0ZS5hbnN3ZXJWYWx1ZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgYW5zd2VyVmFsdWU6IG5ld1ZhbHVlIH0pO1xuICAgICAgICBpZiAoK25ld1ZhbHVlID09PSB0aGlzLnN0YXRlLmNvcnJlY3RBbnN3ZXIpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQodGhpcy5oYW5kbGVDb3JyZWN0QW5zd2VyLCAxMDApO1xuICAgICAgICB9XG4gICAgICAgIGdlbmVyYXRlUXVlc3Rpb24oKTtcbiAgICB9LFxuICAgIFxuICAgIGhhbmRsZUNsaWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5yZWZzLmFuc3dlci5mb2N1cygpO1xuICAgIH0sXG4gICAgXG4gICAgaGFuZGxlQ29ycmVjdEFuc3dlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucmVmcy5hbnN3ZXIudmFsdWUgPSAnJztcbiAgICAgICAgY29uc3QgbmV3UmVzdWx0cyA9IHRoaXMuc3RhdGUucmVzdWx0cztcbiAgICAgICAgY29uc3QgZCA9IG5ldyBEYXRlKCk7XG4gICAgICAgIG5ld1Jlc3VsdHMucHVzaChkLmdldFRpbWUoKSAtIHRoaXMuc3RhdGUudGltZXN0YW1wKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBhbnN3ZXJWYWx1ZTogJycsXG4gICAgICAgICAgICByZXN1bHRzOiBuZXdSZXN1bHRzLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKG5ld1Jlc3VsdHMubGVuZ3RoIDwgUVVFU1RJT05TKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0UXVlc3Rpb24oKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXG4gICAgY29tcG9uZW50RGlkVXBkYXRlOiBmdW5jdGlvbihwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5yZXN1bHRzLmxlbmd0aCA9PT0gUVVFU1RJT05TICYmIHRoaXMuc3RhdGUucHJvZ3Jlc3MgPT09IDEpIHtcbiAgICAgICAgICAgIC8vIGZpbmlzaCBwcm9ncmFtXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZG9uZScsIHRoaXMuc3RhdGUucmVzdWx0cywgdGhpcy5zdGF0ZS5yZXN1bHRzLnJlZHVjZSgoc3VtLHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdW0gKyB2YWw7XG4gICAgICAgICAgICB9LCAwKSk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBwcm9ncmVzczogMixcbiAgICAgICAgICAgICAgICBxdWVzdGlvblRleHQ6ICdEb25lIScsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3F1aXonLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLnJlc3VsdHMsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5jb25uZWN0aW9uLnNlbmQoSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBcbiAgICBzdGFydFF1ZXN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1F1ZXN0aW9uczonLCB0aGlzLnN0YXRlLnJlc3VsdHMubGVuZ3RoKVxuICAgICAgICBjb25zdCBuZXdRdWVzdGlvbiA9IGdlbmVyYXRlUXVlc3Rpb24oKTtcbiAgICAgICAgY29uc3QgZCA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY29ycmVjdEFuc3dlcjogbmV3UXVlc3Rpb25bMF0sXG4gICAgICAgICAgICBxdWVzdGlvblRleHQ6IG5ld1F1ZXN0aW9uWzFdLFxuICAgICAgICAgICAgdGltZXN0YW1wOiBkLmdldFRpbWUoKSxcbiAgICAgICAgICAgIHByb2dyZXNzOiAxLFxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIFxuICAgIGJlZ2luUHJvY2VzczogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnF1ZXN0aW9uVGV4dCA9PT0gJzEnKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0UXVlc3Rpb24oKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuZXh0U3RyID0gdGhpcy5zdGF0ZS5xdWVzdGlvblRleHQgPT09ICcnID8gJzMnIDogYCR7K3RoaXMuc3RhdGUucXVlc3Rpb25UZXh0IC0gMX1gO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHF1ZXN0aW9uVGV4dDogbmV4dFN0cixcbiAgICAgICAgfSk7XG4gICAgICAgIHNldFRpbWVvdXQodGhpcy5iZWdpblByb2Nlc3MsIDEwMDApO1xuICAgIH0sXG4gICAgXG4gICAgcmVuZGVyVGV4dEFyZWE6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5wcm9ncmVzcyA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPSd0ZXh0QXJlYSc+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3F1ZXN0aW9uJz5cbiAgICAgICAgICAgICAgICAgICAgPHA+e3RoaXMuc3RhdGUucXVlc3Rpb25UZXh0fTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgY2xhc3NOYW1lPSdhbnN3ZXInIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUtleVByZXNzfSByZWY9J2Fuc3dlcicvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPSd0ZXh0QXJlYSc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbm90aWNlJz5cbiAgICAgICAgICAgICAgICA8cD57dGhpcy5zdGF0ZS5xdWVzdGlvblRleHR9PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIH0sXG4gICAgXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpe1xuICAgICAgICBcbiAgICAgICAgY29uc3QgYW5zd2VyU3R5bGUgPSB7XG4gICAgICAgICAgICB3aWR0aDogdGhpcy5zdGF0ZS5wcm9ncmVzcyA9PT0gMSA/ICczMDBweCcgOiAnMCcsXG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9J3F1aXonIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3RleHRBcmVhJz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncXVlc3Rpb24nPlxuICAgICAgICAgICAgICAgICAgICA8cD57dGhpcy5zdGF0ZS5xdWVzdGlvblRleHR9PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBjbGFzc05hbWU9J2Fuc3dlcicgc3R5bGU9e2Fuc3dlclN0eWxlfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVLZXlQcmVzc30gcmVmPSdhbnN3ZXInLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj47XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUXVpejtcbiIsImNvbnN0IF8gICAgICAgICAgID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5jb25zdCBjcmVhdGVDbGFzcyA9IHJlcXVpcmUoJ2NyZWF0ZS1yZWFjdC1jbGFzcycpO1xuY29uc3QgUmVhY3QgICAgICAgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBUaXRsZUJsb2NrID0gY3JlYXRlQ2xhc3Moe1xuICAgIFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBzdHlsZSA9IHRoaXMucHJvcHMuaGVpZ2h0ID8geyBoZWlnaHQ6IHRoaXMucHJvcHMuaGVpZ2h0IH0gOiB7fVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2JyZWFrJyBzdHlsZT17c3R5bGV9PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfSxcbiAgICBcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRpdGxlQmxvY2s7XG4iLCJjb25zdCBfICAgICAgICAgICA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuY29uc3QgY3JlYXRlQ2xhc3MgPSByZXF1aXJlKCdjcmVhdGUtcmVhY3QtY2xhc3MnKTtcbmNvbnN0IFJlYWN0ICAgICAgID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgVGl0bGVCbG9jayA9IGNyZWF0ZUNsYXNzKHtcbiAgICBcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3BhcmFncmFwaCc+XG4gICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH0sXG4gICAgXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBUaXRsZUJsb2NrO1xuIiwiY29uc3QgXyAgICAgICAgICAgPSByZXF1aXJlKCdsb2Rhc2gnKTtcbmNvbnN0IGNyZWF0ZUNsYXNzID0gcmVxdWlyZSgnY3JlYXRlLXJlYWN0LWNsYXNzJyk7XG5jb25zdCBSZWFjdCAgICAgICA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IFRpdGxlQmxvY2sgPSBjcmVhdGVDbGFzcyh7XG4gICAgXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd0aXRsZUJsb2NrJz5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J3BhZ2VUaXRsZSc+e3RoaXMucHJvcHMubmFtZX08L3A+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdieWxpbmUnPnt0aGlzLnByb3BzLmRhdGV9PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfSxcbiAgICBcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRpdGxlQmxvY2s7XG4iLCJjb25zdCBfICAgICAgICAgICA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuY29uc3QgY3JlYXRlQ2xhc3MgPSByZXF1aXJlKCdjcmVhdGUtcmVhY3QtY2xhc3MnKTtcbmNvbnN0IFJlYWN0ICAgICAgID0gcmVxdWlyZSgncmVhY3QnKTtcblxuXG5jb25zdCBMb3dCYXIgPSBjcmVhdGVDbGFzcyh7XG4gICAgXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAoICAgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYm90dG9tYmFyJz5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2NvcHlyaWdodCc+PHNwYW4+wqk8L3NwYW4+IDIwMTcgLSBXaWxsIENsYXJrPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfSxcbiAgICBcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvd0JhcjtcbiIsImNvbnN0IF8gICAgICAgICAgID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5jb25zdCBjcmVhdGVDbGFzcyA9IHJlcXVpcmUoJ2NyZWF0ZS1yZWFjdC1jbGFzcycpO1xuY29uc3QgUmVhY3QgICAgICAgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBNYWluUGFnZSA9IGNyZWF0ZUNsYXNzKHtcbiAgICBcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKCAgIFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J21haW5QYWdlJz5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH0sXG4gICAgXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBNYWluUGFnZTtcbiIsImNvbnN0IF8gICAgICAgICAgID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5jb25zdCBjeCAgICAgICAgICA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKTtcbmNvbnN0IGNyZWF0ZUNsYXNzID0gcmVxdWlyZSgnY3JlYXRlLXJlYWN0LWNsYXNzJyk7XG5jb25zdCBSZWFjdCAgICAgICA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5jb25zdCBMaW5rICAgICAgICA9IHJlcXVpcmUoJ3BpY28tcm91dGVyJykuTGluaztcblxuY29uc3QgVG9wQmFyID0gY3JlYXRlQ2xhc3Moe1xuXHRnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB7XG4gICAgICAgICAgICBwYWdlczogW10sXG5cdFx0fTtcblx0fSxcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY3VycmVudFBhZ2U6ICcvJ1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0Q3VycmVudFBhZ2U6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjdXJyZW50UGFnZTogZGVjb2RlVVJJKGUuY3VycmVudFRhcmdldC5ocmVmLnNwbGl0KHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pWzFdKVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIFxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjdXJyZW50UGFnZTogZGVjb2RlVVJJKHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pWzFdKVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIFxuICAgIHJlbmRlclBhZ2VMaW5rczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfLm1hcCh0aGlzLnByb3BzLnBhZ2VzLCAocGFnZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIDxMaW5rIGNsYXNzTmFtZT17Y3goJ3BhZ2VMaW5rJywgeyBhY3RpdmVQYWdlOiB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlID09PSBwYWdlLmxpbmsgfSl9IGhyZWY9e2Ake3BhZ2UubGlua31gfSBvbkNsaWNrPXt0aGlzLmdldEN1cnJlbnRQYWdlfT5cbiAgICAgICAgICAgICAgICB7cGFnZS5uYW1lfVxuICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIFxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiA8ZGl2IGNsYXNzTmFtZT0ndG9wYmFyJz5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9J3NpdGVOYW1lJz5NaW5kU2V0PC9oMz5cblx0XHRcdDxuYXYgY2xhc3NOYW1lPSdwYWdlTGlua0xpc3QnPlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclBhZ2VMaW5rcygpfVxuXHRcdFx0PC9uYXY+XG5cdFx0PC9kaXY+O1xuXHR9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBUb3BCYXI7XG4iXX0=
