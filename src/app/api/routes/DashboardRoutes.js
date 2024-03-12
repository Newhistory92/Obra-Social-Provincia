import { v4 as uuid } from 'uuid';
import Link from 'next/link';

export const DashboardMenu = [
  {
    id: uuid(),
    title: 'Dashboard',
    icon: 'home',
    link: '/'
  },
  {
    id: uuid(),
    title: 'Menu',
    grouptitle: true
  },
  {
    id: uuid(),
    title: 'Informacion Personal',
    icon: 'layers',
    children: [
      { id: uuid(), link: '/pages/profile', name: 'Profile' },
      { id: uuid(), link: '/pages/settings', name: 'Settings' },
    ]
  },
  {
    id: uuid(),
    title: 'Authentication',
    icon: 'lock',
    children: [
      { id: uuid(), link: '/authentication/sign-in', name: 'Sign In' },
      { id: uuid(), link: '/authentication/sign-up', name: 'Sign Up' },
      { id: uuid(), link: '/authentication/forget-password', name: 'Forget Password' }
    ]
  }
];

export default DashboardMenu;

