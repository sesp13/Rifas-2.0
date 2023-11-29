import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { SetupForm } from './SetupForm';
import { store } from '../../../store';
import { fireEvent, render, screen } from '@testing-library/react';

const mockedDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockedDispatch,
}));

const setupComponent = () =>
  render(
    <BrowserRouter>
      <Provider store={store}>
        <SetupForm />
      </Provider>
    </BrowserRouter>
  );

describe('Tests on <SetupForm />', () => {
  test('send button should be disabled if the form is not valid', () => {
    setupComponent();
    const playersInput = screen
      .getByLabelText('numberOfPlayers')
      .querySelector('input');

    if (playersInput) {
      fireEvent.change(playersInput, { target: { value: '' } });
    }
    const submitBtn = screen.getByLabelText('submit-btn');
    expect(submitBtn.attributes.getNamedItem('disabled')).toBeDefined();
  });

  test('should dispatch an action when the form is submmited', () => {
    setupComponent();
    const submitBtn = screen.getByLabelText('submit-btn');
    fireEvent.click(submitBtn);
    expect(mockedDispatch).toHaveBeenCalled();
  });
});
