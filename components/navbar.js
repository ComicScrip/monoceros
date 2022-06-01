import React, { useState } from "react";
import Link from "next/link";
import style from "./navbar.module.css";
import Image from "next/image";
import ActiveLink from "./activeLink";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const openMenu = () => setIsOpen(!isOpen);
  return (
    <header className={style.header}>
      <nav className={style.navbar}>
        <style jsx>{`
          .active:before {
            background-color: #ff455a;
            content: ".";
            color: #ff455a;
            position: absolute;
            left: 0;
            height: 25px;
          }
          .active {
            background-color: black;
            width: 100%;
            height: 100%;
            cursor: pointer;
          }
        `}</style>
        <Link href={"/"}>
          <a>
            <h1 className={style.headerlogo}>
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
            <li className={style.navList}>
              <ActiveLink activeClassName="active" href="/">
                <div className={style.navitem}>
                  <div className={style.navlogo}>
                    <Image
                      src="/images/sliders-logo.svg"
                      alt="logo"
                      width={20}
                      height={20}
                    />
                  </div>
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
                </div>
              </ActiveLink>
            </li>
            <li className={style.navoveritem}>
              <div className={style.navlogo}>
                <Image
                  src="/images/barcode-logo.png"
                  alt="logo"
                  width={20}
                  height={20}
                />
              </div>
              <div>
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
                    <ActiveLink activeClassName="active" href="">
                      <a
                        className={
                          isOpen === false
                            ? style.navlink
                            : style.navlink + " " + style.active
                        }
                      >
                        New Product
                      </a>
                    </ActiveLink>
                  </li>
                  <li className={style.navsubitem}>
                    <ActiveLink activeClassName="active" href="/products">
                      <a
                        className={
                          isOpen === false
                            ? style.navlink
                            : style.navlink + " " + style.active
                        }
                      >
                        Products catalogue
                      </a>
                    </ActiveLink>
                  </li>
                </ul>
              </div>
            </li>
            <li className={style.navoveritem}>
              <div className={style.navlogo}>
                <Image
                  src="/images/box-logo.svg"
                  alt="logo"
                  width={30}
                  height={30}
                />
              </div>
              <div>
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
                    <ActiveLink activeClassName="active" href="">
                      <a
                        className={
                          isOpen === false
                            ? style.navlink
                            : style.navlink + " " + style.active
                        }
                      >
                        New Delivery
                      </a>
                    </ActiveLink>
                  </li>
                  <li className={style.navsubitem}>
                    <ActiveLink activeClassName="active" href="">
                      <a
                        className={
                          isOpen === false
                            ? style.navlink
                            : style.navlink + " " + style.active
                        }
                      >
                        Deliveries overview
                      </a>
                    </ActiveLink>
                  </li>
                </ul>
              </div>
            </li>
            <li className={style.navitem}>
              <div className={style.navlogo}>
                <Image
                  src="/images/graph-logo.svg"
                  alt="logo"
                  width={20}
                  height={20}
                />
              </div>
              <ActiveLink activeClassName="active" href="/inventory">
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
              </ActiveLink>
            </li>
            <li className={style.navitem}>
              <div className={style.navlogo}>
                <Image
                  src="/images/alarm-logo.svg"
                  alt="logo"
                  width={20}
                  height={20}
                />
              </div>
              <ActiveLink activeClassName="active" href="/alarms">
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
              </ActiveLink>
            </li>
            <li className={style.navitem}>
              <div className={style.navlogo}>
                <Image
                  src="/images/settings-logo.svg"
                  alt="logo"
                  width={20}
                  height={20}
                />
              </div>
              <ActiveLink activeClassName="active" href="/settings">
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
              </ActiveLink>
            </li>
            <li className={style.navitem}>
              <div className={style.navlogo}>
                <Image
                  src="/images/help-logo.png"
                  alt="logo"
                  width={25}
                  height={20}
                />
              </div>
              <ActiveLink activeClassName="active" href="/help">
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
              </ActiveLink>
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
