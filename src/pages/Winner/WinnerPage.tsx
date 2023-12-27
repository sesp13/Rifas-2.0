import { useAppSelector } from '../../hooks';

export const WinnerPage = () => {
  const { winnerPlayerKey, players } = useAppSelector((state) => state.game);

  if (!winnerPlayerKey) return <p>Error: No winner setted</p>;

  const winnerPlayer = players[winnerPlayerKey];

  return (
    <>
      <p>We have a winner now!</p>
      <p>{winnerPlayer.name}</p>
    </>
  );
};
