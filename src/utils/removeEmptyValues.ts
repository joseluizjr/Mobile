/* eslint-disable @typescript-eslint/no-explicit-any */
export function removeEmptyValues(obj: any): any {
  for (const key in obj) {
    if (obj.prototype.hasOwnProperty.call(key)) {
      // Verifica se o valor é um objeto e não é nulo
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        // Se for um array, verifica se está vazio ou contém apenas objetos vazios
        if (Array.isArray(obj[key])) {
          if (obj[key].length === 0 || obj[key].every((item: any) => Object.keys(item).length === 0)) {
            delete obj[key]; // Remove o array se estiver vazio ou contiver apenas objetos vazios
          } else {
            // Processa cada item do array recursivamente
            obj[key] = obj[key].map((item: any) => removeEmptyValues(item));
          }
        } else {
          // Se for um objeto, processa recursivamente
          removeEmptyValues(obj[key]);
        }
      } else if (obj[key] === '' || obj[key] === 0) {
        delete obj[key]; // Remove a propriedade se o valor for uma string vazia ou zero
      }
    }
  }
  return obj;
}
