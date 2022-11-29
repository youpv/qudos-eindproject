import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Qudos from "./pages/Qudos";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import StuurQudo from "./pages/StuurQudo";
import SelecteerOntvanger from "./pages/SelecteerOntvanger";
import { UserContext } from "./context/UserContext";

function App() {
	const { currentUser } = useContext(AuthContext);
	const { userData } = useContext(UserContext);

	// Let users only access the home page if they are logged in
	const ProtectedRoute = ({ children }) => {
		if (!currentUser) {
			return <Navigate to="/login" />;
		}
		if (!userData) {
			return;
		}
		return children;
	};

	// alert("JE MOET IN QUDODB en RECEIVED/SENT NOG INSTELLEN DAT QUDO'S OVERFLOW UIT HEBBEN STAAN EN PASSEN OOKAL ZIJN ZE GROOT")

	// If page is not found, redirect to home
	const NotFound = () => {
		return <Navigate to="/" />;
	};

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/">
					<Route
						index
						element={
							<ProtectedRoute>
								<Home />
							</ProtectedRoute>
						}
					/>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route
						path="/selecteerontvanger"
						element={
							<ProtectedRoute>
								<SelecteerOntvanger />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/stuurqudo"
						element={
							<ProtectedRoute>
								<StuurQudo />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/qudos"
						element={
							<ProtectedRoute>
								<Qudos />
							</ProtectedRoute>
						}
					/>
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
export default App;
