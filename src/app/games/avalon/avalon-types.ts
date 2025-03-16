export type AvalonRoleName =
  | "Merlin"
  | "Morgana"
  | "Percival"
  | "Assassin"
  | "Devil"
  | "Mordred"
  | "Loyal Servant"
  | "Oberon"
  | "King Arthur";
export type AvalonRole = {
  id: number;
  name: AvalonRoleName;
  isEvil: boolean;
  imgUrl: string;
};

export type AvalonPlayer = {
  playerName: string;
  roleName: AvalonRoleName;
  isEvil: boolean;
  imgUrl: string;
};

export type Mission = {
  teamSize: number;
  requiredFails: number;
  result?: "success" | "fail";
  team?: string[];
  /**
   * Votes for the mission name of the player and the result of the mission true is for success and false is for fail
   */
  votes?: Record<string, boolean>;
};

export type TeamProposal = {
  leader: string;
  team: string[];
  votes: Record<string, boolean>;
};

export type AvalonContext = {
  /**
   * Players in the game
   */
  players: AvalonPlayer[];

  /**
   * Set players
   */
  setPlayers: React.Dispatch<React.SetStateAction<AvalonPlayer[]>>;

  /**
   * Active game step
   */
  gameStep: "choose-players" | "show-roles" | "in-game" | "show-result";

  /**
   * Set game step
   */
  setGameStep: React.Dispatch<React.SetStateAction<AvalonContext["gameStep"]>>;

  /**
   * Current mission number (1-5)
   */
  currentMission: number;

  /**
   * Set current mission
   */
  setCurrentMission: React.Dispatch<React.SetStateAction<number>>;

  /**
   * Mission history
   */
  missions: Mission[];

  /**
   * Set missions
   */
  setMissions: React.Dispatch<React.SetStateAction<Mission[]>>;

  /**
   * Current team proposal
   */
  currentProposal: TeamProposal | null;

  /**
   * Set current proposal
   */
  setCurrentProposal: React.Dispatch<React.SetStateAction<TeamProposal | null>>;

  /**
   * Number of failed proposals in current round
   */
  failedProposals: number;

  /**
   * Set failed proposals
   */
  setFailedProposals: React.Dispatch<React.SetStateAction<number>>;

  /**
   * Current leader index
   */
  leaderIndex: number;

  /**
   * Set leader index
   */
  setLeaderIndex: React.Dispatch<React.SetStateAction<number>>;
};

export type AvalonGetPlayersNameForm = { players: { name: string }[] };
