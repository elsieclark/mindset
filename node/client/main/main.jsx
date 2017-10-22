const _            = require('lodash');
const createClass  = require('create-react-class');
const createRouter = require('pico-router').createRouter;
const Link         = require('pico-router').Link;
const React        = require('react');

const PageOne    = require('./pageone/pageone.jsx');
const PageTwo    = require('./pagetwo/pagetwo.jsx');
const Quiz       = require('./quiz/quiz.jsx');
const FourOhFour = require('./fourohfour/fourohfour.jsx');

const TopBar   = require('../shared/topbar/topbar.jsx');
const MainPage = require('../shared/mainpage/mainpage.jsx');
const LowBar   = require('../shared/lowbar/lowbar.jsx');

const Router = createRouter({
	'/': <PageOne />,
    '/two': <PageTwo />,
    '/quiz': <Quiz />,
    '/*': <MainPage><FourOhFour /></MainPage>
});

const navBarLinks = [
    {
        name: 'One',
        link: '/',
    },
    {
        name: 'Two',
        link: '/two',
    },
];

const Main = createClass({
    
	getDefaultProps : function() {
		return {
            url: '/'
		};
	},
    
    getInitialState: function() {
        return {
            connection: null
        };
    },
    
    componentDidMount: function() {
        if (!WebSocket) {
            return; // Don't do this on the server
        }
        const connection = new WebSocket(`ws://${location.host.split(':')[0]}:8080`);
        //let counter = 0;
        //setInterval(() => { connection.send('Alpha ' + counter++) }, 3000);
        
        this.setState({ connection });
        
        connection.onmessage = (a,b) => {
            console.log(a.data);
        };
        
    },
    
	render : function() {
		return <div className='main'>
            <TopBar pages={navBarLinks} />
			<Router defaultUrl={this.props.url} />
		</div>
	}
});

module.exports = Main;
