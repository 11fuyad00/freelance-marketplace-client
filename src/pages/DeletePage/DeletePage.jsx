import React from 'react';
import { Trash2 } from 'lucide-react';

const DeletePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-red-500 to-orange-500 text-white">
      <Trash2 size={80} className="mb-4 animate-bounce" />
      <h1 className="text-4xl font-bold mb-2">Delete Page</h1>
      <p className="text-lg opacity-90">
        ⚠️ This feature is under development.
      </p>
    </div>
  );
};

export default DeletePage;
