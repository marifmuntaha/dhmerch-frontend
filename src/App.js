import AllRoutes from "./route/Routes";

import ThemeProvider from "./layout/provider/Theme";

const App = () => {
    return (
        <ThemeProvider>
            <AllRoutes/>
        </ThemeProvider>
    );
};
export default App;