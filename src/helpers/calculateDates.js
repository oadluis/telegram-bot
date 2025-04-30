//* Função para calcular as datas com base no período
function calculateDates(periodo) {
  const today = new Date();
  let fromDate, toDate;

  if (periodo === 'noticias_hoje') {
    fromDate = toDate = today.toISOString().split('T')[0];
  } else if (periodo === 'noticias_semana') {
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    fromDate = lastWeek.toISOString().split('T')[0];
    toDate = today.toISOString().split('T')[0];
  } else if (periodo === 'noticias_mes') {
    const lastMonth = new Date(today);
    lastMonth.setMonth(today.getMonth() - 1);
    fromDate = lastMonth.toISOString().split('T')[0];
    toDate = today.toISOString().split('T')[0];
  }

  return { fromDate, toDate };
}

module.exports = calculateDates;
