import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../store';
import { EndRoundPage } from './EndRoundPage';

const setupComponent = () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <EndRoundPage />
      </Provider>
    </BrowserRouter>
  );
};

describe('Tests on <EndRoundPage />', () => {
  test('Should render end round title correctly', () => {
    setupComponent();
    const title = screen.getByLabelText('end-round-title');
    expect(title).toBeTruthy();
  });

  test('should render end round form', () => {
    setupComponent();
    const form = screen.getByLabelText('end-round-form');
    expect(form).toBeTruthy();
  });
});
