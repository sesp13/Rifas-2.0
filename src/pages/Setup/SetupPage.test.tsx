import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../store';
import { SetupPage } from './SetupPage';

const mockedDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockedDispatch,
}));

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

  test('should match the snapshot', () => {
    const { container } = setupComponent();
    expect(container).toMatchSnapshot();
  });

  test('should render setupForm', () => {
    const { container } = setupComponent();
    const form = container.querySelector('#setupForm');
    expect(form).toBeTruthy();
  });

  test('should dispatch an action when the form is submmited', () => {
    setupComponent();
    const submitBtn = screen.getByLabelText('submit-btn');
    fireEvent.click(submitBtn);
    expect(mockedDispatch).toHaveBeenCalled();
  });
});
