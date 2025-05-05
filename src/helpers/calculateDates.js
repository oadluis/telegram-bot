//* Função para calcular as datas com base no período
function calculateDates(periodo) {
  // Validação inicial do período
  if (!periodo || typeof periodo !== 'string') {
    throw new Error('Período inválido: deve ser uma string não vazia');
  }

  const today = new Date();
  let fromDate, toDate;

  // Normaliza o período para minúsculas para comparação
  const periodoNormalizado = periodo.toLowerCase();

  try {
    switch (periodoNormalizado) {
      case 'hoje':
        fromDate = toDate = today.toISOString().split('T')[0];
        break;

      case 'semana':
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);
        fromDate = lastWeek.toISOString().split('T')[0];
        toDate = today.toISOString().split('T')[0];
        break;

      case 'mes':
        const lastMonth = new Date(today);
        lastMonth.setMonth(today.getMonth() - 1);
        fromDate = lastMonth.toISOString().split('T')[0];
        toDate = today.toISOString().split('T')[0];
        break;

      case 'ano':
        const lastYear = new Date(today);
        lastYear.setFullYear(today.getFullYear() - 1);
        fromDate = lastYear.toISOString().split('T')[0];
        toDate = today.toISOString().split('T')[0];
        break;

      case 'personalizado':
        if (!customFromDate || !customToDate) {
          throw new Error('Datas personalizadas devem ser fornecidas para o período "personalizado"');
        }
        // Validação do formato das datas personalizadas
        const fromDateObj = new Date(customFromDate);
        const toDateObj = new Date(customToDate);
        
        if (isNaN(fromDateObj.getTime()) || isNaN(toDateObj.getTime())) {
          throw new Error('Formato de data inválido para datas personalizadas');
        }
        
        if (fromDateObj > toDateObj) {
          throw new Error('A data inicial não pode ser posterior à data final');
        }
        
        fromDate = customFromDate;
        toDate = customToDate;
        break;

      default:
        throw new Error(`Período não reconhecido: ${periodo}. Períodos válidos são: hoje, semana, mes, ano, personalizado`);
    }

    // Validação final das datas calculadas
    if (!fromDate || !toDate) {
      throw new Error('Erro ao calcular as datas');
    }

    return { fromDate, toDate };
  } catch (error) {
    console.error('Erro ao calcular datas:', error);
    throw error; // Propaga o erro para ser tratado pelo chamador
  }
}

module.exports = calculateDates;
