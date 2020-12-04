const monthNames = {
  no: ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
}

const dayNames = {
  no: ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
}

export default input => {
  const { dato, language } = input
  const now = new Date()
  const date = new Date(dato)
  const thisYear = now.getFullYear()
  const year = date.getFullYear()
  const month = monthNames[language][date.getMonth()]
  const day = dayNames[language][date.getDay()]
  return `${day} ${date.getDate()}. ${month}${thisYear !== year ? ' ' + year : ''}`
}
