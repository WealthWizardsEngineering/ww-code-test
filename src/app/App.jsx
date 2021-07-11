/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import FormInput from './component/form-input';

const App = ({ store }) => (
  <Provider store={store}>
    <div css={css`
      padding-left: 50px;
      padding-top: 50px;
    `}
    >
      <h1>National Insurance calculator</h1>
      <FormInput FormInput />
    </div>
  </Provider>
);

App.propTypes = {
  store: PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired,
  }).isRequired,
};

export default App;
