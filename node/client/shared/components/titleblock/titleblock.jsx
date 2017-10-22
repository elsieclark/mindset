const _           = require('lodash');
const createClass = require('create-react-class');
const React       = require('react');

const TitleBlock = createClass({
    
    render: function() {
        return (
            <div className='titleBlock'>
                <p className='pageTitle'>{this.props.name}</p>
                <p className='byline'>{this.props.date}</p>
            </div>
        );
    },
    
});

module.exports = TitleBlock;
