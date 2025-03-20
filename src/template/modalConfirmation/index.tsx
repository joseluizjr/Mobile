import { DialogHTMLAttributes } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loading } from '@/components/ui/loading';

interface IModalConfirmation extends DialogHTMLAttributes<HTMLDialogElement> {
  title: string;
  description: string;
  onOpenChange: (status: boolean) => void;
  onSubmitForm: () => void;
  isLoading?: boolean;
  textButtonSave?: string;
}

export function ModalConfirmation({
  title,
  description,
  onOpenChange,
  onSubmitForm,
  isLoading,
  textButtonSave,
  ...rest
}: IModalConfirmation) {
  return (
    <Dialog onOpenChange={onOpenChange} {...rest}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">{description}</div>
        <DialogFooter>
          <DialogClose>
            <Button
              variant="outline"
              type="button"
              className="px-4 py-2 text-med-green rounded-lg shadow-md hover:bg-med-green-dark"
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            className="px-4 py-2 bg-med-green text-white rounded-lg shadow-md hover:bg-med-green hover:opacity-75"
            type="submit"
            onClick={onSubmitForm}
            disabled={isLoading}
          >
            {isLoading ? <Loading type="WHITE" /> : (textButtonSave ?? 'Salvar')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
