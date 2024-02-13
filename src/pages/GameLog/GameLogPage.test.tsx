import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { gameSlice } from "../../store";
import { basicGameState } from "../../tests";
import { Provider } from "react-redux";
import { GameLogPage } from "./GameLogPage";
import { AppRouting } from "../../routes";

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));


const store = configureStore({
  reducer: { game: gameSlice.reducer },
  preloadedState: { game: basicGameState },
});

const setupComponent = () =>
  render(
    <BrowserRouter>
      <Provider store={store}>
        <GameLogPage />
      </Provider>
    </BrowserRouter>
  );

  describe('Tests on <GameLogPage />', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('should render the page correctly', () => { 
      setupComponent();
     })

     test('End round button should redirect to end round page', () => {
      setupComponent();
      const goToDashboardBtn = screen.getByLabelText('go-to-dashboard-btn');
      fireEvent.click(goToDashboardBtn);
      expect(mockedNavigate).toHaveBeenCalledWith(AppRouting.DASHBOARD);
    });
  })