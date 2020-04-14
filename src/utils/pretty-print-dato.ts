const monthNames = {
  no: ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
};

export default input => {
  const { dato, language } = input;
  const now = new Date();
  const date = new Date(dato);
  const thisYear = now.getFullYear();
  const year = date.getFullYear();
  const monthName = monthNames[language][date.getMonth()];
  return `${date.getDate()}. ${monthName}${thisYear !== year ? ' ' + year : ''}`;
};