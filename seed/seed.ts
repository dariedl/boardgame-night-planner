import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const boardgames = [
  {
    id: "1",
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
    id: "2",
    title: "Deception: Murder in Hong Kong",
    description: "Versucht den Mörder in der Gruppe zu finden!",
    urlLink:
      "https://cf.geekdo-images.com/zO84ilahtRIhXjsqzmfC_g__imagepage/img/1EwCoLbg_xPnvQoIugbfTFwpD0U=/fit-in/900x600/filters:no_upscale():strip_icc()/pic2568916.jpg",
    minPlayers: 4,
    maxPlayers: 12,
    weight: "light",
  },
  {
    id: "3",
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
    id: "4",
    title: "7 Wonders",
    description: "Draftet Karten um eure antike Zivilisation aufzubauen.",
    urlLink:
      "https://cf.geekdo-images.com/35h9Za_JvMMMtx_92kT0Jg__imagepage/img/WKlTys0Dc3F6x9r05Fwyvs82tz4=/fit-in/900x600/filters:no_upscale():strip_icc()/pic7149798.jpg",
    minPlayers: 3,
    maxPlayers: 7,
    weight: "midweight",
  },
  {
    id: "5",
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
    id: "1",
    name: "Daniel Riedl",
  },
  {
    id: "2",
    name: "Veronika Bernhofer",
  },
  {
    id: "3",
    name: "Daniel Grimm",
  },
  {
    id: "4",
    name: "Jörn Hansen",
  },
  {
    id: "5",
    name: "Olga Kuhnt",
  },
  {
    id: "6",
    name: "Mark Hitzig",
  },
  {
    id: "7",
    name: "Mika Schult",
  },
];

async function createBoardgames() {
  for (let boardgame of boardgames) {
    await prisma.boardgame.create({
      data: {
        id: boardgame.id,
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

const votes = [
  {
    userId: "1",
    boardgameId: "3",
    type: "interest",
  },
  {
    userId: "1",
    boardgameId: "1",
    type: "interest",
  },
  {
    userId: "2",
    boardgameId: "3",
    type: "commit",
  },
  {
    userId: "3",
    boardgameId: "4",
    type: "interest",
  },
  {
    userId: "3",
    boardgameId: "3",
    type: "commit",
  },
];

async function createUsers() {
  for (let user of users) {
    await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
      },
    });
  }
}

async function createVotes() {
  for (let vote of votes) {
    await prisma.vote.create({
      data: {
        userId: vote.userId,
        boardgameId: vote.boardgameId,
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
