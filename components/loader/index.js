import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.loader = this.loader.bind(this);
  }

  loader() {
    if (this.props.loading) {
      return <CircularProgress style={{ marginLeft: '49%', marginTop: '10%' }} />;
    }
    return [];
  }

  render() {
    return (
      <div>
          {this.loader()}
      </div>
    );
  }
}


Loader.propTypes = {
  loading: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ])
};

const mapStateToProps = ({ loading }) => ({
  loading
});

export default connect(mapStateToProps)(Loader);
