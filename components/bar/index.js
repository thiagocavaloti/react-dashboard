import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Cookies from 'js-cookie';
import MenuDrawer from '../menu';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  appActions: {
    display: 'flex',
    position: 'absolute',
    right: 0,
    alignItems: 'center'
  }
};

class Bar extends React.Component {
  constructor() {
    super();
    this.state = {
      auth: true,
      anchorEl: null,
      open: false,
      userName: ''
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
  }

  handleChange(event) {
    this.setState({ auth: event.target.checked });
  }

  handleMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleLogout() {
    Cookies.remove('token');
    Cookies.remove('user');
    Cookies.remove('storeId');
    window.location.assign('/login');
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <div >
        <AppBar position="static">
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={this.handleToggle}
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div
          tabIndex={0}
          role="button"
          onClick={this.handleToggle}
          onKeyDown={this.handleToggle}
        >
          <MenuDrawer open={this.state.open} />
        </div>
      </div>
    );
  }
}

Bar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(connect()(Bar));
