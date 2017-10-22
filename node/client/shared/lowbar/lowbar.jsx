const _           = require('lodash');
const createClass = require('create-react-class');
const React       = require('react');


const LowBar = createClass({
    
	render: function() {
        return (   
            <div className='bottombar'>
                <p className='copyright'><span>©</span> 2017 - Will Clark</p>
            </div>
        );
    },
    
});

module.exports = LowBar;
