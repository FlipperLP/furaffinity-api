export enum SearchType {
  Art = 1,
  Music = 1 << 1,
  Flash = 1 << 2,
  Story = 1 << 3,
  Photos = 1 << 4,
  Poetry = 1 << 5,
  All = 0x3f
}

export enum SubmissionType {
  "image" = 1,
  "flash" = 2,
  "text" = 3,
  "audio" = 4
}

export enum Rating {
  General = 1,
  Mature = 1 << 1,
  Adult = 1 << 2,
  Any = 0x7
}

export type RangeType = "all" | "5years" | "3years" | "1year" | "90days" | "30days" | "7days" | "3days" | "1day" | "manual";
export type MatchMode = "extended" | "all" | "any";
export type OrderBy = "relevancy" | "date" | "popularity";
export type OrderDirection = "asc" | "desc";

export enum Category {
  "All" = 1,
  "Artwork (Digital)" = 2,
  "Artwork (Traditional)" = 3,
  "Cellshading" = 4,
  "Crafting" = 5,
  "Designs" = 6,
  "Flash" = 7,
  "Fursuiting" = 8,
  "Icons" = 9,
  "Mosaics" = 10,
  "Photography" = 11,
  "Sculpting" = 12,
  "Story" = 13,
  "Poetry" = 14,
  "Prose" = 15,
  "Music" = 16,
  "Podcasts" = 17,
  "Skins" = 18,
  "Handhelds" = 19,
  "Resources" = 20,
  "Adoptables" = 21,
  "Auctions" = 22,
  "Contests" = 23,
  "Current Events" = 24,
  "Desktops" = 25,
  "Stockart" = 26,
  "Screenshots" = 27,
  "Scraps" = 28,
  "Wallpaper" = 29,
  "YCH / Sale" = 30,
  "Other" = 31
}

export enum Tag {
  "All" = 1,
  "Abstract" = 2,
  "Animal related (non-anthro)" = 3,
  "Anime" = 4,
  "Comics" = 5,
  "Doodle" = 6,
  "Fanart" = 7,
  "Fantasy" = 8,
  "Human" = 9,
  "Portraits" = 10,
  "Scenery" = 11,
  "Still Life" = 12,
  "Tutorials" = 13,
  "Miscellaneous" = 14,
  "Baby fur" = 101,
  "Bondage" = 102,
  "Digimon" = 103,
  "Fat Furs" = 104,
  "Fetish Other" = 105,
  "Fursuit" = 106,
  "Gore / Macabre Art" = 119,
  "Hyper" = 107,
  "Inflation" = 108,
  "Macro / Micro" = 109,
  "Muscle" = 110,
  "My Little Pony / Brony" = 111,
  "Paw" = 112,
  "Pokemon" = 113,
  "Pregnancy" = 114,
  "Sonic" = 115,
  "Transformation" = 116,
  "TF / TG" = 120,
  "Vore" = 117,
  "Water Sports" = 118,
  "General Furry Art" = 100,
  "Techno" = 201,
  "Trance" = 202,
  "House" = 203,
  "90s" = 204,
  "80s" = 205,
  "70s" = 206,
  "60s" = 207,
  "Pre-60s" = 208,
  "Classical" = 209,
  "Game Music" = 210,
  "Rock" = 211,
  "Pop" = 212,
  "Rap" = 213,
  "Industrial" = 214,
  "Other Music" = 200
}

export enum Species {
  "Unspecified / Any" = 1,
  "Frog" = 1001,
  "Newt" = 1002,
  "Salamander" = 1003,
  "Amphibian (Other)" = 1000,
  "Cephalopod" = 2001,
  "Dolphin" = 2002,
  "Fish" = 2005,
  "Porpoise" = 2004,
  "Seal" = 6068,
  "Shark" = 2006,
  "Whale" = 2003,
  "Aquatic (Other)" = 2000,
  "Corvid" = 3001,
  "Crow" = 3002,
  "Duck" = 3003,
  "Eagle" = 3004,
  "Falcon" = 3005,
  "Goose" = 3006,
  "Gryphon" = 3007,
  "Hawk" = 3008,
  "Owl" = 3009,
  "Phoenix" = 3010,
  "Swan" = 3011,
  "Avian (Other)" = 3000,
  "Bear" = 6002,
  "Camel" = 6074,
  "Llama" = 6036,
  "Coyote" = 6008,
  "Doberman" = 6009,
  "Dog" = 6010,
  "Dingo" = 6011,
  "German Shepherd" = 6012,
  "Jackal" = 6013,
  "Husky" = 6014,
  "Wolf" = 6016,
  "Canine (Other)" = 6017,
  "Cervine (Other)" = 6018,
  "Antelope" = 6004,
  "Cows" = 6003,
  "Gazelle" = 6005,
  "Goat" = 6006,
  "Bovines (General)" = 6007,
  "Eastern Dragon" = 4001,
  "Hydra" = 4002,
  "Serpent" = 4003,
  "Western Dragon" = 4004,
  "Wyvern" = 4005,
  "Dragon (Other)" = 4000,
  "Donkey" = 6019,
  "Horse" = 6034,
  "Pony" = 6073,
  "Zebra" = 6071,
  "Argonian" = 5002,
  "Chakat" = 5003,
  "Chocobo" = 5004,
  "Citra" = 5005,
  "Crux" = 5006,
  "Daemon" = 5007,
  "Digimon" = 5008,
  "Dracat" = 5009,
  "Draenei" = 5010,
  "Elf" = 5011,
  "Gargoyle" = 5012,
  "Iksar" = 5013,
  "Kaiju/Monster" = 5015,
  "Langurhali" = 5014,
  "Moogle" = 5017,
  "Naga" = 5016,
  "Orc" = 5018,
  "Pokemon" = 5019,
  "Satyr" = 5020,
  "Sergal" = 5021,
  "Tanuki" = 5022,
  "Taur (General)" = 5025,
  "Unicorn" = 5023,
  "Xenomorph" = 5024,
  "Alien (Other)" = 5001,
  "Exotic (Other)" = 5000,
  "Domestic Cat" = 6020,
  "Cheetah" = 6021,
  "Cougar" = 6022,
  "Jaguar" = 6023,
  "Leopard" = 6024,
  "Lion" = 6025,
  "Lynx" = 6026,
  "Ocelot" = 6027,
  "Panther" = 6028,
  "Tiger" = 6029,
  "Feline (Other)" = 6030,
  "Arachnid" = 8000,
  "Mantid" = 8004,
  "Scorpion" = 8005,
  "Insect (Other)" = 8003,
  "Bat" = 6001,
  "Giraffe" = 6031,
  "Hedgehog" = 6032,
  "Hippopotamus" = 6033,
  "Hyena" = 6035,
  "Panda" = 6052,
  "Pig/Swine" = 6053,
  "Rabbit/Hare" = 6059,
  "Raccoon" = 6060,
  "Red Panda" = 6062,
  "Meerkat" = 6043,
  "Mongoose" = 6044,
  "Rhinoceros" = 6063,
  "Mammals (Other)" = 6000,
  "Opossum" = 6037,
  "Kangaroo" = 6038,
  "Koala" = 6039,
  "Quoll" = 6040,
  "Wallaby" = 6041,
  "Marsupial (Other)" = 6042,
  "Badger" = 6045,
  "Ferret" = 6046,
  "Mink" = 6048,
  "Otter" = 6047,
  "Skunk" = 6069,
  "Weasel" = 6049,
  "Mustelid (Other)" = 6051,
  "Gorilla" = 6054,
  "Human" = 6055,
  "Lemur" = 6056,
  "Monkey" = 6057,
  "Primate (Other)" = 6058,
  "Alligator &amp; Crocodile" = 7001,
  "Gecko" = 7003,
  "Iguana" = 7004,
  "Lizard" = 7005,
  "Snakes &amp; Serpents" = 7006,
  "Turtle" = 7007,
  "Reptilian (Other)" = 7000,
  "Beaver" = 6064,
  "Mouse" = 6065,
  "Rat" = 6061,
  "Squirrel" = 6070,
  "Rodent (Other)" = 6067,
  "Fennec" = 6072,
  "Fox" = 6075,
  "Vulpine (Other)" = 6015,
  "Dinosaur" = 8001,
  "Wolverine" = 6050
}

export enum Gender {
  "Any" = 0,
  "Male" = 2,
  "Female" = 3,
  "Herm" = 4,
  "Intersex" = 11,
  "Trans (Male)" = 8,
  "Trans (Female)" = 9,
  "Non-Binary" = 10,
  "Multiple characters" = 6,
  "Other / Not Specified" = 7
}
