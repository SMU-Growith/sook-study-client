import { Button } from './Button';
import { useLocation, useNavigate } from 'react-router';

export function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    { name: '홈', path: '/home' },
    { name: '숙터디 둘러보기', path: '/study/match' },
    { name: '숙터디 만들기', path: '/study/create' },
    { name: '내 숙터디', path: '/my-studies' },
    { name: '지원 내역', path: '/applications' },
  ];
  return (
    <aside className="fixed top-[88px] left-0 z-30 w-[160px] flex flex-col px-5 pt-10 gap-5 text-body-1">
      {menus.map((menu) => {
        const isActive =
          location.pathname === menu.path ||
          (menu.path === '/study/match' && location.pathname.startsWith('/study/detail'));
        return (
          <button
            key={menu.name}
            className={`h-[52px] px-2 rounded-[12px]
            ${isActive ? 'text-body-1-semibold text-white bg-primary-500 hover:bg-primary-400' : 'text-body-1 text-gray-300 hover:bg-gray-100'}`}
            onClick={() => navigate(menu.path)}
          >
            {menu.name}
          </button>

          // <Button
          //   variant={isActive ? 'primary' : 'defaultGray'}
          //   size="lg"
          //   className={isActive ? 'px-1' : 'px-1 text-body-1'} // [수정필요] className이 적용이 안되는 문제
          //   onClick={() => navigate(menu.path)}
          // >
          //   {menu.name}
          // </Button>
        );
      })}
    </aside>
  );
}
