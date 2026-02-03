import React from "react";
import { List } from "@react95/core";
import { Explorer103 } from "@react95/icons";
import * as S from "./layoutStyling";

function Portfolio({ closePortfolio, isMobile }) {
  return (
    <S.layoutMain
      isMobile={isMobile}
      title={"Portfolio.txt"}
      closeModal={closePortfolio}
      height="100%"
      icon={<Explorer103 variant="32x32_4" />}
      menu={[
        {
          name: "Options",
          list: (
            <List>
              <List.Item onClick={closePortfolio}>Close</List.Item>
            </List>
          ),
        },
      ]}
    >
      <iframe
        src="/portfolio/index.html"
        title="Portfolio"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          minHeight: '600px'
        }}
      />
    </S.layoutMain>
  );
}

export default Portfolio;