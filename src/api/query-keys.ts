//src/api/query-keys.ts

export const queryKeys = {
    courses: {
        all: ['courses'] as const,
        list: (params?: { category?: string; search?: string }) =>
            ['courses', 'list', params] as const,
        detail: (courseId: string) => ['courses', 'detail', courseId] as const
    },

    myLearning: {
        all: ['my-learning'] as const,
    },

    cart: {
        all: ['card'] as const,
    },
    settings: {
        all : ['settings'] as const,
        preferences: () => ['settings', 'preferences'] as const,
    },
};
