const _           = require('lodash');
const createClass = require('create-react-class');
const React       = require('react');

const TitleBlock = createClass({
    
    render: function() {
        let style = this.props.height ? { height: this.props.height } : {}
        return (
            <div className='break' style={style}>
            </div>
        );
    },
    
});

module.exports = TitleBlock;
