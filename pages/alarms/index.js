import Meta from "../../components/meta";
import Layout from "../../components/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import AlarmsList from "../../components/alarmsList";
import alarmsStyle from "../../styles/alarms.module.css";

const Alarms = () => {
  const { t } = useTranslation("alarms");
  return (
    <Layout>
      <Meta pagetitle={t("pageTitle")} />
      <h1 className={alarmsStyle.head}>{t("title")}</h1>
      <AlarmsList />
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
