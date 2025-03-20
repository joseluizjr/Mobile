export function translateStatus(status: string) {
  switch (status) {
    case 'ACTIVE':
      return 'Ativo';
    case 'INACTIVE':
      return 'Inativo';
    default:
      return status;
  }
}
