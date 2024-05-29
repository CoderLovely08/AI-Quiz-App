import React, { createContext, useState } from 'react';

const QAContext = createContext();

export const QAProvider = ({ children }) => {
  const [questionsData, setQuestionsData] = useState([]);
  const [role, setRole] = useState('');
  const [jobRoleId, setJobRoleId] = useState(null);

  const updateRole = (selectedRole) => {
    setRole(selectedRole);

    const roleMap = {
      'Android Developer': 1,
      'Web Developer': 2,
      'Software Engineer': 3,
    };

    setJobRoleId(roleMap[selectedRole]);
  };

  return (
    <QAContext.Provider value={{
      questionsData,
      setQuestionsData,
      role,
      jobRoleId,
      updateRole
    }}>
      {children}
    </QAContext.Provider>
  );
};

export default QAContext;
