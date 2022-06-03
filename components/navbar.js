import React, { useState } from "react";
import Link from "next/link";
import style from "./navbar.module.css";
import Image from "next/image";
import ActiveLink from "./activeLink";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openingSectionProduct, setOpeningSectionProduct] = useState(false);
  const [openingSectionDelivery, setOpeningSectionDelivery] = useState(false);

  const openMenu = () => setIsOpen(!isOpen);
  const openSectionProduct = () =>
    setOpeningSectionProduct(!openingSectionProduct);
  const openSectionDelivery = () =>
    setOpeningSectionDelivery(!openingSectionDelivery);

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
            height: 40px;
            top: 0;
          }
          .active {
            background-color: black;
            width: 100%;
            height: 40px;
            cursor: pointer;
          }
          .activeSubitem:before {
              background-color: #ff455a;
              content: ".";
              color: #ff455a;
              position: absolute;
              left: 55px;
              height: 20px;
            }
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
                  src="/images/product-logo.svg"
                  alt="logo"
                  width={20}
                  height={20}
                />
              </div>
              <div
                className={
                  openingSectionProduct
                    ? style.navsubmenuContainer + " " + style.activeSection
                    : style.navsubmenuContainer
                }
              >
                <div className={style.navsubmenu}>
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
                  <Image
                    src={
                      openingSectionProduct
                        ? "/images/chevron-up.svg"
                        : "/images/chevron-down.svg"
                    }
                    alt="logo"
                    width={20}
                    height={20}
                    onClick={openSectionProduct}
                  />
                </div>
                <ul
                  className={
                    openingSectionProduct
                      ? style.sectionOpen
                      : style.sectionClose
                  }
                >
                  <li className={style.navsubitem}>
                    <ActiveLink
                      activeClassName="activeSubitem"
                      href="/newproduct"
                    >
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
                    <ActiveLink
                      activeClassName="activeSubitem"
                      href="/products"
                    >
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
                  width={20}
                  height={20}
                />
              </div>
              <div className={style.navsubmenuContainer}>
                <div className={style.navsubmenu}>
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
                  <Image
                    src={
                      openingSectionDelivery
                        ? "/images/chevron-up.svg"
                        : "/images/chevron-down.svg"
                    }
                    alt="logo"
                    width={20}
                    height={20}
                    onClick={openSectionDelivery}
                  />
                </div>
                <ul
                  className={
                    openingSectionDelivery
                      ? style.sectionOpen
                      : style.sectionClose
                  }
                >
                  <li className={style.navsubitem}>
                    <ActiveLink
                      activeClassName="activeSubitem"
                      href="/newdelivery"
                    >
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
                    <ActiveLink
                      activeClassName="activeSubitem"
                      href="/deliveries"
                    >
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
            <li className={style.navList}>
              <ActiveLink activeClassName="active" href="/inventory">
                <div className={style.navitem}>
                  <div className={style.navlogo}>
                    <Image
                      src="/images/graph-logo.svg"
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
                    Inventory
                  </a>
                </div>
              </ActiveLink>
            </li>
            <li className={style.navList}>
              <ActiveLink activeClassName="active" href="/alarms">
                <div className={style.navitem}>
                  <div className={style.navlogo}>
                    <Image
                      src="/images/alarm-logo.svg"
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
                    Alarm
                  </a>
                </div>
              </ActiveLink>
            </li>
            <li className={style.navList}>
              <ActiveLink activeClassName="active" href="/settings">
                <div className={style.navitem}>
                  <div className={style.navlogo}>
                    <Image
                      src="/images/settings-logo.svg"
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
                    Settings
                  </a>
                </div>
              </ActiveLink>
            </li>
            <li className={style.navList}>
              <ActiveLink activeClassName="active" href="/help">
                <div className={style.navitem}>
                  <div className={style.navlogo}>
                    <Image
                      src="/images/help-logo.svg"
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
                    Help
                  </a>
                </div>
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
