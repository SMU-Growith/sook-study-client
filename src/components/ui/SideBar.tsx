import { Button } from './button';
import { useLocation, useNavigate } from 'react-router';

export function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    { name: '홈', path: '/home' },
    { name: '숙터디 둘러보기', path: '/studies' },
    { name: '숙터디 만들기', path: '/studies/create' },
    { name: '내 숙터디', path: '/my-studies' },
    { name: '지원 내역', path: '/applications' },
  ];
  return (
    <aside className="fixed top-[88px] left-0 z-30 w-[160px] flex flex-col px-5 pt-10 gap-5 text-body-1">
      {menus.map((menu) => {
        const isActive = location.pathname === menu.path;
        return (
          <Button
            key={menu.name}
            variant={isActive ? 'primary' : 'defaultGray'}
            size="lg"
            className={isActive ? 'px-1' : 'px-1 text-body-1'} // [수정필요] className이 적용이 안되는 문제
            onClick={() => navigate(menu.path)}
          >
            {menu.name}
          </Button>
        );
      })}
    </aside>
  );
}
