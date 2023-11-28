interface CategoryItem {
    id: string;
    name: string;
    path: string;
}

interface GameItem {
    type: string,
    id: string,
    platformId: string,
    gameText: string,
    provider: string,
    provider_slug: string,
    providerLogo: {
        alt: string,
        original: {
            src: string,
            metadata: MetaData
        }
    },
    image: {
        alt: string,
        original: GameImage,
        small: GameImage,
        thumbnail: GameImage
    },
    slug: string
}

interface GameImage {
    id: string,
    src: string,
    alt: string,
    metadata: MetaData
}

interface MetaData {
    size?: number,
    width?: number,
    height?: number
}