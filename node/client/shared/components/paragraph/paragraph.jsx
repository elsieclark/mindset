const _           = require('lodash');
const createClass = require('create-react-class');
const React       = require('react');

const TitleBlock = createClass({
    
    render: function() {
        return (
            <div className='paragraph'>
                <p>
                    {this.props.children}
                </p>
            </div>
        );
    },
    
});

module.exports = TitleBlock;
