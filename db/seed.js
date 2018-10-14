const films = {
  diaryFilms: [
    {
      diaryID: '12345',
      imdbID: 'tt3896198',
      title: 'Guardians of the Galaxy Vol. 2',
      plot:
        "The Guardians must fight to keep their newfound family together as they unravel the mystery of Peter Quill's true parentage.",
      actors: ['Jessica Chastain', 'Joaquin Phoenix'],
      poster:
        'https://m.media-amazon.com/images/M/MV5BMTg2MzI1MTg3OF5BMl5BanBnXkFtZTgwNTU3NDA2MTI@._V1_SX300.jpg',
      ratings: [
        {
          Source: 'Internet Movie Database',
          Value: '7.7/10'
        },
        {
          Source: 'Rotten Tomatoes',
          Value: '83%'
        },
        {
          Source: 'Metacritic',
          Value: '67/100'
        }
      ],
      userRating: 2
    },
    {
      diaryID: '23456',
      imdbID: 'tt0083658',
      title: 'Blade Runner',
      plot:
        'A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.',
      actors: [
        'Harrison Ford',
        'Rutger Hauer',
        'Sean Young',
        'Edward James Olmos'
      ],
      poster:
        'https://m.media-amazon.com/images/M/MV5BNzQzMzJhZTEtOWM4NS00MTdhLTg0YjgtMjM4MDRkZjUwZDBlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
      ratings: [
        {
          Source: 'Internet Movie Database',
          Value: '8.2/10'
        },
        {
          Source: 'Rotten Tomatoes',
          Value: '90%'
        },
        {
          Source: 'Metacritic',
          Value: '89/100'
        }
      ],
      userRating: 5
    }
  ]
};

module.exports = { films };
