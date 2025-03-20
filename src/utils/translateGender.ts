export function translateGender(gender: string) {
  switch (gender) {
    case 'MALE':
      return 'Masculino';
    case 'FEMALE':
      return 'Feminino';
    case 'OTHER':
      return 'Outro';
    case 'NOT_INFORMED':
      return 'Não informado';
    default:
      return status;
  }
}
