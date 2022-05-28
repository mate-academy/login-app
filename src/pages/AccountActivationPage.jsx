import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { AuthContext } from '../components/AuthContext.jsx';

export const AccountActivationPage = () => {
  const [error, setError] = useState('');
  const { activate } = useContext(AuthContext);
  const { activationToken } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    activate(activationToken)
      .then(() => navigate('/'))
      .catch(error => {
        setError(error?.response?.data?.message);
      });
  }, []);

  return (
    <>
      <h1 className="title">Account activation</h1>

      {error ? (
        <p>{error}</p>
      ) : (
        <p>Please wait...</p>
      )}
    </>
  );
};
