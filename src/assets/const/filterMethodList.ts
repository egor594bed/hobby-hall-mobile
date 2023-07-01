export type FilterTypes = 'stock' | 'price' | 'alphabet';
export type FilterTypeObj = {
  name: string;
  method: FilterTypes;
};

export const filterMethodList: FilterTypeObj[] = [
  {
    name: 'По наличию',
    method: 'stock',
  },
  {
    name: 'По цене',
    method: 'price',
  },
  {
    name: 'По алфавиту',
    method: 'alphabet',
  },
];
