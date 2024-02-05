import React from "react";
import Head from "next/head";

const HeadComponent = ({ title, meta }) => {
  return (
    <Head>
      <title>{title}</title>
      {meta}
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default HeadComponent;
