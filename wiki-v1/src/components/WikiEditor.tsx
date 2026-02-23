import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { TaskList } from '@tiptap/extension-task-list';
import { TaskItem } from '@tiptap/extension-task-item';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import { useCallback, useEffect, useState } from 'react';
import { Toolbar } from './Toolbar';
import { BubbleToolbar } from './BubbleToolbar';
import { loadContent, saveContent } from '../utils/storage';
import { htmlToMarkdown, markdownToHtml } from '../utils/markdown';
import { processImageFile } from '../utils/image';
import { useDebouncedCallback } from '../hooks/useDebounce';
import { LoomEmbed, isLoomUrl, getLoomEmbedUrl } from './LoomEmbed';

export function WikiEditor() {
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'idle'>('idle');

  const handleSave = useCallback((html: string) => {
    setSaveStatus('saving');
    const markdown = htmlToMarkdown(html);
    saveContent(markdown);
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 1500);
  }, []);

  const debouncedSave = useDebouncedCallback(handleSave, 1500);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: false,
        codeBlock: false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
      Placeholder.configure({
        placeholder: 'Aloita kirjoittaminen...',
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      LoomEmbed,
    ],
    content: markdownToHtml(loadContent()),
    onUpdate: ({ editor }) => {
      debouncedSave(editor.getHTML());
    },
    editorProps: {
      handleDrop: (view, event) => {
        const files = event.dataTransfer?.files;
        if (files && files.length > 0) {
          const file = files[0];
          if (file.type.startsWith('image/')) {
            event.preventDefault();
            processImageFile(file).then((result) => {
              if (result.error) {
                alert(result.error);
                return;
              }
              const { state } = view;
              const pos = view.posAtCoords({
                left: event.clientX,
                top: event.clientY,
              });
              if (pos) {
                const node = state.schema.nodes.image.create({
                  src: result.dataUrl,
                });
                const tr = state.tr.insert(pos.pos, node);
                view.dispatch(tr);
              }
            });
            return true;
          }
        }
        return false;
      },
      handlePaste: (_view, event) => {
        // Check for Loom URL in pasted text
        const text = event.clipboardData?.getData('text/plain');
        if (text && isLoomUrl(text.trim())) {
          event.preventDefault();
          const embedUrl = getLoomEmbedUrl(text.trim());
          if (embedUrl && editor) {
            editor.chain().focus().setLoomEmbed({ src: embedUrl }).run();
          }
          return true;
        }

        // Check for pasted images
        const items = event.clipboardData?.items;
        if (items) {
          for (const item of items) {
            if (item.type.startsWith('image/')) {
              event.preventDefault();
              const file = item.getAsFile();
              if (file) {
                processImageFile(file).then((result) => {
                  if (result.error) {
                    alert(result.error);
                    return;
                  }
                  editor?.chain().focus().setImage({ src: result.dataUrl! }).run();
                });
              }
              return true;
            }
          }
        }
        return false;
      },
    },
  });

  // Show initial save status
  useEffect(() => {
    const content = loadContent();
    if (content) {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 1000);
    }
  }, []);

  return (
    <div className="wiki-editor">
      <Toolbar editor={editor} />
      {editor && <BubbleToolbar editor={editor} />}
      <EditorContent editor={editor} className="editor-content" />
      <div className="status-bar">
        {saveStatus === 'saving' && <span className="status saving">Tallennetaan...</span>}
        {saveStatus === 'saved' && <span className="status saved">Tallennettu</span>}
        {saveStatus === 'idle' && <span className="status idle">Automaattinen tallennus</span>}
      </div>
    </div>
  );
}
