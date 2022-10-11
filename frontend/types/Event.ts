import { User } from "./User";

export type Event = {
    id: string | number;
    attributes: {
        name: string;
        slug: string;
        venue: string;
        address: string;
        performers: string;
        date: string;
        time: string;
        description: string;
        image: {
            data: {
                id: string | number;
                attributes: {
                    formats: {
                        large: {
                            ext: string;
                            hash: string;
                            url: string;
                            mime: string;
                        };
                        medium: {
                            ext: string;
                            hash: string;
                            url: string;
                            mime: string;
                        };
                        small: {
                            ext: string;
                            hash: string;
                            url: string;
                            mime: string;
                        };
                        thumbnail: {
                            ext: string;
                            hash: string;
                            url: string;
                            mime: string;
                        };
                    };
                    url: string;
                    provider: string;
                };
            };
        } | null;
    };
};

export type AuthEvent = {
    id: string | number;
    name: string;
    slug: string;
    venue: string;
    address: string;
    performers: string;
    date: string;
    time: string;
    description: string;
    image: {
        id: string | number;
        formats: {
            large: {
                ext: string;
                hash: string;
                url: string;
                mime: string;
            };
            medium: {
                ext: string;
                hash: string;
                url: string;
                mime: string;
            };
            small: {
                ext: string;
                hash: string;
                url: string;
                mime: string;
            };
            thumbnail: {
                ext: string;
                hash: string;
                url: string;
                mime: string;
            };
            url: string;
            provider: string;
        };
    } | null;
    user: User | null;
};

export type Events = {
    data: Event[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
};

export type EventResponse = {
    data: Event;
};

export type ImageResponse = {
    id: string | number;
    attributes: {
        formats: {
            large: {
                ext: string;
                hash: string;
                url: string;
                mime: string;
            };
            medium: {
                ext: string;
                hash: string;
                url: string;
                mime: string;
            };
            small: {
                ext: string;
                hash: string;
                url: string;
                mime: string;
            };
            thumbnail: {
                ext: string;
                hash: string;
                url: string;
                mime: string;
            };
        };
        url: string;
        provider: string;
    };
};
