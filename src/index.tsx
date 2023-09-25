import {
  definePlugin,
  PanelSection,
  PanelSectionRow,
  ServerAPI,
  staticClasses,
} from "decky-frontend-lib";
import { VFC } from "react";
import { FaShip } from "react-icons/fa";
import Timer from "./components/timer";

const Content: VFC<{ serverAPI: ServerAPI }> = () => {

  return (
    <PanelSection title="Panel Section">
      <PanelSectionRow>
        <Timer />
      </PanelSectionRow>
    </PanelSection>
  );
};

export default definePlugin((serverApi: ServerAPI) => {

  return {
    title: <div className={staticClasses.Title}>Deck Split</div>,
    content: <Content serverAPI={serverApi} />,
    icon: <FaShip />,
    /* 
      This only renders when the QAM is closed with the plugin open.
      If the user goes back to the plugin list, it no longer renders.
      This would be annoying for the users, but I'm leaving it as is for the moment.
      I have a fix in mind, and will attempt to implement it later.
    */ 
    alwaysRender: true
  };
});
