import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

const formSchema = zod.object({
  username: zod.string().min(1, 'Email é obrigatório').email('Email inválido'),
  password: zod.string().min(1, 'Senha é obrigatória'),
});

export const resolverForm = zodResolver(formSchema);

export type SingInFormData = zod.infer<typeof formSchema>;
