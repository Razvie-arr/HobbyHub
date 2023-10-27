const sports = [
  { name: 'Beach volleyball', id: 2 },
  { name: 'Volleyball', id: 4 },
  { name: 'Football', id: 1 },
  { name: 'Floorball', id: 17 },
  { name: 'Hockey', id: 3 },
  { name: 'Badminton', id: 18 },
  { name: 'Squash', id: 5 },
  { name: 'Biking', id: 16 },
  { name: 'Yoga', id: 7 },
  { name: 'Golf', id: 19 },
];

const games = [
  { name: 'Poker', id: 10 },
  { name: 'eGaming', id: 8 },
  { name: 'Board games', id: 9 },
];

const other = [
  { name: 'Walking', id: 6 },
  { name: 'Meet new people', id: 11 },
  { name: 'Hiking', id: 12 },
  { name: 'Ferata', id: 13 },
  { name: 'Walking the dog', id: 14 },
  { name: 'Strollering', id: 15 },
];

const all = [...sports, ...games, ...other];

export const eventTypes = {
  sports,
  games,
  other,
  all,
};

