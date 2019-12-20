import React, { useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createMessage } from '../../actions/messages';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(2)
  },
  margin: {
    margin: theme.spacing(2)
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  textField: {
    width: 400
  }
}));

const formData = {
  username: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
};

const subjects = ['Elogio', 'Reclamação'];

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      required
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired
};

function reducer(state, { field, value }) {
  return {
    ...state,
    [field]: value
  };
}

function Form(props) {
  const [state, dispatch] = useReducer(reducer, formData);
  const classes = useStyles();
  const onChange = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.createMessage(state);
    document.location.assign('/messages');
  };

  return (
      <div>
        <form onSubmit={handleSubmit} className={classes.root} autoComplete="off">
          <FormControl className={classes.margin} fullWidth >
            <InputLabel htmlFor="username">Nome</InputLabel>
            <Input
              name="username"
              onChange={onChange}
              id="username"
              required
              inputProps={{ className: classes.input }}
            />
          </FormControl>
          <FormControl className={classes.margin} fullWidth>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              name="email"
              onChange={onChange}
              id="email"
              required="email"
              inputProps={{ className: classes.input, pattern: '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$' }}
            />
          </FormControl>
          <FormControl className={classes.margin} fullWidth>
            <InputLabel htmlFor="phone">Telefone</InputLabel>
            <Input
              name="phone"
              onChange={onChange}
              id="phone"
              required
              inputComponent={TextMaskCustom}
            />
          </FormControl>
          <FormControl className={classes.margin} fullWidth>
            <InputLabel htmlFor="subject">Assunto</InputLabel>
              <Select
              labelId="demo-simple-select-label"
              name="subject"
              id="subject"
              required
              onChange={onChange}
              >
            {subjects.map((subject, i) => (
              <MenuItem key={i} value={subject}>{subject}</MenuItem>
            ))}
              </Select>
          </FormControl>
          <FormControl className={classes.margin} fullWidth>
            <TextField
              label="Mensagem"
              name="message"
              defaultValue=""
              helperText=""
              rows={6}
              multiline
              fullWidth
              required
              onChange={onChange}
              />
          </FormControl>
          <FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.margin}
            >Enviar</Button>
          </FormControl>
        </form>
    </div>
  );
}

Form.propTypes = {
  item: PropTypes.object,
  createMessage: PropTypes.func
};

const mapStateToProps = ({ messages }) => ({
  messages
});

export default (
  connect(
    mapStateToProps,
    { createMessage }
  )(Form)
);
