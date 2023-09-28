export const returnTimeDifference = (date: Date) => {
  const timeFormat = new Intl.RelativeTimeFormat('en')

  const postedDate = new Date(date).getTime()
  const currentDate = new Date().getTime()

  const hoursDifference = (postedDate - currentDate) / 1000 / 60 / 60
  if (hoursDifference < 24) return timeFormat.format((parseInt(hoursDifference.toFixed())), 'hour')
  
  const daysDifference = (postedDate - currentDate) / 1000 / 60 / 60 / 24
  if (daysDifference <= 30) return timeFormat.format((parseInt(daysDifference.toFixed())), 'day')

  return 'Over 30 days ago'
}