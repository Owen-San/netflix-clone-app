"use client";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { auth } from "../firebase";

interface IAuth {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  loading: boolean;
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(true);
        router.push("/login");
      }
      setInitialLoading(false);
    });

    return unsubscribe;
  }, [router]);

  const signUp = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      setError(null);

      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setUser(userCredential.user);
          router.push("/");
        })
        .catch((e) => {
          setError(e.message);
          alert(e.message);
        })
        .finally(() => setLoading(false));
    },
    [router]
  );

  const signIn = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      setError(null);

      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setUser(userCredential.user);
          router.push("/");
        })
        .catch((e) => {
          setError(e.message);
          alert(e.message);
        })
        .finally(() => setLoading(false));
    },
    [router]
  );

  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);

    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((e) => {
        setError(e.message);
        alert(e.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const memoedValue = useMemo(
    () => ({
      user,
      signUp,
      signIn,
      loading,
      logout,
      error,
    }),
    [user, loading, error, signUp, signIn, logout]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
