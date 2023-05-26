export default {
    authors: [
        {
            id: 123,
            name: 'Hocs'
        },
        {
            id: 1,
            name: 'dev'
        }
    ],
    folders: [
        {
            id: 1,
            name: 'Home',
            createAt: 'Mon May 22 2023 10:41:56 GMT+0700 (Indochina Time)',
            authorId: 123,
        },
        {
            id: 2,
            name: 'Work',
            createAt: 'Mon May 22 2023 10:41:56 GMT+0700 (Indochina Time)',
            authorId: 1,
        },
        {
            id: 3,
            name: 'School',
            createAt: 'Mon May 22 2023 10:41:56 GMT+0700 (Indochina Time)',
            authorId: 123,
        }
    ],
    notes: [
        { id: 111, content: '<p>This is new Note 1</p>', folderId: 1 },
        { id: 222, content: '<p>This is new Note 2</p>', folderId: 2 },
        { id: 333, content: '<p>This is new Note 3 </p>', folderId: 3 },
    ]
};