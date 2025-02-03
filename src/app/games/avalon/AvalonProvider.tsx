import React from "react";
import { AvalonContext } from "./avalon-types";

export const AvalonGameContext = React.createContext<AvalonContext>({
  players: [],
  playerWithRoles: [],
});
type Props = {
  children: React.ReactNode;
};

const AvalonProvider = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default AvalonProvider;
