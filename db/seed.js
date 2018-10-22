const films = {
  diaryFilms: [
    {
      imdbID: 'tt1856101',
      title: 'Blade Runner 2049',
      plot:
        "A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.",
      actors: [
        'Ryan',
        'Gosling',
        'Dave',
        'Bautista',
        'Robin',
        'Wright',
        'Mark',
        'Arnold'
      ],
      poster:
        'https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_SX300.jpg',
      ratings: [
        {
          Source: 'Internet Movie Database',
          Value: '8.1/10'
        },
        {
          Source: 'Rotten Tomatoes',
          Value: '87%'
        },
        {
          Source: 'Metacritic',
          Value: '81/100'
        }
      ],
      userRating: true,
      diaryID: 'cjnezsz5h000aaefkvv0fmfiv'
    }
  ],
  userID: {
    _id: '000000000000000000000001'
  }
};

const users = [
  {
    _id: '000000000000000000000001',
    username: 'bobuser',
    password: '$2a$10$QJCIX42iD5QMxLRgHHBJre2rH6c6nI24UysmSYtkmeFv6X8uS1kgi'
  }
];

module.exports = { films, users };
