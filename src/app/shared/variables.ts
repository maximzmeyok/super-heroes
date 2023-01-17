import { PowerUp } from "./interfaces";

export const DATE: string = 'date';
export const HERO_NAME: string = 'heroName';
export const ENEMY_NAME: string = 'enemyName';
export const RESULT: string = 'result';

export const POWER_UPS: PowerUp[] = [
  {
    name: 'Captain America shield',
    powerstatName: 'durability',
    powerstatValue: '10',
    value: 5,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Captain_America%27s_shield.svg/220px-Captain_America%27s_shield.svg.png'
  },
  {
    name: "Mjolnir",
    powerstatName: 'power',
    powerstatValue: '10',
    value: 5,
    image: 'https://www.seekpng.com/png/small/57-573278_thor-hammer-png-image-transparent-download-mjolnir-icon.png'
  },
  {
    name: "Ironman nano armor",
    powerstatName: 'combat',
    powerstatValue: '10',
    value: 5,
    image: 'https://simg.nicepng.com/png/small/78-782326_ironman1icon-reactor-arc-iron-man.png'
  },
  {
    name: "Dr. Strange's cloak",
    powerstatName: 'intelligence',
    powerstatValue: '10',
    value: 5,
    image: 'https://p.jing.fm/clipimg/small/175-1752857_doctor-strange-costume-png-doctor-strange-editing-background.png'
  },
  {
    name: "Green lantern's ring",
    powerstatName: 'strength',
    powerstatValue: '10',
    value: 5,
    image: 'https://i.pinimg.com/originals/2f/e2/8c/2fe28ce820eed86d6d8a42fae92a17b1.png'
  },
  {
    name: "Flash boots",
    powerstatName: 'speed',
    powerstatValue: '10',
    value: 5,
    image: 'https://sportshub.cbsistatic.com/i/2021/10/15/56cf7304-3358-4a0b-b3bb-29190ac2a3e2/the-flash-season-8-gold-boots-2.jpg?auto=webp&width=1080&height=1080&crop=1:1,smart'
  },
];