import React from "react";
import { List } from "@react95/core";
import { Awfxcg321303 } from "@react95/icons";
import * as S from "./layoutStyling";

function CV({ closeCV, isMobile }) {
  return (
    <S.layoutMain
      isMobile={isMobile}
      title={"CV.txt"}
      closeModal={closeCV}
      height="100%"
      icon={<Awfxcg321303 variant="32x32_4" />}
      menu={[
        {
          name: "Options",
          list: (
            <List>
              <List.Item onClick={closeCV}>Close</List.Item>
            </List>
          ),
        },
      ]}
    >
      <S.layoutMainContent bg="white" boxShadow="in">
        <iframe
          src="/cv/index.html"
          title="Curriculum Vitae"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            minHeight: '500px'
          }}
        />
      </S.layoutMainContent>
    </S.layoutMain>
  );
}

export default CV;
