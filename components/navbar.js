import React, { useState } from "react";
import Link from "next/link";
import style from "./navbar.module.css";

const MENU_LIST = [
  { text: "Cockpit", href: "/" },
  { text: "Products", href: "/products" },
  { text: "Packages", href: "/packages" },
  { text: "Delivery", href: "/deliveries" },
  { text: "Inventory", href: "/inventory" },
  { text: "Alarms", href: "/alarms" },
  { text: "Settings", href: "/settings" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const openMenu = () => setIsOpen(!isOpen);
  return (
    <header className={style.header}>
      <nav className={style.navbar}>
        <Link href={"/"}>
          <a>
            <h1 className={style.navlogo}>Monoceros</h1>
          </a>
        </Link>
        <ul
          className={
            isOpen === false
              ? style.navmenu
              : style.navmenu + " " + style.active
          }
        >
          {MENU_LIST.map((menu) => (
            <li className={style.navitem} key={menu.href}>
              <Link href={menu.href}>
                <a
                  href={menu.href}
                  className={
                    isOpen === false
                      ? style.navlink
                      : style.navlink + " " + style.active
                  }
                  onClick={openMenu}
                >
                  {menu.text}
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <div
          className={
            isOpen === false
              ? style.hamburger
              : style.hamburger + " " + style.active
          }
          onClick={openMenu}
        >
          <div className={style.bar}></div>
          <div className={style.bar}></div>
          <div className={style.bar}></div>
        </div>
      </nav>
    </header>
  );
}
