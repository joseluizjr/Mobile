export const applyPhoneMask = (value: string) => {
  if (!value) return '';

  // Remove tudo que não é dígito
  const cleanedValue = value.replace(/\D/g, '');

  // Aplica a máscara (99) 99999-9999
  if (cleanedValue.length <= 10) {
    return cleanedValue.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3'); // Telefone fixo
  } else {
    return cleanedValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'); // Celular
  }
};

export function cpfMask(v: string = '') {
  v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
  v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
  v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
  //de novo (para o segundo bloco de números)
  v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); //Coloca um hífen entre o terceiro e o quarto dígitos
  return v;
}

export function cepMask(v: string = '') {
  v = v.replace(/\D/g, '');
  v = v.replace(/(\d{5})(\d)/, '$1-$2');
  return v;
}
