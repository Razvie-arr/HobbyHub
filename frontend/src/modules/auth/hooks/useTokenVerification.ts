import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useSearchParams } from 'react-router-dom';

import { VERIFY_USER } from '../mutations';

export const useTokenVerification = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [verifyUser, verifyUserState] = useMutation(VERIFY_USER, {
    onCompleted: () => {
      setIsVerified(true);
    },
  });

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      void verifyUser({ variables: { token } }).then(() => {
        setIsVerified(true);
      });
    }
  }, [token, verifyUser]);

  return {
    isVerified,
    verifyUserState,
  };
};

