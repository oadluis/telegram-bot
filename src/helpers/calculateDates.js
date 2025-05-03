//* Função para calcular as datas com base no período
function calculateDates(periodo) {
  const today = new Date();
  let fromDate, toDate;

  if (periodo === 'hoje') {
    fromDate = toDate = today.toISOString().split('T')[0];
  } else if (periodo === 'semana') {
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    fromDate = lastWeek.toISOString().split('T')[0];
    toDate = today.toISOString().split('T')[0];
  } else if (periodo === 'mes') {
    const lastMonth = new Date(today);
    lastMonth.setMonth(today.getMonth() - 1);
    fromDate = lastMonth.toISOString().split('T')[0];
    toDate = today.toISOString().split('T')[0];
  } else if (periodo === 'ano') {
    const lastYear = new Date(today);
    lastYear.setFullYear(today.getFullYear() - 1);
    fromDate = lastYear.toISOString().split('T')[0];
  } else if (periodo === 'personalizado') {
    if (!customFromDate || !customToDate) {
      throw new Error(
        'Datas personalizadas devem ser fornecidas para o período "personalizado".'
      );
    }
    fromDate = customFromDate;
    toDate = customToDate;
  } else {
    throw new Error(`Período inválido: ${periodo}`);
  }

  return { fromDate, toDate };
}

module.exports = calculateDates;
