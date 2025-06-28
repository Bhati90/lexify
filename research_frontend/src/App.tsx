import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { setUser } from './store/reducers/userReducer';
import { AuthStates } from './utils/enums';
import Loader from './common/Loader';
import Landing from './pages/Landing';
import { Route, Routes } from 'react-router-dom';
import LoginForm from './features/auth/components/LoginForm';
import RegisterForm from './features/auth/components/RegisterForm';
import ResearchSearchApp from './pages/ResearchSearchApp';
import SearchResultsPage from './Component/Search/SearchResultsPage';
import ChatPage from './Component/chat/ChatPage';

const App: React.FC = () => {
  const { authState } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const isInitialized = useRef<boolean>(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const initializeAuth = async () => {
      const userToken = localStorage.getItem("accessToken");

      if (!userToken) {
        dispatch(setUser({ authState: AuthStates.IDLE }));
      }

      if (userToken) {
        try {
          // Make API call or any other logic
          dispatch(setUser({ authState: AuthStates.AUTHENTICATED }));
        } catch {
          localStorage.removeItem("accessToken");
          dispatch(setUser({ authState: AuthStates.IDLE }));
        }
      }
    };

    initializeAuth();
  }, [dispatch]);


  if (authState === AuthStates.INITIALIZING) return <Loader />;

  return (
    <>
      {authState !== AuthStates.AUTHENTICATED ?
        (
          <>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
            </Routes>
          </>
        ) : (
          <>
            {/* <Home /> */}
            <Routes>
              <Route path="/" element={<ResearchSearchApp />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/chat/:sessionId" element={ <ChatPage />}/>
            </Routes>
          </>
        )
      }
    </>
  );
};

export default App;
