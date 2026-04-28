export const formatRupiah = (value: number) => {
  return new Intl.NumberFormat("id-ID").format(value);
};