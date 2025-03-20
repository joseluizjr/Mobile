import { BsBuildingsFill } from 'react-icons/bs';
import { FaCalendarAlt } from 'react-icons/fa';
import { GrDocumentText } from 'react-icons/gr';
import { HiUsers } from 'react-icons/hi';
import { IoMdSettings } from 'react-icons/io';
import { IoChatbubbleEllipsesSharp } from 'react-icons/io5';
import {
  RiArchiveDrawerLine,
  RiBankFill,
  RiBarChart2Fill,
  RiCustomerServiceLine,
  RiMoneyDollarBoxLine,
} from 'react-icons/ri';
import { TbPillFilled } from 'react-icons/tb';

import { ROUTES } from '@/routes/const';

export type MenuItem = {
  id: number;
  name: string;
  link?: string;
  activeRoutes?: string[];
  isSubmenu: boolean;
  submenuItems?: MenuItem[];
  Icon?: ({ ...props }) => JSX.Element;
};

export const MENU: MenuItem[] = [
  {
    id: 1,
    name: 'Recepção',
    Icon: ({ ...props }) => <FaCalendarAlt {...props} />,
    isSubmenu: true,
    submenuItems: [
      {
        id: 1,
        name: 'Cadastros',
        Icon: ({ ...props }) => <HiUsers {...props} />,
        isSubmenu: true,
        submenuItems: [
          {
            id: 1,
            name: 'Pacientes',
            link: ROUTES.PATIENTS.create,
            activeRoutes: [ROUTES.PATIENTS.create],
            Icon: ({ ...props }) => <TbPillFilled {...props} />,
            isSubmenu: false,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Atendimentos',
    link: ROUTES.SERVICES,
    activeRoutes: [ROUTES.SERVICES],
    Icon: ({ ...props }) => <RiCustomerServiceLine {...props} />,
    isSubmenu: false,
  },
  {
    id: 3,
    name: 'Pacientes',
    link: ROUTES.PATIENTS.list,
    activeRoutes: [ROUTES.PATIENTS.list],
    Icon: ({ ...props }) => <HiUsers {...props} />,
    isSubmenu: false,
  },
  {
    id: 4,
    name: 'Laudos',
    link: ROUTES.MEDICAL_REPORTS,
    activeRoutes: [ROUTES.MEDICAL_REPORTS],
    Icon: ({ ...props }) => <TbPillFilled {...props} />,
    isSubmenu: false,
  },
  {
    id: 5,
    name: 'Faturamento',
    link: ROUTES.INVOINCING,
    activeRoutes: [ROUTES.INVOINCING],
    Icon: ({ ...props }) => <RiBarChart2Fill {...props} />,
    isSubmenu: false,
  },
  {
    id: 6,
    name: 'Financeiro',
    link: ROUTES.FINANCIAL,
    activeRoutes: [ROUTES.FINANCIAL],
    Icon: ({ ...props }) => <RiMoneyDollarBoxLine {...props} />,
    isSubmenu: false,
  },
  {
    id: 7,
    name: 'Estoque',
    link: ROUTES.STOCK,
    activeRoutes: [ROUTES.STOCK],
    Icon: ({ ...props }) => <RiArchiveDrawerLine {...props} />,
    isSubmenu: false,
  },
  {
    id: 8,
    name: 'Cobrança',
    link: ROUTES.CHARGE,
    activeRoutes: [ROUTES.CHARGE],
    Icon: ({ ...props }) => <RiBankFill {...props} />,
    isSubmenu: false,
  },
  {
    id: 9,
    name: 'Relatórios',
    link: ROUTES.REPORTS,
    activeRoutes: [ROUTES.REPORTS],
    Icon: ({ ...props }) => <GrDocumentText {...props} />,
    isSubmenu: false,
  },
  {
    id: 10,
    name: 'Configurações',
    Icon: ({ ...props }) => <IoMdSettings {...props} />,
    isSubmenu: true,
    submenuItems: [
      {
        id: 1,
        name: 'Empresas',
        link: ROUTES.COMPANY.list,
        activeRoutes: [ROUTES.COMPANY.list],
        Icon: ({ ...props }) => <BsBuildingsFill {...props} />,
        isSubmenu: false,
      },
    ],
  },
  {
    id: 11,
    name: 'Chat',
    link: ROUTES.CHAT,
    activeRoutes: [ROUTES.CHAT],
    Icon: ({ ...props }) => <IoChatbubbleEllipsesSharp {...props} />,
    isSubmenu: false,
  },
];
