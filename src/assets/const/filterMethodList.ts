// export type FilterTypes = 'stock' | 'price' | 'alphabet';
export type FilterTypes = (typeof filterMethodList)[number]['method'];
export type FilterTypeObj = {
  name: string;
  method: FilterTypes;
};

export const filterMethodList = [
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
] as const;
