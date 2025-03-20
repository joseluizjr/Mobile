import { Route, Routes } from 'react-router-dom';

import { AppLayout } from '@/layout/app-layout';
import { AuthLayout } from '@/layout/auth.layout';
import { CreateCompany, EditCompany, ListCompanies } from '@/pages/company';
import { Dashboard } from '@/pages/dashboard';
import { Login } from '@/pages/login';
import { CreatePatients, EditPatient, ListPatients } from '@/pages/patients';

import { ROUTES } from './const';

export function Router() {
  return (
    <Routes>
      <Route path={ROUTES.INITIAL} element={<AuthLayout />}>
        <Route index path={ROUTES.INITIAL} element={<Login />} />
      </Route>
      <Route path="/" element={<AppLayout />}>
        <Route index path={ROUTES.WELCOME_PAGE} element={<Dashboard />} />
        <Route index path={ROUTES.PATIENTS.create} element={<CreatePatients />} />
        <Route index path={ROUTES.PATIENTS.list} element={<ListPatients />} />
        <Route index path={`${ROUTES.PATIENTS.edit}/:id`} element={<EditPatient />} />
        <Route index path={ROUTES.COMPANY.list} element={<ListCompanies />} />
        <Route index path={ROUTES.COMPANY.create} element={<CreateCompany />} />
        <Route index path={`${ROUTES.COMPANY.edit}/:id`} element={<EditCompany />} />
      </Route>
    </Routes>
  );
}
