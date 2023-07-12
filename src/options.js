const appMainCategoryOptions = [
    {
        name: "发现",
        value: "discovery",
        to: {
            name: "shots",
            params: { category: "discovery" },
        },
    },
    {
        name: "国画",
        value: "chinese",
        to: {
            name: "shots",
            params: { category: "chinese" },
        },
    },
    {
        name: "水粉画",
        value: "gouache",
        to: {
            name: "shots",
            params: { category: "gouache" },
        },
    },
    {
        name: "油画",
        value: "oilpainting",
        to: {
            name: "shots",
            params: { category: "oilpainting" },
        },
    },
    {
        name: "水彩画",
        value: "watercolor",
        to: {
            name: "shots",
            params: { category: "watercolor" },
        },
    },
    {
        name: "版画",
        value: "woodcut",
        to: {
            name: "shots",
            params: { category: "woodcut" },
        },
    },
    {
        name: "素描",
        value: "sketch",
        to: {
            name: "shots",
            params: { category: "sketch" },
        },
    },
];

const appMainViewOptions = [
    {
        name: "推荐作品",
        value: "recommended",
        to: {
            name: "shots",
            params: { view: "recommended" },
        },
    },
    {
        name: "热门作品",
        value: "popular",
        to: {
            name: "shots",
            params: { view: "popular" },
        },
    },
    {
        name: "近期作品",
        value: "following",
        to: {
            name: "shots",
            params: { view: "following" },
        },
    },
    {
        name: "最新作品",
        value: "latest",
        to: {
            name: "shots",
            params: { view: "latest" },
        },
    },
    {
        name: "随机作品",
        value: "random",
        to: {
            name: "shots",
            params: { view: "random" },
        },
    },
];

const appSearchCategoryOptions = [
    {
        name: "发现",
        value: "discovery",
        to: {
            name: "search",
            params: { category: "discovery" },
        },
    },
    {
        name: "国画",
        value: "chinese",
        to: {
            name: "search",
            params: { category: "chinese" },
        },
    },
    {
        name: "水粉画",
        value: "gouache",
        to: {
            name: "search",
            params: { category: "gouache" },
        },
    },
    {
        name: "油画",
        value: "oilpainting",
        to: {
            name: "search",
            params: { category: "oilpainting" },
        },
    },
    {
        name: "水彩画",
        value: "watercolor",
        to: {
            name: "search",
            params: { category: "watercolor" },
        },
    },
    {
        name: "版画",
        value: "woodcut",
        to: {
            name: "search",
            params: { category: "woodcut" },
        },
    },
    {
        name: "素描",
        value: "sketch",
        to: {
            name: "search",
            params: { category: "sketch" },
        },
    },
];

const appSearchViewOptions = [
    {
        name: "推荐作品",
        value: "recommended",
        to: {
            name: "search",
            params: { view: "recommended" },
        },
    },
    {
        name: "热门作品",
        value: "popular",
        to: {
            name: "search",
            params: { view: "popular" },
        },
    },
    {
        name: "最新作品",
        value: "latest",
        to: {
            name: "search",
            params: { view: "latest" },
        },
    },
];

const appSearchInputOptions = [
    { name: "画作", value: "shots" },
    { name: "主题", value: "midea" },
    { name: "合集", value: "sets" },
];

const appAuthorCategoryOptions = [
    {
        name: "作品",
        value: "works",
        to: {
            name: "author",
            params: { category: "works" },
        },
    },
    {
        name: "收藏",
        value: "collection",
        to: {
            name: "author",
            params: { category: "collection" },
        },
    },
    {
        name: "详情",
        value: "details",
        to: {
            name: "author",
            params: { category: "details" },
        },
    },
];

const appAuthorViewOptions = [
    {
        name: "最新作品",
        value: "latest",
        to: {
            name: "author",
            params: { view: "latest" },
        },
    },
    {
        name: "热门作品",
        value: "popular",
        to: {
            name: "author",
            params: { view: "popular" },
        },
    },
];

export {
    appMainCategoryOptions,
    appMainViewOptions,
    appSearchCategoryOptions,
    appSearchViewOptions,
    appSearchInputOptions,
    appAuthorCategoryOptions,
    appAuthorViewOptions,
};
