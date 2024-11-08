export interface FormType {
  nDigit: StringNumber,
  nNumber: StringNumber,
  nOperation: string,
  retenue?: 'avec retenue' | 'sans retenue' | 'mix',
  typeCalcul:  'addition' | 'soustraction'
}

type StringNumber = '2' |  '3' |  '4' |  '5' |  '6' |  '7' |  '8' |  '9';

export type OperatorType = '+' | '-';