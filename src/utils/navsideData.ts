interface INavsideData {
  id: number;
  name: string;
  icon: string;
  path: string;
}

const navsideData: INavsideData[] = [
  {
    id: 1,
    name: 'Dashboard',
    icon: 'fi fi-tr-category-alt',
    path: '/dashboard',
  },
  {
    id: 2,
    name: 'Rates & Availabality',
    icon: 'fi fi-br-calendar',
    path: '/dashboard/rate',
  },
  {
    id: 3,
    name: 'Reservation',
    icon: 'fi fi-bs-completed',
    path: '/dashboard/reservation',
  },
  {
    id: 4,
    name: 'Room',
    icon: 'fi fi-br-bed-empty',
    path: '/dashboard/room',
  },
  {
    id: 5,
    name: 'Guest review',
    icon: 'fi fi-rr-star',
    path: '/dashboard/guest',
  },
  {
    id: 6,
    name: 'Setting',
    icon: 'fi fi-sr-settings',
    path: '/dashboard/setting',
  },
];

export default navsideData;
