import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
dotenv.config();
const prisma = new PrismaClient();

const boardgames = [
  {
    title: "Spirit Island",
    urlLink:
      "https://cf.geekdo-images.com/a13ieMPP2s0KEaKNYmtH5w__imagepage/img/rOgQ2nxh9prgVBamT00eueWS2TA=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3615739.png",
    description:
      "Vertreibt kooperative als Naturgeister, europäische Kolonisten von eurer Insel.",
    minPlayers: 2,
    maxPlayers: 4,
    weight: "heavy",
  },
  {
    title: "Deception: Murder in Hong Kong",
    description: "Versucht den Mörder in der Gruppe zu finden!",
    urlLink:
      "https://cf.geekdo-images.com/zO84ilahtRIhXjsqzmfC_g__imagepage/img/1EwCoLbg_xPnvQoIugbfTFwpD0U=/fit-in/900x600/filters:no_upscale():strip_icc()/pic2568916.jpg",
    minPlayers: 4,
    maxPlayers: 12,
    weight: "light",
  },
  {
    title: "Flügelschlag",
    description:
      "Sammelt die meisten Punkte mit verschiedenen schönen Vogelkarten.",
    urlLink:
      "https://cf.geekdo-images.com/yLZJCVLlIx4c7eJEWUNJ7w__imagepage/img/uIjeoKgHMcRtzRSR4MoUYl3nXxs=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4458123.jpg",
    minPlayers: 2,
    maxPlayers: 5,
    weight: "midweight",
  },
  {
    title: "7 Wonders",
    description: "Draftet Karten um eure antike Zivilisation aufzubauen.",
    urlLink:
      "https://cf.geekdo-images.com/35h9Za_JvMMMtx_92kT0Jg__imagepage/img/WKlTys0Dc3F6x9r05Fwyvs82tz4=/fit-in/900x600/filters:no_upscale():strip_icc()/pic7149798.jpg",
    minPlayers: 3,
    maxPlayers: 7,
    weight: "midweight",
  },
  {
    title: "Schafkopf",
    description: "Bayrisches Schafkopf",
    urlLink:
      "https://mytoys.scene7.com/is/image/myToys/ext/15290150-01.jpg?$rtf_mt_prod-main_xl$",
    minPlayers: 4,
    maxPlayers: 4,
    weight: "light",
  },
];

const users = [
  {
    name: "Daniel",
    password: "arr",
  },
  {
    name: "Veronika",
    password: "hoh",
  },
  {
    name: "Tom",
    password: "aye",
  },
];

const votes = [
  {
    user: users[0].name,
    boardgame: boardgames[2].title,
    type: "interest",
  },
  {
    user: users[1].name,
    boardgame: boardgames[1].title,
    type: "commit",
  },
  {
    user: users[1].name,
    boardgame: boardgames[2].title,
    type: "interest",
  },
  {
    user: users[2].name,
    boardgame: boardgames[3].title,
    type: "commit",
  },
];

async function createBoardgames() {
  for (let boardgame of boardgames) {
    await prisma.boardgame.create({
      data: {
        title: boardgame.title,
        urlLink: boardgame.urlLink,
        description: boardgame.description,
        minPlayers: boardgame.minPlayers,
        maxPlayers: boardgame.maxPlayers,
        weight: boardgame.weight,
      },
    });
  }
}

async function createUsers() {
  const saltRounds = parseInt(
    process.env.HASH_SALT_ROUNDS ?? "No Saltnumber defined"
  );
  for (let user of users) {
    const hash = await bcrypt.hash(user.password, saltRounds);
    await prisma.user.create({
      data: {
        name: user.name,
        hashedPassword: hash,
      },
    });
  }
}

async function createVotes() {
  for (let vote of votes) {
    const user = await prisma.user.findUnique({ where: { name: vote.user } });
    const boardgame = await prisma.boardgame.findUnique({
      where: { title: vote.boardgame },
    });
    await prisma.vote.create({
      data: {
        userId: user!.id,
        boardgameId: boardgame!.id,
        type: vote.type,
      },
    });
  }
}
async function cleanDb() {
  await prisma.vote.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.boardgame.deleteMany({});
}

async function main() {
  await cleanDb();
  await createUsers();
  await createBoardgames();
  await createVotes();
}

main();
