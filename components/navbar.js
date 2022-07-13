import React, { useState } from "react";
import Link from "next/link";
import style from "../styles/navbar.module.css";
import Image from "next/image";
import ActiveLink from "./activeLink";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { signOut } from "next-auth/react";
import headLogo from "../public/images/MONOCEROS-logo-3.webp";
import { RiQrScan2Line } from "react-icons/ri";

export default function Navbar() {
  const { t } = useTranslation("navbar");
  const [isOpen, setIsOpen] = useState(false);
  const [openingSectionProduct, setOpeningSectionProduct] = useState(false);
  const [openingSectionDelivery, setOpeningSectionDelivery] = useState(false);
  const [openingSectionPackages, setOpeningSectionPackages] = useState(false);
  const router = useRouter();
  const onSelectChange = (e) => {
    const locale = e.target.value;
    router.push(router.asPath, router.asPath, {
      locale,
      scroll: false,
    });
  };

  const openMenu = () => setIsOpen(!isOpen);
  const openSectionProduct = () => {
    setOpeningSectionProduct(!openingSectionProduct);
    setOpeningSectionDelivery(false);
    setOpeningSectionPackages(false);
  };

  const openSectionDelivery = () => {
    setOpeningSectionDelivery(!openingSectionDelivery);
    setOpeningSectionPackages(false);
    setOpeningSectionProduct(false);
  };

  const openSectionPackages = () => {
    setOpeningSectionPackages(!openingSectionPackages);
    setOpeningSectionProduct(false);
    setOpeningSectionDelivery(false);
  };

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
                <Image
                  src={headLogo}
                  alt="head-logo"
                  width="200px"
                  height="70px"
                  className={style.navbarTitle}
                />
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
                <div className={style.navsubmenu} onClick={openSectionProduct}>
                  <p className={style.navlink + " " + style.navlinkTitle}>
                    {t("products")}
                  </p>
                  <Image
                    src={"/images/chevron-down.svg"}
                    alt="logo"
                    width={20}
                    height={20}
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
                router.pathname.includes("package")
                  ? style.navoveritem + " " + style.activeSection
                  : style.navoveritem
              }
            >
              <div className={style.navlogo}>
                <RiQrScan2Line
                  style={{ width: "20px", height: "20px", color: "white" }}
                />
              </div>
              <div className={style.navsubmenuContainer}>
                <div className={style.navsubmenu} onClick={openSectionPackages}>
                  <p className={style.navlink + " " + style.navlinkTitle}>
                    {t("packages")}
                  </p>
                  <Image
                    data-cy="expand-packages"
                    src={"/images/chevron-down.svg"}
                    alt="logo"
                    width={20}
                    height={20}
                    className={
                      openingSectionPackages
                        ? style.chevronUp
                        : style.chevronDown
                    }
                  />
                </div>
                <ul
                  className={
                    openingSectionPackages
                      ? style.sectionOpen
                      : style.sectionClose
                  }
                >
                  <li className={style.navsubitem}>
                    <ActiveLink
                      activeClassName="activeSubitem"
                      href="/newpackage"
                    >
                      <a className={style.navlink} onClick={openMenu}>
                        {t("newPackage")}
                      </a>
                    </ActiveLink>
                  </li>
                  <li className={style.navsubitem}>
                    <ActiveLink
                      activeClassName="activeSubitem"
                      href="/packages"
                    >
                      <a
                        data-cy="packages-catalogue"
                        className={style.navlink}
                        onClick={openMenu}
                      >
                        {t("packagesCatalogue")}
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
                <div className={style.navsubmenu} onClick={openSectionDelivery}>
                  <p className={style.navlink + " " + style.navlinkTitle}>
                    {t("deliveries")}
                  </p>
                  <Image
                    src={"/images/chevron-down.svg"}
                    alt="logo"
                    width={20}
                    height={20}
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
                    className={style.navlink + " " + style.navlinkTitle}
                    onClick={openMenu}
                  >
                    {t("alarms")}
                  </a>
                </div>
              </ActiveLink>
            </li>
          </ul>
          <div className={style.borderBottom}></div>
          <div className={style.bottomContainer}>
            <p
              onClick={() => signOut({ callbackUrl: "/" })}
              className={style.navTextBottom}
            >
              {t("signOut")}
            </p>
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
}
