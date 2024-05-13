'use client';
import type { NextPage } from 'next';
import EditorQuestion from '../components/EditorQuestion';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { useState } from 'react';

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

const Home: NextPage = () => {
  const [editorData, setEditorData] = useState<EditorData>({ introduction: "", description: "", codeBlock: "" });

  const handleEditorDataChange = (data: EditorData) => {
    setEditorData(data);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div className="bg-white rounded-lg py-6">
        <EditorQuestion onDataChange={handleEditorDataChange}/>
      </div>
    </div>
  );
};

export default Home;
