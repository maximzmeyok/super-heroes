export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  username: string;
  email: string;
  password: string;
}

export interface CurrentUser {
  email: string;
  password: string;
  expirationDate: number;
}

export interface ApiResponse {
  response: string;
  'results-for'?: string;
  results?: Hero[];
  error?: string;
}

export interface Hero {
  id: string;
  name: string;
  powerstats: any;
  biography: object;
  appearance: object;
  work: object;
  connections: object;
  image: any;
}

export interface BattleResult {
  date: number;
  heroName: string;
  enemyName: string;
  result: string;
}

export interface PowerUp {
  name: string;
  powerstatName: string;
  powerstatValue: string;
  value: number;
  image: string;
}