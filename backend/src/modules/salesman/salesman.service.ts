import * as repo from "./salesman.repository";

export const getSalemanData = async () => {
  const rows = await repo.getSalesmen();
  return rows;
};
