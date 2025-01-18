import React, { useState } from 'react';
import { SignInModal } from './SignInModal';
import { SignUpModal } from './SignUpModal';
import { useAuth } from '../../hooks/useAuth';

export function AuthButtons() {
  const { isAuthenticated } = useAuth();
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  if (isAuthenticated) return null;

  return (
    <>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setShowSignInModal(true)}
          className="text-gray-600 hover:text-gray-900"
        >
          Sign in
        </button>
        <button
          onClick={() => setShowSignUpModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition-colors"
        >
          Sign up
        </button>
      </div>

      <SignInModal
        isOpen={showSignInModal}
        onClose={() => setShowSignInModal(false)}
        onSignUpClick={() => {
          setShowSignInModal(false);
          setShowSignUpModal(true);
        }}
      />

      <SignUpModal
        isOpen={showSignUpModal}
        onClose={() => setShowSignUpModal(false)}
        onSignInClick={() => {
          setShowSignUpModal(false);
          setShowSignInModal(true);
        }}
      />
    </>
  );
}