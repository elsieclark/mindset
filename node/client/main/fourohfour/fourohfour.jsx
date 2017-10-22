const _           = require('lodash');
const createClass = require('create-react-class');
const React       = require('react');


const Fourohfour = createClass({
	getDefaultProps: function(){
		return {

		};
	},
	render: function(){
		return <div className='fourohfour'>
			Fourohfour Component Ready.
		</div>;
	}
});

module.exports = Fourohfour;
