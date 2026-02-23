import { Editor } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';

interface BubbleToolbarProps {
  editor: Editor;
}

export function BubbleToolbar({ editor }: BubbleToolbarProps) {
  return (
    <BubbleMenu
      editor={editor}
      className="bubble-toolbar"
    >
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'active' : ''}
        title="Lihavointi"
      >
        <strong>B</strong>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'active' : ''}
        title="Kursivointi"
      >
        <em>I</em>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'active' : ''}
        title="Yliviivaus"
      >
        <s>S</s>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? 'active' : ''}
        title="Koodi"
      >
        {'</>'}
      </button>

      <span className="bubble-divider" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'active' : ''}
        title="Otsikko 1"
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'active' : ''}
        title="Otsikko 2"
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'active' : ''}
        title="Otsikko 3"
      >
        H3
      </button>

      <span className="bubble-divider" />

      <button
        type="button"
        onClick={() => {
          if (editor.isActive('link')) {
            editor.chain().focus().unsetLink().run();
          } else {
            const url = window.prompt('Syötä URL:');
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }
        }}
        className={editor.isActive('link') ? 'active' : ''}
        title="Linkki"
      >
        Linkki
      </button>
    </BubbleMenu>
  );
}
