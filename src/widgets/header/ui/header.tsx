"use client"
import { Menu } from "@/shared/ui/menu";
import { Logo } from "@/shared/logo";

import "./header.scss";
import { navigations } from "@/shared/config/navigation";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function Header() {
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenu(!isMenu);
  };

  const closeMenu = () => {
    setIsMenu(false);
  };

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (isMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenu]);

  return (
    <>
      <header className="header">
        <div className="header__logo">
          <Logo />
        </div>
        <div className="header__logo-mobile">
          <Link href="/">
            <Image src={'/icons/header-mobile/header-mobile.png'} alt="logo" width={35} height={45} />
          </Link>
        </div>

        <nav
          ref={menuRef}
          className={`header__nav ${isMenu ? "active" : ""}`}
        >
          <Menu elementClass="header" navigations={navigations} />
          <div className="header__close">
            <Image
              src={'/icons/hamburger-close.svg'}
              width={30}
              height={30}
              alt="закрыть меню"
              onClick={closeMenu}
            />
          </div>
        </nav>

        {isMenu && <div className="header__overlay" onClick={closeMenu}></div>}

        <div className="header__open">
          <Image
            src={'/icons/hamburger-open.svg'}
            width={30}
            height={50}
            alt="открыть меню"
            onClick={toggleMenu}
          />
        </div>
      </header>
    </>
  );
}