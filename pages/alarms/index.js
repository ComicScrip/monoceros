import Meta from "../../components/meta";
import Layout from "../../components/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { MdLightMode } from "react-icons/md";
import { RiTempColdLine } from "react-icons/ri";
import { IoWater } from "react-icons/io";
import { AiOutlineDashboard } from "react-icons/ai";
import { GiHandcuffed } from "react-icons/gi";
import { BsFillCalendarXFill } from "react-icons/bs";

const Alarms = () => {
  const { t } = useTranslation("alarms");
  return (
    <Layout>
      <Meta pagetitle={t("pageTitle")} />
      <h1>{t("title")}</h1>
    </Layout>
  );
};

export default Alarms;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "home",
        "navbar",
        "alarms",
      ])),
    },
  };
}
