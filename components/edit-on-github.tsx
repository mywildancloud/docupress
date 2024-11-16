import React from 'react';
import { Settings } from '@/setting';
import { SquarePenIcon } from 'lucide-react';
interface EditThisPageProps {
  filePath: string;
}

const EditThisPage: React.FC<EditThisPageProps> = ({ filePath }) => {
  const repoUrl = Settings.github;
  const editUrl = `${repoUrl}/blob/main/${filePath}`;

  return (
    <div style={{ marginTop: '2rem', textAlign: 'right' }}>
      <a
        href={editUrl}
        target='_blank'
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#0070f3',
          textDecoration: 'none',
          fontWeight: 'bold',
        }}
      >
        <span>Edit this page</span>
        <SquarePenIcon className="w-4 h-4" />
      </a>
    </div>
  );
};

export default EditThisPage;