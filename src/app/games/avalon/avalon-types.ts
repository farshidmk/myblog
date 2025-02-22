export type AvalonRole = {
  id: number;
  name: string;
  isEvil: boolean;
  imgUrl: string;
};

export type AvalonPlayer = {
  playerName: string;
  roleName: string;
  isEvil: boolean;
  imgUrl: string;
};

export type AvalonContext = {
  /**
   * name of players in the game
   */
  players: AvalonPlayer[];

  /**
   * name of players in the game
   */
  setPlayers: React.Dispatch<React.SetStateAction<AvalonPlayer[]>>;
  /**
   * active game step
   */
  gameStep: "choose-players" | "show-roles" | "in-game" | "show-result";
  /**
   * active game step
   */
  setGameStep: React.Dispatch<React.SetStateAction<AvalonContext["gameStep"]>>;
};
