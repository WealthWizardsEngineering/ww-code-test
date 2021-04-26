/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

const App = ({ store }) => (
  <Provider store={store}>
    <p
      css={css`
        font-size: 100px;
      `}
    >
      Your app here
    </p>
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
