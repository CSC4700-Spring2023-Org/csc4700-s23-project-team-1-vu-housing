export interface Joke {
        error: boolean,
        category: string,
        type: string,
        joke: string,
        flags: Flags,
}
export interface Flags {
    nsfw: boolean,
    religious: boolean,
    political: boolean,
    racist: boolean,
    sexist: boolean,
    explicit: boolean,
}
    // {
    //     "result": {
    //       "price": "$2,300,000",
    //       "address": "264 Stuyvesant Avenue UNIT 4, Bed-Stuy, NY 11221",
    //       "bedrooms": "6 bd",
    //       "bathrooms": "4 ba",
    //       "living_area": "3,520 sqft",
    //       "time_on_zillow": "2 days",
    //       "views": "422",
    //       "saves": "20",
    //       "images": [
    //         "https://photos.zillowstatic.com/fp/d05b64fcf5ee681f711c1974f305dd69-cc_ft_960.jpg",
    //         "https://photos.zillowstatic.com/fp/8f6fac275b8eaa9151cf668d4d975608-cc_ft_576.jpg",
    //         "https://photos.zillowstatic.com/fp/09d0fa1829886680e9c1f16101b2d456-cc_ft_576.jpg",
    //         "https://photos.zillowstatic.com/fp/21fc3ea519bbf78a79a6c2e875a65ef4-cc_ft_576.jpg",
    //         "https://photos.zillowstatic.com/fp/d65c318f1af3bfdc882fa94150d145e8-cc_ft_576.jpg",
    //         "https://photos.zillowstatic.com/fp/f888fc996cbefda7eb87046fc9bf4660-cc_ft_576.jpg",
    //         "https://photos.zillowstatic.com/fp/92ccb633c27684fa07756f21d4da01cc-cc_ft_576.jpg"
    //       ]
    //     }
    //   }