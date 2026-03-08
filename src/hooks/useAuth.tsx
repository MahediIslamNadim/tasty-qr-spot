import { useState, useEffect, createContext, useContext, ReactNode, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  role: string | null;
  restaurantId: string | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  restaurantId: null,
  loading: true,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = useCallback(async (userId: string) => {
    try {
      // Check roles using RPC (bypasses RLS issues)
      const [superCheck, adminCheck, waiterCheck] = await Promise.all([
        supabase.rpc("has_role", { _user_id: userId, _role: "super_admin" }),
        supabase.rpc("has_role", { _user_id: userId, _role: "admin" }),
        supabase.rpc("has_role", { _user_id: userId, _role: "waiter" }),
      ]);

      let bestRole = "admin"; // default
      if (superCheck.data === true) {
        bestRole = "super_admin";
      } else if (adminCheck.data === true) {
        bestRole = "admin";
      } else if (waiterCheck.data === true) {
        bestRole = "waiter";
      }
      console.log("Role checks - super:", superCheck.data, "admin:", adminCheck.data, "waiter:", waiterCheck.data, "Best:", bestRole);
      setRole(bestRole);

      // Get restaurant
      try {
        const { data: restId } = await supabase
          .rpc("get_user_restaurant_id", { _user_id: userId });
        if (restId) {
          setRestaurantId(restId);
          return;
        }
      } catch {}

      const { data: restaurants } = await supabase
        .from("restaurants")
        .select("id")
        .eq("owner_id", userId)
        .limit(1);
      if (restaurants && restaurants.length > 0) {
        setRestaurantId(restaurants[0].id);
      }
    } catch (err) {
      console.error("fetchUserData error:", err);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    let initialLoadDone = false;

    const loadUser = async (authUser: User) => {
      setUser(authUser);
      await fetchUserData(authUser.id);
    };

    const clearUser = () => {
      setUser(null);
      setRole(null);
      setRestaurantId(null);
    };

    // Initial session check
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!mounted) return;
      if (session?.user) {
        await loadUser(session.user);
      }
      initialLoadDone = true;
      if (mounted) setLoading(false);
    });

    // Auth state changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        // Skip during initial load — getSession handles it
        if (!initialLoadDone) return;

        if (event === "SIGNED_IN" && session?.user) {
          setLoading(true);
          await loadUser(session.user);
          if (mounted) setLoading(false);
        } else if (event === "SIGNED_OUT") {
          clearUser();
          setLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [fetchUserData]);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, role, restaurantId, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
