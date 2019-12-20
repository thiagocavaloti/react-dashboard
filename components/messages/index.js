import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { getMessages, setItem, deleteMessage } from '../../actions/messages';
import Loader from '../loader';


class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickItem = this.handleClickItem.bind(this);
  }

  handleClickItem = item => this.props.setItem(item);

  handleDeleteItem = (item) => {
    this.props.deleteMessage(item);
    this.props.getMessages();
  }

  async componentDidMount() {
    await this.props.getMessages();
  }

  render() {
    const { fetching, items, item } = this.props.messages;
    if (fetching) {
      return <Loader />;
    }
    return (
      <div>
        <Grid container spacing={3}>
        <Grid item xs={4}>
          {items.map((message, i) => (
              <Paper style={{ padding: '20px', cursor: 'pointer' }} key={i} onClick={() => this.handleClickItem(message)}>
                <p><strong>{message.username}</strong></p>
                <p>{moment(message.date).format('DD/MM/YYYY HH:mm:ss')}</p>
              </Paper>
          ))}
        </Grid>
        {item && item.id && <Grid item xs={8}>
          <Paper style={{ padding: '20px' }}>
            <p><strong>{item.username}</strong></p>
            <p>{item.subject}</p>
            <p>{item.date && moment(item.date).format('DD/MM/YYYY HH:mm:ss')}</p>
            <p>{item.message}</p>
            <div>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => this.handleDeleteItem(item.id)}
            >Excluir Mensagem</Button>
            </div>
          </Paper>
        </Grid>}
      </Grid>
      </div>
    );
  }
}

Messages.propTypes = {
  messages: PropTypes.object,
  setItem: PropTypes.func,
  getMessages: PropTypes.func,
  deleteMessage: PropTypes.func
};

const mapStateToProps = ({ messages }) => ({
  messages
});

export default
connect(
  mapStateToProps,
  { getMessages, setItem, deleteMessage }
)(Messages);
