const createDate = (date: Date) => {
  return new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
}

export default createDate
