import React, { useState } from "react";
import Link from "next/link";
import style from "../styles/navbar.module.css";
import Image from "next/image";
import ActiveLink from "./activeLink";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export default function Navbar() {
  const { t } = useTranslation("navbar");
  const [isOpen, setIsOpen] = useState(false);
  const [openingSectionProduct, setOpeningSectionProduct] = useState(false);
  const [openingSectionDelivery, setOpeningSectionDelivery] = useState(false);
  const router = useRouter();
  const onSelectChange = (e) => {
    const locale = e.target.value;
    router.push(router.asPath, router.asPath, {
      locale,
      scroll: false,
    });
  };

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
            .activeSubitem {
            background-color: black;
            width: 100vh;
            height: 40px;
            cursor: pointer;
            }
          }
        `}</style>
        <Link href={"/"}>
          <a>
            <div className={style.headerlogo}>
              {isOpen ? (
                <Image
                  src="/images/monoceros-logo.jpeg"
                  alt="logo"
                  width={60}
                  height={60}
                  className={style.monocerosLogo}
                />
              ) : (
                <h1 className={style.navbarTitle}>Monoceros</h1>
              )}
            </div>
          </a>
        </Link>
        <div
          className={
            !isOpen ? style.navmenu : style.navmenu + " " + style.active
          }
        >
          {" "}
          <ul className={style.sectionContainer}>
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
                  <a className={style.navlink} onClick={openMenu}>
                    {t("home")}
                  </a>
                </div>
              </ActiveLink>
            </li>
            <li
              className={
                router.pathname.includes("product")
                  ? style.navoveritem + " " + style.activeSection
                  : style.navoveritem
              }
            >
              <div className={style.navlogo}>
                <Image
                  src="/images/product-logo.svg"
                  alt="logo"
                  width={20}
                  height={20}
                />
              </div>
              <div className={style.navsubmenuContainer}>
                <div className={style.navsubmenu}>
                  <p className={style.navlink}>{t("products")}</p>
                  <Image
                    src={"/images/chevron-down.svg"}
                    alt="logo"
                    width={20}
                    height={20}
                    onClick={openSectionProduct}
                    className={
                      openingSectionProduct
                        ? style.chevronUp
                        : style.chevronDown
                    }
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
                      <a className={style.navlink} onClick={openMenu}>
                        {t("newProduct")}
                      </a>
                    </ActiveLink>
                  </li>
                  <li className={style.navsubitem}>
                    <ActiveLink
                      activeClassName="activeSubitem"
                      href="/products"
                    >
                      <a className={style.navlink} onClick={openMenu}>
                        {t("productsCatalogue")}
                      </a>
                    </ActiveLink>
                  </li>
                </ul>
              </div>
            </li>
            <li
              className={
                router.pathname.includes("deliver")
                  ? style.navoveritem + " " + style.activeSection
                  : style.navoveritem
              }
            >
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
                  <p className={style.navlink}>{t("deliveries")}</p>
                  <Image
                    src={"/images/chevron-down.svg"}
                    alt="logo"
                    width={20}
                    height={20}
                    onClick={openSectionDelivery}
                    className={
                      openingSectionDelivery
                        ? style.chevronUp
                        : style.chevronDown
                    }
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
                      <a className={style.navlink} onClick={openMenu}>
                        {t("newDelivery")}
                      </a>
                    </ActiveLink>
                  </li>
                  <li className={style.navsubitem}>
                    <ActiveLink
                      activeClassName="activeSubitem"
                      href="/deliveries"
                    >
                      <a className={style.navlink} onClick={openMenu}>
                        {t("deliveriesOverview")}
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
                  <a className={style.navlink} onClick={openMenu}>
                    {t("inventory")}
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
                  <a className={style.navlink} onClick={openMenu}>
                    {t("alarms")}
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
                  <a className={style.navlink} onClick={openMenu}>
                    {t("settings")}
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
                  <a className={style.navlink} onClick={openMenu}>
                    {t("help")}
                  </a>
                </div>
              </ActiveLink>
            </li>
          </ul>
          <div className={style.borderBottom}></div>
          <div className={style.bottomContainer}>
            <p className={style.navTextBottom}>{t("signOut")}</p>
            <select
              name="languages"
              id="language-select"
              onChange={onSelectChange}
              value={router.locale}
              className={style.selectLanguage}
            >
              {router.locales.map((language) => (
                <option value={language} key={language}>
                  {language === "en" ? "EN" : language === "fr" ? "FR" : null}
                </option>
              ))}
            </select>
          </div>
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

  // onclick sur option avec router.push
}
