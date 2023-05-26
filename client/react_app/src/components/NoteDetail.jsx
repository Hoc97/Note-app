import { useLoaderData, useLocation, useSubmit } from 'react-router-dom';
import { EditorState, convertFromHTML, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { useEffect, useMemo, useState } from 'react';
import draftToHtml from 'draftjs-to-html';
import { debounce } from '@mui/material';

const NoteDetail = () => {
    const submit = useSubmit();
    const { pathname } = useLocation();
    const { note } = useLoaderData() || {};

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    const [rawHTML, setRawHTML] = useState(note?.content);
    useEffect(() => {
        setRawHTML(note?.content);
    }, [note?.content]);

    useEffect(() => {
        const blocksFromHTML = convertFromHTML(note?.content);
        const state = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
        );
        setEditorState(EditorState.createWithContent(state));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [note.id]);
    const debouncedMemorized = useMemo(() => {
        return debounce((rawHTML, note, pathname) => {
            if (rawHTML === note.content) return;

            submit({ ...note, content: rawHTML }, { method: 'POST', action: pathname });
        }, 1000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        debouncedMemorized(rawHTML, note, pathname);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rawHTML, pathname]);
    console.log({ rawHTML });
    const handleOnChange = (e) => {
        setEditorState(e);
        setRawHTML(draftToHtml(convertToRaw(e.getCurrentContent())));
    };

    return (
        <Editor
            editorState={editorState}
            onEditorStateChange={handleOnChange}
            placeholder=' Write something'
        />
    );
};

export default NoteDetail;