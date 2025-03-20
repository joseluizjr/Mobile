import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Loading } from '@/components/ui/loading';
import { useGetUserById } from '@/hooks/users/useGetUserById';
import { ErrorTemplate } from '@/template/errorTemplate';
import { PatientForm } from '@/template/patientForm';
export function EditPatient() {
  const { id } = useParams();

  const { data: patient, isLoading, isError, error } = useGetUserById({ id: id ?? '' });

  const renderContent = useMemo(() => {
    if (isLoading) return <Loading />;

    if (isError) return <ErrorTemplate title={error.message} />;

    return <PatientForm id={id} patient={patient} />;
  }, [isLoading, isError, error, patient, id]);

  return renderContent;
}
