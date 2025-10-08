
import React, { createContext, lazy, Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import type { DailyLog, UserProfile } from './types';
import { DietaryPreference, Gender } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import Navbar from './components/Navbar';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const RecipesPage = lazy(() => import('./pages/RecipesPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));

// Context for User Profile
interface UserContextType {
    userProfile: UserProfile;
    setUserProfile: (profile: UserProfile) => void;
}
export const UserContext = createContext<UserContextType>({
    userProfile: { name: '', age: 0, gender: Gender.OTHER, dietaryPreference: DietaryPreference.VEG },
    setUserProfile: () => {},
});

// Context for Daily Log
interface DailyLogContextType {
    dailyLog: DailyLog;
    setDailyLog: React.Dispatch<React.SetStateAction<DailyLog>>;
}
export const DailyLogContext = createContext<DailyLogContextType>({
    dailyLog: { date: '', meals: [], waterIntake: 0 },
    setDailyLog: () => {},
});

const getTodayDateString = () => new Date().toISOString().split('T')[0];

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { userProfile } = React.useContext(UserContext);
    return userProfile.name ? <>{children}</> : <Navigate to="/login" />;
};

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex">
            <Navbar />
            <main className="flex-grow md:ml-64 pb-16 md:pb-0 bg-gray-50 min-h-screen">
                <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
                    {children}
                </Suspense>
            </main>
        </div>
    );
};

function App() {
  const [userProfile, setUserProfile] = useLocalStorage<UserProfile>('userProfile', {
    name: '',
    age: 0,
    gender: Gender.OTHER,
    dietaryPreference: DietaryPreference.VEG,
  });

  const [dailyLog, setDailyLog] = useLocalStorage<DailyLog>('dailyLog', {
    date: getTodayDateString(),
    meals: [],
    waterIntake: 0,
  });

  // Reset log if it's a new day
  React.useEffect(() => {
    const today = getTodayDateString();
    if (dailyLog.date !== today) {
      setDailyLog({
        date: today,
        meals: [],
        waterIntake: 0,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider value={{ userProfile, setUserProfile }}>
      <DailyLogContext.Provider value={{ dailyLog, setDailyLog }}>
        <HashRouter>
          <Routes>
            <Route path="/login" element={<Suspense fallback={<div>Loading...</div>}><LoginPage /></Suspense>} />
            <Route
              path="/*"
              element={
                <PrivateRoute>
                  <AppLayout>
                    <Routes>
                      <Route path="/" element={<DashboardPage />} />
                      <Route path="/recipes" element={<RecipesPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                  </AppLayout>
                </PrivateRoute>
              }
            />
          </Routes>
        </HashRouter>
      </DailyLogContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
