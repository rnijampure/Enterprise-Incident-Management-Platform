import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import { updateToken, logOut } from "./slice/authSlice";
import api from "./api/authInterceptor";

export const SessionPopup = () => {
  const dispatch = useAppDispatch();
  const isVisible = useAppSelector((state) => state.auth.isSessionExpiring);

  const handleExtend = async () => {
    try {
      const { data } = await api.get("/user/refresh");
      dispatch(updateToken(data.accessToken));
    } catch (err) {
      dispatch(logOut());
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999]">
      <div className="bg-white p-6 rounded-lg shadow-xl border-t-4 border-blue-600 max-w-sm">
        <h3 className="text-lg font-bold">Session Expiring</h3>
        <p className="text-gray-600 text-sm mt-2">
          Your security session is about to expire. Would you like to stay
          logged in?
        </p>
        <div className="mt-4 flex gap-2">
          <button
            onClick={handleExtend}
            className="bg-blue-600 text-white px-4 py-2 rounded flex-1"
          >
            Stay Logged In
          </button>
          <button
            onClick={() => dispatch(logOut())}
            className="text-gray-500 px-4 py-2 flex-1"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
