import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../store';
import { SetupPage } from './SetupPage';

const setupComponent = () =>
  render(
    <BrowserRouter>
      <Provider store={store}>
        <SetupPage />
      </Provider>
    </BrowserRouter>
  );

describe('Tests on <SetupPage />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render setupForm', () => {
    const { container } = setupComponent();
    const form = container.querySelector('[aria-label="setup-form"]');
    expect(form).toBeTruthy();
  });
});
