import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { SetupForm } from './SetupForm';
import { store } from '../../../store';
import { fireEvent, render, screen } from '@testing-library/react';
import { Store } from '@reduxjs/toolkit';

const mockedDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockedDispatch,
}));

const setupComponent = (selectedStore: Store = store) =>
  render(
    <BrowserRouter>
      <Provider store={selectedStore}>
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
    const submitBtn = screen.getByRole('button', { name: 'submit-btn' });
    expect(submitBtn).toHaveProperty('disabled', true);
  });

  test('submit button should be disabled by default', () => {
    setupComponent();
    const submitBtn = screen.getByRole('button');
    expect(submitBtn).toHaveProperty('disabled', true);
  });

  test('should dispatch an action when the form is submmited', () => {
    setupComponent();

    const playersInput = screen
      .getByLabelText('numberOfPlayers')
      .querySelector('input');

    if (playersInput) {
      fireEvent.change(playersInput, { target: { value: '2' } });
    }

    const kickOutInput = screen
      .getByLabelText('kickOutValue')
      .querySelector('input');

    if (kickOutInput) {
      fireEvent.change(kickOutInput, { target: { value: '1000' } });
    }

    const entryInput = screen
      .getByLabelText('entryValue')
      .querySelector('input');

    if (entryInput) {
      fireEvent.change(entryInput, { target: { value: '1000' } });
    }

    const pointsInput = screen
      .getByLabelText('pointLimit')
      .querySelector('input');

    if (pointsInput) {
      fireEvent.change(pointsInput, { target: { value: '1000' } });
    }

    const submitBtn = screen.getByRole('button', { name: 'submit-btn' });
    fireEvent.click(submitBtn);
    expect(mockedDispatch).toHaveBeenCalled();
  });
});
