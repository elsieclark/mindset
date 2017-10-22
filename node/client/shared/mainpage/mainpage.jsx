const _           = require('lodash');
const createClass = require('create-react-class');
const React       = require('react');

const MainPage = createClass({
    
    render: function() {
        return (   
            <div className='mainPage'>
                {this.props.children}
            </div>
        );
    },
    
});

module.exports = MainPage;
