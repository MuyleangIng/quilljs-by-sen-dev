'use client';
import type { NextPage } from 'next';
import EditorQuestion from '../components/EditorQuestion';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { Wrapper, Status as MapStatus } from "@googlemaps/react-wrapper";
import MapComponent from '@/components/MapComponent';

interface EditorData {
  introduction: string;
  description: string;
  codeBlock: string;
}

enum MyStatus {
  Loading = 'loading',
  Failure = 'failure',
  Success = 'success'
}

// Ensure renderStatus is correctly typed to return React.ReactElement
type RenderStatus = (status: MapStatus) => React.ReactElement;

const Home: NextPage = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';  // Fallback to an empty string if undefined

  const renderStatus: RenderStatus = (status: MapStatus): React.ReactElement => {
    switch (status) {
        case MapStatus.LOADING:
            return <p>Loading...</p>;
        case MapStatus.FAILURE:
            return <p>Error loading maps.</p>;
        case MapStatus.SUCCESS:
            return <p>Maps loaded successfully.</p>;
        default:
            // It's a good practice to handle default cases even if you believe all cases are covered
            return <p>Unknown status</p>;
    }
  };

  const [editorData, setEditorData] = useState<EditorData>({ introduction: "", description: "", codeBlock: "" });
  const handleEditorDataChange = (data: EditorData) => {
    setEditorData(data);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div className="bg-white rounded-lg py-6">
        <EditorQuestion onDataChange={handleEditorDataChange}/>
      </div>
      <div>
        <h2>Introduction</h2>
        <Wrapper apiKey={apiKey} render={renderStatus}>
            <MapComponent apiKey={apiKey} />
        </Wrapper>
      </div>
    </div>
  );
};

export default Home;
