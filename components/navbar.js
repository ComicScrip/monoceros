import React, { useState } from "react";
import Link from "next/link";
import style from "./navbar.module.css";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const openMenu = () => setIsOpen(!isOpen);
  return (
    <header className={style.header}>
      <nav className={style.navbar}>
        <Link href={"/"}>
          <a>
            <h1 className={style.navlogo}>
              {isOpen ? (
                <Image
                  src="/images/monoceros-logo.jpeg"
                  alt="logo"
                  width={60}
                  height={60}
                  className={style.monocerosLogo}
                />
              ) : (
                "Monoceros"
              )}
            </h1>
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
              <Image
                src="/images/sliders-logo.svg"
                alt="logo"
                width={20}
                height={20}
                className={style.logo}
              />
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
            <li className={style.navoveritem}>
              <Image
                src="/images/barcode-logo.png"
                alt="logo"
                width={20}
                height={20}
                className={style.logo}
              />
              <p
                className={
                  isOpen === false
                    ? style.navlink
                    : style.navlink + " " + style.active
                }
                onClick={openMenu}
              >
                Products
              </p>
              <ul>
                <li className={style.navsubitem}>
                  <Link href="">
                    <a
                      className={
                        isOpen === false
                          ? style.navlink
                          : style.navlink + " " + style.active
                      }
                    >
                      New Product
                    </a>
                  </Link>
                </li>
                <li className={style.navsubitem}>
                  <Link href="">
                    <a
                      className={
                        isOpen === false
                          ? style.navlink
                          : style.navlink + " " + style.active
                      }
                    >
                      Products catalogue
                    </a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className={style.navoveritem}>
              <Image
                src="/images/box-logo.svg"
                alt="logo"
                width={20}
                height={20}
                className={style.logo}
              />
              <p
                className={
                  isOpen === false
                    ? style.navlink
                    : style.navlink + " " + style.active
                }
                onClick={openMenu}
              >
                Deliveries
              </p>
              <ul>
                <li className={style.navsubitem}>
                  <Link href="">
                    <a
                      className={
                        isOpen === false
                          ? style.navlink
                          : style.navlink + " " + style.active
                      }
                    >
                      New Delivery
                    </a>
                  </Link>
                </li>
                <li className={style.navsubitem}>
                  <Link href="">
                    <a
                      className={
                        isOpen === false
                          ? style.navlink
                          : style.navlink + " " + style.active
                      }
                    >
                      Deliveries overview
                    </a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className={style.navitem}>
              <Image
                src="/images/graph-logo.svg"
                alt="logo"
                width={20}
                height={20}
                className={style.logo}
              />
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
              <Image
                src="/images/alarm-logo.svg"
                alt="logo"
                width={20}
                height={20}
                className={style.logo}
              />
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
              <Image
                src="/images/settings-logo.svg"
                alt="logo"
                width={20}
                height={20}
                className={style.logo}
              />
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
              <Image
                src="/images/help-logo.png"
                alt="logo"
                width={25}
                height={20}
                className={style.logo}
              />
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
