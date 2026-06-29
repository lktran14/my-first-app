/**
 * Tran Family Album — Main Application Logic
 * Hash-based routing: #/ (album list), #/album/:id (photo grid)
 * In-memory state only — no localStorage
 */

/* -------------------------------------------------------------------------- */
/* Sample album data (replace picsum URLs with local paths later)             */
/* -------------------------------------------------------------------------- */

const albums = [

  {
    id: "asia-cruise-2019",
    name: "Asia Cruise 2019",
    cover: "./photos/asia-cruise-2019/IMG_6814.png",
    photos: [],
    sections: [
      {
        heading: "Tokyo",
        photos: [
          { src: "./photos/asia-cruise-2019/IMG_6814.png", caption: "Nikko Toshogu Shrine, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_6698.png", caption: "Moon Pine, Ueno Park, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_6704.png", caption: "Tsukiji market street, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_6706.png", caption: "" },
          { src: "./photos/asia-cruise-2019/IMG_6718.png", caption: "KFC, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_6719.png", caption: "Kaminarimon Gate, Asakusa, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_6722.png", caption: "Senso-ji Temple, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_6729.png", caption: "Senso-ji Temple, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_6732.png", caption: "Senso-ji pagoda, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_6743.png", caption: "Ginza, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_6801.png", caption: "Traditional shrine, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_6802.png", caption: "Shrine visit, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_6774.png", caption: "Imperial Palace, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_6936.png", caption: "Imperial Palace moat, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_6793.png", caption: "Japanese garden, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_6837.png", caption: "Japanese garden, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_6932.png", caption: "Imperial Palace, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_6786.png", caption: "Nikko Toshogu Shrine, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_6689.png", caption: "Christmas tree, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_6848.png", caption: "Nikko Toshogu Shrine, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_6851.png", caption: "Nikko Toshogu Shrine, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_6859.png", caption: "Japanese lunch, November 2019" },
        ],
      },
      {
        heading: "Osaka",
        photos: [
          { src: "./photos/asia-cruise-2019/IMG_6941.png", caption: "Sorihashi Bridge, Sumiyoshi Taisha, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_6947.png", caption: "Sumiyoshi Taisha, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_6950.png", caption: "Ema prayer plaques, Sumiyoshi Taisha, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_6954.png", caption: "Sumiyoshi Taisha, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_6960.png", caption: "Sumiyoshi Taisha entrance, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_6978.png", caption: "Osaka Castle moat, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_6992.png", caption: "Osaka Castle, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_6993.png", caption: "View from Osaka Castle, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7007.png", caption: "Shopping arcade, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7019.png", caption: "Night market, November 2019" },
        ],
      },
      {
        heading: "Nara",
        photos: [
          { src: "./photos/asia-cruise-2019/IMG_7052.png", caption: "Nara Park, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7044.png", caption: "Kasuga Taisha torii gate, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7039.png", caption: "Stone lanterns, Kasuga Taisha, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7030.png", caption: "Temple gate, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7060.png", caption: "Traditional shrine, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7031.png", caption: "Traditional shrine, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7064.png", caption: "Nara Park deer, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7066.png", caption: "Japanese garden, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7073.png", caption: "Deer grazing, Nara Park, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7070.png", caption: "Autumn maples, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7084.png", caption: "Deer in Nara Park, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7051.png", caption: "Nandaimon Gate, Tōdai-ji, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7087.png", caption: "Nandaimon Gate, Tōdai-ji, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7092.png", caption: "Tōdai-ji Daibutsuden, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7108.png", caption: "Buddha's nostril pillar, Tōdai-ji, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7109.png", caption: "Nyoirin-kannon, Tōdai-ji, November 2019" },
        ],
      },
      {
        heading: "Kochi",
        photos: [
          { src: "./photos/asia-cruise-2019/IMG_7159.png", caption: "Welcome to Kochi, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7172.png", caption: "Chikurin-ji temple garden, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7180.png", caption: "Chikurin-ji pagoda, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7182.png", caption: "Buddha statues, Chikurin-ji, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7183.png", caption: "Jizo statues, Chikurin-ji, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7185.png", caption: "Chikurin-ji pagoda, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7186.png", caption: "Buddha statue, Chikurin-ji, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7190.png", caption: "Chikurin-ji temple grounds, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7216.png", caption: "Hirome Market food stall, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7233.png", caption: "Kochi Castle grounds, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7246.png", caption: "View from Kochi Castle, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7252.png", caption: "Katsurahama Beach, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7259.png", caption: "On board, November 2019" },
        ],
      },
      {
        heading: "Kagoshima",
        photos: [
          { src: "./photos/asia-cruise-2019/IMG_7270.png", caption: "Post box with Sakurajima, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7273.png", caption: "Chrysanthemum festival, Sengan-en, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7279.png", caption: "Sengan-en Garden, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7283.png", caption: "Suzumon gate, Sengan-en, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7284.png", caption: "Sengan-en Garden, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7286.png", caption: "Shimazu crest display, Sengan-en, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7289.png", caption: "Sakurajima from Sengan-en, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7302.png", caption: "Bamboo grove, Sengan-en, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7309.png", caption: "Floral rickshaw, Sengan-en, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7324.png", caption: "Arimura Lava Lookout, Sakurajima, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7335.png", caption: "Welcome to Kagoshima, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7505.png", caption: "Cabin, December 2019" },
        ],
      },
      {
        heading: "Shanghai",
        photos: [
          { src: "./photos/asia-cruise-2019/IMG_7368.png", caption: "Braised pork stall, Zhujiajiao, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7370.png", caption: "Canal boat, Zhujiajiao, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7512.png", caption: "Canal boat tour, Zhujiajiao, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7393.png", caption: "China Post mailbox, Zhujiajiao, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7402.png", caption: "Canal bridge, Zhujiajiao, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7428.png", caption: "Old street, Zhujiajiao, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7471.png", caption: "Stone bridge, Zhujiajiao, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7451.png", caption: "Zhujiajiao water town, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7460.png", caption: "Canal-side restaurant, Zhujiajiao, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7467.png", caption: "On canal boat, Zhujiajiao, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7470.png", caption: "Stone bridge, Zhujiajiao, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7481.png", caption: "On canal boat, Zhujiajiao, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7452.png", caption: "Silk stretching demo, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7480.png", caption: "Silk stretching demo, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7372.png", caption: "Fan shop, November 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7524.png", caption: "Bingo on board, December 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7586.png", caption: "SuperStar Aquarius, December 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7794.png", caption: "On deck, December 2019" },
        ],
      },
      {
        heading: "Taipei",
        photos: [
          { src: "./photos/asia-cruise-2019/IMG_7532.png", caption: "Confucius Temple bridge, December 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7535.png", caption: "Taipei Confucius Temple, December 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7556.png", caption: "Longshan Temple, December 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7571.png", caption: "Moon gate, Chinese garden, December 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7590.png", caption: "Chiang Kai-shek Memorial Hall, December 2019" },
        ],
      },
      {
        heading: "Hong Kong",
        photos: [
          { src: "./photos/asia-cruise-2019/IMG_7817.png", caption: "View from Victoria Peak, July 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7821.png", caption: "Victoria Peak, July 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7826.png", caption: "Jumbo Floating Restaurant, July 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7828.png", caption: "Aberdeen Harbour, July 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7829.png", caption: "Aberdeen Harbour, July 2019" },
          { src: "./photos/asia-cruise-2019/IMG_7847.png", caption: "Food court, July 2019" },
        ],
      },
    ],
  },

  {
    id: "holidays",
    name: "Baltics Cruise 2018",
    cover: "./photos/holidays/IMG_5280.png",
    photos: [],
    sections: [
      {
        heading: "Amsterdam",
        photos: [
          { src: "./photos/holidays/IMG_5280.png", caption: "On deck, June 2018" },
          { src: "./photos/holidays/IMG_5294.png", caption: "Amsterdam, June 2018" },
          { src: "./photos/holidays/IMG_6383.png", caption: "Cabin balcony, June 2018" },
        ],
      },
      {
        heading: "Berlin",
        photos: [
          { src: "./photos/holidays/IMG_5453.png", caption: "Brandenburg Gate, June 2018" },
          { src: "./photos/holidays/IMG_5465.png", caption: "Reichstag, June 2018" },
          { src: "./photos/holidays/IMG_5468.png", caption: "City view, June 2018" },
          { src: "./photos/holidays/IMG_5485.png", caption: "Reichstag dome, June 2018" },
          { src: "./photos/holidays/IMG_5514.png", caption: "Checkpoint Charlie, June 2018" },
          { src: "./photos/holidays/IMG_5533.png", caption: "Train platform, June 2018" },
        ],
      },
      {
        heading: "Helsinki",
        photos: [
          { src: "./photos/holidays/IMG_5618.png", caption: "Helsinki Cathedral, June 2018" },
          { src: "./photos/holidays/IMG_5631.png", caption: "Kauppatori market, June 2018" },
          { src: "./photos/holidays/IMG_5643.png", caption: "Saaristo restaurant, June 2018" },
          { src: "./photos/holidays/IMG_5658.png", caption: "SkyWheel Helsinki, June 2018" },
          { src: "./photos/holidays/IMG_5669.png", caption: "Sibelius Monument, June 2018" },
        ],
      },
      {
        heading: "Russia",
        photos: [
          { src: "./photos/holidays/IMG_5730.png", caption: "Saint Isaac's Cathedral, June 2018" },
          { src: "./photos/holidays/IMG_5732.png", caption: "Saint Isaac's Cathedral dome, June 2018" },
          { src: "./photos/holidays/IMG_5778.png", caption: "World Cup banner, June 2018" },
          { src: "./photos/holidays/IMG_5781.png", caption: "Church of the Savior on Spilled Blood, June 2018" },
          { src: "./photos/holidays/IMG_5788.png", caption: "Church of the Savior on Spilled Blood, June 2018" },
          { src: "./photos/holidays/IMG_5916.png", caption: "Peterhof musicians, June 2018" },
          { src: "./photos/holidays/IMG_5865.png", caption: "Peterhof Palace, June 2018" },
          { src: "./photos/holidays/IMG_5926.png", caption: "Grand Cascade, Peterhof, June 2018" },
          { src: "./photos/holidays/IMG_5908.png", caption: "Grand Cascade fountains, June 2018" },
          { src: "./photos/holidays/IMG_5930.png", caption: "Peterhof Palace, June 2018" },
          { src: "./photos/holidays/IMG_5989.png", caption: "Peterhof Palace, June 2018" },
          { src: "./photos/holidays/IMG_5821.png", caption: "Grand Palace, Peterhof, June 2018" },
          { src: "./photos/holidays/IMG_5909.png", caption: "Peter and Paul Cathedral, June 2018" },
          { src: "./photos/holidays/IMG_5864.png", caption: "Peter and Paul Cathedral interior, June 2018" },
        ],
      },
      {
        heading: "Tallinn",
        photos: [
          { src: "./photos/holidays/IMG_5922.png", caption: "Traditional costume cutout, June 2018" },
          { src: "./photos/holidays/IMG_6014.png", caption: "Traditional costume cutout, June 2018" },
          { src: "./photos/holidays/IMG_5932.png", caption: "Alexander Nevsky Cathedral, June 2018" },
          { src: "./photos/holidays/IMG_6027.png", caption: "Alexander Nevsky Cathedral, June 2018" },
          { src: "./photos/holidays/IMG_5980.png", caption: "Old Town, June 2018" },
          { src: "./photos/holidays/IMG_6038.png", caption: "Old Town, June 2018" },
          { src: "./photos/holidays/IMG_5813.png", caption: "Old Town view, June 2018" },
          { src: "./photos/holidays/IMG_6065.png", caption: "Old Town view, June 2018" },
          { src: "./photos/holidays/IMG_5945.png", caption: "Alexander Nevsky Cathedral, June 2018" },
          { src: "./photos/holidays/IMG_6075.png", caption: "Alexander Nevsky Cathedral, June 2018" },
          { src: "./photos/holidays/IMG_5974.png", caption: "City walls, June 2018" },
          { src: "./photos/holidays/IMG_6082.png", caption: "City walls, June 2018" },
          { src: "./photos/holidays/IMG_5913.png", caption: "Back on board, June 2018" },
          { src: "./photos/holidays/IMG_6107.png", caption: "Back on board, June 2018" },
        ],
      },
      {
        heading: "Stockholm",
        photos: [
          { src: "./photos/holidays/IMG_6133.png", caption: "Archipelago island, June 2018" },
          { src: "./photos/holidays/IMG_6193.png", caption: "Stockholm archipelago, June 2018" },
          { src: "./photos/holidays/IMG_6220.png", caption: "Waterfront, June 2018" },
          { src: "./photos/holidays/IMG_6229.png", caption: "On deck, June 2018" },
          { src: "./photos/holidays/IMG_6257.png", caption: "City Hall courtyard, June 2018" },
          { src: "./photos/holidays/IMG_6259.png", caption: "City Hall, June 2018" },
          { src: "./photos/holidays/IMG_6271.png", caption: "Royal Guard, Royal Palace, June 2018" },
          { src: "./photos/holidays/IMG_6272.png", caption: "Royal Palace, June 2018" },
          { src: "./photos/holidays/IMG_6302.png", caption: "Vasa Museum, June 2018" },
          { src: "./photos/holidays/IMG_6313.png", caption: "Harbor, June 2018" },
          { src: "./photos/holidays/IMG_6327.png", caption: "Ship bow, June 2018" },
          { src: "./photos/holidays/IMG_6334.png", caption: "Archipelago from ship, June 2018" },
        ],
      },
      {
        heading: "Copenhagen",
        photos: [
          { src: "./photos/holidays/IMG_6404.png", caption: "On deck, June 2018" },
          { src: "./photos/holidays/IMG_6410.png", caption: "Nordhavn, June 2018" },
          { src: "./photos/holidays/IMG_6472.png", caption: "Harbor, June 2018" },
          { src: "./photos/holidays/IMG_6486.png", caption: "Axel Towers, June 2018" },
          { src: "./photos/holidays/IMG_6500.png", caption: "Nyhavn, June 2018" },
          { src: "./photos/holidays/IMG_6506.png", caption: "Amalienborg Square, June 2018" },
          { src: "./photos/holidays/IMG_6508.png", caption: "Amalienborg Square, June 2018" },
          { src: "./photos/holidays/IMG_6522.png", caption: "Little Mermaid, June 2018" },
          { src: "./photos/holidays/IMG_6545.png", caption: "On deck, June 2018" },
        ],
      },
    ],
  },

  {
    id: "family",
    name: "Beach Holidays",
    cover: "./photos/family/P1000202.png",
    photos: [
      { src: "./photos/family/P1000202.png", caption: "Balcony, June 2002" },
      { src: "./photos/family/P1000200.png", caption: "Swimming, September 1992" },
      { src: "./photos/family/P1000201.png", caption: "Three generations, June 2002" },
      { src: "./photos/family/P1000199.png", caption: "" },
      { src: "./photos/family/P1000205.png", caption: "Blackpool beach" },
    ],
    sections: [
      {
        heading: "Tunisia 2006",
        photos: [
          { src: "./photos/family/P1000206.png", caption: "Snorkelling" },
          { src: "./photos/family/P1000207.png", caption: "Me & Mum at beach" },
          { src: "./photos/family/P1000208.png", caption: "Ba Ngoai & Ong Ngoai at front of hotel" },
          { src: "./photos/family/P1000209.png", caption: "Us at front of hotel" },
          { src: "./photos/family/P1000210.png", caption: "Me, Mum & Dad at harbour" },
          { src: "./photos/family/P1000211.png", caption: "Everyone in Mediterranean restaurant" },
          { src: "./photos/family/P1000212.png", caption: "Jet ski" },
          { src: "./photos/family/P1000213.png", caption: "Parasailing" },
        ],
      },
    ],
  },

  {
    id: "lien-baby",
    name: "Lien baby photos",
    cover: "./photos/lien-baby/P1090387.png",
    photos: [
      { src: "./photos/lien-baby/P1090387.png", caption: "" },
      { src: "./photos/lien-baby/P1090322.png", caption: "" },
      { src: "./photos/lien-baby/P1090394.png", caption: "" },
      { src: "./photos/lien-baby/P1090332.png", caption: "" },
      { src: "./photos/lien-baby/P1090352.png", caption: "" },
      { src: "./photos/lien-baby/P1090356.png", caption: "" },
      { src: "./photos/lien-baby/P1090358.png", caption: "" },
      { src: "./photos/lien-baby/P1090360.png", caption: "" },
      { src: "./photos/lien-baby/P1090363.png", caption: "" },
      { src: "./photos/lien-baby/P1090373.png", caption: "" },
      { src: "./photos/lien-baby/P1090376.png", caption: "" },
      { src: "./photos/lien-baby/P1090377.png", caption: "" },
      { src: "./photos/lien-baby/P1090378.png", caption: "" },
      { src: "./photos/lien-baby/P1090379.png", caption: "" },
      { src: "./photos/lien-baby/P1090380.png", caption: "" },
      { src: "./photos/lien-baby/P1090383.png", caption: "" },
      { src: "./photos/lien-baby/P1090321.png", caption: "" },
      { src: "./photos/lien-baby/P1090327.png", caption: "" },
      { src: "./photos/lien-baby/P1090397.png", caption: "" },
      { src: "./photos/lien-baby/P1090398.png", caption: "" },
    ],
  },

  {
    id: "italy-1987",
    name: "Italy 1987",
    cover: "./photos/italy-1987/P1090214.png",
    photos: [],
    sections: [
      {
        heading: "Lake Garda",
        photos: [
          { src: "./photos/italy-1987/P1090214.png", caption: "Lake Garda, 1987" },
          { src: "./photos/italy-1987/P1090216.png", caption: "" },
          { src: "./photos/italy-1987/P1090228.png", caption: "" },
          { src: "./photos/italy-1987/P1090219.png", caption: "Snake Island" },
        ],
      },
      {
        heading: "Lido di Jesolo",
        photos: [
          { src: "./photos/italy-1987/P1090217.png", caption: "Lido di Jesolo, 1987" },
          { src: "./photos/italy-1987/P1090223.png", caption: "" },
          { src: "./photos/italy-1987/P1000657.png", caption: "" },
          { src: "./photos/italy-1987/P1090218.png", caption: "" },
          { src: "./photos/italy-1987/P1090221.png", caption: "" },
          { src: "./photos/italy-1987/P1090225.png", caption: "" },
          { src: "./photos/italy-1987/P1090229.png", caption: "Aquileia" },
          { src: "./photos/italy-1987/P1090244.png", caption: "" },
          { src: "./photos/italy-1987/P1090220.png", caption: "" },
          { src: "./photos/italy-1987/P1090222.png", caption: "" },
          { src: "./photos/italy-1987/P1090227.png", caption: "" },
          { src: "./photos/italy-1987/P1090224.png", caption: "" },
        ],
      },
    ],
  },

  {
    id: "garden",
    name: "Engagement & Wedding 1985",
    cover: "./photos/wedding/P1090338.png",
    listPreviewMain: "./photos/wedding/P1090338.png",
    photos: [
      { src: "./photos/wedding/P1090335.png", caption: "", objectPosition: "38% center" },
      { src: "./photos/wedding/P1090361.png", caption: "" },
      { src: "./photos/wedding/P1090318.png", caption: "" },
      { src: "./photos/wedding/P1090338.png", caption: "" },
      { src: "./photos/wedding/P1090340.png", caption: "" },
      { src: "./photos/wedding/P1090342.png", caption: "" },
      { src: "./photos/wedding/P1090345.png", caption: "" },
      { src: "./photos/wedding/P1090350.png", caption: "", objectPosition: "center top" },
      { src: "./photos/wedding/P1080796.png", caption: "" },
      { src: "./photos/wedding/P1080797.png", caption: "" },
      { src: "./photos/wedding/P1080801.png", caption: "" },
      { src: "./photos/wedding/P1080803.png", caption: "" },
      { src: "./photos/wedding/P1080805.png", caption: "" },
      { src: "./photos/wedding/P1080806.png", caption: "" },
      { src: "./photos/wedding/P1080819.png", caption: "" },
      { src: "./photos/wedding/P1080823.png", caption: "" },
      { src: "./photos/wedding/P1080826.png", caption: "" },
      { src: "./photos/wedding/P1080829.png", caption: "", objectPosition: "center top" },
      { src: "./photos/wedding/P1080835.png", caption: "" },
      { src: "./photos/wedding/P1080814.png", caption: "" },
      { src: "./photos/wedding/P1080841.png", caption: "" },
      { src: "./photos/wedding/P1080842.png", caption: "" },
      { src: "./photos/wedding/P1080831.png", caption: "" },
      { src: "./photos/wedding/P1080843.png", caption: "" },
      { src: "./photos/wedding/P1080852.png", caption: "" },
      { src: "./photos/wedding/P1080860.png", caption: "" },
    ],
  }
];

/* -------------------------------------------------------------------------- */
/* In-memory application state                                                */
/* -------------------------------------------------------------------------- */

const state = {
  currentAlbumId: null,
  lightboxOpen: false,
  lightboxPhotoIndex: 0,
  menuOpen: false,
  scrollToSectionId: null,
};

/** Bumps on each grid render so stale async renders can bail out. */
let photoGridRenderId = 0;

/* -------------------------------------------------------------------------- */
/* DOM references                                                             */
/* -------------------------------------------------------------------------- */

const viewAlbumList = document.getElementById("view-album-list");
const viewPhotoGrid = document.getElementById("view-photo-grid");
const albumCardsContainer = document.getElementById("album-cards");
const photoGridContainer = document.getElementById("photo-grid");
const photoGridTitle = document.getElementById("photo-grid-title");
const photoGridSubtitle = document.getElementById("photo-grid-subtitle");
const backButton = document.getElementById("back-button");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");
const navMenu = document.getElementById("nav-menu");
const navMenuList = document.getElementById("nav-menu-list");
const navMenuClose = document.getElementById("nav-menu-close");
const navMenuBackdrop = document.getElementById("nav-menu-backdrop");
const menuButtons = document.querySelectorAll(".menu-button");

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Build descriptive alt text for a photo.
 * Uses caption when available, otherwise falls back to album name.
 */
function getPhotoAlt(photo, albumName) {
  if (photo.caption) {
    return photo.caption;
  }
  return `${albumName} photo`;
}

/**
 * Find an album by its id.
 */
function getAlbumById(id) {
  return albums.find((album) => album.id === id) || null;
}

/**
 * Return the currently active album object, or null.
 */
function getCurrentAlbum() {
  if (!state.currentAlbumId) {
    return null;
  }
  return getAlbumById(state.currentAlbumId);
}

/**
 * Find photo metadata by source path across all albums.
 */
function getPhotoBySrc(src) {
  for (const album of albums) {
    const photo = getAllPhotos(album).find((entry) => entry.src === src);
    if (photo) {
      return photo;
    }
  }
  return null;
}

/**
 * Apply optional crop focus for grid/collage thumbnails.
 */
function applyPhotoObjectPosition(img, photoOrSrc) {
  const photo =
    typeof photoOrSrc === "string" ? getPhotoBySrc(photoOrSrc) : photoOrSrc;

  if (photo?.objectPosition) {
    img.style.objectPosition = photo.objectPosition;
  }
}

/**
 * Format a photo count for display (e.g. "1 Photo", "8 Photos").
 */
function formatPhotoCount(count) {
  return count === 1 ? "1 Photo" : `${count} Photos`;
}

/**
 * Build a stable DOM id for a section heading within an album.
 */
function getSectionDomId(albumId, heading) {
  const slug = heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `section-${albumId}-${slug}`;
}

/**
 * Lock page scroll when an overlay is open.
 */
function updateBodyScrollLock() {
  document.body.style.overflow =
    state.lightboxOpen || state.menuOpen ? "hidden" : "";
}

/**
 * Return all photos in an album, including those in optional sections.
 */
function getAllPhotos(album) {
  const photos = [...album.photos];
  if (album.sections) {
    album.sections.forEach((section) => {
      photos.push(...section.photos);
    });
  }
  return photos;
}

/* -------------------------------------------------------------------------- */
/* Rendering                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Return up to three photo sources for the album card collage.
 */
function getCollageSources(album) {
  const photos = getAllPhotos(album).map((photo) => photo.src);
  const main = album.listPreviewMain || photos[0] || album.cover;
  const stack = photos.filter((src) => src !== main).slice(0, 2);

  while (stack.length < 2) {
    stack.push(album.cover);
  }

  return [main, stack[0], stack[1]];
}

/**
 * Render all album cards on the home view.
 */
function renderAlbumList() {
  albumCardsContainer.innerHTML = "";

  albums.forEach((album) => {
    const count = getAllPhotos(album).length;
    const countLabel = formatPhotoCount(count);
    const [mainSrc, topSrc, bottomSrc] = getCollageSources(album);

    const card = document.createElement("button");
    card.className = "album-card";
    card.type = "button";
    card.setAttribute("aria-label", `Open ${album.name} album, ${countLabel}`);

    card.innerHTML = `
      <div class="album-card-collage">
        <div class="album-card-collage-main">
          <img
            src="${mainSrc}"
            alt=""
            width="600"
            height="400"
            loading="lazy"
            decoding="async"
          />
          <span class="album-card-expand" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M8 3H3v5M16 3h5v5M16 21h5v-5M8 21H3v-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </div>
        <div class="album-card-collage-stack">
          <img
            src="${topSrc}"
            alt=""
            width="300"
            height="200"
            loading="lazy"
            decoding="async"
          />
          <img
            src="${bottomSrc}"
            alt=""
            width="300"
            height="200"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
      <div class="album-card-info">
        <h2 class="album-card-name">${album.name}</h2>
        <span class="album-card-chevron" aria-hidden="true">›</span>
        <p class="album-card-count">${countLabel}</p>
      </div>
    `;

    card.querySelectorAll(".album-card-collage img").forEach((img, i) => {
      applyPhotoObjectPosition(img, [mainSrc, topSrc, bottomSrc][i]);
    });

    card.addEventListener("click", () => {
      navigateToAlbum(album.id);
    });

    albumCardsContainer.appendChild(card);
  });
}

/**
 * Repeating row layouts — large/small combinations for visual variety.
 * Each entry: { layout, count } photos consumed per row.
 */
const GRID_ROW_PATTERNS = [
  { layout: "large-stack-left", count: 3 },
  { layout: "tall-large", count: 2 },
  { layout: "wide-tall", count: 2 },
  { layout: "stack-large-right", count: 3 },
];

const GRID_TILE_SLOTS = {
  "large-stack-left": ["photo-tile--large", "photo-tile--small", "photo-tile--small"],
  "tall-large": ["photo-tile--tall", "photo-tile--wide"],
  "wide-tall": ["photo-tile--wide", "photo-tile--tall"],
  "stack-large-right": ["photo-tile--small", "photo-tile--small", "photo-tile--large"],
  pair: ["photo-tile--half", "photo-tile--half"],
  single: ["photo-tile--full"],
};

const PORTRAIT_SLOT_CLASSES = new Set(["photo-tile--tall", "photo-tile--large"]);

/** @type {Map<string, "portrait" | "landscape">} */
const orientationCache = new Map();

function isPortraitSlot(slotClass) {
  return PORTRAIT_SLOT_CLASSES.has(slotClass);
}

function isPhotoPortrait(photo) {
  return orientationCache.get(photo.src) === "portrait";
}

function loadPhotoOrientation(src) {
  if (orientationCache.has(src)) {
    return Promise.resolve(orientationCache.get(src));
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      const orientation =
        img.naturalHeight > img.naturalWidth ? "portrait" : "landscape";
      orientationCache.set(src, orientation);
      resolve(orientation);
    };
    img.onerror = () => {
      orientationCache.set(src, "landscape");
      resolve("landscape");
    };
    img.src = src;
  });
}

function preloadOrientations(photos) {
  return Promise.all(photos.map((photo) => loadPhotoOrientation(photo.src)));
}

/**
 * Match photos to grid slots so portrait images land in tall/large slots.
 * Returns slotIndex → photoIndex within the row.
 */
function assignPhotosToSlots(photos, slotClasses) {
  const photoEntries = photos.map((photo, photoIndex) => ({
    photoIndex,
    portrait: isPhotoPortrait(photo),
  }));

  const slotEntries = slotClasses.map((slotClass, slotIndex) => ({
    slotIndex,
    portrait: isPortraitSlot(slotClass),
  }));

  const assignment = new Array(photos.length).fill(null);
  const usedPhotoIndices = new Set();

  const portraitPhotos = photoEntries.filter((entry) => entry.portrait);
  const portraitSlots = slotEntries.filter((slot) => slot.portrait);

  for (let i = 0; i < Math.min(portraitPhotos.length, portraitSlots.length); i++) {
    assignment[portraitSlots[i].slotIndex] = portraitPhotos[i].photoIndex;
    usedPhotoIndices.add(portraitPhotos[i].photoIndex);
  }

  const remainingPhotos = photoEntries.filter(
    (entry) => !usedPhotoIndices.has(entry.photoIndex)
  );
  const remainingSlots = slotEntries.filter((slot) => assignment[slot.slotIndex] === null);

  remainingSlots.forEach((slot, i) => {
    assignment[slot.slotIndex] = remainingPhotos[i].photoIndex;
  });

  return assignment;
}

/**
 * Append photos to the grid using alternating row layouts.
 * Returns the next photo index after rendering.
 */
function renderPhotoBatch(container, photos, startIndex, album, totalCount) {
  let index = startIndex;
  let photoIdx = 0;
  let patternIndex = 0;

  while (photoIdx < photos.length) {
    const pattern = GRID_ROW_PATTERNS[patternIndex % GRID_ROW_PATTERNS.length];
    const remaining = photos.length - photoIdx;

    if (remaining >= pattern.count) {
      const rowPhotos = photos.slice(photoIdx, photoIdx + pattern.count);
      container.appendChild(
        createPhotoGridRow(pattern.layout, rowPhotos, index, album, totalCount)
      );
      index += pattern.count;
      photoIdx += pattern.count;
      patternIndex += 1;
    } else {
      const rowPhotos = photos.slice(photoIdx);
      const layout = rowPhotos.length === 1 ? "single" : "pair";
      container.appendChild(
        createPhotoGridRow(layout, rowPhotos, index, album, totalCount)
      );
      index += rowPhotos.length;
      photoIdx += rowPhotos.length;
    }
  }

  return index;
}

/**
 * Build one grid row with layout-specific tile placement.
 */
function createPhotoGridRow(layout, photos, startIndex, album, totalCount) {
  const row = document.createElement("div");
  row.className = `photo-grid-row photo-grid-row--${layout}`;

  const slotClasses = GRID_TILE_SLOTS[layout] || GRID_TILE_SLOTS.single;
  const assignment = assignPhotosToSlots(photos, slotClasses);

  slotClasses.forEach((slotClass, slotIndex) => {
    const photoIndexInRow = assignment[slotIndex];
    const photo = photos[photoIndexInRow];
    const tile = createPhotoTile(photo, startIndex + photoIndexInRow, album, totalCount);
    tile.classList.add(slotClass || "photo-tile--full");
    row.appendChild(tile);
  });

  return row;
}

/**
 * Create a photo tile button for the grid.
 */
function createPhotoTile(photo, index, album, totalCount) {
  const tile = document.createElement("button");
  tile.className = "photo-tile";
  tile.type = "button";
  tile.setAttribute(
    "aria-label",
    `View photo ${index + 1} of ${totalCount}${photo.caption ? `: ${photo.caption}` : ""}`
  );

  const alt = getPhotoAlt(photo, album.name);
  const img = document.createElement("img");

  img.src = photo.src;
  img.alt = alt;
  img.loading = "lazy";
  img.decoding = "async";
  applyPhotoObjectPosition(img, photo);
  tile.appendChild(img);

  tile.addEventListener("click", () => {
    openLightbox(index);
  });

  return tile;
}

/**
 * Render the photo grid for the current album.
 */
async function renderPhotoGrid() {
  const album = getCurrentAlbum();
  if (!album) {
    return;
  }

  const renderId = ++photoGridRenderId;
  const albumId = album.id;

  photoGridTitle.textContent = album.name;
  const allPhotos = getAllPhotos(album);
  const count = allPhotos.length;
  photoGridSubtitle.textContent = formatPhotoCount(count);
  photoGridContainer.innerHTML = "";

  await preloadOrientations(allPhotos);

  if (renderId !== photoGridRenderId || getCurrentAlbum()?.id !== albumId) {
    return;
  }

  let photoIndex = renderPhotoBatch(
    photoGridContainer,
    album.photos,
    0,
    album,
    count
  );

  if (album.sections) {
    album.sections.forEach((section) => {
      if (section.heading) {
        const heading = document.createElement("h3");
        heading.className = "photo-grid-section-heading";
        heading.id = getSectionDomId(album.id, section.heading);

        const title = document.createElement("span");
        title.className = "photo-grid-section-heading-title";
        title.textContent = section.heading;

        const sectionCount = document.createElement("span");
        sectionCount.className = "photo-grid-section-heading-count";
        sectionCount.textContent = formatPhotoCount(section.photos.length);

        heading.append(title, sectionCount);
        photoGridContainer.appendChild(heading);
      }

      photoIndex = renderPhotoBatch(
        photoGridContainer,
        section.photos,
        photoIndex,
        album,
        count
      );
    });
  }

  if (state.scrollToSectionId) {
    const sectionId = state.scrollToSectionId;
    state.scrollToSectionId = null;
    requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }
}

/**
 * Update lightbox image for the current photo index.
 */
function updateLightboxContent() {
  const album = getCurrentAlbum();
  if (!album) {
    return;
  }

  const allPhotos = getAllPhotos(album);
  const photo = allPhotos[state.lightboxPhotoIndex];
  if (!photo) {
    return;
  }

  lightboxImage.src = photo.src;
  lightboxImage.alt = getPhotoAlt(photo, album.name);
}

/* -------------------------------------------------------------------------- */
/* Navigation & routing                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Show a specific view and hide the other.
 */
function showView(viewName) {
  if (viewName === "album-list") {
    viewAlbumList.classList.add("view--active");
    viewPhotoGrid.classList.remove("view--active");
  } else if (viewName === "photo-grid") {
    viewAlbumList.classList.remove("view--active");
    viewPhotoGrid.classList.add("view--active");
  }
}

/**
 * Navigate to an album's photo grid.
 */
function navigateToAlbum(albumId) {
  const album = getAlbumById(albumId);
  if (!album) {
    return;
  }

  window.location.hash = `#/album/${albumId}`;
}

/**
 * Navigate back to the album list.
 */
function navigateToHome() {
  closeLightbox();
  closeMenu();
  state.currentAlbumId = null;
  window.location.hash = "#/";
  showView("album-list");
}

/**
 * Navigate to a section within an album and scroll it into view.
 */
function navigateToSection(albumId, sectionHeading) {
  closeMenu();
  closeLightbox();

  const sectionId = getSectionDomId(albumId, sectionHeading);

  if (state.currentAlbumId === albumId) {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    return;
  }

  state.scrollToSectionId = sectionId;
  window.location.hash = `#/album/${albumId}`;
}

/**
 * Parse the URL hash and render the matching view.
 */
function handleHashChange() {
  const hash = window.location.hash || "#/";
  const albumMatch = hash.match(/^#\/album\/([^/]+)$/);

  if (albumMatch) {
    const albumId = albumMatch[1];
    const album = getAlbumById(albumId);

    if (album) {
      state.currentAlbumId = albumId;
      renderPhotoGrid();
      showView("photo-grid");
      return;
    }
  }

  state.currentAlbumId = null;
  showView("album-list");
}

/* -------------------------------------------------------------------------- */
/* Navigation menu                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Populate the slide-out menu with all albums and their subsections.
 */
function renderMenu() {
  navMenuList.innerHTML = "";

  albums.forEach((album) => {
    const group = document.createElement("div");
    group.className = "nav-menu-group";

    const albumButton = document.createElement("button");
    albumButton.className = "nav-menu-item";
    albumButton.type = "button";
    albumButton.textContent = album.name;
    if (state.currentAlbumId === album.id) {
      albumButton.classList.add("nav-menu-item--active");
    }
    albumButton.addEventListener("click", () => {
      closeMenu();
      navigateToAlbum(album.id);
    });
    group.appendChild(albumButton);

    if (album.sections?.length) {
      const sublist = document.createElement("ul");
      sublist.className = "nav-menu-subsections";

      album.sections.forEach((section) => {
        if (!section.heading) {
          return;
        }

        const item = document.createElement("li");
        const subButton = document.createElement("button");
        subButton.className = "nav-menu-subitem";
        subButton.type = "button";
        subButton.textContent = section.heading;
        subButton.addEventListener("click", () => {
          navigateToSection(album.id, section.heading);
        });
        item.appendChild(subButton);
        sublist.appendChild(item);
      });

      group.appendChild(sublist);
    }

    navMenuList.appendChild(group);
  });
}

function setMenuExpanded(expanded) {
  menuButtons.forEach((button) => {
    button.setAttribute("aria-expanded", expanded ? "true" : "false");
  });
}

function openMenu() {
  closeLightbox();
  renderMenu();
  state.menuOpen = true;
  navMenu.classList.add("nav-menu--open");
  navMenu.setAttribute("aria-hidden", "false");
  setMenuExpanded(true);
  updateBodyScrollLock();
  navMenuClose.focus();
}

function closeMenu() {
  if (!state.menuOpen) {
    return;
  }

  state.menuOpen = false;
  navMenu.classList.remove("nav-menu--open");
  navMenu.setAttribute("aria-hidden", "true");
  setMenuExpanded(false);
  updateBodyScrollLock();
}

function toggleMenu() {
  if (state.menuOpen) {
    closeMenu();
  } else {
    openMenu();
  }
}

/* -------------------------------------------------------------------------- */
/* Lightbox                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Open the lightbox at a given photo index.
 */
function openLightbox(photoIndex) {
  const album = getCurrentAlbum();
  if (!album) {
    return;
  }

  state.lightboxOpen = true;
  state.lightboxPhotoIndex = photoIndex;
  updateLightboxContent();

  lightbox.classList.add("lightbox--open");
  lightbox.setAttribute("aria-hidden", "false");
  updateBodyScrollLock();
}

/**
 * Close the lightbox.
 */
function closeLightbox() {
  state.lightboxOpen = false;
  lightbox.classList.remove("lightbox--open");
  lightbox.setAttribute("aria-hidden", "true");
  updateBodyScrollLock();
}

/**
 * Go to the previous photo in the lightbox (wraps around).
 */
function lightboxPrevPhoto() {
  const album = getCurrentAlbum();
  if (!album) {
    return;
  }

  const allPhotos = getAllPhotos(album);
  state.lightboxPhotoIndex =
    (state.lightboxPhotoIndex - 1 + allPhotos.length) % allPhotos.length;
  updateLightboxContent();
}

/**
 * Go to the next photo in the lightbox (wraps around).
 */
function lightboxNextPhoto() {
  const album = getCurrentAlbum();
  if (!album) {
    return;
  }

  const allPhotos = getAllPhotos(album);
  state.lightboxPhotoIndex =
    (state.lightboxPhotoIndex + 1) % allPhotos.length;
  updateLightboxContent();
}

/* -------------------------------------------------------------------------- */
/* Touch swipe handling for lightbox                                          */
/* -------------------------------------------------------------------------- */

let touchStartX = 0;
let touchStartY = 0;

function handleTouchStart(event) {
  if (!state.lightboxOpen || event.touches.length !== 1) {
    return;
  }
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
}

function handleTouchEnd(event) {
  if (!state.lightboxOpen || event.changedTouches.length !== 1) {
    return;
  }

  const deltaX = event.changedTouches[0].clientX - touchStartX;
  const deltaY = event.changedTouches[0].clientY - touchStartY;

  // Ignore mostly vertical swipes
  if (Math.abs(deltaX) <= 50 || Math.abs(deltaX) < Math.abs(deltaY)) {
    return;
  }

  if (deltaX > 0) {
    lightboxPrevPhoto();
  } else {
    lightboxNextPhoto();
  }
}

/* -------------------------------------------------------------------------- */
/* Event listeners                                                            */
/* -------------------------------------------------------------------------- */

function bindEvents() {
  backButton.addEventListener("click", navigateToHome);
  lightboxClose.addEventListener("click", closeLightbox);
  lightboxPrev.addEventListener("click", lightboxPrevPhoto);
  lightboxNext.addEventListener("click", lightboxNextPhoto);

  menuButtons.forEach((button) => {
    button.addEventListener("click", toggleMenu);
  });
  navMenuClose.addEventListener("click", closeMenu);
  navMenuBackdrop.addEventListener("click", closeMenu);

  lightbox.addEventListener("touchstart", handleTouchStart, { passive: true });
  lightbox.addEventListener("touchend", handleTouchEnd, { passive: true });

  // Close lightbox when tapping the dark backdrop (not the image or buttons)
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }
    if (state.lightboxOpen) {
      closeLightbox();
    } else if (state.menuOpen) {
      closeMenu();
    }
  });

  window.addEventListener("hashchange", handleHashChange);
}

/* -------------------------------------------------------------------------- */
/* Initialise                                                                 */
/* -------------------------------------------------------------------------- */

function init() {
  renderAlbumList();
  bindEvents();
  handleHashChange();
}

init();
