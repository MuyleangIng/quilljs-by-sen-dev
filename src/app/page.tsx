'use client';
import type { NextPage } from 'next';
import EditorQuestion from '../components/EditorQuestion';
import 'react-quill/dist/quill.snow.css'; 
import { useState } from 'react';

interface EditorData {
  introduction: string;
  description: string;
  codeBlock: string;
}
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
