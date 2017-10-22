const _           = require('lodash');
const createClass = require('create-react-class');
const React       = require('react');

const Break      = require('../../shared/components/break/break.jsx');
const Paragraph  = require('../../shared/components/paragraph/paragraph.jsx');
const TitleBlock = require('../../shared/components/titleblock/titleblock.jsx');


const PageOne = createClass({
    getDefaultProps: function() {
        return {

        };
    },

    componentDidMount: function() {
        if (!WebSocket) {
            return;
        }
        const connection = new WebSocket(`ws://${location.host.split(':')[0]}:8080`);
        this.setState({ connection });

        connection.onMessage = ({

        });
    },

    render: function() {
        return <div className='pageone'>

        </div>;
    }
});

module.exports = PageOne;
