import { NumberFormatCOP } from './CurrencyFormat';

export interface DebtParams {
  entryValue: number;
  kickoutValue: number;
  numberOfKickouts: number;
}

export const calcDebt = ({
  entryValue,
  kickoutValue,
  numberOfKickouts,
}: DebtParams) => entryValue + kickoutValue * numberOfKickouts;

export const calcDebtWithFormat = (params: DebtParams) =>
  NumberFormatCOP(calcDebt(params));
