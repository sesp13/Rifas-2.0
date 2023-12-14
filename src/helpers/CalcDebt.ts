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
