import React, { useState } from "react";
import Link from "next/link";
import style from "./navbar.module.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const openMenu = () => setIsOpen(!isOpen);
  return (
    <header className={style.header}>
      <nav className={style.navbar}>
        <Link href={"/"}>
          <a>
            <h1 className={style.navlogo}>{isOpen ? "" : "Monoceros"}</h1>
          </a>
        </Link>
        <div
          className={
            isOpen === false
              ? style.navmenu
              : style.navmenu + " " + style.active
          }
        >
          {" "}
          <ul>
            <li className={style.navitem}>
              <Link href="/">
                <a
                  className={
                    isOpen === false
                      ? style.navlink
                      : style.navlink + " " + style.active
                  }
                  onClick={openMenu}
                >
                  Cockpit
                </a>
              </Link>
            </li>
            <li className={style.navitem}>
              <Link href="/products">
                <a
                  className={
                    isOpen === false
                      ? style.navlink
                      : style.navlink + " " + style.active
                  }
                  onClick={openMenu}
                >
                  Products
                </a>
              </Link>
            </li>
            <div className={style.navitem}>
              <p className={style.navlink}>Deliveries</p>
            </div>
            <li className={style.navitem}>
              <Link href="/newdelivery">
                <a
                  className={
                    isOpen === false
                      ? style.navlink
                      : style.navlink + " " + style.active
                  }
                  onClick={openMenu}
                >
                  New Delivery
                </a>
              </Link>
            </li>
            <li className={style.navitem}>
              <Link href="/deliveries">
                <a
                  className={
                    isOpen === false
                      ? style.navlink
                      : style.navlink + " " + style.active
                  }
                  onClick={openMenu}
                >
                  Delivery Overviews
                </a>
              </Link>
            </li>
            <li className={style.navitem}>
              <Link href="/inventory">
                <a
                  className={
                    isOpen === false
                      ? style.navlink
                      : style.navlink + " " + style.active
                  }
                  onClick={openMenu}
                >
                  Inventory
                </a>
              </Link>
            </li>
            <li className={style.navitem}>
              <Link href="/alarms">
                <a
                  className={
                    isOpen === false
                      ? style.navlink
                      : style.navlink + " " + style.active
                  }
                  onClick={openMenu}
                >
                  Alarms
                </a>
              </Link>
            </li>
            <li className={style.navitem}>
              <Link href="/settings">
                <a
                  className={
                    isOpen === false
                      ? style.navlink
                      : style.navlink + " " + style.active
                  }
                  onClick={openMenu}
                >
                  Settings
                </a>
              </Link>
            </li>
            <li className={style.navitem}>
              <Link href="/help">
                <a
                  className={
                    isOpen === false
                      ? style.navlink
                      : style.navlink + " " + style.active
                  }
                  onClick={openMenu}
                >
                  Help
                </a>
              </Link>
            </li>
          </ul>
          <div className={style.borderBottom}></div>
          <p className={style.navTextBottom}>Sign Out</p>
        </div>

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
