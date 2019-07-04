const months = {
  0: 'januar',
  1: 'februar',
  2: 'mars',
  3: 'april',
  4: 'mai',
  5: 'juni',
  6: 'juli',
  7: 'august',
  8: 'september',
  9: 'oktober',
  10: 'november',
  11: 'desember'
}

const formatPeriode = (startdato: Date, sluttdato: Date) => {
  const dateOne = [`${startdato.getDate()}.`]
  if (startdato.getMonth() !== sluttdato.getMonth()) {
    dateOne.push(months[startdato.getMonth()])
  }
  if (startdato.getFullYear() !== sluttdato.getFullYear()) {
    dateOne.push(`${startdato.getFullYear()}`)
  }
  return `${dateOne.join(' ')} - ${sluttdato.getDate()}. ${months[sluttdato.getMonth()]} ${sluttdato.getFullYear()}`
}

export default formatPeriode
