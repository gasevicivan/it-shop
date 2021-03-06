import bcrypt from "bcryptjs";

const data = {
        users:[
    
        {
            name: 'Ivan',
            email: 'gasevic_ivan@yahoo.com',
            password: bcrypt.hashSync('2605', 8),
            isAdmin: true,
        },
        {
            name: 'Korisnik',
            email: 'user@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
        }],
    products:[
        {
            name: 'Intel Core I3 10100F + NVidia GeForce 1650 4GB DDR6',
            category: 'PC',
            image: '/images/pc1.jpg',
            price: '1399.00',
            countInStock: 10,
            brand: 'IT Shop',
            rating: 5,
            numReviews: 22,
            description: '\n\nProcesor: Intel Core i5 10400F 2,9GHz \nMatična ploča: H410M \nGrafika: nVidia GeForce GTX1050TI 4GB \nRam: 8GB DDR4 \nSSD: 256GB \nKućište: Inter-Tech B-02 RGB \nNapajanje: 620W \nOstalo: DP i HDMI. \nGarancija: 2 godine',
        },
        {
            name: 'Intel Pentium G5905 + AMD Radeon RX550 4GB',
            category: 'PC',
            image: '/images/pc2.jpg',
            price: '1097.00',
            countInStock: 20,
            brand: 'IT Shop',
            rating: 4,
            numReviews: 11,
            description: '\n\nProcesor: Intel Pentium Celeron G5905 3,5 GHz \nMatična ploča: H410M \nGrafika: AMD Radeon RX550 4GB \nRam: 8GB DDR4 \nSSD: M.2 500GB \nKućište: Inter-Tech IT-3306 Cavy \nNapajanje: 620W \nOstalo: DP i HDMI \nGarancija: 2 godine',
        },   
        {
            name: 'Intel Core I3 10100 + Intel HD Graphics UHD 630',
            category: 'PC',
            image: '/images/pc3.jpg',
            price: '976.00',
            countInStock: 0,
            brand: 'IT Shop',
            rating: 5,
            numReviews: 24,
            description: '\n\nProcesor: Intel Core i3 10100 3,6 GHz \nMatična ploča: Intel H410M \nGrafika: Intel HD Graphics UHD 630 \nRam: 8 GB DDR4\nSSD: 240 GB \nKućište: Inter-Tech \nNapajanje: 500W \nGarancija: 2 godine',
        },   
        {
            name: 'Ryzen 9 3900X + MSI GeForce RTX 3060 12GB',
            category: 'PC',
            image: '/images/pc4.jpg',
            price: '7799.00',
            countInStock: 3,
            brand: 'IT Shop',
            rating: 4.5,
            numReviews: 3,
            description: '\n\nProcesor: AMD Ryzen 9 3900X \nMatična ploča: Asus ROG Strix B550-A Gamming \nRAM: Kingston Fury Beast 64GB (4x16) \nGrafika: MSI GeForce RTX 3060 GAMING X 12GB \nSSD: Samsung 970 EVO Plus NVMe M.2 SSD 500GB x2 \nHDD: WD Gold Enterprise 8TB X 2\n Kućište: Chiftec Rack UNC-411E-B \nNapajanje: Asus ROG Strix 750G \nGarancija: 3 godine',
        },   
        {
            name: 'AMD Ryzen 7 3700X + Nvidia RTX2060 6GB DDR6 + monitor',
            category: 'PC',
            image: '/images/pc5.jpg',
            price: '3626.00',
            countInStock: 6,
            brand: 'IT Shop',
            rating: 5,
            numReviews: 14,
            description: '\n\nProcesor: AMD Ryzen 7 3700X 3,6 GHz 32MB \nMatična ploča: AMD X570-P \nGrafika: nVidia GeForce 2060 6GB DDR6 \nRam: 16GB 3200 MHz DDR4 (2x8) \nSSD: M.2 NVMe 500 GB \nHDD: 1 TB \nKućište: Gigabyte GB-AC300g \nNapajanje: Inter-Tech Argus 720W \nGarancija: 2 godine',
        },   
        {
            name: 'AMD Ryzen 3 2200G + Radeon™ Vega 8 Graphics',
            category: 'PC',
            image: '/images/pc6.jpg',
            price: '849.00',
            countInStock: 12,
            brand: 'IT Shop',
            rating: 3.5,
            numReviews: 9,
            description: '\n\nProcesor: AMD Ryzen 3 2200g, 3,5 GHz \nMatična ploča: B450M \nGrafika: Radeon™ Vega 8 Graphics \nRAM: 8GB DDR4 \nSSD:256GB \nKućište: Inter-Tech B-02 RGB\n Napajanje: 620W \nOstalo: DP i HDMI \nGarancija: 2 godine',
        },  
        {
            name: 'AMD Athlon 220GE + Radeon™ Vega 3 Graphics',
            category: 'PC',
            image: '/images/pc7.jpg',
            price: '559.00',
            countInStock: 12,
            brand: 'IT Shop',
            rating: 3,
            numReviews: 18,
            description: '\n\nProcesor: AMD Athlon 220GE 3,4 GHz \nMatična ploča: Intel A320 \nGrafika: Radeon™ Vega 3 Graphics \nRAM: 8 GB DDR4 \nSSD: 240 GB, Kućište: Inter-Tech \nNapajanje: 500W, \nGarancija: 2 godine',
        },  
        {
            name: 'Intel I5 11400 + Nvidia GeForce GTX1660 6GB DDR6 + slušalice',
            category: 'PC',
            image: '/images/pc8.jpg',
            price: '2599.00',
            countInStock: 5,
            brand: 'IT Shop',
            rating: 4.5,
            numReviews: 11,
            description: '\n\nProcesor: Intel Core i5-11400 2,6 GHz 12MB \nMatična ploča: Intel B560m \nGrafika: nVidia GeForce 1660 6GB DDR6\n RAM: 16GB 3200 MHz DDR4 (2x8) \nSSD: M.2 NVMe 500 GB \nKućište: LC Power 993B Covertaker \nNapajanje: 650W 80+ Bronze \nGarancija: 2 godine \nUz kupovinu računara dobijate na poklon \nwireless gaming slušalice Asus ROG Strix GO',
        },  
    ],
};

export default data;