import React, { useEffect, useState } from 'react';

const defaultValue = localStorage.getItem('userName') || '';

export default function useUserName(): [
  string,
  React.Dispatch<React.SetStateAction<string>>
] {
  const [name, setName] = useState(defaultValue);

  useEffect(() => {
    localStorage.setItem('userName', name);
  }, [name]);

  return [name, setName];
}
