import { Editor } from '@tiptap/react';
import { useRef } from 'react';
import { processImageFile } from '../utils/image';

interface ToolbarProps {
  editor: Editor | null;
}

export function Toolbar({ editor }: ToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!editor) return null;

  const addImage = async (file: File) => {
    const result = await processImageFile(file);
    if (result.error) {
      alert(result.error);
      return;
    }
    editor.chain().focus().setImage({ src: result.dataUrl! }).run();
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await addImage(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="toolbar">
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

      <span className="toolbar-divider" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'active' : ''}
        title="Lista"
      >
        Lista
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'active' : ''}
        title="Numeroitu lista"
      >
        1. Lista
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        className={editor.isActive('taskList') ? 'active' : ''}
        title="Tehtävälista"
      >
        Tehtävät
      </button>

      <span className="toolbar-divider" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'active' : ''}
        title="Koodilohko"
      >
        {'</>'}
      </button>
      <button
        type="button"
        onClick={() =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        }
        title="Lisää taulukko"
      >
        Taulukko
      </button>

      <span className="toolbar-divider" />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        title="Lisää kuva"
      >
        Kuva
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
    </div>
  );
}
