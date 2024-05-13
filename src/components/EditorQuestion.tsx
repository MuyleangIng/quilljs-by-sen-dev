"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; 

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });
const quillModules = {
    toolbar: [
        [{header: [1, 2, 3, false]}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{list: 'ordered'}, {list: 'bullet'}],
        ['link', 'image'],
        [{align: []}],
        ['code-block'],
        ['clean'],

    ],
};
const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'align',
    'color',
    'code-block',
];
const EditorQuestion: React.FC<EditorQuestionProps> = ({ onDataChange }) => {
  const [content, setContent] = useState('');
  const [introduction, setIntroduction] = useState("");
  const [description, setDescription] = useState("");
  const [codeBlock, setCodeBlock] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleIntroductionChange = (value: string) => {
    setIntroduction(value);
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
  };

  const handleCodeBlockChange = (value: string) => {
    setCodeBlock(value);
  };

  const isFormValid = (): boolean => {
    if (introduction.trim() === "" || description.trim() === "" || codeBlock.trim() === "") {
      setErrorMessage("Please fill in all required fields.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleSubmit = () => {
    try {
      if (!isFormValid()) {
        console.error("Please fill in all required fields.");
        return;
      }
      const data = { introduction, description, codeBlock };
      onDataChange(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
                <div className="pl-5 ">
                    <h1 className="font-semibold text-20 text-baseColor pb-4 ">
                        Introduction
                    </h1>
                    <span className="text-gray-600 ">
                    Test 1 
                  </span>
                    <div className={"pl-5"}>
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    </div>
                </div>
                <div className="flex items-center justify-center mt-[-2.5rem]">
                    <div className="w-11/12 rounded-xl  ">
                        <QuillEditor
                            value={introduction}
                            onChange={handleIntroductionChange}
                            modules={quillModules}
                            formats={quillFormats}
                            className="w-full h-[70%] mt-10 bg-white text-black"
                        />
                    </div>
                </div>
            </div>

            <div>
                <div className="pl-5 py-3">
                    <h1 className="font-semibold text-20 text-baseColor pb-4 ">
                        Description
                    </h1>
                    <span className="text-gray-600 ">
                    Test 2
                  </span>
                </div>
                <div className={"pl-5"}>
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                </div>
                <div className="flex items-center justify-center mt-[-2.5rem]">
                    <div className="w-11/12 rounded-xl  ">
                        <QuillEditor
                            value={description}
                            onChange={handleDescriptionChange}
                            modules={quillModules}
                            formats={quillFormats}
                            className="w-full h-[70%] mt-10 bg-white text-black"
                        />
                    </div>
                </div>
            </div>
            <div>
                <div className="pl-5 py-3">
                    <h1 className="font-semibold text-20 text-baseColor pb-4 ">
                        Test 3
                    </h1>

                </div>
                <div className={"pl-5"}>
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                </div>
                <div className="flex items-center justify-center mt-[-2.5rem]">
                    <div className="w-11/12 rounded-xl  ">
                        <QuillEditor
                            value={codeBlock}
                            onChange={handleCodeBlockChange}
                            modules={quillModules}
                            formats={quillFormats}
                            className="w-full h-[70%] mt-10 bg-white text-black"
                        />
                    </div>
                </div>

            </div>
            <div className="mt-3">
                <button
                    onClick={handleSubmit}
                    className="bg-secondary-90 text-white px-5 py-2 rounded-md ml-8 my-2"
                >
                    Next
                </button>
            </div>
    </>
  );
};

export default EditorQuestion;

interface EditorData {
    introduction: string;
    description: string;
    codeBlock: string;
  }
  
  interface EditorQuestionProps {
    onDataChange: (data: EditorData) => void;
  }