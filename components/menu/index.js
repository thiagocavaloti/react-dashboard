import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Link from 'next/link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
};

const globalLabels = [
  { href: '/messages', label: 'Mensagens' },
  { href: '/form', label: 'Formulário' }
];

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top: false,
      left: false,
      bottom: false,
      right: false,
      open: false
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  render() {
    const { classes } = this.props;
    const sideList = (
      <div className={classes.list}>
        <List>
        {globalLabels.map((route, index) => (
            <Link href={route.href} key={index}>
              <ListItem button>
                <ListItemText primary={route.label} />
              </ListItem>
            </Link>
        ))}
        </List>
      </div>
    );

    return (
      <div>
        <Drawer
          open={this.props.open}
          onClose={this.toggleDrawer('left', false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool
};
const mapStateToProps = () => ({
});

export default withRouter(withStyles(styles)(connect(mapStateToProps)(Menu)));
