import React, { useRef, useEffect } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, Heading1, Heading2, Heading3, Heading4, Heading5, Pilcrow, Code, Link, AlignCenter, AlignLeft, AlignRight, AlignJustify } from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const editor = editorRef.current;
    if (editor && content !== editor.innerHTML) {
      editor.innerHTML = content;
    }
  }, [content]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCmd = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  const handleLink = () => {
    const url = prompt('Enter the URL:');
    if (url) {
      execCmd('createLink', url);
    }
  };

  const toolbarButtons = [
    { cmd: 'formatBlock', value: 'H1', icon: Heading1 },
    { cmd: 'formatBlock', value: 'H2', icon: Heading2 },
    { cmd: 'formatBlock', value: 'H3', icon: Heading3 },
    { cmd: 'formatBlock', value: 'H4', icon: Heading4 },
    { cmd: 'formatBlock', value: 'H5', icon: Heading5 },
    { cmd: 'formatBlock', value: 'P', icon: Pilcrow },
    { separator: true },
    { cmd: 'bold', icon: Bold },
    { cmd: 'italic', icon: Italic },
    { cmd: 'underline', icon: Underline },
    { separator: true },
    { cmd: 'justifyLeft', icon: AlignLeft },
    { cmd: 'justifyCenter', icon: AlignCenter },
    { cmd: 'justifyRight', icon: AlignRight },
    { cmd: 'justifyFull', icon: AlignJustify },
    { separator: true },
    { cmd: 'insertUnorderedList', icon: List },
    { cmd: 'insertOrderedList', icon: ListOrdered },
    { separator: true },
    { cmd: 'createLink', handler: handleLink, icon: Link },
    { cmd: 'insertHTML', value: '<hr>', icon: Code, title: 'Insert HR' },
  ];

  return (
    <div className="bg-secondary border border-border rounded-lg">
      <div className="flex flex-wrap items-center p-2 border-b border-border gap-1">
        {toolbarButtons.map((btn, index) => {
          if (btn.separator) {
            return <div key={`sep-${index}`} className="w-px h-5 bg-border mx-1"></div>;
          }
          const Icon = btn.icon;
          return (
            <button
              key={`${btn.cmd}-${btn.value || index}`}
              type="button"
              onClick={() => btn.handler ? btn.handler() : execCmd(btn.cmd, btn.value)}
              className="p-2 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground"
              title={btn.title || btn.cmd}
            >
              <Icon className="h-4 w-4" />
            </button>
          );
        })}
      </div>
      <div
        ref={editorRef}
        onInput={handleInput}
        contentEditable
        className="prose dark:prose-invert max-w-none p-4 min-h-[300px] focus:outline-none"
      />
    </div>
  );
};

export default RichTextEditor;
