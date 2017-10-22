const _           = require('lodash');
const cx          = require('classnames');
const createClass = require('create-react-class');
const React       = require('react');
const Link        = require('pico-router').Link;

const TopBar = createClass({
    getDefaultProps: function() {
        return {
            pages: [],
        };
    },
    getInitialState: function() {
        return {
            currentPage: '/'
        };
    },
    getCurrentPage: function(e) {
        this.setState({
            currentPage: decodeURI(e.currentTarget.href.split(window.location.origin)[1])
        });
    },

    componentDidMount: function() {
        this.setState({
            currentPage: decodeURI(window.location.href.split(window.location.origin)[1])
        });
    },

    renderPageLinks: function() {
        return _.map(this.props.pages, (page) => {
            return <Link className={cx('pageLink', { activePage: this.state.currentPage === page.link })} href={`${page.link}`} onClick={this.getCurrentPage}>
                {page.name}
            </Link>;
        });
    },

    render: function() {
        return <div className='topbar'>
            <h3 className='siteName'>MindSet</h3>
            <nav className='pageLinkList'>
                {this.renderPageLinks()}
            </nav>
        </div>;
    }
});

module.exports = TopBar;
