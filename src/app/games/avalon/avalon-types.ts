export type AvalonRole = {
  id: number;
  name: string;
  isEvil: boolean;
  imgUrl: string;
};

export type AvalonContext = {
  /**
   * name of players in the game
   */
  players: string[];

  /**
   * name of players in the game
   */
  playerWithRoles: string[];
};
