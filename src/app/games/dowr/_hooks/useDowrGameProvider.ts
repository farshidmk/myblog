import { useContext } from "react";
import { DowrGameContext } from "../_providers/dowrGameProvider";

const useDowrGame = () => {
  const context = useContext(DowrGameContext);
  if (context === undefined) {
    throw new Error(`useDowrGame must be used within a DowrGameContext`);
  }
  return context;
};

export default useDowrGame;
